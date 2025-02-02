export interface ProjectContent {
  type: "text" | "image" | "list";
  content: string | string[];
  gallery?: string[];
}

export interface Project {
  title: string;
  caption: string;
  cover: string;
  slug: string;
  tags: string[];
  body: ProjectContent[];
}

const projects: Project[] = [
  {
    title: "E-commerce App",
    caption:
      "A mobile-first e-commerce application for selling handmade goods.",
    cover: "/placeholder.svg",
    slug: "e-commerce-app",
    tags: ["React Native", "Node.js", "MongoDB"],
    body: [
      {
        type: "text",
        content:
          "This project focused on creating a seamless shopping experience on mobile devices.",
      },
      {
        type: "image",
        content: "/placeholder.svg",
        gallery: [
          "/placeholder.svg",
          "/placeholder.svg",
          "/placeholder.svg",
          "/placeholder.svg",
          "/placeholder.svg",
        ],
      },
      {
        type: "text",
        content:
          "Key features included product browsing, secure checkout, and order tracking.",
      },
      { type: "image", content: "/placeholder.svg" },
      {
        type: "text",
        content:
          "Built with React Native and integrated with a backend API for product management.",
      },
      {
        type: "list",
        content: [
          "Seamless mobile shopping experience",
          "Secure payment processing",
          "Real-time inventory management",
          "Push notifications for order updates",
          "User reviews and ratings",
        ],
      },
    ],
  },
  {
    title: "Blog Platform",
    caption: "A platform for sharing articles and connecting with readers.",
    cover: "/placeholder.svg",
    slug: "blog-platform",
    tags: ["Next.js", "GraphQL", "PostgreSQL"],
    body: [
      {
        type: "text",
        content:
          "Developed a full-stack blog platform with user authentication and content management.",
      },
      {
        type: "image",
        content: "/placeholder.svg",
        gallery: [
          "/placeholder.svg",
          "/placeholder.svg",
          "/placeholder.svg",
          "/placeholder.svg",
          "/placeholder.svg",
        ],
      },
      {
        type: "text",
        content: "Users can create, publish, and comment on articles.",
      },
      { type: "list", content: ["Next.js", "GraphQL", "PostgreSQL"] },
      {
        type: "text",
        content: "Integrated with social media for sharing and promotion.",
      },
    ],
  },
  {
    title: "Task Management App",
    caption: "A simple and efficient way to organize your tasks and projects.",
    cover: "/placeholder.svg",
    slug: "task-management-app",
    tags: ["Vue.js", "Firebase"],
    body: [
      {
        type: "image",
        content: "/placeholder.svg",
        gallery: [
          "/placeholder.svg",
          "/placeholder.svg",
          "/placeholder.svg",
          "/placeholder.svg",
          "/placeholder.svg",
        ],
      },
      {
        type: "text",
        content:
          "Designed a user-friendly task management application to boost productivity.",
      },
      { type: "image", content: "/placeholder.svg" },
      {
        type: "text",
        content:
          "Users can create tasks, set deadlines, assign priorities, and track progress.",
      },
      { type: "list", content: ["Vue.js", "Firebase"] },
      {
        type: "text",
        content:
          "Real-time collaboration features enable team members to work together seamlessly.",
      },
    ],
  },
];

export default projects;
