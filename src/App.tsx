import { Link, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { SnackProvider } from './contexts/SnackContext';
import { AuthProvider, RequireAuth } from './hooks/AuthProvider';
import FinishPage from './pages/finish';
import HomePage from './pages/home/HomePage';
import LoginPage from './pages/LoginPage';
import Layout from './shared/Layout';
import { GlobalStyle } from './styles/globalStyle';
import { defaultTheme } from './styles/theme';

function Admin() {
  return (
    <div>
      <h1>Admin</h1>
    </div>
  );
}

function NotFound() {
  return (
    <div>
      <h3>Pagina não encontrada</h3>
      <Link to='/'>Home</Link>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <AuthProvider>
        <SnackProvider>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<HomePage />} />
              
              <Route path='login' element={<LoginPage/>} />
              <Route path='admin' element={<RequireAuth><Admin /></RequireAuth>} />
            </Route>
            <Route path='finish' element={<FinishPage />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
          <GlobalStyle />
        </SnackProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
