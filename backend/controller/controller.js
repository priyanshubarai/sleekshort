// const express = require('express')
const shortid = require("shortid");
const Url = require("../model/model");
const { PORT } = require("../app");

exports.checkAlias = async (req, res, next) => {
  console.log("check alias running");
  const { alias } = req.body;
  console.log("alias received : ", alias);
  try {
    const entry = await Url.findOne({ shortId: alias });
    if (!entry) {
      console.log("entry not found!");
      return res
        .status(404)
        .json({ found: false, message: "Short URL not found" });
    } else {
      console.log("entry found : ", entry);
      return res.status(200).json({
        found: true,
        message: "Entry found",
        data: entry,
      });
    }
  } catch (err) {
    console.error("Error fetching shortId:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

exports.redirectOriginalUrl = async (req, res, next) => {
  console.log("redirecting to original url!");
  const shortid = req.params.shortId;
  try {
    const entry = await Url.findOne({ shortId: shortid });

    if (!entry) {
      console.log("url not found!");
      return res.status(404).send("Short URL not found");
    }
    console.log(shortid, "==", entry.originalUrl);
    entry.clicks += 1;
    await entry.save();
    res.redirect(entry.originalUrl);
  } catch (err) {
    console.log("error occured during finding original Url");
  }
  next();
};

exports.getReqInfo = (req, res, next) => {
  console.log("request occured!");
  console.log(req.url);
  console.log(req.method);
  next();
};

exports.getShortUrl = async (req, res, next) => {
  console.log("short url generating!");
  const { originalUrl } = req.body;
  const { useAlias } = req.body;

  const BASE_URL =
    process.env.NODE_ENV !== "production"
      ? `http://localhost:${process.env.PORT || 7000}` // local dev
      : process.env.BASE_URL; // deployed URL from env variable

  if (!originalUrl) {
    return res.status(400).json({ error: "originalUrl is required" });
  }
  try {
    let newid = useAlias ? req.body.alias : shortid.generate();
    console.log("generated id: ", newid);
    const newEntry = new Url({ originalUrl, shortId: newid });
    console.log("new entry: ", newEntry);
    await newEntry
      .save()
      .then((res) => {
        console.log("entry saved");
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("saved in DB!");

    res.status(201).json({
      message: "Short URL created",
      shortUrl: `${BASE_URL}/${newid}`,
    });

    console.log("response sent!");
  } catch (err) {
    console.error("Error saving entry:", err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getShortUrlWithAlias = async (req, res, next) => {
  console.log("short url generating!");
  const { originalUrl } = req.body;
  const BASE_URL =
    process.env.NODE_ENV !== "production"
      ? `http://localhost:${process.env.PORT || 7000}` // local dev
      : process.env.BASE_URL; // deployed URL from env variable

  if (!originalUrl) {
    return res.status(400).json({ error: "originalUrl is required" });
  }

  try {
    const newid = req.body.alias;
    console.log("generated id: ", newid);
    const newEntry = new Url({ originalUrl, shortId: newid });
    console.log("new entry: ", newEntry);
    await newEntry
      .save()
      .then((res) => {
        console.log("entry saved", res);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("saved in DB!");
    res.status(201).json({
      message: "Short URL created",
      shortUrl: `${BASE_URL}/${newid}`,
    });
  } catch (err) {
    console.error("Error saving entry:", err);
    res.status(500).json({ error: "Server error" });
  }
};
