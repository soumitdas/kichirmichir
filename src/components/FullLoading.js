import LoadingSpinner from "./LoadingSpinner";

const FullLoading = () => {
  return (
    <section className="hero is-fullheight">
      <div className="hero-body">
        <div className="container has-text-centered">
          <LoadingSpinner size="64" />
        </div>
      </div>
    </section>
  );
};

export default FullLoading;
