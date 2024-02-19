import User from "../models/UserModel.js";

const signup = async (req, res, next) => {
  const { firstName, lastName, phone, email, password } = req.body;
  //validate
  if (!firstName || !lastName || !phone || !email || !password) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }
  try {
    
    const exisitingUser = await User.findOne({ email });
    if (exisitingUser) {
      return res.status(400).json({ success: false, message: "Email already exists, please sign in" });
    }
    const user = await User.create({ firstName, lastName, phone, email, password });
    //token
    const token = user.createJWT();
    res.status(201).send({
      sucess: true,
      message: "User Created Successfully",
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        email: user.email,
        location: user.location,
      },
      token,
    });
  } catch (error){
    next(error)
  }  
};

export const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  //validation
  if (!email || !password) {
    next("Please Provide All Fields");
  }
  //find user by email
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    next("Invalid Useraname or password");
  }
  //compare password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    next("Invalid Useraname or password");
  }
  user.password = undefined;
  const token = user.createJWT();
  res.status(200).json({
    success: true,
    message: "Login SUccessfully",
    user,
    token,
  });
};


//ACTIVATE ACCOUNT
const activate = async (req, res) => {
  const activationToken = req.params.activationToken;

  const user = await User.findOne({ activationToken });
  if (!user) {
    return res.status(400).json({ msg: "Invalid activation token" });
  }

  if (Date.now() > user.activationTokenExpires) {
    return res.status(400).json({ msg: "Activation token expired" });
    user.activationToken = undefined;
    user.activationTokenExpires = undefined;
  }

  user.isActivate = true;
  user.activationToken = undefined;
  user.activationTokenExpires = undefined;

  await user.save();

  res.status(200).json({ msg: "Account activated successfully" });
};

//SIGNIN USER
const signin = async (req, res, next) => {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      next("Please Provide All Fields");
    }
    //find user by email
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      next("Invalid Useraname or password");
    }
    //compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      next("Invalid Useraname or password");
    }
    user.password = undefined;
    const token = user.createJWT();
    res.status(200).json({
      success: true,
      message: "Signin SUccessfully",
      user,
      token,
    });
};

//LOGOUT USER
const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now() + 1000),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};


export { signup, signin, activate, logout }