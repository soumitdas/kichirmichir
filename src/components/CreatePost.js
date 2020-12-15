import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import UserAvatar from "./UserAvatar";
import Button from "./Button";
import Notification from "./Notification";

const MAX_POST_CHARACTER = 500;

const CreatePost = ({ createPostMethod }) => {
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ content: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    createPostMethod(formData.content)
      .then(() => {
        setIsLoading(false);
        setFormData({ content: "" });

        setSuccessMessage("Posted successfully...");
        setTimeout(() => {
          setSuccessMessage("");
        }, 2000);
      })
      .catch((e) => {
        setIsLoading(false);
        setErrorMessage(e.message);
      });
  };

  return (
    <div className="card">
      <div className="card-content">
        {successMessage && (
          <Notification
            type="success"
            handleClose={() => setSuccessMessage("")}
          >
            {successMessage}
          </Notification>
        )}
        {errorMessage && (
          <Notification type="danger" handleClose={() => setErrorMessage("")}>
            {errorMessage}
          </Notification>
        )}
        <article className="media">
          <div className="media-left">
            {auth.user?.photoURL ? (
              <figure className="image is-1by1 is-64x64">
                <img
                  className="is-rounded"
                  src={auth.user.photoURL}
                  alt={auth.user.displayName}
                />
              </figure>
            ) : (
              <UserAvatar
                className="avatar-circle-small"
                name={auth.user?.displayName}
              />
            )}
          </div>
          <div className="media-content">
            <form onSubmit={handleSubmit}>
              <div className="field">
                <p className="control">
                  <textarea
                    className="textarea"
                    placeholder="What are you thinking today ?"
                    name="content"
                    onChange={handleChange}
                    value={formData.content}
                    maxLength={MAX_POST_CHARACTER}
                  ></textarea>
                </p>
                <p className="help">
                  Character left {formData.content.length}/{MAX_POST_CHARACTER}
                </p>
              </div>
              <nav className="level is-mobile">
                <div className="level-left">
                  {/* <div className="level-item">
                  <button className="button">Add</button>
                </div> */}
                </div>
                <div className="level-right">
                  <div className="level-item">
                    <Button
                      type="primary"
                      loading={isLoading}
                      disabled={isLoading || !formData.content}
                    >
                      Post
                    </Button>
                  </div>
                </div>
              </nav>
            </form>
          </div>
        </article>
      </div>
    </div>
  );
};

export default CreatePost;
