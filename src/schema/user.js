import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minLength: 5,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minLength: 6,
      validate: {
        validator: function (emailValue) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
            emailValue
          );
        },
        message: "Invalid email format",
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 5,
    },
  },
  { timestamps: true } //ceated_at and updated_at
);

userSchema.pre("save", function modifyPassword(next) {
  const user = this; //object with plain password
  const SALT = bcrypt.genSaltSync(9);

  const hashPassword = bcrypt.hashSync(user.password, SALT);

  user.password = hashPassword;
  next();
});

const user = mongoose.model("User", userSchema); // user collection

export default user;
