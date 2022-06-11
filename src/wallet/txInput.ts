export default class TxInput {
  amount: number;
  address: string;
  timestamp: number;
  signature: string;

  constructor(amount: number, adress: string) {
    this.amount = amount;
    this.address = adress;
  }
}