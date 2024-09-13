import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden lg:flex items-center justify-center bg-[#FC8019] w-1/2 px-8">
        <div className=" space-y-6 text-center text-primary-foreground">
          <h1 className="text-6xl font-extrabold tracking-tight text-white">
            Welcome to Foodie
          </h1>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
