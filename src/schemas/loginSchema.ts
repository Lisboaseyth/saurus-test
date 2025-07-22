import * as yup from "yup";

export const loginSchema = yup.object({
  aplicacaoId: yup.string().required("Aplicação é obrigatória"),
  usuario: yup.string().required("Usuário é obrigatório"),
  senha: yup.string().required("Senha é obrigatória"),
});

export type LoginSchemaType = yup.InferType<typeof loginSchema>;
