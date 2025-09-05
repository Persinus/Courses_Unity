
"use client";

import React from 'react';
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
import { BookOpen, Library, LayoutDashboard, Settings, LifeBuoy } from 'lucide-react';
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

export default function AppSidebar() {
  const { state } = useSidebar();
  const pathname = usePathname();

  const menuItems = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/courses', icon: BookOpen, label: 'Khóa học' },
    { href: '/assets', icon: Library, label: 'Asset Library' },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith(item.href)}
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
