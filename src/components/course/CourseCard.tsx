
"use client";

import Image from 'next/image';
import Link from 'next/link';

interface Course {
  id: string;
  title: string;
  posterImage: string;
  posterHint: string;
  href: string;
}

interface CourseCardProps {
  course: Course;
  onMouseEnter: () => void;
}

export default function CourseCard({ course, onMouseEnter }: CourseCardProps) {
  return (
    <Link href={course.href} className="block group" onMouseEnter={onMouseEnter}>
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg transition-transform duration-300 group-hover:scale-105">
        <Image
          src={course.posterImage}
          alt={course.title}
          fill
          data-ai-hint={course.posterHint}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 p-4">
          <h3 className="text-lg font-bold text-white">{course.title}</h3>
        </div>
      </div>
    </Link>
  );
}
