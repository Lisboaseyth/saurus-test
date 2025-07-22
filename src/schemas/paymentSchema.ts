import * as yup from "yup";

export const paymentSchema = yup.object({
  paymentType: yup.string().required(),
  pixKey: yup.string().when("paymentType", {
    is: "pix",
    then: (schema) => schema.required("Chave é obrigatória"),
    otherwise: (schema) => schema.notRequired(),
  }),
  cardName: yup.string().when("paymentType", {
    is: (val: string) => val !== "pix",
    then: (schema) => schema.required("Nome é obrigatório"),
    otherwise: (schema) => schema.notRequired(),
  }),
  cardNumber: yup.string().when("paymentType", {
    is: (val: string) => val !== "pix",
    then: (schema) => schema.required("Número é obrigatório"),
    otherwise: (schema) => schema.notRequired(),
  }),
  monthNumber: yup.string().when("paymentType", {
    is: (val: string) => val !== "pix",
    then: (schema) => schema.required("Data é obrigatória"),
    otherwise: (schema) => schema.notRequired(),
  }),
  yearNumber: yup.string().when("paymentType", {
    is: (val: string) => val !== "pix",
    then: (schema) => schema.required("Data é obrigatória"),
    otherwise: (schema) => schema.notRequired(),
  }),
  cvc: yup.string().when("paymentType", {
    is: (val: string) => val !== "pix",
    then: (schema) => schema.required("CVC é obrigatório"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

export type PaymentSchemaType = yup.InferType<typeof paymentSchema>;
