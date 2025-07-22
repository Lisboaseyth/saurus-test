import { Order } from "@/interfaces/Order";

export interface CardCurrentOrderProps {
  currentOrder: Order | undefined;
  setCurrentOrder: React.Dispatch<React.SetStateAction<Order | undefined>>;
  setIsPayment: React.Dispatch<React.SetStateAction<boolean>>;
}
