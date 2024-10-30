const express = require("express");
const path = require("path");
const https = require("https");
const fs = require("fs");
const session = require("express-session");

const app = express();

app.use(express.static(path.join(__dirname, "../dist")));

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

app.get("/testSession", (req, res)=>{
  if (req.session.views) {
    req.session.views++;
    res.send(`Вы посетили эту страницу ${req.session.views} раз`);
  } else {
    req.session.views = 1;
    res.send('Добро пожаловать! Это ваш первый визит.');
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});

const options = {
  pfx: fs.readFileSync(path.join(__dirname, "comp-secr-esse.pfx")),
  passphrase: "EB6D471DBB32B9F9BB3D98E86421BDC76102EA47",
};

https.createServer(options, app).listen(443, () => {
  console.log("HTTPS сервер запущен на порту 443");
});

