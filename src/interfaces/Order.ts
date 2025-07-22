import { Payment } from "./Payment";
import { Person } from "./Person";

export interface Order {
  numeroFatura: string;
  historico: string;
  valorFatura: number;
  pagamentoParcial: boolean;
  pessoa: Person;
  pagamento: null | Array<Payment>;
  origem: Array<{
    origem: string;
    numero: string;
    infAdic: string;
  }>;
}

export interface OrderResponseProps {
  list: Array<Order>;
}
