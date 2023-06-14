import Header from "./Header";
import Router from "../../routes/Router";
const Layout = () => {
  return (
    <>
      <Router />
      <footer
        style={{
          backgroundColor: "#00D387",
          width: "100%",
          padding: "40px 140px",
          marginTop: "50px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "white",
            fontSize: "0.8rem",
          }}
        >
          <div>
            에코벅스
            <br />
            대표이사 벨루가
            <br />
            사업자등록번호 999-99-99999
            <br />
            통신판매업신고번호 9999-999-999999
            <br />
            서울 에코시 벅스구 절약로 777
          </div>
          <div>
            이메일 상담 ecobucks@ecobucks.com
            <br />
            유선 상담 9999-9999
            <br /><a style={{ fontWeight: '900' }}>© ecobucks Co., Ltd.</a>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "white",
            fontSize: "0.8rem",
            textAlign: "center",
            paddingTop: '30px',
            fontStyle: 'italic'
          }}
        >
          에코벅스는 통신판매중개자이며 통신판매 당사자가 아닙니다. 상품,
          상품정보, 거래에 관한 의무와 책임은 판매자에게 있으므로, 각 상품
          페이지에서 구체적인 내용을 확인하시기 바랍니다.
        </div>
      </footer>
    </>
  );
};
export default Layout;
