import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import Loading from "../../components/loading";
import OrderItem from "../../components/order-item";
import { useAuth } from "../../hooks/AuthProvider";
import { OrderModel } from "../../models/order-model";
import api from "../../shared/api";

export default function AdminPage() {
  const auth = useAuth();
  const [orders, setOrders] = useState<OrderModel[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getOrders() {
      setLoading(true);
      try {
        const orderResponse = await api.get<OrderModel[]>('/orders', {
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

  const handleDelete = (order: OrderModel) => {
    setOrders(orders.filter(o => o.id !== order.id));
  }
  

  return (
    <Container maxWidth='md'>
      {loading 
        ? <Loading /> :
        <>
          {orders.map((order) => <OrderItem order={order} onDelete={handleDelete} />)}
        </>
      }
    </Container>
  );
}