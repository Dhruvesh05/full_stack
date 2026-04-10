import React from 'react'
import { PhoneCall } from "lucide-react";
const CallButton = () => {
  return (
    <a
      href="tel:+919601940724"
      aria-label="Call us"
      title="Call us"
      className="fixed md:bottom-10 bottom-4 md:left-10 left-4 z-50 rounded-full bg-green-600 p-3 hover:scale-[1.006] active:scale-[0.998] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-green-700"
    >
      <PhoneCall className="w-5 h-5 text-white stroke-3" />
    </a>
  );
}

export default CallButton