"use client";

import React, { useState } from 'react';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { COURSE_CONTENT } from '@/lib/content';
import { CheckCircle2, ChevronDown, BookOpen, Code, Dot, Library, LayoutDashboard, Settings, LifeBuoy } from 'lucide-react';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function Logo() {
  const { state } = useSidebar();
  return (
    <Link
      href="#"
      className="flex items-center gap-2.5 font-bold text-lg font-headline"
    >
      <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg text-primary-foreground">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
        >
          <path d="M21.5 12a9.5 9.5 0 1 1-19 0 9.5 9.5 0 0 1 19 0Z" />
          <path d="M12 2.5v19" />
          <path d="M2.5 12h19" />
        </svg>
      </div>
      <span className={cn(state === 'collapsed' && 'hidden')}>Unity Codex</span>
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
  const { state } = useSidebar();
  const pathname = usePathname();

  // In a real app, this would come from the URL
  const activeLessonId = 'intro-to-unity-editor';

  const generalMenuItems = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/assets', icon: Library, label: 'Asset Library' },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {generalMenuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={item.label}
              >
                <Link href={item.href}>
                  <item.icon className="h-5 w-5" />
                  <span className={cn(state === 'collapsed' && 'hidden')}>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        
        <div className="mt-4 pt-4 border-t border-sidebar-border">
          <p className={cn("px-4 text-xs font-semibold text-sidebar-foreground/70 mb-2", state === 'collapsed' && 'hidden')}>
            Course Content
          </p>
          <SidebarMenu>
            {COURSE_CONTENT.map((module) => {
              const Icon = moduleIcons[module.id] || Dot;
              return (
                <Collapsible
                  key={module.id}
                  open={openModules.includes(module.id)}
                  onOpenChange={(isOpen) => {
                    setOpenModules((prev) =>
                      isOpen
                        ? [...prev, module.id]
                        : prev.filter((id) => id !== module.id)
                    );
                  }}
                  className="w-full"
                >
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      variant="ghost"
                      className="w-full justify-start gap-2 px-3"
                      tooltip={module.title}
                    >
                      <Icon className="h-5 w-5" />
                      <span className={cn('flex-1 text-left', state === 'collapsed' && 'hidden')}>
                        {module.title}
                      </span>
                      <ChevronDown
                        className={cn(
                          'h-4 w-4 transition-transform',
                          openModules.includes(module.id) && 'rotate-180',
                          state === 'collapsed' && 'hidden'
                        )}
                      />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenu className={cn("pl-7", state === 'collapsed' && 'hidden')}>
                      {module.lessons.map((lesson) => (
                        <SidebarMenuItem key={lesson.id} className="my-1">
                          <SidebarMenuButton
                            size="sm"
                            isActive={lesson.id === activeLessonId}
                            className="flex justify-between items-center w-full"
                            tooltip={lesson.title}
                            asChild
                          >
                            <Link href="#">
                              <span>{lesson.title}</span>
                              {completedLessons.includes(lesson.id) && (
                                <CheckCircle2 className="h-4 w-4 text-accent" />
                              )}
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </CollapsibleContent>
                </Collapsible>
              )
            })}
          </SidebarMenu>
        </div>
      </SidebarContent>
      <SidebarFooter>
         <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Settings" asChild>
                <Link href="#">
                  <Settings />
                  <span className={cn(state === 'collapsed' && 'hidden')}>Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Help & Support" asChild>
                <Link href="#">
                  <LifeBuoy />
                  <span className={cn(state === 'collapsed' && 'hidden')}>Help & Support</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}