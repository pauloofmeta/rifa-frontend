import { FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";

type LocationState  = {
  from: {
    pathname: string;
  };
}

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const { from } = location.state as LocationState;

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    auth.signin(email, password, () => {
      navigate(from.pathname ?? '/', { replace: true });
    });
  }

  return (
    <div>
      <p>Login</p>
      <form onSubmit={handleLogin}>
        <input name='email' type='email' placeholder='Email' />
        <input name='password' type='password' placeholder='Senha' />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default LoginPage;