import { formatDocument, formatMoney } from "@/utils/format";
import { verifyStatusPayment, verifyTypePayment } from "@/utils/verifyPayments";
import { Button, Card, CardBody, Icon, Stack, Text } from "@chakra-ui/react";
import {
  FaRegClock,
  FaCircleCheck,
  PiChartPieSlice,
  FaUser,
  FaRegCreditCard,
  FaMoneyBillWave,
} from "@/components/Icons";
import { CardOrderProps } from "./interface";

export const CardOrderComponent = ({
  order,
  currentOrder,
  setCurrentOrder,
}: CardOrderProps) => {
  return (
    <Card bg={"#eeeeeeff"} rounded={"md"} w={"full"}>
      <CardBody>
        <Stack spacing={0} mb={2}>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"flex-start"}
          >
            <Text fontWeight={"bold"}>
              #{order.numeroFatura} - {order.historico}
            </Text>
            <Text fontSize={"16px"} color={"secondary"}>
              {formatMoney(order.valorFatura)}
            </Text>
          </Stack>
          <Stack direction={"row"} alignItems={"center"}>
            <Icon
              as={
                verifyStatusPayment(order) == "concluido"
                  ? FaCircleCheck
                  : verifyStatusPayment(order) == "pendente"
                  ? FaRegClock
                  : PiChartPieSlice
              }
              color={
                verifyStatusPayment(order) == "concluido"
                  ? "#00BD19"
                  : verifyStatusPayment(order) == "pendente"
                  ? "#BD0000"
                  : "#BDB700"
              }
            />
            <Text fontSize={"16px"} color={"#8B8B8B"}>
              Pagamento{" "}
              {verifyStatusPayment(order) == "concluido"
                ? "Concluido"
                : verifyStatusPayment(order) == "pendente"
                ? "Pendente"
                : "Parcial"}
            </Text>
          </Stack>
          <Stack direction={"row"} alignItems={"center"}>
            <Icon color={"green"} as={FaUser} />
            <Text fontSize={"16px"} color={"secondary"}>
              {order.pessoa.nome}
            </Text>
            <Text fontSize={"16px"} color={"secondary"}>
              {formatDocument(order.pessoa.cpfCnpj)}
            </Text>
          </Stack>
          {order.pagamento?.map((item, index) => (
            <Stack key={index} direction={"row"} alignItems={"center"}>
              <Icon
                color={"green"}
                as={item.tipoPagamento == 1 ? FaMoneyBillWave : FaRegCreditCard}
              />
              <Text fontSize={"16px"} color={"secondary"}>
                {verifyTypePayment(item)}
              </Text>
              {item.tipoPagamento == 3 && (
                <Text fontSize={"16px"} color={"secondary"}>
                  {item.numeroParcelas}x
                </Text>
              )}
            </Stack>
          ))}
        </Stack>
        <Stack>
          <Button
            onClick={() => setCurrentOrder(order)}
            disabled={currentOrder?.numeroFatura == order.numeroFatura}
            variant={"custom"}
          >
            {currentOrder?.numeroFatura == order.numeroFatura
              ? "Selecionado"
              : "Ver mais"}
          </Button>
        </Stack>
      </CardBody>
    </Card>
  );
};
