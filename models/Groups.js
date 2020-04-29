const mongoose = require("mongoose");

const GroupSchema = mongoose.Schema({    
  GroupName: {
    type: String,
    required: [true, "Name your Group"]
  },
  Speakers: [
    {
      type: Schema.Types.ObjectId,
      ref: "Speakers"
    }
  ],
});

const Groups = mongoose.model("Groups", GroupSchema);

module.exports = Groups