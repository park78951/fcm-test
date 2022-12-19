import https from "https";
import { parse } from "url";
import next from "next";
import fs from "fs";

const dev = true;
const hostname = "localhost";
const port = 3000;
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

const httpsOptions = {
  key: fs.readFileSync("./certificates/localhost-key.pem"),
  cert: fs.readFileSync("./certificates/localhost.pem"),
};

app.prepare().then(() => {
  https
    .createServer(httpsOptions, (req, res) => {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url!, true);
      handle(req, res, parsedUrl);
    })
    .listen(port, () => {
      console.log(`> Ready on https://localhost:${port}`);
    });
});
