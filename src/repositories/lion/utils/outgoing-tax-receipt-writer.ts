import { v4 as uuidv4 } from 'uuid'

import { OutgoingTaxReceiptEntity } from '@/types/lion'

export default class OutgoingTaxReceiptWriter {
  writeInsertData({
    accessKey,
    issuedAt,
    number,
    totalValue,
  }: {
    accessKey: string
    issuedAt: string | Date
    number: number
    totalValue: number | string
  }): Partial<OutgoingTaxReceiptEntity> {
    const bucketURL = 'https://nfes.mecanizou.com/'
    const uid = uuidv4()
    const toCreate: Partial<OutgoingTaxReceiptEntity> = {
      uid,
      isActive: true,
      totalValue,
      operationsNatureId: 1,
      // Venda de Mercadoria
      status: 'created',
      integrationProviderId: null,
      serialNumber: 3,
      // Serial da OMIE
      createdAt: new Date(),
      updatedAt: new Date(),
      number,
      accessKey,
      issuedAt,
      pdfUrl: `${bucketURL}${accessKey}.pdf`,
      xmlUrl: `${bucketURL}${accessKey}.xml`,
    }

    return toCreate
  }
}
