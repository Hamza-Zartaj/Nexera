import { apiUrl } from "../../config/api";
import React, { useContext, useEffect, useState } from "react";
import {
  CheckCircle,
  Loader2,
  Lock,
  ArrowRightCircle,
  CircleCheckBig,
} from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const styles = {
  completed: {
    wrapper: "border-green-500 text-green-300",
    icon: <CheckCircle size={20} className="text-green-400" />,
  },
  "in-progress": {
    wrapper: "border-yellow-500 text-yellow-300",
    icon: <Loader2 size={20} className="animate-spin text-yellow-400" />,
  },
  upcoming: {
    wrapper: "border-blue-500 text-blue-300",
    icon: <ArrowRightCircle size={20} className="text-blue-400" />,
  },
  incomplete: {
    wrapper: "border-gray-500 text-gray-400",
    icon: <Lock size={20} className="text-gray-400" />,
  },
};

const Roadmap = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [roadmap, setRoadmap] = useState(null);
  const [error, setError] = useState(null);
  const [tempRoadMap, setTempRoadmap] = useState(null);
  const [overallProgress, setOverallProgress] = useState(0);

  const generateRoadMap = async () => {
    setLoading(true);
    if (!user.career) {
      navigate("/user/quiz");
      setError("Please complete the career quiz first.");
      setLoading(false);
      return;
    }
    setError(null);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        apiUrl("/api/ai/roadmap/generate"),
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTempRoadmap(res.data.roadmap);
    } catch {
      setError("Something went wrong :(");
    } finally {
      setLoading(false);
    }
  };

  const saveRoadMap = async () => {
    if (!tempRoadMap) {
      setError("No roadmap to save");
      return;
    }

    try {
      setError(null);
      setLoading(true);

      const token = localStorage.getItem("token");
      await axios.post(
        apiUrl("/api/profile/roadmap"),
        { roadmapId: tempRoadMap },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTempRoadmap(null);

      fetchRoadmap();
    } catch {
      setError("Failed to save roadmap. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleTaskComplete = async (taskId, stageId) => {
    if (!roadmap || !roadmap.stages) return;

    const stage = roadmap.stages.find((s) => s._id === stageId);
    if (!stage) return;

    const task = stage.tasks.find((t) => t._id === taskId);
    if (!task || task.isCompleted) return;

    try {
      setLoading(true);
      task.isCompleted = true;

      // Check if all tasks are completed
      const allTasksCompleted = stage.tasks.every((t) => t.isCompleted);
      if (allTasksCompleted) {
        stage.status = "completed";
      }

      const token = localStorage.getItem("token");

      await axios.patch(
        apiUrl(`/api/profile/roadmap/${roadmap._id}`),
        {
          stageId,
          taskId,
          isCompleted: true,
          stageStatus: allTasksCompleted ? "completed" : "in-progress",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Update local state and re-fetch
      setRoadmap({ ...roadmap });
      fetchRoadmap();
    } catch (error) {
      console.error("Error completing task:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateOverallProgress = () => {
    if (!roadmap || !roadmap.stages) return setOverallProgress(0);

    let totalTasks = 0;
    let completedTasks = 0;

    roadmap.stages.forEach((stage) => {
      if (stage.tasks && Array.isArray(stage.tasks)) {
        totalTasks += stage.tasks.length;
        completedTasks += stage.tasks.filter((task) => task.isCompleted).length;
      }
    });

    const progress =
      totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    setOverallProgress(progress);
  };

  const fetchRoadmap = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(apiUrl("/api/profile/roadmap"), {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRoadmap(res.data.roadmap);
      setError(null);
    } catch {
      console.error("Failed to fetch roadmap");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) return;

    fetchRoadmap();
  }, [user]);

  useEffect(() => {
    if (roadmap) {
      calculateOverallProgress();
    }
  }, [roadmap]);

  return (
    <div className="w-full p-6 bg-black text-white">
      <div className="flex justify-between">
        <h1
          className={`text-5xl font-semibold ${
            roadmap ? "text-purple-400" : "text-white"
          }`}
        >
          {roadmap ? roadmap.career_title : "Career Roadmap"}
        </h1>
        {(roadmap || tempRoadMap) && (
          <div className="flex flex-col">
            <button
              onClick={generateRoadMap}
              disabled={loading}
              className="w-fit text-xs disabled:bg-primaryPurple-950 disabled:text-gray-400 bg-primaryPurple-600 text-white font-semibold uppercase py-2 px-8 cursor-pointer hover:bg-primaryPurple-700 active:bg-primaryPurple-600/75 transition-all duration-150"
            >
              Generate New Roadmap
            </button>
            {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
          </div>
        )}
      </div>

      <p className="text-gray-400 mt-2 max-w-3xl">
        Visualize your journey and stay on track toward your career goals.
      </p>

      {loading ? (
        <div className="flex items-center justify-center top-0 left-0 bottom-0 right-0 absolute">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600"></div>
        </div>
      ) : roadmap && !tempRoadMap ? (
        <>
          <div className="mt-6 max-w-5xl">
            <h2 className="text-lg font-semibold text-white mb-2">
              Overall Progress
            </h2>
            <div className="bg-gray-800 h-4 rounded-full">
              <div
                className="h-4 bg-purple-500 rounded-full"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
            <p className="text-sm text-purple-300 mt-1">
              {overallProgress}% Complete
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 max-w-5xl">
            {roadmap.stages.map((stage, i) => (
              <div
                key={i}
                className={`p-4 rounded-xl border shadow-md flex flex-col transition hover:-translate-y-1 ${
                  styles[stage.status]?.wrapper
                }`}
              >
                <div className="flex flex-col gap-2 mb-2">
                  <div>{styles[stage.status]?.icon}</div>
                  <h3 className="text-lg font-bold">{stage.title}</h3>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Tasks by Stage
            </h2>
            {roadmap.stages.map((stage, index) => (
              <div
                key={index}
                className={`mb-6 ${
                  stage.status === "upcoming" ? "brightness-50" : ""
                }`}
              >
                <h3 className="text-xl font-semibold text-purple-400 mb-2">
                  {stage.title}
                </h3>
                <p className="text-sm text-gray-400 mb-2">
                  {stage.description}
                </p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  {stage.tasks.map((task, taskIndex) => (
                    <div
                      key={taskIndex}
                      className={`p-3 border-l-4  ${
                        task.isCompleted
                          ? "bg-green-900/50 border-l-green-400"
                          : "bg-lighterBlack border-l-primaryPurple-700"
                      }`}
                    >
                      <div className="flex gap-2 justify-between">
                        <div>
                          <p className="font-semibold">{task.title}</p>
                          <p className="text-sm text-gray-400">{task.text}</p>
                        </div>

                        {task.isCompleted ? (
                          <div>
                            <CheckCircle size={20} className="text-green-400" />
                          </div>
                        ) : (
                          <button
                            onClick={() =>
                              handleTaskComplete(task._id, stage._id)
                            }
                            disabled={
                              loading ||
                              task.isCompleted ||
                              stage.status === "upcoming"
                            }
                            className="disabled:bg-primaryPurple-950 disabled:text-gray-400 w-fit bg-primaryPurple-600 text-white font-semibold uppercase py-2 px-8 h-full text-xs cursor-pointer hover:bg-primaryPurple-700 active:bg-primaryPurple-600/75 transition-all duration-150"
                          >
                            Complete
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : tempRoadMap ? (
        <div className="fixed inset-0 w-full h-full bg-black/50 flex items-center justify-center">
          <div className="max-w-[600px] w-full bg-gray-900 p-8 rounded-lg">
            <h2 className="text-3xl font-semibold">Generated Roadmap</h2>
            <h4 className="text-lg font-bold text-purple-400 uppercase mt-4">
              {tempRoadMap.career}
            </h4>

            <div className="flex flex-col gap-4 mt-4">
              {tempRoadMap.stages.map((stage, index) => (
                <div
                  key={index}
                  className="bg-gray-800 p-4 rounded flex gap-4 items-center"
                >
                  <CircleCheckBig className="text-purple-400" />
                  <div>
                    <h6 className="font-semibold text-purple-300">
                      {stage.title}
                    </h6>
                    <p className="text-sm text-gray-400">{stage.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setTempRoadmap(null)}
                className="border border-purple-600 text-purple-600 px-6 py-2 rounded hover:bg-purple-700 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={saveRoadMap}
                className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <p className="text-center mb-4 text-sm text-gray-300">
            No roadmap selected. Click below to generate your roadmap.
          </p>
          <button
            onClick={generateRoadMap}
            disabled={loading}
            className="disabled:bg-primaryPurple-950 disabled:text-gray-400 w-fit text-xs bg-primaryPurple-600 text-white font-semibold uppercase py-2 px-8 cursor-pointer hover:bg-primaryPurple-700 active:bg-primaryPurple-600/75 transition-all duration-150"
          >
            Generate Roadmap
          </button>
          {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
        </div>
      )}
    </div>
  );
};

export default Roadmap;
