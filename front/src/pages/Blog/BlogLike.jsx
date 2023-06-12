import { useState } from 'react';
import { Button } from 'react-bootstrap';
import * as Api from "../../api";
import like from "../../assets/heartfill.png";
import dislike from "../../assets/heartblank.png";

const BlogLike = ({ blog }) => {
    // console.log("bloglike 함수 안: ", blog);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(blog.likeCount);
//   console.log(likeCount);

  const handleLikeAction = async () => {
    try {
      if (isLiked) {
        await Api.put(`blog/${blog.blogId}/dislikes`);
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
        {isLiked ? <img src={dislike} alt="좋아요취소" /> : <img src={like} alt="좋아요" />}
      </button>
      {/* <Button>좋아요</Button> */}
      <p>좋아요 수: {likeCount}</p>
    </>
  );
};

export default BlogLike;
