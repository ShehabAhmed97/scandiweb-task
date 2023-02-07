function Header({ title, children }) {
  return (
    <header className="container">
      <div className="row justify-content-between align-items-center pb-3 mb-4 border-bottom">
        <div className="col d-flex justify-content-start">
          <span className="fs-4">{title}</span>
        </div>

        <div className="col d-flex justify-content-end">{children}</div>
      </div>
    </header>
  );
}

export default Header;
