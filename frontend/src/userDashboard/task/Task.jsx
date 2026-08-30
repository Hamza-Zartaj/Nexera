import React from "react";
import { CheckCircle, Clock, ListTodo } from "lucide-react";

const tasks = {
  todo: [
    {
      title: "Complete Career Assessment",
      description: "Understand your strengths and preferences.",
    },
    {
      title: "Schedule First Mentor Session",
      description: "Book a session from your dashboard calendar.",
    },
  ],
  inProgress: [
    {
      title: "Update Resume",
      description: "Use Nexera template and tailor it to your goals.",
    },
  ],
  completed: [
    {
      title: "Create Nexera Profile",
      description: "You've completed your onboarding profile.",
    },
  ],
};

const Tasks = () => {
  return (
    <div className="p-6">
      <h1 className="text-5xl font-semibold">Your Tasks</h1>
      <p className="text-gray-400 mt-2 max-w-xl">
        Stay on top of your career growth by completing these action items.
      </p>

      <div className="grid grid-cols-3 gap-4 mt-8">
        <div className="bg-darkBlack border border-gray-700 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4 text-purple-300">
            <ListTodo size={20} />
            <h2 className="text-lg font-bold">To Do</h2>
          </div>
          {tasks.todo.map((task, idx) => (
            <div key={idx} className="mb-4">
              <h3 className="text-white font-medium">{task.title}</h3>
              <p className="text-sm text-gray-400">{task.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-darkBlack border border-yellow-600/50 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4 text-yellow-300">
            <Clock size={20} />
            <h2 className="text-lg font-bold">In Progress</h2>
          </div>
          {tasks.inProgress.map((task, idx) => (
            <div key={idx} className="mb-4">
              <h3 className="text-white font-medium">{task.title}</h3>
              <p className="text-sm text-gray-400">{task.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-darkBlack border border-green-600/50 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4 text-green-300">
            <CheckCircle size={20} />
            <h2 className="text-lg font-bold">Completed</h2>
          </div>
          {tasks.completed.map((task, idx) => (
            <div key={idx} className="mb-4">
              <h3 className="text-white font-medium line-through">
                {task.title}
              </h3>
              <p className="text-sm text-gray-500 italic">{task.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
