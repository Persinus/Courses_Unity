
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
import { COURSE_STRUCTURE } from '@/lib/content';
import { CheckCircle2, ChevronDown, BookOpen, Code, Dot, Library, LayoutDashboard, Settings, LifeBuoy, Folder, File, GraduationCap } from 'lucide-react';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function Logo() {
  const { state } = useSidebar();
  return (
    <Link
      href="/dashboard"
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

const categoryIcons: { [key: string]: React.ElementType } = {
  'basic-programming': Code,
  'data-structures': Folder,
  'design-patterns': File,
  'backend-game': Settings,
  'advanced-programming': GraduationCap,
};

export default function AppSidebar() {
  const [completedLessons] = useLocalStorage<string[]>('completedLessons', []);
  const [openSections, setOpenSections] = useState<string[]>(['intern', 'basic-programming']);
  const { state } = useSidebar();
  const pathname = usePathname();
  
  const activeLessonId = pathname.split('/').pop();

  const generalMenuItems = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/assets', icon: Library, label: 'Asset Library' },
  ];

  const handleOpenChange = (id: string, isOpen: boolean) => {
    setOpenSections((prev) =>
      isOpen ? [...prev, id] : prev.filter((openId) => openId !== id)
    );
  };

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
          <SidebarMenu>
            {COURSE_STRUCTURE.map((level) => (
              <Collapsible
                key={level.id}
                open={openSections.includes(level.id)}
                onOpenChange={(isOpen) => handleOpenChange(level.id, isOpen)}
                className="w-full"
              >
                <CollapsibleTrigger className="w-full px-2">
                  <div className={cn('flex items-center w-full h-8', state === 'collapsed' && 'justify-center')}>
                     <span className={cn('font-semibold text-sm', state === 'collapsed' && 'hidden')}>{level.title}</span>
                     <ChevronDown
                        className={cn(
                          'ml-auto h-4 w-4 transition-transform',
                          openSections.includes(level.id) && 'rotate-180',
                           state === 'collapsed' && 'hidden'
                        )}
                      />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className={cn(state === 'collapsed' ? 'hidden' : 'pl-2')}>
                  {level.categories.map((category) => (
                     <Collapsible
                      key={category.id}
                      open={openSections.includes(category.id)}
                      onOpenChange={(isOpen) => handleOpenChange(category.id, isOpen)}
                      className="w-full"
                    >
                      <CollapsibleTrigger asChild>
                         <SidebarMenuButton variant="ghost" className="w-full justify-start gap-2 px-3" tooltip={category.title}>
                           {React.createElement(categoryIcons[category.id] || Dot, { className: 'h-5 w-5 flex-shrink-0' })}
                           <span className={cn('flex-1 text-left text-sm', state === 'collapsed' && 'hidden')}>
                             {category.title}
                           </span>
                           <ChevronDown
                             className={cn(
                               'h-4 w-4 transition-transform',
                                openSections.includes(category.id) && 'rotate-180',
                                state === 'collapsed' && 'hidden'
                             )}
                           />
                         </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent className={cn(state === 'collapsed' && 'hidden', 'pl-4')}>
                        {category.modules.map(module => (
                          <div key={module.id} className="py-1">
                            <p className="px-3 text-xs font-semibold text-sidebar-foreground/50 mb-1">{module.title}</p>
                            <SidebarMenu>
                              {module.lessons.map((lesson) => (
                                  <SidebarMenuItem key={lesson.id}>
                                  <SidebarMenuButton
                                      size="sm"
                                      isActive={lesson.id === activeLessonId}
                                      className="flex justify-between items-center w-full h-auto py-2"
                                      tooltip={lesson.title}
                                      asChild
                                  >
                                      <Link href={`/lessons/${lesson.id}`}>
                                      <span className="flex-grow text-left whitespace-normal leading-normal">{lesson.title}</span>
                                      {completedLessons.includes(lesson.id) && (
                                          <CheckCircle2 className="h-4 w-4 text-accent ml-2 flex-shrink-0" />
                                      )}
                                      </Link>
                                  </SidebarMenuButton>
                                  </SidebarMenuItem>
                              ))}
                            </SidebarMenu>
                          </div>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            ))}
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
