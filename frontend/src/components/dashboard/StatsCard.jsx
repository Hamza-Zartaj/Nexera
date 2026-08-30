import { Pen } from "lucide-react";
import React from "react";

const StatsCard = ({ title, icon, value, text }) => {
  return (
    <div className="bg-lightBlack p-6 hover:bg-darkPurple/75 hover:scale-[1.02] cursor-pointer transition-all duration-150 flex flex-col">
      <div className="w-full flex justify-between items-center gap-4">
        <span className=" font-semibold">{title}</span>
        <div>{icon ? icon : <Pen size={16} />}</div>
      </div>
      {text && <p className="text-xs text-gray-400">{text}</p>}
      <div className="mt-auto">
        <h3 className="text-primaryPurple-400 text-3xl font-bold">{value}</h3>
      </div>
    </div>
  );
};

export default StatsCard;
