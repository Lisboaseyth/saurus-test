import { formatDocument, formatMoney } from "@/utils/format";
import { verifyStatusPayment, verifyTypePayment } from "@/utils/verifyPayments";
import { Button, Icon, IconButton, Stack, Text } from "@chakra-ui/react";
import {
  FaRegClock,
  FaCircleCheck,
  PiChartPieSlice,
  FaUser,
  FaRegCreditCard,
  FaMoneyBillWave,
  IoChevronBackOutline,
  HiIdentification,
  IoDocumentText,
} from "@/components/Icons";
import { CardCurrentOrderProps } from "./interface";

export const CardCurrentOrderComponent = ({
  currentOrder,
  setCurrentOrder,
  setIsPayment,
}: CardCurrentOrderProps) => {
  if (!currentOrder) return;
  return (
    <Stack
      w={"full"}
      spacing={6}
      p={4}
      h={"full"}
      justifyContent={currentOrder ? "flex-start" : "center"}
      alignItems={currentOrder ? "flex-start" : "center"}
    >
      <Stack w={"full"} h={"full"} spacing={6}>
        <Stack direction="row" alignItems="center">
          <IconButton
            isRound
            size="sm"
            variant={"custom"}
            aria-label="reset-currentOrder"
            onClick={() => setCurrentOrder(undefined)}
            icon={<IoChevronBackOutline />}
          />
          <Text textAlign={"center"} fontSize="lg">
            Detalhes do Pedido
          </Text>
        </Stack>
        <Stack
          w={"full"}
          maxW={{ base: "full", md: "460px" }}
          sx={{
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              background: "#f1f1f1",
              borderRadius: "8px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#C2C2C2",
              borderRadius: "8px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "#A0A0A0",
            },

            scrollbarWidth: "thin",
            scrollbarColor: "#C2C2C2 #f1f1f1",
          }}
          overflowY={"auto"}
          h={"full"}
          alignItems={"flex-start"}
          px={2}
        >
          <Stack
            justifyContent={"space-between"}
            alignItems={"flex-start"}
            spacing={0}
            w={"full"}
          >
            <Text fontWeight={"bold"} color={"#8B8B8B"}>
              #{currentOrder?.numeroFatura}
            </Text>
            <Text fontWeight={"bold"} fontSize={"3xl"}>
              {currentOrder?.historico}
            </Text>
            <Text color={"green"} fontWeight={"bold"} fontSize={"3xl"}>
              {formatMoney(currentOrder?.valorFatura)}
            </Text>
          </Stack>
          <Stack
            w={"full"}
            p={1}
            rounded={"md"}
            bg={
              verifyStatusPayment(currentOrder) == "concluido"
                ? "#ACFFB7"
                : verifyStatusPayment(currentOrder) == "pendente"
                ? "#FFACAC"
                : "#FDFFAC"
            }
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Icon
              fontSize={"20px"}
              as={
                verifyStatusPayment(currentOrder) == "concluido"
                  ? FaCircleCheck
                  : verifyStatusPayment(currentOrder) == "pendente"
                  ? FaRegClock
                  : PiChartPieSlice
              }
              color={
                verifyStatusPayment(currentOrder) == "concluido"
                  ? "#00BD19"
                  : verifyStatusPayment(currentOrder) == "pendente"
                  ? "#BD0000"
                  : "#BDB700"
              }
            />
            <Text fontSize={"20px"} fontWeight={"700"} color={"#8B8B8B"}>
              Pagamento{" "}
              {verifyStatusPayment(currentOrder) == "concluido"
                ? "Concluido"
                : verifyStatusPayment(currentOrder) == "pendente"
                ? "Pendente"
                : "Parcial"}
            </Text>
          </Stack>
          {currentOrder?.pessoa && (
            <Stack w={"full"}>
              <Text fontWeight={"500"}>Dados do Cliente</Text>
              <Stack
                justifyContent={"center"}
                w={"full"}
                direction={"row"}
                spacing={6}
              >
                <Stack direction={"row"} alignItems={"center"}>
                  <Icon color={"#333333"} as={FaUser} />
                  <Text>{currentOrder.pessoa.nome}</Text>
                </Stack>
                <Stack direction={"row"} alignItems={"center"}>
                  <Icon color={"#333333"} as={HiIdentification} />
                  <Text fontWeight={"500"}>
                    {formatDocument(currentOrder.pessoa.cpfCnpj)}
                  </Text>
                </Stack>
              </Stack>
            </Stack>
          )}
          {currentOrder?.pagamento && (
            <Stack w={"full"}>
              <Text fontWeight={"500"}>Dados do Pagamento</Text>
              <Stack
                justifyContent={"center"}
                w={"full"}
                direction={"row"}
                spacing={6}
              >
                {currentOrder.pagamento?.map((item, index) => (
                  <Stack
                    key={index}
                    direction={"row"}
                    alignItems={"center"}
                    color={"#333333"}
                    fontWeight={"500"}
                  >
                    <Icon
                      as={
                        item.tipoPagamento == 1
                          ? FaMoneyBillWave
                          : FaRegCreditCard
                      }
                    />
                    <Text fontSize={"16px"}>{verifyTypePayment(item)}</Text>
                    {item.tipoPagamento == 3 && (
                      <Text fontSize={"16px"}>{item.numeroParcelas}x</Text>
                    )}
                  </Stack>
                ))}
              </Stack>
            </Stack>
          )}
          {currentOrder?.origem && (
            <Stack flexWrap={"wrap"} w={"full"}>
              <Text fontWeight={"500"}>Informações</Text>
              <Stack w={"full"} direction={"row"} spacing={6}>
                {currentOrder.origem?.map((item, index) => (
                  <Stack key={index} alignItems={"center"} color={"#333333"}>
                    <Stack direction={"row"} alignItems={"center"}>
                      <Icon as={IoDocumentText} />
                      <Text fontWeight={"500"} fontSize={"16px"}>
                        {item.origem} - {item.numero}
                      </Text>
                    </Stack>
                    <Stack w={"full"}>
                      <Text fontSize={"16px"} fontWeight={"500"}>
                        Descrição:
                      </Text>
                      <Text
                        fontSize={"16px"}
                        sx={{
                          wordBreak: "break-word",
                          overflowWrap: "break-word",
                        }}
                      >
                        {item.infAdic}
                      </Text>
                    </Stack>
                  </Stack>
                ))}
              </Stack>
            </Stack>
          )}
        </Stack>
        {verifyStatusPayment(currentOrder) == "pendente" && (
          <Stack>
            <Button onClick={() => setIsPayment(true)} variant={"custom"}>
              Pagar
            </Button>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};
