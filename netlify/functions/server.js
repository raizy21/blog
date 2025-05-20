import serverless from "serverless-http";
import * as appMod from "../../app.js";

let app = appMod;
while (app && typeof app !== "function") {
  app = app.default;
}
if (typeof app !== "function") {
  throw new Error("could not find express app in app.js");
}

export const handler = serverless(app);
