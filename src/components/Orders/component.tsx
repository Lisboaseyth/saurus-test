"use client";

import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Icon,
  IconButton,
  Skeleton,
  Spinner,
  Stack,
  StackDivider,
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  Stepper,
  StepSeparator,
  StepStatus,
  StepTitle,
  Text,
  useBreakpointValue,
  useSteps,
  useToast,
} from "@chakra-ui/react";
import { OrdersComponentProps } from "./interface";
import useFetch from "@/hooks/useFetch/hook";
import React from "react";
import { parseCookies } from "nookies";
import { useAuth } from "@/context/AuthContext";
import { Order, OrderResponseProps } from "@/interfaces/Order";
import { formatDocument, formatMoney } from "@/utils/format";
import {
  FaCircleCheck,
  FaUser,
  FaBox,
  FaRegCreditCard,
  HiIdentification,
  IoDocumentText,
  FaPix,
  IoMdLogOut,
  PiMagnifyingGlass,
} from "@/components/Icons";
import Pagination from "../Pagination";
import CardOrderComponent from "../Cards/CardOrder";
import Input from "../FormControl/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { paymentSchema } from "@/schemas/paymentSchema";
import FormPayment from "../Forms/FormPayment";
import CardCurrentOrderComponent from "../Cards/CardCurrentOrder";

export default function OrdersComponent({}: OrdersComponentProps) {
  const isBreaking = useBreakpointValue({ base: true, md: false });
  const [isPayment, setIsPayment] = React.useState(false);
  const [currentOrder, setCurrentOrder] = React.useState<Order>();
  const toast = useToast();
  const [filter, setFilter] = React.useState("");

  const [requestOrders, isLoadingOrders, orders, pagination] =
    useFetch<OrderResponseProps>();
  const { user, logout } = useAuth();
  const { token } = parseCookies();
  const steps = [
    { title: "Revisão" },
    { title: "Pagamento" },
    { title: "Processamento" },
    { title: "Concluído" },
  ];
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  const { setValue, watch } = useForm({
    resolver: yupResolver(paymentSchema),
  });

  const typePayment = watch("paymentType");

  const handleChangePage = (page: number) => {
    requestOrders("/api/orders", {
      method: "GET",
      params: {
        username: user.username,
        aplicacaoid: token,
        pageIndex: page,
        search: filter,
      },
    });
  };

  const handleSearch = () => {
    requestOrders("/api/orders", {
      method: "GET",
      params: {
        username: user.username,
        aplicacaoid: token,
        pageIndex: 1,
        search: filter,
      },
    });
  };

  const handleMethodPayment = (type: string) => {
    setActiveStep(1);
    setValue("paymentType", type);
  };

  React.useEffect(() => {
    if (activeStep == 3) {
      toast({
        title: "Direcionando para tela pedidos",
        status: "success",
      });
      const timer = setTimeout(() => {
        window.location.reload();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [activeStep]);

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
      {isPayment ? (
        <Stack py={4} bg={"white"} p={4} rounded={"md"} color={"#333333"}>
          <Stepper
            size={{ base: "base", md: "md" }}
            index={activeStep}
            flexWrap={"wrap"}
          >
            {steps.map((step, index) => (
              <Step key={index}>
                <StepIndicator>
                  <StepStatus
                    complete={<StepIcon />}
                    incomplete={<StepNumber />}
                    active={<StepNumber />}
                  />
                </StepIndicator>

                <Box flexShrink="0">
                  <StepTitle>{step.title}</StepTitle>
                </Box>

                <StepSeparator />
              </Step>
            ))}
          </Stepper>
          {typePayment && activeStep > 0 ? (
            <Stack minH={40} justifyContent={"center"}>
              {activeStep == 1 && (
                <FormPayment
                  order={currentOrder}
                  setActiveStep={setActiveStep}
                  typePayment={typePayment}
                />
              )}
              {activeStep == 2 && (
                <Stack w={"full"}>
                  <Stack
                    justifyContent={"center"}
                    alignItems={"center"}
                    w={"full"}
                  >
                    <Text>Aguardando pagamento...</Text>
                    <Spinner color="secondary" size="xl" thickness="4px" />
                  </Stack>
                </Stack>
              )}
              {activeStep == 3 && (
                <Stack w={"full"}>
                  <Stack
                    justifyContent={"center"}
                    alignItems={"center"}
                    w={"full"}
                  >
                    <Text>Pagamento realizado com sucesso!</Text>
                    <Icon as={FaCircleCheck} color="success" boxSize={12} />
                  </Stack>
                </Stack>
              )}
            </Stack>
          ) : (
            <Stack>
              <Stack w={"full"} spacing={0}>
                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  spacing={0}
                  w={"full"}
                >
                  <Text fontWeight={"bold"} fontSize={"2xl"}>
                    {currentOrder?.historico}
                  </Text>
                  <Text fontWeight={"bold"} color={"#8B8B8B"}>
                    #{currentOrder?.numeroFatura}
                  </Text>
                </Stack>
                <Stack alignItems={"flex-end"} w={"full"}>
                  <Text color={"green"} fontWeight={"bold"} fontSize={"2xl"}>
                    {formatMoney(currentOrder?.valorFatura)}
                  </Text>
                </Stack>
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
              <Stack>
                <Text fontWeight={"bold"} color={"#8B8B8B"}>
                  Método de pagamento:
                </Text>
                <Button
                  onClick={() => {
                    handleMethodPayment("pix");
                  }}
                  leftIcon={<FaPix />}
                  variant={"custom"}
                >
                  Pix
                </Button>
                <Button
                  onClick={() => handleMethodPayment("credit_card")}
                  leftIcon={<FaRegCreditCard />}
                  variant={"custom"}
                >
                  Cartão de Crédito
                </Button>
                <Button
                  onClick={() => {
                    handleMethodPayment("debit_card");
                  }}
                  leftIcon={<FaRegCreditCard />}
                  variant={"custom"}
                >
                  Cartão de Débito
                </Button>
                <Button
                  onClick={() => {
                    setIsPayment(false);
                  }}
                  colorScheme="red"
                >
                  Cancelar
                </Button>
              </Stack>
            </Stack>
          )}
        </Stack>
      ) : (
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
              <Stack alignItems={"flex-start"} w={"full"} spacing={0}>
                <Stack
                  direction={"row"}
                  w={"full"}
                  justifyContent={"space-between"}
                >
                  <Stack w={"full"} alignItems={"center"} direction={"row"}>
                    <Icon color={"green"} as={FaBox} />
                    <Text fontSize={"2xl"} fontWeight={"bold"}>
                      Pedidos
                    </Text>
                  </Stack>
                  <IconButton
                    isRound
                    size="sm"
                    variant={"custom"}
                    aria-label="logout"
                    onClick={() => logout()}
                    icon={<IoMdLogOut size={20} />}
                  />
                </Stack>
                <Input
                  placeholder="Filtro"
                  icon={PiMagnifyingGlass}
                  onChange={(e) => setFilter(e.target.value)}
                  handleIcon={handleSearch}
                />
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
            <CardCurrentOrderComponent
              currentOrder={currentOrder}
              setCurrentOrder={setCurrentOrder}
              setIsPayment={setIsPayment}
            />
          )}
        </Stack>
      )}
    </Stack>
  );
}
