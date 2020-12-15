// Ref: https://usehooks.com/useAuth/
import React, { useState, useEffect, useContext, createContext } from "react";
import firebase, { auth, db } from "../firebase";

const getUserObj = (user) => {
  const {
    uid,
    email,
    displayName,
    photoURL,
    emailVerified,
    phoneNumber,
  } = user;
  return {
    uid,
    email,
    displayName,
    photoURL,
    emailVerified,
    phoneNumber,
  };
};

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signin = (email, password) => {
    return auth
      .signInWithEmailAndPassword(email, password)
      .then((response) => response.user);
  };

  const signup = (email, password) => {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((response) => response.user);
  };

  const completeSignup = ({ displayName, photoURL, userName, bio }) => {
    if (!user.uid) {
      return;
    }
    return (
      db
        .doc(`users/${user.uid}`)
        .set({ displayName, photoURL, userName, bio })
        //.then(() => auth.currentUser.updateProfile({ displayName, photoURL }))
        .then(() => {
          setUser({
            ...user,
            displayName,
            photoURL,
            userName,
            bio,
          });
          return true;
        })
    );
  };

  const signout = () => {
    return auth.signOut().then(() => {
      setUser(false);
    });
  };

  const sendPasswordResetEmail = (email) => {
    return auth
      .sendPasswordResetEmail(email, {
        url: `${process.env.REACT_APP_BASE_URL}/signin`,
      })
      .then(() => {
        return true;
      });
  };

  // const confirmPasswordReset = (code, password) => {
  //   return auth.confirmPasswordReset(code, password).then(() => {
  //     return true;
  //   });
  // };

  const updateUser = ({ displayName, photoURL, bio, coverPhoto }) => {
    if (!user.uid) {
      return;
    }
    return db
      .doc(`users/${user.uid}`)
      .set({ displayName, photoURL, bio, coverPhoto }, { merge: true })
      .then(() =>
        setUser((user) => ({ ...user, displayName, photoURL, bio, coverPhoto }))
      );
  };

  const fetchUser = (uid) =>
    db
      .doc(`users/${uid}`)
      .get()
      .then((doc) => doc.data())
      .catch(() => ({}));

  //const token = () => auth.currentUser.getIdToken();

  const doFollow = (userId) => {
    if (!user.uid) {
      return;
    }
    const currentFollowing =
      user.following instanceof Array ? user.following : [];

    const isAlreadyFollowing = currentFollowing.includes(userId);

    return db
      .doc(`users/${user.uid}`)
      .update({
        following: isAlreadyFollowing
          ? firebase.firestore.FieldValue.arrayRemove(userId)
          : firebase.firestore.FieldValue.arrayUnion(userId),
      })
      .then(() => {
        const index = currentFollowing.indexOf(userId);
        if (index > -1) {
          currentFollowing.splice(index, 1);
        } else {
          currentFollowing.push(userId);
        }
        setUser((userData) => ({
          ...userData,
          following: [...currentFollowing],
        }));
      });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((fbUser) => {
      if (fbUser) {
        setUser(getUserObj(fbUser));

        fetchUser(fbUser.uid).then((userDoc) => {
          if (userDoc) {
            setUser((user) => ({ ...user, ...userDoc }));
          }
        });
      } else {
        setUser(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    //token,
    signin,
    signup,
    completeSignup,
    signout,
    sendPasswordResetEmail,
    //confirmPasswordReset,
    updateUser,
    doFollow,
  };
}
