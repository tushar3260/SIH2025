// src/components/Loading.jsx
import React from "react";
import { Leaf } from "lucide-react";

const Loading = ({ 
  message = "Loading...", 
  show = true, 
  fullScreen = true 
}) => {
  // ✅ अगर show false है तो कुछ नहीं दिखाना
  if (!show) return null;

  const LoadingContent = () => (
    <>
      {/* Main Loading Container */}
      <div className="relative">
        {/* Outer spinning ring with gradient */}
        <div className="relative w-20 h-20">
          {/* Outer dashed spinning ring */}
          <div className="absolute inset-0 border-4 border-dashed border-emerald-500 rounded-full animate-spin"></div>
          
          {/* Middle solid ring */}
          <div className="absolute inset-1 border-2 border-solid border-green-200 rounded-full"></div>
          
          {/* Inner gradient circle */}
          <div className="absolute inset-3 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center">
            {/* Ayurveda leaf icon */}
            <Leaf className="w-6 h-6 text-green-600 animate-pulse" />
          </div>
        </div>

        {/* Floating elements around the loader */}
        <div className="absolute -top-2 -right-2 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
        <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-emerald-400 rounded-full animate-ping delay-300"></div>
        <div className="absolute -top-2 -left-2 w-2 h-2 bg-amber-400 rounded-full animate-ping delay-700"></div>
      </div>

      {/* Loading Text */}
      <div className="mt-6 text-center">
        <p className="text-emerald-700 font-semibold animate-pulse text-lg mb-1">
          {message}
        </p>
        <p className="text-green-600 text-sm opacity-70">
          AyurSutra • Ancient Healing, Reinvented
        </p>
      </div>

      {/* Animated dots */}
      <div className="flex space-x-1 mt-3">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce delay-100"></div>
        <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce delay-200"></div>
      </div>
    </>
  );

  // Full screen loading
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-green-50/80 via-white/60 to-emerald-50/80 backdrop-blur-sm z-50 flex flex-col justify-center items-center">
        <LoadingContent />
      </div>
    );
  }

  // Inline loading
  return (
    <div className="flex flex-col justify-center items-center py-12">
      <LoadingContent />
    </div>
  );
};

export default Loading;
