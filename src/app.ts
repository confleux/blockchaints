import Blockchain from "./blockchain/blockchain";
import Block from "./blockchain/block";

const a = new Blockchain;
a.addBlock("Text message");
a.addBlock("Message");
console.log(a);