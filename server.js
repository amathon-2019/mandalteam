const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
const io = require("socket.io").listen(server);
const morgan = require("morgan");
let connectCounter = 0;

app.use(morgan("dev"));

app.get("/json", (req, res, next) => {
  // 더미 JSON 을 리턴해 준다.
  const content = {
    A: {
      "1": {
        text: "A 첫 번째"
      },
      "2": {
        text: "A 두 번째"
      }
    },
    B: {
      "1": {
        text: "B 첫 번째"
      },
      "2": {
        text: "B 두 번째"
      }
    },
    E: {
      "5": {
        text: "만다라트 타이틀"
      }
    }
  };
  // content
  res.json(content);
});

io.on("connection", socket => {
  console.log("사용자 연결됨");
  connectCounter++;

  io.emit("count", connectCounter);

  io.emit("message", "낯선 사람이 입장했습니다.");

  socket.on("update", content => {
    console.log(content["E"]["5"]["text"]);
    io.emit("update", content);
  });

  socket.on("disconnect", () => {
    console.log("사용자 연결 끊김.");
    connectCounter--;
    io.emit("count", connectCounter);

    io.emit("message", "낯선 사람이 퇴장했습니다");
  });
});
