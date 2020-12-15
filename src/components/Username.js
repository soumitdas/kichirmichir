import { useState, useEffect } from "react";
import useDebounce from "../hooks/useDebounce";
import { db } from "../firebase";

const Username = ({ initValue = "", onChange, required = false }) => {
  const [value, setValue] = useState(initValue);
  const [isSearching, setIsSearching] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);

  const debouncedSearchTerm = useDebounce(value, 1000);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsSearching(true);
      db.collection("users")
        .where("userName", "==", debouncedSearchTerm)
        .get()
        .then((snapshot) => {
          setIsSearching(false);
          setIsAvailable(snapshot.empty);

          if (snapshot.empty) {
            onChange({
              target: { name: "userName", value: debouncedSearchTerm },
            });
          } else {
            throw new Error("userName already exists");
          }
        })
        .catch((e) => {
          setIsSearching(false);
          setIsAvailable(false);
          onChange({ target: { name: "userName", value: "" } });
        });
    } else {
      setIsAvailable(false);
      onChange({ target: { name: "userName", value: "" } });
    }
  }, [debouncedSearchTerm]);

  return (
    <div className="field">
      <label className="label">Username</label>
      <div className="control">
        <input
          className="input"
          type="text"
          name="username"
          placeholder="johncorner"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required={required}
        />
      </div>
      {value &&
        (isSearching ? (
          <p className="help">Searching...</p>
        ) : isAvailable ? (
          <p className="help is-success">{`${debouncedSearchTerm} is available`}</p>
        ) : (
          <p className="help is-danger">{`${debouncedSearchTerm} is not-available`}</p>
        ))}
    </div>
  );
};

export default Username;
