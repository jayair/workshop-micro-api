const { json } = require("micro");
const cors = require("micro-cors")();

const list = ["Install stuff", "Look at the slides", "Starting hacking"];

module.exports = cors(async req => {
  let body;

  switch (req.method) {
    case "PUT":
      body = await json(req);
      list.push(body.text);
      break;
    case "DELETE":
      body = await json(req);
      list.splice(body.id, 1);
      break;
  }

  return list;
});
