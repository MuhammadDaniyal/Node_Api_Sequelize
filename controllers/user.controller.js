const models = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signUpUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // check user already exists email
    const userExist = await models.User.findOne({ where: { email: email } });
    if (userExist) {
      return res
        .status(409)
        .json({ message: "already User exist, provide unique email" });
    } else {
      // convert into hash password
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      const result = await models.User.create({
        name,
        email,
        password: passwordHash,
      });
      res
        .status(201)
        .json({ message: "User SignUp Successfully", user: result });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // check user already exists email
    const userEmail = await models.User.findOne({ where: { email: email } });
    const passwordMatch = await bcrypt.compare(password, userEmail.password);

    if (!userEmail || !passwordMatch) {
      return res.status(401).json({ message: "Invalid Details credentials" });
    } else {
      jwt.sign(
        { email: userEmail.email, userId: userEmail.id },
        "secretKey",
        (err, token) => {
          console.log("callback: ", token);
          res.status(200).json({
            message: "Authentication Successful, User Login Successfully",
            token: token,
          });
        }
      );
      //   console.log(token);
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error });
  }
};

module.exports = { signUpUser, loginUser };
