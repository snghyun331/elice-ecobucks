const RightNav = ({ isLogin }) => {
  // 로그인 여부에 따라 다른 내용을 렌더링
  console.log(isLogin);
  const renderNavContent = () => {
    if (isLogin) {
      return (
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="/blog">
              블로그
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/mall">
              쇼핑몰
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/my">
              마이페이지
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/">
              로그아웃
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="/">
              홈
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/blog">
              블로그
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/mall">
              쇼핑몰
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/register">
              회원가입
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/login">
              로그인
            </a>
          </li>
        </ul>
      );
    }
  };

  return (
      <div className="container-fluid">
        <div
          className="collapse navbar-collapse justify-content-end"
          id="collapsibleNavbar"
        >
          {renderNavContent()}
        </div>
      </div>
  );
};
export default RightNav;
