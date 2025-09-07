
import { Github } from 'lucide-react';
import Link from 'next/link';

import AppSidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { SidebarProvider } from '@/components/ui/sidebar';


const githubRepos = [
  {
    name: 'Unity Engine Official',
    author: 'Unity-Technologies',
    description: 'The official source code for the Unity Engine and its components. Great for deep dives and understanding the core.',
    stars: '11k',
    href: 'https://github.com/Unity-Technologies/UnityCsReference',
  },
  {
    name: 'Awesome Unity',
    author: 'RyanNielson',
    description: 'A curated list of awesome Unity assets, resources, and more. A must-have bookmark for any Unity developer.',
    stars: '6.2k',
    href: 'https://github.com/RyanNielson/awesome-unity',
  },
  {
    name: 'UniRx - Reactive Extensions for Unity',
    author: 'neuecc',
    description: 'A reimplementation of Reactive Extensions for Unity, enabling a powerful reactive programming paradigm for game logic.',
    stars: '4.8k',
    href: 'https://github.com/neuecc/UniRx',
  },
  {
    name: 'ML-Agents Toolkit',
    author: 'Unity-Technologies',
    description: 'The official Unity toolkit for creating and training intelligent agents using deep reinforcement learning.',
    stars: '15k',
    href: 'https://github.com/Unity-Technologies/ml-agents',
  },
];


export default function CommunityPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/40">
        <AppSidebar />
        <div className="flex flex-1 flex-col">
          <Header />
          <main className="flex-1 p-4 sm:px-6 md:gap-8 md:p-6">
            <div className="flex items-center mb-6">
                <h1 className="text-2xl font-bold">Community Resources</h1>
            </div>
            <div>
                <h2 className="text-xl font-semibold mb-4">Useful Github Repositories</h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {githubRepos.map((repo, index) => (
                    <Card key={index} className="flex flex-col">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-xl">
                           <Github className="h-5 w-5" />
                           <Link href={repo.href} target="_blank" rel="noopener noreferrer" className="hover:underline">
                            {repo.name}
                           </Link>
                        </CardTitle>
                         <CardDescription>by {repo.author}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="text-sm text-muted-foreground">{repo.description}</p>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center">
                        <Badge variant="secondary">⭐️ {repo.stars}</Badge>
                         <Button asChild variant="outline" size="sm">
                           <Link href={repo.href} target="_blank" rel="noopener noreferrer">
                              View on Github
                           </Link>
                         </Button>
                      </CardFooter>
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
