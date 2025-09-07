
"use client";

import { useState } from 'react';
import { Github, ListFilter } from 'lucide-react';
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
    // Asset Bundle
    { name: 'unity-addressable-importer', author: 'favoyang', description: 'Một trình nhập tài sản addressable dựa trên quy tắc.', stars: '1.2k', href: 'https://github.com/favoyang/unity-addressable-importer', category: 'Asset Bundle' },
    { name: 'KEngine', author: 'mr-kelly', description: 'Một framework asset bundle cho Unity với giấy phép LGPL.', stars: '1.5k', href: 'https://github.com/mr-kelly/KEngine', category: 'Asset Bundle' },
    // Audio
    { name: 'Unity-Audio-Manager', author: 'MathewHDYT', description: 'Plugin cho phép dễ dàng phát/thay đổi/dừng/tắt tiếng/... âm thanh trong 2D/3D.', stars: '462', href: 'https://github.com/MathewHDYT/Unity-Audio-Manager', category: 'Audio' },
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
    { name: 'ProceduralToolkit', author: 'Syomus', description: 'Thư viện tạo thủ tục cho Unity.', stars: '1.7k', href: 'https://github.com/Syomus/ProceduralToolkit', category: 'Procedural Generation' }
  ];
  
const categories = [
  'All', '2D', '2D Bones / IK', '3D Bones / IK', 'AI', 'Analyzer', 'Animation',
  'Anti-Cheat', 'Art Tools', 'Asset Bundle', 'Audio', 'Build Tools', 'Camera',
  'Character Controller', 'Controller Mappings', 'Console', 'DOTS', 'Dependency Injection',
  'Document Reader', 'ECS Framework', 'Editor', 'Effect and Shaders', 'Effect-Highlighter',
  'Effect-Ocean', 'Effect-Toon', 'Embedding', 'Feedback Libraries', 'Framework', 'Gameplay',
  'Gizmos', 'Input', 'Job System', 'Level Editor', 'Light', 'Lua', 'Lua Utilities',
  'Machine Learning', 'Media Player', 'Meshes', 'Modding', 'Monetization', 'Networking', 'Node Graph',
  'Obfuscation', 'Package Manager', 'Physic', 'Playable', 'Plugins', 'Procedural Generation'
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
                  <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuLabel>Chọn một danh mục</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup value={activeFilter} onValueChange={setActiveFilter}>
                      {categories.map((category) => (
                        <DropdownMenuRadioItem key={category} value={category}>
                          {category}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                    <div className="flex-grow overflow-hidden">
                      <CardTitle className="truncate">
                         <Link href={repo.href} target="_blank" rel="noopener noreferrer" className="hover:underline">
                          {repo.name}
                         </Link>
                      </CardTitle>
                       <CardDescription>bởi {repo.author}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm text-muted-foreground line-clamp-3">{repo.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center mt-auto pt-4">
                    <Badge variant="secondary">{repo.category}</Badge>
                    <div className="flex items-center gap-4">
                      <Badge variant="outline">⭐️ {repo.stars}</Badge>
                      <Button asChild variant="ghost" size="sm">
                         <Link href={repo.href} target="_blank" rel="noopener noreferrer">
                            <Github className="mr-2 h-4 w-4" />
                            Github
                         </Link>
                       </Button>
                    </div>
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
