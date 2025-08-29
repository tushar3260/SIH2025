export default function SignupForm() {
  return (
    <div className="w-full h-full relative bg-white overflow-hidden">
      {/* Left Side Form */}
      <div className="absolute top-[202px] left-[175px] flex flex-col gap-5 pb-16">
        {/* Heading */}
        <h2 className="text-[32px] font-medium font-[Poppins] text-black">
          Get Started Now
        </h2>

        {/* Name Input */}
        <div className="flex flex-col w-[404px]">
          <label className="text-sm font-medium font-[Poppins] text-black">
            Name
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:outline-none"
          />
        </div>

        {/* Email Input */}
        <div className="flex flex-col w-[404px]">
          <label className="text-sm font-medium font-[Poppins] text-black">
            Email address
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:outline-none"
          />
        </div>

        {/* Password Input */}
        <div className="flex flex-col w-[404px]">
          <label className="text-sm font-medium font-[Poppins] text-black">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:outline-none"
          />
        </div>

        {/* Divider */}
        <div className="relative w-[400px] my-3">
          <hr className="border-t-2 border-gray-100" />
          <span className="absolute left-1/2 top-[-10px] -translate-x-1/2 bg-white px-2 text-[9px] font-medium font-[Poppins]">
            Or
          </span>
        </div>

        {/* Terms */}
        <div className="flex items-center gap-2">
          <input type="checkbox" className="w-3 h-3" />
          <p className="text-[9px] font-[Poppins]">
            I agree to the{" "}
            <span className="underline cursor-pointer">terms & policy</span>
          </p>
        </div>

        {/* Already have account */}
        <p className="text-sm font-medium font-[Poppins]">
          Have an account?{" "}
          <span className="text-[#0F3DDE] cursor-pointer">Sign In</span>
        </p>

        {/* Signup Button */}
        <button className="w-[404px] h-10 bg-[#3A5B22] text-white font-bold text-sm font-[Poppins] rounded-lg hover:opacity-90">
          Signup
        </button>

        {/* Google Sign In */}
        <button className="flex items-center gap-2 px-5 py-2 border border-gray-300 rounded-lg w-fit hover:bg-gray-100">
          <div className="w-5 h-5 bg-yellow-400"></div>
          <span className="text-xs font-medium font-[Poppins]">
            Sign in with Google
          </span>
        </button>

        {/* Apple Sign In */}
        <button className="flex items-center gap-2 px-5 py-2 border border-gray-300 rounded-lg w-[190px] justify-center hover:bg-gray-100">
          <div className="w-5 h-5 bg-black"></div>
          <span className="text-xs font-medium font-[Poppins]">
            Sign in with Apple
          </span>
        </button>
      </div>

      {/* Right Image */}
      <img
        src="https://placehold.co/781x1042"
        alt="Signup Visual"
        className="absolute top-0 left-[754px] w-[781.5px] h-[1042px] rounded-tl-[45px] rounded-bl-[45px]"
      />
    </div>
  );
}
