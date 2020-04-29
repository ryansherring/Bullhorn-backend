const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required."]
  },
  email: {
      type: String,
      required: [true, 'email is required'],
      unique: true
  },
  password: {
    type: String,
    required: true
  },
  Groups: [
    {
      type: Schema.Types.ObjectId,
      ref: "Groups"
    }
  ],
  Games: [
    {
      type: Schema.Types.ObjectId,
      ref: "Games"
    }
  ],
});

UserSchema.set("toJSON", {
  transform: (doc, ret, opt) => {
    delete ret["password"];
    return ret
  }
})

const User = mongoose.model("User", UserSchema);

module.exports = User;