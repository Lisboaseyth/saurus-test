"use client";

import Input from "@/components/FormControl/Input";
import { useAuth } from "@/context/AuthContext";
import { useToastCustom } from "@/hooks/useToast/hook";
import { ToastError } from "@/hooks/useToast/interface";
import { Button, Flex, HStack, Stack, Text, useToast } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { FormPaymentProps } from "./interface";
import { paymentSchema } from "@/schemas/paymentSchema";
import useFetch from "@/hooks/useFetch/hook";
import { parseCookies } from "nookies";

export function FormPayment({
  typePayment,
  setActiveStep,
}: FormPaymentProps) {
  const [requestPayment, isLoadingPayment] = useFetch<{
    id: "string";
  }>();
  const { user } = useAuth();
  const { token } = parseCookies();
  const toast = useToast();

  const { toastWithError } = useToastCustom();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(paymentSchema),
    defaultValues: {
      paymentType: typePayment,
    },
  });

  const handlePaymentSubmit = () => {
    const data = {
      aplicacaoid: token,
      username: user.username,
    };
    setActiveStep(2);
    requestPayment("/api/payment", {
      method: "POST",
      body: data,
      params: {
        username: user.username,
        aplicacaoid: token,
      },
    })
      .then(() => {
        toast({
          title: "Pagamento realizado com sucesso",
          status: "success",
        });
        setActiveStep(3);
      })
      .catch((error) => {
        toastWithError(error as ToastError);
        setActiveStep(1);
      });
  };

  return (
    <Stack as={"form"} onSubmit={handleSubmit(handlePaymentSubmit)}>
      <Stack spacing={4}>
        <Text
          onClick={() => {
            setActiveStep(0);
            reset();
          }}
          cursor={"pointer"}
          textDecoration="underline"
        >
          Alterar método
        </Text>

        {typePayment === "pix" ? (
          <Input
            error={errors?.pixKey}
            {...register("pixKey")}
            label="Chave Pix"
          />
        ) : (
          <Stack>
            <Input
              error={errors?.cardName}
              {...register("cardName")}
              label="Nome no cartão"
              type="text"
            />
            <Input
              inputMode="numeric"
              pattern="\d*"
              maxLength={16}
              onInput={(e) => {
                e.currentTarget.value = e.currentTarget.value.replace(
                  /\D/g,
                  ""
                );
              }}
              error={errors?.cardNumber}
              {...register("cardNumber")}
              label="Número do cartão"
            />
            <HStack>
              <Stack spacing={1}>
                <Text color={"#333333"} fontWeight={500}>
                  Validade
                </Text>
                <Flex gap={2}>
                  <Input
                    inputMode="numeric"
                    pattern="\d*"
                    maxLength={2}
                    onInput={(e) => {
                      e.currentTarget.value = e.currentTarget.value.replace(
                        /\D/g,
                        ""
                      );
                    }}
                    error={errors?.monthNumber}
                    {...register("monthNumber")}
                  />
                  <Input
                    inputMode="numeric"
                    pattern="\d*"
                    maxLength={4}
                    onInput={(e) => {
                      e.currentTarget.value = e.currentTarget.value.replace(
                        /\D/g,
                        ""
                      );
                    }}
                    error={errors?.yearNumber}
                    {...register("yearNumber")}
                  />
                </Flex>
              </Stack>
              <Input
                inputMode="numeric"
                pattern="\d*"
                maxLength={3}
                onInput={(e) => {
                  e.currentTarget.value = e.currentTarget.value.replace(
                    /\D/g,
                    ""
                  );
                }}
                error={errors?.yearNumber}
                {...register("cvc")}
                label="CVC"
              />
            </HStack>
          </Stack>
        )}

        <Button isLoading={isLoadingPayment} type="submit" variant={"custom"}>
          Pagar
        </Button>
      </Stack>
    </Stack>
  );
}
