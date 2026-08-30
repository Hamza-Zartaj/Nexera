import { BadgeAlert, BookOpen, CircleCheckBig } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const TaskCard = ({ title, text, isCompleted = false }) => {
  return (
    <Link
      to="/user/task"
      className="w-full p-6 bg-lightBlack hover:bg-darkPurple border-l-4 border-l-lightBlack hover:border-l-primaryPurple-400 transition-all duration-200"
    >
      <div className="flex items-center gap-4">
        {!isCompleted && <BookOpen size={24} />}
        {isCompleted && <CircleCheckBig size={24} className="text-green-500" />}

        <h2
          className="text-xl font-semibold"
          style={{
            color: isCompleted ? "#00c951" : "#FFFFFF",
          }}
        >
          {title}
        </h2>
      </div>
      <p className="text-sm text-gray-400 mt-2">{text}</p>
    </Link>
  );
};

export default TaskCard;
