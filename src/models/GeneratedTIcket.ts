interface GeneratedTicket {
  baseAmount: number
  additionalForLikes: number
  additionalForRecasts: number
  total: number
  signature: {
    message: number[]
    signature: string
  }
}

export default GeneratedTicket
