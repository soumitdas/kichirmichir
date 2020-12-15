const UserAvatar = ({ className, name }) => {
  const getUserInitial = (userName = "") =>
    userName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substr(0, 2)
      .toUpperCase();

  if (!name) {
    return <></>;
  }

  return (
    <p className={className}>
      <span className="initials">{getUserInitial(name)}</span>
    </p>
  );
};

export default UserAvatar;
