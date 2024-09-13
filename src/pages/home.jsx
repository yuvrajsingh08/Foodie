import React, { useEffect, useState } from 'react'
import Rest from '../components/home/Restaurant';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FaUserAlt } from "react-icons/fa";
import { IoExit } from 'react-icons/io5';
import { logout } from '../store/user';
import { Navigate, useNavigate } from 'react-router-dom';


const Home = () => {
  const [lists, setlists] = useState("");
  const [orders, setorders] = useState(""); 
  const [filters, setfilters] = useState({
    cash: "Payment Method",
    status: "ALL",
    veg: "",
  });

  const name = useSelector((state) => state?.user?.name)
   const is_log = useSelector((state) => state?.user?.is_logged_in);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function serveHandler(event) {
      const { name, value } = event.target;
      console.log(name, value);
      setfilters((prevdata) => {
        return {
          ...prevdata,
          [name]: value,
        };
      });

      // console.log(filters.status);

     const updatedOrdersList = orders.data.filter(
       (list) => list.status === value
     );

     // Set the filtered list
     setlists(updatedOrdersList);
  }

  function cashHandler(event) {
    const { name, value } = event.target;
    console.log(name, value);
    setfilters((prevdata) => {
      return {
        ...prevdata,
        [name]: value,
      };
    });
    console.log(filters.cash);
    const mode = value !== "Cash"
    const updatedOrdersList = orders.data.filter(
      (list) => list.is_cash !== mode
    );

    // Set the filtered list
    setlists(updatedOrdersList);
  }


  const token = useSelector((state) => state?.user?.access_token);
  const fetchOrders = async () => {
    try {
      const response = await fetch("/v1/orders/all-orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-Requested-With": "XMLHttpRequest",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.error);
        return;
      }

      const data = await response.json();
      // console.log(data);
      setorders(data);
      // toast.success(data.message);
      setlists(data.data);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Some error occured");
    }
  };

  function logoutHandler() {
      dispatch(logout());
      navigate("/auth/login");
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  if (lists.length === 0) {
    return (
      <div>
        {!is_log && <Navigate to="/auth/login" />}
        <h2>NO RESTAURANT AVAILABLE</h2>
      </div>
    );
  }
  return (
    <div className="flex flex-col w-[100vw] h-[100vh] overflow-x-hidden">
     
      <div className="py-4 bg-[#fc6d19] flex justify-between items-center px-8">
        <h1 className="text-white font-poppins text-3xl tracking-widest font-bold">
          FOODIE
        </h1>
        <div className="font-sans text-white tracking-wider">
          <span className="text-lg font-medium mr-4">Filters -</span>
          <label htmlFor="status">Status: </label>
          <select
            name="status"
            id="status"
            onChange={serveHandler}
            value={filters.status}
            className=" py-1 px-2  text-center appearance-none rounded-lg mr-4 bg-[#ffffff3b]  focus:outline-none focus:shadow-outline"
          >
            <option
              value="ALL"
              className=" py-1  px-2 text-left text-[#393838]"
              disabled
              selected
            >
              All
            </option>
            <option value="SERVED" className=" py-1 px-2 text-left text-black ">
              Served
            </option>
            <option
              value="PENDING"
              className=" py-1 px-2 text-left text-black "
            >
              Pending
            </option>
          </select>
          <label htmlFor="Cash">Cash: </label>
          <select
            name="cash"
            id="cash"
            onChange={cashHandler}
            value={filters.cash}
            className=" py-1 px-2  text-center appearance-none rounded-lg mr-4 bg-[#ffffff3b]  focus:outline-none focus:shadow-outline"
          >
            <option
              value="Payment Method"
              disabled
              selected
              className=" py-1  px-2 text-left text-[#393838]"
            >
              Payment Method
            </option>
            <option value="Cash" className=" py-1 px-2 text-left text-black ">
              Cash{" "}
            </option>
            <option value="Others" className=" py-1 px-2 text-left text-black ">
              Others
            </option>
          </select>
        </div>
        <div className="flex gap-8 items-center">
          <div className="flex gap-2 items-center text-white">
            <FaUserAlt className=" text-[#ffffffc0]" />
            <h1>{name}</h1>
          </div>
          <IoExit
            className="scale-150 text-[#ffffffc0] hover:text-white hover:scale-[1.6]"
            onClick={logoutHandler}
          />
        </div>
      </div>

      <Rest lists={lists}></Rest>
    </div>
  );
}

export default Home
