import { useState } from "react";
import firebase from "../firebase";
import Button from "./Button";
import Notification from "./Notification";

const ChangePasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const clearInputs = () => {
    setFormData({
      oldPassword: "",
      newPassword: "",
    });
  };

  const handleChange = (e) =>
    setFormData((form) => ({ ...form, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.oldPassword === formData.newPassword) {
      setErrorMessage("New password & Current password cannot be same");
      clearInputs();
      return;
    }
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
    //Firebase operations
    const user = firebase.auth().currentUser;
    const credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      formData.oldPassword
    );

    firebase
      .auth()
      .currentUser.reauthenticateWithCredential(credential)
      .then((resp) => resp.user.updatePassword(formData.newPassword))
      .then(() => {
        setIsLoading(false);
        setSuccessMessage("Password changed successfully");
        clearInputs();
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
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Old Password</label>
          <div className="control">
            <input
              className="input"
              type="password"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              required={true}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">New Password</label>
          <div className="control">
            <input
              className="input"
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              required={true}
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <Button
              type="primary"
              loading={isLoading}
              disabled={
                isLoading || !(formData.oldPassword && formData.newPassword)
              }
            >
              Change
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default ChangePasswordForm;
