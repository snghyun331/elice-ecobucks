import { useState } from 'react';
import { Button } from 'react-bootstrap';
import * as Api from "../../api";

const BlogLike = ({ blog }) => {
    console.log("bloglike 함수 안: ", blog);
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
        {isLiked ? '좋아요 취소' : '좋아요'}
      </button>
      {/* <Button>좋아요</Button> */}
      <p>좋아요 수: {likeCount}</p>
    </>
  );
};

export default BlogLike;
