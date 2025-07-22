import { Badge } from "@chakra-ui/react";
import { BadgeStatusProps } from "./interface";

export const BadgeStatus = ({ order }: BadgeStatusProps) => {
  const verifyStatusPayment = () => {
    if (order?.pagamentoParcial) return "parcial";
    if (order?.pagamento) return "concluido";
    return "pendente";
  };
  const status = verifyStatusPayment();

  if (status === "concluido") {
    return (
      <Badge px={2} colorScheme="green">
        Concluído
      </Badge>
    );
  }

  if (status === "pendente") {
    return (
      <Badge px={2} colorScheme="red">
        Pendente
      </Badge>
    );
  }

  if (status === "parcial") {
    return (
      <Badge px={2} colorScheme="yellow">
        Parcial
      </Badge>
    );
  }

  return <Badge>{status}</Badge>;
};
