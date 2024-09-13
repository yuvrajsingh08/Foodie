import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const Register = () => {
    const [formData, setFormData] = useState({
      username: "",
      password: "",
      email: "",
      name: "",
      phone_number: "",
      role: "CUSTOMER",
    });
    const navigate = useNavigate();
     const is_log = useSelector((state) => state?.user?.is_logged_in);
      function changeHandler(event) {
        const { name, value} = event.target;
        setFormData((prevFormData) => {
          return {
            ...prevFormData,
            [name]: value,
          };
        });
      }

    function submitHandler(event) {
        event.preventDefault();
        event.stopPropagation();
       
        // const URL = "https://cors-anywhere.herokuapp.com/http://test-api.achilyon.in/v1/rest-auth/register";

        async function submitForm() {
          try {
            // console.log("Sending data:", formData);
            const response = await fetch(
              "http://test-api.achilyon.in/v1/rest-auth/register",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                  "X-Requested-With": "XMLHttpRequest", // Optional header for some servers
                },
                body: JSON.stringify(formData),
              }
            );

           if (!response.ok) {
             const errorData = await response.json();
             toast.error(errorData.error);
             return;
           }

           const data = await response.json();
           toast.success(data.message);
           navigate("/auth/login");
          } catch (error) {
            toast.error(error?.error)
            // console.log(error);
          }
        };

        submitForm();
    }
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      {is_log && <Navigate to="/" />}
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create new Account
        </h1>
        <p className="mt-2">
          Already have a account?
          <Link
            className="font-medium ml-2 text-primary hover:underline text-[#fc6d19]"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>
      <div>
        <form className="px-4 flex flex-col gap-2" onSubmit={submitHandler}>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="username"
              className="text-md  tracking-wide font-semibold "
            >
              Username:
            </label>
            <input
              type="text"
              name="username"
              onChange={changeHandler}
              value={formData.username}
              placeholder="Enter your username"
              className="px-2 py-2 rounded-lg  bg-gray-100 appearance-none border shadow focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex flex-col  gap-1 ">
            <label
              htmlFor="name"
              className="text-md  tracking-wide font-semibold "
            >
              Name:
            </label>
            <input
              type="text"
              name="name"
              onChange={changeHandler}
              value={formData.name}
              placeholder="Enter your name"
              className="px-2 py-2 rounded-lg  bg-gray-100 appearance-none border shadow focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex flex-col  gap-1 ">
            <label
              htmlFor="phone_number"
              className="text-md  tracking-wide font-semibold "
            >
              Mobile no:
            </label>
            <input
              type="text"
              name="phone_number"
              onChange={changeHandler}
              value={formData.phone_number}
              placeholder="Enter your Phone no."
              className="px-2 py-2 rounded-lg  bg-gray-100 appearance-none border shadow focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex flex-col  gap-1">
            <label
              htmlFor="email"
              className="text-md  tracking-wide font-semibold "
            >
              Email:
            </label>
            <input
              type="email"
              name="email"
              onChange={changeHandler}
              value={formData.email}
              placeholder="Enter your email"
              className="px-2 py-2 rounded-lg  bg-gray-100 appearance-none border shadow focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex flex-col  gap-1">
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
          <div className="flex  items-baseline gap-2 mt-2">
            <label
              htmlFor="role"
              className="text-md tracking-wide font-semibold "
            >
              Role:{" "}
            </label>
            <select
              name="role"
              id="role"
              onChange={changeHandler}
              value={formData.role}
              className="px-2 py-1 rounded-lg bg-gray-100 appearance-none border shadow focus:outline-none focus:shadow-outline"
            >
              <option value="CUSTOMER">CUSTOMER </option>
              <option value="RESTAURANT">RESTAURANT</option>
            </select>
          </div>

          <div>
            <button className="bg-[#FC8019] w-full my-4 hover:bg-[#fc6d19] text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register
