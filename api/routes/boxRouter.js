const express = require("express");

const route = express.Router();

const Box = require("../models/box");
const User = require("../models/user");
const Share = require("../models/share");

const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

route.use(cookieParser());

const getUserFromToken = (req) => {
  console.log("run");
  return new Promise((resolve, reject) => {
    jwt.verify(
      req.cookies.token,
      process.env.JWT_SECRET,
      {},
      async (err, userData) => {
        if (err) throw err;
        const user = await User.findById(userData.id);
        resolve(user);
      }
    );
  });
};

route.post("/create", async (req, res) => {
  const { name } = req.body;
  let code = Math.floor(Math.random() * 90000000 + 10000000);
  const { token } = req.cookies;
  const user = await getUserFromToken(req);
  console.log(user);
  let test = await Box.findOne({ code });
  console.log(test);
  while (test) {
    console.log("finding" + code);
    code = Math.floor(Math.random() * 90000000 + 10000000);
    test = await Box.findOne({ code });
  }
  console.log("Creating");
  try {
    const box = await Box.create({
      name: name,
      code: code,
      owner: user._id,
    });
    res.json(box);
  } catch (err) {
    console.log("Error");
    res.json(err);
  }
});

route.get("/get-all", async (req, res) => {
  // console.log("get all")
  const user = await getUserFromToken(req);
  const boxes = await Box.find({ owner: user._id });
  // console.log(boxes);
  res.json(boxes);
});

route.post("/share", async (req, res) => {
  const { share, code } = req.body;
  console.log(req.body);
  console.log(share);
  console.log(code);
  try {
    const newShare = await Share.create({
      share: share,
      code: code,
    });
    res.json(newShare);
  } catch (err) {
    console.log("Error");
    console.log(err);
    res.json(err);
  }
});

route.get("/shares/:code", async (req, res) => {
  console.log("/shares/code");
  const code = req.params["code"];

  console.log(code);

  const shares = await Share.find({ code });

  res.json(shares);
});

route.get("/verify/:code", async (req, res) => {
  const code = req.params["code"];
  //   const test = await Box.findOne({ code });
  //   console.log(test);
  if (await Box.findOne({ code })) {
    res.json(true);
  } else {
    res.json(false);
  }
});

route.post("/delete-share", async (req, res) => {
  console.log(req.body);
  const { id } = req.body;

  console.log(id);

  try {
    const share = await Share.findByIdAndDelete(id);
    res.json(share);
  } catch (err) {
    res.json(err);
  }
});

route.post("/delete", async (req, res) => {
  const { code } = req.body;

  try {
    const deleted = await Box.findOneAndDelete({ code });
    res.json(deleted);
  } catch (err) {
    res.json(err);
  }
});

module.exports = route;
