const { Block } = require("./block.js");

class BlockChain {
  constructor() {
    this.chain = [];

    // Khởi tạo "genesis block" (block 0)
    const block = new Block({
      timestamp: new Date().getTime(),
      total: 0,
    });

    this.chain.push(block);
  }

  add(timestamp, total) {
    let block = new Block({ timestamp, total }, this.tail().hash);
    this.chain.push(block);
  }

  tail() {
    return this.chain[this.chain.length - 1];
  }

  // Kiểm tra tính đồng thuận
  validate() {
    for (let i = 1; i < this.chain.length; i++) {
      const current = this.chain[i].calculateHash();

      if (this.chain[i].hash !== current) {
        return false;
      }

      if (this.chain[i].previousHash != this.chain[i - 1].hash) {
        return false;
      }
    }

    return true;
  }
}

module.exports.BlockChain = BlockChain;
