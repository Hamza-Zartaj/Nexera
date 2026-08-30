import React, { useContext, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "@/userDashboard/home/Home";
import Appointment from "@/userDashboard/appointment/Appointment";
import Resources from "@/userDashboard/resources/Resources";
import Roadmap from "@/userDashboard/roadmap/Roadmap";
import Task from "@/userDashboard/task/Task";
import Setting from "@/userDashboard/setting/Setting";
import Topbar from "@/components/dashboard/Topbar";
import Sidebar from "@/components/dashboard/Sidebar";
import { AuthContext } from "../context/AuthContext";
import Quiz from "../userDashboard/quiz/Quiz";

const UserDashboardLayout = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !loading) {
      navigate("/");
    }
  }, [user, loading]);
  return (
    <div className="w-full h-screen overflow-hidden bg-purple-950 text-white">
      <div className="flex flex-col w-full h-full">
        <Topbar />

        <div className="flex gap-4 h-full p-4">
          <Sidebar />
          <div
            className="bg-black w-full p-4 overflow-y-auto relative"
            style={{ height: "calc(100vh - 106px)" }}
          >
            <Routes>
              <Route path="home" element={<Home />} />
              <Route path="appointment" element={<Appointment />} />{" "}
              <Route path="resources" element={<Resources />} />
              <Route path="roadmap" element={<Roadmap />} />
              <Route path="task" element={<Task />} />
              <Route path="quiz" element={<Quiz />} />
              <Route path="setting" element={<Setting />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardLayout;
