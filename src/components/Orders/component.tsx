"use client";

import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  Icon,
  IconButton,
  Skeleton,
  Stack,
  StackDivider,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { OrdersComponentProps } from "./interface";
import useFetch from "@/hooks/useFetch/hook";
import React from "react";
import { parseCookies } from "nookies";
import { useAuth } from "@/context/AuthContext";
import { Order, OrderResponseProps } from "@/interfaces/Order";
import { formatDocument, formatMoney } from "@/utils/format";
import {
  FaRegClock,
  FaCircleCheck,
  PiChartPieSlice,
  FaUser,
  FaBox,
  FaRegCreditCard,
  FaMoneyBillWave,
  IoChevronBackOutline,
  HiIdentification,
  IoDocumentText,
} from "@/components/Icons";
import Pagination from "../Pagination";
import CardOrderComponent from "../Cards/CardOrder";
import { verifyStatusPayment, verifyTypePayment } from "@/utils/verifyPayments";

export default function OrdersComponent({}: OrdersComponentProps) {
  const isBreaking = useBreakpointValue({ base: true, md: false });
  const [currentOrder, setCurrentOrder] = React.useState<Order>();
  const [requestOrders, isLoadingOrders, orders, pagination] =
    useFetch<OrderResponseProps>();
  const { user } = useAuth();
  const { token } = parseCookies();

  const handleChangePage = (page: number) => {
    requestOrders("/api/orders", {
      method: "GET",
      params: {
        username: user.username,
        aplicacaoid: token,
        pageIndex: page,
      },
    });
  };

  React.useEffect(() => {
    requestOrders("/api/orders", {
      method: "GET",
      params: {
        username: user.username,
        aplicacaoid: token,
      },
    });
  }, []);

  return (
    <Stack
      justifyContent={"center"}
      alignItems={"center"}
      w={"full"}
      h={"full"}
      p={{ base: 2, md: 4 }}
      spacing={4}
      bg={"primary"}
    >
      <Stack
        h={"600px"}
        rounded={"10px"}
        boxShadow={"rgba(149, 157, 165, 0.2) 0px 8px 24px"}
        direction={"row"}
        w={"full"}
        maxW={"1000px"}
        bg={"white"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        {(!currentOrder || (currentOrder && !isBreaking)) && (
          <Stack
            w={"full"}
            p={4}
            h={"full"}
            justifyContent={"space-between"}
            divider={<StackDivider opacity={0.9} borderColor={"#8B8B8B"} />}
          >
            <Stack alignItems={"flex-start"} spacing={0}>
              <Stack alignItems={"center"} direction={"row"}>
                <Icon color={"green"} as={FaBox} />
                <Text fontSize={"2xl"} fontWeight={"bold"}>
                  Pedidos
                </Text>
              </Stack>
              <Text fontSize={"16px"} color={"#8B8B8B"}>
                Histórico dos seus pedidos!
              </Text>
            </Stack>
            <Stack
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
              overflow={"auto"}
              h={"full"}
              alignItems={"flex-start"}
              px={2}
            >
              {isLoadingOrders ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    height="130px"
                    rounded={"md"}
                    w="full"
                  />
                ))
              ) : orders?.list ? (
                orders?.list.map((order, index) => (
                  <CardOrderComponent
                    key={index}
                    order={order}
                    currentOrder={currentOrder}
                    setCurrentOrder={setCurrentOrder}
                  />
                ))
              ) : (
                <Alert
                  status="info"
                  color={"black"}
                  bg={"transparent"}
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  textAlign="center"
                  height="full"
                >
                  <AlertIcon boxSize="40px" mr={0} />
                  <AlertTitle mt={4} mb={1} fontSize="lg">
                    Nenhum Pedido Encontrado!
                  </AlertTitle>
                </Alert>
              )}
            </Stack>
            {!isLoadingOrders && (
              <Pagination
                isLoading={isLoadingOrders}
                handleChangePage={handleChangePage}
                pagination={pagination}
              />
            )}
          </Stack>
        )}
        {!currentOrder && !isBreaking && (
          <Stack
            w={"full"}
            spacing={6}
            p={4}
            h={"full"}
            justifyContent={currentOrder ? "flex-start" : "center"}
            alignItems={currentOrder ? "flex-start" : "center"}
          >
            <Stack alignItems={"center"} spacing={0}>
              <Text fontSize={"3xl"} fontWeight={"bold"}>
                Seja bem vindo!
              </Text>
              <Text fontSize={"16px"} color={"#8B8B8B"}>
                Selecione algum pedido para mais detalhes.
              </Text>
            </Stack>
          </Stack>
        )}
        {currentOrder && (
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
                    #{currentOrder.numeroFatura}
                  </Text>
                  <Text fontWeight={"bold"} fontSize={"3xl"}>
                    {currentOrder.historico}
                  </Text>
                  <Text color={"green"} fontWeight={"bold"} fontSize={"3xl"}>
                    {formatMoney(currentOrder.valorFatura)}
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
                          <Text fontSize={"16px"}>
                            {verifyTypePayment(item)}
                          </Text>
                          {item.tipoPagamento == 3 && (
                            <Text fontSize={"16px"}>
                              {item.numeroParcelas}x
                            </Text>
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
                        <Stack
                          key={index}
                          alignItems={"center"}
                          color={"#333333"}
                        >
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
                  <Button variant={"custom"}>Pagar</Button>
                </Stack>
              )}
            </Stack>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
}
