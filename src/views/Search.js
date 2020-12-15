import { useState, useRef, useEffect } from "react";
import { useRouter } from "../hooks/useRouter";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import Button from "../components/Button";
import UserAvatar from "../components/UserAvatar";

const Search = () => {
  const router = useRouter();
  const formRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState(router.query.q || "");
  const [isEditing, setIsEditing] = useState(true);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (router.query.q) {
      formRef.current.requestSubmit();
    }
  }, [router.query.q]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    db.collection("users")
      .where("userName", "==", searchTerm)
      .get()
      .then((snapshot) => {
        setIsLoading(false);
        setIsEditing(false);
        if (!snapshot.empty) {
          const users = [];
          snapshot.forEach((doc) => users.push({ uid: doc.id, ...doc.data() }));
          setResults(users);
        }
      })
      .catch((e) => setIsLoading(false));
  };

  return (
    <>
      <form ref={formRef} onSubmit={handleSubmit} className="field is-grouped">
        <p className="control is-expanded">
          <input
            className="input"
            type="text"
            placeholder="Find a user"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            required={true}
            readOnly={!isEditing || isLoading}
          />
        </p>
        <p className="control">
          {isEditing ? (
            <Button
              type="primary"
              outlined
              loading={isLoading}
              disabled={isLoading}
            >
              Search
            </Button>
          ) : (
            <button
              className="button is-primary"
              onClick={(e) => setIsEditing(true)}
            >
              Edit
            </button>
          )}
        </p>
      </form>
      {results.length > 0 ? (
        results.map((result) => (
          <div key={result.uid} className="notification is-primary is-light">
            {result.photoURL ? (
              <figure className="image is-1by1 is-48x48" style={{ paddingTop: 0 }}>
                <img
                  className="is-rounded"
                  src={result.photoURL}
                  alt={result.displayName}
                />
              </figure>
            ) : (
              <UserAvatar
                className="avatar-circle-small"
                name={result.displayName}
              />
            )}
            <Link to={`/profile/${result.userName}`}>{result.displayName}</Link>
          </div>
        ))
      ) : isLoading ? (
        <h2 className="title is-4 has-text-centered">Loading...</h2>
      ) : (
        <h2 className="title is-4 has-text-centered">No user found</h2>
      )}
    </>
  );
};

export default Search;
