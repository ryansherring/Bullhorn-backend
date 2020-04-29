const db = require("../models");


///////////////////////////////////// CREATE A NEW GAME /////////////////////////////////////
const createGame = (req, res) => {
    console.log(req.body)
    if (!req.body.GameName || !req.body.SpeakingTime) {
	  return res.status(400).json({
		status: 400,
		message: 'Please enter your Game name and Game size'
	  });
	}
  db.Games.create(req.body, (error, createdGame) => {
    if (error)
      return res
        .status(500)
        .json({ message: "Something went wrong", error: error });

    db.User.findByIdAndUpdate(
      req.session.currentUser.id,
      { $push: { Games: createdGame._id } },
      { new: true },
      (error, updatedUser) => {
        if (error)
          return res
            .status(500)
            .json({ message: "Something went wrong", error: error });

        const responseObj = {
          status: 200,
          data: updatedUser,
          Games: createdGame,
          requestedAt: new Date().toLocaleString()
        };

        res.status(200).json(responseObj);
      }
    );
  });
}


///////////////////////////////////////// GET ALL GAMES ////////////////////////////////////////


const getGames = (req, res) => {
    db.Games.find((err, Games) => {
      console.log(Games);
      if (err) return res.status(400).json(err);
      const resObj = {
        message: "Games gotted",
        data: Games,
        requestedAt: new Date().toLocaleString
      }
      res.json(resObj);
    });
  };


////////////////////////////////////////// EDIT GAME ///////////////////////////////////////////


const editGame = (req, res) => {
  db.Games.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, editedGame) => {
      console.log("edit route");
      if (err) {
        return res.json(err);
      }
      const resObj = {
        message: "Game updated!",
        data: editedGame,
        requestedAt: new Date().toLocaleString
      };
      res.json(resObj);
    }
  );
};


/////////////////////////////////////// GET SINGLE GAME ///////////////////////////////////////


const showGame = (req, res) => {
    db.Games.findById(req.params.id, (err, foundGame) => {
      if (err) {
        console.log(err);
      }
      const resObj = {
        data: foundGame,
        requestedAt: new Date().toLocaleString()
      };
      return res.json(resObj);
    });
  };


////////////////////////////////////////// DELETE GAME ////////////////////////////////////////


  const destroyGame = (req, res) => {
    db.Games.findByIdAndDelete(req.params.id, (err, deletedGame) => {
      if (err) {
        return res.json({ err });
      }
      const resObj = {
        data: deletedGame,
        requestedAt: new Date().toLocaleString()
      };
      return res.json({ resObj });
    });
  };

module.exports = {
    createGame,
    getGames,
    editGame,
    showGame,
    destroyGame,
}