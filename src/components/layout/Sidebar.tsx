"use client";

import React, { useState } from 'react';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  useSidebar,
} from '@/components/ui/sidebar';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import { COURSE_CONTENT } from '@/lib/content';
import { CheckCircle2, ChevronDown, BookOpen, Code, Dot } from 'lucide-react';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { cn } from '@/lib/utils';
import Link from 'next/link';

function Logo() {
  const { state } = useSidebar();
  return (
    <Link
      href="#"
      className="flex items-center gap-2 font-bold text-xl font-headline"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6 text-primary"
      >
        <path d="M21.5 12a9.5 9.5 0 1 1-19 0 9.5 9.5 0 0 1 19 0Z" />
        <path d="M12 2.5v19" />
        <path d="M2.5 12h19" />
      </svg>
      {state === 'expanded' && <span>Unity Codex</span>}
    </Link>
  );
}

const moduleIcons: { [key: string]: React.ElementType } = {
  'module-1': BookOpen,
  'module-2': Code,
};

export default function AppSidebar() {
  const [completedLessons] = useLocalStorage<string[]>('completedLessons', []);
  const [openModules, setOpenModules] = useState<string[]>(['module-1']);

  // In a real app, this would come from the URL
  const activeLessonId = 'intro-to-unity-editor';

  return (
    <Sidebar>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {COURSE_CONTENT.map((module) => {
            const Icon = moduleIcons[module.id] || Dot;
            return (
              <SidebarGroup key={module.id}>
                <SidebarMenuButton
                  asChild
                  className="justify-between"
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenModules((prev) =>
                      openModules.includes(module.id)
                        ? prev.filter((id) => id !== module.id)
                        : [...prev, module.id]
                    );
                  }}
                  tooltip={module.title}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <Icon />
                      <SidebarGroupLabel>{module.title}</SidebarGroupLabel>
                    </div>
                    <ChevronDown
                      className={cn(
                        'h-4 w-4 transition-transform',
                        openModules.includes(module.id) && 'rotate-180'
                      )}
                    />
                  </div>
                </SidebarMenuButton>
                <Collapsible
                  open={openModules.includes(module.id)}
                >
                  <CollapsibleContent>
                    <SidebarMenu className="py-1">
                      {module.lessons.map((lesson) => (
                        <SidebarMenuItem key={lesson.id}>
                          <SidebarMenuButton
                            isActive={lesson.id === activeLessonId}
                            className="flex justify-between items-center w-full"
                            tooltip={lesson.title}
                          >
                            <span>{lesson.title}</span>
                            {completedLessons.includes(lesson.id) && (
                              <CheckCircle2 className="h-4 w-4 text-accent" />
                            )}
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </CollapsibleContent>
                </Collapsible>
              </SidebarGroup>
            )
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
