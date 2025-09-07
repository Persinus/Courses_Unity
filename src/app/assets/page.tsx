
import { Download, Library, ListFilter, Search, Github } from 'lucide-react';
import Image from 'next/image';
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
import { Input } from '@/components/ui/input';
import { SidebarProvider } from '@/components/ui/sidebar';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const assets = [
  {
    name: 'Medieval Castle Pack',
    category: '3D Models',
    image: 'https://picsum.photos/600/400',
    hint: 'castle medieval',
  },
  {
    name: 'Sci-Fi Hero Character',
    category: '3D Models',
    image: 'https://picsum.photos/600/400',
    hint: 'scifi character',
  },
  {
    name: 'Pixel Art Platformer Tileset',
    category: 'Sprites',
    image: 'https://picsum.photos/600/400',
    hint: 'pixel art',
  },
  {
    name: '8-Bit Music Pack',
    category: 'Audio',
    image: 'https://picsum.photos/600/400',
    hint: 'music audio',
  },
  {
    name: 'Forest Environment Set',
    category: '3D Models',
    image: 'https://picsum.photos/600/400',
    hint: 'forest environment',
  },
  {
    name: 'Fantasy RPG UI Kit',
    category: 'Sprites',
    image: 'https://picsum.photos/600/400',
    hint: 'fantasy ui',
  },
  {
    name: 'Casual Game Sound FX',
    category: 'Audio',
    image: 'https://picsum.photos/600/400',
    hint: 'game sounds',
  },
  {
    name: 'Low Poly Vehicle Collection',
    category: '3D Models',
    image: 'https://picsum.photos/600/400',
    hint: 'lowpoly cars',
  },
];

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


export default function AssetLibraryPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/40">
        <AppSidebar />
        <div className="flex flex-1 flex-col">
          <Header />
          <main className="flex-1 p-4 sm:px-6 sm:py-0 md:gap-8 md:p-6">
            <Tabs defaultValue="all">
              <div className="flex items-center">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="models">3D Models</TabsTrigger>
                  <TabsTrigger value="sprites">Sprites</TabsTrigger>
                  <TabsTrigger value="audio">Audio</TabsTrigger>
                  <TabsTrigger value="github">Github hữu ích</TabsTrigger>
                </TabsList>
                <div className="ml-auto flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="h-7 gap-1">
                        <ListFilter className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                          Filter
                        </span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuCheckboxItem checked>
                        Newest
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>
                        Popular
                      </DropdownMenuCheckboxItem>
                       <DropdownMenuCheckboxItem>
                        Free
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search assets..."
                      className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
                    />
                  </div>
                </div>
              </div>
              <TabsContent value="all">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6">
                  {assets.map((asset, index) => (
                    <Card key={index} className="overflow-hidden">
                      <CardHeader className="p-0">
                        <Image
                          src={asset.image}
                          alt={asset.name}
                          width={600}
                          height={400}
                          data-ai-hint={asset.hint}
                          className="aspect-video object-cover"
                        />
                      </CardHeader>
                      <CardContent className="p-4">
                        <Badge variant="outline" className="mb-2">
                          {asset.category}
                        </Badge>
                        <CardTitle className="text-lg">{asset.name}</CardTitle>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
               <TabsContent value="github">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
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
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
