const Share = ({ postId }) => {
  const postLink = `${process.env.REACT_APP_BASE_URL}/posts/${postId}`;
  const whatsappLink = encodeURI(
    `whatsapp://send?text=Check out my recent post at Kichir Michir ${postLink}`
  );
  return <a href={whatsappLink}>Share</a>;
};

export default Share;
