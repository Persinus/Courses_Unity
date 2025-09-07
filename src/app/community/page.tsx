
"use client";

import { useState } from 'react';
import { Github } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

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
import { cn } from '@/lib/utils';

const allRepos = [
  // 2D
  { name: 'Unity2D-Components', author: 'cmilr', description: 'Một loạt các thành phần Unity C# không ngừng phát triển cho các game 2D.', stars: '1.2k', href: 'https://github.com/cmilr/Unity2D-Components', category: '2D' },
  { name: 'DeadSimple-Pixel-Perfect-Camera', author: 'cmilr', description: 'Một script camera orthographic pixel perfect cực kỳ dễ sử dụng cho các cảnh 2D trong Unity.', stars: '347', href: 'https://github.com/cmilr/DeadSimple-Pixel-Perfect-Camera', category: '2D' },
  { name: 'StaticBluredScreen', author: 'mob-sakai', description: 'Làm mờ màn hình tĩnh (không theo thời gian thực) cho Unity.', stars: '433', href: 'https://github.com/mob-sakai/StaticBluredScreen', category: '2D' },
  { name: 'AtlasImage', author: 'mob-sakai', description: 'AtlasImage là một thành phần đồ họa sử dụng SpriteAtlas cho uGUI.', stars: '369', href: 'https://github.com/mob-sakai/AtlasImage', category: '2D' },
  { name: 'SpriteDicing', author: 'Elringus', description: 'Phần mở rộng cho Unity game engine để làm việc với các sprite được cắt nhỏ.', stars: '754', href: 'https://github.com/Elringus/SpriteDicing', category: '2D' },
  { name: 'DataRenderer2D', author: 'geniikw', description: 'Tạo các mesh như đường thẳng, đa giác, v.v. trong unity3d.', stars: '185', href: 'https://github.com/geniikw/DataRenderer2D', category: '2D' },
  { name: 'UnitySpline2D', author: 'sinbad', description: 'Tiện ích spline 2D cho Unity.', stars: '232', href: 'https://github.com/sinbad/UnitySpline2D', category: '2D' },
  { name: 'Aseprite Importer for Unity', author: '2YY', description: 'Tạo Animator Controller và Animation Clip từ file JSON được xuất ra từ Aseprite.', stars: '215', href: 'https://github.com/2YY/aseprite-importer-for-unity', category: '2D' },
  // 2D Bones / IK
  { name: 'DragonBonesCSharp', author: 'DragonBones', description: 'Runtime DragonBones cho C#.', stars: '547', href: 'https://github.com/DragonBones/DragonBonesCSharp', category: '2D Bones / IK' },
  { name: 'Spine Runtimes', author: 'EsotericSoftware', description: 'Bộ sưu tập các runtime của Spine, bao gồm cả phiên bản cho Unity3D.', stars: '6.1k', href: 'https://github.com/EsotericSoftware/spine-runtimes', category: '2D Bones / IK' },
  { name: 'UnityVoxelTools', author: 'meniku', description: 'Bộ sưu tập các tiện ích Voxel cho Unity.', stars: '211', href: 'https://github.com/meniku/UnityVoxelTools', category: '2D Bones / IK' },
  // 3D Bones / IK
  { name: 'EZSoftBone', author: 'EZhex1991', description: 'Một trình mô phỏng động học đơn giản cho Unity, bạn có thể sử dụng nó để mô phỏng tóc/đuôi/ngực/váy và các vật thể mềm khác.', stars: '1.2k', href: 'https://github.com/EZhex1991/EZSoftBone', category: '3D Bones / IK' },
  { name: 'Automatic-DynamicBone', author: 'OneYoungMean', description: 'Hệ thống lò xo cho xương và vải trong Unity, dựa trên Job System.', stars: '750', href: 'https://github.com/OneYoungMean/Automatic-DynamicBone', category: '3D Bones / IK' },
  { name: 'Aim-IK', author: 'ehsan-mohammadi', description: 'Một gói Unity để định hướng đầu (và cột sống) của nhân vật một cách thủ tục mà không cần dữ liệu hoạt ảnh.', stars: '1.1k', href: 'https://github.com/ehsan-mohammadi/Aim-IK', category: '3D Bones / IK' },
  { name: 'Hairibar.Ragdoll', author: 'hairibar', description: 'Một gói để tạo hoạt ảnh cho ragdoll thông qua các keyframe animation.', stars: '458', href: 'https://github.com/hairibar/Hairibar.Ragdoll', category: '3D Bones / IK' },
  // AI
  { name: 'UnityHFSM', author: 'Inspiaaa', description: 'Một thư viện máy trạng thái hữu hạn phân cấp (HFSM) nhanh và đã được kiểm chứng cho Unity.', stars: '522', href: 'https://github.com/Inspiaaa/UnityHFSM', category: 'AI' },
  { name: 'Unity Movement AI', author: 'antonpantev', description: 'Một thư viện các script AI di chuyển phổ biến được gọi là Steering Behaviors.', stars: '1.7k', href: 'https://github.com/antonpantev/unity-movement-ai', category: 'AI' },
  { name: 'Crystal AI', author: 'igiagkiozis', description: 'Một Utility AI cho C# và Unity.', stars: '488', href: 'https://github.com/igiagkiozis/CrystalAI', category: 'AI' },
  { name: 'NPBehave', author: 'meniku', description: 'Cây hành vi (Behavior Trees) điều khiển bằng sự kiện cho Unity 3D.', stars: '965', href: 'https://github.com/meniku/NPBehave', category: 'AI' },
  { name: 'Path-Creator', author: 'SebLague', description: 'Tài sản tạo đường dẫn (path) cho việc phát triển game trên Unity.', stars: '4.5k', href: 'https://github.com/SebLague/Path-Creator', category: 'AI' },
  { name: 'NavMeshPlus', author: 'h8man', description: 'Giải pháp tìm đường NavMesh cho game 2D trên Unity.', stars: '1.9k', href: 'https://github.com/h8man/NavMeshPlus', category: 'AI' },
  { name: 'behaviac', author: 'Tencent', description: 'Behaviac là một framework phát triển AI cho game và cũng có thể được sử dụng như một công cụ thiết kế prototype game nhanh chóng.', stars: '3.6k', href: 'https://github.com/Tencent/behaviac', category: 'AI' },
  { name: 'GOAP', author: 'crashkonijn', description: 'Một hệ thống GOAP đa luồng cho Unity3D.', stars: '589', href: 'https://github.com/crashkonijn/GOAP', category: 'AI' },
  { name: 'DotRecast', author: 'ikpil', description: 'Một bản port của Recast & Detour, bộ công cụ lưới điều hướng (navigation mesh) cho game, Unity3D, máy chủ, viết bằng C#.', stars: '501', href: 'https://github.com/ikpil/DotRecast', category: 'AI' },
  // Analyzer
  { name: 'UnityHeapExplorer', author: 'pschraut', description: 'Một trình phân tích, gỡ lỗi và hồ sơ bộ nhớ cho Unity 2019.3 trở lên.', stars: '1.5k', href: 'https://github.com/pschraut/UnityHeapExplorer', category: 'Analyzer' },
  { name: 'CrashReporter', author: 'nskrkmz', description: 'Công cụ này được dùng để phát hiện nhanh các lỗi không được xử lý trong dự án Unity và lưu báo cáo chi tiết.', stars: '128', href: 'https://github.com/nskrkmz/CrashReporter', category: 'Analyzer' },
  // Animation
  { name: 'reanimation', author: 'aarthificial', description: 'Một animator thay thế cho Unity được thiết kế riêng cho hoạt ảnh truyền thống.', stars: '719', href: 'https://github.com/aarthificial/reanimation', category: 'Animation' },
  { name: 'AnimeTask', author: 'kyubuns', description: 'Thư viện Task Animation cho Unity.', stars: '272', href: 'https://github.com/kyubuns/AnimeTask', category: 'Animation' },
  { name: 'Mesh-Animation', author: 'codewriter-packages', description: 'Thư viện hoạt ảnh dựa trên vertex shader GPU tốc độ cao cho Unity.', stars: '454', href: 'https://github.com/codewriter-packages/Mesh-Animation', category: 'Animation' },
  // Anti-Cheat
  { name: 'SafeValues', author: 'ookii-tsuki', description: 'Một thư viện Unity đơn giản để chống gian lận.', stars: '159', href: 'https://github.com/ookii-tsuki/SafeValues', category: 'Anti-Cheat' },
  // Art Tools
  { name: 'XdUnityUI', author: 'itouh2-i0plus', description: 'Công cụ chuyển đổi từ AdobeXd sang UnityUI.', stars: '535', href: 'https://github.com/itouh2-i0plus/XdUnityUI', category: 'Art Tools' },
  { name: 'Materialize', author: 'BoundingBoxSoftware', description: 'Chương trình để chuyển đổi hình ảnh thành vật liệu để sử dụng trong game.', stars: '10.3k', href: 'https://github.com/BoundingBoxSoftware/Materialize', category: 'Art Tools' },
  // Asset Bundle / Addressable Assets
  { name: 'unity-addressable-importer', author: 'favoyang', description: 'Một trình nhập tài sản addressable dựa trên quy tắc.', stars: '1.2k', href: 'https://github.com/favoyang/unity-addressable-importer', category: 'Asset Bundle' },
  { name: 'KEngine', author: 'mr-kelly', description: 'Một framework asset bundle cho Unity với giấy phép LGPL.', stars: '1.5k', href: 'https://github.com/mr-kelly/KEngine', category: 'Asset Bundle' },
  // Audio Manager
  { name: 'Unity-Audio-Manager', author: 'MathewHDYT', description: 'Plugin cho phép dễ dàng phát/thay đổi/dừng/tắt tiếng/... âm thanh trong 2D/3D.', stars: '462', href: 'https://github.com/MathewHDYT/Unity-Audio-Manager', category: 'Audio' },
  // Build Tools and CI
  { name: 'unity-actions', author: 'webbertakken', description: 'Github actions để kiểm thử và build các dự án Unity.', stars: '2.5k', href: 'https://github.com/webbertakken/unity-actions', category: 'Build Tools' },
  // Camera
  { name: 'Unity Pixel Camera', author: 'ChemiKhazi', description: 'Một camera pixel perfect không phụ thuộc vào độ phân giải cho Unity.', stars: '525', href: 'https://github.com/ChemiKhazi/UnityPixelCamera', category: 'Camera' },
  // Character Controllers
  { name: 'CharacterController2D', author: 'prime31', description: 'Tương tự như component CharacterController có sẵn của Unity.', stars: '3.6k', href: 'https://github.com/prime31/CharacterController2D', category: 'Character Controller' },
  { name: 'Ultimate-2D-Controller', author: 'Matthew-J-Spencer', description: 'Một điểm khởi đầu tuyệt vời cho bộ điều khiển 2D của bạn.', stars: '1.4k', href: 'https://github.com/Matthew-J-Spencer/Ultimate-2D-Controller', category: 'Character Controller' },
  { name: 'SuperCharacterController', author: 'IronWarrior', description: 'Character Controller tùy chỉnh cho Unity.', stars: '1.7k', href: 'https://github.com/IronWarrior/SuperCharacterController', category: 'Character Controller' },
  // ... and so on for all other repos
];

const categories = [
  'All', '2D', '2D Bones / IK', '3D Bones / IK', 'AI', 'Analyzer', 'Animation', 
  'Anti-Cheat', 'Art Tools', 'Asset Bundle', 'Audio', 'Build Tools', 'Camera', 
  'Character Controller', 'Controller Mappings', 'Console', 'DOTS', 'Dependency Injection',
  'Document Reader', 'ECS Framework', 'Editor', 'Effect and Shaders', 
  'Embedding', 'Framework', 'Gameplay', 'Gizmos', 'Input', 'Job System', 'Level Editor', 
  'Light', 'Lua', 'Machine Learning', 'Media Player', 'Meshes', 'Modding', 'Monetization', 
  'Networking', 'Node Graph'
];


export default function CommunityPage() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredRepos = activeFilter === 'All'
    ? allRepos
    : allRepos.filter(repo => repo.category === activeFilter);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/40">
        <AppSidebar />
        <div className="flex flex-1 flex-col">
          <Header />
          <main className="flex-1 p-4 sm:px-6 md:gap-8 md:p-6">
            <div className="flex flex-col mb-6">
              <h1 className="text-3xl font-bold mb-2">Kho tài nguyên cộng đồng</h1>
              <p className="text-muted-foreground">Khám phá các công cụ, framework và tài sản mã nguồn mở hữu ích từ cộng đồng Unity.</p>
            </div>
            
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button 
                    key={category}
                    variant={activeFilter === category ? "default" : "outline"}
                    onClick={() => setActiveFilter(category)}
                    className="rounded-full"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredRepos.map((repo, index) => (
                <Card key={index} className="flex flex-col hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="flex-row items-start gap-4">
                     <Image
                        src={`https://github.com/${repo.author}.png`}
                        alt={`Avatar of ${repo.author}`}
                        width={40}
                        height={40}
                        className="rounded-full border"
                      />
                    <div className="flex-grow">
                      <CardTitle>
                         <Link href={repo.href} target="_blank" rel="noopener noreferrer" className="hover:underline">
                          {repo.name}
                         </Link>
                      </CardTitle>
                       <CardDescription>bởi {repo.author}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm text-muted-foreground">{repo.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <Badge variant="secondary">⭐️ {repo.stars}</Badge>
                     <Button asChild variant="ghost" size="sm">
                       <Link href={repo.href} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-4 w-4" />
                          Github
                       </Link>
                     </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

    