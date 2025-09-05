export interface CourseModule {
  id: string;
  title: string;
  lessons: Lesson[];
}

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

export const COURSE_CONTENT: CourseModule[] = [
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
          {
            type: 'h2',
            id: 'core-windows',
            text: 'The Core Windows',
          },
          {
            type: 'p',
            text: 'When you first open a Unity project, you will be greeted by several windows, each with a specific purpose. Let\'s break them down.',
          },
          {
            type: 'h3',
            id: 'the-scene-view',
            text: 'The Scene View',
          },
          {
            type: 'p',
            text: 'This is your interactive, visual workspace. You can use the Scene View to place and manipulate GameObjects like characters, cameras, and lights. It\'s where you build your world.',
          },
          {
            type: 'h3',
            id: 'the-game-view',
            text: 'The Game View',
          },
          {
            type: 'p',
            text: 'The Game View shows you what your players will see. It renders from the perspective of the cameras in your scene. When you press the Play button, the Game View comes to life.',
          },
          {
            type: 'callout',
            variant: 'tip',
            text: 'You can change the aspect ratio in the Game View to test how your game will look on different screen sizes.',
          },
          {
            type: 'h3',
            id: 'the-hierarchy',
            text: 'The Hierarchy',
          },
          {
            type: 'p',
            text: 'The Hierarchy window displays a list of every GameObject in your current scene. You can use it to select, group, and organize objects. Parent-child relationships are also managed here, which is fundamental for creating complex prefabs and characters.',
          },
          {
            type: 'h3',
            id: 'the-project-window',
            text: 'The Project Window',
          },
          {
            type: 'p',
            text: 'This window contains all the assets in your project, such as scripts, materials, textures, and 3D models. It mirrors the file structure of your project on your computer. Keep it organized!',
          },
          {
            type: 'h3',
            id: 'the-inspector',
            text: 'The Inspector',
          },
          {
            type: 'p',
            text: 'When you select a GameObject in the Hierarchy or an asset in the Project window, the Inspector shows you all its properties and components. This is where you will spend a lot of time tweaking values, attaching scripts, and configuring behavior.',
          },
          {
            type: 'code',
            lang: 'csharp',
            code: `// A simple C# script in Unity
using UnityEngine;

public class PlayerController : MonoBehaviour
{
    public float speed = 5.0f;

    void Update()
    {
        float horizontal = Input.GetAxis("Horizontal");
        transform.Translate(new Vector3(horizontal, 0, 0) * speed * Time.deltaTime);
    }
}`,
          },
          {
            type: 'callout',
            variant: 'warning',
            text: 'Always save your scene (Ctrl+S or Cmd+S) frequently to avoid losing your work.',
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
          {
            question:
              'Where would you modify the properties of a selected GameObject, like its position or a script variable?',
            options: ['Project Window', 'Hierarchy', 'Inspector', 'Scene View'],
            correctAnswer: 2,
            explanation:
              'The Inspector is the context-sensitive window that displays all components and their properties for the currently selected object or asset.',
          },
          {
            question: 'What does the Hierarchy window contain?',
            options: [
              'All assets in your project folder',
              'A list of all GameObjects in the current scene',
              'C# script properties',
              'Global project settings',
            ],
            correctAnswer: 1,
            explanation:
              'The Hierarchy provides a list view of every GameObject currently present in the open scene.',
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
            {
              title: 'Unity Learn: Getting Started',
              href: 'https://learn.unity.com/pathway/unity-essentials',
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
    ],
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
    ],
  },
];
