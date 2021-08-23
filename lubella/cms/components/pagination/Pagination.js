import "./pagination.scss";
import { h, render, Component } from 'preact';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { useEffect, useState } from 'preact/hooks';

import arrowRightIcon from "./../../images/cms_right-arrow.svg";

const Pagination = ({ currentPage, totalItems, setCurrentPage, totalPages }) => {
    const LEFT_PAGE = 'LEFT';
    const RIGHT_PAGE = 'RIGHT';


    const goToNextPage = () => {
        setCurrentPage((page) => page + 1)
    }

    const goToPreviousPage = () => {

        setCurrentPage((page) => page - 1);
    }
    const changePage = (event) => {
    
        const pageNumber = Number(event.target.textContent);
        setCurrentPage(pageNumber);
    }
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })

    }, [currentPage]);

    const scrollToTop = (offset, callback) => {
        // const fixedOffset = offset.toFixed();
        // const onScroll = function () {
        //     if (window.pageYOffset.toFixed() === fixedOffset) {
        //         window.removeEventListener('scroll', onScroll)
        //         if (typeof callback === 'function') {
        //             callback();
        //             console.log('callback',callback);
        //         }
        //     }
        // }

        // window.addEventListener('scroll', onScroll)
        // onScroll();
        // window.scrollTo({
        //     top: 0,
        //     behavior: 'smooth'
        // })
        window.scrollTo(0, 0);
      
    }

    const renderButtons = () => {
        const pages = fetchPageNumbers();
    
        return pages.map((item, index) => {
            if (item == LEFT_PAGE || item == RIGHT_PAGE) {
                return <div>...</div>
            } else {
                return <button
                    key={index}
                    onClick={changePage}
                    className={`paginationItem ${currentPage === item ? 'active' : ''}`}>
                    <span>{item}</span>
                </button>
            }
        })
    }

    // return Array.from(Array(pages)).map((e, i) => i + 1).map((item, index) => (
    //     <button
    //         key={index}
    //         onClick={changePage}
    //         className={`paginationItem ${currentPage === item ? 'active' : null}`}
    //     >
    //         <span>{item}</span>
    //     </button>
    // ))



    const range = (from, to, step = 1) => {
        let i = from;
        const range = [];

        while (i <= to) {
            range.push(i);
            i += step;
        }

        return range;
    }
    const fetchPageNumbers = () => {
        // const totalPages = 100;
        // const currentPage = 15;
        const pageNeighbours = 1;


        const totalNumbers = (pageNeighbours * 2) + 3;
        const totalBlocks = totalNumbers + 2;
 
        if (totalPages > totalBlocks) {
            const startPage = Math.max(2, currentPage - pageNeighbours);
            const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);
            let pages = range(startPage, endPage);


            const hasLeftSpill = startPage > 2;
            const hasRightSpill = (totalPages - endPage) > 1;
            const spillOffset = totalNumbers - (pages.length + 1);

            switch (true) {
                case (hasLeftSpill && !hasRightSpill): {
                    const extraPages = range(startPage - spillOffset, startPage - 1);
                    pages = [LEFT_PAGE, ...extraPages, ...pages];
                    break;
                }

                case (!hasLeftSpill && hasRightSpill): {
                    const extraPages = range(endPage + 1, endPage + spillOffset);
                    pages = [...pages, ...extraPages, RIGHT_PAGE];
                    break;
                }
                case (hasLeftSpill && hasRightSpill):
                default: {
                    pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
                    break;
                }
            }

            return [1, ...pages, totalPages];
        }

        return range(1, totalPages);
    }


    return (
        <div class="pagination">
            <button
                onClick={goToPreviousPage}
                className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
            >
            <img class="icon -reverse" src={arrowRightIcon} />
            </button>
            {renderButtons()}
            <button
                onClick={goToNextPage}
                className={`next ${currentPage === totalPages ? 'disabled' : ''}`}
            >
                <img class="icon" src={arrowRightIcon} />
            </button>
        </div>
    )

}

export default Pagination;

