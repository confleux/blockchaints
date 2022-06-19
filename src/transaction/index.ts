import config from "config";
import { generateId } from "../utils";
import TxInput from "./txInput";
import TxOutput from "./txOutput";

export default class Transaction {
  id: string;
  txInput: TxInput;
  txOutputs: TxOutput[];

  constructor() {
    this.id = generateId();
    this.txOutputs = [];
  }
}