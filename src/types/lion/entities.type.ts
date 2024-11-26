import { OutgoingMessage } from 'http'

export type ClientTaxReceiptEntity = {
  id: number
  uid: string
  outgoingTaxReceiptId: number
  clientAccountUid: string
  mecaniId: number
}

export type OutgoingTaxReceiptEntity = {
  id: number
  uid: string
  createdAt: Date
  updatedAt: Date
  isActive: boolean
  totalValue: number | string
  operationsNatureId: number
  status: string
  issuedAt: Date | string
  integrationProviderId: string | null
  serialNumber: number
  number: number
  accessKey: string
  pdfUrl: string
  xmlUrl: string
}
