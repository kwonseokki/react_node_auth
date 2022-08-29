if (process.env.NODE_ENV === "production") {
  // 배포모드
  module.exports = require("./prod"); // prod.js 내보내기 db주소 감춰있음
} else {
  module.exports = require("./dev"); // dev.js 설정 내보내기
}

process.env.USER = "dd";
