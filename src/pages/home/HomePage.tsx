import { NumContent} from "./style";
import { Button, ButtonProps, Container, 
  Dialog, DialogActions, DialogContent, 
  DialogTitle, Fab, styled, useMediaQuery, 
  useTheme } from "@mui/material";
import { pink, orange } from "@mui/material/colors";
import { Done } from "@mui/icons-material";
import { forwardRef, useState } from "react";
import { useCallback } from "react";
import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import { IMaskInput } from "react-imask";
import { ReactElement } from "react-imask/dist/mixin";

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

interface PinkButtonProps extends ButtonProps {
  selected?: boolean;
}

const PinkButton = styled(Button)<PinkButtonProps>(({ theme, selected }) => ({
  color: theme.palette.getContrastText(pink[400]),
  backgroundColor: selected ? pink[400] : pink[200],
  '&:hover': {
    backgroundColor: selected ? pink[400] : pink[200],
  }
}));

const FinishedButton = styled(Fab)(({ theme }) => ({
  margin: '0',
  top: 'auto',
  position: 'fixed',
  left: '50%',
  transform: 'translateX(-50%)',
  bottom: '20px',
  color: theme.palette.getContrastText(pink[500]),
  backgroundColor: orange[600],
  '&:hover': {
    backgroundColor: orange[700],
  }
}));

function HomePage() {
  var numbers = Array.from({length: 100}, (_, i) => i + 1);
  const [selectedNumbers, setSelectedNumbers] = useState<any[]>([]);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = useState(false);

  const handleNumberClick = useCallback((n: any) => {
    setSelectedNumbers(
      selectedNumbers.includes(n)
      ? selectedNumbers.filter(i => i !== n)
      : [...selectedNumbers, n]);
  }, [selectedNumbers, setSelectedNumbers]);

  const handleFinshed = () => {
    setOpen(true);
  }

  const handleCancelFinished = () => {
    setOpen(false);
  }

  const TextMaskCustom = forwardRef<ReactElement, CustomProps>(
    function TextMaskCustom(props, ref) {
      const { onChange, ...other } = props;
      return (
        <IMaskInput
          {...other}
          mask="(#0) 0 0000-0000"
          definitions={{
            '#': /[1-9]/,
          }}
          //inputRef={ref}
          onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
          overwrite
        />
      );
    },
  );

  return (
    <Container maxWidth="sm">
      <NumContent>
        {numbers.map(n => 
          <PinkButton
            key={n}
            variant="contained"
            size="large"
            onClick={() => handleNumberClick(n)}
            selected={selectedNumbers.includes(n)}
          >
            {n}
          </PinkButton>
        )}
      </NumContent>

      {selectedNumbers.length > 0 &&
        <FinishedButton variant="extended" onClick={handleFinshed}>
          <Done />
          Finalizar
        </FinishedButton>
      }

      <Dialog
        open={open}
        fullScreen={fullScreen}
        onClose={handleCancelFinished}
      >
        <FormContainer onSuccess={(values) => console.log(values)}>
          <DialogTitle>Finalizar</DialogTitle>
          <DialogContent>
            <div>
              <TextFieldElement fullWidth name="name" label="Nome" margin="dense" required />
              <TextFieldElement fullWidth name="phone" label="Celular" margin="dense" required InputProps={{
                inputComponent: TextMaskCustom as any
              }} />
            </div>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleCancelFinished}>Cancelar</Button>
            <Button type="submit" autoFocus>Ok</Button>
          </DialogActions>
        </FormContainer>
      </Dialog>
    </Container>
  );
}

export default HomePage;