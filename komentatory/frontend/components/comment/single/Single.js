import "./single.scss";

import { Fragment, h, render } from 'preact';
import { useEffect, useState } from 'preact/hooks';

import Loader from "~/components/loader";
import Creator from "./subcomponents/creator";
import Item from "./subcomponents/item";
import useApi from "~/lib/api/useApi";

const Single = ({ type, postID }) => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState({});
  const [isLogged, setIsLogged] = useState(false);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(false);
  const [replyOpened, setReplyOpened] = useState({});
  const [isLoading, setIsLoading] = useState(false);




  const updateData = () => {
    setIsLoading(true);
    const [fetch] = useApi();

    fetch(`/api-fetch-comments/post-${postID}/page-${page}`, {}, 'post')
      .then(response => {
        console.log('comments', response);
        const { comments, total, pages, user, isLogged, user: loggedUser } = response;
        const commentArray = Object.values(comments);
        setData([...data, ...commentArray]);
        setIsLoading(false)
        setIsLogged(isLogged);
        setUser(loggedUser);

        if (page == 1) {
          setPages(pages);
        }
      })
      .catch((error) => {
        console.log(error);
      }).finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    updateData();
  }, [page]);


  useEffect(() => {
    updateData();
  }, []);


  return (
    <div class="single--comment--component">
      <Creator isLogged={isLogged}
        user={user} comments={data} setComments={setData} postID={postID} />
      <div class="comment--single--list">
        {data.length > 0 && (
          data.map(comment => {
            const { replies } = comment;
            const repliesArray = Object.values(replies);
            return (<Fragment>
              <Item setReplyOpened={setReplyOpened} replyOpened={replyOpened} comment={comment} />
              <div class="sublist">
                <div class="comment--single--list">
                  {repliesArray.map(reply => <Item setReplyOpened={setReplyOpened} replyOpened={replyOpened} parentID={comment.id} comment={reply} />)}
                </div>
                {comment.id in replyOpened && (
                  <Creator
                    comments={data}
                    authorMarked={replyOpened[comment.id]}
                    setComments={setData}
                    postID={postID}
                    parentID={comment.id}
                    setReplyOpened={setReplyOpened}
                    replyOpened={replyOpened}
                    isLogged={isLogged}
                    user={user}
                  />
                )}
              </div>
            </Fragment>
            )
          })
        )}
      </div>
      {((pages > page) && !isLoading) && (
        <div onClick={() => setPage(page + 1)} class="comment--single--more "><button class="btn--primary -center">pokaż więcej...</button></div>
      )}
      {isLoading && (
        <Loader></Loader>
      )}
    </div>
  )
}
export default Single;

