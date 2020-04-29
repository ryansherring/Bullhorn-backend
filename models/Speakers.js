const mongoose = require("mongoose");

const SpeakerSchema = mongoose.Schema({    
  name: {
    type: String,
    required: [true, "Name is required."]
  },
  Errors: {
      type: Number
    }
});

const Speakers = mongoose.model("Speakers", SpeakerSchema);

module.exports = Speakers