import { Link, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { SnackProvider } from './contexts/SnackContext';
import { AuthProvider, RequireAuth } from './hooks/AuthProvider';
import AdminPage from './pages/admin';
import FinishPage from './pages/finish';
import HomePage from './pages/home/HomePage';
import LoginPage from './pages/login';
import Layout from './shared/Layout';
import { GlobalStyle } from './styles/globalStyle';
import { defaultTheme } from './styles/theme';

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
              <Route path='admin' element={<RequireAuth><AdminPage /></RequireAuth>} />
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
