interface OlderTicket {
  address: string
  signature: string
  ticketType: number
  fromDate: string
  toDate: string
  baseAmount: number
  additionalForLikes: number
  additionalForRecasts: number
  total: number
  createdAt: string
}
export default OlderTicket
