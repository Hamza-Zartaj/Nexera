import React from "react";
import { CalendarDays, MoreVertical } from "lucide-react";

const appointments = [
  {
    name: "Dr. Ayesha Khan",
    date: "06/02/2025",
    time: "11:00 AM",
    duration: "45 min",
    fee: "Free",
    type: "Career Counseling",
    typeColor: "bg-violet-600",
    status: "Confirmed",
    statusColor: "bg-green-600",
  },
  {
    name: "Mr. Bilal Ahmed",
    date: "06/05/2025",
    time: "2:00 PM",
    duration: "60 min",
    fee: "Rs. 1,500",
    type: "Mock Interview",
    typeColor: "bg-blue-700",
    status: "Pending",
    statusColor: "bg-yellow-600",
  },
  {
    name: "Ms. Sara Noor",
    date: "06/10/2025",
    time: "4:30 PM",
    duration: "30 min",
    fee: "Rs. 800",
    type: "Resume Review",
    typeColor: "bg-indigo-600",
    status: "Confirmed",
    statusColor: "bg-green-600",
  },
];

const Appointment = () => {
  return (
    <div className="p-6 text-white">
      <h2 className="text-5xl font-semibold">Your Appointments</h2>
      <p className="text-gray-400 mt-2 max-w-xl">
        View and manage your booked sessions
      </p>

      <div className=" rounded my-8 flex justify-between items-center gap-4">
        <input
          type="text"
          placeholder="Search appointments..."
          className="bg-darkPurple p-2 rounded w-full outline-none focus:bg-primaryPurple-950 transition-all duration-150"
        />
        <select className="bg-primaryPurple-950 p-2 rounded text-white outline-none appearance-none">
          <option>All Status</option>
          <option>Confirmed</option>
          <option>Pending</option>
        </select>
      </div>

      <div className="space-y-4">
        {appointments.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-black p-4 rounded border-l-4 border-primaryPurple-400"
          >
            <div className="flex items-center gap-4">
              <div className="bg-primaryPurple-400 p-3 rounded-full">
                <CalendarDays size={20} />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <div className="text-sm text-gray-400">
                  {item.date} • {item.time} • {item.duration}
                </div>
                <div className="text-sm text-gray-400">Fee: {item.fee}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`text-xs px-2 py-1 rounded ${item.typeColor} text-white`}
              >
                {item.type}
              </span>
              <span
                className={`text-xs px-2 py-1 rounded ${item.statusColor} text-white`}
              >
                {item.status}
              </span>
              <MoreVertical size={20} className="text-gray-400" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appointment;
