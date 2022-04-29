import express from "express";
import { engine } from "express-handlebars";

import config from "./config";
import { UsersData } from "./users-data";
import { HttpStatus } from "./util/http-status.enum";

const app = express();
const usersData = new UsersData();

app.engine("hbs", engine(config.handlebars));
app.set("view engine", "hbs");
app.set("views", "./views");

app.get("/", (_, res) => {
  return res.status(HttpStatus.OK).render("welcome", {
    name: "world",
  });
});

app.get("/users", (_, res) => {
  const users = usersData.get();

  return res.status(HttpStatus.OK).render("users", { users });
});

app.get("/users/:userId", (req, res) => {
  const { userId } = req.params;

  if (!Number.isInteger(parseInt(userId))) {
    return res.status(HttpStatus.BAD_REQUEST).render("error", {
      message: "Invalid userId",
      code: HttpStatus.BAD_REQUEST,
    });
  }

  const user = usersData.get(parseInt(userId));
  if (!user) {
    return res.status(HttpStatus.NOT_FOUND).render("not-found", {
      message: "User not found",
    });
  }

  return res.status(HttpStatus.OK).render("users", {
    users: [user],
  });
});

app.listen(config.port, () => {
  console.log(`Server listen on port: ${config.port}`);
});
