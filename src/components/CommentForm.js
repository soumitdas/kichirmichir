import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import UserAvatar from "./UserAvatar";
import Button from "./Button";
import Notification from "./Notification";

const MAX_COMMENT_CHARACTER = 100;

const CommentForm = ({ addComment }) => {
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    addComment(comment)
      .then(() => {
        setIsLoading(false);
        setComment("");

        setSuccessMessage("Commented successfully...");
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
    <>
      {successMessage && (
        <Notification type="success" handleClose={() => setSuccessMessage("")}>
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
            <figure className="image is-1by1 is-48x48">
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
            <div className="field has-addons">
              <div className="control is-expanded">
                <input
                  className="input"
                  type="text"
                  placeholder="Post your reply"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  maxLength={MAX_COMMENT_CHARACTER}
                  required={true}
                />
              </div>
              <div className="control">
                <Button loading={isLoading} disabled={isLoading}>
                  Send
                </Button>
              </div>
            </div>
          </form>
        </div>
      </article>
    </>
  );
};

export default CommentForm;
