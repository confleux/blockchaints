import config from "config";
import { genHash } from "../utils/utils";

export default class Block {
  timestamp: number;
  lastHash: string;
  hash: string;
  difficulty: number;
  nonce: number;
  data: any;

  constructor(
    timestamp: number,
    lastHash: string,
    hash: string,
    difficulty: number,
    nonce: number,
    data: any,
  ) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.difficulty = difficulty;
    this.nonce = nonce;
    this.data = data;
  }

  static genGenesisBlock(): Block  {
    return new Block(0, "-----", "firsthash", config.get("difficulty"), 0, 0);
  }

  static genHash(block: Block): string {
    return genHash(
      block.timestamp +
      block.lastHash +
      block.data +
      block.nonce +
      block.difficulty
    );
  }

  static mineBlock(lastBlock: Block, data: any): Block {
    let timestamp: number = Date.now();
    let nonce = 0;
    let hash = "";
    let { difficulty } = lastBlock;
    while (hash.substr(0, difficulty) !== "0".repeat(difficulty)) {
      timestamp = Date.now();
      difficulty = Block.updateDifficulty(lastBlock, timestamp);
      ++nonce;
      hash = genHash(timestamp + lastBlock.hash + data + nonce + difficulty);
    }
    return new Block(timestamp, lastBlock.hash, hash, difficulty, nonce, data);
  }

  static updateDifficulty(lastBlock: Block, newBlockTimestamp: number): number {
    let { difficulty } = lastBlock;
    const mineRate: number = config.get("mineRate");
    if (lastBlock.timestamp + mineRate > newBlockTimestamp) {
      ++difficulty;
    } else {
      --difficulty;
    }
    return difficulty;
  }
}