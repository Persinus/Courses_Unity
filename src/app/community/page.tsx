
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

const repoCategories = [
  {
    title: '2D',
    repos: [
      {
        name: 'Unity2D-Components',
        author: 'cmilr',
        description: 'Một loạt các thành phần Unity C# không ngừng phát triển cho các game 2D, bao gồm các lớp cho camera pixel art, sự kiện & nhắn tin, lưu & tải dữ liệu game, xử lý va chạm, object pool, v.v.',
        stars: '1.2k',
        href: 'https://github.com/cmilr/Unity2D-Components',
      },
      {
        name: 'DeadSimple-Pixel-Perfect-Camera',
        author: 'cmilr',
        description: 'Một script camera orthographic pixel perfect cực kỳ dễ sử dụng cho các cảnh 2D trong Unity. Chỉ cần nhập một vài thông số và bạn đã có một camera pixel perfect hoạt động.',
        stars: '347',
        href: 'https://github.com/cmilr/DeadSimple-Pixel-Perfect-Camera',
      },
      {
        name: 'StaticBluredScreen',
        author: 'mob-sakai',
        description: 'Làm mờ màn hình tĩnh (không theo thời gian thực) cho Unity. Dễ dàng sử dụng làm nền cho các hộp thoại.',
        stars: '433',
        href: 'https://github.com/mob-sakai/StaticBluredScreen',
      },
      {
        name: 'AtlasImage',
        author: 'mob-sakai',
        description: 'AtlasImage là một thành phần đồ họa sử dụng SpriteAtlas cho uGUI. Ngoài ra, nó còn thêm bộ chọn sprite và trình chỉnh sửa đường viền hữu ích vào inspector.',
        stars: '369',
        href: 'https://github.com/mob-sakai/AtlasImage',
      },
      {
        name: 'SpriteDicing',
        author: 'Elringus',
        description: 'Phần mở rộng cho Unity game engine để làm việc với các sprite được cắt nhỏ (diced sprites).',
        stars: '754',
        href: 'https://github.com/Elringus/SpriteDicing',
      },
      {
        name: 'DataRenderer2D',
        author: 'geniikw',
        description: 'Tạo các mesh như đường thẳng, đa giác, v.v. trong unity3d.',
        stars: '185',
        href: 'https://github.com/geniikw/DataRenderer2D',
      },
      {
        name: 'UnitySpline2D',
        author: 'sinbad',
        description: 'Tiện ích spline 2D cho Unity.',
        stars: '232',
        href: 'https://github.com/sinbad/UnitySpline2D',
      },
      {
        name: 'Aseprite Importer for Unity',
        author: '2YY',
        description: 'Tạo Animator Controller và Animation Clip từ file JSON được xuất ra từ Aseprite.',
        stars: '215',
        href: 'https://github.com/2YY/aseprite-importer-for-unity',
      },
    ],
  },
  {
    title: '2D Bones / IK',
    repos: [
      {
        name: 'DragonBonesCSharp',
        author: 'DragonBones',
        description: 'Runtime DragonBones cho C#.',
        stars: '547',
        href: 'https://github.com/DragonBones/DragonBonesCSharp',
      },
      {
        name: 'Spine Runtimes',
        author: 'EsotericSoftware',
        description: 'Bộ sưu tập các runtime của Spine, bao gồm cả phiên bản cho Unity3D.',
        stars: '6.1k',
        href: 'https://github.com/EsotericSoftware/spine-runtimes',
      },
      {
        name: 'UnityVoxelTools',
        author: 'meniku',
        description: 'Bộ sưu tập các tiện ích Voxel cho Unity.',
        stars: '211',
        href: 'https://github.com/meniku/UnityVoxelTools',
      },
    ],
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
                <h1 className="text-3xl font-bold">Tài nguyên từ cộng đồng</h1>
            </div>

            <div className="space-y-12">
              {repoCategories.map((category) => (
                <section key={category.title}>
                  <h2 className="text-2xl font-semibold mb-6">{category.title}</h2>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {category.repos.map((repo, index) => (
                      <Card key={index} className="flex flex-col">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-xl">
                             <Github className="h-5 w-5" />
                             <Link href={repo.href} target="_blank" rel="noopener noreferrer" className="hover:underline">
                              {repo.name}
                             </Link>
                          </CardTitle>
                           <CardDescription>bởi {repo.author}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                          <p className="text-sm text-muted-foreground">{repo.description}</p>
                        </CardContent>
                        <CardFooter className="flex justify-between items-center">
                          <Badge variant="secondary">⭐️ {repo.stars}</Badge>
                           <Button asChild variant="outline" size="sm">
                             <Link href={repo.href} target="_blank" rel="noopener noreferrer">
                                Xem trên Github
                             </Link>
                           </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
