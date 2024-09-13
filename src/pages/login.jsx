import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link,  Navigate,  useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setToken, setUser } from '../store/user';

const Login = () => {
   const [formData, setFormData] = useState({
     useusername: "",
     password: ""
   });
   const email = useSelector((state) => state?.user?.email);
   const is_log = useSelector((state) => state?.user?.is_logged_in);
   function changeHandler(event) {
     const { name, value } = event.target;
     setFormData((prevFormData) => {
       return {
         ...prevFormData,
         [name]: value,
       };
     });
   }
    const navigate = useNavigate();
    const dispatch = useDispatch();
   function submitHandler(event) {
     event.preventDefault();
     event.stopPropagation();

     const URL =
       "/v1/rest-auth/login";

     async function submitForm() {
       try {
         // console.log("Sending data:", formData);
         const response = await fetch(URL, {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
             Accept: "application/json",
             "X-Requested-With": "XMLHttpRequest", // Optional header for some servers
           },
           body: JSON.stringify(formData),
           // Ensure cookies and credentials are sent with the request
         });

         if (!response.ok) {
           toast.error("some error occurred");
           return;
         }

         toast.success("login successfully");
         const data = await response.json();
        //  console.dir(data?.data?.user);
         setFormData({
           username: "",
           password: "",
         });

         dispatch(setToken(data?.data?.access_token));
         dispatch(setUser(data?.data?.user));
         console.log(email)
         navigate("/");
       } catch (error) {
         toast.error(error?.error);
         console.log(error);
         // toast.error("User not registered try again..");
       }

      //  console.log("data", FormData);
     }

     submitForm();
   }

  return (
    <div className="mx-auto w-full max-w-md space-y-6 ">
      {is_log && <Navigate to="/"/>}
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to your account
        </h1>
        <p className="mt-2">
          Don't have an account?
          <Link
            className="font-medium ml-2 text-primary hover:underline text-[#fc6d19]"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>
      <div>
        <form onSubmit={submitHandler} className="px-4">
          <div className="flex flex-col my-4 gap-2 ">
            <label
              htmlFor="email"
              className="text-md  tracking-wide font-semibold "
            >
              Username:
            </label>
            <input
              type="username"
              name="username"
              onChange={changeHandler}
              value={formData.email}
              placeholder="Enter your username"
              className="px-2 py-2 rounded-lg  bg-gray-100 appearance-none border shadow focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex flex-col my-4 gap-2">
            <label
              htmlFor="password"
              className="text-md tracking-wide font-semibold "
            >
              Password:
            </label>
            <input
              type="password"
              name="password"
              onChange={changeHandler}
              value={formData.password}
              placeholder="enter your password"
              className="px-2 py-2 rounded-lg bg-gray-100 appearance-none border shadow focus:outline-none focus:shadow-outline"
            />
          </div>

          <div>
            <button className="bg-[#FC8019] w-full my-0 hover:bg-[#fc6d19] text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline">
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login
