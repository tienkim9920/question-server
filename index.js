require("dotenv").config();
const express = require("express");

const app = express();
const PORT = process.env.PORT || 4000;

const cors = require("cors");

const mongoose = require("mongoose");

const User = require("./Models/user");
const Score = require("./Models/score");
const Answer = require("./Models/answer");

mongoose.connect(
  "mongodb+srv://tienkim9920:U4tQMg6Wfy8DaL@cluster0.hlyqt.mongodb.net/Question?retryWrites=true&w=majority",
  {
    useFindAndModify: false,
    useCreateIndex: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.get("/score", async (req, res) => {

  const score = await Score.find().populate("id_user").sort({ total: -1 });

  res.json(score);
});

app.get("/score/:id", async (req, res) => {

  const id = req.params.id

  const score = await Score.findOne({ id_user: id })

  res.json(score)

})

app.get("/user/:id", async (req, res) => {
  const id = req.params.id;

  const user = await User.findOne({ _id: id });

  res.json(user);
});

app.get("/answer/:id", async (req, res) => {
  
  const id = req.params.id

  const answer = await Answer.findOne({ id_user: id })

  res.json(answer)

})

app.post("/answer", async (req, res) => {
  
  // Kết quả
  const arr_result = [
    "Chó & Mèo",
    "Đá Banh",
    "Hàn Quốc",
    "Gia Đình",
    "Trà Sữa Lài MilkFoam",
    "Con Gián",
    "1 Cái Ôm",
    "Không Thích Chơi Game",
    "Ham Học Hỏi",
    "KMS Technology",
  ];

  // Câu trả lời của người chơi
  const arr_answer = [
    req.body.question1,
    req.body.question2,
    req.body.question3,
    req.body.question4,
    req.body.question5,
    req.body.question6,
    req.body.question7,
    req.body.question8,
    req.body.question9,
    req.body.question10,
  ];

  let answer_true = 0;

  // Xử lý answer_true cho user
  for (let i = 0; i < arr_answer.length; i++) {
    if (arr_answer[i].toString() === arr_result[i].toString()) {
      answer_true++;
    }
  }

  const data_user = {
    name: req.body.name,
    answer_true,
  };

  // Xử lý thêm data vào user
  const user = await User.create(data_user);

  const data_answer = {
    id_user: user._id,
    question1: req.body.question1,
    question2: req.body.question2,
    question3: req.body.question3,
    question4: req.body.question4,
    question5: req.body.question5,
    question6: req.body.question6,
    question7: req.body.question7,
    question8: req.body.question8,
    question9: req.body.question9,
    question10: req.body.question10,
  };

  // Xử lý thêm data vào answer
  const answer = await Answer.create(data_answer);

  // Tiếp theo xử lý phần điểm score
  const arr_time = [
    req.body.time1,
    req.body.time2,
    req.body.time3,
    req.body.time4,
    req.body.time5,
    req.body.time6,
    req.body.time7,
    req.body.time8,
    req.body.time9,
    req.body.time10,
  ];

  let score = 0;

  for (let i = 0; i < arr_time.length; i++) {

    if (arr_answer[i].toString() === arr_result[i].toString()) {
      if (arr_time[i] >= 50 && arr_time[i] < 60) {
        score += 10;
      }
      else if (arr_time[i] >= 40 && arr_time[i] < 50) {
        score += 8;
      } 
      else if (arr_time[i] >= 30 && arr_time[i] < 40) {
        score += 6;
      } 
      else if (arr_time[i] >= 20 && arr_time[i] < 30) {
        score += 5;
      } 
      else if (arr_time[i] >= 10 && arr_time[i] < 20) {
        score += 3;
      }
      else if (arr_time[i] < 10){
        score += 2;
      }
      else {
        score += 1;
      }
    }

  }

  const data_score = {
    id_user: user._id,
    total: score,
  };

  await Score.create(data_score);

  res.json(user);

});

app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
});
