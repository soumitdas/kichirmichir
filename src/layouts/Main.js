const MainLayout = ({ children }) => {
  return (
    <section className="section">
      <div className="container">
        <div className="columns">
          <div className="column is-8 is-offset-2">{children}</div>
        </div>
      </div>
    </section>
  );
};

export default MainLayout;
