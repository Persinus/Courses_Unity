
import {
  Bell,
  BookOpen,
  Bot,
  Calendar,
  CheckCircle,
  CircleDollarSign,
  Clock,
  Flame,
  Plus,
  Search,
  User,
  Video,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import AppSidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { SidebarProvider } from '@/components/ui/sidebar';

function StatCard({
  icon: Icon,
  title,
  value,
  description,
  color,
}: {
  icon: React.ElementType;
  title: string;
  value: string;
  description: string;
  color: string;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={`h-5 w-5 ${color}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

function NotificationItem({
  icon: Icon,
  title,
  description,
  color,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className={`rounded-full bg-opacity-20 p-2 ${color}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Button variant="ghost" size="icon" className="ml-auto h-8 w-8">
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

function ChevronRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

export default function DashboardPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-[#F7F8FA] dark:bg-gray-950">
        <AppSidebar />
        <div className="flex flex-1 flex-col">
          <Header />
          <main className="flex-1 p-6 md:p-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <h1 className="mb-6 text-3xl font-bold">Dashboard</h1>

                <Card className="flex flex-col items-center justify-between rounded-2xl bg-white p-8 shadow-sm dark:bg-gray-900 md:flex-row">
                  <div className="text-center md:text-left">
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                      Hi, George!
                    </h2>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                      What are we learning today?
                    </p>
                    <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 md:justify-start">
                      <Link
                        href="#"
                        className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-primary dark:text-gray-300"
                      >
                        <BookOpen className="h-4 w-4 text-yellow-500" />
                        Continue Lesson
                      </Link>
                      <Link
                        href="#"
                        className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-primary dark:text-gray-300"
                      >
                        <Flame className="h-4 w-4 text-red-500" />
                        Browse Projects
                      </Link>
                    </div>
                  </div>
                  <div className="mt-6 md:mt-0">
                    <Image
                      src="https://picsum.photos/200/200"
                      width={160}
                      height={160}
                      alt="Mascot"
                      data-ai-hint="cute bear mascot"
                      className="rounded-full"
                    />
                  </div>
                </Card>

                <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  <StatCard
                    icon={CheckCircle}
                    title="Courses Completed"
                    value="4"
                    description="+1 this month"
                    color="text-green-500"
                  />
                  <StatCard
                    icon={Clock}
                    title="Hours Learned"
                    value="52.5"
                    description="+8 hours this week"
                    color="text-blue-500"
                  />
                  <StatCard
                    icon={Video}
                    title="Active Projects"
                    value="3"
                    description="1 past due"
                    color="text-red-500"
                  />
                  <StatCard
                    icon={CircleDollarSign}
                    title="Current Rank"
                    value="Gold Tier"
                    description="Top 15%"
                    color="text-yellow-500"
                  />
                </div>
              </div>

              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Notifications</h2>
                  <Button variant="link" className="text-primary">
                    See all
                  </Button>
                </div>
                <Card className="rounded-2xl p-6 shadow-sm">
                  <div className="space-y-6">
                    <NotificationItem
                      icon={Bot}
                      title="New AI lesson available!"
                      description="Introduction to AI in Unity."
                      color="bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400"
                    />
                    <NotificationItem
                      icon={User}
                      title="Your project was reviewed"
                      description="Adam left feedback on 'Platformer Game'."
                      color="bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400"
                    />
                    <NotificationItem
                      icon={Calendar}
                      title="Live Q&A session tomorrow"
                      description="With the creators of Unity."
                      color="bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400"
                    />
                  </div>
                </Card>
                <Button className="w-full" size="lg">
                  <Plus className="mr-2 h-5 w-5" />
                  Start New Project
                </Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
