const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TopicSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required."]
  },
});

TopicSchema.set("toJSON", {
  transform: (doc, ret, opt) => {
    delete ret["password"];
    return ret
  }
})

const Topic = mongoose.model("Topic", TopicSchema);

module.exports = Topic;