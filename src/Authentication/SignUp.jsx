import React, { use, useState } from "react";
// import Logo from "../Logo/Logo";
import { NavLink, useNavigate } from "react-router";
import { useForm } from "react-hook-form";

// import axios from "axios";
// import UseAxios from "../Hooks/UseAxios";
// import SocialLogin from "../GoogleButton/SocialLogin";
import AuthContext from "../Context/AuthContext";
import Logo from "../Layouts/Logo";
import axios from "axios";
import SocialLogin from "./GoogleButton/SocialLogin";
import UseAxios from "../Routes/UseAxios";
import { toast, ToastContainer } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();
  const axiosInstance = UseAxios();
  //   const axiosInstance = UseAxios();
  const [profilePic, setProfilePic] = useState("");
  const { createUserWithEmailPass, updateUserProfile } = use(AuthContext);
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  // const onSubmit = (data) => {
  //   const email = data.email;
  //   const password = data.password;

  //   createUserWithEmailPass(email, password)
  //     .then(async (res) => {
  //       console.log(res.user);

  //       // update in db

  //       // const userInfo = {
  //       //   name: data.name,
  //       //   email: data.email,
  //       //   role: "user", // default
  //       //   cratedAt: new Date().toISOString(),
  //       // };

  //       // const userRes = await axiosInstance.post("/users", userInfo);
  //       // console.log(userRes.data);

  //       // update in firebase

  //       const userProfile = {
  //         displayName: data.name,
  //         photoURL: profilePic,
  //       };

  //       updateUserProfile(userProfile)
  //         .then(() => {
  //           console.log("updated profile name and picture");
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //       navigate("/");
  //     })
  //     .catch((error) => {
  //       console.log(error.message);
  //     });
  // };

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;

    createUserWithEmailPass(email, password)
      .then(async (res) => {
        const user = res.user;

        // ✅ Create user info for DB
        const userInfo = {
          name: data.name,
          email: email,
          image: profilePic || "", // default "" if not uploaded
          role: "user",
          createdAt: new Date().toISOString(),
        };

        // ✅ Immediately save to database
        axiosInstance
          .post("/users", userInfo)
          .then(() => {
            // console.log("User saved to DB");
            toast.success("Account created successfully!");
            navigate("/");

            // 🔄 Now update profile in Firebase (optional, visual only)
            const userProfile = {
              displayName: data.name,
              photoURL: profilePic,
            };

            updateUserProfile(userProfile)
              .then(() => {
                // console.log("Firebase profile updated");
                navigate("/");
              })
              .catch((err) => {
                console.error("Profile update error:", err);
                // Still navigate since user is saved and created
                navigate("/");
              });
          })
          .catch((err) => {
            console.error("DB save error:", err);
          });
      })
      .catch((error) => {
        console.error("Firebase error:", error.message);
      });
  };

  const handleImgUpload = async (e) => {
    const image = e.target.files[0];
    // console.log(image);

    const formData = new FormData();
    formData.append("image", image);

    const imgUploadURL = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMG_KEY
    }`;

    const res = await axios.post(imgUploadURL, formData);

    setProfilePic(res.data.data.url);
  };
  return (
    <div className="w-9/12 mx-auto my-5">
      <Logo></Logo>
      <div className="lg:flex lg:items-center lg:justify-center lg:h-screen">
        <div className="hero">
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <h1 className="text-5xl font-bold">Sign Up!</h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset className="fieldset">
                  {/* name */}
                  <label className="label">Name</label>
                  <input
                    {...register("name", { required: true })}
                    type="text"
                    className="input"
                    placeholder="name"
                  />
                  {errors.name?.type === "required" && (
                    <p className="text-red-500">Name is required</p>
                  )}

                  {/* photo */}
                  <label className="label">Profile Photo</label>
                  <input
                    onChange={handleImgUpload}
                    type="file"
                    className="input"
                    placeholder="Your Profile Picture"
                  />

                  {/* email */}
                  <label className="label">Email</label>
                  <input
                    {...register("email", { required: true })}
                    type="email"
                    className="input"
                    placeholder="Email"
                  />
                  {errors.email?.type === "required" && (
                    <p className="text-red-500">email is required</p>
                  )}

                  {/* password */}
                  <label className="label">Password</label>
                  <input
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                      validate: {
                        hasUpperCase: (value) =>
                          /[A-Z]/.test(value) ||
                          "Must contain at least one uppercase letter",
                        hasSpecialChar: (value) =>
                          /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                          "Must contain at least one special character",
                      },
                    })}
                    type="password"
                    className="input"
                    placeholder="Password"
                  />
                  {errors.password && (
                    <p className="text-red-500">{errors.password.message}</p>
                  )}

                  <div>
                    <a className="link link-hover">Forgot password?</a>
                  </div>
                  <button className="btn btn-neutral mt-4">Sign Up</button>
                </fieldset>
              </form>
              <NavLink to="/login">
                Have An Account ? <span className="text-red-500">Log In</span>
              </NavLink>

              <SocialLogin></SocialLogin>
              <ToastContainer></ToastContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
