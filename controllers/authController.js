// import bcryptjs from "bcryptjs";
// import User from "../models/UserModel.js";
// import createTokenUser from "../lib/utils/createTokenUser.js";
// import { 
//   validateSignin,
//   validateSignup,
// } from "../validations/userValidation.js";
// import { generateUniqueChars } from "../lib/utils.js";
// import sendActivationLink from "../lib/nodemailer/activationEmail.js";
// import genJWT from "../lib/helpers/jwt.js";

// // @description: User signin
// // @Method: POST
// // @Endpoint: api/auth/signin
// // @AccessType: public


// const signin = async (req, res, next) => {
//   const error = await validateSignin(req.body);
//   if (error) {
//     return res.status(400).json({ msg: error });
//   }
//   const {email, password} = req.body;

//   // check email is in account
//   const user = await User.findOne({email});
//   if(!user){
//     return res.status(400).json({msg: "invalid email or password"});
//   }

//   // check password match
//   const passwordMatch = await bcryptjs.compare(password, user.password);
//   if(!passwordMatch){
//     return res.status(400).json({msg: "invalid email or password"});
//   }

//   if(!user.isActivate){
//     const activationToken = generateUniqueChars(80);
//     const activationTokenExpires = Date.now() + 20 * 60 * 1000;

//     user.activationToken = activationToken;
//     user.activationTokenExpires = activationTokenExpires;
//     lastName = user.lastName;

//     await user.save();
//     try{
//       await sendActivationLink({ email, lastName, activationToken });
//     }catch(error){
//       console.error(error);
//     }

//     return res.status(400).json({msg: `Activate your account. An Activation Email as been sent to ${user.email}`});
//   }  
  
//   // Setting cookie
//   const payload = {
//     _id: user._id,
//     email: user.email,
//     name: `${user.firstName} ${user.lastName}`
//   }
//   let isSecureCookie = false ; 
//   let sameSiteCookie = "lax";

//   const token = genJWT(payload);
//     const oneDay = 1000 * 60 * 60 * 24; // 24 hrs
//     //settting cookie
//     res.cookie("accessToken", token, {
//       httpOnly: true, 
//       secure: isSecureCookie,
//       signed: true,
//       expires: new Date(Date.now() + oneDay),
//       sameSite:sameSiteCookie
//     });



// }










  

// // @description: User signup
// // @Method: POST
// // @Endpoint: api/auth/signup
// // @AccessType: public
// const signup = async (req, res) => {
//     // validation

//   const error = await validateSignup(req.body);
//   if (error) {
//     return res.status(400).json({ msg: error });
//   }
//   const { email, firstName, lastName, password, phone } = req.body;
  
//   // first registered user is an admin
//   const isFirstAccount = (await User.countDocuments({})) === 0;
//   const role = isFirstAccount ? "admin" : "user";

//   const emailExist = await User.findOne({ email });
//     if (emailExist) {
//       return res.status(400).json({ msg: "Email already exist" });
//     }
//   // Hash the password
//   const salt = await bcryptjs.genSalt(10);
//   const hashedPassword = await bcryptjs.hash(password, salt);

//   // Create the user
//   const newUser = new User({
//     firstName,
//     lastName,
//     phone,
//     email,
//     password: hashedPassword,
//   });
//   const activationToken = generateUniqueChars(80);
//   const activationTokenExpires = Date.now() + 20 * 60 * 1000;
   

//   newUser.activationToken = activationToken;
//   newUser.activationTokenExpires = activationTokenExpires;

//   await newUser.save();
//   const user = {
//     firstName: newUser.firstName,
//     lastName: newUser.lastName  
//   }
//   res
//     .status(201)
//     .json({ msg: "Signup successful! An email has been sent to activate your account" });
//   try{
//     await sendActivationLink({ email, lastName, activationToken });
//   }catch(error){
//     console.error(error);
//   }

  
// };

// // @description: User activate
// // @Method: GET
// // @Endpoint: api/auth/activate/:activationToken
// // @AccessType: public
// // @AccessType: public
// const activate = async (req, res) => {
//   const activationToken = req.params.activationToken;

//   const user = await User.findOne({ activationToken });
//   if (!user) {
//     return res.status(400).json({ msg: "Invalid activation token" });
//   }

//   if (Date.now() > user.activationTokenExpires) {
//     return res.status(400).json({ msg: "Activation token expired" });
//     user.activationToken = undefined;
//     user.activationTokenExpires = undefined;
//   }

//   user.isActivate = true;
//   user.activationToken = undefined;
//   user.activationTokenExpires = undefined;

//   await user.save();

//   res.status(200).json({ msg: "Account activated successfully" });
// };


// //Forgot Password
// const forgotPassword = async (req, res) => {
//   // Validation
//   const email = req.body.email;

//   if (!email) {
//     return res.status(400).json({ msg: "Email must be provided" });
//   }

//   try {
//     // Removed the unnecessary await
//     const verifyCode = await generateUniqueSixDigitNumber();

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ msg: "We can't find a user with that email address." });
//     }

//     const passwordResetCode = verifyCode;
//     const passwordResetCodeExpires = Date.now() + 20 * 60 * 1000;
//     const lastName = user.lastName;

//     user.passwordResetCode = passwordResetCode;
//     user.passwordResetCodeExpires = passwordResetCodeExpires;

//     await user.save();

//     console.log(passwordResetCode);

//     try {
//       await sendPasswordReset({ email, lastName, passwordResetCode });
//     } catch (error) {
//       console.error(error);
//     }

//     res.status(201).json({ msg: `A Confirmation code has been sent to your ${email}` });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ msg: "Internal Server Error" });
//   }
// };

// const logout = async (req, res) => {
//   res.cookie("token", "logout", {
//     httpOnly: true,
//     expires: new Date(Date.now() + 1000),
//   });
//   res.status(StatusCodes.OK).json({ msg: "user logged out!" });
// };

// export { signin, signup, activate, forgotPassword, logout  };