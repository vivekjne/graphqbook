import express from "express";
const app = express();
import path from "path";
import helmet from "helmet";
import cors from "cors";
import compress from "compression";
import servicesLoader from "./services";

import db from "./database";

const utils = {
  db,
};

const services = servicesLoader(utils);

const root = path.join(__dirname, "../../");

if (process.env.NODE_ENV !== "development") {
  app.use(helmet());

  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "*.amazonaws.com"],
      },
    })
  );
}
app.use(compress());
app.use(cors());
app.use("/", express.static(path.join(root, "dist/client")));
app.use("/uploads", express.static(path.join(root, "uploads")));
const serviceNames = Object.keys(services);

for (let i = 0; i < serviceNames.length; i++) {
  const name = serviceNames[i];
  if (name === "graphql") {
    services[name].applyMiddleware({ app });
  } else {
    app.use(`/${name}`, services[name]);
  }
}
app.get("/", (req, res) => {
  res.sendFile(path.join(root, "/dist/client/index.html"));
});
app.listen(8000, () => console.log("Listening to port 8000!"));
