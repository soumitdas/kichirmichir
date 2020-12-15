const Notification = ({
  type = "primary",
  light = true,
  children,
  handleClose,
}) => {
  return (
    <div className={`notification is-${type} ${light ? "is-light" : ""}`}>
      <button onClick={handleClose} className="delete"></button>
      {children}
    </div>
  );
};

export default Notification;
