/** 작성자: 정원석
 * leftNav, rightNav 나눠서 작업하기
 * leftNav 로고 넣기
 * rightNav 로그인 여부에 따라 다르게 구현하기
 */
import LeftNav from "./LeftNav";
import RightNav from "./RightNav";
import { Navbar } from "react-bootstrap";
import { useEffect, useState } from "react";
const Header = () => {
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);
  return (
    <Navbar
      className="bg-light"
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        zIndex: "100",
        backgroundColor: "dark",
        backdropFilter: "blur(10px)",
      }}
    >
      <div className="container-fluid">
        <LeftNav />
        <RightNav isLogin={isLogin} />
      </div>
    </Navbar>
  );
};
export default Header;
