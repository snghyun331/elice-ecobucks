import { Link } from "react-router-dom";
const HomePage = () => {
  return (
    <>
      <h3>안녕하세요. 메인페이지입니다.</h3>
      <Link to="/mall">쇼핑몰로 이동</Link>
      <br />
      <Link to="/blog">블로그로 이동</Link>
    </>
  );
};
export default HomePage;
