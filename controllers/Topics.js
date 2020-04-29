const bcrypt = require("bcryptjs");
const db = require("../models");

///////////////////////////////////////// Create new topic ////////////////////////////////////////
const createTopic = (req, res) => {
  console.log(req.body);
  if (!req.body.Prompt && !req.body.Judgement) {
    return res.status(400).json({
      status: 400,
      message: "Need a speaking prompt or judgement",
    });
  }
  // check if topic already is in the db
  db.Topics.findOne(
    { Prompt: req.body.Prompt } || { Judgement: req.body.Judgement },
    (err, foundTopic) => {
      if (err)
        return res.status(500).json({
          status: 500,
          message: "Something went wrong. Please try again",
        });

      if (foundTopic)
        return res.status(400).json({
          status: 400,
          message:
            "Prompt or Judgement has already been registered. Please try again",
        });
    
    // NEW TOPIC HERE
      const newTopic = {
        Prompt: req.body.Prompt,
        Judgement: req.body.Judgement,
      };

      db.Topics.create(newUser, (err, savedUser) => {
        if (err) return res.status(500).json({ status: 500, message: err });
        res.sendStatus(201);
      });
    }
  );
};

/////////////////////////////////////// GET SINGLE Topic ///////////////////////////////////////


const showTopic = (req, res) => {
    db.Topics.findById(req.params.id, (err, foundTopic) => {
      if (err) {
        console.log(err);
      }
      const resObj = {
        data: foundTopic,
        requestedAt: new Date().toLocaleString()
      };
      return res.json(resObj);
    });
  };


/////////////////////////////////////// REMOVE TOPIC //////////////////////////////////////////////
const destroyTopic = (req, res) => {
    db.Topics.findByIdAndDelete(req.params.id, (err, deletedTopic) => {
      if (err) {
        return res.json({ err });
      }
      const resObj = {
        data: deletedTopic,
        requestedAt: new Date().toLocaleString()
      };
      return res.json({ resObj });
    });
  };

module.exports = {
    createTopic,
    showTopic,
    destroyTopic
}