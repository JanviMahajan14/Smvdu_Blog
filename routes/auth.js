const express = require("express");
const bcrypt = require("bcrypt");
const auth = require("../middlewares/auth");
const nodemailer = require("nodemailer");
const User = require("../models/user");
const router = new express.Router();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "soni.anakhya@gmail.com",
    pass: "pass$word#11",
  },
});

router.get("/", (req, res) => {
  res.send("Hello world");
});

router.post("/users/signup", async (req, res) => {
  try {
    const user = new User(req.body);
    const { Username, email, password } = req.body;
    if (!Username || !email || !password) {
      return res.status(400).send({ error: "Please fill all the fields" });
    }

    const email_query = await User.findOne({ email });
    if (email_query) {
      return res.status(400).send({ error: "Email already exists!" });
    }
    const token = await user.generateAuthToken();
    await user.save();
    res.send({ user, token });

    const mailOptions = {
     from: 'noreply-smvdu@gmail.com',
     to: email,
     subject: 'Smvdu Blog',
     text : `Hello ${Username} Welcome to Smvdu Blog!`
    };

    transporter.sendMail(mailOptions, function(error, info){
     if (error) {
         console.log(error);
     } else {
         console.log('Email sent: ' + info.response);
     }
      
});
  } catch (error) {
    res.statusCode = 400;
    res.send({ error: error.message });
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({ error: "Please fill all the fields" });
    }

    const user = await User.findOne({ email: req.body.email });
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!user || !isMatch) {
      throw new Error("Invalid email or password");
    }
    const token = await user.generateAuthToken();
    await user.save();
    res.send({ user, token });
  } catch (error) {
    res.statusCode = 400;
    res.send({ error: "Invalid email or password" });
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return req.token != token.token;
    });
    await req.user.save();
    res.send(req.user);
  } catch (error) {
    res.statusCode = 400;
    res.send({ error });
  }
});

router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send(req.user);
  } catch (error) {
    res.statusCode = 400;
    res.send({ error });
  }
});

router.post("/user/updatepic", auth, async (req, res) => {
  try {
    req.user.pic = req.body.url;
    await req.user.save();
    res.send(req.user);
  } catch (error) {
    res.statusCode = 400;
    res.send({ error });
  }
});

module.exports = router;
