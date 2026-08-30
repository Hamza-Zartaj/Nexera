import { apiUrl } from "../../config/api";
import React, { useContext, useState } from "react";
import axios from "axios";
import { BookOpen, FileText, Globe } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";

const categories = [
  {
    title: "Learning Materials",
    icon: <BookOpen size={20} />,
    description: "Curated guides, tutorials, and reading material.",
    action: "Browse Guides",
  },
  {
    title: "Job Market Insights",
    icon: <Globe size={20} />,
    description: "Trends, in-demand skills, and salaries.",
    action: "View Insights",
  },
  {
    title: "Templates & Docs",
    icon: <FileText size={20} />,
    description: "Resumes, cover letters, LinkedIn templates.",
    action: "Download Docs",
  },
];

const Resources = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subResources, setSubResources] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useContext(AuthContext);

  const fetchSubResources = async (category) => {
    setSelectedCategory(category);
    setLoading(true);
    setSubResources([]);

    try {
      const res = await axios.post(
        apiUrl("/api/ai/resources/sub"),
        { category, career: user?.career || "" }
      );
      setSubResources(res.data.subResources);
    } catch (err) {
      console.error("Error fetching sub-resources:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-4xl font-bold mb-2">Explore Resources</h1>
      <p className="text-gray-400 max-w-xl mb-8">
        Tools and materials to support your career journey — from planning to
        launching.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((item, index) => (
          <div
            key={index}
            className="bg-darkBlack border border-gray-700 p-5 rounded-xl hover:shadow-lg cursor-pointer transition"
            onClick={() => fetchSubResources(item.title)}
          >
            <div className="flex items-center gap-2 text-primaryPurple-400 mb-3">
              {item.icon}
              <h3 className="text-lg font-semibold">{item.title}</h3>
            </div>
            <p className="text-gray-300 text-sm">{item.description}</p>
            <button className="mt-4 text-sm text-primaryPurple-300 hover:underline">
              {item.action}
            </button>
          </div>
        ))}
      </div>

      {selectedCategory && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">
            {selectedCategory} – Sub Resources
          </h2>
          {loading ? (
            <p className="text-gray-400">Loading....</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {subResources.map((res, idx) => (
                <div
                  key={idx}
                  className="bg-zinc-900 border border-gray-800 p-4 rounded-md shadow"
                >
                  <h4 className="text-purple-400 font-semibold mb-1">
                    {res.title}
                  </h4>
                  <p className="text-sm text-gray-300 mb-2">
                    {res.description}
                  </p>

                  {res.topics && (
                    <div className="mb-2">
                      <span className="text-sm text-gray-400 font-semibold">
                        Topics:
                      </span>
                      <ul className="text-sm text-gray-300 list-disc ml-5">
                        {res.topics.map((topic, i) => (
                          <li key={i}>{topic}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {res.tools && (
                    <p className="text-sm text-gray-400 mb-2">
                      <span className="font-semibold">Tools:</span>{" "}
                      {res.tools.join(", ")}
                    </p>
                  )}

                  {res.links && (
                    <div className="mb-2">
                      <span className="text-sm text-gray-400 font-semibold">
                        Links:
                      </span>
                      <ul className="text-sm text-blue-400 list-disc ml-5">
                        {res.links.map((link, i) => (
                          <li key={i}>
                            <a href={link} target="_blank" rel="noreferrer">
                              {link}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {res.goal && (
                    <p className="text-sm text-green-400">
                      <span className="font-semibold">Goal:</span> {res.goal}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Resources;
