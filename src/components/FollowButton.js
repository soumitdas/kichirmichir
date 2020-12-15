import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Button from "./Button";

const FollowButton = ({ data = {} }) => {
  const { user, doFollow } = useAuth();

  const isFollowing = user?.following?.includes(data.uid) || false;

  const [isLoading, setIsLoading] = useState(false);

  const handleClick = (e) => {
    setIsLoading(true);
    doFollow(data.uid)
      .then(() => {
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        //alert(e.message);
      });
  };

  return (
    <Button
      type="primary"
      outlined={!isFollowing}
      rounded={true}
      loading={isLoading}
      disabled={isLoading}
      onClick={handleClick}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};

export default FollowButton;
