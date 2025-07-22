import { Order } from "@/interfaces/Order";
import { Payment } from "@/interfaces/Payment";

export function verifyStatusPayment(order: Order) {
  if (order?.pagamentoParcial) return "parcial";
  if (order?.pagamento) return "concluido";
  return "pendente";
}

export function verifyTypePayment(payment: Payment) {
  if (payment?.tipoPagamento == 1) return "Dinheiro";
  if (payment?.tipoPagamento == 3) return "Cartão de Crédito";
  if (payment?.tipoPagamento == 4) return "Cartão de Débito";
  return "";
}
