import { ReactComponent as LoadingSpinnerIcon } from "../assets/icons/loading-spinner.svg";

const LoadingSpinner = ({ size = "32" }) => {
  return (
    <figure className={`image is-${size}x${size} is-mx-auto`}>
      <LoadingSpinnerIcon />
    </figure>
  );
};

export default LoadingSpinner;
