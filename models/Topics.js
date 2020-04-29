const mongoose = require("mongoose");

const TopicSchema = mongoose.Schema({
  prompt: {
    type: String,
    required: [true, "Prompt is required."]
  },
  judgement: {
    type: String,
    required: [true, "Judgement is required."]
  },
});

const Topics = mongoose.model("Topics", TopicSchema);

module.exports = Topics;