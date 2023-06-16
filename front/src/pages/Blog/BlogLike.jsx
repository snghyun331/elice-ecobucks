import { useState, useEffect, useContext } from 'react';
import { Button } from 'react-bootstrap';
import * as Api from "../../api";
import like from "../../assets/heartfill.png";
import dislike from "../../assets/heartblank.png";
import { UserStateContext } from '../../context/user/UserProvider';
const BlogLike = ({ blog }) => {
    const userState = useContext(UserStateContext);
  const [isLiked, setIsLiked] = useState(false);
  useEffect(() => {
    // blog.likeUsers 리스트를 순회하여 user._id와 비교하여 isLiked 상태 설정
    const likedByUser = blog.likeUsers.some((user) => user === userState.user._id);
    setIsLiked(likedByUser);
  }, [blog, userState.user._id]);
  const [likeCount, setLikeCount] = useState(blog.likeCount);

  const handleLikeAction = async () => {
    try {
      if (isLiked) {
        await Api.put(`blog/${blog.blogId}/dislikes`, {
          likeCount: blog.likeCount + 1,
          likeUsers: userState.user._id
        });
        setLikeCount(prevCount => prevCount - 1);
      } else {
        await Api.put(`blog/${blog.blogId}/likes`);
        setLikeCount(prevCount => prevCount + 1);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button onClick={handleLikeAction}>
        {isLiked ?  <img src={like} alt="좋아요" />:<img src={dislike} alt="좋아요취소" />}
      </button>
      {/* <Button>좋아요</Button> */}
      <p>좋아요 수: {likeCount}</p>
    </>
  );
};

export default BlogLike;
