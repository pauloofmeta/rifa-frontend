import { Done, Delete } from "@mui/icons-material";
import { Card, CardActions, CardContent, Chip,
  Grid, IconButton, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import styled from "styled-components";
import { useSnack } from "../../contexts/SnackContext";
import { useAuth } from "../../hooks/AuthProvider";
import { OrderModel } from "../../models/order-model";
import api from "../../shared/api";

const ConfirmedTag = styled.div`
  background: #2f7c31;
  right: 3px;
  padding: 5px;
  font-size: 12px;
  border-radius: 5px;
  color: white;
  left: 10px;
  width: 90px;
  text-align: center;
  left: 0;
`;

interface OrderItemProps {
  order: OrderModel;
  onDelete: (order: OrderModel) => void;
}

export default function OrderItem({ order , onDelete}: OrderItemProps) {
  const [hasConfirmed, setHasConfirmed] = useState(order.confirmed);
  const snack = useSnack();
  const auth = useAuth();

  const getDateFormated = (dateInput: any) => {
    if (dateInput) {
      const dateConvert = new Date(dateInput);
      const hours = dateConvert.toLocaleTimeString('pt-BR', { hour12: false, timeStyle: 'short' });
      return `${dateConvert.toLocaleDateString('pt-BR')} ${hours}`;
    }
    return '';
  }

  const handleConfirme = useCallback(async () => {
    try {
      const response = await api.put(`/orders/${order.id}`, { confirmed: true }, {
        headers: {
          Authorization: `Bearer ${auth.user?.token}`
        }
      });
      if (response.status !== 200) {
        snack.showAlert({ type: 'warning', message: 'Não foi possivel confirmar seu pedido!' });
        return;
      }

      setHasConfirmed(true);
      snack.showAlert({ type: 'success', message: 'Pedido Confirmado com sucesso!' });

    } catch (error: any) {
      snack.showAlert({ type: 'error', title: 'Ocorreu um erro ao confirmar um pedido!', message: error.message ||'' })
    }

  }, [order, snack, auth, setHasConfirmed]);

  const handleDelete = useCallback(async () => {
    try {
      const response = await api.delete(`/orders/${order.id}`, {
        headers: {
          Authorization: `Bearer ${auth.user?.token}`
        }
      });
      if (response.status !== 200) {
        snack.showAlert({ type: 'warning', message: 'Não foi possivel exlcuir seu pedido!' });
        return;
      }

      onDelete(order);
      snack.showAlert({ type: 'success', message: 'Pedido exlcuido com sucesso!' });
    } catch (error: any) {
      snack.showAlert({
        type: 'error',
        title: 'Ocorreu um erro ao excluir um pedido!', 
        message: error.message || ''
      });
    }
  }, [order, snack, auth, onDelete]);

  return (
    <Card 
      key={order.id}
      sx={{
        padding: 2,
        marginBottom: 2,
      }}
    >
      <CardContent>
        <Grid container spacing={1} justifyContent="space-between">
          <Grid item xs={hasConfirmed ? 8 : 12} lg={hasConfirmed ? 10 : 12}>
            <Typography variant="subtitle1">
              {order.name}
            </Typography>
          </Grid>

          {hasConfirmed && 
            <Grid item xs={4} lg={2}>
              <ConfirmedTag>Confirmado</ConfirmedTag>
            </Grid>
          }

          <Grid item xs>
            <Typography variant="caption">
              {order.phone}
            </Typography>
          </Grid>

          <Grid item xs>
            <Typography variant="caption">
              {order.option === 1 ? 'Pix' : 'Fralda'}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="caption">
              {getDateFormated(order.createdAt)}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            {order.numbers.map((n, index) => <Chip key={index} label={n} />)}
          </Grid>
        </Grid>
      </CardContent>

      {!hasConfirmed && 
        <CardActions>
          <IconButton
            aria-label="confirmar"
            size="small"
            color="success"
            onClick={handleConfirme}
          >
            <Done />
          </IconButton>

          <IconButton
            aria-label="excluir"
            size="small"
            color="error"
            onClick={handleDelete}
          >
            <Delete />
          </IconButton>
        </CardActions>
      }
    </Card>
  );
}