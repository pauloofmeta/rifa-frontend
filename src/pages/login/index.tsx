import { LoadingButton, LoadingButtonProps } from "@mui/lab";
import { Box, Container, Paper,
  styled, Typography } from "@mui/material";
import { pink } from "@mui/material/colors";
import { useState } from "react";
import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import { useNavigate } from "react-router-dom";
import { useSnack } from "../../contexts/SnackContext";
import { useAuth } from "../../hooks/AuthProvider";

interface LoginData {
  email: string;
  password: string;
}

const PinkBtn = styled(LoadingButton)<LoadingButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(pink[500]),
  backgroundColor: pink[500],
  '&:hover': {
    backgroundColor: pink[700],
  },
}));

export default function LoginPage() {
  const navigate = useNavigate();
  const auth = useAuth();
  const snack = useSnack();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async ({ email, password }: LoginData) => {
    try {
      setLoading(true);
      await auth.signin(email, password);
      setLoading(false);
      navigate('/admin', { replace: true })
    } catch (error: any) {
      const errorMessage = error.message || 'Erro ao tentar o login';
      setLoading(false);
      snack.showAlert({ type: 'error', title: 'Usuário ou Senha invalidos!', message: errorMessage });
    }
  }

  return (
    <Container component='main' maxWidth='xs'>
      <Box 
        component={Paper}
        sx={{
          marginTop: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 2
        }}
      >
        <Typography component='h1' variant='h5'>
          Login
        </Typography>

        <Box component={FormContainer} onSuccess={handleSubmit} sx={{ mt: 1 }}>
          <TextFieldElement
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            autoFocus
            disabled={loading}
          />
          <TextFieldElement
            margin="normal"
            required
            fullWidth
            id="password"
            label="Senha"
            name="password"
            type="password"
            autoComplete="current-password"
            autoFocus
            disabled={loading}
          />
          <PinkBtn
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2}}
            loading={loading}
          >
            Entrar
          </PinkBtn>
        </Box>
      </Box>
    </Container>
  );
}