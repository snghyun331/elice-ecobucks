/** 작성자: 정원석
 * leftNav, rightNav 나눠서 작업하기
 * leftNav 로고 넣기
 * rightNav 로그인 여부에 따라 다르게 구현하기
 */
import LeftNav from "./LeftNav";
import RightNav from "./RightNav";
import { Navbar } from "react-bootstrap";
const Header = () => {
  return (
    // <header className="w-full h-[60px] sm:h-[70px] backdrop-blur fixed top-0 z-10">
    <Navbar
      className="bg-light"
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        backgroundColor: "dark",
      }}
    >
      <LeftNav />
      <RightNav />
    </Navbar>
    // </header>
  );
};
export default Header;
