import Block from "./block";

export default class Blockchain {
  blockchain: Block[];

  constructor() {
    this.blockchain = [Block.genGenesisBlock()];
  }

  addBlock(data: any): Block {
    const newBlock = Block.mineBlock(this.getLastBlock(), data);
    this.blockchain.push(newBlock);
    return newBlock;
  }

  getLastBlock(): Block {
    return this.blockchain[this.blockchain.length - 1];
  }
}