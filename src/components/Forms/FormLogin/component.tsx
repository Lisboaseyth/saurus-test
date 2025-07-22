"use client";

import Input from "@/components/FormControl/Input";
import Select from "@/components/FormControl/Select";
import { useAuth } from "@/context/AuthContext";
import { useToastCustom } from "@/hooks/useToast/hook";
import { ToastError } from "@/hooks/useToast/interface";
import { loginSchema, LoginSchemaType } from "@/schemas/loginSchema";
import { Button, Stack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "@/components/Icons";
import { FormLoginProps } from "./interface";

export function FormLogin({ aplicacoes, aplicacaoid }: FormLoginProps) {
  const { login, isLoadingLogin } = useAuth();
  const router = useRouter();
  const [visible, setVisible] = React.useState(false);
  const { toastWithError } = useToastCustom();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
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
    setValue("aplicacaoId", aplicacaoid);
  }, [aplicacaoid]);

  return (
    <Stack
      as={"form"}
      onSubmit={handleSubmit(handleSubmitLogin)}
      w={"full"}
      maxW={"300px"}
    >
      <Select {...register("aplicacaoId")} label="Sistema">
        {aplicacoes?.map((app, index) => (
          <option key={index} style={{ background: "white" }} value={app.id}>
            {app.nomeReferencia}
          </option>
        ))}
      </Select>
      <Input error={errors.usuario} label="Usuario" {...register("usuario")} />
      <Input
        handleIcon={() => setVisible(!visible)}
        icon={visible ? FaRegEye : FaRegEyeSlash}
        error={errors.senha}
        label="Senha"
        type={visible ? "text" : "password"}
        {...register("senha")}
      />
      <Button isLoading={isLoadingLogin} variant={"custom"} type="submit">
        Entrar
      </Button>
    </Stack>
  );
}
