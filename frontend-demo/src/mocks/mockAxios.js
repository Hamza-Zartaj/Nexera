const STORAGE_KEY = "nexera-demo-state";

const defaultUser = {
  _id: "user-demo-1",
  id: "user-demo-1",
  username: "Demo Student",
  email: "demo@nexera.local",
  career: "Software Developer",
  profilePic: null,
  roadmapId: "roadmap-demo-1",
};

const demoBlogs = [
  {
    id: 1,
    _id: "blog-1",
    slug: "career-change-2026",
    image: "/careerchoice.avif",
    title: "How to Prepare for a Career Change in 2026",
    tags: ["Career", "Planning"],
    createdAt: "2026-07-18T09:00:00.000Z",
    body: "<p>Changing careers becomes easier when you treat it like a focused project. Start by listing your transferable skills, choose one target role, and build a small portfolio that proves you can do the work.</p><p>Use informational interviews, short courses, and weekly milestones to keep momentum visible. The goal is not to know everything before you begin; it is to create enough evidence that your next step feels practical.</p>",
  },
  {
    id: 2,
    _id: "blog-2",
    slug: "future-work-skills",
    image: "/future.avif",
    title: "The Future of Work: Skills That Will Matter Most",
    tags: ["Skills", "Future"],
    createdAt: "2026-06-24T09:00:00.000Z",
    body: "<p>Employers continue to value people who can learn quickly, communicate clearly, and use digital tools with confidence. Technical ability matters, but adaptability and good judgment are what keep a career growing.</p><p>Build a habit of learning in public: document projects, explain what you tried, and share the results. This makes your growth easier for mentors, teams, and hiring managers to understand.</p>",
  },
  {
    id: 3,
    _id: "blog-3",
    slug: "salary-negotiation",
    image: "/salary.jpeg",
    title: "Negotiating Your Salary: Practical Strategies",
    tags: ["Salary", "Interview"],
    createdAt: "2026-05-12T09:00:00.000Z",
    body: "<p>Strong negotiation starts before the offer. Research the market, write down your accomplishments, and practice saying your target range out loud until it feels normal.</p><p>Keep the conversation collaborative. Ask about the full package, including learning budget, flexibility, growth path, and review timing.</p>",
  },
  {
    id: 4,
    _id: "blog-4",
    slug: "resume-for-tech-jobs",
    image: "/resume.avif",
    title: "Crafting the Perfect Resume for Tech Jobs",
    tags: ["Resume", "Tech"],
    createdAt: "2026-04-30T09:00:00.000Z",
    body: "<p>A strong tech resume shows impact, not just responsibilities. Use concise bullets that connect the tool you used with the result you created.</p><p>Lead with projects that match the role, include links where possible, and remove anything that makes the page harder to scan.</p>",
  },
  {
    id: 5,
    _id: "blog-5",
    slug: "virtual-interview",
    image: "/interview.jpg",
    title: "Mastering the Virtual Interview",
    tags: ["Interview", "Remote"],
    createdAt: "2026-03-14T09:00:00.000Z",
    body: "<p>Virtual interviews reward preparation. Test your audio, camera, internet, and lighting before the call. Keep notes nearby, but avoid reading from them directly.</p><p>Answer with short stories: the problem, your action, and the result. Then pause and let the interviewer guide the next turn.</p>",
  },
  {
    id: 6,
    _id: "blog-6",
    slug: "optimize-linkedin-profile",
    image: "/linkedin.avif",
    title: "How to Optimize Your LinkedIn Profile",
    tags: ["LinkedIn", "Networking"],
    createdAt: "2026-02-08T09:00:00.000Z",
    body: "<p>Your profile should make your direction obvious. Use the headline to name the role you want, the summary to explain your strengths, and the featured section to show proof.</p><p>Comment thoughtfully, connect with people in your target field, and keep your recent work visible.</p>",
  },
];

const makeRoadmap = (career = "Software Developer") => ({
  _id: "roadmap-demo-1",
  career_title: career,
  stages: [
    {
      _id: "stage-foundation",
      title: "Foundation",
      status: "completed",
      description: `Build the essential knowledge needed to begin a ${career} path.`,
      duration: 4,
      tasks: [
        {
          _id: "task-foundation-1",
          title: "Map the role",
          text: "Research daily responsibilities, tools, and common entry-level expectations.",
          isCompleted: true,
          completedAt: new Date().toISOString(),
        },
        {
          _id: "task-foundation-2",
          title: "Set learning goals",
          text: "Choose three skills to practice consistently for the next month.",
          isCompleted: true,
          completedAt: new Date().toISOString(),
        },
      ],
    },
    {
      _id: "stage-skills",
      title: "Skill Building",
      status: "in-progress",
      description: "Practice core skills through guided lessons and small projects.",
      duration: 8,
      tasks: [
        {
          _id: "task-skills-1",
          title: "Complete a starter course",
          text: "Finish a practical beginner course and save your notes.",
          isCompleted: true,
          completedAt: new Date().toISOString(),
        },
        {
          _id: "task-skills-2",
          title: "Build a mini project",
          text: "Create a small project that demonstrates one important skill.",
          isCompleted: false,
          completedAt: null,
        },
        {
          _id: "task-skills-3",
          title: "Review with a mentor",
          text: "Ask for feedback and write down the next improvements.",
          isCompleted: false,
          completedAt: null,
        },
      ],
    },
    {
      _id: "stage-portfolio",
      title: "Portfolio",
      status: "upcoming",
      description: "Turn your best work into proof that is easy to share.",
      duration: 4,
      tasks: [
        {
          _id: "task-portfolio-1",
          title: "Polish one project",
          text: "Improve the strongest project and add a clear explanation.",
          isCompleted: false,
          completedAt: null,
        },
        {
          _id: "task-portfolio-2",
          title: "Create a resume version",
          text: "Tailor your resume for your chosen career direction.",
          isCompleted: false,
          completedAt: null,
        },
      ],
    },
    {
      _id: "stage-launch",
      title: "Career Launch",
      status: "upcoming",
      description: "Apply, interview, and refine your plan from real feedback.",
      duration: 6,
      tasks: [
        {
          _id: "task-launch-1",
          title: "Apply weekly",
          text: "Send focused applications to roles that match your current skills.",
          isCompleted: false,
          completedAt: null,
        },
        {
          _id: "task-launch-2",
          title: "Practice interviews",
          text: "Run two mock interviews and improve your answers.",
          isCompleted: false,
          completedAt: null,
        },
      ],
    },
  ],
});

const defaultState = () => ({
  currentUser: defaultUser,
  roadmap: makeRoadmap(defaultUser.career),
  blogs: demoBlogs,
  submissions: [],
});

const clone = (value) => JSON.parse(JSON.stringify(value));

const getState = () => {
  if (typeof window === "undefined") return defaultState();

  const rawState = window.localStorage.getItem(STORAGE_KEY);
  if (!rawState) {
    const freshState = defaultState();
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(freshState));
    return freshState;
  }

  try {
    return { ...defaultState(), ...JSON.parse(rawState) };
  } catch {
    const freshState = defaultState();
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(freshState));
    return freshState;
  }
};

const saveState = (state) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }
};

const response = (data, status = 200) =>
  Promise.resolve({
    data: clone(data),
    status,
    statusText: "OK",
    headers: {},
    config: {},
  });

const failure = (message, status = 400) =>
  Promise.reject({
    response: {
      data: { message },
      status,
      statusText: "Error",
    },
  });

const pathFromUrl = (url) => {
  try {
    return new URL(url, window.location.origin).pathname;
  } catch {
    return String(url);
  }
};

const demoToken = () => `demo-token-${Date.now()}`;

const quizResult = () => ({
  best_career_option: "Software Developer",
  description:
    "Your answers show a strong mix of logical thinking, creativity, and comfort with structured problem solving.",
  career_options: [
    "Software Developer",
    "Data Analyst",
    "UI/UX Designer",
    "Product Manager",
    "Cloud Engineer",
    "Business Analyst",
  ],
  reason:
    "The selected answers point toward work that combines analysis, building, iteration, and communication. These careers let you solve meaningful problems while continuing to learn.",
});

const resourcesFor = (category, career) => {
  const selectedCareer = career || getState().currentUser?.career || "your career";

  const resources = {
    "Learning Materials": [
      {
        title: `${selectedCareer} Starter Path`,
        description: "A focused sequence for learning the fundamentals.",
        topics: ["Core concepts", "Practice projects", "Weekly review"],
        links: ["https://roadmap.sh", "https://www.freecodecamp.org"],
        goal: "Build a confident base in 30 days.",
      },
      {
        title: "Skill Notes Template",
        description: "A simple way to track lessons, mistakes, and next steps.",
        tools: ["Notion", "Google Docs", "Obsidian"],
        goal: "Turn learning into a reusable personal knowledge base.",
      },
      {
        title: "Portfolio Practice Ideas",
        description: "Small project prompts that show practical ability.",
        topics: ["Problem framing", "Project scope", "Reflection"],
      },
    ],
    "Job Market Insights": [
      {
        title: "Role Demand Snapshot",
        description: `Common hiring signals for ${selectedCareer} roles.`,
        topics: ["Required skills", "Entry-level keywords", "Growth paths"],
        goal: "Understand what employers are scanning for.",
      },
      {
        title: "Salary Research Checklist",
        description: "A practical checklist for comparing ranges and benefits.",
        tools: ["LinkedIn", "Glassdoor", "Indeed"],
      },
      {
        title: "Networking Targets",
        description: "People and communities worth following during your search.",
        links: ["https://www.linkedin.com", "https://github.com"],
      },
    ],
    "Templates & Docs": [
      {
        title: "Resume Outline",
        description: "A clean structure for education, projects, and experience.",
        topics: ["Summary", "Projects", "Skills", "Achievements"],
        goal: "Create a resume that is fast to scan.",
      },
      {
        title: "Cover Letter Blocks",
        description: "Reusable paragraphs for applications and referrals.",
        tools: ["Google Docs", "Canva"],
      },
      {
        title: "LinkedIn Profile Checklist",
        description: "A section-by-section checklist for improving visibility.",
        links: ["https://www.linkedin.com/help/linkedin"],
      },
    ],
  };

  return resources[category] || resources["Learning Materials"];
};

const makeGeneratedRoadmap = (career) => ({
  career,
  stages: makeRoadmap(career).stages.map((stage, index) => ({
    ...stage,
    _id: `generated-stage-${index + 1}`,
    status: index === 0 ? "in-progress" : "upcoming",
    tasks: stage.tasks.map((task, taskIndex) => ({
      ...task,
      _id: `generated-task-${index + 1}-${taskIndex + 1}`,
      isCompleted: false,
      completedAt: null,
    })),
  })),
});

const saveRoadmapPreview = (preview, career) => ({
  _id: "roadmap-demo-1",
  career_title: preview?.career || career || "Software Developer",
  stages: (preview?.stages || makeRoadmap(career).stages).map((stage, index) => ({
    ...stage,
    _id: stage._id || `stage-${index + 1}`,
    status: index === 0 ? "in-progress" : stage.status || "upcoming",
    tasks: (stage.tasks || []).map((task, taskIndex) => ({
      ...task,
      _id: task._id || `task-${index + 1}-${taskIndex + 1}`,
      isCompleted: Boolean(task.isCompleted),
      completedAt: task.completedAt || null,
    })),
  })),
});

const handleGet = (url) => {
  const path = pathFromUrl(url);
  const state = getState();

  if (path === "/api/auth/me") {
    return state.currentUser
      ? response({ user: state.currentUser })
      : failure("Unauthorized", 401);
  }

  if (path === "/api/profile/roadmap") {
    const career = state.currentUser?.career || "Software Developer";
    const roadmap = state.roadmap || makeRoadmap(career);
    return response({ roadmap, message: "Roadmap fetched successfully" });
  }

  if (path === "/api/public/blogs") {
    return response(state.blogs);
  }

  if (path.startsWith("/api/public/blogs/")) {
    const slug = decodeURIComponent(path.split("/").pop());
    const blog = state.blogs.find((item) => item.slug === slug) || state.blogs[0];
    return response(blog);
  }

  if (path === "/api/profile/evaluations") {
    return response({ evaluations: [], message: "Evaluations fetched successfully" });
  }

  if (path === "/api/profile/evaluations/latest") {
    return response({
      evaluation: {
        _id: "evaluation-demo-1",
        score: 86,
        summary: "Demo evaluation data",
      },
      message: "Latest evaluation fetched successfully",
    });
  }

  return response({});
};

const handlePost = (url, data = {}) => {
  const path = pathFromUrl(url);
  const state = getState();

  if (path === "/api/auth/login" || path === "/api/auth/google") {
    const email = data.email || state.currentUser.email;
    const username = email ? email.split("@")[0] : state.currentUser.username;
    state.currentUser = {
      ...state.currentUser,
      email,
      username: username || state.currentUser.username,
    };
    saveState(state);
    return response({ token: demoToken(), user: state.currentUser });
  }

  if (path === "/api/auth/register") {
    const userId = `user-demo-${Date.now()}`;
    state.currentUser = {
      ...defaultUser,
      _id: userId,
      id: userId,
      username: data.username || "Demo Student",
      email: data.email || "demo@nexera.local",
    };
    state.roadmap = makeRoadmap(state.currentUser.career);
    saveState(state);
    return response(
      {
        message: "User registered successfully",
        token: demoToken(),
        user: state.currentUser,
      },
      201
    );
  }

  if (path === "/api/profile/reset-password") {
    return response({ message: "Password reset successfully" });
  }

  if (path === "/api/profile/career") {
    const career = data.career || "Software Developer";
    state.currentUser = { ...state.currentUser, career };
    state.roadmap = makeRoadmap(career);
    saveState(state);
    return response({ message: "Career assigned successfully" });
  }

  if (path === "/api/profile/roadmap") {
    state.roadmap = saveRoadmapPreview(
      data.roadmapId,
      state.currentUser?.career || "Software Developer"
    );
    state.currentUser = {
      ...state.currentUser,
      roadmapId: state.roadmap._id,
      career: state.roadmap.career_title,
    };
    saveState(state);
    return response({ message: "Roadmap assigned successfully", roadmap: state.roadmap });
  }

  if (path === "/api/ai/quiz/evaluate") {
    return response(JSON.stringify(quizResult()));
  }

  if (path === "/api/ai/roadmap/generate") {
    const career = state.currentUser?.career || "Software Developer";
    return response({ roadmap: makeGeneratedRoadmap(career) });
  }

  if (path === "/api/ai/resources/sub") {
    return response({
      subResources: resourcesFor(data.category, data.career),
    });
  }

  if (path === "/api/ai/cv/evaluate") {
    return response({
      evaluation: {
        score: 86,
        summary: "Your CV is clear and project-focused. Add more measurable outcomes.",
      },
    });
  }

  if (path === "/api/public/feedback" || path === "/api/public/contact") {
    state.submissions.push({ path, data, createdAt: new Date().toISOString() });
    saveState(state);
    return response({ message: "Submitted successfully" }, 201);
  }

  return response({});
};

const handlePut = (url, data = {}) => {
  const path = pathFromUrl(url);
  const state = getState();

  if (path === "/api/profile/update") {
    state.currentUser = {
      ...state.currentUser,
      username: data.username || state.currentUser.username,
      email: data.email || state.currentUser.email,
    };
    saveState(state);
    return response({
      message: "User info updated successfully",
      user: state.currentUser,
    });
  }

  if (path === "/api/profile/photo") {
    if (data?.clear === true || data?.clear === "true") {
      state.currentUser = { ...state.currentUser, profilePic: null };
      saveState(state);
      return response({ message: "Profile picture cleared successfully" });
    }

    return response({
      message: "Profile picture updated successfully",
      profilePic: state.currentUser?.profilePic || null,
    });
  }

  return response({});
};

const handlePatch = (url, data = {}) => {
  const path = pathFromUrl(url);
  const state = getState();

  if (path.startsWith("/api/profile/roadmap/")) {
    const roadmap = state.roadmap || makeRoadmap(state.currentUser?.career);
    const stage = roadmap.stages.find((item) => item._id === data.stageId);

    if (stage) {
      const task = stage.tasks.find((item) => item._id === data.taskId);
      if (task) {
        task.isCompleted = Boolean(data.isCompleted);
        task.completedAt = task.isCompleted ? new Date().toISOString() : null;
      }

      if (data.stageStatus) {
        stage.status = data.stageStatus;
      }

      if (stage.tasks.every((item) => item.isCompleted)) {
        stage.status = "completed";
        const currentIndex = roadmap.stages.findIndex((item) => item._id === stage._id);
        const nextStage = roadmap.stages[currentIndex + 1];
        if (nextStage && nextStage.status !== "completed") {
          nextStage.status = "in-progress";
        }
      }
    }

    state.roadmap = roadmap;
    saveState(state);
    return response({ message: "Roadmap updated successfully", roadmap });
  }

  return response({});
};

const axios = {
  get: (url, config) => handleGet(url, config),
  post: (url, data, config) => handlePost(url, data, config),
  put: (url, data, config) => handlePut(url, data, config),
  patch: (url, data, config) => handlePatch(url, data, config),
  delete: () => response({}),
  create: () => axios,
  defaults: {},
};

export default axios;
