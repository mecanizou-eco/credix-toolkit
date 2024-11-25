import { ClientTaxReceiptEntity } from '@/types/lion'

export default class ClientTaxReceiptWriter {
  writeInsertData({
    clientAccountUid,
    mecaniId,
    outgoingTaxReceiptId,
  }: {
    clientAccountUid: string
    mecaniId: number
    outgoingTaxReceiptId: number
  }): Partial<ClientTaxReceiptEntity> {
    const toCreate: Partial<ClientTaxReceiptEntity> = {
      uid: 'provisory' + Math.random(),
      outgoingTaxReceiptId,
      clientAccountUid,
      mecaniId,
    }

    return toCreate
  }
}
