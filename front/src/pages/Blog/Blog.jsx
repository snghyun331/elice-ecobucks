const Blog = () => {
  return (
    <>
      <h3>블로그페이지.</h3>
      <div className="card">
        <h5 className="card-header">전기 아끼기 팁</h5>
        <div className="card-body">
          <h5 className="card-title">Special title treatment</h5>
          <p className="card-text">
            With supporting text below as a natural lead-in to additional
            content.
          </p>
        </div>
      </div>
      <br />
      <div className="card">
        <h5 className="card-header">에어컨 절전모드</h5>
        <div className="card-body">
          <h5 className="card-title">Special title treatment</h5>
          <p className="card-text">
            With supporting text below as a natural lead-in to additional
            content.
          </p>
          <a href="#" className="btn btn-primary">
            Go somewhere
          </a>
        </div>
      </div>
    </>
  );
};

export default Blog;
