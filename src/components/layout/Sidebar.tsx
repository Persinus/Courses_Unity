"use client";

import React, { useState } from 'react';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { COURSE_CONTENT } from '@/lib/content';
import { CheckCircle2, ChevronDown } from 'lucide-react';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { cn } from '@/lib/utils';

export default function AppSidebar() {
  const [completedLessons] = useLocalStorage<string[]>('completedLessons', []);
  const [openModules, setOpenModules] = useState<string[]>(['module-1']);

  // In a real app, this would come from the URL
  const activeLessonId = 'intro-to-unity-editor';

  return (
    <Sidebar>
      <SidebarHeader>
        {/* Placeholder for header content if needed */}
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {COURSE_CONTENT.map((module) => (
            <Collapsible
              key={module.id}
              open={openModules.includes(module.id)}
              onOpenChange={(isOpen) =>
                setOpenModules((prev) =>
                  isOpen ? [...prev, module.id] : prev.filter((id) => id !== module.id)
                )
              }
            >
              <CollapsibleTrigger className="flex justify-between items-center w-full p-2 rounded-md hover:bg-sidebar-accent">
                <span className="font-semibold text-sm">{module.title}</span>
                <ChevronDown
                  className={cn(
                    'h-4 w-4 transition-transform',
                    openModules.includes(module.id) && 'rotate-180'
                  )}
                />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenu className="pl-4 py-1">
                  {module.lessons.map((lesson) => (
                    <SidebarMenuItem key={lesson.id}>
                      <SidebarMenuButton
                        isActive={lesson.id === activeLessonId}
                        className="flex justify-between items-center w-full"
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
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
