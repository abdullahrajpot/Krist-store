import React, { createContext, useCallback, useContext, useEffect, useReducer, useState } from 'react';
import { auth, firestore } from '../config/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import ScreenLoader from '../components/ScreenLoader';

const Auth = createContext();
const { toastify } = window;
const initialState = { isAuthenticated: false, user: {} };

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "SET_LOGGED_IN":
      return { isAuthenticated: true, user: payload.user };
    case "SET_PROFILE":
      return { ...state, user: payload.user };
    case "SET_LOGGED_OUT":
      return initialState; // Reset state on logout
    default:
      return state;
  }
};

export default function AuthContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isScreenLoading, setIsScreenLoading] = useState(true);

  const readProfile = useCallback(() => {
    setIsScreenLoading(true);
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await readUserProfile(user);
      } else {
        dispatch({ type: "SET_LOGGED_OUT" });
        setIsScreenLoading(false); // Set loading to false when logged out
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    readProfile();
  }, [readProfile]);

  const readUserProfile = async (user) => {
    try {
      const docSnap = await getDoc(doc(firestore, "users", user.uid));
      if (docSnap.exists()) {
        const userProfile = docSnap.data();
        dispatch({ type: "SET_LOGGED_IN", payload: { user: userProfile } });
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    } finally {
      setIsScreenLoading(false); // Hide loader after fetching
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      toastify("User logged out");
      dispatch({ type: "SET_LOGGED_OUT" });
    } catch (error) {
      console.error(error.code);
      toastify("Something went wrong while logging out", "error");
    }
  };

  // Render the loader if screen is loading
  if (isScreenLoading) {
    return <ScreenLoader />;
  }

  const updateUser = async (updatedUser) => {
    const userId = state.user.uid;
    if (!userId) return;

    try {
      await updateDoc(doc(firestore, 'users', userId), {
        fullName: updatedUser.name, // Make sure this matches your Firestore structure
        // Include other fields you want to update, e.g., address
        // address: updatedUser.address, // Uncomment if you are using an address field
      });

      dispatch({
        type: "SET_PROFILE",
        payload: {
          user: { ...state.user, ...updatedUser }
        }
      });
      toastify("User profile updated successfully", "success");
    } catch (error) {
      console.error("Error updating user data:", error);
      toastify("Failed to update user profile", "error");
    }
  };

  return (
    <Auth.Provider value={{ state, dispatch, user: state.user, logOut, updateUser }}>
      {children}
    </Auth.Provider>
  );
}

export const useAuthContext = () => useContext(Auth);
