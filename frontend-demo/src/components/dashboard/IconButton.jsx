import { BookOpen } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const IconButton = ({ title, text, icon, link = "/" }) => {
  return (
    <Link
      to={link}
      className="flex flex-col items-center justify-start gap-2 p-2 group"
    >
      <div className="bg-purple-800 rounded-full h-16 w-16 flex items-center justify-center group-hover:scale-105 transition-all duration-200">
        {icon}
      </div>
      <div>
        <h5 className="text-center text-xs font-semibold group-hover:text-primaryPurple-400 group-hover:underline transition-all duration-200">
          {title}
        </h5>
        <p className="text-xs text-gray-400 text-center">{text}</p>
      </div>
    </Link>
  );
};

export default IconButton;
