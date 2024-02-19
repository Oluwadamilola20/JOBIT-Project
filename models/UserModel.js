import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs"
import JWT from "jsonwebtoken"

const UserSchema = new mongoose.Schema({
    firstName: {
      type: String,
      trim: true,
      minLength: 2,
      maxLength: 50,
      lowercase: true,
      required: true [true, "Please provide name"],
    },
    lastName: {
      type: String,
      trim: true,
      minLength: 2,
      maxLength: 50,
      lowercase: true,
      required: true [true, "Please provide name"],
    },
    phone: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
      required: true,
      validate: {
        validator: validator.isEmail,
        message: "Please provide valid email",
      },
    },
    avatar: String,
    password: {
      type: String,
      trim: true,
      maxLength: 255,
      required: true [true, "Please provide password"],
    },
    isActivate: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    location: {
      type: String,
      default: "Lagos",
    },
    activationToken: String,
    activationTokenExpires: String,
});

UserSchema.pre("save", async function () {
  // console.log(this.modifiedPaths());
  // console.log(this.isModified('name'));
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

UserSchema.methods.createJWT = function () {
  return JWT.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};
const User = mongoose.model("User", UserSchema);

export default User;