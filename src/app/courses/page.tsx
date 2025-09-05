
"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import AppSidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Badge } from '@/components/ui/badge';
import { PlayCircle } from 'lucide-react';
import CourseCard from '@/components/course/CourseCard';

const coursesData = [
  {
    id: 'basic-programming',
    title: 'Lập trình cơ bản',
    description: 'Nắm vững các khái niệm cốt lõi của Unity và C# để xây dựng nền tảng vững chắc cho việc phát triển game.',
    coverImage: 'https://picsum.photos/1200/600',
    hint: 'abstract code',
    posterImage: 'https://picsum.photos/400/600',
    posterHint: 'abstract art',
    tags: ['C#', 'Unity', 'Beginner'],
    href: '/courses', // Update this later if needed
  },
  {
    id: 'data-structures',
    title: 'Cấu trúc dữ liệu',
    description: 'Sử dụng các cấu trúc dữ liệu hiệu quả để quản lý thông tin game phức tạp.',
    coverImage: 'https://picsum.photos/1200/600',
    hint: 'data network',
    posterImage: 'https://picsum.photos/400/600',
    posterHint: 'data points',
    tags: ['Data', 'Intermediate'],
    href: '/courses',
  },
  {
    id: 'design-patterns',
    title: 'Design Pattern',
    description: 'Áp dụng các mẫu thiết kế phổ biến để viết mã sạch, dễ bảo trì và mở rộng.',
    coverImage: 'https://picsum.photos/1200/600',
    hint: 'architectural design',
    posterImage: 'https://picsum.photos/400/600',
    posterHint: 'architecture blueprint',
    tags: ['Advanced', 'Best Practices'],
    href: '/courses',
  },
  {
    id: 'backend-game',
    title: 'Back End Game',
    description: 'Xây dựng các tính năng phía máy chủ như quản lý người chơi, dữ liệu và nhiều người chơi.',
    coverImage: 'https://picsum.photos/1200/600',
    hint: 'server racks',
    posterImage: 'https://picsum.photos/400/600',
    posterHint: 'network servers',
    tags: ['Backend', 'Multiplayer'],
    href: '/courses',
  },
  {
    id: 'advanced-programming',
    title: 'Lập trình nâng cao',
    description: 'Khám phá các chủ đề nâng cao như tối ưu hóa, lập trình shader và AI cho game.',
    coverImage: 'https://picsum.photos/1200/600',
    hint: 'artificial intelligence',
    posterImage: 'https://picsum.photos/400/600',
    posterHint: 'ai robot',
    tags: ['Expert', 'Optimization', 'AI'],
    href: '/courses',
  }
];

export default function CoursesPage() {
  const [featuredCourse, setFeaturedCourse] = useState(coursesData[0]);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <div className="flex flex-1 flex-col">
          <Header />
          <main className="flex-1 overflow-y-auto">
            {/* Hero Section */}
            <section className="relative h-[60vh] w-full">
              <div className="absolute inset-0">
                <Image
                  src={featuredCourse.coverImage}
                  alt={featuredCourse.title}
                  fill
                  data-ai-hint={featuredCourse.hint}
                  className="object-cover transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/20 to-transparent" />
              </div>
              <div className="relative z-10 flex h-full flex-col justify-end p-8 md:p-12 lg:p-16">
                <h1 className="text-4xl md:text-6xl font-bold font-headline text-foreground mb-4">
                  {featuredCourse.title}
                </h1>
                <div className="flex gap-2 mb-4">
                  {featuredCourse.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
                <p className="max-w-xl text-lg text-muted-foreground mb-8">
                  {featuredCourse.description}
                </p>
                <div className="flex gap-4">
                  <Button asChild size="lg">
                    <Link href={featuredCourse.href}>
                      <PlayCircle className="mr-2 h-5 w-5" />
                      Start Learning
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg">
                    View Details
                  </Button>
                </div>
              </div>
            </section>
            
            {/* Carousels Section */}
            <div className="space-y-12 p-8 md:p-12 lg:p-16">
              <section>
                <h2 className="text-2xl font-bold mb-6">Popular Courses</h2>
                <Carousel
                  opts={{
                    align: 'start',
                    loop: true,
                  }}
                  className="w-full"
                >
                  <CarouselContent>
                    {coursesData.map((course, index) => (
                      <CarouselItem key={index} className="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                        <CourseCard
                          course={course}
                          onMouseEnter={() => setFeaturedCourse(course)}
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="ml-14" />
                  <CarouselNext className="mr-14" />
                </Carousel>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-6">Newest Additions</h2>
                 <Carousel
                  opts={{
                    align: 'start',
                    loop: true,
                  }}
                  className="w-full"
                >
                  <CarouselContent>
                    {[...coursesData].reverse().map((course, index) => (
                      <CarouselItem key={index} className="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                        <CourseCard
                          course={course}
                          onMouseEnter={() => setFeaturedCourse(course)}
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="ml-14" />
                  <CarouselNext className="mr-14" />
                </Carousel>
              </section>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
