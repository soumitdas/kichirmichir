import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "../hooks/useRouter";
import Button from "../components/Button";
import Notification from "../components/Notification";

const ForgotPassword = () => {
  const auth = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { from } = router.location.state || {
    from: { pathname: "/" },
  };

  useEffect(() => {
    if (auth.user) {
      router.replace(from);
    }
  }, [auth, router, from]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        setIsLoading(false);
        setEmail("");
        setSuccessMessage("Please check your inbox for the reset link");
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
                      Forgot your password? Reset it now
                    </h2>
                  </div>
                  {successMessage && (
                    <Notification
                      type="success"
                      handleClose={() => setSuccessMessage("")}
                    >
                      {successMessage}
                    </Notification>
                  )}
                  {errorMessage && (
                    <Notification
                      type="danger"
                      handleClose={() => setErrorMessage("")}
                    >
                      {errorMessage}
                    </Notification>
                  )}
                  <form onSubmit={handleSubmit}>
                    <div class="field">
                      <label className="label">Email</label>
                      <div className="control">
                        <input
                          className="input"
                          type="email"
                          placeholder="name@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
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
                        Send Password Reset Email
                      </Button>
                    </div>
                  </form>
                </div>
                <div className="card-footer">
                  <div className="card-footer-item has-text-centered is-size-8 is-inline-block">
                    <span>
                      <Link to="/signin">Back</Link> to Sign in
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

export default ForgotPassword;
