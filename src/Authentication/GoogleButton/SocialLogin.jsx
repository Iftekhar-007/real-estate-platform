// import React, { use } from "react";
// // import Context from "../Contexts/Context";
// import { useLocation, useNavigate } from "react-router";
// // import UseAxios from "../Hooks/UseAxios";
// import AuthContext from "../../Context/AuthContext";

// const SocialLogin = () => {
//   const { signInWithGoogle, updateUserProfile, user } = use(AuthContext);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const from = location?.state?.from || "/";
//   //   const axiosInstance = UseAxios();

//   const handleGoogleSignIn = () => {
//     signInWithGoogle()
//       .then(async (res) => {
//         console.log(res.user);
//         navigate(from);

//         // const userInfo = {
//         //   email: res.user.email,
//         //   role: "user", // default
//         //   cratedAt: new Date().toISOString(),
//         // };

//         // const userRes = await axiosInstance.post("/users", userInfo);
//         // console.log(userRes.data);

//         // update in firebase

//         const userProfile = {
//           displayName: res.user.displayName,
//           photoURL: res.user.photoURL,
//         };

//         updateUserProfile(userProfile)
//           .then(() => {
//             console.log("updated profile name and picture");
//           })
//           .catch((err) => {
//             console.log(err);
//           });
//       })
//       .catch((error) => {
//         console.log(error.message);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };
//   return (
//     <button
//       onClick={handleGoogleSignIn}
//       className="btn bg-white text-black border-[#e5e5e5]"
//     >
//       <svg
//         aria-label="Google logo"
//         width="16"
//         height="16"
//         xmlns="http://www.w3.org/2000/svg"
//         viewBox="0 0 512 512"
//       >
//         <g>
//           <path d="m0 0H512V512H0" fill="#fff"></path>
//           <path
//             fill="#34a853"
//             d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
//           ></path>
//           <path
//             fill="#4285f4"
//             d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
//           ></path>
//           <path
//             fill="#fbbc02"
//             d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
//           ></path>
//           <path
//             fill="#ea4335"
//             d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
//           ></path>
//         </g>
//       </svg>
//       Login with Google
//     </button>
//   );
// };

// export default SocialLogin;

import React, { use } from "react";
import { useLocation, useNavigate } from "react-router";
import AuthContext from "../../Context/AuthContext";
import UseAxios from "../../Routes/UseAxios";
// import UseAxios from "../../Hooks/UseAxios";

const SocialLogin = () => {
  const { signInWithGoogle, updateUserProfile } = use(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const axiosInstance = UseAxios();

  const from = location?.state?.from || "/";

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(async (res) => {
        const loggedUser = res.user;

        // Step 1: Update Firebase Profile
        const userProfile = {
          displayName: loggedUser.displayName,
          photoURL: loggedUser.photoURL,
        };

        await updateUserProfile(userProfile);

        // Step 2: Send user to backend
        const userInfo = {
          email: loggedUser.email,
          name: loggedUser.displayName,
          image: loggedUser.photoURL,
          role: "user", // default role
          createdAt: new Date().toISOString(),
        };

        try {
          const response = await axiosInstance.post("/users", userInfo);
          console.log("User saved to DB:", response.data);
        } catch (err) {
          console.error("Error saving user:", err);
        }

        // Step 3: Navigate to previous or home
        navigate(from);
      })
      .catch((error) => {
        console.error("Google sign-in failed:", error);
      });
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      className="btn bg-white text-black border-[#e5e5e5]"
    >
      <svg
        aria-label="Google logo"
        width="16"
        height="16"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <g>
          <path d="m0 0H512V512H0" fill="#fff"></path>
          <path
            fill="#34a853"
            d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
          ></path>
          <path
            fill="#4285f4"
            d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
          ></path>
          <path
            fill="#fbbc02"
            d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
          ></path>
          <path
            fill="#ea4335"
            d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
          ></path>
        </g>
      </svg>
      Login with Google
    </button>
  );
};

export default SocialLogin;
