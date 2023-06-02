import { Link } from "react-router-dom";
const HomePage = () => {
  return (
    <>
      <h3>ECOBUCKS</h3>
      <div class="btn-group mr-2" role="group" aria-label="First group">
        <Link to="/mall">
          <button type="button" class="btn btn-secondary">
            쇼핑몰로 이동
          </button>
        </Link>
        <br />
        <Link to="/blog">
          <button type="button" class="btn btn-secondary">
            블로그로 이동
          </button>
        </Link>
      </div>
    </>
  );
};
export default HomePage;
