import { Map } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const RoadmapProgress = ({ roadmap, loading }) => {
  return (
    <div className="p-8 bg-lightBlack w-full border-l-4 border-primaryPurple-400 rounded-tr-2xl rounded-br-2xl max-h-52 h-52">
      {roadmap ? (
        <div className="w-full">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-sm font-semibold uppercase text-primaryPurple-400">
                Roadmap
              </h2>
              <p className="text-gray-400">Your current career path progress</p>
            </div>

            <Link to="/user/roadmap">
              <button className="group cursor-pointer bg-primaryPurple-600 p-2 rounded-md text-white font-semibold uppercase max-w-[32px] hover:max-w-52 transition-all duration-500 ease-in-out overflow-hidden flex gap-2 items-center w-fit">
                <div className="w-full">
                  <Map size={16} />
                </div>
                <p className="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500 whitespace-nowrap">
                  view full roadmap
                </p>
              </button>
            </Link>
          </div>

          <div className="flex w-full mt-8">
            {roadmap.stages.map((stage, index) => (
              <div className="flex flex-col gap-2 group w-full">
                <div
                  key={index}
                  className={`group h-2.5 w-full border-r-4 border-r-darkPurple relative ${
                    stage.status === "completed"
                      ? "bg-primaryPurple-600"
                      : "bg-lighterBlack"
                  }`}
                  style={
                    index === 0
                      ? leftCornerStyles
                      : index === roadmap.stages.length - 1
                      ? rightCornerStyles
                      : {}
                  }
                ></div>
                <div className=" ml-0.5 transition-all duration-150 group-hover:scale-105 cursor-pointer max-w-[90%]">
                  <h3 className="text-sm font-semibold text-white">
                    {stage.title}
                  </h3>
                  <p className="text-[10px] text-gray-400 max-h-0 group-hover:max-h-8 overflow-hidden transition-all duration-700 line-clamp-2">
                    {stage.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : loading ? (
        <div className="flex items-center justify-center top-0 left-0 bottom-0 right-0 absolute">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600"></div>
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-gray-400">
              No career path selected. Please select one to display a roadmap
            </p>
            <Link to={"/user/roadmap"}>
              <button className="text-xs w-fit bg-primaryPurple-600 text-white font-semibold uppercase py-2 px-8 cursor-pointer hover:bg-primaryPurple-700 active:bg-primaryPurple-600/75 transition-all duration-150">
                Select Now
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

const leftCornerStyles = {
  borderTopLeftRadius: "9999px",
  borderBottomLeftRadius: "9999px",
};

const rightCornerStyles = {
  borderTopRightRadius: "9999px",
  borderBottomRightRadius: "9999px",
  borderRight: "none",
};

export default RoadmapProgress;
