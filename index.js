const { BlockChain } = require("./blockchain.js");

// Khởi tạo một blockchain
let blockchain = new BlockChain();

// Thêm các block vào blockchain với mức tiền thưởng khi đào được (Proof-of-Work)
blockchain.add(new Date().getTime(), 50); 
blockchain.add(new Date().getTime(), 50);
blockchain.add(new Date().getTime(), 25);

// Hiển thị các block đã "đào" được
console.log(blockchain);

// Validate prior to modifying
console.log(blockchain.validate()); // true, giao dịch được chấp thuận

// Thử thay đổi dữ liệu trong blockchain
blockchain.chain[2].options.total = "1644.33";

// Kiểm tra tính đúng đắn của blockchain
console.log(blockchain.validate()); // false, giao dịch bị từ chối