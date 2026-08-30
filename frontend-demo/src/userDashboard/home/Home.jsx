import { apiUrl } from "../../config/api";
import React, { useContext, useEffect, useState } from "react";
import StatsCard from "../../components/dashboard/StatsCard";
import {
  ListCheck,
  SquareChartGantt,
  SquareUser,
  BookOpen,
  LetterText,
} from "lucide-react";
import RoadmapProgress from "../../components/dashboard/RoadmapProgress";
import { AuthContext } from "../../context/AuthContext";
import TaskCard from "../../components/dashboard/TaskCard";
import IconButton from "../../components/dashboard/IconButton";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const { user } = useContext(AuthContext);

  const quickLinks = [
    {
      title: "Career Assessment",
      text: "Take the assessment quiz.",
      link: "/user/quiz",
      icon: <BookOpen size={24} />,
    },
    {
      title: "View Resources",
      text: "Explore resources to help you in your career journey.",
      link: "/user/resources",
      icon: <LetterText size={24} />,
    },
    {
      title: "Roadmap",
      text: "Track your career roadmap and progress.",
      link: "/user/roadmap",
      icon: <SquareChartGantt size={24} />,
    },
  ];

  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [inProgressStage, setInProgressStage] = useState(null);

  const fetchRoadmap = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(apiUrl("/api/profile/roadmap"), {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRoadmap(res.data.roadmap);
    } catch (error) {
      console.error("Failed to fetch roadmap", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoadmap();
  }, []);

  const calculateTaskCompleteInLastNDays = (days) => {
    if (!roadmap || !Array.isArray(roadmap.stages)) return 0;
    const today = new Date();
    const pastDate = new Date(today);
    pastDate.setDate(today.getDate() - days);

    let count = 0;
    roadmap.stages.forEach((stage) => {
      if (Array.isArray(stage.tasks)) {
        stage.tasks.forEach((task) => {
          if (task.completedAt) {
            const completedAt = new Date(task.completedAt);
            if (completedAt >= pastDate && completedAt <= today) {
              count += 1;
            }
          }
        });
      }
    });
    return count;
  };

  const getStagesCompleted = () => {
    if (!roadmap || !Array.isArray(roadmap.stages)) return 0;
    let val = roadmap.stages.filter(
      (stage) => stage.status === "completed"
    ).length;
    return val;
  };

  const getInProgressStage = () => {
    console.log("Fetching in-progress stage...");
    if (!roadmap || !Array.isArray(roadmap.stages)) return null;
    console.log(
      roadmap.stages.find((stage) => stage.status === "in-progress") || null
    );
    setInProgressStage(
      roadmap.stages.find((stage) => stage.status === "in-progress") || null
    );
    return;
  };

  useEffect(() => {
    getInProgressStage();
  }, [roadmap]);

  return user ? (
    <div className="p-6">
      <h1 className="text-5xl font-semibold">
        Welcome to your dashboard, {user ? user.username : " "}
      </h1>
      <p className="text-gray-400 mt-2 max-w-xl">
        This is your space to shape the next era of your career with clarity,
        confidence, and smart guidance. Track your career growth, complete
        tasks, and manage your appointments to reach your goals faster.
      </p>

      {user.career ? (
        <div>
          <div className="grid grid-cols-3 mt-8 gap-4">
            <StatsCard
              title={"Current Career Path"}
              icon={<SquareChartGantt size={16} />}
              value={user.career || "---"}
            />
            <StatsCard
              title={"Completed Tasks"}
              icon={<ListCheck size={16} />}
              value={calculateTaskCompleteInLastNDays(7) || 0}
            />
            <StatsCard
              title={"Stages Completed"}
              icon={<SquareUser size={16} />}
              value={getStagesCompleted() || 0}
            />
          </div>

          <div className="mt-8">
            <RoadmapProgress roadmap={roadmap} loading={loading} />
          </div>

          <div className="flex gap-4 mt-8">
            <div className="w-[70%]">
              <h2 className="text-3xl font-semibold mb-2">
                Your Tasks Summary:{" "}
              </h2>
              <p className="text-sm text-gray-400 mb-8 max-w-xl">
                Here are your tasks to help you progress in your career journey.
                Complete them to stay on track and achieve your goals.
              </p>
              <div className="w-full grid grid-cols-2 gap-4">
                {inProgressStage &&
                  inProgressStage.tasks.map((task, index) => (
                    <TaskCard
                      key={index}
                      title={task.title}
                      text={task.text}
                      isCompleted={task.isCompleted}
                    />
                  ))}
              </div>
            </div>

            <div className="h-full w-[30%] flex flex-col gap-4">
              <div className="bg-lightBlack p-4">
                <h2 className="text-2xl font-semibold">Quick Links</h2>
                <p className="text-sm text-gray-400 mb-4">
                  Access important features and resources quickly.
                </p>
                <div className="grid grid-cols-2 gap-4 justify-items-center p-4">
                  {quickLinks.map((link, index) => (
                    <IconButton
                      key={index}
                      title={link.title}
                      text={link.text}
                      link={link.link}
                      icon={link.icon}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="absolute left-0 right-0 top-0 bottom-0 flex items-center justify-center flex-col gap-4">
          <p className="text-sm text-gray-400">
            You haven't selected a career path yet. Please complete the career
            assesment to get started.
          </p>

          <Link to="/user/quiz">
            <button className="text-xs w-fit bg-primaryPurple-600 text-white font-semibold uppercase py-2 px-8 cursor-pointer hover:bg-primaryPurple-700 active:bg-primaryPurple-600/75 transition-all duration-150">
              Go To Career Assessment
            </button>
          </Link>
        </div>
      )}
    </div>
  ) : (
    <div className="flex items-center justify-center top-0 left-0 bottom-0 right-0 absolute">
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600"></div>
    </div>
  );
};

export default Home;
