import axios from "axios";
import dotenv from "dotenv";
import Roadmap from "../models/Roadmap.js";
import Evaluation from "../models/Evaluation.js";
import { parsePdfText } from "../utils/pdfUtil.js";
dotenv.config();

export const getAIResponse = async (req, res) => {
  const { answers } = req.body;

  const input = `
    You are an assistant that helps in career counselling. Below is a quiz took by a user for career counselling. You must read it carefully and evaluate it, and give me a response strictly in the following json format:
    {
      "best_career_option": "best_career_option",
      "career_options": ["career_option_1", "career_option_2", "career_option_3"],
      "reason": "reason",
      "description": "description"
    }
    Rules:
    - in this format. Do not add any extra text or explanation.
    - The best_career_option should be the most suitable career option based on the quiz answers.
    - The career_options should be a list of other suitable career options based on the quiz answers.
    - reason should be a short explanation of why the best_career_option is suitable.
    - description should be a description of the best_career_option. It should be 4 lines at minimum and 9 lines at maximum.
    - The career options should be based on the quiz answers.
    The quiz answers are:
    ${answers.map((ans) => `${ans.question} - ${ans.answer}`).join("\n")}
  `;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4.1-nano",
        messages: [{ role: "user", content: input }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );
    res.json(response.data.choices[0].message.content);
  } catch (err) {
    res.status(500).send({ err: err.message, msg: "Error talking to OpenAI" });
  }
};

export const getAIBlog = async (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).send({ error: "Title is required" });
  }
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4.1-nano",
        messages: [
          {
            role: "user",
            content: `Write a blog post about ${title}. The generated response should be a JSON format with a title, body, tags, slug and image. The Image should be an empty string. The title is provided. The body should be in a html format as if written by a wysiwyg editor. Do not include the title in the body. Make it long, at least 5 paragraphs. There should be at least one tag, at most 2 tags.`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const blogContent = response.data.choices[0].message.content;
    const blogData = JSON.parse(blogContent);
    res.json(blogData);
  } catch (error) {
    res
      .status(500)
      .send({ error: error.message, msg: "Error generating blog" });
  }
};

export const generateRoadMap = async (req, res) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });
    if (!user.career)
      return res.status(400).json({ message: "Career not selected" });

    const { career } = user;

    const prompt = `
      You are an expert career advisor. Generate a detailed roadmap for the career path of ${career}. The roadmap should strictly be in JSON format with the following structure:
      {
        "career": "${career}",
        "stages": [
          {
            "title": "Stage 1",
            "description": "Description of stage 1",
            "duration": "Duration of stage 1",
            "tasks": ["Task 1", "Task 2"],
            status: "in-progress"
          },
          {
            "title": "Stage 2",
            "description": "Description of stage 2",
            "duration": "Duration of stage 2",
            "tasks": [
              {
                "title": task_title,
                "text": "Task description",
              }
            ],
            status: "in-progress"
          },

          ...
        ]
      }

      in the provided format; 
      - Do not add any extra text or explanation. 
      - Status should be "in-progress" for the first stage, and "upcoming" for all the other stages. 
      - There should be at least 3 stages, and at most 5 stages.
      - The stages should be relevant to the career path of ${career}.
      - The tasks should be actionable and relevant to the stage.
      - The tasks title should be brief, where as the text should be descriptive.
      - task.text should be maximum 5 sentences long.
      - There should be a description for each stage.
      - There should be at least 1 task and at most 8 tasks in each stage. Prioritize giving more tasks to IT/Computer/Programming fields.
      - Duration should be a number representing the expected days for completion of the stage.    
      - The stage title should be more descriptive than just "Stage 1", "Stage 2", etc.     
    `;

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4.1-nano",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const roadmapContent = response.data.choices[0].message.content;
    const roadmapData = JSON.parse(roadmapContent);
    if (!roadmapData?.stages?.length) {
      return res.status(500).json({ message: "Invalid roadmap data" });
    }

    const newRoadmap = {
      career_title: career,
      stages: roadmapData.stages.map((stage) => ({
        title: stage.title,
        description: stage.description,
        duration: stage.duration || 0,
        status: stage.status || "in-progress",
        tasks: stage.tasks.map((task) => ({
          title: task.title || "Task",
          text: task.text || "Task description",
          isCompleted: false,
          completedAt: null,
        })),
      })),
    };

    const roadmap = new Roadmap(newRoadmap);
    await roadmap.save();

    res.json({ message: "Roadmap generated successfully", roadmap });
  } catch (error) {
    res.status(500).json({ message: "internal server error", error });
  }
};

export const generateSubResources = async (req, res) => {
  const { category, career } = req.body;

  if (!category) {
    return res.status(400).json({ error: "Category is required" });
  }

  const allowedPlatforms = [
    "freeCodeCamp",
    "YouTube",
    "Google Scholar",
    "Coursera",
    "edX",
    "Khan Academy",
    "MDN Web Docs",
    "W3Schools",
    "GeeksforGeeks",
    "Codecademy",
    "Pluralsight",
    "Udemy",
    "LinkedIn Learning",
    "Scrimba",
    "The Odin Project",
    "MIT OpenCourseWare",
  ];

  const prompt = `
You are a helpful career assistant. Generate 10 helpful sub-resources under the category "${category}" ${
    career ? `for the career path: "${career}".` : "."
  }

Each sub-resource should follow this structure:

[
  {
    "title": "Sub-resource Title",
    "description": "Short helpful description (max 2 lines)",
    "topics": ["Topic 1", "Topic 2", "Topic 3"],
    "links": [
      "https://valid-link-from-${allowedPlatforms.join(" OR ")}"
    ],
    "tools": ["Tool 1", "Tool 2"],
    "goal": "One-line learning goal"
  }
]

Strict Rules:
- Only use links from these platforms: ${allowedPlatforms.join(", ")}.
- Do not invent platforms or links.
- If unsure, link to a relevant Google search like:
  "https://www.google.com/search?q=how+to+learn+${category.replace(/\s/g, "+")}"
- Return ONLY a valid JSON array. No extra explanation or commentary.
`;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4.1-nano",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const content = response.data.choices[0].message.content;
    const parsed = JSON.parse(content);
    res.json({ category, subResources: parsed });
  } catch (error) {
    console.error("Error generating sub-resources:", error.message);
    res.status(500).json({
      message: "Failed to generate sub-resources",
      error: error.message,
    });
  }
};

export const evaluateCV = async (req, res) => {
    try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    if (file.mimetype !== "application/pdf") {
      return res.status(400).json({ message: "Only PDF files are allowed" });
    }

    const filePath = file.path;
    const pdfText = await parsePdfText(filePath);

    if (!pdfText) {
      return res.status(400).json({
        message:
          "Could not read the PDF file. Please upload a PDF with embedded text.",
      });
    }

    const input = `
    Your are an expert assitant for career counselling and analyzing CVs. 
        The career is: ${req.user.career || "not specified"}
        
    Below is a CV text. 
    Analyze the CV and provide a response strictly in the following JSON format:
    {
      "ratings": {
        "relevance": it should be a numerical value between 0 and 1,
        "clarity": it should be a numerical value between 0 and 1,
        "overall": it should be a numerical value between 0 and 1
      },

      "suggestions": it should be a paragraph string of suggestions to improve the CV/ what changes should be made to improve the CV,
      "additions": [ 
        {
          "text": it should be a string of text telling what should be added to the CV,
          "reason": it should be a string of text why this it should be added to the CV
        }
      ]
    }

    - All fields must account for the provided career.
    - The ratings should be based on the CV text.
    - The suggestions should be actionable and relevant to the CV text.
    - The additions should be relevant to the CV text.
    - The number of additions should be 0 or more.
    - The additions should be 0 if you think the CV is perfect.
    - addition.text should be a concise text that should be added to the CV.
    - addition.reason should be a string explaining why the addition is necessary.
    - The relevance field should indicate how relevant the CV is to the career. The relevance rating should be strictly based on the career specified in the user profile.
    - The clarity field should rate based on how grammatically and vocubally correct the CV is. It should see if there are any grammatical errors or spelling mistakes.
    - If you believe that the given CV cannot function as a CV, the relevance field should be 0, and the clarity field should be 0.
    - If there are some issues in the calarity field, its fixes should be included in the suggestions field.
    - If the career is not specified, the relevance field should strictly give 0, but the rest of the fields should be filled as per the CV text.
    - If the CV is not relevant to the career, the additions should at least mention what should be added to make it relevant.
  


    --- IMPORTANT ---
    if you cannot read the contents of the CV, every numerical field should be 0, and the suggestions field should be "The CV could not be read. Please upload a valid PDF file." and the additions field should be empty.

    The CV text is:
    ${pdfText}
    `;

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4.1-nano",
        messages: [{ role: "user", content: input }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const evaluationContent = response.data.choices[0].message.content;
    const evaluationData = JSON.parse(evaluationContent);

    const evaluation = {
      userId: req.user._id,
      cvText: pdfText,
      ratings: {
        relevance: evaluationData.ratings.relevance,
        clarity: evaluationData.ratings.clarity,
        overall: evaluationData.ratings.overall,
      },
      suggestions: evaluationData.suggestions,
      additions: evaluationData.additions.map((add) => ({
        text: add.text,
        reason: add.reason,
      })),
    };

    const newEvaluation = new Evaluation(evaluation);
    await newEvaluation.save();

    return res.status(200).json({
      message: "CV evaluated successfully",
      evaluation: newEvaluation,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to evaluate CV",
      error: error.message,
    });
  }
};

