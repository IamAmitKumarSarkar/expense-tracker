const express = require("express");
const { protect } = require("../middleWare/authMiddleWare");

const {
     registerUser, 
     loginUser, 
     getUserInfo 
    } = require("../controllers/authController");
const upload = require("../middleWare/uploadMiddleWare");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getUser", protect, getUserInfo);

router.post("/upload-image",upload.single("image"), (req,res) => {
    if(!req.file) return res.status(400).json({message : "No file Uploaded"});

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.status(200).json({ imageUrl });
});


module.exports = router;
