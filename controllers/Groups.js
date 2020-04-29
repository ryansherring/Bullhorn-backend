const db = require("../models");


///////////////////////////////////// CREATE A NEW GROUP /////////////////////////////////////


const createGroup = (req, res) => {
    console.log(req.body)
    if (!req.body.GroupName) {
	  return res.status(400).json({
		status: 400,
		message: 'Please enter your Group name'
	  });
	}
  db.Groups.create(req.body, (error, createdGroup) => {
    if (error)
      return res
        .status(500)
        .json({ message: "Something went wrong", error: error });

    db.User.findByIdAndUpdate(
      req.session.currentUser.id,
      { $push: { Groups: createdGroup._id } },
      { new: true },
      (error, updatedUser) => {
        if (error)
          return res
            .status(500)
            .json({ message: "Something went wrong", error: error });

        const responseObj = {
          status: 200,
          data: updatedUser,
          Groups: createdGroup,
          requestedAt: new Date().toLocaleString()
        };

        res.status(200).json(responseObj);
      }
    );
  });
}


///////////////////////////////////////// GET ALL GROUPS ////////////////////////////////////////


const getGroups = (req, res) => {
    db.Groups.find((err, Groups) => {
      console.log(Groups);
      if (err) return res.status(400).json(err);
      const resObj = {
        message: "Groups gotted",
        data: Groups,
        requestedAt: new Date().toLocaleString
      }
      res.json(resObj);
    });
  };


////////////////////////////////////////// EDIT GROUP ///////////////////////////////////////////


const editGroup = (req, res) => {
  db.Groups.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, editedGroup) => {
      console.log("edit route");
      if (err) {
        return res.json(err);
      }
      const resObj = {
        message: "Group updated!",
        data: editedGroup,
        requestedAt: new Date().toLocaleString
      };
      res.json(resObj);
    }
  );
};


/////////////////////////////////////// GET SINGLE GROUP ///////////////////////////////////////


const showGroup = (req, res) => {
    db.Groups.findById(req.params.id, (err, foundGroup) => {
      if (err) {
        console.log(err);
      }
      const resObj = {
        data: foundGroup,
        requestedAt: new Date().toLocaleString()
      };
      return res.json(resObj);
    });
  };


////////////////////////////////////////// DELETE GROUP ////////////////////////////////////////


  const destroyGroup = (req, res) => {
    db.Groups.findByIdAndDelete(req.params.id, (err, deletedGroup) => {
      if (err) {
        return res.json({ err });
      }
      const resObj = {
        data: deletedGroup,
        requestedAt: new Date().toLocaleString()
      };
      return res.json({ resObj });
    });
  };

module.exports = {
    createGroup,
    getGroups,
    editGroup,
    showGroup,
    destroyGroup,
}