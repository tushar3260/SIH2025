import React from "react";

const Login = () => {
  return (
    <div className="w-full h-screen flex bg-white overflow-hidden relative">
      {/* Left Form Section */}
      <div className="absolute left-44 top-52 flex flex-col gap-6">
        <h2 className="text-3xl font-semibold font-poppins">Get Started Now</h2>

        {/* Name Input */}
        <div className="flex flex-col gap-2 w-[404px]">
          <label className="text-sm font-medium">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full px-3 py-2 border rounded-lg text-xs text-gray-400"
          />
        </div>

        {/* Email Input */}
        <div className="flex flex-col gap-2 w-[404px]">
          <label className="text-sm font-medium">Email address</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-3 py-2 border rounded-lg text-xs text-gray-400"
          />
        </div>

        {/* Password Input */}
        <div className="flex flex-col gap-2 w-[404px]">
          <label className="text-sm font-medium">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full px-3 py-2 border rounded-lg text-xs text-gray-400"
          />
        </div>

        {/* Divider */}
        <div className="w-[400px] flex items-center my-4">
          <div className="flex-1 border-t border-gray-200"></div>
          <span className="px-2 text-xs bg-white">Or</span>
          <div className="flex-1 border-t border-gray-200"></div>
        </div>

        {/* Terms Checkbox */}
        <div className="flex items-center gap-2 text-xs">
          <input type="checkbox" className="w-3 h-3 border rounded" />
          <span>
            I agree to the{" "}
            <span className="underline cursor-pointer">terms & policy</span>
          </span>
        </div>

        {/* Already have account */}
        <p className="text-sm">
          Have an account?{" "}
          <span className="text-blue-600 cursor-pointer">Sign In</span>
        </p>

        {/* Signup Button */}
        <button className="w-[404px] py-2 bg-green-800 text-white font-semibold rounded-lg">
          Signup
        </button>

        {/* Google Button */}
        <button className="flex items-center gap-2 px-5 py-2 border rounded-lg">
          <div className="w-5 h-5 bg-yellow-400 rounded-full"></div>
          <span className="text-sm">Sign in with Google</span>
        </button>

        {/* Apple Button */}
        <button className="flex items-center gap-2 px-5 py-2 border rounded-lg w-[190px] justify-center">
          <div className="w-5 h-5 bg-black rounded"></div>
          <span className="text-sm">Sign in with Apple</span>
        </button>
      </div>

      {/* Right Side Image */}
      <img
        className="absolute right-0 h-full w-[781px] rounded-l-[45px] object-cover"
        src="https://placehold.co/781x1042"
        alt="login illustration"
      />
    </div>
  );
};

export default Login;
