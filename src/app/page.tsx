import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { COURSE_CONTENT, type Lesson, type LessonContentBlock } from '@/lib/content';
import AppSidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import TableOfContents from '@/components/layout/TableOfContents';
import VideoPlayer from '@/components/lesson/VideoPlayer';
import Callout from '@/components/lesson/Callout';
import CodeBlock from '@/components/lesson/CodeBlock';
import PracticeTasks from '@/components/lesson/PracticeTasks';
import Quiz from '@/components/lesson/Quiz';
import LessonCompletion from '@/components/lesson/LessonCompletion';
import RelatedResources from '@/components/lesson/RelatedResources';
import { Separator } from '@/components/ui/separator';

function renderContentBlock(block: LessonContentBlock, index: number) {
  switch (block.type) {
    case 'h2':
      return (
        <h2 key={index} id={block.id} className="font-headline text-3xl font-bold mt-12 mb-6 scroll-mt-24">
          {block.text}
        </h2>
      );
    case 'h3':
      return (
        <h3 key={index} id={block.id} className="font-headline text-2xl font-bold mt-8 mb-4 scroll-mt-24">
          {block.text}
        </h3>
      );
    case 'p':
      return (
        <p key={index} className="leading-relaxed mb-4">
          {block.text}
        </p>
      );
    case 'code':
      return <CodeBlock key={index} language={block.lang} code={block.code} />;
    case 'callout':
      return <Callout key={index} variant={block.variant} text={block.text} />;
    default:
      return null;
  }
}

export default function Home() {
  // For demonstration, we'll always show the first lesson of the first module.
  const lesson: Lesson = COURSE_CONTENT[0].lessons[0];
  const headings = lesson.content.filter(block => block.type === 'h2' || block.type === 'h3') as ({ id: string; text: string; type: 'h2' | 'h3' })[];

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <div className="flex-1 lg:grid lg:grid-cols-[1fr_240px] lg:gap-8">
          <main className="py-6 px-4 md:px-6 lg:px-8">
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <h1 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                {lesson.title}
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                {lesson.summary}
              </p>

              <VideoPlayer videoId={lesson.videoId} />

              {lesson.content.map(renderContentBlock)}
              
              <Separator className="my-12" />

              <PracticeTasks
                lessonId={lesson.id}
                lessonTitle={lesson.title}
                lessonContent={lesson.content.map(b => b.type === 'p' ? b.text : '').join('\n')}
                initialTasks={lesson.practiceTasks}
              />
              
              <Separator className="my-12" />

              <Quiz lessonId={lesson.id} questions={lesson.quiz} />

              <LessonCompletion lessonId={lesson.id} />
              
              <Separator className="my-12" />
              
              <RelatedResources
                nextLesson={lesson.relatedResources.nextLesson}
                docs={lesson.relatedResources.docs}
              />
            </div>
          </main>
          <aside className="hidden lg:block sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto py-6 pr-4">
            <TableOfContents headings={headings} />
          </aside>
        </div>
      </div>
    </SidebarProvider>
  );
}
