import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { storage } from "../firebase";
import Button from "../components/Button";
import Notification from "../components/Notification";
import ChangePasswordForm from "../components/ChangePasswordForm";

const MAX_AVATAR_SIZE = 500 * 1024;
const MAX_COVER_PHOTO_SIZE = 1024 * 1024;

const Settings = () => {
  const auth = useAuth();
  const [file, setFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: auth.user?.displayName || "",
    photoURL: auth.user?.photoURL || "",
    bio: auth.user?.bio || "",
    coverPhoto: auth.user?.coverPhoto || "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    if (!e.target.files && !e.target.files[0]) {
      return;
    }
    if (
      e.target.files[0].size >
      (e.target.name === "coverPhoto" ? MAX_COVER_PHOTO_SIZE : MAX_AVATAR_SIZE)
    ) {
      setErrorMessage(
        `File size should not be greater than ${
          (e.target.name === "coverPhoto"
            ? MAX_COVER_PHOTO_SIZE
            : MAX_AVATAR_SIZE) / 1024
        } KB`
      );
      return;
    }

    setIsLoading(true);
    if (e.target.name === "avatars") {
      setFile(e.target.files[0]);
    } else if (e.target.name === "coverPhoto") {
      setCoverFile(e.target.files[0]);
    }
    const fileRef = storage.ref(
      `${e.target.name}/${auth.user.uid}/${Date.now()}`
    );
    fileRef
      .put(e.target.files[0])
      .then(() => fileRef.getDownloadURL())
      .then((url) => {
        setIsLoading(false);
        if (e.target.name === "avatars") {
          setFormData({ ...formData, photoURL: url });
        } else if (e.target.name === "coverPhoto") {
          setFormData({ ...formData, coverPhoto: url });
        }
      })
      .catch((e) => {
        setIsLoading(false);
        setErrorMessage(e.message);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    auth
      .updateUser(formData)
      .then(() => {
        setIsLoading(false);
        setIsEditing(false);
      })
      .catch((e) => {
        setIsLoading(false);
        setErrorMessage(e.message);
      });
  };

  return (
    <div className="box">
      <h1 className="title">Settings</h1>
      <hr />
      {errorMessage && (
        <Notification type="danger" handleClose={() => setErrorMessage("")}>
          {errorMessage}
        </Notification>
      )}
      <form onSubmit={handleSubmit} className="block">
        <div className="field">
          <label className="label">Email</label>
          <p className="control">
            <input
              className="input is-static"
              type="text"
              value={auth.user?.email}
              readOnly
            />
          </p>
        </div>
        <div className="field">
          <label className="label">Username</label>
          <p className="control">
            <input
              className="input is-static"
              type="text"
              value={auth.user?.userName}
              readOnly
            />
          </p>
        </div>
        <div className="field">
          <label className="label">Display Name</label>
          <p className="control">
            <input
              className={isEditing ? "input" : "input is-static"}
              type="text"
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </p>
        </div>
        {formData.photoURL && (
          <div className="my-1">
            <figure
              className="image is-1by1 is-96x96"
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
        <div className="field">
          <label className="label">
            {formData.photoURL ? "Change" : "Upload"} Avatar
          </label>
          <div className="control">
            <div className="file has-name">
              <label className="file-label">
                <input
                  className="file-input"
                  type="file"
                  accept="image/*"
                  name="avatars"
                  multiple={false}
                  onChange={handleFileChange}
                  disabled={!isEditing}
                />
                <span className="file-cta">
                  {file ? "Change" : "Choose a file…"}
                </span>
                {file && <span className="file-name">{file.name}</span>}
              </label>
            </div>
          </div>
        </div>
        <div className="field">
          <label className="label">Bio</label>
          <p className="control">
            <textarea
              className="textarea"
              name="bio"
              placeholder="Few words to describe yourself"
              value={formData.bio}
              onChange={handleChange}
              minLength="3"
              maxLength="200"
              readOnly={!isEditing}
            />
          </p>
        </div>
        {formData.coverPhoto && (
          <div className="my-1">
            <figure className="image is-3by1">
              <img src={formData.coverPhoto} alt="user cover" />
            </figure>
          </div>
        )}
        <div className="field">
          <label className="label">
            {formData.coverPhoto ? "Change" : "Upload"} Cover Photo
          </label>
          <div className="control">
            <div className="file has-name">
              <label className="file-label">
                <input
                  className="file-input"
                  type="file"
                  accept="image/*"
                  name="coverPhoto"
                  onChange={handleFileChange}
                  multiple={false}
                  disabled={!isEditing}
                />
                <span className="file-cta">
                  {coverFile ? "Change" : "Choose a file…"}
                </span>
                {coverFile && (
                  <span className="file-name">{coverFile.name}</span>
                )}
              </label>
            </div>
          </div>
        </div>
        <div className="buttons">
          {isEditing ? (
            <>
              <Button type="primary" loading={isLoading} disabled={isLoading}>
                Update
              </Button>
              <button
                className="button is-primary is-outlined"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              className="button is-primary"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          )}
        </div>
      </form>
      <hr />
      <div className="block">
        <h2 className="title is-4">Change your password</h2>
        <ChangePasswordForm />
      </div>
    </div>
  );
};

export default Settings;
