import { NfCreateData } from '@/commands/credix-tax-receipt-create/credix-tax-receipt-create.schema'
import { ClientTaxReceiptEntity, OutgoingTaxReceiptEntity } from '@/types/lion'
import { cleanNumericString, convertStringToNumber } from '@/utils/string-clean-up.utils'

export class CredixTaxReceiptTransformer {
  toEntity(originalData: NfCreateData) {
    const taxReceiptData: Partial<ClientTaxReceiptEntity> & Partial<OutgoingTaxReceiptEntity> = {
      mecaniId: Number(originalData.id_pedido),
      clientAccountUid: originalData.uid_cliente,
      number: Number(originalData.numero_nf),
      accessKey: cleanNumericString(originalData.chave_acesso),
      totalValue: convertStringToNumber(originalData.valor_nf),
      issuedAt: originalData.data_emissao_nf,
    }

    return taxReceiptData
  }
}

// nome_cliente:nome_cliente não é necessário para NF
// nf_pdf_link:nf_pdf_link
// não é ecessário. O link que vai no baco é o link do bucket
// nf_xml_link:nf_xml_link
// não é ecessário. O link que vai no baco é o link do bucket
