const db = require("../models");


///////////////////////////////////// CREATE A NEW Speaker /////////////////////////////////////


const createSpeaker = (req, res) => {
    console.log(req.body)
    if (!req.body.SpeakerName) {
	  return res.status(400).json({
		status: 400,
		message: 'Please enter your Speaker name'
	  });
	}
  db.Speakers.create(req.body, (error, createdSpeaker) => {
    if (error)
      return res
        .status(500)
        .json({ message: "Something went wrong", error: error });

    db.Speakers.findByIdAndUpdate(
      req.session.currentUser.id,
      { $push: { Speakers: createdSpeaker._id } },
      { new: true },
      (error, updatedUser) => {
        if (error)
          return res
            .status(500)
            .json({ message: "Something went wrong", error: error });

        const responseObj = {
          status: 200,
          data: updatedUser,
          Speakers: createdSpeaker,
          requestedAt: new Date().toLocaleString()
        };

        res.status(200).json(responseObj);
      }
    );
  });
}


///////////////////////////////////////// GET ALL Speakers ////////////////////////////////////////


const getSpeakers = (req, res) => {
    db.Speakers.find((err, Speakers) => {
      console.log(Speakers);
      if (err) return res.status(400).json(err);
      const resObj = {
        message: "Speakers gotted",
        data: Speakers,
        requestedAt: new Date().toLocaleString
      }
      res.json(resObj);
    });
  };


////////////////////////////////////////// EDIT Speaker ///////////////////////////////////////////
// used for adding mistakes

  const editSpeaker = (req, res) => {
    db.Speakers.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
      (err, editedSpeaker) => {
        console.log("edit route");
        if (err) {
          return res.json(err);
        }
        const resObj = {
          message: "Speaker updated!",
          data: editedSpeaker,
          requestedAt: new Date().toLocaleString
        };
        res.json(resObj);
      }
    );
  };

////////////////////////////////////////// DELETE Speaker ////////////////////////////////////////


const destroySpeaker = (req, res) => {
  db.Speakers.findByIdAndDelete(req.params.id, (err, deletedSpeaker) => {
    if (err) {
      return res.json({ err });
    }
    const resObj = {
      data: deletedSpeaker,
      requestedAt: new Date().toLocaleString()
    };
    return res.json({ resObj });
  });
};


module.exports = {
  createSpeaker,
  getSpeakers,
  editSpeaker,
  destroySpeaker
}