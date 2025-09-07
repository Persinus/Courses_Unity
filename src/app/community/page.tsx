
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
  {
    title: '3D Bones / IK',
    repos: [
        { name: 'EZSoftBone', author: 'EZhex1991', description: 'Một trình mô phỏng động học đơn giản cho Unity, bạn có thể sử dụng nó để mô phỏng tóc/đuôi/ngực/váy và các vật thể mềm khác.', stars: '1.2k', href: 'https://github.com/EZhex1991/EZSoftBone' },
        { name: 'Automatic-DynamicBone', author: 'OneYoungMean', description: 'Hệ thống lò xo cho xương và vải trong Unity, dựa trên Job System.', stars: '750', href: 'https://github.com/OneYoungMean/Automatic-DynamicBone' },
        { name: 'Aim-IK', author: 'ehsan-mohammadi', description: 'Một gói Unity để định hướng đầu (và cột sống) của nhân vật một cách thủ tục mà không cần dữ liệu hoạt ảnh.', stars: '1.1k', href: 'https://github.com/ehsan-mohammadi/Aim-IK' },
        { name: 'Hairibar.Ragdoll', author: 'hairibar', description: 'Một gói để tạo hoạt ảnh cho ragdoll thông qua các keyframe animation.', stars: '458', href: 'https://github.com/hairibar/Hairibar.Ragdoll' }
    ]
  },
  {
    title: 'AI',
    repos: [
        { name: 'UnityHFSM', author: 'Inspiaaa', description: 'Một thư viện máy trạng thái hữu hạn phân cấp (HFSM) nhanh và đã được kiểm chứng cho Unity, được thiết kế để dễ sử dụng nhưng vẫn mạnh mẽ mà không ảnh hưởng đến hiệu suất.', stars: '522', href: 'https://github.com/Inspiaaa/UnityHFSM' },
        { name: 'Unity Movement AI', author: 'antonpantev', description: 'Một thư viện các script AI di chuyển phổ biến được gọi là Steering Behaviors. Bạn có thể sử dụng các script này để giúp NPC di chuyển trong game của mình.', stars: '1.7k', href: 'https://github.com/antonpantev/unity-movement-ai' },
        { name: 'Crystal AI', author: 'igiagkiozis', description: 'Một Utility AI cho C# và Unity.', stars: '488', href: 'https://github.com/igiagkiozis/CrystalAI' },
        { name: 'EpPathFinding.cs', author: 'juhgiyo', description: 'Một thuật toán tìm đường Jump Point Search cho các game dựa trên lưới (grid) bằng C#.', stars: '383', href: 'https://github.com/juhgiyo/EpPathFinding.cs' },
        { name: 'UnitySteer', author: 'ricardojmendez', description: 'Các hành vi lái, tránh chướng ngại vật và đi theo đường dẫn cho Unity Game Engine.', stars: '499', href: 'https://github.com/ricardojmendez/UnitySteer' },
        { name: 'NPBehave', author: 'meniku', description: 'Cây hành vi (Behavior Trees) điều khiển bằng sự kiện cho Unity 3D.', stars: '965', href: 'https://github.com/meniku/NPBehave' },
        { name: 'Path-Creator', author: 'SebLague', description: 'Tài sản tạo đường dẫn (path) cho việc phát triển game trên Unity.', stars: '4.5k', href: 'https://github.com/SebLague/Path-Creator' },
        { name: 'NavMeshPlus', author: 'h8man', description: 'Giải pháp tìm đường NavMesh cho game 2D trên Unity.', stars: '1.9k', href: 'https://github.com/h8man/NavMeshPlus' },
        { name: 'behaviac', author: 'Tencent', description: 'Behaviac là một framework phát triển AI cho game, và cũng có thể được sử dụng như một công cụ thiết kế prototype game nhanh chóng.', stars: '3.6k', href: 'https://github.com/Tencent/behaviac' },
        { name: 'GOAP', author: 'crashkonijn', description: 'Một hệ thống GOAP đa luồng cho Unity3D.', stars: '589', href: 'https://github.com/crashkonijn/GOAP' },
        { name: 'DotRecast', author: 'ikpil', description: 'Một bản port của Recast & Detour, bộ công cụ lưới điều hướng (navigation mesh) cho game, Unity3D, máy chủ, viết bằng C#.', stars: '501', href: 'https://github.com/ikpil/DotRecast' }
    ]
  },
  {
      title: 'Analyzer',
      repos: [
          { name: 'UnityHeapExplorer', author: 'pschraut', description: 'Một trình phân tích, gỡ lỗi và hồ sơ bộ nhớ cho Unity 2019.3 trở lên.', stars: '1.5k', href: 'https://github.com/pschraut/UnityHeapExplorer' },
          { name: 'CrashReporter', author: 'nskrkmz', description: 'Công cụ này được dùng để phát hiện nhanh các lỗi không được xử lý trong dự án Unity và lưu báo cáo chi tiết về các lỗi này vào cơ sở dữ liệu redis từ xa.', stars: '128', href: 'https://github.com/nskrkmz/CrashReporter' },
      ]
  },
  {
      title: 'Animation',
      repos: [
          { name: 'unity-animator-helpers', author: 'ashblue', description: 'Một micro-framework để thay đổi các tham số Animator của Unity bằng ScriptableObject. Được thiết kế để giúp việc chuyển từ script tùy chỉnh sang tham số Animator trở nên dễ dàng.', stars: '110', href: 'https://github.com/ashblue/unity-animator-helpers' },
          { name: 'UrMotion', author: 'beinteractive', description: 'Một motion engine linh hoạt cho các hoạt ảnh không dựa trên thời gian trong Unity.', stars: '353', href: 'https://github.com/beinteractive/UrMotion' },
          { name: 'reanimation', author: 'aarthificial', description: 'Một animator thay thế cho Unity được thiết kế riêng cho hoạt ảnh truyền thống.', stars: '719', href: 'https://github.com/aarthificial/reanimation' },
          { name: 'AnimeTask', author: 'kyubuns', description: 'Thư viện Task Animation cho Unity.', stars: '272', href: 'https://github.com/kyubuns/AnimeTask' },
          { name: 'Unity-Procedural-Animation', author: 'Sopiro', description: 'Hoạt ảnh thủ tục (Procedural Animation) trong Unity.', stars: '522', href: 'https://github.com/Sopiro/Unity-Procedural-Animation' },
          { name: 'Mesh-Animation', author: 'codewriter-packages', description: 'Thư viện hoạt ảnh dựa trên vertex shader GPU tốc độ cao cho Unity (VAT, Vertex Animation Texture, Morphing Animation).', stars: '454', href: 'https://github.com/codewriter-packages/Mesh-Animation' },
      ]
  },
  {
      title: 'Anti-Cheat',
      repos: [
          { name: 'SafeValues', author: 'ookii-tsuki', description: 'Một thư viện Unity đơn giản để chống gian lận.', stars: '159', href: 'https://github.com/ookii-tsuki/SafeValues' },
      ]
  },
  {
      title: 'Art Tools',
      repos: [
          { name: 'XdUnityUI', author: 'itouh2-i0plus', description: 'Công cụ chuyển đổi từ AdobeXd sang UnityUI.', stars: '535', href: 'https://github.com/itouh2-i0plus/XdUnityUI' },
          { name: 'Baum2', author: 'kyubuns', description: 'Công cụ chuyển đổi từ Psd sang Unity UI(uGUI).', stars: '333', href: 'https://github.com/kyubuns/Baum2' },
          { name: 'Materialize', author: 'BoundingBoxSoftware', description: 'Một chương trình để chuyển đổi hình ảnh thành vật liệu để sử dụng trong trò chơi điện tử và các mục đích khác.', stars: '10.3k', href: 'https://github.com/BoundingBoxSoftware/Materialize' },
          { name: 'Unity Psd Importer', author: 'ChemiKhazi', description: 'Trình nhập tệp PSD nâng cao cho Unity3D.', stars: '840', href: 'https://github.com/ChemiKhazi/UnityPsdImporter' },
          { name: 'StableDiffusionUnityTools', author: 'KonH', description: 'Tạo tài sản trong Editor thông qua Stable Diffusion.', stars: '313', href: 'https://github.com/KonH/StableDiffusionUnityTools' },
      ]
  },
  {
      title: 'Asset Bundle / Addressable Assets',
      repos: [
          { name: 'AssetBundleManager', author: 'SadPandaStudios', description: 'Một trình quản lý asset bundle cho Unity.', stars: '351', href: 'https://github.com/SadPandaStudios/AssetBundleManager' },
          { name: 'unity-addressable-importer', author: 'favoyang', description: 'Một trình nhập tài sản addressable dựa trên quy tắc.', stars: '1.2k', href: 'https://github.com/favoyang/unity-addressable-importer' },
          { name: 'KEngine', author: 'mr-kelly', description: 'Một framework asset bundle cho Unity với giấy phép LGPL.', stars: '1.5k', href: 'https://github.com/mr-kelly/KEngine' },
          { name: 'EZAddresser', author: 'Haruma-K', description: 'Hệ thống gán địa chỉ tự động cho Unity Addressable Asset System.', stars: '450', href: 'https://github.com/Haruma-K/EZAddresser' },
          { name: 'SmartAddresser', author: 'CyberAgentGameEntertainment', description: 'Tự động hóa việc gán địa chỉ, gán nhãn và kiểm soát phiên bản cho Addressable Asset System của Unity.', stars: '277', href: 'https://github.com/CyberAgentGameEntertainment/SmartAddresser' },
      ]
  },
  {
      title: 'Audio Manager',
      repos: [
          { name: 'LucidAudio', author: 'AnnulusGames', description: 'Trình phát âm thanh đơn giản cho Unity.', stars: '106', href: 'https://github.com/AnnulusGames/LucidAudio' },
          { name: 'Unity_AudioRig', author: 'debox-dev', description: 'Cung cấp khả năng quản lý AudioSource tốt hơn từ script, pooling, lặp, fading, theo dõi đối tượng trong không gian 3D và hơn thế nữa.', stars: '85', href: 'https://github.com/debox-dev/Unity_AudioRig' },
          { name: 'Unity-Audio-Manager', author: 'MathewHDYT', description: 'Plugin cho phép dễ dàng phát/thay đổi/dừng/tắt tiếng/... âm thanh trong 2D/3D.', stars: '462', href: 'https://github.com/MathewHDYT/Unity-Audio-Manager' },
      ]
  },
  {
      title: 'Bolt',
      repos: [
          { name: 'Bolt.Addons.Community', author: 'RealityStop', description: 'Một dự án do cộng đồng thúc đẩy để mở rộng Unity Bolt.', stars: '661', href: 'https://github.com/RealityStop/Bolt.Addons.Community' },
      ]
  },
  {
      title: 'Build Tools and CI',
      repos: [
          { name: 'UnityMultiBuild', author: 'sinbad', description: 'Build hàng loạt cho nhiều nền tảng ngay từ trong Unity editor.', stars: '228', href: 'https://github.com/sinbad/UnityMultiBuild' },
          { name: 'buildtool', author: 'superunitybuild', description: 'Một công cụ tự động hóa mạnh mẽ để tạo các bản build với Unity một cách nhanh chóng và dễ dàng.', stars: '879', href: 'https://github.com/superunitybuild/buildtool' },
          { name: 'unity-actions', author: 'webbertakken', description: 'Github actions để kiểm thử và build các dự án Unity.', stars: '2.5k', href: 'https://github.com/webbertakken/unity-actions' },
          { name: 'trimmer', author: 'sttz', description: 'Một framework cấu hình editor, build và player cho game engine Unity.', stars: '422', href: 'https://github.com/sttz/trimmer' },
      ]
  },
  {
      title: 'Camera',
      repos: [
          { name: 'Unity Pixel Camera', author: 'ChemiKhazi', description: 'Một camera pixel perfect không phụ thuộc vào độ phân giải cho Unity.', stars: '525', href: 'https://github.com/ChemiKhazi/UnityPixelCamera' },
          { name: 'DeadSimple Pixel-Perfect Camera', author: 'cmilr', description: 'Một script camera orthographic pixel perfect cực kỳ dễ sử dụng cho các cảnh 2D trong Unity. Chỉ cần nhập một vài thông số và bạn đã có một camera pixel perfect hoạt động.', stars: '347', href: 'https://github.com/cmilr/DeadSimple-Pixel-Perfect-Camera' },
          { name: 'Dynamic Multi Target Camera for Unity', author: 'lopespm', description: 'Thư viện Unity ngắn gọn giúp tự động giữ một nhóm đối tượng (ví dụ: người chơi và các đối tượng quan trọng) trong tầm nhìn.', stars: '247', href: 'https://github.com/lopespm/unity-camera-multi-target' },
          { name: 'Camera-Shake', author: 'gasgiant', description: 'Hiệu ứng rung camera cho Unity.', stars: '185', href: 'https://github.com/gasgiant/Camera-Shake' },
      ]
  },
  {
      title: 'Character Controllers 2D',
      repos: [
          { name: 'CharacterController2D', author: 'prime31', description: 'Tương tự như component CharacterController có sẵn của Unity. Nó có API tương tự và cung cấp một nền tảng vững chắc để tạo ra một bộ điều khiển siêu ổn định bằng hệ thống 2D của Unity.', stars: '3.6k', href: 'https://github.com/prime31/CharacterController2D' },
          { name: 'Unity 2D Platformer Controller', author: 'cjddmut', description: 'Một bộ điều khiển platformer 2D có thể tùy chỉnh, xử lý các cơ chế như nhảy đôi, nhảy tường và bám góc. Bao gồm một prefab có thể điều khiển được để sử dụng ngay lập tức.', stars: '1.4k', href: 'https://github.com/cjddmut/Unity-2D-Platformer-Controller' },
          { name: 'Ultimate-2D-Controller', author: 'Matthew-J-Spencer', description: 'Một điểm khởi đầu tuyệt vời cho bộ điều khiển 2D của bạn. Tận dụng tất cả các thủ thuật ẩn như coyote time, hành động đệm, đỉnh tốc độ, đỉnh chống trọng lực, v.v.', stars: '1.4k', href: 'https://github.com/Matthew-J-Spencer/Ultimate-2D-Controller' },
      ]
  },
  {
      title: 'Character Controllers 3D',
      repos: [
          { name: 'SuperCharacterController', author: 'IronWarrior', description: 'Character Controller tùy chỉnh cho Unity. Đáp ứng tất cả các chức năng phổ biến như phát hiện va chạm, đẩy lùi, giới hạn độ dốc và bỏ qua va chạm.', stars: '1.7k', href: 'https://github.com/IronWarrior/SuperCharacterController' },
          { name: 'NaughtyCharacter', author: 'dbrizov', description: 'Bộ điều khiển nhân vật góc nhìn thứ ba cho Unity.', stars: '1k', href: 'https://github.com/dbrizov/NaughtyCharacter' },
          { name: 'Advanced Rigidbody FirstPerson Controller', author: 'Moe-Baker', description: 'Bộ điều khiển góc nhìn thứ nhất dựa trên Rigidbody.', stars: '969', href: 'https://github.com/Moe-Baker/Advanced-Rigidbody-FirstPerson-Controller' },
          { name: 'unity-genshin-impact-movement-system', author: 'Wafflus', description: 'Một hệ thống di chuyển được tạo trong Unity cố gắng mô phỏng lại chuyển động trong Genshin Impact.', stars: '1.5k', href: 'https://github.com/Wafflus/unity-genshin-impact-movement-system' },
      ]
  },
  {
      title: 'Code Gen',
      repos: [
          { name: 'UnityCodeGen', author: 'AnnulusGames', description: 'Thư viện tạo mã cho Unity Editor.', stars: '127', href: 'https://github.com/AnnulusGames/UnityCodeGen' },
      ]
  },
  {
      title: 'Controller Mappings',
      repos: [
          { name: 'Dualshock 3 (PS3)', author: 'Unity Forum', description: 'Sơ đồ các nút bấm cho tay cầm Dualshock 3 trên diễn đàn Unity.', stars: 'N/A', href: 'https://forum.unity.com/threads/ps3-button-map.89288/' },
          { name: 'Dualshock 4 (PS4)', author: 'Erik Tellier', description: 'Sơ đồ các nút bấm cho tay cầm Dualshock 4.', stars: 'N/A', href: 'https://twitter.com/erik_tellier/status/1071457079854944256' },
          { name: 'Nintendo Joy Con', author: 'Reddit', description: 'Sơ đồ các nút bấm cho tay cầm Joy Con của Nintendo Switch.', stars: 'N/A', href: 'https://www.reddit.com/r/Unity3D/comments/60wh7g/nintendo_switch_joycon_controller_mapped_for_unity/' },
          { name: 'Nintendo Pro Controller', author: 'Unity Answers', description: 'Sơ đồ các nút bấm cho tay cầm Pro Controller của Nintendo Switch.', stars: 'N/A', href: 'https://answers.unity.com/questions/1419842/nintendo-switch-pro-controller-mapping.html' },
          { name: 'Xbox 360', author: 'Unity Wiki', description: 'Sơ đồ các nút bấm cho tay cầm Xbox 360.', stars: 'N/A', href: 'http://wiki.unity3d.com/index.php?title=Xbox360Controller' },
          { name: 'Xbox One', author: 'Unity Answers', description: 'Sơ đồ các nút bấm cho tay cầm Xbox One.', stars: 'N/A', href: 'https://answers.unity.com/questions/1350081/xbox-one-controller-mapping-solved.html' },
      ]
  },
  {
      title: 'Console',
      repos: [
          { name: 'Unity3d-BeastConsole', author: 'pointcache', description: 'Một console cho mọi nhu cầu của bạn trong Unity.', stars: '75', href: 'https://github.com/pointcache/Unity3d-BeastConsole' },
          { name: 'consolation', author: 'mminer', description: 'Console gỡ lỗi trong game cho Unity.', stars: '277', href: 'https://github.com/mminer/consolation' },
          { name: 'Lunar Unity Mobile Console', author: 'SpaceMadness', description: 'Trình ghi log hiệu suất cao cho Unity trên iOS/Android, được xây dựng bằng giao diện người dùng gốc của nền tảng.', stars: '1.2k', href: 'https://github.com/SpaceMadness/lunar-unity-console' },
      ]
  },
  {
      title: 'DOTS',
      repos: [
          { name: 'unity-ecs-navmesh', author: 'zulfajuniadi', description: 'Một bản demo triển khai Unity Entity Component System với NavMesh.', stars: '185', href: 'https://github.com/zulfajuniadi/unity-ecs-navmesh' },
          { name: 'ECS-Tween', author: 'Xerios', description: 'Hệ thống tweening đơn giản cho Unity sử dụng ECS, hoạt động với cả GameObject!', stars: '202', href: 'https://github.com/Xerios/ECS-Tween' },
          { name: 'Latios-Framework', author: 'Dreaming381', description: 'Một framework DOTS cho Unity.', stars: '456', href: 'https://github.com/Dreaming381/Latios-Framework' },
          { name: 'dotsnav', author: 'dotsnav', description: 'Một gói navmesh phẳng hoàn toàn động cho Unity, hỗ trợ các agent ở mọi kích thước.', stars: '394', href: 'https://github.com/dotsnav/dotsnav' },
          { name: 'NSprites', author: 'Antoshidza', description: 'Gói kết xuất Sprite cho Unity DOTS.', stars: '286', href: 'https://github.com/Antoshidza/NSprites' },
      ]
  },
  {
      title: 'Dependency Injection',
      repos: [
          { name: 'Zenject', author: 'modesttree', description: 'Framework Dependency Injection cho Unity3D.', stars: '9.3k', href: 'https://github.com/modesttree/Zenject' },
          { name: 'VContainer', author: 'hadashiA', description: 'Thư viện DI (Dependency Inject) siêu nhanh, mã nguồn tối thiểu, không GC chạy trên Unity (IL2CPP).', stars: '1.9k', href: 'https://github.com/hadashiA/VContainer' },
          { name: 'reflex', author: 'gustavopsantos', description: 'Framework dependency injection tối giản cho Unity.', stars: '154', href: 'https://github.com/gustavopsantos/reflex' },
      ]
  },
  {
      title: 'Document Reader',
      repos: [
          { name: 'GoogleSheetsUnity', author: '5argon', description: 'Lấy dữ liệu từ Google Sheets riêng tư của bạn vào Unity!! (Chỉ đọc).', stars: '500', href: 'https://github.com/5argon/GoogleSheetsUnity' },
          { name: 'UnityCsvUtil', author: 'sinbad', description: 'Tiện ích tuần tự hóa/giải tuần tự hóa CSV nhẹ nhưng an toàn về kiểu cho các đối tượng.', stars: '133', href: 'https://github.com/sinbad/UnityCsvUtil' },
          { name: 'UnityGoogleDrive', author: 'Elringus', description: 'SDK Google Drive cho game engine Unity.', stars: '497', href: 'https://github.com/Elringus/UnityGoogleDrive' },
      ]
  },
  {
      title: 'ECS Framework',
      repos: [
          { name: 'Entitas-CSharp', author: 'sschmid', description: 'Entitas là một Entity Component System (ECS) Framework siêu nhanh được tạo riêng cho C# và Unity.', stars: '5.8k', href: 'https://github.com/sschmid/Entitas-CSharp' },
          { name: 'LeoECS', author: 'Leopotam', description: 'LeoECS là một Entity Component System (ECS) Framework nhanh được cung cấp bởi C# với tích hợp tùy chọn vào Unity.', stars: '809', href: 'https://github.com/Leopotam/ecs' },
          { name: 'Morpeh', author: 'X-Crew', description: 'Framework ECS nhanh và đơn giản cho Unity3d.', stars: '753', href: 'https://github.com/X-Crew/Morpeh' },
          { name: 'Arch', author: 'genaray', description: 'Một Entity Component System (ECS) dựa trên Archetype & Chunks hiệu suất cao bằng C# với tùy chọn đa luồng.', stars: '868', href: 'https://github.com/genaray/Arch' },
      ]
  },
  {
      title: 'Editor',
      repos: [
          { name: 'Unity-QuickSheet', author: 'kimsama', description: 'Unity-QuickSheet cho phép bạn sử dụng dữ liệu từ file bảng tính trong Unity editor.', stars: '960', href: 'https://github.com/kimsama/Unity-QuickSheet' },
          { name: 'Unity3D Rainbow Folders', author: 'PhannGor', description: 'Tài sản này cho phép bạn đặt các biểu tượng tùy chỉnh cho bất kỳ thư mục nào trong trình duyệt dự án Unity.', stars: '1.4k', href: 'https://github.com/PhannGor/unity3d-rainbow-folders' },
          { name: 'Reorderable Inspector', author: 'ChemiKhazi', description: 'Tự động tạo danh sách có thể sắp xếp lại cho các thành phần của game engine Unity.', stars: '617', href: 'https://github.com/ChemiKhazi/ReorderableInspector' },
          { name: 'MyBox', author: 'Deadcows', description: 'MyBox là một bộ các thuộc tính, công cụ và phần mở rộng cho Unity.', stars: '1.4k', href: 'https://github.com/Deadcows/MyBox' },
          { name: 'Unity-Editor-Toolbox', author: 'arimger', description: 'Các công cụ, thuộc tính tùy chỉnh, drawers và phần mở rộng cho Unity Editor.', stars: '1.3k', href: 'https://github.com/arimger/Unity-Editor-Toolbox' },
          { name: 'NaughtyAttributes', author: 'dbrizov', description: 'Các phần mở rộng thuộc tính cho Unity.', stars: '3.9k', href: 'https://github.com/dbrizov/NaughtyAttributes' },
          { name: 'FastScriptReload', author: 'handzlikchris', description: 'Triển khai Hot Reload cho Unity. Lặp lại mã nguồn cực nhanh mà không làm gián đoạn phiên chơi. Hỗ trợ mọi trình soạn thảo.', stars: '2k', href: 'https://github.com/handzlikchris/FastScriptReload' },
          { name: 'hierarchy-2', author: 'truongnguyentungduy', description: 'Phần mở rộng trình soạn thảo để cải thiện cửa sổ hierarchy của Unity. Làm cho hierarchy chi tiết hơn, nhưng vẫn sạch sẽ và dễ tổ chức.', stars: '1k', href: 'https://github.com/truongnguyentungduy/hierarchy-2' },
          { name: 'EasyButtons', author: 'madsbangh', description: 'Thêm các nút vào inspector của bạn trong Unity một cách cực kỳ dễ dàng với thuộc tính đơn giản này.', stars: '753', href: 'https://github.com/madsbangh/EasyButtons' },
      ]
  },
  {
      title: 'Effect and Shaders',
      repos: [
          { name: 'Unity 5 Effects', author: 'i-saint', description: 'Không gian lưu trữ hiệu ứng cho Unity 5.', stars: '965', href: 'https://github.com/i-saint/Unity5Effects' },
          { name: 'KinoGlitch', author: 'keijiro', description: 'Hiệu ứng video glitch cho Unity.', stars: '2.1k', href: 'https://github.com/keijiro/KinoGlitch' },
          { name: 'ShaderForge', author: 'FreyaHolmer', description: 'Công cụ tạo shader bằng giao diện visual scripting.', stars: '5.2k', href: 'https://github.com/FreyaHolmer/ShaderForge' },
          { name: 'SpriteGlow', author: 'Elringus', description: 'Hiệu ứng phát sáng cho sprite trong game engine Unity.', stars: '1.5k', href: 'https://github.com/Elringus/SpriteGlow' },
          { name: 'HoloShield', author: 'AdultLink', description: 'Shader tạo khiên/lá chắn khoa học viễn tưởng có khả năng tùy biến cao cho Unity3D.', stars: '840', href: 'https://github.com/AdultLink/HoloShield' },
          { name: 'Unity-Shaders', author: 'knapeczadam', description: 'Demo shader - Hơn 300 ví dụ.', stars: '1.9k', href: 'https://github.com/knapeczadam/Unity-Shaders' },
          { name: 'ezy-slice', author: 'DavidArayan', description: 'Một framework mã nguồn mở để cắt mesh cho Unity3D Game Engine. Viết bằng C#.', stars: '1.2k', href: 'https://github.com/DavidArayan/ezy-slice' },
          { name: 'X-PostProcessing-Library', author: 'QianMo', description: 'XPL: Thư viện hiệu ứng hậu xử lý chất lượng cao cho Unity.', stars: '2.4k', href: 'https://github.com/QianMo/X-PostProcessing-Library' },
          { name: 'fluviofx', author: 'fluviofx', description: 'Mô phỏng động lực học chất lỏng cho VFX Graph của Unity.', stars: '1.1k', href: 'https://github.com/fluviofx/fluviofx' },
          { name: 'NovaShader', author: 'CyberAgentGameEntertainment', description: 'Shader đa chức năng cho Particle System hỗ trợ Universal Render Pipeline (URP) của Unity.', stars: '659', href: 'https://github.com/CyberAgentGameEntertainment/NovaShader' },
          { name: 'FSR2Unity', author: 'ndepoel', description: 'Tích hợp bộ nâng cấp FSR 3.0 cho pipeline render sẵn có của Unity, hỗ trợ DX11, Mac, Linux và console.', stars: '965', href: 'https://github.com/ndepoel/FSR2Unity' },
          { name: 'HoyoToon', author: 'Melioli', description: 'Shader cho Unity (Built-in) cố gắng tái tạo shading của các game do miHoYo phát triển.', stars: '822', href: 'https://github.com/Melioli/HoyoToon' },
      ]
  },
  {
      title: 'Effect-Highlighter',
      repos: [
          { name: 'Outline-Effect', author: 'cakeslice', description: 'Hiệu ứng viền (Outline) dưới dạng Image Effect cho Unity.', stars: '1.5k', href: 'https://github.com/cakeslice/Outline-Effect' },
          { name: 'UltimateOutline', author: 'Shrimpey', description: 'Cách dễ nhất để tạo hiệu ứng viền trong Unity.', stars: '394', href: 'https://github.com/Shrimpey/UltimateOutline' },
          { name: 'UnityFx.Outline', author: 'Arvtesh', description: 'Hiệu ứng viền screen-space cho Unity3d.', stars: '458', href: 'https://github.com/Arvtesh/UnityFx.Outline' },
          { name: 'Unity-URP-Outlines', author: 'Robinseibold', description: 'Một custom renderer feature cho hiệu ứng viền screen space.', stars: '715', href: 'https://github.com/Robinseibold/Unity-URP-Outlines' },
          { name: 'Facepunch.Highlight', author: 'Facepunch', description: 'Hiệu ứng viền cho mesh.', stars: '185', href: 'https://github.com/Facepunch/Facepunch.Highlight' },
      ]
  },
  {
      title: 'Effect-Ocean',
      repos: [
          { name: 'crest-oceanrender', author: 'huwb', description: 'Một hệ thống render đại dương nâng cao được triển khai trong Unity3D.', stars: '2.5k', href: 'https://github.com/huwb/crest-oceanrender' },
          { name: 'Ocean_Community_Next_Gen', author: 'eliasts', description: 'Phiên bản thế hệ tiếp theo của shader đại dương từ cộng đồng Unity.', stars: '933', href: 'https://github.com/eliasts/Ocean_Community_Next_Gen' },
          { name: 'Ceto', author: 'Scrawk', description: 'Ceto: Hệ thống đại dương cho Unity.', stars: '1.1k', href: 'https://github.com/Scrawk/Ceto' },
          { name: 'FFT-Ocean', author: 'gasgiant', description: 'Mô phỏng đại dương bằng thuật toán FFT cho Unity.', stars: '547', href: 'https://github.com/gasgiant/FFT-Ocean' },
      ]
  },
  {
      title: 'Effect-Toon',
      repos: [
          { name: 'ToonShading', author: 'Kink3d', description: 'Bộ sưu tập các shader "Toon" cho Unity dựa trên xấp xỉ PBR theo từng bước.', stars: '711', href: 'https://github.com/Kink3d/ToonShading' },
          { name: 'Arktoon-Shaders', author: 'synqark', description: 'Các shader Unity thay thế do synqark tạo ra.', stars: '1.1k', href: 'https://github.com/synqark/Arktoon-Shaders' },
          { name: 'JasonMaToonRenderPipeline', author: 'Jason-Ma-233', description: 'JTRP: Pipeline render ToonShading cho Unity HDRP.', stars: '849', href: 'https://github.com/Jason-Ma-233/JasonMaToonRenderPipeline' },
          { name: 'UniToon', author: 'yoship1639', description: 'Toon Shader dựa trên vật lý cho các ứng dụng game. Tương thích với các hàm render tiêu chuẩn của Unity.', stars: '1.3k', href: 'https://github.com/yoship1639/UniToon' },
          { name: 'MToon', author: 'Santarh', description: 'Toon Shader với Unity Global Illumination.', stars: '1k', href: 'https://github.com/Santarh/MToon' },
          { name: 'StarRailNPRShader', author: 'stalomeow', description: 'Shader fan-made cho Unity URP cố gắng tái tạo shading của Honkai: Star Rail.', stars: '878', href: 'https://github.com/stalomeow/StarRailNPRShader' },
      ]
  },
  {
      title: 'Embedding',
      repos: [
          { name: 'react-native-unity-view', author: 'f111fei', description: 'Hiển thị một view Unity trong React Native.', stars: '1.5k', href: 'https://github.com/f111fei/react-native-unity-view' },
          { name: 'flutter-unity-view-widget', author: 'snowballdigital', description: 'Widget nhúng view của game engine Unity cho Flutter.', stars: '1.9k', href: 'https://github.com/snowballdigital/flutter-unity-view-widget' },
      ]
  },
  {
      title: 'Feedback Libraries',
      repos: [
          { name: 'Juce-Feedbacks', author: 'Juce-Assets', description: 'Thư viện feedbacks mã nguồn mở, là một phần của framework công cụ Juce Unity.', stars: '197', href: 'https://github.com/Juce-Assets/Juce-Feedbacks' },
      ]
  },
  {
      title: 'Framework',
      repos: [
          { name: 'Fungus', author: 'snozbot', description: 'Một công cụ tạo visual novel và game kể chuyện dễ sử dụng cho Unity.', stars: '2.5k', href: 'https://github.com/snozbot/fungus' },
          { name: 'Node_Editor_Framework', author: 'Seneral', description: 'Framework Node Editor cho Unity3D.', stars: '2.5k', href: 'https://github.com/Seneral/Node_Editor_Framework' },
          { name: 'QFramework', author: 'liangxiegame', description: 'Framework K.I.S.S (Keep It Simple, Stupid) đầu tiên của bạn cho Unity 3D.', stars: '4k', href: 'https://github.com/liangxiegame/QFramework' },
          { name: 'GameFramework', author: 'FlipWebApps', description: 'Một framework miễn phí cho Unity giúp tăng tốc độ phát triển và bộ tính năng của game.', stars: '1.7k', href: 'https://github.com/FlipWebApps/GameFramework' },
          { name: 'Zinnia.Unity', author: 'ExtendRealityLtd', description: 'Một bộ sưu tập các design pattern để giải quyết các vấn đề phổ biến.', stars: '447', href: 'https://github.com/ExtendRealityLtd/Zinnia.Unity' },
          { name: 'JEngine', author: 'JasonXuDeveloper', description: 'JEngine là một framework được tối ưu hóa và dễ sử dụng cho lập trình viên Unity, chứa các tính năng mạnh mẽ.', stars: '1.6k', href: 'https://github.com/JasonXuDeveloper/JEngine' },
          { name: 'CosmosFramework', author: 'DonnYep', description: 'CosmosFramework là một framework phát triển Unity dạng plug-in, có trọng lượng từ trung bình đến nhẹ.', stars: '1.1k', href: 'https://github.com/DonnYep/CosmosFramework' },
      ]
  },
  {
      title: 'Gameplay',
      repos: [
          { name: 'UnityGameplayAbilitySystem', author: 'sjai013', description: 'Một framework thống nhất để triển khai các hệ thống kỹ năng (ability systems) trong Unity.', stars: '1.1k', href: 'https://github.com/sjai013/UnityGameplayAbilitySystem' },
          { name: 'Inventory-Pro', author: 'devdogio', description: 'Hệ thống kho đồ (Inventory System) bán chạy nhất cho Unity - nay đã miễn phí và mã nguồn mở!', stars: '1.2k', href: 'https://github.com/devdogio/Inventory-Pro' },
          { name: 'Quest-System-Pro', author: 'devdogio', description: 'Hệ thống nhiệm vụ và cây hội thoại mạnh mẽ cho Unity - nay đã miễn phí và mã nguồn mở!', stars: '528', href: 'https://github.com/devdogio/Quest-System-Pro' },
          { name: 'Inventory', author: 'FarrokhGames', description: 'Một hệ thống kho đồ kiểu Diablo 2 cho Unity3D.', stars: '715', href: 'https://github.com/FarrokhGames/Inventory' },
          { name: 'RPGCore', author: 'Fydar', description: 'RPGCore là một bộ công cụ để sản xuất các game và cơ chế RPG cho Unity.', stars: '614', href: 'https://github.com/Fydar/RPGCore' },
          { name: 'SanAndreasUnity', author: 'GTA-ASM', description: 'Tái triển khai mã nguồn mở của game engine GTA San Andreas trong Unity.', stars: '1.9k', href: 'https://github.com/GTA-ASM/SanAndreasUnity' },
          { name: 'FogOfWar', author: 'kitepro', description: 'Một plugin cho Unity3D để thêm hiệu ứng Fog of War (sương mù chiến tranh) vào game.', stars: '601', href: 'https://github.com/kitepro/FogOfWar' },
          { name: 'Traverser', author: 'AitorSimona', description: 'Traverser là một bộ công cụ di chuyển người chơi miễn phí và mã nguồn mở bao gồm Locomotion, Parkour và Leo trèo.', stars: '612', href: 'https://github.com/AitorSimona/Traverser' },
          { name: 'UnityTimeRewinder', author: 'SitronX', description: 'Giải pháp tua lại thời gian cho Unity, dễ dàng tùy chỉnh cho mọi dự án.', stars: '321', href: 'https://github.com/SitronX/UnityTimeRewinder' },
      ]
  },
  {
      title: 'Gizmos',
      repos: [
          { name: 'UGizmo', author: 'harumas', description: 'Trình vẽ gizmo hiệu suất cao cho Unity.', stars: '470', href: 'https://github.com/harumas/UGizmo' },
      ]
  },
  {
      title: 'Input',
      repos: [
          { name: 'InputManager', author: 'daemon3000', description: 'InputManager tùy chỉnh cho Unity.', stars: '1.2k', href: 'https://github.com/daemon3000/InputManager' },
          { name: 'InControl', author: 'pbhogan', description: 'Một trình quản lý input cho Unity giúp thuần hóa "quái vật" controller đa nền tảng.', stars: '2k', href: 'https://github.com/pbhogan/InControl' },
          { name: 'InputBinder', author: 'RyanNielson', description: 'Dễ dàng liên kết các sự kiện input với các phương thức trong Unity.', stars: '415', href: 'https://github.com/RyanNielson/InputBinder' },
          { name: 'TouchKit', author: 'prime31', description: 'Xử lý cử chỉ và input một cách hợp lý cho Unity.', stars: '700', href: 'https://github.com/prime31/TouchKit' },
          { name: 'TouchScript', author: 'TouchScript', description: 'Giải pháp đa chạm hoàn chỉnh cho Unity: Win8, TUIO, Mobile.', stars: '2.2k', href: 'https://github.com/TouchScript/TouchScript' },
      ]
  },
  {
      title: 'Job System',
      repos: [
          { name: 'ZeroAllocJobScheduler', author: 'genaray', description: 'Một Jobscheduler C# hiệu suất cao không cấp phát bộ nhớ.', stars: '68', href: 'https://github.com/genaray/ZeroAllocJobScheduler' },
      ]
  },
  {
      title: 'Level Editor',
      repos: [
          { name: 'Tiled2Unity', author: 'Seanba', description: 'Xuất các tệp Tiled Map Editor (TMX) vào Unity.', stars: '2.1k', href: 'https://github.com/Seanba/Tiled2Unity' },
          { name: 'UnityTile3D', author: 'NoelFB', description: 'Trình chỉnh sửa Tile 3D đơn giản.', stars: '433', href: 'https://github.com/NoelFB/UnityTile3D' },
          { name: 'giles', author: 'procore3d', description: 'GILES: Một Trình chỉnh sửa Level trong Runtime cho Unity3D.', stars: '1.2k', href: 'https://github.com/procore3d/giles' },
          { name: 'realtime-CSG-for-unity', author: 'LogicalError', description: 'Realtime-CSG, trình chỉnh sửa level CSG cho Unity.', stars: '1.2k', href: 'https://github.com/LogicalError/realtime-CSG-for-unity' },
          { name: 'PrefabPainter', author: 'AlexanderAmeye', description: 'Một công cụ vẽ prefab cơ bản cho game engine Unity3D.', stars: '614', href: 'https://github.com/AlexanderAmeye/PrefabPainter' },
          { name: 'hedera', author: 'radiatoryang', description: 'Vẽ dây thường xuân 3D trong Unity Editor, xem các mesh được tạo thủ tục mô phỏng sự phát triển và bám dính trong thời gian thực.', stars: '1k', href: 'https://github.com/radiatoryang/hedera' },
          { name: 'RoadArchitect', author: 'MicroGSD', description: 'Road Architect cho Unity.', stars: '1.5k', href: 'https://github.com/MicroGSD/RoadArchitect' },
          { name: 'LDtkUnity', author: 'Cammin', description: 'Một gói để tích hợp dễ dàng Unity với Level Designer Toolkit.', stars: '525', href: 'https://github.com/Cammin/LDtkUnity' },
          { name: 'RuntimeTransformHandle', author: 'pshtif', description: 'Handle biến đổi trong runtime cho Unity.', stars: '388', href: 'https://github.com/pshtif/RuntimeTransformHandle' },
      ]
  },
  {
      title: 'Light',
      repos: [
          { name: 'Aura', author: 'raphael-ernaelsten', description: 'Ánh sáng thể tích (Volumetric Lighting) cho Unity.', stars: '1.9k', href: 'https://github.com/raphael-ernaelsten/Aura' },
          { name: 'Simple Light Probe Placer', author: 'AlexanderVorobyov', description: 'Một công cụ đơn giản cho Unity3d giúp bạn dễ dàng đặt các Light Probe trong cảnh của mình.', stars: '241', href: 'https://github.com/AlexanderVorobyov/simple-light-probe-placer' },
          { name: 'VolumetricLights', author: 'SlightlyMad', description: 'Ánh sáng thể tích cho Unity.', stars: '1.3k', href: 'https://github.com/SlightlyMad/VolumetricLights' },
          { name: 'Rimlight', author: 'AdultLink', description: 'Shader rimlight có thể tùy chỉnh cho Unity, bao gồm cả hiệu ứng pulsation và cuộn nhiễu.', stars: '202', href: 'https://github.com/AdultLink/Rimlight' },
          { name: 'unity-volumetric-fog', author: 'SiiMeR', description: 'Một triển khai sương mù thể tích trong Unity.', stars: '521', href: 'https://github.com/SiiMeR/unity-volumetric-fog' },
          { name: 'VolumetricTracer', author: 'Fewes', description: 'Một cách đơn giản để render các vệt đạn thể tích, mềm mại trong Unity.', stars: '158', href: 'https://github.com/Fewes/VolumetricTracer' },
      ]
  },
  {
      title: 'Lua',
      repos: [
          { name: 'slua', author: 'pangweiwei', description: 'Binding lua nhanh nhất thông qua việc tạo mã tĩnh cho Unity3D và mono.', stars: '2.5k', href: 'https://github.com/pangweiwei/slua' },
          { name: 'xLua', author: 'Tencent', description: 'xLua là một plugin giải pháp hot-fix cho Unity3D, hỗ trợ android, ios, windows, osx, v.v.', stars: '8.8k', href: 'https://github.com/Tencent/xLua' },
          { name: 'UniLua', author: 'xebecnan', description: 'Một triển khai Lua 5.2 hoàn toàn bằng C# tập trung vào khả năng tương thích với Unity3D.', stars: '500', href: 'https://github.com/xebecnan/UniLua' },
          { name: 'MoonSharp', author: 'xanathar', description: 'Một trình thông dịch cho ngôn ngữ Lua, được viết hoàn toàn bằng C# cho các nền tảng .NET, Mono, Xamarin và Unity3D.', stars: '1.4k', href: 'https://github.com/xanathar/moonsharp/' },
      ]
  },
  {
      title: 'Lua Utilities',
      repos: [
          { name: 'LuaProfiler-For-Unity', author: 'ElPsyCongree', description: 'Trình phân tích hiệu năng Lua cho Unity.', stars: '383', href: 'https://github.com/ElPsyCongree/LuaProfiler-For-Unity' },
      ]
  },
  {
      title: 'Machine Learning',
      repos: [
          { name: 'MediaPipeUnityPlugin', author: 'homuler', description: 'Plugin Unity để chạy MediaPipe.', stars: '2.1k', href: 'https://github.com/homuler/MediaPipeUnityPlugin' },
      ]
  },
  {
      title: 'Media Player',
      repos: [
          { name: 'Vimeo Unity SDK', author: 'vimeo', description: 'Dễ dàng stream video Vimeo của bạn vào Unity hoặc ghi và xuất bản ra Vimeo.', stars: '320', href: 'https://github.com/vimeo/vimeo-unity-sdk' },
          { name: 'LibVLCSharp', author: 'videolan', description: 'LibVLCSharp là một API âm thanh và video đa nền tảng cho các nền tảng .NET dựa trên Thư viện LibVLC của VideoLAN.', stars: '1.4k', href: 'https://github.com/videolan/LibVLCSharp' },
          { name: 'FFmpegUnityBind2', author: 'Spirit30', description: 'FFmpeg Unity Bind 2 là trình chỉnh sửa Video, Âm thanh, Hình ảnh mạnh mẽ nhất cho ứng dụng của bạn.', stars: '304', href: 'https://github.com/Spirit30/FFmpegUnityBind2' },
      ]
  },
  {
      title: 'Meshes',
      repos: [
          { name: 'UnityMeshSimplifier', author: 'Whinarn', description: 'Đơn giản hóa Mesh cho Unity.', stars: '1.5k', href: 'https://github.com/Whinarn/UnityMeshSimplifier' },
          { name: 'MeshDecimator', author: 'Whinarn', description: 'Thư viện giảm đa giác (decimation) cho .NET và Unity.', stars: '1.2k', href: 'https://github.com/Whinarn/MeshDecimator' },
          { name: 'SplineMesh', author: 'benoit-dumas', description: 'Một plugin Unity để tạo nội dung cong trong thời gian thực bằng các đường cong bézier.', stars: '2k', href: 'https://github.com/benoit-dumas/SplineMesh' },
          { name: 'UnityGLTF', author: 'KhronosGroup', description: 'Trình tải GLTF trong runtime cho Unity3D.', stars: '2.5k', href: 'https://github.com/KhronosGroup/UnityGLTF' },
          { name: 'Deform', author: 'keenanwoodall', description: 'Một hệ thống biến dạng (deformer) đầy đủ tính năng cho Unity.', stars: '2.6k', href: 'https://github.com/keenanwoodall/Deform' },
          { name: 'unity-fracture', author: 'ElasticSea', description: 'Phá vỡ bất kỳ mesh nào trong runtime.', stars: '674', href: 'https://github.com/ElasticSea/unity-fracture' },
          { name: 'OpenFracture', author: 'dgreenheck', description: 'Tiện ích cắt/phá vỡ mesh mã nguồn mở cho Unity.', stars: '524', href: 'https://github.com/dgreenheck/OpenFracture' },
          { name: 'BMeshUnity', author: 'eliemichel', description: 'Một gói Unity để làm cho việc tạo mesh thủ tục trong runtime trở nên linh hoạt hơn.', stars: '141', href: 'https://github.com/eliemichel/BMeshUnity' },
      ]
  }
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
