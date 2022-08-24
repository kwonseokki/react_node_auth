const express = require("express"); // express 모듈 가져오기
const app = express(); // 새로운 express 앱생성
const port = 5000; // 포트번호지정
const { User } = require("./models/User");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const auth = require("./middleware/auth");
//application/x-www.form.urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// application/json
app.use(bodyParser.json());
app.use(cookieParser());
const config = require("./config/key");
mongoose
  .connect(config.mongoURI)
  .then(() => {
    console.log("mongoDB connected!");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("Hello World! 노드 실행d");
});

app.post("/api/users/register", (req, res) => {
  // 회원가입 할때 필요한 정보들을 client에서 가져오면
  // 그것들을 데이터 베이스에 넣어줌

  const user = new User(req.body);
  user.save(function (err, userInfo) {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

app.get("/api/test", (req, res) => {
  res.send("안녕하세요~");
});

app.post("/api/users/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    // user 정보가 존재안할떄
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "이메일이 존재하지 않습니다.",
      });
    }
    // 요청한 이메일이 존재한다면 비밀번호가 같은지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (err) {
        return res.json({
          logginSuccess: false,
          message: err,
        });
      }
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        });
      }
    });
    user.generateToken((err, user) => {
      if (err) return res.status(400).send(err);
      // 저장은 어디에? 쿠기, 로컬스토리지
      res
        .cookie("x_auth", user.token)
        .status(200)
        .json({ logginSuccess: true, userId: user._id });
    });
  });
});

app.get("/api/users/auth", auth, (req, res) => {
  // 여기까지 미들웨어를 통과해 왔다는 얘기는 인증이 true 라는 말
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
  });
});

app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
