"use client";

import { createContext, FC, useEffect, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  AuthError,
} from "firebase/auth";
import firebaseApp from "@/firebase/config";

type ContextState = {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
};

interface FirebaseAuthProviderProps {
  children: React.ReactNode;
}

const defaultContextValue: ContextState = {
  user: null,
  signIn: async () => {},
  signUp: async () => {},
};

const FirebaseAuthContext = createContext<ContextState>(defaultContextValue);

const FirebaseAuthProvider: FC<FirebaseAuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(defaultContextValue.user);
  const auth = getAuth(firebaseApp);

  const signIn = async (email: string, password: string): Promise<void> => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      handleAuthError(error);
    }
  };

  const signUp = async (email: string, password: string): Promise<void> => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      handleAuthError(error);
    }
  };

  const handleAuthError = (error: AuthError): void => {
    // Handle error, e.g., display an error message to the user
    console.error("Authentication Error:", error.message);
  };

  const contextValue = { user, signIn, signUp };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
    });
    return unsubscribe;
  }, [auth]);

  return (
    <FirebaseAuthContext.Provider value={contextValue}>
      {children}
    </FirebaseAuthContext.Provider>
  );
};

export { FirebaseAuthProvider, FirebaseAuthContext };
