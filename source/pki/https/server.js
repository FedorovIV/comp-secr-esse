const express = require('express');
const path = require("path");
const https = require('https');
const fs = require('fs');

const app = express();

app.use(express.static(path.join(__dirname, "../dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});

const options = {
  pfx: fs.readFileSync(path.join(__dirname,'comp-secr-esse.pfx')),
  passphrase: "EB6D471DBB32B9F9BB3D98E86421BDC76102EA47",
};

https.createServer(options, app).listen(443, () => {
  console.log('HTTPS сервер запущен на порту 443');
});

