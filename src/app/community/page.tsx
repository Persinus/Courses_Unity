
"use client";

import { useState, useEffect } from 'react';
import { Github, ListFilter, Star, GitFork, AlertCircle, Calendar, Shield, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

import AppSidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import StatusIndicator from '@/components/community/StatusIndicator';
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarProvider } from '@/components/ui/sidebar';

interface Repo {
    name: string;
    author: string;
    description: string;
    stars: string;
    href: string;
    category: string;
}

interface RepoDetails extends Repo {
    forks_count?: number;
    open_issues_count?: number;
    license?: { name: string };
    created_at?: string;
    pushed_at?: string;
}

const allRepos: Repo[] = [
    // ... (same repo list as before)
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
    { name: 'TurboSequence', author: 'LukasFratzl', description: 'Hệ thống đám đông GPU dựa trên khung xương cho UE5.', stars: '468', href: 'https://github.com/LukasFratzl/TurboSequence', category: '3D Bones / IK' },
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
    // Asset Bundle
    { name: 'unity-addressable-importer', author: 'favoyang', description: 'Một trình nhập tài sản addressable dựa trên quy tắc.', stars: '1.2k', href: 'https://github.com/favoyang/unity-addressable-importer', category: 'Asset Bundle' },
    { name: 'KEngine', author: 'mr-kelly', description: 'Một framework asset bundle cho Unity với giấy phép LGPL.', stars: '1.5k', href: 'https://github.com/mr-kelly/KEngine', category: 'Asset Bundle' },
    // Audio
    { name: 'Unity-Audio-Manager', author: 'MathewHDYT', description: 'Plugin cho phép dễ dàng phát/thay đổi/dừng/tắt tiếng/... âm thanh trong 2D/3D.', stars: '462', href: 'https://github.com/MathewHDYT/Unity-Audio-Manager', category: 'Audio' },
    { name: 'Sonniss GDC 2018 Pack', author: 'Sonniss', description: 'Gói âm thanh 30GB miễn phí sử dụng.', stars: 'N/A', href: 'https://sonniss.com/gameaudiogdc18/', category: 'Audio' },
    // Build Tools
    { name: 'unity-actions', author: 'webbertakken', description: 'Github actions để kiểm thử và build các dự án Unity.', stars: '2.5k', href: 'https://github.com/webbertakken/unity-actions', category: 'Build Tools' },
    // Camera
    { name: 'Unity Pixel Camera', author: 'ChemiKhazi', description: 'Một camera pixel perfect không phụ thuộc vào độ phân giải cho Unity.', stars: '525', href: 'https://github.com/ChemiKhazi/UnityPixelCamera', category: 'Camera' },
    // Character Controller
    { name: 'CharacterController2D', author: 'prime31', description: 'Tương tự như component CharacterController có sẵn của Unity.', stars: '3.6k', href: 'https://github.com/prime31/CharacterController2D', category: 'Character Controller' },
    { name: 'Ultimate-2D-Controller', author: 'Matthew-J-Spencer', description: 'Một điểm khởi đầu tuyệt vời cho bộ điều khiển 2D của bạn.', stars: '1.4k', href: 'https://github.com/Matthew-J-Spencer/Ultimate-2D-Controller', category: 'Character Controller' },
    { name: 'SuperCharacterController', author: 'IronWarrior', description: 'Character Controller tùy chỉnh cho Unity.', stars: '1.7k', href: 'https://github.com/IronWarrior/SuperCharacterController', category: 'Character Controller' },
    // Controller Mappings
    { name: 'Dualshock 3 (PS3)', author: 'UnityCommunity', description: 'Sơ đồ nút cho tay cầm Dualshock 3.', stars: 'N/A', href: 'https://forum.unity.com/threads/ps3-button-map.89288/', category: 'Controller Mappings' },
    { name: 'Dualshock 4 (PS4)', author: 'E.Tellier', description: 'Sơ đồ nút cho tay cầm Dualshock 4.', stars: 'N/A', href: 'https://twitter.com/erik_tellier/status/1071457079854944256', category: 'Controller Mappings' },
    // Console
    { name: 'Lunar Unity Mobile Console', author: 'SpaceMadness', description: 'Trình ghi log Unity hiệu suất cao cho iOS/Android được xây dựng bằng UI gốc của nền tảng.', stars: '1.1k', href: 'https://github.com/SpaceMadness/lunar-unity-console', category: 'Console' },
    // DOTS
    { name: 'unity-ecs-navmesh', author: 'zulfajuniadi', description: 'Một demo triển khai Unity Entity Component System với NavMesh.', stars: '243', href: 'https://github.com/zulfajuniadi/unity-ecs-navmesh', category: 'DOTS' },
    { name: 'ECS-Tween', author: 'Xerios', description: 'Hệ thống tweening đơn giản cho Unity sử dụng ECS, hoạt động với cả GameObjects.', stars: '200', href: 'https://github.com/Xerios/ECS-Tween', category: 'DOTS' },
    // Dependency Injection
    { name: 'Zenject', author: 'modesttree', description: 'Framework Dependency Injection cho Unity3D.', stars: '9.2k', href: 'https://github.com/modesttree/Zenject', category: 'Dependency Injection' },
    { name: 'VContainer', author: 'hadashiA', description: 'Thư viện DI siêu nhanh, mã nguồn tối thiểu, không GC cho Unity (IL2CPP).', stars: '1.8k', href: 'https://github.com/hadashiA/VContainer', category: 'Dependency Injection' },
    // Document Reader
    { name: 'GoogleSheetsUnity', author: '5argon', description: 'Lấy dữ liệu từ Google Sheets riêng tư của bạn vào Unity (chỉ đọc).', stars: '665', href: 'https://github.com/5argon/GoogleSheetsUnity', category: 'Document Reader' },
    // ECS Framework
    { name: 'Entitas-CSharp', author: 'sschmid', description: 'Entitas là một framework Entity Component System (ECS) siêu nhanh dành riêng cho C# và Unity.', stars: '6.1k', href: 'https://github.com/sschmid/Entitas-CSharp', category: 'ECS Framework' },
    { name: 'LeoECS', author: 'Leopotam', description: 'LeoECS là một framework Entity Component System (ECS) nhanh được cung cấp bởi C# với tích hợp tùy chọn cho Unity.', stars: '1.2k', href: 'https://github.com/Leopotam/ecs', category: 'ECS Framework' },
    // Editor
    { name: 'Unity-QuickSheet', author: 'kimsama', description: 'Unity-QuickSheet cho phép bạn sử dụng dữ liệu từ file bảng tính trong Unity editor.', stars: '879', href: 'https://github.com/kimsama/Unity-QuickSheet', category: 'Editor' },
    { name: 'Reorderable Inspector', author: 'ChemiKhazi', description: 'Tự động tạo danh sách có thể sắp xếp lại cho các component của Unity.', stars: '1.1k', href: 'https://github.com/ChemiKhazi/ReorderableInspector', category: 'Editor' },
    // Effect and Shaders
    { name: 'KinoGlitch', author: 'keijiro', description: 'Các hiệu ứng glitch video cho Unity.', stars: '1.5k', href: 'https://github.com/keijiro/KinoGlitch', category: 'Effect and Shaders' },
    { name: 'ShaderForge', author: 'FreyaHolmer', description: 'Công cụ tạo shader bằng giao diện trực quan.', stars: '5.9k', href: 'https://github.com/FreyaHolmer/ShaderForge', category: 'Effect and Shaders' },
    // Effect-Highlighter
    { name: 'Outline-Effect', author: 'cakeslice', description: 'Hiệu ứng viền (Outline Image Effect) cho Unity.', stars: '1.1k', href: 'https://github.com/cakeslice/Outline-Effect', category: 'Effect-Highlighter' },
    // Effect-Ocean
    { name: 'crest-oceanrender', author: 'huwb', description: 'Một hệ thống đại dương tiên tiến được triển khai trong Unity3D.', stars: '2.5k', href: 'https://github.com/huwb/crest-oceanrender', category: 'Effect-Ocean' },
    // Effect-Toon
    { name: 'ToonShading', author: 'Kink3d', description: 'Một bộ sưu tập các shader "Toon" cho Unity dựa trên xấp xỉ PBR theo bước.', stars: '741', href: 'https://github.com/Kink3d/ToonShading', category: 'Effect-Toon' },
    // Embedding
    { name: 'react-native-unity-view', author: 'f111fei', description: 'Hiển thị một view Unity trong React Native.', stars: '1.4k', href: 'https://github.com/f111fei/react-native-unity-view', category: 'Embedding' },
    // Feedback Libraries
    { name: 'Juce-Feedbacks', author: 'Juce-Assets', description: 'Thư viện phản hồi mã nguồn mở là một phần của framework công cụ Juce Unity.', stars: '674', href: 'https://github.com/Juce-Assets/Juce-Feedbacks', category: 'Feedback Libraries' },
    // Framework
    { name: 'Fungus', author: 'snozbot', description: 'Một framework miễn phí và mã nguồn mở để tạo các game kể chuyện tương tác trong Unity 3D.', stars: '2.5k', href: 'https://github.com/snozbot/fungus', category: 'Framework' },
    { name: 'QFramework', author: 'liangxiegame', description: 'Framework K.I.S.S (Keep it simple, stupid) đầu tiên của bạn cho Unity 3D.', stars: '4.1k', href: 'https://github.com/liangxiegame/QFramework', category: 'Framework' },
    // Gameplay
    { name: 'UnityGameplayAbilitySystem', author: 'sjai013', description: 'Một framework thống nhất để triển khai các hệ thống kỹ năng trong Unity.', stars: '1.3k', href: 'https://github.com/sjai013/UnityGameplayAbilitySystem', category: 'Gameplay' },
    { name: 'Inventory-Pro', author: 'devdogio', description: 'Hệ thống Inventory bán chạy nhất cho Unity - nay đã miễn phí và mã nguồn mở.', stars: '1.4k', href: 'https://github.com/devdogio/Inventory-Pro', category: 'Gameplay' },
    // Gizmos
    { name: 'UGizmo', author: 'harumas', description: 'Công cụ vẽ gizmo hiệu suất cao cho Unity.', stars: '264', href: 'https://github.com/harumas/UGizmo', category: 'Gizmos' },
    // Input
    { name: 'InControl', author: 'pbhogan', description: 'Một trình quản lý input cho Unity giúp thuần hóa con quái vật tay cầm đa nền tảng.', stars: '3.1k', href: 'https://github.com/pbhogan/InControl', category: 'Input' },
    { name: 'TouchScript', author: 'TouchScript', description: 'Giải pháp multitouch hoàn chỉnh cho Unity: Win8, TUIO, Mobile.', stars: '2k', href: 'https://github.com/TouchScript/TouchScript', category: 'Input' },
    // Job System
    { name: 'ZeroAllocJobScheduler', author: 'genaray', description: 'Một bộ lập lịch công việc C# hiệu suất cao không cần cấp phát bộ nhớ.', stars: '136', href: 'https://github.com/genaray/ZeroAllocJobScheduler', category: 'Job System' },
    // Level Editor
    { name: 'Tiled2Unity', author: 'Seanba', description: 'Xuất các tệp Tiled Map Editor (TMX) vào Unity.', stars: '2.4k', href: 'https://github.com/Seanba/Tiled2Unity', category: 'Level Editor' },
    { name: 'realtime-CSG-for-unity', author: 'LogicalError', description: 'Realtime-CSG, trình chỉnh sửa cấp độ CSG cho Unity.', stars: '2.1k', href: 'https://github.com/LogicalError/realtime-CSG-for-unity', category: 'Level Editor' },
    // Light
    { name: 'Aura', author: 'raphael-ernaelsten', description: 'Ánh sáng thể tích (Volumetric Lighting) cho Unity.', stars: '2.3k', href: 'https://github.com/raphael-ernaelsten/Aura', category: 'Light' },
    // Lua
    { name: 'slua', author: 'pangweiwei', description: 'Binding lua nhanh nhất thông qua việc tạo mã tĩnh cho Unity3D và mono.', stars: '3.5k', href: 'https://github.com/pangweiwei/slua', category: 'Lua' },
    { name: 'xLua', author: 'Tencent', description: 'xLua là một plugin giải pháp hot-fix cho Unity3D, hỗ trợ android, ios, windows, osx, v.v.', stars: '8.8k', href: 'https://github.com/Tencent/xLua', category: 'Lua' },
    // Lua Utilities
    { name: 'LuaProfiler-For-Unity', author: 'ElPsyCongree', description: 'Trình phân tích hiệu năng Lua cho Unity.', stars: '500', href: 'https://github.com/ElPsyCongree/LuaProfiler-For-Unity', category: 'Lua Utilities' },
    // Machine Learning
    { name: 'MediaPipeUnityPlugin', author: 'homuler', description: 'Plugin Unity để chạy MediaPipe.', stars: '2.2k', href: 'https://github.com/homuler/MediaPipeUnityPlugin', category: 'Machine Learning' },
    // Media Player
    { name: 'LibVLCSharp', author: 'videolan', description: 'LibVLCSharp là một API âm thanh và video đa nền tảng cho các nền tảng .NET dựa trên Thư viện LibVLC của VideoLAN.', stars: '1.4k', href: 'https://github.com/videolan/LibVLCSharp', category: 'Media Player' },
    // Meshes
    { name: 'UnityMeshSimplifier', author: 'Whinarn', description: 'Đơn giản hóa lưới (mesh simplification) cho Unity.', stars: '1.4k', href: 'https://github.com/Whinarn/UnityMeshSimplifier', category: 'Meshes' },
    { name: 'SplineMesh', author: 'benoit-dumas', description: 'Một plugin Unity để tạo nội dung cong trong thời gian thực bằng các đường cong bézier.', stars: '1.8k', href: 'https://github.com/benoit-dumas/SplineMesh', category: 'Meshes' },
    // Modding
    { name: 'dotPeek', author: 'JetBrains', description: 'Trình dịch ngược .NET và trình duyệt Assembly miễn phí.', stars: 'N/A', href: 'https://www.jetbrains.com/decompiler/', category: 'Modding' },
    { name: 'Harmony', author: 'pardeike', description: 'Một thư viện để vá, thay thế và trang trí các phương thức .NET và Mono trong thời gian chạy.', stars: '4.4k', href: 'https://github.com/pardeike/Harmony', category: 'Modding' },
    // Monetization
    { name: 'Google Mobile Ads Unity Plugin', author: 'googleads', description: 'Plugin Unity chính thức cho SDK Google Mobile Ads.', stars: '1.3k', href: 'https://github.com/googleads/googleads-mobile-unity', category: 'Monetization' },
    // Networking
    { name: 'Nakama', author: 'heroiclabs', description: 'Một máy chủ xã hội và thời gian thực phân tán mã nguồn mở cho game và ứng dụng.', stars: '8.2k', href: 'https://github.com/heroiclabs/nakama', category: 'Networking' },
    { name: 'LiteNetLib', author: 'RevenantX', description: 'Thư viện UDP đáng tin cậy nhẹ cho Mono và .NET.', stars: '3.9k', href: 'https://github.com/RevenantX/LiteNetLib', category: 'Networking' },
    // Node Graph
    { name: 'xNode', author: 'Siccity', description: 'Cho phép bạn xem và chỉnh sửa các biểu đồ nút (node graphs) bên trong Unity.', stars: '3.7k', href: 'https://github.com/Siccity/xNode', category: 'Node Graph' },
    { name: 'NodeGraphProcessor', author: 'alelievr', description: 'Framework trình chỉnh sửa đồ thị nút tập trung vào xử lý dữ liệu bằng Unity UIElements và C# 4.6.', stars: '1.5k', href: 'https://github.com/alelievr/NodeGraphProcessor', category: 'Node Graph' },
    // Obfuscation
    { name: 'Ether-Uprotector', author: 'Ether2023', description: 'Trình bảo vệ mã nguồn cho các dự án Unity.', stars: '100', href: 'https://github.com/Ether2023/Ether-Uprotector', category: 'Obfuscation' },
    // Package Manager
    { name: 'NuGetForUnity', author: 'GlitchEnzo', description: 'Một trình quản lý gói NuGet cho Unity.', stars: '2.5k', href: 'https://github.com/GlitchEnzo/NuGetForUnity', category: 'Package Manager' },
    { name: 'OpenUPM', author: 'openupm', description: 'OpenUPM - Sổ đăng ký gói Unity mã nguồn mở (UPM).', stars: '1.1k', href: 'https://github.com/openupm/openupm', category: 'Package Manager' },
    // Physic
    { name: 'BulletSharpUnity3d', author: 'Phong13', description: 'Một nhánh của dự án BulletSharp để làm cho Bullet Physics Engine có thể sử dụng được từ mã C# trong Unity3d.', stars: '269', href: 'https://github.com/Phong13/BulletSharpUnity3d', category: 'Physic' },
    { name: 'JoltPhysicsUnity', author: 'seep', description: 'Binding của Jolt Physics cho Unity.', stars: '1.1k', href: 'https://github.com/seep/JoltPhysicsUnity', category: 'Physic' },
    // Playable
    { name: 'YJZPlayableGraphView', author: 'terrynoya', description: 'Trình hiển thị playable với GraphView.', stars: '344', href: 'https://github.com/terrynoya/YJZPlayableGraphView', category: 'Playable' },
    // Plugins
    { name: 'google-analytics-plugin-for-unity', author: 'googleanalytics', description: 'Plugin Google Analytics cho hệ thống tạo game Unity.', stars: '845', href: 'https://github.com/googleanalytics/google-analytics-plugin-for-unity', category: 'Plugins' },
    { name: 'uLipSync', author: 'hecomi', description: 'Plugin đồng bộ hóa môi cho Unity.', stars: '805', href: 'https://github.com/hecomi/uLipSync', category: 'Plugins' },
    // Procedural Generation
    { name: 'DungeonGenerator', author: 'jongallant', description: 'Trình tạo hầm ngục cho Unity.', stars: '752', href: 'https://github.com/jongallant/DungeonGenerator', category: 'Procedural Generation' },
    { name: 'ProceduralToolkit', author: 'Syomus', description: 'Thư viện tạo thủ tục cho Unity.', stars: '1.7k', href: 'https://github.com/Syomus/ProceduralToolkit', category: 'Procedural Generation' },
    // Pooling System
    { name: 'kPooling', author: 'Kink3d', description: 'Hệ thống object pooling có thể tùy chỉnh cho Unity.', stars: '348', href: 'https://github.com/Kink3d/kPooling', category: 'Pooling System' },
    { name: 'Replicator', author: 'ettmetal', description: 'Hệ thống pooling/tái sử dụng GameObject cho Unity.', stars: '155', href: 'https://github.com/ettmetal/Replicator', category: 'Pooling System' },
    { name: 'Eflatun.Pooling', author: 'starikcetin', description: 'Các tiện ích object pooling cho Unity.', stars: '109', href: 'https://github.com/starikcetin/Eflatun.Pooling', category: 'Pooling System' },
    // Protobuf
    { name: 'protobuf-net', author: 'protobuf-net', description: 'Thư viện Protocol Buffers cho .NET.', stars: '4.4k', href: 'https://github.com/protobuf-net/protobuf-net', category: 'Protobuf' },
    { name: 'protobuf-unity', author: '5argon', description: 'Tự động biên dịch tệp .proto thành C# trong dự án Unity khi bạn chỉnh sửa chúng.', stars: '529', href: 'https://github.com/5argon/protobuf-unity', category: 'Protobuf' },
    // Project Management
    { name: 'unity-desktop-lite', author: 'gblikas', description: 'Unity trong trình duyệt, thông qua Github Codespaces.', stars: '143', href: 'https://github.com/gblikas/unity-desktop-lite', category: 'Project Management' },
    // Runtime Editor
    { name: 'UnityRuntimeInspector', author: 'yasirkula', description: 'Giải pháp Inspector và Hierarchy cho Unity để gỡ lỗi và chỉnh sửa trong lúc chạy.', stars: '2.1k', href: 'https://github.com/yasirkula/UnityRuntimeInspector', category: 'Runtime Editor' },
    { name: 'RuntimeUnityEditor', author: 'ManlyMarco', description: 'Công cụ inspector và gỡ lỗi trong game cho các ứng dụng được tạo bằng Unity.', stars: '1.9k', href: 'https://github.com/ManlyMarco/RuntimeUnityEditor', category: 'Runtime Editor' },
    // Scriptable Object
    { name: 'unity-atoms', author: 'AdamRamberg', description: 'Các thành phần mô-đun nhỏ tận dụng sức mạnh của Scriptable Objects.', stars: '2k', href: 'https://github.com/AdamRamberg/unity-atoms', category: 'Scriptable Object' },
    { name: 'Scriptable-Framework', author: 'pablothedolphin', description: 'Một framework Unity để tạo ứng dụng mô-đun dựa trên kiến trúc ScriptableObject.', stars: '756', href: 'https://github.com/pablothedolphin/Scriptable-Framework', category: 'Scriptable Object' },
    // Scriptings
    { name: 'UnityNativeScripting', author: 'jacksondunstan', description: 'Viết script Unity bằng C++.', stars: '617', href: 'https://github.com/jacksondunstan/UnityNativeScripting', category: 'Scriptings' },
    { name: 'YarnSpinner', author: 'YarnSpinnerTool', description: 'Yarn Spinner là một công cụ để xây dựng các cuộc hội thoại tương tác trong game.', stars: '2k', href: 'https://github.com/YarnSpinnerTool/YarnSpinner', category: 'Scriptings' },
    // Scene Transition
    { name: 'UnityScreenNavigator', author: 'Haruma-K', description: 'Thư viện cho việc chuyển màn hình, hoạt ảnh chuyển tiếp, và quản lý vòng đời màn hình trong uGUI.', stars: '965', href: 'https://github.com/Haruma-K/UnityScreenNavigator', category: 'Scene Transition' },
    // Serializer
    { name: 'odin-serializer', author: 'TeamSirenix', description: 'Serializer .NET nhanh, mạnh mẽ và có thể mở rộng được xây dựng cho Unity.', stars: '1.9k', href: 'https://github.com/TeamSirenix/odin-serializer', category: 'Serializer' },
    { name: 'UnitySerializedDictionary', author: 'Prastiwar', description: 'Dictionary có thể tuần tự hóa và hiển thị trong editor của Unity.', stars: '158', href: 'https://github.com/Prastiwar/UnitySerializedDictionary', category: 'Serializer' },
    // Services
    { name: 'Devtodev', author: 'devtodev-analytics', description: 'Một giải pháp phân tích toàn diện cho các nhà phát triển game.', stars: '59', href: 'https://github.com/devtodev-analytics/unity-sdk', category: 'Services' },
    { name: 'eos_plugin_for_unity', author: 'PlayEveryWare', description: 'Plugin Epic Online Services cho Unity (Gói UPM).', stars: '282', href: 'https://github.com/PlayEveryWare/eos_plugin_for_unity', category: 'Services' },
    // Sounds
    { name: 'usfxr', author: 'zeh', description: 'Một thư viện C# để tạo và phát các hiệu ứng âm thanh thủ tục giống như game trong Unity.', stars: '394', href: 'https://github.com/zeh/usfxr', category: 'Sounds' },
    { name: 'Reaktion', author: 'keijiro', description: 'Bộ công cụ hoạt ảnh phản ứng với âm thanh cho Unity.', stars: '2.5k', href: 'https://github.com/keijiro/Reaktion', category: 'Sounds' },
    // Threading
    { name: 'UnityMainThreadDispatcher', author: 'PimDeWitte', description: 'Một cách đơn giản, an toàn cho luồng để thực thi các hành động trên luồng chính của Unity.', stars: '1.2k', href: 'https://github.com/PimDeWitte/UnityMainThreadDispatcher', category: 'Threading' },
    { name: 'UnityAsyncRoutines', author: 'TorVestergaard', description: 'Thư viện Unity siêu nhẹ để tạo và quản lý coroutine không đồng bộ.', stars: '136', href: 'https://github.com/TorVestergaard/UnityAsyncRoutines', category: 'Threading' },
    // Terrain
    { name: 'MightyTerrainMesh', author: 'jinsek', description: 'Plugin Unity để chuyển đổi Terrain sang Mesh & Data cho Runtime Virtual Texture.', stars: '243', href: 'https://github.com/jinsek/MightyTerrainMesh', category: 'Terrain' },
    { name: 'Unity--voxel-terrain-generator', author: 'michalczemierowski', description: 'Game 3D với thế giới được tạo thủ tục từ các khối lập phương.', stars: '528', href: 'https://github.com/michalczemierowski/Unity--voxel-terrain-generator', category: 'Terrain' },
    // Timeline
    { name: 'SpineTimeline', author: '5argon', description: 'Tạo hoạt ảnh cho SkeletonAnimation hoặc SkeletonGraphic bằng Timeline của Unity.', stars: '298', href: 'https://github.com/5argon/SpineTimeline', category: 'Timeline' },
    // Tweening
    { name: 'DOTween', author: 'Demigiant', description: 'Một engine hoạt ảnh C# cho Unity. HOTween v2.', stars: '10.2k', href: 'https://github.com/Demigiant/dotween', category: 'Tweening' },
    { name: 'MagicTween', author: 'AnnulusGames', description: 'Thư viện tween cực nhanh được triển khai trong Unity ECS.', stars: '1.1k', href: 'https://github.com/AnnulusGames/MagicTween', category: 'Tweening' },
    { name: 'LitMotion', author: 'AnnulusGames', description: 'Thư viện Tween siêu nhanh và không cấp phát bộ nhớ (Zero Allocation) cho Unity.', stars: '1k', href: 'https://github.com/AnnulusGames/LitMotion', category: 'Tweening' },
    { name: 'PrimeTween', author: 'KyryloKuzyk', description: 'Thư viện tween hiệu suất cao, không cấp phát bộ nhớ cho Unity. Tạo hoạt ảnh, độ trễ và chuỗi chỉ trong một dòng mã.', stars: '1.1k', href: 'https://github.com/KyryloKuzyk/PrimeTween', category: 'Tweening' },
    { name: 'TweenPlayables', author: 'AnnulusGames', description: 'Thư viện Tween Animation cho Unity Timeline.', stars: '300', href: 'https://github.com/AnnulusGames/TweenPlayables', category: 'Tweening' },
    { name: 'LeanTween', author: 'dentedpixel', description: 'LeanTween là một engine hoạt ảnh hiệu quả cho Unity.', stars: '2.5k', href: 'https://github.com/dentedpixel/LeanTween', category: 'Tweening' },
    { name: 'GoKit', author: 'prime31', description: 'Thư viện tween nhẹ cho Unity.', stars: '512', href: 'https://github.com/prime31/GoKit', category: 'Tweening' },
    { name: 'Uween', author: 'beinteractive', description: 'Thư viện tween nhẹ cho Unity.', stars: '200', href: 'https://github.com/beinteractive/Uween', category: 'Tweening' },
    { name: 'ZestKit', author: 'prime31', description: 'Thư viện Tween cho Unity. Sự kết hợp tốt nhất của GoKit và GoKitLite trong một API dễ sử dụng.', stars: '215', href: 'https://github.com/prime31/ZestKit', category: 'Tweening' },
    { name: 'Animation-Sequencer', author: 'brunomikoski', description: 'Một công cụ trực quan cho phép bạn tạo các chuỗi hoạt ảnh của các tween và tinh chỉnh chúng trong trình editor.', stars: '400', href: 'https://github.com/brunomikoski/Animation-Sequencer', category: 'Tweening' },
    // Vehicle
    { name: 'Tork', author: 'adrenak', description: 'Hệ thống phương tiện cho Unity.', stars: '550', href: 'https://github.com/adrenak/Tork', category: 'Vehicle' },
    { name: 'Randomation-Vehicle-Physics', author: 'JustInvoke', description: 'Hệ thống vật lý phương tiện cho engine Unity.', stars: '900', href: 'https://github.com/JustInvoke/Randomation-Vehicle-Physics', category: 'Vehicle' },
    { name: 'Aircraft-Physics', author: 'gasgiant', description: 'Vật lý máy bay cánh cố định cho Unity.', stars: '400', href: 'https://github.com/gasgiant/Aircraft-Physics', category: 'Vehicle' },
    // UI
    { name: 'FairyGUI-unity', author: 'fairygui', description: 'Một framework UI linh hoạt cho Unity.', stars: '3k', href: 'https://github.com/fairygui/FairyGUI-unity', category: 'UI' },
    { name: 'LoopScrollRect', author: 'qiankanglai', description: 'UGUI ScrollRect tái sử dụng các ô để cải thiện hiệu suất, thời gian tải và draw calls.', stars: '2.5k', href: 'https://github.com/qiankanglai/LoopScrollRect', category: 'UI' },
    { name: 'MaterialUI', author: 'InvexGames', description: 'MaterialUI là một bộ UI cho Unity tuân theo các nguyên tắc thiết kế material design chính thức của Google.', stars: '1.5k', href: 'https://github.com/InvexGames/MaterialUI', category: 'UI' },
    { name: 'EnhancedScrollView', author: 'tinyantstudio', description: 'Scroll view 3D tuyệt vời cho Unity (hỗ trợ NGUI 3D UGUI).', stars: '800', href: 'https://github.com/tinyantstudio/EnhancedScrollView', category: 'UI' },
    { name: 'UIEffect', author: 'mob-sakai', description: 'UIEffect là một thành phần hiệu ứng cho phần tử uGUI trong Unity. Hãy trang trí UI của bạn với các hiệu ứng!', stars: '3k', href: 'https://github.com/mob-sakai/UIEffect', category: 'UI' },
    { name: 'ParticleEffectForUGUI', author: 'mob-sakai', description: 'Plugin này cung cấp một thành phần để render hiệu ứng hạt cho uGUI trong Unity 2018.2+.', stars: '1.4k', href: 'https://github.com/mob-sakai/ParticleEffectForUGUI', category: 'UI' },
    { name: 'FancyScrollView', author: 'setchi', description: 'Một thành phần scrollview có thể triển khai hoạt ảnh linh hoạt.', stars: '1.8k', href: 'https://github.com/setchi/FancyScrollView', category: 'UI' },
    { name: 'UIWidgets', author: 'UnityTech', description: 'UIWidgets là một gói Unity giúp các nhà phát triển tạo, gỡ lỗi và triển khai các ứng dụng hiệu quả, đa nền tảng.', stars: '3.7k', href: 'https://github.com/UnityTech/UIWidgets', category: 'UI' },
    { name: 'unity-ugui-XCharts', author: 'monitor1394', description: 'Một thư viện biểu đồ và trực quan hóa dữ liệu cho Unity.', stars: '3k', href: 'https://github.com/monitor1394/unity-ugui-XCharts', category: 'UI' },
    { name: 'dear-imgui-unity', author: 'realgamessoftware', description: 'Gói Unity cho Dear ImGui.', stars: '450', href: 'https://github.com/realgamessoftware/dear-imgui-unity', category: 'UI' },
    { name: 'ReactUnity', author: 'ReactUnity', description: 'Framework React và HTML cho Unity UI & UIToolkit.', stars: '1.7k', href: 'https://github.com/ReactUnity/core', category: 'UI' },
    { name: 'uPalette', author: 'Haruma-K', description: 'Hệ thống quản lý tập trung & thay đổi hàng loạt màu sắc cho Unity.', stars: '600', href: 'https://github.com/Haruma-K/uPalette', category: 'UI' },
    // Utilities
    { name: 'LINQ to GameObject', author: 'neuecc', description: 'Duyệt qua hệ thống phân cấp GameObject bằng LINQ.', stars: '2.2k', href: 'https://github.com/neuecc/LINQ-to-GameObject-for-Unity', category: 'Utilities' },
    { name: 'Moments', author: 'Chman', description: 'Một công cụ ghi lại và phát lại GIF nhanh chóng cho Unity.', stars: '1.4k', href: 'https://github.com/Chman/Moments', category: 'Utilities' },
    { name: 'FrameCapture', author: 'Chman', description: 'Công cụ chụp ảnh từng khung hình đơn giản cho Unity để ghi lại các đoạn replay hoặc cinematic siêu mượt.', stars: '580', href: 'https://github.com/Chman/FrameCapture', category: 'Utilities' },
    { name: 'UniRx', author: 'neuecc', description: 'Reactive Extensions cho Unity.', stars: '6.1k', href: 'https://github.com/neuecc/UniRx', category: 'Utilities' },
    { name: 'graphy', author: 'Tayx94', description: 'Graphy là trình theo dõi và gỡ lỗi tối ưu, dễ sử dụng, nhiều tính năng cho dự án Unity của bạn.', stars: '3.7k', href: 'https://github.com/Tayx94/graphy', category: 'Utilities' },
    // VR/XR
    { name: 'VRTK', author: 'thestonefox', description: 'Một bộ công cụ VR hiệu quả để xây dựng nhanh các giải pháp VR trong Unity3d.', stars: '3.9k', href: 'https://github.com/thestonefox/VRTK', category: 'VR/XR' },
    { name: 'NewtonVR', author: 'TomorrowTodayLabs', description: 'Một hệ thống tương tác thực tế ảo cho Unity dựa trên vật lý.', stars: '1.2k', href: 'https://github.com/TomorrowTodayLabs/NewtonVR', category: 'VR/XR' },
    { name: 'MixedRealityToolkit-Unity', author: 'Microsoft', description: 'MixedRealityToolkit-Unity sử dụng mã từ kho MixedRealityToolkit cơ sở và giúp việc sử dụng trong Unity dễ dàng hơn.', stars: '5.2k', href: 'https://github.com/Microsoft/MixedRealityToolkit-Unity', category: 'VR/XR' },
    { name: 'Google VR SDK for Unity', author: 'googlevr', description: 'SDK Google VR cho Unity.', stars: '4k', href: 'https://github.com/googlevr/gvr-unity-sdk', category: 'VR/XR' },
    { name: 'ultimatexr-unity', author: 'VRMADA', description: 'UltimateXR là một framework mã nguồn mở, miễn phí giúp tạo các ứng dụng VR.', stars: '716', href: 'https://github.com/VRMADA/ultimatexr-unity', category: 'VR/XR' },
    // Web View
    { name: 'servo-unity', author: 'MozillaReality', description: 'Plugin native và bộ script C# cho phép tích hợp cửa sổ trình duyệt Servo vào các cảnh Unity.', stars: '500', href: 'https://github.com/MozillaReality/servo-unity', category: 'Web View' },
    { name: 'unity-webview', author: 'gree', description: 'Plugin cho Unity 5 hiển thị các thành phần WebView trên view của Unity. Hoạt động trên Android, iOS, Unity Web Player và OS X.', stars: '1.5k', href: 'https://github.com/gree/unity-webview', category: 'Web View' },
    // Icons
    { name: '700+ RPG Icons', author: 'Lorc', description: 'Hơn 700 icon RPG miễn phí để sử dụng trong game của bạn.', stars: 'N/A', href: 'https://www.reddit.com/r/IndieGaming/comments/ifmie/i_made_700_rpg_icons_free_for_use_/', category: 'Icons' },
    { name: 'game-icons.net', author: 'Delapouite', description: 'Hơn 3400 icon game được cấp phép theo CC BY 3.0.', stars: 'N/A', href: 'https://game-icons.net', category: 'Icons' },
    { name: 'EffectCore\'s VFX Packs', author: 'EffectCore', description: 'Các gói hiệu ứng hình ảnh AAA trả phí.', stars: 'N/A', href: 'https://assetstore.unity.com/publishers/25749', category: 'Icons' },
    // Collections / Forums / Shops
    { name: 'Armedunity', author: 'Armedunity', description: 'Diễn đàn tập trung vào game bắn súng.', stars: 'N/A', href: 'https://armedunity.com/', category: 'Collections / Forums / Shops' },
    { name: 'itch.io', author: 'itch.io', description: 'Thị trường tài nguyên game.', stars: 'N/A', href: 'https://itch.io/game-assets', category: 'Collections / Forums / Shops' },
    { name: 'Game Assets', author: 'Game Asset', description: 'Trang web tài nguyên game.', stars: 'N/A', href: 'https://game-asset.net/', category: 'Collections / Forums / Shops' },
    { name: 'Game Dev Market', author: 'gamedevmarket', description: 'Thị trường cho các nhà phát triển game.', stars: 'N/A', href: 'https://www.gamedevmarket.net/', category: 'Collections / Forums / Shops' },
    { name: 'Kenney', author: 'Kenney', description: 'Tài sản 2D, 3D và âm thanh miễn phí cho mục đích cá nhân và thương mại.', stars: 'N/A', href: 'https://kenney.nl/assets', category: 'Collections / Forums / Shops' },
    { name: 'Open Game Art', author: 'OpenGameArt', description: 'Nghệ thuật game mã nguồn mở.', stars: 'N/A', href: 'https://opengameart.org/', category: 'Collections / Forums / Shops' },
    { name: 'Unity Asset Store', author: 'Unity', description: 'Cửa hàng tài sản chính thức cho Unity.', stars: 'N/A', href: 'https://assetstore.unity.com/', category: 'Collections / Forums / Shops' },
    { name: 'Unitylist', author: 'Unitylist', description: 'Tìm kiếm mọi thứ về Unity.', stars: 'N\A', href: 'https://unitylist.com/', category: 'Collections / Forums / Shops' },
    // Creation Tools
    { name: 'Aseprite', author: 'aseprite', description: 'Trình chỉnh sửa sprite động & công cụ pixel art.', stars: 'N/A', href: 'https://www.aseprite.org/', category: 'Creation Tools' },
    { name: 'AssetForge', author: 'Kenney', description: 'Dễ dàng tạo các tài sản đơn giản trong vài giây (Trả phí).', stars: 'N/A', href: 'https://kenney.itch.io/assetforge', category: 'Creation Tools' },
    { name: 'BFXR', author: 'bfxr', description: 'Tạo hiệu ứng âm thanh cho game máy tính (Yêu cầu Flash).', stars: 'N/A', href: 'https://www.bfxr.net/', category: 'Creation Tools' },
    { name: 'MagicaVoxel', author: 'ephtracy', description: 'Trình chỉnh sửa Voxel miễn phí (ngay cả cho mục đích thương mại).', stars: 'N/A', href: 'https://ephtracy.github.io/', category: 'Creation Tools' },
    { name: 'Mixamo', author: 'Mixamo', description: 'Công cụ trộn hoạt ảnh miễn phí với các hoạt ảnh miễn phí. Không được phép sử dụng trong các dự án mã nguồn mở.', stars: 'N/A', href: 'https://www.mixamo.com/', category: 'Creation Tools' },
    // Articles
    { name: '50 Tips for Unity (2016)', author: 'HermanTulleken', description: '50 Mẹo và Thực tiễn tốt nhất cho Unity (Phiên bản 2016).', stars: 'N/A', href: 'https://www.gamasutra.com/blogs/HermanTulleken/20160812/279100/50_Tips_and_Best_Practices_for_Unity_2016_Edition.php', category: 'Articles' },
    { name: 'Unity Package Manager 2018.3+', author: 'Unity', description: 'Vòng đời các gói Unity.', stars: 'N/A', href: 'https://blogs.unity3d.com/2018/05/09/unity-packages-life-cycle/', category: 'Articles' },
    { name: 'Cracked Ice Shader', author: '80.lv', description: 'Cách xây dựng shader băng nứt trong Material Editor.', stars: 'N/A', href: 'https://80.lv/articles/how-to-build-cracked-ice-in-material-editor/', category: 'Articles' },
    { name: 'Unity-Addressable', author: 'Wenrong274', description: 'Tài liệu về hệ thống Addressable của Unity.', stars: 'N/A', href: 'https://github.com/Wenrong274/Unity-Addressable', category: 'Articles' },
    // Books
    { name: 'Game Programming Patterns', author: 'robertnystrom', description: 'Sách về các mẫu lập trình game. Có phiên bản miễn phí và trả phí.', stars: 'N/A', href: 'http://gameprogrammingpatterns.com/', category: 'Books' },
    { name: 'Unity in Action, Third Edition', author: 'Manning', description: 'Sách về tạo game 2D, 3D, và AR/VR với Unity.', stars: 'N/A', href: 'https://www.manning.com/books/unity-in-action-third-edition', category: 'Books' },
    { name: 'Framework design guidelines', author: 'Microsoft', description: 'Hướng dẫn thiết kế framework từ Microsoft.', stars: 'N/A', href: 'https://learn.microsoft.com/en-us/dotnet/standard/design-guidelines/', category: 'Books' }
];

const categories = [
  'All', '2D', '2D Bones / IK', '3D Bones / IK', 'AI', 'Analyzer', 'Animation',
  'Anti-Cheat', 'Art Tools', 'Asset Bundle', 'Audio', 'Build Tools', 'Camera',
  'Character Controller', 'Controller Mappings', 'Console', 'DOTS', 'Dependency Injection',
  'Document Reader', 'ECS Framework', 'Editor', 'Effect and Shaders', 'Effect-Highlighter', 'Effect-Ocean', 'Effect-Toon',
  'Embedding', 'Feedback Libraries', 'Framework', 'Gameplay',
  'Gizmos', 'Input', 'Job System', 'Level Editor', 'Light', 'Lua', 'Lua Utilities',
  'Machine Learning', 'Media Player', 'Meshes', 'Modding', 'Monetization', 'Networking', 'Node Graph',
  'Obfuscation', 'Package Manager', 'Physic', 'Playable', 'Plugins', 'Procedural Generation',
  'Pooling System', 'Protobuf', 'Project Management', 'Runtime Editor', 'Scriptable Object',
  'Scriptings', 'Scene Transition', 'Serializer', 'Services', 'Sounds', 'Threading', 'Terrain', 'Timeline',
  'Tweening', 'Vehicle', 'UI', 'Utilities', 'VR/XR', 'Web View', 'Icons', 'Collections / Forums / Shops',
  'Creation Tools', 'Articles', 'Books'
];

type RepoDataCache = {
    [key: string]: { 
        data: RepoDetails; 
        timestamp: number;
    };
};

const CACHE_DURATION = 1000 * 60 * 60; // 1 hour
const REPOS_PER_PAGE = 12;

export default function CommunityPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedRepo, setSelectedRepo] = useState<RepoDetails | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [repoDetailsCache, setRepoDetailsCache] = useState<RepoDataCache>({});
  const [currentPage, setCurrentPage] = useState(1);

  const filteredRepos = activeFilter === 'All'
    ? allRepos
    : allRepos.filter(repo => repo.category === activeFilter);
    
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter]);
  
  const totalPages = Math.ceil(filteredRepos.length / REPOS_PER_PAGE);
  const paginatedRepos = filteredRepos.slice(
      (currentPage - 1) * REPOS_PER_PAGE,
      currentPage * REPOS_PER_PAGE
  );

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
        setCurrentPage(newPage);
    }
  };

  const handleCardClick = async (repo: Repo) => {
      setSelectedRepo(repo);
      setIsModalOpen(true);
      
      const cacheKey = `${repo.author}/${repo.name}`;
      const cachedItem = repoDetailsCache[cacheKey];

      if (cachedItem && (Date.now() - cachedItem.timestamp < CACHE_DURATION)) {
          setSelectedRepo(cachedItem.data);
          return;
      }
      
      setIsLoadingDetails(true);
      try {
        const response = await fetch(`https://api.github.com/repos/${repo.author}/${repo.name}`);
        if (!response.ok) {
            // For repos that aren't on GitHub (like links to articles, etc.)
            // we can just use the basic info and not show an error.
            if (response.status === 404) {
                 setSelectedRepo({ ...repo });
                 return;
            }
            throw new Error('Failed to fetch repository details');
        }
        const data = await response.json();
        const fullDetails: RepoDetails = { ...repo, ...data };
        setSelectedRepo(fullDetails);
        setRepoDetailsCache(prev => ({ ...prev, [cacheKey]: { data: fullDetails, timestamp: Date.now() }}));
      } catch (error) {
        console.error("Error fetching repo details:", error);
        setSelectedRepo({ ...repo }); // Show basic info on error
      } finally {
        setIsLoadingDetails(false);
      }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/40">
        <AppSidebar />
        <div className="flex flex-1 flex-col">
          <Header />
          <main className="flex-1 p-4 sm:px-6 md:gap-8 md:p-6">
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center">
              <div className="flex-grow">
                <h1 className="text-3xl font-bold">Kho tài nguyên cộng đồng</h1>
                <p className="text-muted-foreground">Khám phá các công cụ, framework và tài sản mã nguồn mở hữu ích từ cộng đồng Unity.</p>
              </div>
              <div className="flex-shrink-0">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full md:w-auto">
                      <ListFilter className="mr-2 h-4 w-4" />
                      Lọc theo danh mục
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[450px] max-h-[80vh] overflow-y-auto" align="end">
                    <DropdownMenuLabel>Chọn một danh mục</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup value={activeFilter} onValueChange={setActiveFilter} className="columns-2">
                      {categories.map((category) => (
                        <DropdownMenuRadioItem key={category} value={category} className="break-inside-avoid">
                          {category}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {paginatedRepos.map((repo, index) => (
                <Card 
                  key={`${repo.name}-${index}`}
                  className="flex flex-col hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                  onClick={() => handleCardClick(repo)}
                >
                  <CardHeader className="flex-row items-start gap-4">
                     <Image
                        src={`https://github.com/${repo.author}.png`}
                        alt={`Avatar of ${repo.author}`}
                        width={40}
                        height={40}
                        className="rounded-full border"
                        onError={(e) => { e.currentTarget.src = `https://github.com/identicons/${repo.author}.png`; }}
                      />
                    <div className="flex-grow overflow-hidden">
                      <CardTitle className="truncate">
                         {repo.name}
                      </CardTitle>
                       <CardDescription>bởi {repo.author}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm text-muted-foreground line-clamp-3">{repo.description}</p>

                  </CardContent>
                  <CardFooter className="flex justify-between items-center mt-auto pt-4">
                    <Badge variant="secondary">{repo.category}</Badge>
                     {repo.stars !== 'N/A' && (
                        <div className="flex items-center gap-2">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm font-medium">{repo.stars}</span>
                        </div>
                     )}
                  </CardFooter>
                </Card>
              ))}
            </div>

            {totalPages > 1 && (
                <div className="mt-8 flex items-center justify-center gap-4">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <ChevronLeft className="h-4 w-4" />
                        Trang trước
                    </Button>
                    <span className="text-sm font-medium">
                        Trang {currentPage} trên {totalPages}
                    </span>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Trang sau
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            )}
          </main>
        </div>
      </div>
      
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[625px]">
           <DialogHeader>
              <DialogTitle className="text-2xl">{selectedRepo?.name ?? 'Loading...'}</DialogTitle>
              {selectedRepo?.author && !isLoadingDetails && (
                <DialogDescription>
                  Bởi <span className="font-semibold text-primary">{selectedRepo.author}</span>
                </DialogDescription>
              )}
            </DialogHeader>
          {isLoadingDetails ? (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <>
              <div className="grid gap-4 py-4">
                <p className="text-sm text-muted-foreground">{selectedRepo?.description}</p>
                 {selectedRepo?.href.includes('github.com') ? (
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span>{selectedRepo?.stars} stars</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <GitFork className="h-4 w-4 text-muted-foreground" />
                            <span>{selectedRepo?.forks_count ?? 'N/A'} forks</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 text-muted-foreground" />
                            <span>{selectedRepo?.open_issues_count ?? 'N/A'} open issues</span>
                        </div>
                         <div className="flex items-center gap-2">
                            <Shield className="h-4 w-4 text-muted-foreground" />
                            <span>{selectedRepo?.license?.name ?? 'No license'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>Created: {selectedRepo?.created_at ? new Date(selectedRepo.created_at).toLocaleDateString() : 'N/A'}</span>
                        </div>
                        {selectedRepo?.pushed_at && (
                            <div className="flex items-center gap-2">
                               <StatusIndicator lastUpdated={selectedRepo.pushed_at} />
                               <span>Last updated: {new Date(selectedRepo.pushed_at).toLocaleDateString()}</span>
                            </div>
                        )}
                    </div>
                ) : (
                    <p className="text-sm text-blue-500">Đây là một liên kết đến một bài viết hoặc tài nguyên bên ngoài.</p>
                )}
              </div>
              <DialogFooter>
                <Button asChild>
                  <Link href={selectedRepo?.href ?? '#'} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    Visit Resource
                  </Link>
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  );
}
