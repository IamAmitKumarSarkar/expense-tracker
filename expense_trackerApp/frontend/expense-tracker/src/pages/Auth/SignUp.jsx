import React, { useState } from 'react';
import AuthLayout from '../../components/layouts/AuthLayout';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContex';
import uploadImage from '../../utils/uploadImage';
const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const {updateUser} = useContext(UserContext)
  const navigate = useNavigate();

  // const handleSignUp = async (e) => {
  //   e.preventDefault();

  //   if (!fullName) {
  //     setError("Please enter your full name");
  //     return;
  //   }

  //   if (!validateEmail(email)) {
  //     setError("Please enter a valid email address");
  //     return;
  //   }

  //   if (!password || password.length < 8) {
  //     setError("Password must be at least 8 characters");
  //     return;
  //   }

  //   setError("");

  //   // // Upload image first if selected (optional)
  //   // if (profilePic) {
  //   //   // logic for image upload
  //   //   console.log("Uploading image...");
  //   // }

  //   // console.log("Signing up...");
  //   // API call here


  //   try{

  //     //upload image if it present
  //     if(profilePic){
  //       const imagUploadRes = await uploadImage(profilePic);
  //       profileImageUrl = imagUploadRes.imageUrl || "";
  //     }
  //     const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER,{
  //       fullName,
  //       email,
  //       password,
  //       profileImageUrl,
  //     });
  //     const{ token , user} = response.data;

  //     if(token){
  //       localStorage.setItem("token",token);
  //       updateUser(user);
  //       navigate("/dashboard");
  //     }
  //   }catch(error){
  //     if(error.response && error.response.data.message){
  //       setError(error.response.data.message);
  //     }else{
  //       setError("Something went wrong . Please try again later")
  //     }
  //   }
  // };

const handleSignUp = async (e) => {
  e.preventDefault();

  if (!fullName) {
    setError("Please enter your full name");
    return;
  }

  if (!validateEmail(email)) {
    setError("Please enter a valid email address");
    return;
  }

  if (!password || password.length < 8) {
    setError("Password must be at least 8 characters");
    return;
  }

  setError("");

  try {
    // define image URL always
    let profileImageUrl = "";

    // upload only if profilePic exists
    if (profilePic) {
      const imagUploadRes = await uploadImage(profilePic);
      profileImageUrl = imagUploadRes.imageUrl || "";
    }

    const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
      fullName,
      email,
      password,
      profileImageUrl,
    });

    const { token, user } = response.data;

    if (token) {
      localStorage.setItem("token", token);
      updateUser(user);
      navigate("/dashboard");
    }

  } catch (error) {
    if (error.response && error.response.data.message) {
      setError(error.response.data.message);
    } else {
      setError("Something went wrong. Please try again later.");
    }
  }
};



  return (
    <AuthLayout>
      <div className="lg:w-full h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        
        <h3 className="text-xl font-semibold text-black">Create an account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Join us today by entering your details below.
        </p>

        {/* Error Message */}
        {error && (
          <p className="text-sm text-red-600 mb-3">{error}</p>
        )}

        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector 
            image={profilePic} 
            setImage={setProfilePic} 
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Full Name"
              placeholder="John Doe"
              type="text"
            />

            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="john@example.com"
              type="email"
            />

            <div className="col-span-2">
              <Input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label="Password"
                placeholder="Minimum 8 characters"
                type="password"
              />
            </div>
          </div>

          <button type="submit" className="btn-primary mt-4">SIGN UP</button>

          <p className="text-[13px] text-slate-800 mt-3">
            Already have an account?{" "}
            <Link className="font-medium text-primary underline" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
