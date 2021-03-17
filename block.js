const sha256 = require('crypto-js/sha256.js');

class Block {
  constructor(options, previousHash = "", difficulty = 4) {
    this.options = options;
    this.options.nonce = 1;
    this.previousHash = previousHash;
    this.hash = this.mineBlock(difficulty);
  }

  calculateHash() {
    return sha256(
      JSON.stringify({ ...this.options, previousHash: this.previousHash })
    ).toString();
  }

  // Đào block dựa trên độ khó (difficulty) của số lượng của các chữ số "0" đứng đầu ỡ mã hash
  // Tìm dc mã hash nào bất kì mỗi khi tăng số nonce 1 đơn vị lên thoả điều kiện số lượng chữ số "0" bằng với độ khó thì block đó dc công nhận
  // Độ khó càng cao, tìm càng lâu, cần tối ưu về thuật toán, chạy async, chạy trên GPU chẳng hạn ...
  mineBlock(difficulty) {
    let hashValue = this.calculateHash();

    let hashSlice = hashValue.slice(0, difficulty);
    let difficultyFactor = "0".repeat(difficulty);

    while (hashSlice !== difficultyFactor) {
      this.options.nonce++;

      hashValue = this.calculateHash();
      hashSlice = hashValue.slice(0, difficulty);
    }

    return hashValue;
  }
}

module.exports.Block = Block;
