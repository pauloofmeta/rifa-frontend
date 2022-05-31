import { Alert, AlertTitle, Snackbar } from "@mui/material";
import { createContext, ReactNode, useContext, useState } from "react";

interface SnackAlert {
  type: 'success' | 'error' | 'info' | 'warning';
  title?: string;
  message: string;
}

interface SnackContextProps {
  showAlert: (alert: SnackAlert) => void;
}

const SnackContext = createContext<SnackContextProps>(null!);

function SnackProvider({children}: {children: ReactNode}) {
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState<SnackAlert>(null!);

  const showAlert = (alert: SnackAlert) => {
    console.log('Set Alert', alert);
    setAlert(alert);
    setOpen(true);
  }

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const value = { showAlert };

  return (
    <SnackContext.Provider value={value}>
      {children}
      {alert && (
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert severity={alert.type}>
            {alert.title && <AlertTitle>{alert.title}</AlertTitle>}
            {alert.message}
          </Alert>
        </Snackbar>
      ) }
    </SnackContext.Provider>
  );
}

const useSnack = () => useContext(SnackContext);

export { SnackProvider, useSnack }