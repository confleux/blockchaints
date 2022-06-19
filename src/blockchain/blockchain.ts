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

  static isValidChain(chain: Block[]): boolean {
    if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genGenesisBlock())) {
      return false;
    }

    for (let i = 1; i < chain.length; ++i) {
      const curBlock = chain[i];
      const prevBlock = chain[i - 1];
      if (curBlock.lastHash !== prevBlock.hash || curBlock.hash != Block.genHash(curBlock)) {
        return false;
      }
    }

    return true;
  }
}