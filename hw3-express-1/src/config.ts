import { ConfigOptions as HandleBarsOptions } from "express-handlebars/types";

export default {
  port: process.env.PORT || 3000,

  handlebars: <HandleBarsOptions>{
    defaultLayout: false,
    extname: "hbs",
  }
};
