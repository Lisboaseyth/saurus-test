"use client";

import useFetch from "@/hooks/useFetch/hook";
import { Application } from "@/interfaces/Application";
import { loginSchema } from "@/schemas/loginSchema";
import { Spinner, Stack, Text, useBreakpointValue } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";
import FormLogin from "@/components/Forms/FormLogin";

export default function Home() {
  const isBreaking = useBreakpointValue({ base: true, md: false });
  const [requestApplications, isLoadingApplication, applications] =
    useFetch<Array<Application>>();

  const { reset, watch } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const aplicacaoid = watch("aplicacaoId");

  React.useEffect(() => {
    requestApplications("/api/applications", {
      method: "GET",
    }).then((resp) =>
      reset({
        aplicacaoId: resp.data[0].id,
      })
    );
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
        h={"500px"}
        rounded={"10px"}
        boxShadow={"rgba(149, 157, 165, 0.2) 0px 8px 24px"}
        direction={"row"}
        w={"full"}
        maxW={"1000px"}
        bg={"white"}
      >
        <Stack
          w={"full"}
          spacing={6}
          p={4}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Stack alignItems={"center"} spacing={0}>
            <Text fontSize={"3xl"} fontWeight={"bold"}>
              Seja bem vindo!
            </Text>
            <Text fontSize={"16px"} color={"#8B8B8B"}>
              Faça login para continuar
            </Text>
          </Stack>
          {isLoadingApplication ? (
            <Stack
              justifyContent={"center"}
              alignItems={"center"}
              w={"full"}
              maxW={"300px"}
            >
              <Spinner color="secondary" size="xl" thickness="4px" />
            </Stack>
          ) : (
            <FormLogin
              aplicacoes={applications || []}
              aplicacaoid={aplicacaoid}
            />
          )}
        </Stack>
        {!isBreaking && (
          <Stack position="relative" w="full" h="full">
            <Image
              style={{ borderRadius: "0 10px 10px 0" }}
              src={"/login/image-adm.jpg"}
              alt="Admin login illustration"
              fill
              objectFit="cover"
            />
          </Stack>
        )}
      </Stack>
    </Stack>
  );
}
