const mongoose = require("mongoose");

const GameSchema = mongoose.Schema({
  GameName: {
    type: String,
    required: [true, "Please enter a Game Name"]
  },
  Topics: [
    {
      type: Schema.Types.ObjectId,
      ref: "Topics"
    }
  ],
  Speakers: [
    {
      type: Schema.Types.ObjectId,
      ref: "Speakers"
    }
  ],
  SpeakingTime: {
    type: Number,
  }
});

const Games = mongoose.model("Games", GameSchema);

module.exports = Games;