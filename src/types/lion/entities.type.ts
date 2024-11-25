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
  createdAt: string
  updatedAt: string
  isActive: boolean
  totalValue: number
  operationsNatureId: number
  status: string
  issuedAt: string
  integrationProviderId: string | null
  serialNumber: number
  number: number
  accessKey: string
  pdfUrl: string
  xmlUrl: string
}
