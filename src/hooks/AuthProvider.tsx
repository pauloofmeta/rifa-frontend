import * as React from "react";
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import app from '../shared/firebase';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const fakeAuthProvider = {
  isAuthenticated: false,
  signout(callback: VoidFunction) {
    fakeAuthProvider.isAuthenticated = false;
    setTimeout(callback, 100);
  },
};

interface UserModel {
  email: string;
  token: string;
}

interface AuthContextType {
  user: any;
  signin: (email: string, password: string) => Promise<void>;
  signout: () => Promise<void>;
}

const AuthContext = React.createContext<AuthContextType>(null!);

function AuthProvider({children}: {children: ReactNode}) {
  const [user, setUser] = React.useState<UserModel | null>(() =>
    JSON.parse(localStorage.getItem('authUser') || '{}'));

  const signin = async (email: string, password: string) => {
    const auth = getAuth(app);
    const credential = await signInWithEmailAndPassword(auth, email, password);
    const token = await credential.user.getIdToken();
    const authUser = { email, token };
    localStorage.setItem('authUser', JSON.stringify(authUser));
    setUser(authUser);
  };

  const signout = async () => {
    const auth = getAuth(app);
    await signOut(auth);
    localStorage.removeItem('authUser');
    setUser(null);
  };

  const value = { user, signin, signout };
  return <AuthContext.Provider value={value} >{children}</AuthContext.Provider>
}

const useAuth = () => React.useContext(AuthContext);

function RequireAuth({children}: {children: JSX.Element}) {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.user) {
    return <Navigate to='/login' state={{from: location}} replace />;
  }

  return children;
}

export {useAuth, AuthProvider, RequireAuth};