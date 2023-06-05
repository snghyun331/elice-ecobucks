/** 작성자: 정원석
 * leftNav, rightNav 나눠서 작업하기
 * leftNav 로고 넣기
 * rightNav 로그인 여부에 따라 다르게 구현하기
 */
import LeftNav from "./LeftNav";
import RightNav from "./RightNav";
import { Navbar } from "react-bootstrap";
import { useContext } from "react";
import { UserStateContext } from "../../context/user/UserProvider";
const Header = () => {
  const { user}  = useContext(UserStateContext)
  console.log('user', user)

  return (
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
      <div className="container-fluid">
        <LeftNav />
        <RightNav isLogin={user ? true : false } />
      </div>
    </Navbar>
  );
};
export default Header;
