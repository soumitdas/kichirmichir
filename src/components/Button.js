const Button = ({
  type,
  size = "normal",
  loading,
  disabled,
  static: isStatic,
  rounded,
  fullWidth,
  outlined,
  onClick,
  children,
}) => (
  <button
    type="submit"
    className={`button is-${type} is-${size} ${fullWidth && "is-fullwidth"} ${
      rounded && "is-rounded"
    } ${loading && "is-loading"} ${outlined && "is-outlined"} ${
      isStatic && "is-static"
    }`}
    disabled={disabled}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
