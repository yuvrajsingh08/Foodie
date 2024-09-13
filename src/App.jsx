import "./App.css";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import Register from "./pages/register";
import Login from "./pages/login";
import Home from "./pages/home";
import { useSelector } from "react-redux";

function App() {
     const is_log = useSelector((state) => state?.user?.is_logged_in);
     console.log("logging->",is_log);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />}></Route>
          <Route path="register" element={<Register />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
