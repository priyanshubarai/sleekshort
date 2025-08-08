const controller = require("../controller/controller");
const express = require("express")

const requestRouter = express.Router();
module.exports = requestRouter;

requestRouter.post("/shorten",controller.getShortUrl)

requestRouter.post("/shorten/withalias",controller.getShortUrlWithAlias)

requestRouter.get('/:shortId', controller.redirectOriginalUrl);

requestRouter.post("/checkalias",controller.checkAlias)