"use client";

import Input from "@/components/Form/Input";
import Select from "@/components/Form/Select";
import { useAuth } from "@/context/AuthContext";
import useFetch from "@/hooks/useFetch/hook";
import { useToastCustom } from "@/hooks/useToast/hook";
import { ToastError } from "@/hooks/useToast/interface";
import { Application } from "@/interfaces/Application";
import { loginSchema, LoginSchemaType } from "@/schemas/loginSchema";
import {
  Button,
  Spinner,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "@/components/Icons";

export default function Home() {
  const isBreaking = useBreakpointValue({ base: true, md: false });
  const [requestApplications, isLoadingApplication, applications] =
    useFetch<Array<Application>>();
  const { login, isLoadingLogin } = useAuth();
  const router = useRouter();
  const [visible, setVisible] = React.useState(false);
  const { toastWithError } = useToastCustom();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const handleSubmitLogin = async (dataForm: LoginSchemaType) => {
    try {
      await login(dataForm).then(() => router.push("/pedidos"));
    } catch (error) {
      toastWithError(error as ToastError);
    }
  };

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
            <Stack
              as={"form"}
              onSubmit={handleSubmit(handleSubmitLogin)}
              w={"full"}
              maxW={"300px"}
            >
              <Select {...register("aplicacaoId")} label="Sistema">
                {applications?.map((app, index) => (
                  <option
                    key={index}
                    style={{ background: "white" }}
                    value={app.id}
                  >
                    {app.nomeReferencia}
                  </option>
                ))}
              </Select>
              <Input
                error={errors.usuario}
                label="Usuario"
                {...register("usuario")}
              />
              <Input
                handleIcon={() => setVisible(!visible)}
                icon={visible ? FaRegEye : FaRegEyeSlash}
                error={errors.senha}
                label="Senha"
                type={visible ? "text" : "password"}
                {...register("senha")}
              />
              <Button
                isLoading={isLoadingLogin}
                variant={"custom"}
                type="submit"
              >
                Entrar
              </Button>
            </Stack>
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
