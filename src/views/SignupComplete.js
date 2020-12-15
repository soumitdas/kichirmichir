import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "../hooks/useRouter";
import { storage } from "../firebase";
import Button from "../components/Button";
import Notification from "../components/Notification";
import Username from "../components/Username";

const MAX_AVATAR_SIZE = 500 * 1024;

const SignupComplete = () => {
  const auth = useAuth();
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    displayName: auth.user?.name || "",
    photoURL: auth.user?.photoURL || "",
    userName: auth.user?.userName || "",
    bio: auth.user?.bio || "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { from } = router.location.state || {
    from: { pathname: "/" },
  };

  useEffect(() => {
    if (auth.user) {
      if (auth.user.userName) {
        router.replace(from);
        return;
      }
    } else {
      router.replace("/signup");
    }
  }, [auth, router]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    if (!e.target.files) {
      return;
    }
    if (e.target.files[0].size > MAX_AVATAR_SIZE) {
      setErrorMessage(
        `File size should not be greater than ${MAX_AVATAR_SIZE / 1024} KB`
      );
      return;
    }
    setFile(e.target.files[0]);
    const fileRef = storage.ref(`avatars/${auth.user.uid}/${Date.now()}`);
    fileRef
      .put(e.target.files[0])
      .then(() => fileRef.getDownloadURL())
      .then((url) => {
        setFormData({ ...formData, photoURL: url });
      })
      .catch((e) => {
        setErrorMessage(e.message);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    auth
      .completeSignup(formData)
      .then(() => {
        setIsLoading(false);
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
                    <h2 className="is-size-4">Complete your Signup</h2>
                  </div>
                  {errorMessage && (
                    <Notification
                      type="danger"
                      handleClose={() => setErrorMessage("")}
                    >
                      {errorMessage}
                    </Notification>
                  )}
                  {formData.photoURL && (
                    <div className="my-1">
                      <figure
                        className="image is-1by1 is-96x96 is-mx-auto"
                        style={{ paddingTop: 0 }}
                      >
                        <img
                          className="is-rounded"
                          src={formData.photoURL}
                          alt="user avatar"
                        />
                      </figure>
                    </div>
                  )}
                  <form onSubmit={handleSubmit}>
                    <div className="field">
                      <label className="label">Upload Avatar</label>
                      <div className="control">
                        <div className="file has-name">
                          <label className="file-label">
                            <input
                              className="file-input"
                              type="file"
                              accept="image/*"
                              name="avatar"
                              multiple={false}
                              onChange={handleFileChange}
                            />
                            <span className="file-cta">
                              {file ? "Change" : "Choose a file…"}
                            </span>
                            {file && (
                              <span className="file-name">{file.name}</span>
                            )}
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">Display Name</label>
                      <div className="control">
                        <input
                          className="input"
                          type="text"
                          name="displayName"
                          placeholder="John Corner"
                          value={formData.displayName}
                          onChange={handleChange}
                          required={true}
                          minLength="3"
                          maxLength="20"
                        />
                      </div>
                    </div>
                    <Username onChange={handleChange} required={true} />
                    <div className="field">
                      <label className="label">Bio</label>
                      <div className="control">
                        <textarea
                          className="textarea"
                          name="bio"
                          placeholder="Few words to describe yourself"
                          value={formData.bio}
                          onChange={handleChange}
                          required={true}
                          minLength="3"
                          maxLength="200"
                        />
                      </div>
                    </div>
                    <div className="buttons mt-5">
                      <Button
                        type="primary"
                        loading={isLoading}
                        disabled={isLoading}
                        fullWidth={true}
                      >
                        Complete
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignupComplete;
