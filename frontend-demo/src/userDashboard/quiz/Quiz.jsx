import { apiUrl } from "../../config/api";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { NotebookPen } from "lucide-react";

const Quiz = () => {
  const { user, login } = useContext(AuthContext);
  const [selectedCareer, setSelectedCareer] = useState(user?.career || "");
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [activeQuestions, setActiveQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const commonCareers = [
    {
      label: "Technology & Engineering",
      options: [
        "Software Developer",
        "IT Consultant",
        "Systems Analyst",
        "Computer Engineer",
        "Data Scientist",
        "AI Engineer",
        "Cybersecurity Analyst",
        "Cloud Architect",
        "Web Developer",
        "Mobile App Developer",
        "UI/UX Designer",
        "DevOps Engineer",
        "Game Developer",
        "Mechanical Engineer",
        "Civil Engineer",
        "Electrical Engineer",
        "Aerospace Engineer",
        "Biomedical Engineer",
        "Chemical Engineer",
        "Environmental Engineer",
        "Robotics Engineer",
        "Structural Engineer",
        "Mining Engineer",
      ],
    },
    {
      label: "Healthcare & Medicine",
      options: [
        "Doctor",
        "Nurse",
        "Dentist",
        "Pharmacist",
        "Medical Researcher",
        "Public Health Specialist",
        "Veterinarian",
        "Biotechnologist",
        "Genetic Counselor",
        "Nutritionist",
      ],
    },
    {
      label: "Business & Finance",
      options: [
        "Product Manager",
        "Business Analyst",
        "Project Manager",
        "Marketing Manager",
        "Financial Analyst",
        "Investment Banker",
        "Human Resources Specialist",
        "Entrepreneur",
        "Sales Executive",
        "Accountant",
      ],
    },
    {
      label: "Design & Creative Arts",
      options: [
        "Graphic Designer",
        "Interior Designer",
        "Fashion Designer",
        "Animator",
        "Illustrator",
        "Architect",
        "Creative Director",
        "3D Modeler",
        "Multimedia Artist",
        "UI Designer",
      ],
    },
    {
      label: "Education & Training",
      options: [
        "Teacher",
        "Professor",
        "Online Course Creator",
        "Language Instructor",
        "Special Education Teacher",
        "Education Consultant",
        "Academic Researcher",
        "School Principal",
        "Instructional Designer",
        "Corporate Trainer",
      ],
    },
    {
      label: "Media & Communication",
      options: [
        "Journalist",
        "Content Creator",
        "Social Media Manager",
        "Video Editor",
        "Photographer",
        "Film Director",
        "Copywriter",
        "Voice-over Artist",
        "News Anchor",
        "Public Relations Manager",
      ],
    },
    {
      label: "Law & Government",
      options: [
        "Lawyer",
        "Judge",
        "Legal Advisor",
        "Police Officer",
        "Diplomat",
        "Public Administrator",
        "Policy Analyst",
        "Military Officer",
        "Customs Officer",
        "Paralegal",
      ],
    },
    {
      label: "Environment & Nature",
      options: [
        "Environmental Scientist",
        "Ecologist",
        "Marine Biologist",
        "Wildlife Conservationist",
        "Forestry Officer",
        "Geologist",
        "Agricultural Scientist",
        "Meteorologist",
        "Sustainability Consultant",
        "Climate Analyst",
      ],
    },
    {
      label: "Skilled Trades & Practical Careers",
      options: [
        "Electrician",
        "Plumber",
        "Carpenter",
        "Mechanic",
        "Chef",
        "Pilot",
        "Flight Attendant",
        "Truck Driver",
        "Hair Stylist",
        "Welder",
      ],
    },
    {
      label: "Psychology & Human Services",
      options: [
        "Psychologist",
        "Therapist",
        "Fitness Trainer",
        "Real Estate Agent",
        "Tour Guide",
        "Event Planner",
        "Interpreter",
        "Customer Support Agent",
        "E-commerce Manager",
        "Blockchain Developer",
      ],
    },
  ];

  const handleOptionClick = (current) => {
    const updatedOptions = [...selectedOptions, current];
    setSelectedOptions(updatedOptions);

    if (currentQuestionIndex === activeQuestions.length - 1) {
      handleAnswerSubmit(updatedOptions);
      return;
    }

    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleAnswerSubmit = async (answers = selectedOptions) => {
    setLoading(true);
    try {
      const res = await axios.post(
        apiUrl("/api/ai/quiz/evaluate"),
        {
          answers,
        }
      );
      const parsedData = JSON.parse(res.data);
      setResult(parsedData);
    } catch (error) {
      console.error("Error sending data to OpenAI:", error);
    } finally {
      setLoading(false);
    }
  };

  const getRandomQuizQuestions = () => {
    const shuffledQuiz = [...quiz].sort(() => Math.random() - 0.5);
    return shuffledQuiz.slice(0, Math.min(10, shuffledQuiz.length));
  };

  const resetQuizState = () => {
    setResult(null);
    setQuizStarted(false);
    setCurrentQuestionIndex(0);
    setSelectedOptions([]);
    setActiveQuestions(getRandomQuizQuestions());
  };

  const handleStartQuiz = () => {
    setResult(null);
    setCurrentQuestionIndex(0);
    setSelectedOptions([]);
    setActiveQuestions(getRandomQuizQuestions());
    setQuizStarted(true);
  };

  useEffect(() => {
    setSelectedCareer(user?.career || "");
    setActiveQuestions(getRandomQuizQuestions());
  }, [user?.career]);

  const handleCareerClick = async (career) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        apiUrl("/api/profile/career"),
        { career },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedUser = response.data?.user || { ...user, career };
      if (token && updatedUser) {
        login(token, updatedUser);
      }
      setSelectedCareer(updatedUser?.career || career);
      console.log("Career assigned successfully:", response.data);
    } catch (error) {
      console.error("Error assigning career:", error);
    } finally {
      setLoading(false);
            resetQuizState();
    }
  };

  const quiz = [
    {
      question: "What type of activities do you enjoy the most?",
      options: [
        "Solving puzzles",
        "Helping others",
        "Building things",
        "Drawing or painting",
      ],
    },
    {
      question: "Which school subject do you enjoy the most?",
      options: ["Math", "Biology", "Woodwork", "Art"],
    },
    {
      question: "What environment would you prefer to work in?",
      options: ["Office", "Hospital", "Workshop", "Studio"],
    },
    {
      question: "How do you prefer to solve a problem?",
      options: ["Logically", "Empathetically", "Practically", "Creatively"],
    },
  ];

  return user ? (
    <div className="p-6 relative h-full">
      {/* Dropdown Top Right */}
      <div className="absolute top-6 right-6 z-50">
        <div className="relative w-72">
          <label
            htmlFor="careerDropdown"
            className="block text-xs text-gray-400 mb-1 ml-1"
          >
            Choose Career
          </label>
          <select
            id="careerDropdown"
            onChange={(e) =>
              e.target.value !== "" && handleCareerClick(e.target.value)
            }
            defaultValue=""
            className="bg-lightBlack text-white text-sm px-4 py-2 pr-10 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-primaryPurple-600 shadow-md transition-all duration-150 hover:border-primaryPurple-500 cursor-pointer appearance-none w-full"
          >
            <option value="" disabled>
              -- Select a Career --
            </option>
            {commonCareers.map((group, idx) => (
              <optgroup key={idx} label={group.label}>
                {group.options.map((career, i) => (
                  <option key={i} value={career}>
                    {career}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
            <svg
              className="h-4 w-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Heading */}
      <h1 className="text-5xl font-semibold">
        {selectedCareer && !quizStarted
          ? "Currently Selected Career Path"
          : "Take the Quiz to Find Your Career Path"}
      </h1>

      {/* Show Current Career */}
      {result && (
        <p className="text-sm text-gray-400 mt-4">
          Click any of the given career option to select it as your current
          career path!
        </p>
      )}

      {selectedCareer && !quizStarted && (
        <div>
          <div className="bg-lighterBlack p-4 mt-4 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-primaryPurple-600">
              {selectedCareer}
            </h1>
            <NotebookPen className="text-primaryPurple-400" />
          </div>
          <p className="mt-4 text-gray-400">
            Reconsidering your options? Retake the quiz or manually select a
            career that interests you!
          </p>
          <div className="flex items-start gap-4 mt-4">
            <div className="">
              <div className="relative w-72">
                <select
                  id="careerDropdown"
                  onChange={(e) =>
                    e.target.value !== "" && handleCareerClick(e.target.value)
                  }
                  defaultValue=""
                  className="bg-lightBlack text-white h-[40px] border-gray-800 border-2 text-sm px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-primaryPurple-600 shadow-md transition-all duration-150 hover:border-primaryPurple-500 cursor-pointer appearance-none w-full"
                >
                  <option value="" disabled>
                    -- Select a Career --
                  </option>
                  {commonCareers.map((group, idx) => (
                    <optgroup key={idx} label={group.label}>
                      {group.options.map((career, i) => (
                        <option key={i} value={career}>
                          {career}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
                <div className="pointer-events-none absolute bottom-3 h-fit right-3 flex items-center">
                  <svg
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <button
              onClick={handleStartQuiz}
              className="w-fit h-[40px] border-2 border-transparent bg-primaryPurple-600 text-sm text-white font-semibold uppercase py-2 px-8 cursor-pointer hover:bg-primaryPurple-700 active:bg-primaryPurple-600/75 transition-all duration-150"
            >
              Begin Quiz
            </button>
          </div>
        </div>
      )}

      {/* Quiz Logic */}
      {quizStarted ? (
        !result ? (
          <div className="bg-lightBlack p-8 w-full mt-4 flex flex-col">
            <h2 className="text-4xl mb-8">
              {currentQuestionIndex + 1}{" "}
              {activeQuestions[currentQuestionIndex]?.question || "Preparing your quiz..."}
            </h2>

            {!loading && !result ? (
              <div className="flex flex-col w-full gap-4">
                {(activeQuestions[currentQuestionIndex]?.options || []).map(
                  (option, index) => (
                    <div
                      className="w-full bg-lighterBlack p-4 text-gray-300 text-lg hover:bg-darkPurple hover:text-white transition-all duration-150 cursor-pointer"
                      key={index}
                      onClick={() => handleOptionClick(option)}
                    >
                      {option}
                    </div>
                  )
                )}
              </div>
            ) : (
              loading && (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primaryPurple-600"></div>
                </div>
              )
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-8 mt-8">
            <div
              className="bg-lightBlack p-8 cursor-pointer hover:bg-darkPurple transition-all duration-150"
              onClick={() => handleCareerClick(result.best_career_option)}
            >
              <h4 className="text-2xl font-bold">Best Career Option</h4>
              <p className="text-xl mt-4 text-primaryPurple-400 font-semibold">
                {result.best_career_option}
              </p>
              <p className="text-sm text-gray-400">{result.description}</p>
            </div>

            <div className="bg-lightBlack p-8">
              <h4 className="text-2xl font-bold">Other Career Options</h4>
              <ul className=" mt-4 text-primaryPurple-400 grid grid-cols-3 gap-4">
                {result.career_options.map((option, index) => (
                  <li
                    key={index}
                    className="text-lg font-semibold bg-lighterBlack hover:bg-darkPurple p-4 cursor-pointer transition-all duration-150"
                    onClick={() => handleCareerClick(option)}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-lightBlack p-8">
              <h4 className="text-2xl font-bold">Reason</h4>
              <p className="text-gray-400 text-sm">{result.reason}</p>
            </div>
          </div>
        )
      ) : (
        !selectedCareer && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-center mb-4 text-sm text-gray-300">
              This quiz will help you discover the best career path for you. It
              takes about 5 minutes to complete.
            </p>
            <button
              onClick={handleStartQuiz}
              className="w-fit bg-primaryPurple-600 text-sm text-white font-semibold uppercase py-2 px-8 cursor-pointer hover:bg-primaryPurple-700 active:bg-primaryPurple-600/75 transition-all duration-150"
            >
              Begin Quiz
            </button>
          </div>
        )
      )}
    </div>
  ) : (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primaryPurple-600"></div>
    </div>
  );
};

export default Quiz;
