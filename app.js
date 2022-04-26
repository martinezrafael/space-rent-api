require("dotenv").config();

const connect = require("./configs/db.config");
connect();

const express = require("express");
const app = express();

const cors = require("cors");
app.use(
    cors({
        credentials: true,
        origin: ["http://localhost:3000"],
    })
);

app.use(express.json());

app.use("/auth", require("./routes/auth.routes"));

app.use(require("./middlewares/auth.middleware"));

app.use("/user", require("./routes/user.routes"));

app.use("/spaces", require("./routes/space.routes"));

app.use("/events", require("./routes/event.routes"));

app.use("/comments", require("./routes/comment.routes"));

app.listen(process.env.PORT, () =>
    console.log(`Server running on PORT: ${process.env.PORT}`)
);
