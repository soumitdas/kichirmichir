import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "../hooks/useRouter";
import Button from "../components/Button";
import Notification from "../components/Notification";

const Signin = () => {
  const auth = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const { from } = router.location.state || {
    from: { pathname: "/" },
  };

  useEffect(() => {
    if (auth.user) {
      router.replace(from);
    }
  }, [auth, router, from]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    auth
      .signin(formData.email, formData.password)
      .then((_) => {
        //setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        setErrorMessage(e.message);
      });
  };

  return (
    <section className="hero is-fullheight-with-navbar">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4">
              <div className="card">
                <div className="card-content">
                  <div className="has-text-centered p-4">
                    <h2 className="is-size-4">Welcome back</h2>
                  </div>
                  {errorMessage && (
                    <Notification
                      type="danger"
                      handleClose={() => setErrorMessage("")}
                    >
                      {errorMessage}
                    </Notification>
                  )}
                  <form onSubmit={handleSubmit}>
                    <div className="field">
                      <label className="label">Email</label>
                      <div className="control">
                        <input
                          className="input"
                          type="email"
                          name="email"
                          placeholder="email@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          required={true}
                        />
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">Password</label>
                      <div className="control">
                        <input
                          className="input"
                          type="password"
                          name="password"
                          placeholder="********"
                          value={formData.password}
                          onChange={handleChange}
                          required={true}
                        />
                      </div>
                    </div>
                    <div className="buttons mt-5">
                      <Button
                        type="primary"
                        fullWidth={true}
                        loading={isLoading}
                        disabled={isLoading}
                      >
                        Sign in
                      </Button>
                      <Link
                        to="/signup"
                        className="button is-fullwidth is-primary is-outlined"
                      >
                        Create an account
                      </Link>
                    </div>
                  </form>
                </div>
                <div className="card-footer">
                  <div className="card-footer-item has-text-centered is-size-8 is-inline-block">
                    <span>
                      Forgot your password?
                      <Link to="/forgot-password">Reset Password</Link>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signin;
