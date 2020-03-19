const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
  speeches: [
    {
      type: Schema.Types.ObjectId,
      ref: "speeches"
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