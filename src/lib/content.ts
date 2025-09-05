
export interface Lesson {
  id: string;
  title: string;
  summary: string;
  videoId: string;
  content: LessonContentBlock[];
  practiceTasks: string[];
  quiz: QuizQuestion[];
  relatedResources: {
    nextLesson: { title: string; href: string } | null;
    docs: { title: string; href: string }[];
  };
}

export type LessonContentBlock =
  | { type: 'h2'; id: string; text: string }
  | { type: 'h3'; id: string; text: string }
  | { type: 'p'; text: string }
  | { type: 'code'; lang: string; code: string }
  | { type: 'callout'; variant: 'tip' | 'warning'; text: string };

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface CourseModule {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface SkillCategory {
    id: string;
    title: string;
    modules: CourseModule[];
}

export interface SkillLevel {
    id: string;
    title: string;
    categories: SkillCategory[];
}

export const COURSE_STRUCTURE: SkillLevel[] = [
  {
    id: 'intern',
    title: 'Intern Level',
    categories: [
      {
        id: 'basic-programming',
        title: 'Lập trình cơ bản',
        modules: [
          {
            id: 'module-1',
            title: 'Getting Started with Unity',
            lessons: [
              {
                id: 'intro-to-unity-editor',
                title: 'Introduction to the Unity Editor',
                summary:
                  'Learn to navigate the Unity Editor, understand its core windows, and start creating your first project. This lesson is your first step into the world of game development with Unity.',
                videoId: 'd111o4gq-y8',
                content: [
                  {
                    type: 'h2',
                    id: 'welcome-to-unity',
                    text: 'Welcome to Unity!',
                  },
                  {
                    type: 'p',
                    text: 'The Unity Editor is a powerful and flexible creative hub for artists, designers, and developers. It allows you to assemble and configure all your assets, like 3D models, sprites, audio, and code, to build your game or application. Understanding the editor is the first and most crucial step in your journey.',
                  },
                ],
                practiceTasks: [
                  'Create a new 3D project in Unity Hub.',
                  'Add a Cube, a Sphere, and a Plane to your scene from the GameObject menu.',
                  'Try moving, rotating, and scaling the objects using the tools in the top-left of the editor.',
                ],
                quiz: [
                  {
                    question: 'Which window shows you what the player will see?',
                    options: ['Scene View', 'Game View', 'Hierarchy', 'Inspector'],
                    correctAnswer: 1,
                    explanation:
                      'The Game View renders from the active camera in the scene, representing the final player experience.',
                  },
                ],
                relatedResources: {
                  nextLesson: {
                    title: 'GameObjects and Components',
                    href: '#',
                  },
                  docs: [
                    {
                      title: 'Unity Manual: The Unity Editor',
                      href: 'https://docs.unity3d.com/Manual/UnityOverview.html',
                    },
                  ],
                },
              },
              {
                id: 'gameobjects-and-components',
                title: 'GameObjects and Components',
                summary: 'Understand the fundamental building blocks of Unity: GameObjects and Components. Learn how they work together to create everything in your game.',
                videoId: 'rE9m88I8z34',
                content: [],
                practiceTasks: [],
                quiz: [],
                relatedResources: {
                  nextLesson: null,
                  docs: []
                },
              },
            ]
          },
          {
            id: 'module-2',
            title: 'Scripting in C#',
            lessons: [
               {
                id: 'variables-and-data-types',
                title: 'Variables and Data Types',
                summary: 'Dive into C# scripting by learning about variables and the different data types you can use to store information like health, score, and player names.',
                videoId: 'N_n_zgwGz3o',
                content: [],
                practiceTasks: [],
                quiz: [],
                relatedResources: {
                  nextLesson: null,
                  docs: []
                },
              },
            ]
          }
        ]
      },
      {
        id: 'data-structures',
        title: 'Cấu trúc dữ liệu',
        modules: []
      }
    ]
  },
  {
    id: 'fresher',
    title: 'Fresher Level',
    categories: [
        {
            id: 'design-patterns-fresher',
            title: 'Design Pattern',
            modules: []
        },
        {
            id: 'backend-fresher',
            title: 'Back End Game',
            modules: []
        }
    ]
  },
  {
    id: 'junior',
    title: 'Junior Level',
    categories: [
        {
            id: 'advanced-programming',
            title: 'Lập trình nâng cao',
            modules: []
        }
    ]
  }
];

// Keep the old export for pages that might still use it temporarily.
// We can remove this later.
export const COURSE_CONTENT: CourseModule[] = COURSE_STRUCTURE.flatMap(level => 
    level.categories.flatMap(category => category.modules)
);
