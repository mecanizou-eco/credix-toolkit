import z from 'zod'

export const NfCreateSchema = z.object({
  id_pedido: z.coerce.string({
    message: 'Id do pedido não pode ser nulo',
  }),
  uid_cliente: z.string({ message: 'UID da conta do cliente não pode ser nulo' }).uuid({
    message: 'UID da conta do cliente deve ser um UUID válido',
  }),
  nf_pdf_link: z.string({
    message: 'Link do PDF da NF não pode ser nulo',
  }),
  nf_xml_link: z.string({
    message: 'Link do XML da NF não pode ser nulo',
  }),
  numero_nf: z.coerce.string({
    message: 'Número da NF não pode ser nulo',
  }),
  chave_acesso: z.coerce.string({
    message: 'Chave de acesso não pode ser nulo',
  }),
  valor_nf: z.coerce.string({
    message: 'Valor da NF não pode ser nulo',
  }),
  total_value: z.coerce.string({
    message: 'Valor total não pode ser nulo',
  }),
  data_emissao_nf: z.coerce.string({
    message: 'Data de emissão da NF não pode ser nulo',
  }),
})

export type NfCreateData = z.infer<typeof NfCreateSchema>
