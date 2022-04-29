import express, { Request, Response } from "express";
import { engine } from "express-handlebars";

import config from "./config";
import { HttpStatus } from "./util/http-status.enum";

const app = express();

app.engine("hbs", engine(config.handlebars));
app.set("view engine", "hbs");
app.set("views", "./views");

app.get("/", (_, res) => {
  return res.status(HttpStatus.OK).render("welcome-page", {
    name: "world",
  });
});

app.get("/users", (_, res) => {
  return res.status(HttpStatus.OK).render("");
});

app.get("/users/:userId", (req, res) => {
  const { userId } = req.params;

  if (!Number.isInteger(userId)) {
    return res.status(HttpStatus.BAD_REQUEST).render("error", {
      message: "Invalid userId",
      code: HttpStatus.BAD_REQUEST,
    });
  }

  const user = null; // usersProvider.get(userId);
  if (!user) {
    return res.status(HttpStatus.NOT_FOUND).render("not-found", {
      message: "User not found",
    });
  }
});

app.listen(config.port, () => {
  console.log(`Server listen on port: ${config.port}`);
});
