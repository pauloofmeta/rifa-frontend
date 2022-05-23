import * as React from "react";
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

const fakeAuthProvider = {
  isAuthenticated: false,
  signin(callback: VoidFunction) {
    fakeAuthProvider.isAuthenticated = true;
    setTimeout(callback, 100); // fake async
  },
  signout(callback: VoidFunction) {
    fakeAuthProvider.isAuthenticated = false;
    setTimeout(callback, 100);
  },
};

interface AuthContextType {
  user: any;
  signin: (email: string, password: string, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
}

const AuthContext = React.createContext<AuthContextType>(null!);

function AuthProvider({children}: {children: ReactNode}) {
  const [user, setUser] = React.useState<any>(null);

  const signin = (email: string, password: string, callback: VoidFunction) => {
    return fakeAuthProvider.signin(() => {
      setUser({ email, password });
      callback();
    });
  };

  const signout = (callback: VoidFunction) => {
    return fakeAuthProvider.signout(() => {
      setUser(null);
      callback();
    });
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