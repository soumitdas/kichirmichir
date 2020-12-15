import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "../hooks/useRouter";
import UserAvatar from "./UserAvatar";

const Navbar = () => {
  const auth = useAuth();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  let navbarMenu;
  function toggleNavbar(e) {
    navbarMenu.classList.toggle("is-active");
    e.target.classList.toggle("is-active");
  }
  return (
    <nav
      className="navbar has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item">
            <span className="is-size-4 has-text-weight-semibold">
              kichirmichir
            </span>
          </Link>

          <a
            onClick={toggleNavbar}
            role="button"
            className="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div className="navbar-menu" ref={(el) => (navbarMenu = el)}>
          {auth.user?.userName && (
            <div className="navbar-start">
              <div className="navbar-item">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSearchTerm("");
                    router.push(`/search?q=${searchTerm}`);
                  }}
                >
                  <div className="field">
                    <p className="control">
                      <input
                        className="input"
                        type="text"
                        placeholder="Find a user (press enter to search)"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        required={true}
                      />
                    </p>
                  </div>
                </form>
              </div>
            </div>
          )}
          <div className="navbar-end">
            {auth.user?.userName && (
              <>
                <NavLink
                  to="/"
                  className="navbar-item"
                  activeClassName="is-active"
                >
                  Home
                </NavLink>
                {/* <NavLink
                to={`/profile/${auth.user.userName}`}
                className="navbar-item"
                activeClassName="is-active"
              >
                My Profile
              </NavLink> */}
                <NavLink
                  to="/settings"
                  className="navbar-item"
                  activeClassName="is-active"
                >
                  Settings
                </NavLink>
                <Link
                  to={`/profile/${auth.user.userName}`}
                  className="navbar-item has-user-avatar"
                >
                  {auth.user.photoURL ? (
                    <figure className="is-user-avatar">
                      <img
                        src={auth.user.photoURL}
                        alt={auth.user.displayName}
                      />
                    </figure>
                  ) : (
                    <UserAvatar
                      className="avatar-circle-nav"
                      name={auth.user.displayName}
                    />
                  )}
                  {auth.user.displayName}
                </Link>
              </>
            )}
            <div className="navbar-item">
              {auth.user ? (
                <button
                  onClick={() => auth.signout()}
                  className="button is-primary"
                >
                  Sign out
                </button>
              ) : (
                <div className="buttons">
                  <Link
                    to={{
                      pathname: "/signup",
                      state: { from: router.location },
                    }}
                    className="button is-primary is-outlined"
                  >
                    Sign up
                  </Link>
                  <Link
                    to={{
                      pathname: "/signin",
                      state: { from: router.location },
                    }}
                    className="button is-primary"
                  >
                    Sign in
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
