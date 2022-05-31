import { Dialog, DialogContent, DialogTitle, Button,
  useMediaQuery, useTheme, DialogActions } from "@mui/material";
import { AxiosError } from "axios";
import { forwardRef, ReactElement, useState } from "react";
import { FormContainer, TextFieldElement, RadioButtonGroup } from "react-hook-form-mui";
import { IMaskInput } from "react-imask";
import { useSnack } from "../../contexts/SnackContext";
import { useNavigateSearch } from "../../hooks/navigateSearch";
import { NumberModel } from "../../models/number-model";
import api from "../../shared/api";
import Loading from "../loading";

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
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

interface OrderDialogProps {
  open: boolean;
  onClose: () => void;
  numbers: NumberModel[];
}

const OrderDialog = ({ open, onClose, numbers }: OrderDialogProps) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const snack = useSnack();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigateSearch();

  const options = [
    { id: '1', label: 'Pix' },
    { id: '2', label: 'Fralda' }
  ];

  const handleSubmit = async (values: any) => {
    const { name, phone, option } = values;
    setLoading(true);
    try {
      var response = await api.post('/orders', {
        name,
        phone,
        option: Number(option),
        numbers: numbers.map(n => n.number)
      });

      if (response.status !== 200) {
        console.warn('Erro ao salvar', response.data)
        return;
      }
      
      setLoading(false);
      navigate('/finish', { option } );
    } catch (error: any) {
      if (error instanceof AxiosError) {
        const axiosError = error as AxiosError;
        const data = axiosError.response?.data as any;
        if (data['errors']) {
          const erroMsg = (data['errors'] as any[])
            .map(e => e.msg)
            .join(',');
          
          snack.showAlert({ 
            type: 'error',
            title: 'Erro ao salvar Pedido',
            message: erroMsg
          });
        } else {
          snack.showAlert({ type: 'error', message: `Erro ao salvar Pedido: ${axiosError.status}, ${axiosError.message}` })
        }
      } else {
        snack.showAlert({ type: 'error', message: `Erro ao salvar Pedido: ${error.message}` })
      }
      setLoading(false);
    }
  };
  
  return (
    <Dialog
      open={open}
      fullScreen={fullScreen}
      onClose={onClose}
    >
      <FormContainer onSuccess={handleSubmit}>
        <DialogTitle>Finalizar</DialogTitle>
        <DialogContent>
          {loading
            ? <Loading /> :
            <div>
              <TextFieldElement fullWidth name="name" label="Nome" margin="dense" required />
              <TextFieldElement fullWidth name="phone" label="Celular" margin="dense" required InputProps={{
                inputComponent: TextMaskCustom as any
              }} />
              <RadioButtonGroup row name="option" label="Opção" options={options} required />
            </div>
          }
        </DialogContent>
        <DialogActions>
          <Button autoFocus disabled={loading} onClick={onClose}>Cancelar</Button>
          <Button type="submit" disabled={loading} autoFocus>Ok</Button>
        </DialogActions>
      </FormContainer>
    </Dialog>
  );
}

export default OrderDialog;