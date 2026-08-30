import { apiUrl } from "../../config/api";
import React, { useEffect, useState } from "react";
import "./Quiz.css";
import axios from "axios";
const Quiz = [
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
  {
    question: "Which of these do you value the most in a job?",
    options: [
      "Analytical thinking",
      "Helping people",
      "Hands-on work",
      "Self-expression",
    ],
  },
  {
    question: "What role do you usually take in group work?",
    options: ["Planner", "Supporter", "Doer", "Idea generator"],
  },
  {
    question: "Which career sounds most appealing to you?",
    options: ["Data Analyst", "Nurse", "Engineer", "Graphic Designer"],
  },
  {
    question: "How do you feel about routine tasks?",
    options: [
      "I like predictable tasks",
      "I enjoy tasks that help others",
      "I prefer variety",
      "I dislike routine",
    ],
  },
  {
    question: "How would your friends describe you?",
    options: ["Smart", "Caring", "Handy", "Imaginative"],
  },
  {
    question: "What motivates you the most?",
    options: [
      "Solving problems",
      "Making a difference",
      "Creating something",
      "Expressing ideas",
    ],
  },
  {
    question: "Which of these do you prefer?",
    options: [
      "Working with data",
      "Working with people",
      "Working with tools",
      "Working with colors",
    ],
  },
  {
    question: "What type of projects interest you?",
    options: [
      "Research-based",
      "Community service",
      "Mechanical builds",
      "Creative writing",
    ],
  },
  {
    question: "Which tool would you rather use?",
    options: ["Calculator", "Stethoscope", "Hammer", "Paintbrush"],
  },
  {
    question: "How do you prefer to work?",
    options: [
      "Independently",
      "With a team",
      "With machines",
      "With imagination",
    ],
  },
  {
    question: "What would you do in your free time?",
    options: [
      "Solve Sudoku",
      "Volunteer",
      "Fix something",
      "Draw or play music",
    ],
  },
  {
    question: "Which is most important to you?",
    options: ["Logic", "Compassion", "Efficiency", "Creativity"],
  },
  {
    question: "If you had to teach something, what would it be?",
    options: ["Math", "Health", "Technology", "Art"],
  },
  {
    question: "What do you like more?",
    options: [
      "Data and numbers",
      "Helping and healing",
      "Building and repairing",
      "Designing and styling",
    ],
  },
  {
    question: "Which of these sounds like a dream job?",
    options: [
      "Software Developer",
      "Social Worker",
      "Carpenter",
      "Fashion Designer",
    ],
  },
  {
    question: "What do you dislike the most?",
    options: [
      "Unsolved problems",
      "Seeing others in pain",
      "Broken things",
      "Boring visuals",
    ],
  },
  {
    question: "What type of music do you prefer?",
    options: ["Classical", "Pop", "Rock", "Jazz"],
  },
  {
    question: "Which of these would you rather do in your free time?",
    options: ["Play video games", "Read", "Exercise", "Travel"],
  },
  {
    question: "Do you like working with your hands?",
    options: ["Yes", "No", "Sometimes", "It depends"],
  },
  {
    question: "What’s your ideal vacation?",
    options: [
      "Adventure",
      "Relaxing on a beach",
      "City tour",
      "Cultural exploration",
    ],
  },
  {
    question: "What type of movies do you prefer?",
    options: ["Action", "Drama", "Documentary", "Comedy"],
  },
  {
    question: "What motivates you to work?",
    options: ["Challenge", "Money", "Helping others", "Creativity"],
  },
  {
    question: "What kind of games do you enjoy the most?",
    options: ["Strategy", "Role-playing", "Puzzle", "Sports"],
  },
  {
    question: "How do you react to challenges?",
    options: [
      "Embrace them",
      "Analyze them",
      "Avoid them",
      "Try new approaches",
    ],
  },
  {
    question: "What’s your favorite type of problem to solve?",
    options: ["Mathematical", "Creative", "Physical", "Social"],
  },
  {
    question: "Which of these words resonates with you?",
    options: ["Innovation", "Compassion", "Craftsmanship", "Expression"],
  },
  {
    question: "Do you prefer routine or spontaneity?",
    options: ["Routine", "Spontaneity", "A mix of both", "Depends on the task"],
  },
  {
    question: "How do you like to unwind after a stressful day?",
    options: ["Take a walk", "Watch TV", "Exercise", "Talk to friends"],
  },
  {
    question: "How would you describe your decision-making process?",
    options: ["Logical", "Emotional", "Practical", "Creative"],
  },
  {
    question: "Do you prefer working with machines or people?",
    options: ["Machines", "People", "Both", "Neither"],
  },
  {
    question: "What’s your idea of success?",
    options: ["Wealth", "Happiness", "Influence", "Creativity"],
  },
  {
    question: "Which of these hobbies appeals to you the most?",
    options: ["Cooking", "Painting", "Gaming", "Building models"],
  },
  {
    question: "How do you approach new tasks?",
    options: [
      "Plan thoroughly",
      "Dive right in",
      "Ask for help",
      "Do research",
    ],
  },
  {
    question: "What do you value the most in a friend?",
    options: ["Loyalty", "Honesty", "Support", "Humor"],
  },
  {
    question: "What’s your favorite type of learning?",
    options: ["Visual", "Auditory", "Hands-on", "Reading"],
  },
  {
    question: "What kind of leadership style do you prefer?",
    options: ["Authoritative", "Democratic", "Laissez-faire", "Coaching"],
  },
  {
    question: "How do you usually spend your weekends?",
    options: [
      "Working on projects",
      "Spending time with family",
      "Relaxing",
      "Learning something new",
    ],
  },
  {
    question: "What’s your preferred type of career?",
    options: ["Corporate", "Creative", "Technical", "Healthcare"],
  },
  {
    question: "Which of these words describe you best?",
    options: ["Logical", "Empathetic", "Handy", "Creative"],
  },
  {
    question: "Do you like taking risks?",
    options: ["Yes", "No", "Sometimes", "Only calculated risks"],
  },
  {
    question: "What’s your ideal work environment?",
    options: ["Structured", "Flexible", "Collaborative", "Solo"],
  },
  {
    question: "How do you deal with pressure?",
    options: ["Stay calm", "Plan ahead", "Get motivated", "Delegate"],
  },
  {
    question: "What kind of challenges do you enjoy?",
    options: ["Mental", "Physical", "Team-oriented", "Independent"],
  },
  {
    question: "How important is it for you to make a difference in the world?",
    options: [
      "Very important",
      "Somewhat important",
      "Not important",
      "I’m not sure",
    ],
  },
  {
    question: "What’s your favorite way to express yourself?",
    options: ["Writing", "Talking", "Art", "Music"],
  },
  {
    question: "How do you approach personal growth?",
    options: [
      "Through self-reflection",
      "By learning from others",
      "By setting goals",
      "Through experiences",
    ],
  },
  {
    question: "What’s your favorite type of book?",
    options: ["Science Fiction", "Biography", "Mystery", "Self-help"],
  },
  {
    question: "What’s your ideal job?",
    options: ["Creative", "Technical", "Management", "Service-oriented"],
  },
  {
    question: "What motivates you to get out of bed in the morning?",
    options: [
      "Achieving goals",
      "Making a difference",
      "Exploring new things",
      "Helping others",
    ],
  },
  {
    question: "How do you feel about learning new skills?",
    options: ["Excited", "Curious", "Indifferent", "Overwhelmed"],
  },
  {
    question: "What’s your favorite type of outdoor activity?",
    options: ["Hiking", "Biking", "Camping", "Beach activities"],
  },
  {
    question: "Which type of cuisine do you prefer?",
    options: ["Italian", "Indian", "Chinese", "Mexican"],
  },
  {
    question: "What do you prefer in a working relationship?",
    options: [
      "Mutual respect",
      "Collaboration",
      "Independence",
      "Clear direction",
    ],
  },
  {
    question: "How do you feel about multitasking?",
    options: [
      "I enjoy it",
      "I prefer focusing on one task",
      "It depends on the situation",
      "I avoid it",
    ],
  },
  {
    question:
      "What would you do if you were faced with an unexpected situation at work?",
    options: [
      "Stay calm and analyze",
      "Ask for help",
      "Take charge",
      "Look for creative solutions",
    ],
  },
  {
    question: "How do you usually solve personal problems?",
    options: [
      "By thinking logically",
      "By discussing with others",
      "By taking action",
      "By waiting for the situation to pass",
    ],
  },

  // ✨ NEW 30 QUESTIONS START HERE
  {
    question: "Which of these apps do you use the most?",
    options: ["Calculator", "Messenger", "Camera", "Sketchbook"],
  },
  {
    question: "How would you decorate your room?",
    options: ["Minimalist", "Cozy", "Functional", "Artistic"],
  },
  {
    question: "Which superhero power would you choose?",
    options: ["Super intelligence", "Healing", "Strength", "Shape-shifting"],
  },
  {
    question: "Which animal do you relate to the most?",
    options: ["Owl", "Dog", "Beaver", "Butterfly"],
  },
  {
    question: "What’s your favorite part of a movie?",
    options: ["Plot twists", "Emotions", "Action scenes", "Cinematography"],
  },
  {
    question: "What’s your go-to online content?",
    options: ["Tech tutorials", "Vlogs", "DIY videos", "Art channels"],
  },
  {
    question: "What’s your approach to deadlines?",
    options: [
      "Plan early",
      "Last-minute rush",
      "Balance work",
      "Do it creatively",
    ],
  },
  {
    question: "What’s your ideal pet?",
    options: ["Cat", "Dog", "Bird", "Fish"],
  },
  {
    question: "Which of these best describes your dream house?",
    options: ["Smart home", "Cottage", "Workshop space", "Colorful studio"],
  },
  {
    question: "What do you do when you're stuck on a task?",
    options: ["Research", "Talk to someone", "Try physically", "Sketch ideas"],
  },
  {
    question: "Which item would you pick in a store?",
    options: ["Notebook", "First-aid kit", "Toolbox", "Watercolor set"],
  },
  {
    question: "What drives your creativity?",
    options: ["Logic", "Emotions", "Materials", "Inspiration"],
  },
  {
    question: "Which role would you choose in an event?",
    options: ["Coordinator", "Volunteer", "Setup crew", "Designer"],
  },
  {
    question: "What type of social media content do you enjoy?",
    options: ["Facts & stats", "Life stories", "How-to clips", "Art reels"],
  },
  {
    question: "How do you feel about teamwork?",
    options: [
      "Great for planning",
      "Helpful for support",
      "Efficient for building",
      "Fun for creating",
    ],
  },
  {
    question: "What would you rather attend?",
    options: ["Math camp", "Health seminar", "Robotics fair", "Art festival"],
  },
  {
    question: "Which environment inspires you the most?",
    options: ["Library", "Clinic", "Garage", "Art gallery"],
  },
  {
    question: "Which of these do you enjoy teaching others?",
    options: ["Formulas", "Healthy habits", "Fixing things", "Drawing skills"],
  },
  {
    question: "Which season do you prefer?",
    options: ["Winter", "Spring", "Autumn", "Summer"],
  },
  {
    question: "Which quote speaks to you most?",
    options: [
      "‘Knowledge is power’",
      "‘Kindness matters’",
      "‘Build your future’",
      "‘Create your world’",
    ],
  },
  {
    question: "What excites you in a challenge?",
    options: ["The logic", "The cause", "The fix", "The idea"],
  },
  {
    question: "Which of these hobbies would you try?",
    options: ["Coding", "First aid", "Wood carving", "Graffiti art"],
  },
  {
    question: "What’s your favorite online platform?",
    options: ["Reddit", "Facebook", "YouTube", "Pinterest"],
  },
  {
    question: "How do you like your workspace?",
    options: ["Organized", "Comfortable", "Tool-filled", "Colorful"],
  },
  {
    question: "Which group would you join?",
    options: ["Math club", "Wellness group", "Makers club", "Creative writers"],
  },
  {
    question: "What drives your decision-making?",
    options: ["Facts", "Feelings", "Function", "Vision"],
  },
  {
    question: "What’s your dream weekend project?",
    options: [
      "Solve logic puzzles",
      "Help a charity",
      "Build a shelf",
      "Paint a mural",
    ],
  },
  {
    question: "Which is your favorite planet?",
    options: ["Mercury", "Earth", "Mars", "Neptune"],
  },
  {
    question: "How would you improve your city?",
    options: [
      "Better data systems",
      "More health centers",
      "Repair roads",
      "Public art spaces",
    ],
  },
  {
    question: "What makes you feel proud?",
    options: [
      "Smart solution",
      "Kind act",
      "Successful repair",
      "Creative piece",
    ],
  },
];

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};
const QuizApp = () => {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [result, setResult] = useState({});
  const selectRandomQuestions = (numQuestions = 20) => {
    const shuffled = shuffleArray(Quiz);
    setSelectedQuestions(shuffled.slice(0, numQuestions));
  };

  const handleStart = () => {
    setStarted(true);
    setCurrent(0);
    setAnswers([]);
    setSubmitted(false);
    selectRandomQuestions();
  };

  const sendToOpenAI = async () => {
    try {
      const res = await axios.post(
        apiUrl("/api/ai/quiz/evaluate"),
        {
          answers: answers,
        }
      );
      const parsedData = JSON.parse(res.data);
      setResult(parsedData);
    } catch (error) {
      console.error("Error sending data to OpenAI:", error);
    }
  };

  const handleAnswer = (option) => {
    setAnswers([...answers, option]);
    if (current === selectedQuestions.length - 1) {
      setSubmitted(true);
    } else {
      setCurrent(current + 1);
    }
  };

  useEffect(() => {
    if (submitted) {
      console.log("Answers submitted:", result);
      sendToOpenAI();
    }
  }, [submitted]);
  return (
    <div className="quiz-app">
      {!started && (
        <section className="hero-section">
          <h1>Find Your Path</h1>
          <p>Take our fun, simple quiz and discover your ideal career!</p>
        </section>
      )}

      {!started ? (
        <section className="intro-screen">
          <h1>Discover Your Dream Career</h1>
          <p>
            Not sure what your future holds? This quiz will guide you to a
            career that aligns with your passions, strengths, and personality.
          </p>
          <p className="tagline">
            Uncover your path. Unlock your potential. Start your journey today.
          </p>
          <button className="start-btn" onClick={handleStart}>
            Start Quiz
          </button>
        </section>
      ) : (
        <div className="quiz-container">
          <h1>Career Quiz</h1>
          {!submitted ? (
            <div className="question-card">
              <p>{Quiz[current].question}</p>
              <div className="options">
                {Quiz[current].options.map((opt, i) => (
                  <button
                    key={i}
                    className="option-btn"
                    onClick={() =>
                      handleAnswer({
                        question: Quiz[current].question,
                        answer: opt,
                      })
                    }
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="thank-you">
              <h2>Thanks for completing the quiz!</h2>
              <p>Here are your results:</p>
              <div className="result-card">
                <h3>Best Career Option: {result.best_career_option}</h3>
                <p>{result.description}</p>
                <p>Reason: {result.reason}</p>
              </div>
              <div className="result-other">
                <h4>Other Career Options:</h4>
                <ul>
                  {result.career_options &&
                    result.career_options.map((option, index) => (
                      <li key={index}>{option}</li>
                    ))}
                </ul>
                <p>Reason: {result.reason}</p>
              </div>

              <button className="restart-btn" onClick={handleStart}>
                Restart Quiz
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizApp;
