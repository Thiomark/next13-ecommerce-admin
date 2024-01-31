import { createContext, FC, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

type ContextState = { user: User | null };

interface FirebaseAuthProviderProps {
  children: React.ReactNode;
}

const FirebaseAuthContext = createContext<ContextState | undefined>(undefined);

const FirebaseAuthProvider: FC<FirebaseAuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const value = { user };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return unsubscribe;
  }, []);

  return (
    <FirebaseAuthContext.Provider value={value}>
      {children}
    </FirebaseAuthContext.Provider>
  );
};

export { FirebaseAuthProvider };
