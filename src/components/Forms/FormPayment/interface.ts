import { Order } from "@/interfaces/Order";

export interface FormPaymentProps {
  order?: Order;
  aplicacaoid?: string;
  typePayment: string;
  setActiveStep: (step: number) => void;
}
