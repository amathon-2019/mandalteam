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
  const content = [
    {
      pos: "A",
      data: [
        {
          pos: 0,
          text: "test"
        },
        {
          pos: 1,
          text: "test"
        }
      ]
    },
    {
      pos: "B",
      data: [
        {
          pos: 0,
          text: "test"
        },
        {
          pos: 1,
          text: "test"
        }
      ]
    },
    {
      pos: "C",
      data: [
        {
          pos: 0,
          text: "test"
        },
        {
          pos: 1,
          text: "test"
        }
      ]
    },
    {
      pos: "D",
      data: [
        {
          pos: 0,
          text: "test"
        },
        {
          pos: 1,
          text: "test"
        }
      ]
    },
    {
      pos: "E",
      data: [
        {
          pos: 0,
          text: "test"
        },
        {
          pos: 1,
          text: "test"
        },
        {
          pos: 5,
          text: "타이틀 입니다"
        }
      ]
    },
    {
      pos: "F",
      data: [
        {
          pos: 0,
          text: "test"
        },
        {
          pos: 1,
          text: "test"
        }
      ]
    },
    {
      pos: "G",
      data: [
        {
          pos: 0,
          text: "test"
        },
        {
          pos: 1,
          text: "test"
        }
      ]
    },
    {
      pos: "H",
      data: [
        {
          pos: 0,
          text: "test"
        },
        {
          pos: 1,
          text: "test"
        }
      ]
    }
  ];

  // content
  res.send(content);
});

io.on("connection", socket => {
  console.log("사용자 연결됨");
  connectCounter++;

  io.emit("count", connectCounter);

  io.emit("message", "낯선 사람이 입장했습니다.");

  socket.on("update", content => {
    io.emit("update", content);
  });

  socket.on("disconnect", () => {
    console.log("사용자 연결 끊김.");
    connectCounter--;
    io.emit("count", connectCounter);

    io.emit("message", "낯선 사람이 퇴장했습니다");
  });
});
