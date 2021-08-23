import { Fragment, h, render } from 'preact';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { useEffect, useState, useRef } from 'preact/hooks';
// import articleServices from '../../../services/article';
// import { redirectTo } from "../../../lib/routes";
import Pagination from "../../components/Pagination/Pagination.js";
import useApi from "../../lib/api/useApi";
import fileIcon from "./../../images/cms_file.svg";
import { toast } from 'react-toastify';

import fileService from "../../lib/file";
import linkService from "../../lib/link";

import Loader from "../../components/loader/Loader";

import Modal from "../../components/modal/Modal";
import arrow from "./../../images/sort.svg";


const ArticleList = () => {
    const [selected, setSelected] = useState([]);
    const [items, setItems] = useState([]);
    const [searcher, setSearcher] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pages, setPages] = useState(0);
    const [modalContent, setModalContent] = useState(0);
    // const [sortType, setSortType] = useState("");
    // const [sortValue, setSortValue] = useState("");

    const tableRef = useRef(null);
    const fileRef = useRef(null);

    useEffect(() => {
        updateData();
    }, []);

    useEffect(() => {
        updateData();
        setSelected([]);
        const table = tableRef.current;
        const checkbox = table.querySelectorAll("input[type='checkbox'].main--checkbox");
        checkbox.checked = false;
    }, [currentPage]);



    useEffect(() => {
        if (!isOpen) {
            setModalContent("");
        }
    }, [isOpen]);

    const openModal = (content) => {
        setModalContent(content);
        setIsOpen(true);
    }


    const downloadFile = () => {
        const [fetch] = useApi();
        const string = JSON.stringify(selected);
        console.log('string', string);
        fetch('/cms/api-download-excel', { selected: string }, 'post')
            .then((response) => {
                console.log(`${linkService.domainUrl}/${response.fileUrl}`);
                console.log(selected);
                let link = document.createElement('a');
                document.body.appendChild(link);
                link.setAttribute('download', 'lista.xlsx');
                link.href = `${linkService.domainUrl}/${response.fileUrl}`;
                link.click();
                link.remove();
                toast.success("Plik wygenerowano poprawnie");
                // #todo
                // console.log(fileUrl);
                // fileService.downloadUrl(fileUrl,"lista.xslx");

            })
            .catch((error) => {
                toast.error("Coś poszło nie tak");
                console.log(error);
            })
    }

    const updateData = (sortType,sortValue) => {
        // const { total, items, pages } = await articleServices.pagination(currentPage);
        console.log('sortBy',sortType,sortValue);
        const [fetch] = useApi();
        fetch('/cms/api-user-pagination', { currentPage ,sortValue,sortType}, 'post')
            .then((response) => {
                const { total, items, defaultPages, pages } = response;
                setItems(items);
                setTotal(total);
                setPages(pages);
            })
            .catch((error) => {

                console.log(error);
            })

    }

    const onChangeCheckboxList = (currentEl) => {

        const id = currentEl.dataset.id;
        if (currentEl.checked) {
            setSelected([...selected, id]);
        } else {
            setSelected(prevSelected => (
                prevSelected.filter((value, i) => value !== id)
            ));
        }
    }

    const onChangeCheckboxMain = (currentEl) => {
        const id = currentEl.dataset.id;
        const table = tableRef.current;
        const checkboxes = table.querySelectorAll("input[type='checkbox']:not(.main--checkbox)");
        if (currentEl.checked) {
            const array = [];
            checkboxes.forEach((checkbox) => {
                const id = checkbox.dataset.id;
                checkbox.checked = true;
                array.push(id);
            });
            setSelected(array);
        } else {
            checkboxes.forEach((checkbox) => {
                checkbox.checked = false;

            });
            setSelected([]);

        }

    }
    const handleSubmitSearcher = (e) => {
        e.preventDefault();
        if (searcher.length > 0) {
            const [fetch] = useApi();
            fetch('/cms/api-user-search', { searcher }, 'post')
                .then((response) => {
                    const { user } = response;
                    if (user.id) {
                        setItems([user]);
                        setPages(0);
                    } else {
                        alert("Nie znaleziono użytkownika o takim adresie email.");
                    }
                    console.log('response', response);
                })
                .catch((error) => {

                    console.log(error);
                })
        }
    }

    const onClickCloseSearcher = () => {
        setSearcher("");
        updateData();
    }

    const handleSort = (e) => {
        const type = e.target.dataset.type;
        const value = e.target.dataset.value;
        // setSortType(type);
        if(value == "ASC"){
            // setSortValue('ASC');
            e.target.dataset.value ="DESC";
            updateData(type,'ASC');
        } else {
            updateData(type,'DESC');
            // setSortValue('DESC');
            e.target.dataset.value ="ASC";
        }

        // updateData();

    }
 

    return (
        <div style="position:relative;" ref={tableRef}>
            {/* <Loader /> */}

            <Modal isOpen={isOpen} isSending={isSending} setIsOpen={setIsOpen}>
                {modalContent}
            </Modal>
            <div class="score-wrap">
                <a ref={fileRef} href={fileRef} download id="download" hidden></a>
                <button onClick={() => downloadFile()} class="btn--primary">Generuj plik excel</button>
                <div class="score">Liczba użytkowników: {total}</div>
            </div>

            <form onSubmit={handleSubmitSearcher} class="searcher">
                {searcher.length > 0 && (
                    <div onClick={onClickCloseSearcher} class="close">X</div>
                )}  <input type="text" value={searcher} onChange={(e) => setSearcher(e.target.value)} placeholder="Email..." /><input type="submit" value=">" class="button" />
            </form>


            <br />  <br />
            <Table cellPadding="20" cellSpacing="0" class="list">
                <Thead>
                    <Tr>
                        <Th><input ref={tableRef} class="main--checkbox" type="checkbox" onClick={(e) => onChangeCheckboxMain(e.target)} /></Th>
                        <Th><div style="display:flex;">
                            ID <img data-type="id" data-value="ASC" onClick={handleSort} class="arrow" src={arrow} />
                        </div>
                        </Th>
                        <Th>Imię i nazwisko</Th>
                        <Th>Hasło I <img data-type="firstKeyword" data-value="ASC" onClick={handleSort} class="arrow" src={arrow} /></Th>
                        <Th>Hasło II <img data-type="secondKeyword" data-value="ASC" onClick={handleSort} class="arrow" src={arrow} /></Th>
                        <Th>Hasło III <img data-type="thirdKeyword" data-value="ASC" onClick={handleSort} class="arrow" src={arrow} /></Th>
                        <Th>Zadanie główne <img data-type="mainTask" data-value="ASC" onClick={handleSort} class="arrow" src={arrow} /></Th>
                    </Tr>
                </Thead>
                <Tbody >
                    {Object.keys(items).length > 0 &&
                        Object.keys(items).map((key) => (
                            <Tr data-id={key}>
                                <Td>
                                    <input data-id={items[key].id} type="checkbox" onClick={(e) => onChangeCheckboxList(e.target)} />
                                </Td>
                                <Td>
                                    {items[key].id}
                                </Td>
                                <Td>
                                    <div class="line">{items[key].name}</div>
                                    <div class="line">{items[key].email}</div>
                                </Td>
                                <Td>
                                    {items[key].isFirstKeyword && (
                                        <div class="line">{items[key].createdAtFirstKeyword}</div>
                                    )}
                                    <div>
                                        {(items[key]['task'] && items[key]['task']['1']) && (
                                            <div class="link" onClick={() => openModal(items[key]['task']['1'])}>Zadanie kreatywne</div>
                                        )}
                                    </div>
                                </Td>
                                <Td>
                                    {items[key].isSecondKeyword && (
                                        <div class="line">{items[key].createdAtSecondKeyword}</div>
                                    )}
                                    <div>
                                        {(items[key]['task'] && items[key]['task']['2']) && (
                                            <div class="link" onClick={() => openModal(items[key]['task']['2'])}>Zadanie kreatywne</div>
                                        )}
                                    </div>
                                </Td>
                                <Td>
                                    {items[key].isThirdKeyword && (
                                        <div class="line">{items[key].createdAtThirdKeyword}</div>
                                    )}
                                    <div>
                                        {(items[key]['task'] && items[key]['task']['3']) && (
                                            <div class="link" onClick={() => openModal(items[key]['task']['3'])}>Zadanie kreatywne</div>
                                        )}
                                    </div>
                                </Td>
                                <Td class="center mainTask">
                                    {items[key].isMainTask && (
                                        <Fragment>
                                            {items[key].createdAtMainTask}
                                            <a href={items[key].mainTaskFileUrl} download>
                                                <img src={items[key].mainTaskFileUrl} />
                                            </a>
                                            {/* <a href={items[key].mainTaskFileUrl} download><img class="icon" src={fileIcon} /></a> */}
                                        </Fragment>
                                    )}
                                </Td>
                            </Tr>
                        ))}
                </Tbody>
            </Table>

            <Pagination
                items={items}
                currentPage={currentPage}
                totalPages={pages}
                setCurrentPage={setCurrentPage}
                totalItems={items}
            />
        </div>
    )
}
export default ArticleList;