import { Container, Fab, styled } from "@mui/material";
import { pink, orange } from "@mui/material/colors";
import { Done } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useCallback } from "react";
import api from "../../shared/api";
import { NumberModel } from "../../models/number-model";
import NumbersList from "../../components/numbers-list";
import Loading from "../../components/loading";
import OrderDialog from "../../components/order-dialog";

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
  const [numbers, setNumbers] = useState<NumberModel[]>([]);
  const [selectedNumbers, setSelectedNumbers] = useState<NumberModel[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function getNumbers() {
      const numbersResponse = await api.get<NumberModel[]>('/numbers');
      setNumbers(numbersResponse.data);
      setLoading(false);
    }

    getNumbers();
  }, [setLoading]);

  const handleNumberClick = useCallback((n: NumberModel) => {
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

  return (
    <Container maxWidth="sm">
      {loading 
        ? <Loading />
        :
        <>
          <NumbersList
            numbers={numbers}
            selectedNumbers={selectedNumbers}
            onSelect={handleNumberClick}
          />

          {selectedNumbers.length > 0 &&
            <FinishedButton variant="extended" onClick={handleFinshed}>
              <Done />
              Finalizar
            </FinishedButton>
          }

          <OrderDialog
            open={open}
            numbers={selectedNumbers}
            onClose={handleCancelFinished}
          />
        </>
      }
    </Container>
  );
}

export default HomePage;