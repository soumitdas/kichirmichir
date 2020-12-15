import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Button from "../components/Button";
import { useRouter } from "../hooks/useRouter";
import Notification from "../components/Notification";

const Signup = () => {
  const auth = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  // const { from } = router.location.state || {
  //   from: { pathname: "/links" },
  // };

  useEffect(() => {
    if (auth.user) {
      router.replace("/signup-complete", { from: router.location.state });
    }
  }, [auth, router]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);
    auth
      .signup(formData.email, formData.password)
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
                    <h2 className="is-size-4">
                      Don't have an account? Create one
                    </h2>
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
                          placeholder="demo@example.com"
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
                          placeholder="*********"
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
                        Sign up
                      </Button>
                    </div>
                  </form>
                </div>
                <div className="card-footer">
                  <div className="card-footer-item has-text-centered is-size-8 is-inline-block">
                    <span>
                      Already have an account? <Link to="/signin">Sign in</Link>
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

export default Signup;
