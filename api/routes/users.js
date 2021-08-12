const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const verify = require("../verifyToken.js")

//UPDATE password username and email
router.put("/:id", verify, async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {        //req.params is /:id in the URI
      if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
          req.body.password,
          process.env.SECRET_KEY
        ).toString();
      }
  
      try {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body, //set new props to user 
          },
          { new: true } // return new info after update
        );
        res.status(200).json(updatedUser);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You can update only your account!");
    }
  });

//GET USER
router.get("/find/:id", async (req,res) =>{ //dont need verify here because everyone can find user
try{
    const user = await User.findById(req.params.id);

    // user && res.status(400).json("User not found") <- don't need this because user already login

    const {password, ...info} = user._doc; //this is from mongodb format _doc contain all user's information. Try user to fingure it out
    res.status(200).json({ ...info })
}catch(err){
    res.status(500).json(err)
}
})

//GET_ALL USERS
router.get("/", verify, async (req, res) => { //to add query add logic behind /
    const query = req.query.new; // ex: /?new=true
    if (req.user.isAdmin) {
      try {
        const users = query
          ? await User.find().sort({ _id: -1 }).limit(10)  //id: -1 : latest data 
          : await User.find(); //if no query fetch all user
        res.status(200).json(users);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You are not allowed to see all users!");
    }
  });

//GET USERS STAT (total number per month)
router.get("/stats", async(req, res) =>{

  try {
    const data = await User.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verify, async(req, res) =>{
    if( req.body.id === req.params.id || req.user.isAdmin ){
        try{
             await User.findByIdAndDelete(req.params.id)
             res.status(200).json("Deleted!")
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(403).json("You can only delete your account!")
    }
})



module.exports = router;