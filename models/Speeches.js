const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SpeechSchema = mongoose.Schema({
  speechName: {
    type: String,
    required: [true, "speechName is required."]
  },
  speechLength: {
    type: Number,
    required: [true, "speechLength is required."]
  },
  Errors: [
    {
      type: Schema.Types.ObjectId,
      ref: "Errors"
    }
  ],

});

const speeches = mongoose.model("speeches", SpeechSchema);

module.exports = speeches;