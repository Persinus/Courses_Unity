
import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { COURSE_STRUCTURE } from '@/lib/content';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { PlayCircle } from 'lucide-react';

export default function CoursesPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/40">
        <AppSidebar />
        <div className="flex flex-1 flex-col">
          <Header />
          <main className="flex-1 p-4 sm:p-6 md:p-8">
            <div className="max-w-5xl mx-auto">
              <div className="mb-12">
                <h1 className="text-4xl font-bold font-headline mb-2">
                  Tất cả khóa học
                </h1>
                <p className="text-lg text-muted-foreground">
                  Bắt đầu hành trình của bạn để trở thành một nhà phát triển game Unity chuyên nghiệp.
                </p>
              </div>

              <div className="space-y-8">
                {COURSE_STRUCTURE.map((category) => (
                  <Card key={category.id} className="overflow-hidden">
                    <CardHeader>
                      <CardTitle className="text-2xl">{category.title}</CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="w-full">
                        {category.modules.map((module) => (
                          <AccordionItem value={module.id} key={module.id}>
                            <AccordionTrigger className="text-lg font-semibold">
                              {module.title}
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="divide-y divide-border">
                                {module.lessons.map((lesson) => (
                                  <Link
                                    key={lesson.id}
                                    href={lesson.href}
                                    className="group flex items-center justify-between p-4 transition-colors hover:bg-accent"
                                  >
                                    <div className="flex items-center gap-4">
                                      <PlayCircle className="h-6 w-6 text-muted-foreground group-hover:text-primary" />
                                      <div>
                                        <p className="font-medium group-hover:text-primary">
                                          {lesson.title}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                          {lesson.summary}
                                        </p>
                                      </div>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
