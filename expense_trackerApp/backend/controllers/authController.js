const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); 
// generate JWT token
const generateToken = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
        {
            expiresIn: "1h"
        }
    );
};

const registerUser = async (req, res) => {
    // Destructure body safely
    const { fullName, email, password, profileImageUrl } = req.body || {};
    

    // Validate required fields
    if (!fullName || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await User.create({
        fullName,
        email,
        password: hashedPassword,
        profileImageUrl
    });

    // Send response with token
    res.status(201).json({
        id: user._id,
        user,
        token: generateToken(user._id)
    });

} catch (err) {
    console.error("Error registering user:", err);
    res.status(500).json({ message: "Error registering user", error: err.message || err });
}

};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Success response
    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        profileImageUrl: user.profileImageUrl
      },
      token: generateToken(user._id)
    });
  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).json({
      message: "Login failed",
      error: err.message
    });
  }
};


// Getting User
const getUserInfo = async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select("-password");

        if(!user){
              return res.status(400).json({ message: "User not found" });    
        }
        res.status(200).json({
            user,
        })
    }catch(err){
        console.error("Error Finding user:", err);
    res.status(500).json({ message: "Error Finding user", error: err.message || err });  
    }
};

module.exports = { registerUser, loginUser, getUserInfo };
