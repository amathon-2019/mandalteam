const express = require("express");
const app = express();
const morgan = require("morgan");
const PORT = process.env.PORT || 4000;

app.use(morgan("dev"));

app.get("/json", (req, res, next) => {
  // 더미 JSON 을 리턴해 준다.
  const content = {
    A: {
      "1": {
        text: "asdfasfd"
      },
      "2": {
        text: "asdfasfd"
      }
    },
    B: {
      "1": {
        text: "asdfasfd"
      },
      "2": {
        text: "asdfasfd"
      }
    },
    E: {
      "5": {
        text: "타이틀 입니다"
      }
    }
  };
  // content
  res.json(content);
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
