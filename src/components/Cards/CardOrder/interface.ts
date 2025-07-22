import { Order } from "@/interfaces/Order";

export interface CardOrderProps {
  order: Order;
  currentOrder: Order | undefined;
  setCurrentOrder: React.Dispatch<React.SetStateAction<Order | undefined>>;
}
