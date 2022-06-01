import { Box, Card, Container, Switch, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Loading from "../../components/loading";
import { useAuth } from "../../hooks/AuthProvider";
import api from "../../shared/api";

export default function AdminPage() {
  const auth = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getOrders() {
      setLoading(true);
      try {
        const orderResponse = await api.get<any[]>('/orders', {
          headers: {
            Authorization: `Bearer ${auth.user?.token}`
          }
        });
        setOrders(orderResponse.data);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
      }
    }

    getOrders();

  }, [setOrders, auth]);

  return (
    <Container maxWidth='md'>
      {loading 
        ? <Loading /> :
        <>
          {orders.map((order, index) => (
            <Card 
              key={index}
              sx={{
                padding: 2
              }}
            >
              <Box>
                <Typography variant="caption" component="span">Nome</Typography>
                <Typography variant="subtitle1">
                  {order.name}
                </Typography>
              </Box>

              <Box>
                <Typography variant="caption" component="span">Telefone</Typography>
                <Typography variant="subtitle1">
                  {order.phone}
                </Typography>
              </Box>

              <Box>
                <Typography variant="caption" component="span">Opção</Typography>
                <Typography variant="subtitle1">
                  {order.option === 1 ? 'Pix' : 'Fralda'}
                </Typography>
              </Box>

              <Box>
                <Typography variant="caption" component="span">Números</Typography>
                <Typography variant="subtitle1">
                  {order.numbers.join(',')}
                </Typography>
              </Box>

              <Box>
                <Typography variant="caption" component="span">Data</Typography>
                <Typography variant="subtitle1">
                  {order.createdAt}
                </Typography>
              </Box>

              <Box>
                <Typography variant="caption" component="span">Confirmado</Typography>
                <Switch 
                  checked={order.confirmed}
                />
              </Box>
            </Card>
          ))}
        </>
      }
    </Container>
  );
}