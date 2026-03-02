import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Image as ImageIcon, 
  Package,
  MonitorPlay,
  Briefcase,
  Calendar,
  Newspaper,
  Bell,
  Smartphone,
  MapPin,
  Link2,
  Download,
  Loader2,
  Tag,
  X,
  BookOpen,
  ThumbsUp,
  HelpCircle,
  Zap,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Switch } from "../components/ui/switch";

// 广告位数据
const bannerTitleZhMap: Record<string, string> = {
  spring_promo: "春季新品促销",
  new_printer_launch: "理光打印机新品发布",
  enterprise_solution: "企业解决方案",
  new_year_offer_2024: "理光中国2024开年钜惠",
};

const bannerPositionZhMap: Record<string, string> = {
  homepage: "首页轮播",
  sidebar: "侧边栏",
  splash: "开屏广告",
  product: "产品页",
};

const caseTitleZhMap: Record<string, string> = {
  manufacturing_digital_transformation: "某大型制造企业数字化转型案例",
  finance_secure_printing: "金融行业高安全打印解决方案",
  education_smart_campus: "教育行业智慧校园建设",
};

const caseCustomerZhMap: Record<string, string> = {
  shanghai_manufacturing_group: "上海某某制造集团",
  beijing_bank: "北京某某银行",
  guangzhou_university: "广州某某大学",
};

const caseIndustryZhMap: Record<string, string> = {
  manufacturing: "制造业",
  finance: "金融业",
  education: "教育",
};

const caseSolutionZhMap: Record<string, string> = {
  intelligent_document_system: "智能文档管理系统",
  secure_printing_solution: "安全打印解决方案",
  smart_campus_printing: "智慧校园打印方案",
};

const caseTagZhMap: Record<string, string> = {
  digital_transformation: "数字化转型",
  intelligent_manufacturing: "智能制造",
  document_management: "文档管理",
  enterprise: "大型企业",
  finance: "金融",
  secure_printing: "安全打印",
  information_security: "信息安全",
  banking: "银行",
  education: "教育",
  smart_campus: "智慧校园",
  university: "高校",
  large_scale_deployment: "批量部署",
};

const activityTitleZhMap: Record<string, string> = {
  spring_new_product_launch_2024: "2024春季新品发布会",
  online_printer_maintenance_workshop: "打印机维护知识在线研讨会",
  enterprise_digital_transformation_summit: "企业数字化转型峰会",
};

const activityTypeZhMap: Record<string, string> = {
  offline: "线下活动",
  online: "线上活动",
  hybrid: "线上线下结合",
};

const activityLocationZhMap: Record<string, string> = {
  shanghai_expo_center: "上海国际会展中心",
  live_streaming: "在线直播",
  beijing_national_conference_center: "北京国家会议中心",
};

const activityTagZhMap: Record<string, string> = {
  new_product_launch: "新品发布",
  offline_activity: "线下活动",
  online_activity: "线上活动",
  year_2024: "2024",
  shanghai: "上海",
  online_workshop: "在线研讨会",
  technical_training: "技术培训",
  maintenance: "维护保养",
  livestream: "直播",
  summit: "峰会",
  digital_transformation: "数字化转型",
  industry_exchange: "行业交流",
  beijing: "北京",
};

const mockBanners = [
  {
    id: 1,
    title: "spring_promo",
    position: "homepage",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800",
    link: "/products/spring-sale",
    startDate: "2024-02-01",
    endDate: "2024-03-31",
    status: "active",
    order: 1,
  },
  {
    id: 2,
    title: "new_printer_launch",
    position: "homepage",
    image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=800",
    link: "/products/new-printers",
    startDate: "2024-02-10",
    endDate: "2024-04-30",
    status: "active",
    order: 2,
  },
  {
    id: 3,
    title: "enterprise_solution",
    position: "sidebar",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400",
    link: "/solutions/enterprise",
    startDate: "2024-01-15",
    endDate: "2024-12-31",
    status: "active",
    order: 1,
  },
  {
    id: 4,
    title: "new_year_offer_2024",
    position: "splash",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1080",
    link: "/promotions/new-year-2024",
    startDate: "2024-02-01",
    endDate: "2024-02-29",
    status: "active",
    order: 1,
    duration: 5,
    skippable: true,
    frequency: 1,
  },
];

// 案例库数据
const mockCases = [
  {
    id: 1,
    title: "manufacturing_digital_transformation",
    customer: "shanghai_manufacturing_group",
    industry: "manufacturing",
    solution: "intelligent_document_system",
    products: "RICOH IM C6000 × 20台",
    createTime: "2024-01-20",
    thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400",
    status: "published",
    tags: ["digital_transformation", "intelligent_manufacturing", "document_management", "enterprise"],
  },
  {
    id: 2,
    title: "finance_secure_printing",
    customer: "beijing_bank",
    industry: "finance",
    solution: "secure_printing_solution",
    products: "RICOH MP C5504exSP × 50台",
    createTime: "2024-01-18",
    thumbnail: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400",
    status: "published",
    tags: ["finance", "secure_printing", "information_security", "banking"],
  },
  {
    id: 3,
    title: "education_smart_campus",
    customer: "guangzhou_university",
    industry: "education",
    solution: "smart_campus_printing",
    products: "RICOH IM C3000 × 100台",
    createTime: "2024-01-15",
    thumbnail: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400",
    status: "published",
    tags: ["education", "smart_campus", "university", "large_scale_deployment"],
  },
];

// 市场活动数据
const mockActivities = [
  {
    id: 1,
    title: "spring_new_product_launch_2024",
    type: "offline",
    location: "shanghai_expo_center",
    startDate: "2024-03-15",
    endDate: "2024-03-15",
    participants: 500,
    status: "upcoming",
    thumbnail: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400",
    tags: ["new_product_launch", "offline_activity", "year_2024", "shanghai"],
  },
  {
    id: 2,
    title: "online_printer_maintenance_workshop",
    type: "online",
    location: "live_streaming",
    startDate: "2024-02-25",
    endDate: "2024-02-25",
    participants: 1200,
    status: "ongoing",
    thumbnail: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=400",
    tags: ["online_workshop", "technical_training", "maintenance", "livestream"],
  },
  {
    id: 3,
    title: "enterprise_digital_transformation_summit",
    type: "offline",
    location: "beijing_national_conference_center",
    startDate: "2024-01-20",
    endDate: "2024-01-21",
    participants: 800,
    status: "completed",
    thumbnail: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400",
    tags: ["summit", "digital_transformation", "industry_exchange", "beijing"],
  },
];

// 新闻内容数据
const mockNews = [
  {
    id: 1,
    title: "理光中国发布2024年度战略规划",
    category: "公司动态",
    author: "张三",
    publishDate: "2024-02-15",
    views: 3520,
    status: "published",
    thumbnail: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400",
    tags: ["战略规划", "公司新闻", "2024", "发展方向"],
  },
  {
    id: 2,
    title: "理光荣获2023年度最佳办公设备供应商",
    category: "行业荣誉",
    author: "李四",
    publishDate: "2024-02-10",
    views: 2890,
    status: "published",
    thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400",
    tags: ["行业荣誉", "奖项", "品牌认可", "办公设备"],
  },
  {
    id: 3,
    title: "理光新一代智能打印机技术解析",
    category: "产品新闻",
    author: "王五",
    publishDate: "2024-02-05",
    views: 4120,
    status: "published",
    thumbnail: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=400",
    tags: ["产品技术", "智能打印", "技术解析", "创新"],
  },
];

// 通知推送数据
const mockNotifications = [
  {
    id: 1,
    title: "系统维护通知",
    content: "系统将于2024年2月20日02:00-06:00进行维护升级",
    type: "title",
    notificationType: "system",
    target: "all_users",
    sendTime: "2024-02-18 10:00:00",
    status: "sent",
    readCount: 1250,
    totalCount: 1500,
    image: "",
    link: "",
    enableLink: false,
  },
  {
    id: 2,
    title: "新产品上线通知",
    content: "RICOH IM C8000系列新品已上架，欢迎咨询。我们为您提供专业的办公解决方案，包括高速打印、智能扫描等多项功能。",
    type: "content",
    notificationType: "marketing",
    target: "dealers",
    sendTime: "2024-02-15 09:00:00",
    status: "sent",
    readCount: 180,
    totalCount: 200,
    image: "",
    link: "/products/ricoh-im-c8000",
    enableLink: true,
  },
  {
    id: 3,
    title: "春季大促活动",
    content: "春季大促即将开始，敬请期待",
    type: "image",
    notificationType: "marketing",
    target: "customers",
    sendTime: "",
    status: "draft",
    readCount: 0,
    totalCount: 0,
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800",
    link: "/activities/spring-sale-2024",
    enableLink: true,
  },
];

// 用户指南数据 (RICOH产品使用TIPS)
const mockUserGuides = [
  {
    id: 1,
    title: "如何设置双面打印节省纸张",
    product: "RICOH IM C系列",
    category: "基础操作",
    difficulty: "简单",
    content: "双面打印是节省纸张和降低成本的有效方法。以下是设置步骤：\n\n1. 打开打印机控制面板\n2. 选择【设置】→【打印设置】\n3. 找到【双面打印】选项并启用\n4. 选择装订边（长边或短边）\n5. 点击【应用】保存设置\n\n💡 小贴士：设置默认双面打印可节省高达50%的纸张成本。",
    views: 1520,
    likes: 89,
    helpful: 156,
    createTime: "2024-02-01",
    updateTime: "2024-02-15",
    status: "published",
    thumbnail: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=400",
    tags: ["节能环保", "双面打印", "成本节约", "基础设置"],
  },
  {
    id: 2,
    title: "定期清洁打印头保持最佳打印质量",
    product: "RICOH MP系列",
    category: "维护保养",
    difficulty: "简单",
    content: "定期清洁打印头可以确保打印质量，避免出现条纹或污点。\n\n清洁步骤：\n1. 打开前盖板，取出墨盒\n2. 使用专用清洁布轻轻擦拭打印头\n3. 等待5分钟使其完全干燥\n4. 重新安装墨盒并关闭盖板\n5. 运行打印头清洁程序：【设置】→【维护】→【清洁打印头】\n\n⚠️ 注意：每月至少清洁一次，确保最佳打印效果。",
    views: 2340,
    likes: 145,
    helpful: 201,
    createTime: "2024-01-28",
    updateTime: "2024-02-10",
    status: "published",
    thumbnail: "https://images.unsplash.com/photo-1612814824743-c760091da7f6?w=400",
    tags: ["维护保养", "打印质量", "清洁", "定期维护"],
  },
  {
    id: 3,
    title: "快速解决卡纸问题",
    product: "全系列",
    category: "故障排除",
    difficulty: "中等",
    content: "卡纸是打印机常见问题，可按以下步骤排查：\n\n1. 关闭打印机电源。\n2. 打开可能卡纸的位置（进纸器、出纸槽、后盖板）。\n3. 沿出纸方向轻轻拉出卡住纸张。\n4. 检查是否有纸屑残留。\n5. 合上盖板并重新开机。\n\n预防建议：\n- 使用合格纸张（70-90g/m²）。\n- 纸张不要装得过满。\n- 保持纸张干燥。\n- 定期清洁进纸滚轮。",
    views: 3850,
    likes: 198,
    helpful: 342,
    createTime: "2024-01-25",
    updateTime: "2024-02-18",
    status: "published",
    thumbnail: "https://images.unsplash.com/photo-1728722740555-9c523d21bccd?w=400",
    tags: ["故障排除", "卡纸", "常见问题", "维修指南"],
  },
  {
    id: 4,
    title: "使用扫描到邮件功能",
    product: "RICOH IM C系列",
    category: "高级功能",
    difficulty: "中等",
    content: "扫描到邮件功能可将扫描文件直接发送到指定邮箱。\n\n配置步骤：\n1. 进入【设置】→【网络】→【邮件设置】。\n2. 配置 SMTP 服务器信息。\n3. 输入发件邮箱地址和密码。\n4. 保存并测试连接。\n\n使用方法：\n1. 将文件放在扫描台。\n2. 选择【扫描到邮件】。\n3. 输入收件人邮箱。\n4. 选择文件格式（PDF/JPG）。\n5. 点击【发送】。\n\n提示：可设置常用联系人列表，提高操作效率。",
    views: 1680,
    likes: 112,
    helpful: 178,
    createTime: "2024-02-05",
    updateTime: "2024-02-12",
    status: "published",
    thumbnail: "https://images.unsplash.com/photo-1760126722852-2fafd56ceebb?w=400",
    tags: ["高级功能", "扫描", "邮件", "办公效率"],
  },
  {
    id: 5,
    title: "设置安全打印保护文档隐私",
    product: "RICOH MP系列",
    category: "安全功能",
    difficulty: "中等",
    content: "安全打印可确保文档仅在输入密码后打印。\n\n设置方法：\n1. 在打印对话框选择【安全打印】。\n2. 设置 4 位 PIN 码。\n3. 输入文档名称（可选）。\n4. 点击【打印】。\n\n打印文档：\n1. 到打印机前打开【安全打印】。\n2. 输入用户名和 PIN 码。\n3. 选择文档并打印。\n\n适用场景：财务报表、合同文件、机密资料等。",
    views: 1290,
    likes: 78,
    helpful: 134,
    createTime: "2024-02-08",
    updateTime: "2024-02-08",
    status: "published",
    thumbnail: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=400",
    tags: ["安全功能", "隐私保护", "安全打印", "企业应用"],
  },
  {
    id: 6,
    title: "优化打印速度的5个技巧",
    product: "全系列",
    category: "性能优化",
    difficulty: "中等",
    content: "以下技巧可显著提升打印速度：\n\n1. 使用草稿模式\n- 适用于内部文档。\n- 可节省墨粉并加快速度。\n\n2. 批量打印\n- 合并多个小任务，减少等待。\n\n3. 选择合适分辨率\n- 文本文档建议 300dpi。\n- 图片文档建议 600dpi。\n\n4. 关闭不必要功能\n- 不需要时关闭双面打印、页眉页脚等。\n\n5. 定期维护\n- 清洁打印机并更新驱动程序。\n\n效果：在高频场景下可明显提升打印效率。",
    views: 2150,
    likes: 167,
    helpful: 234,
    createTime: "2024-02-12",
    updateTime: "2024-02-20",
    status: "published",
    thumbnail: "https://images.unsplash.com/photo-1612814824743-c760091da7f6?w=400",
    tags: ["性能优化", "打印速度", "效率提升", "实用技巧"],
  },
];

// 收集表单数据
const mockForms = [
  {
    id: 1,
    name: "产品咨询表单",
    type: "inquiry",
    description: "用于收集客户产品咨询信息",
    fields: [
      { id: 1, label: "姓名", type: "text", required: true },
      { id: 2, label: "联系电话", type: "phone", required: true },
      { id: 3, label: "公司名称", type: "text", required: false },
      { id: 4, label: "咨询产品", type: "select", required: true, options: ["打印机", "复印机", "扫描仪"] },
      { id: 5, label: "详细需求", type: "textarea", required: false },
    ],
    submissions: 350,
    createTime: "2024-01-10",
    status: "active",
  },
  {
    id: 2,
    name: "报修申请表",
    type: "service",
    description: "用于收集客户售后服务需求",
    fields: [
      { id: 1, label: "姓名", type: "text", required: true },
      { id: 2, label: "联系电话", type: "phone", required: true },
      { id: 3, label: "设备型号", type: "text", required: true },
      { id: 4, label: "购买日期", type: "date", required: true },
      { id: 5, label: "故障描述", type: "textarea", required: true },
      { id: 6, label: "紧急程度", type: "select", required: true, options: ["紧急", "一般", "不急"] },
      { id: 7, label: "预约时间", type: "datetime", required: false },
      { id: 8, label: "附件上传", type: "file", required: false },
      { id: 9, label: "SN号", type: "text", required: true },
      { id: 10, label: "service order", type: "text", required: true },
      { id: 11, label: "状态", type: "select", required: true, options: ["待处理", "处理中", "已完成"] },
      { id: 12, label: "problem NO.", type: "text", required: true },
    ],
    submissions: 128,
    createTime: "2024-01-15",
    status: "active",
  },
  {
    id: 3,
    name: "经销商加盟申请",
    type: "partnership",
    description: "用于收集经销商加盟意向信息",
    fields: [
      { id: 1, label: "公司名称", type: "text", required: true },
      { id: 2, label: "联系人", type: "text", required: true },
      { id: 3, label: "联系电话", type: "phone", required: true },
      { id: 4, label: "电子邮箱", type: "email", required: true },
      { id: 5, label: "公司地址", type: "text", required: true },
      { id: 6, label: "注册资金（万元）", type: "number", required: true },
      { id: 7, label: "经营范围", type: "textarea", required: true },
      { id: 8, label: "代理区域", type: "text", required: true },
      { id: 9, label: "团队规模", type: "select", required: true, options: ["10人以下", "10-50人", "50-100人", "100人以上"] },
      { id: 10, label: "行业经验（年）", type: "number", required: true },
      { id: 11, label: "营业执照", type: "file", required: true },
      { id: 12, label: "其他说明", type: "textarea", required: false },
    ],
    submissions: 45,
    createTime: "2024-01-20",
    status: "active",
  },
  {
    id: 4,
    name: "市场活动报名表",
    type: "event",
    description: "用于收集市场活动报名信息",
    fields: [
      { id: 1, label: "姓名", type: "text", required: true },
      { id: 2, label: "手机号", type: "phone", required: true },
      { id: 3, label: "邮箱", type: "email", required: true },
      { id: 4, label: "公司/组织", type: "text", required: false },
      { id: 5, label: "职位", type: "text", required: false },
      { id: 6, label: "参会人数", type: "number", required: true },
    ],
    submissions: 520,
    createTime: "2024-02-01",
    status: "active",
  },
];

// 理光产品数据
const ricohProducts = [
  {
    id: 101,
    title: "RICOH MP C3004exSP",
    type: "product",
    category: "彩色多功能打印机",
    author: "理光官方",
    status: "published",
    views: 3520,
    createTime: "2024-01-20",
    thumbnail: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=400",
    productCode: "MP-C3004exSP",
    printSpeed: "30页/分钟",
    features: "高速彩色打印、复印、扫描、传真一体机，支持移动打印和云服务",
    price: "面议",
  },
  {
    id: 102,
    title: "RICOH MP C3504exSP",
    type: "product",
    category: "彩色多功能打印机",
    author: "理光官方",
    status: "published",
    views: 3180,
    createTime: "2024-01-20",
    thumbnail: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=400",
    productCode: "MP-C3504exSP",
    printSpeed: "35页/分钟",
    features: "中高速彩色多功能机，适合中型办公室，支持多种纸张处理功能",
    price: "面议",
  },
  {
    id: 103,
    title: "RICOH IM C4500",
    type: "product",
    category: "彩色多功能打印机",
    author: "理光官方",
    status: "published",
    views: 3200,
    createTime: "2024-01-22",
    thumbnail: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=400",
    productCode: "IM-C4500",
    printSpeed: "45页/分钟",
    features: "智能工作流程自动化，增强的安全功能，节能环保设计",
    price: "面议",
  },
  {
    id: 104,
    title: "RICOH IM C6000",
    type: "product",
    category: "彩色多功能打印机",
    author: "理光官方",
    status: "published",
    views: 2980,
    createTime: "2024-01-22",
    thumbnail: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=400",
    productCode: "IM-C6000",
    printSpeed: "60页/分钟",
    features: "高端智能多功能机，支持高级色彩管理和专业印刷功能",
    price: "面议",
  },
];

const mockTrainingCourses = [
  {
    id: 1,
    title: "RICOH IM C Series Basics",
    category: "Basic Operation",
    level: "Beginner",
    durationHours: 4,
    instructor: "Trainer A",
    enrolledCount: 128,
    passRate: 92,
    status: "active",
    updateTime: "2024-02-20",
  },
  {
    id: 2,
    title: "Maintenance and Troubleshooting",
    category: "Maintenance",
    level: "Intermediate",
    durationHours: 6,
    instructor: "Trainer B",
    enrolledCount: 86,
    passRate: 84,
    status: "active",
    updateTime: "2024-02-18",
  },
  {
    id: 3,
    title: "Channel Sales Consultant Advanced",
    category: "Sales",
    level: "Advanced",
    durationHours: 8,
    instructor: "Trainer C",
    enrolledCount: 52,
    passRate: 76,
    status: "inactive",
    updateTime: "2024-02-10",
  },
];

const mockCertifications = [
  {
    id: 1,
    name: "RICOH Product Consultant (Junior)",
    examCode: "RCP-101",
    relatedCourse: "RICOH IM C Series Basics",
    questionCount: 50,
    passScore: 60,
    examDurationMin: 60,
    participants: 240,
    passRate: 88,
    status: "active",
    updateTime: "2024-02-19",
  },
  {
    id: 2,
    name: "RICOH Maintenance Engineer (Mid)",
    examCode: "RME-201",
    relatedCourse: "Maintenance and Troubleshooting",
    questionCount: 80,
    passScore: 70,
    examDurationMin: 90,
    participants: 132,
    passRate: 81,
    status: "active",
    updateTime: "2024-02-16",
  },
  {
    id: 3,
    name: "Channel Sales Consultant (Senior)",
    examCode: "RSC-301",
    relatedCourse: "Channel Sales Consultant Advanced",
    questionCount: 100,
    passScore: 75,
    examDurationMin: 120,
    participants: 68,
    passRate: 73,
    status: "inactive",
    updateTime: "2024-02-09",
  },
];

const statusMap: Record<string, { label: string; variant: "default" | "secondary" | "destructive" }> = {
  active: { label: "启用中", variant: "default" },
  inactive: { label: "已停用", variant: "secondary" },
  published: { label: "已发布", variant: "default" },
  draft: { label: "草稿", variant: "secondary" },
  upcoming: { label: "即将开始", variant: "secondary" },
  ongoing: { label: "进行中", variant: "default" },
  completed: { label: "已完成", variant: "secondary" },
  sent: { label: "已发送", variant: "default" },
};

type CaseItem = (typeof mockCases)[number];
type ActivityItem = (typeof mockActivities)[number];
type NewsItem = (typeof mockNews)[number];
type ProductItem = (typeof ricohProducts)[number];
type UserGuideItem = (typeof mockUserGuides)[number];
type TrainingCourseItem = (typeof mockTrainingCourses)[number];
type CertificationItem = (typeof mockCertifications)[number];
type FormItem = (typeof mockForms)[number];
type FormField = FormItem["fields"][number];

const bannerTagMap: Record<number, string[]> = {
  1: ["homepage", "campaign", "new"],
  2: ["homepage", "product", "launch"],
  3: ["sidebar", "enterprise", "solution"],
  4: ["splash", "holiday", "brand"],
};

const notificationTagMap: Record<number, string[]> = {
  1: ["system", "maintenance", "important"],
  2: ["marketing", "new-product", "dealers"],
  3: ["marketing", "campaign", "customers"],
};

const formTagMap: Record<number, string[]> = {
  1: ["inquiry", "product", "lead"],
  2: ["service", "support", "after-sales"],
  3: ["partnership", "channel", "business"],
  4: ["event", "registration", "marketing"],
};

const productTagMap: Record<number, string[]> = {
  101: ["color-mfp", "office", "mid-volume"],
  102: ["color-mfp", "workgroup", "high-volume"],
  103: ["smart", "security", "energy-saving"],
  104: ["premium", "production", "enterprise"],
};

const courseTagMap: Record<number, string[]> = {
  1: ["beginner", "operation"],
  2: ["maintenance", "troubleshooting"],
  3: ["sales", "advanced"],
};

const certificationTagMap: Record<number, string[]> = {
  1: ["junior", "product"],
  2: ["intermediate", "maintenance"],
  3: ["senior", "sales"],
};

export default function ContentManagement() {
  const [mainTab, setMainTab] = useState("banners");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [bannerDialogOpen, setBannerDialogOpen] = useState(false);
  const [activityDialogOpen, setActivityDialogOpen] = useState(false);
  const [notificationDialogOpen, setNotificationDialogOpen] = useState(false);
  const [notificationType, setNotificationType] = useState("title");
  const [enableLink, setEnableLink] = useState(false);
  const [bannerPosition, setBannerPosition] = useState("homepage");
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [editingFormId, setEditingFormId] = useState<number | null>(null);
  const [formMeta, setFormMeta] = useState({
    name: "",
    type: "inquiry",
    description: "",
  });
  const [banners, setBanners] = useState(mockBanners);
  const [cases, setCases] = useState(mockCases);
  const [activities, setActivities] = useState(mockActivities);
  const [news, setNews] = useState(mockNews);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [forms, setForms] = useState<FormItem[]>(mockForms);
  const [products, setProducts] = useState(ricohProducts);
  const [productTagsMap, setProductTagsMap] = useState<Record<number, string[]>>(productTagMap);
  const [productSearchTerm, setProductSearchTerm] = useState("");
  const [userGuides, setUserGuides] = useState(mockUserGuides);
  const [trainingCourses, setTrainingCourses] = useState(mockTrainingCourses);
  const [certifications, setCertifications] = useState(mockCertifications);
  const [guideSearchTerm, setGuideSearchTerm] = useState("");
  const [courseSearchTerm, setCourseSearchTerm] = useState("");
  const [certSearchTerm, setCertSearchTerm] = useState("");
  const [guideDialogOpen, setGuideDialogOpen] = useState(false);
  const [courseDialogOpen, setCourseDialogOpen] = useState(false);
  const [certDialogOpen, setCertDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  
  // 标签管理状态
  const [selectedTags, setSelectedTags] = useState<Record<string, string[]>>({
    banners: [],
    cases: [],
    activities: [],
    news: [],
    notifications: [],
    forms: [],
    products: [],
    guides: [],
    courses: [],
    certifications: [],
  });
  const [tagInput, setTagInput] = useState("");
  const [currentTags, setCurrentTags] = useState<string[]>([]);
  const [bannerTagInput, setBannerTagInput] = useState("");
  const [bannerTags, setBannerTags] = useState<string[]>([]);
  const [courseTagInput, setCourseTagInput] = useState("");
  const [courseFormTags, setCourseFormTags] = useState<string[]>([]);
  const [certTagInput, setCertTagInput] = useState("");
  const [certFormTags, setCertFormTags] = useState<string[]>([]);
  const [productEditDialogOpen, setProductEditDialogOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [productEditTagInput, setProductEditTagInput] = useState("");
  const [productEditTags, setProductEditTags] = useState<string[]>([]);
  const [productEditForm, setProductEditForm] = useState({
    title: "",
    type: "",
    category: "",
    author: "",
    status: "",
    views: "",
    createTime: "",
    thumbnail: "",
    productCode: "",
    printSpeed: "",
    features: "",
    price: "",
    visible: true,
  });
  const [mcqQuestions, setMcqQuestions] = useState<Array<{
    id: number;
    question: string;
    options: string[];
    answer: string;
    score: number;
  }>>([{ id: 1, question: "", options: ["", "", "", ""], answer: "A", score: 2 }]);
  
  // URL导入相关状态
  const [importUrl, setImportUrl] = useState("");
  const [isImporting, setIsImporting] = useState(false);
  const [importSuccess, setImportSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    summary: "",
    author: "",
    customer: "",
    industry: "",
    solution: "",
    category: "",
  });

  // 初始化产品数据 - 更新图片和可见性
  useEffect(() => {
    const updatedProducts = ricohProducts.map((product, index) => {
      const printerImages = [
        "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbnRlcnByaXNlJTIwcHJpbnRlciUyMGVxdWlwbWVudHxlbnwxfHx8fDE3NzIxMTk2NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1612814824743-c760091da7f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvciUyMGxhc2VyJTIwcHJpbnRlcnxlbnwxfHx8fDE3NzIxMTk2NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1728722740555-9c523d21bccd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwcmludGVyJTIwbWFjaGluZXxlbnwxfHx8fDE3NzIxMTk2NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1760126722852-2fafd56ceebb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjBwcmludGVyJTIwcmljb2glMjBicmFuZHxlbnwxfHx8fDE3NzIxMTk2NDF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      ];
      return {
        ...product,
        thumbnail: printerImages[index] || printerImages[0],
        visible: index < 3, // 前3个可见，1个不可见
      };
    });
    setProducts(updatedProducts);
  }, []);

  const getBannerTags = (id: number) => bannerTagMap[id] || [];
  const getBannerTitleZh = (title: string) => bannerTitleZhMap[title] || title;
  const getBannerPositionZh = (position: string) => bannerPositionZhMap[position] || position;
  const getCaseTitleZh = (value: string) => caseTitleZhMap[value] || value;
  const getCaseCustomerZh = (value: string) => caseCustomerZhMap[value] || value;
  const getCaseIndustryZh = (value: string) => caseIndustryZhMap[value] || value;
  const getCaseSolutionZh = (value: string) => caseSolutionZhMap[value] || value;
  const getCaseTagZh = (value: string) => caseTagZhMap[value] || value;
  const getActivityTitleZh = (value: string) => activityTitleZhMap[value] || value;
  const getActivityTypeZh = (value: string) => activityTypeZhMap[value] || value;
  const getActivityLocationZh = (value: string) => activityLocationZhMap[value] || value;
  const getActivityTagZh = (value: string) => activityTagZhMap[value] || value;
  const getNotificationTags = (id: number) => notificationTagMap[id] || [];
  const getFormTags = (id: number) => formTagMap[id] || [];
  const getProductTags = (id: number) => productTagsMap[id] || [];
  const getCourseTags = (id: number) => courseTagMap[id] || [];
  const getCertificationTags = (id: number) => certificationTagMap[id] || [];

  const filteredBanners = banners.filter((banner) => {
    const tags = getBannerTags(banner.id);
    return (
      !selectedTags.banners ||
      selectedTags.banners.length === 0 ||
      selectedTags.banners.some((tag: string) => tags.includes(tag))
    );
  });

  const filteredNotifications = notifications.filter((notification) => {
    const tags = getNotificationTags(notification.id);
    return (
      !selectedTags.notifications ||
      selectedTags.notifications.length === 0 ||
      selectedTags.notifications.some((tag: string) => tags.includes(tag))
    );
  });

  const filteredForms = forms.filter((form) => {
    const tags = getFormTags(form.id);
    return (
      !selectedTags.forms ||
      selectedTags.forms.length === 0 ||
      selectedTags.forms.some((tag: string) => tags.includes(tag))
    );
  });

  const filteredProducts = products.filter((product) => {
    const tags = getProductTags(product.id);
    const matchSearch =
      product.title.toLowerCase().includes(productSearchTerm.toLowerCase()) ||
      product.productCode.toLowerCase().includes(productSearchTerm.toLowerCase()) ||
      tags.some((tag: string) => tag.toLowerCase().includes(productSearchTerm.toLowerCase()));
    const matchTags =
      !selectedTags.products ||
      selectedTags.products.length === 0 ||
      selectedTags.products.some((tag: string) => tags.includes(tag));

    return matchSearch && matchTags;
  });

  const filteredGuides = userGuides.filter((guide) => {
    const matchSearch = guide.title.toLowerCase().includes(guideSearchTerm.toLowerCase()) ||
                        guide.product.toLowerCase().includes(guideSearchTerm.toLowerCase());
    const matchCategory = selectedCategory === "all" || guide.category === selectedCategory;
    const matchDifficulty = selectedDifficulty === "all" || guide.difficulty === selectedDifficulty;
    const matchTags = !selectedTags.guides || selectedTags.guides.length === 0 || 
                      selectedTags.guides.some((tag: string) => guide.tags?.includes(tag));
    
    return matchSearch && matchCategory && matchDifficulty && matchTags;
  });

  const filteredCourses = trainingCourses.filter((course) => {
    const tags = getCourseTags(course.id);
    const matchSearch =
      course.title.toLowerCase().includes(courseSearchTerm.toLowerCase()) ||
      course.category.toLowerCase().includes(courseSearchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(courseSearchTerm.toLowerCase()) ||
      tags.some((tag: string) => tag.toLowerCase().includes(courseSearchTerm.toLowerCase()));
    const matchTags =
      !selectedTags.courses ||
      selectedTags.courses.length === 0 ||
      selectedTags.courses.some((tag: string) => tags.includes(tag));

    return matchSearch && matchTags;
  });

  const filteredCertifications = certifications.filter((cert) => {
    const tags = getCertificationTags(cert.id);
    const matchSearch =
      cert.name.toLowerCase().includes(certSearchTerm.toLowerCase()) ||
      cert.examCode.toLowerCase().includes(certSearchTerm.toLowerCase()) ||
      cert.relatedCourse.toLowerCase().includes(certSearchTerm.toLowerCase()) ||
      tags.some((tag: string) => tag.toLowerCase().includes(certSearchTerm.toLowerCase()));
    const matchTags =
      !selectedTags.certifications ||
      selectedTags.certifications.length === 0 ||
      selectedTags.certifications.some((tag: string) => tags.includes(tag));

    return matchSearch && matchTags;
  });

  const handleDelete = (id: number, type: string) => {
    switch(type) {
      case 'banner':
        setBanners(banners.filter(item => item.id !== id));
        break;
      case 'case':
        setCases(cases.filter(item => item.id !== id));
        break;
      case 'activity':
        setActivities(activities.filter(item => item.id !== id));
        break;
      case 'news':
        setNews(news.filter(item => item.id !== id));
        break;
      case 'notification':
        setNotifications(notifications.filter(item => item.id !== id));
        break;
      case 'form':
        setForms(forms.filter(item => item.id !== id));
        break;
      case 'guide':
        setUserGuides(userGuides.filter(item => item.id !== id));
        break;
      case 'course':
        setTrainingCourses(trainingCourses.filter(item => item.id !== id));
        break;
      case 'cert':
        setCertifications(certifications.filter(item => item.id !== id));
        break;
    }
  };

  // 切换产品可见性
  const toggleProductVisibility = (productId: number) => {
    setProducts(products.map(product => 
      product.id === productId 
        ? { ...product, visible: !product.visible }
        : product
    ));
  };

  const handleOpenProductEdit = (product: ProductItem) => {
    setEditingProductId(product.id);
    setProductEditForm({
      title: product.title || "",
      type: product.type || "",
      category: product.category || "",
      author: product.author || "",
      status: product.status || "",
      views: String(product.views ?? 0),
      createTime: product.createTime || "",
      thumbnail: product.thumbnail || "",
      productCode: product.productCode || "",
      printSpeed: product.printSpeed || "",
      features: product.features || "",
      price: product.price || "",
      visible: product.visible !== false,
    });
    setProductEditTags([...(getProductTags(product.id) || [])]);
    setProductEditTagInput("");
    setProductEditDialogOpen(true);
  };

  const handleSaveProductEdit = () => {
    if (editingProductId === null) return;
    setProducts((prev) =>
      prev.map((product) =>
        product.id === editingProductId
          ? {
              ...product,
              ...productEditForm,
              views: Number(productEditForm.views || 0),
            }
          : product,
      ),
    );
    setProductTagsMap((prev) => ({
      ...prev,
      [editingProductId]: productEditTags,
    }));
    setProductEditDialogOpen(false);
    setEditingProductId(null);
  };

  // 模拟URL导入功能
  const handleImportFromUrl = async () => {
    if (!importUrl) return;
    
    setIsImporting(true);
    setImportSuccess(false);

    // 模拟网络请求延迟
    await new Promise(resolve => setTimeout(resolve, 1500));

    // 根据当前标签页判断导入类型
    let mockData: Partial<typeof formData> = {};
    
    if (mainTab === "cases") {
      // 案例库模拟数据
      mockData = {
        title: "数字化办公转型案例：企业效率提升实践",
        customer: "示例科技有限公司",
        industry: "科技",
        solution: "智能办公与文档管理一体化方案",
        content:
          "该企业上线智能打印与文档管理系统后，完成了打印流程标准化与自动化，减少重复操作，提升协同效率。项目实施后，打印成本显著下降，文档流转效率明显提升。",
        summary:
          "通过规范化办公流程显著提升效率并降低打印成本。",
      };
    } else if (mainTab === "news") {
      // 新闻内容模拟数据
      mockData = {
        title: "数字化办公趋势：智能打印驱动组织升级",
        author: "行业观察员",
        category: "行业动态",
        content:
          "随着数字化进程加速，企业办公场景正在从基础电子化走向智能化。智能打印作为关键环节，正在与权限控制、流程审批和移动办公能力深度结合，帮助组织提升效率并强化信息安全。",
        summary:
          "智能打印与数字化流程融合，正在成为企业提升效率、降低成本和增强安全能力的重要抓手。",
      };
    }

    // 更新表单数据
    setFormData(mockData);
    setIsImporting(false);
    setImportSuccess(true);

    // 3秒后清除成功提示
    setTimeout(() => setImportSuccess(false), 3000);
  };

  // 重置导入状态
  const resetImport = () => {
    setImportUrl("");
    setImportSuccess(false);
    setFormData({
      title: "",
      content: "",
      summary: "",
      author: "",
      customer: "",
      industry: "",
      solution: "",
      category: "",
    });
  };

  // 打开对话框时重置状态
  const handleOpenDialog = () => {
    resetImport();
    setDialogOpen(true);
  };

  const resetFormEditor = () => {
    setEditingFormId(null);
    setFormMeta({
      name: "",
      type: "inquiry",
      description: "",
    });
    setFormFields([]);
  };

  const closeFormDialog = () => {
    setFormDialogOpen(false);
    resetFormEditor();
  };

  const handleOpenCreateFormDialog = () => {
    resetFormEditor();
    setFormDialogOpen(true);
  };

  const handleOpenEditFormDialog = (form: FormItem) => {
    setEditingFormId(form.id);
    setFormMeta({
      name: form.name,
      type: form.type,
      description: form.description,
    });
    setFormFields(
      form.fields.map((field) => ({
        ...field,
        options: field.options ? [...field.options] : [],
      })),
    );
    setFormDialogOpen(true);
  };

  const handleSubmitFormDialog = () => {
    const normalizedFields = formFields.map((field, index) => ({
      ...field,
      id: index + 1,
      label: field.label.trim(),
      options: field.type === "select" ? (field.options || []).filter((option) => option.trim()) : undefined,
    }));

    if (editingFormId !== null) {
      setForms((prev) =>
        prev.map((form) =>
          form.id === editingFormId
            ? {
                ...form,
                name: formMeta.name.trim(),
                type: formMeta.type,
                description: formMeta.description.trim(),
                fields: normalizedFields,
              }
            : form,
        ),
      );
    } else {
      const newId = forms.length > 0 ? Math.max(...forms.map((item) => item.id)) + 1 : 1;
      const today = new Date().toISOString().slice(0, 10);
      setForms((prev) => [
        ...prev,
        {
          id: newId,
          name: formMeta.name.trim(),
          type: formMeta.type,
          description: formMeta.description.trim(),
          fields: normalizedFields,
          submissions: 0,
          createTime: today,
          status: "active",
        },
      ]);
    }

    closeFormDialog();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>内容管理</CardTitle>
          <p className="text-sm text-gray-600">管理网站与移动端的各类内容、活动和推广信息</p>
        </CardHeader>
        <CardContent>
          <Tabs value={mainTab} onValueChange={setMainTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-10">
              <TabsTrigger value="banners" className="flex items-center gap-2">
                <MonitorPlay className="h-4 w-4" />
                广告位
              </TabsTrigger>
              <TabsTrigger value="cases" className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                案例库
              </TabsTrigger>
              <TabsTrigger value="activities" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                市场活动
              </TabsTrigger>
              <TabsTrigger value="news" className="flex items-center gap-2">
                <Newspaper className="h-4 w-4" />
                新闻内容
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                通知推送
              </TabsTrigger>
              <TabsTrigger value="forms" className="flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                收集表单
              </TabsTrigger>
              <TabsTrigger value="products" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                产品库
              </TabsTrigger>
              <TabsTrigger value="guides" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                用户指南
              </TabsTrigger>
              <TabsTrigger value="courses" className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                经销商学院
              </TabsTrigger>
              <TabsTrigger value="certifications" className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4" />
                技术认证
              </TabsTrigger>
            </TabsList>

            {/* 广告位管理 */}
            <TabsContent value="banners" className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">广告位管理</h3>
                  <p className="text-sm text-gray-600">管理网站首页、侧边栏等位置的广告横幅</p>
                </div>
                <Button onClick={() => setBannerDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  添加广告位
                </Button>
              </div>

              {banners.some((b) => getBannerTags(b.id).length > 0) && (
                <div className="bg-gray-50 rounded-lg p-4 border">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-gray-700">标签快捷索引</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {Array.from(new Set(banners.flatMap((b) => getBannerTags(b.id)))).map((tag: string) => {
                      const isSelected = selectedTags.banners?.includes(tag);
                      return (
                        <Badge
                          key={tag}
                          variant={isSelected ? "default" : "outline"}
                          className={isSelected ? "cursor-pointer transition-all bg-blue-600" : "cursor-pointer transition-all hover:bg-blue-50"}
                          onClick={() => {
                            const currentSelected = selectedTags.banners || [];
                            setSelectedTags({
                              ...selectedTags,
                              banners: isSelected
                                ? currentSelected.filter((t: string) => t !== tag)
                                : [...currentSelected, tag]
                            });
                          }}
                        >
                          {getCaseTagZh(tag)}
                          {isSelected && <X className="h-3 w-3 ml-1" />}
                        </Badge>
                      );
                    })}
                    {selectedTags.banners && selectedTags.banners.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedTags({ ...selectedTags, banners: [] })}
                        className="h-6 text-xs"
                      >
                        清除筛选
                      </Button>
                    )}
                  </div>
                </div>
              )}

              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>缩略图</TableHead>
                      <TableHead>标题</TableHead>
                      <TableHead>投放位置</TableHead>
                      <TableHead>特殊设置</TableHead>
                      <TableHead>开始时间</TableHead>
                      <TableHead>结束时间</TableHead>
                      <TableHead>排序</TableHead>
                      <TableHead>状态</TableHead>
                      <TableHead className="text-center">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBanners.map((banner) => (
                      <TableRow key={banner.id}>
                        <TableCell>
                          <img 
                            src={banner.image} 
                            alt={getBannerTitleZh(banner.title)}
                            className="w-24 h-12 object-cover rounded"
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          <div>{getBannerTitleZh(banner.title)}</div>
                          {getBannerTags(banner.id).length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {getBannerTags(banner.id).slice(0, 2).map((tag: string) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge variant={banner.position === "splash" ? "default" : "outline"}>
                            {getBannerPositionZh(banner.position)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {banner.position === "splash" ? (
                            <div className="text-xs text-gray-600 space-y-1">
                              <div>时长: {banner.duration}秒</div>
                              <div>{banner.skippable ? "✅ 可跳过" : "❌ 不可跳过"}</div>
                              <div>频次: 每天{banner.frequency}次</div>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-400">-</span>
                          )}
                        </TableCell>
                        <TableCell className="text-sm">{banner.startDate}</TableCell>
                        <TableCell className="text-sm">{banner.endDate}</TableCell>
                        <TableCell>{banner.order}</TableCell>
                        <TableCell>
                          <Badge variant={statusMap[banner.status].variant}>
                            {statusMap[banner.status].label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-center gap-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleDelete(banner.id, 'banner')}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* 案例库维护 */}
            <TabsContent value="cases" className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">案例库维护</h3>
                  <p className="text-sm text-gray-600">管理客户成功案例和行业解决方案</p>
                </div>
                <Button onClick={() => handleOpenDialog()}>
                  <Plus className="h-4 w-4 mr-2" />
                  添加案例
                </Button>
              </div>

              {/* 标签快捷索引 */}
              {cases.some((c: CaseItem) => c.tags && c.tags.length > 0) && (
                <div className="bg-gray-50 rounded-lg p-4 border">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-gray-700">标签快捷索引</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {Array.from(new Set(cases.flatMap((c: CaseItem) => c.tags || []))).map((tag: string) => {
                      const isSelected = selectedTags.cases?.includes(tag);
                      return (
                        <Badge
                          key={tag}
                          variant={isSelected ? "default" : "outline"}
                          className={isSelected ? "cursor-pointer transition-all bg-blue-600" : "cursor-pointer transition-all hover:bg-blue-50"}
                          onClick={() => {
                            const currentSelected = selectedTags.cases || [];
                            setSelectedTags({
                              ...selectedTags,
                              cases: isSelected
                                ? currentSelected.filter((t: string) => t !== tag)
                                : [...currentSelected, tag]
                            });
                          }}
                        >
                          {getCaseTagZh(tag)}
                          {isSelected && <X className="h-3 w-3 ml-1" />}
                        </Badge>
                      );
                    })}
                    {selectedTags.cases && selectedTags.cases.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedTags({ ...selectedTags, cases: [] })}
                        className="h-6 text-xs"
                      >
                        清除筛选
                      </Button>
                    )}
                  </div>
                </div>
              )}

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {cases
                  .filter((caseItem: CaseItem) => {
                    if (!selectedTags.cases || selectedTags.cases.length === 0) return true;
                    return selectedTags.cases.some((tag: string) => caseItem.tags?.includes(tag));
                  })
                  .map((caseItem) => (
                  <Card key={caseItem.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className="aspect-video bg-gray-100 relative">
                      <img
                        src={caseItem.thumbnail}
                        alt={getCaseTitleZh(caseItem.title)}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge>{getCaseIndustryZh(caseItem.industry)}</Badge>
                      </div>
                    </div>
                    <CardContent className="p-4 space-y-3">
                      <div>
                        <h3 className="font-semibold mb-2">{getCaseTitleZh(caseItem.title)}</h3>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p><span className="font-medium">客户</span>{getCaseCustomerZh(caseItem.customer)}</p>
                          <p><span className="font-medium">方案</span>{getCaseSolutionZh(caseItem.solution)}</p>
                          <p><span className="font-medium">产品</span>{caseItem.products}</p>
                        </div>
                      </div>

                      {/* 标签显示 */}
                      {caseItem.tags && caseItem.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-2 border-t">
                          {caseItem.tags.map((tag: string) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {getCaseTagZh(tag)}
                            </Badge>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between pt-2 border-t">
                        <span className="text-xs text-gray-500">{caseItem.createTime}</span>
                        <Badge variant={statusMap[caseItem.status].variant}>
                          {statusMap[caseItem.status].label}
                        </Badge>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="h-4 w-4 mr-2" />
                          编辑
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDelete(caseItem.id, 'case')}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* 市场活动管理 */}
            <TabsContent value="activities" className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">市场活动管理</h3>
                  <p className="text-sm text-gray-600">管理线上线下市场活动和研讨会</p>
                </div>
                <Button onClick={() => setActivityDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  创建活动
                </Button>
              </div>

              {/* 标签快捷索引 */}
              {activities.some((a: ActivityItem) => a.tags && a.tags.length > 0) && (
                <div className="bg-gray-50 rounded-lg p-4 border">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-gray-700">标签快捷索引</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {Array.from(new Set(activities.flatMap((a: ActivityItem) => a.tags || []))).map((tag: string) => {
                      const isSelected = selectedTags.activities?.includes(tag);
                      return (
                        <Badge
                          key={tag}
                          variant={isSelected ? "default" : "outline"}
                          className={isSelected ? "cursor-pointer transition-all bg-blue-600" : "cursor-pointer transition-all hover:bg-blue-50"}
                          onClick={() => {
                            const currentSelected = selectedTags.activities || [];
                            setSelectedTags({
                              ...selectedTags,
                              activities: isSelected
                                ? currentSelected.filter((t: string) => t !== tag)
                                : [...currentSelected, tag]
                            });
                          }}
                        >
                          {getActivityTagZh(tag)}
                          {isSelected && <X className="h-3 w-3 ml-1" />}
                        </Badge>
                      );
                    })}
                    {selectedTags.activities && selectedTags.activities.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedTags({ ...selectedTags, activities: [] })}
                        className="h-6 text-xs"
                      >
                        清除筛选
                      </Button>
                    )}
                  </div>
                </div>
              )}

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {activities
                  .filter((activity: ActivityItem) => {
                    if (!selectedTags.activities || selectedTags.activities.length === 0) return true;
                    return selectedTags.activities.some((tag: string) => activity.tags?.includes(tag));
                  })
                  .map((activity) => (
                  <Card key={activity.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className="aspect-video bg-gray-100 relative">
                      <img
                        src={activity.thumbnail}
                        alt={getActivityTitleZh(activity.title)}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge variant={statusMap[activity.status].variant}>
                          {statusMap[activity.status].label}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4 space-y-3">
                      <div>
                        <h3 className="font-semibold mb-2">{getActivityTitleZh(activity.title)}</h3>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p className="flex items-center gap-2">
                            <Badge variant="outline">{getActivityTypeZh(activity.type)}</Badge>
                          </p>
                          <p className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {getActivityLocationZh(activity.location)}
                          </p>
                          <p><span className="font-medium">时间</span>{activity.startDate}</p>
                          <p><span className="font-medium">参与人数</span>{activity.participants}人</p>
                        </div>
                      </div>

                      {/* 标签显示 */}
                      {activity.tags && activity.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-2 border-t">
                          {activity.tags.map((tag: string) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {getActivityTagZh(tag)}
                            </Badge>
                          ))}
                        </div>
                      )}

                      <div className="flex gap-2 pt-2 border-t">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="h-4 w-4 mr-2" />
                          编辑
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDelete(activity.id, 'activity')}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* 新闻内容管理 */}
            <TabsContent value="news" className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">新闻内容管理</h3>
                  <p className="text-sm text-gray-600">管理公司动态、行业新闻和产品资讯</p>
                </div>
                <Button onClick={() => handleOpenDialog()}>
                  <Plus className="h-4 w-4 mr-2" />
                  发布新闻
                </Button>
              </div>

              {/* 标签快捷索引 */}
              {news.some((n: NewsItem) => n.tags && n.tags.length > 0) && (
                <div className="bg-gray-50 rounded-lg p-4 border">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-gray-700">标签快捷索引</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {Array.from(new Set(news.flatMap((n: NewsItem) => n.tags || []))).map((tag: string) => {
                      const isSelected = selectedTags.news?.includes(tag);
                      return (
                        <Badge
                          key={tag}
                          variant={isSelected ? "default" : "outline"}
                          className={isSelected ? "cursor-pointer transition-all bg-blue-600" : "cursor-pointer transition-all hover:bg-blue-50"}
                          onClick={() => {
                            const currentSelected = selectedTags.news || [];
                            setSelectedTags({
                              ...selectedTags,
                              news: isSelected
                                ? currentSelected.filter((t: string) => t !== tag)
                                : [...currentSelected, tag]
                            });
                          }}
                        >
                          {tag}
                          {isSelected && <X className="h-3 w-3 ml-1" />}
                        </Badge>
                      );
                    })}
                    {selectedTags.news && selectedTags.news.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedTags({ ...selectedTags, news: [] })}
                        className="h-6 text-xs"
                      >
                        清除筛选
                      </Button>
                    )}
                  </div>
                </div>
              )}

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {news
                  .filter((newsItem: NewsItem) => {
                    if (!selectedTags.news || selectedTags.news.length === 0) return true;
                    return selectedTags.news.some((tag: string) => newsItem.tags?.includes(tag));
                  })
                  .map((newsItem) => (
                  <Card key={newsItem.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className="aspect-video bg-gray-100 relative">
                      <img
                        src={newsItem.thumbnail}
                        alt={newsItem.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge>{newsItem.category}</Badge>
                      </div>
                    </div>
                    <CardContent className="p-4 space-y-3">
                      <div>
                        <h3 className="font-semibold mb-2">{newsItem.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span>{newsItem.author}</span>
                          <span>·</span>
                          <span>{newsItem.publishDate}</span>
                        </div>
                      </div>

                      {/* 标签显示 */}
                      {newsItem.tags && newsItem.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-2 border-t">
                          {newsItem.tags.map((tag: string) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between text-sm pt-2 border-t">
                        <div className="flex items-center gap-2">
                          <Eye className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">{newsItem.views}</span>
                        </div>
                        <Badge variant={statusMap[newsItem.status].variant}>
                          {statusMap[newsItem.status].label}
                        </Badge>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="h-4 w-4 mr-2" />
                          编辑
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDelete(newsItem.id, 'news')}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* 通知推送 */}
            <TabsContent value="notifications" className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">通知推送</h3>
                  <p className="text-sm text-gray-600">管理系统通知和营销推送消息</p>
                </div>
                <Button onClick={() => setNotificationDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  创建通知
                </Button>
              </div>

              {notifications.some((n) => getNotificationTags(n.id).length > 0) && (
                <div className="bg-gray-50 rounded-lg p-4 border">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-gray-700">标签快捷索引</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {Array.from(new Set(notifications.flatMap((n) => getNotificationTags(n.id)))).map((tag: string) => {
                      const isSelected = selectedTags.notifications?.includes(tag);
                      return (
                        <Badge
                          key={tag}
                          variant={isSelected ? "default" : "outline"}
                          className={isSelected ? "cursor-pointer transition-all bg-blue-600" : "cursor-pointer transition-all hover:bg-blue-50"}
                          onClick={() => {
                            const currentSelected = selectedTags.notifications || [];
                            setSelectedTags({
                              ...selectedTags,
                              notifications: isSelected
                                ? currentSelected.filter((t: string) => t !== tag)
                                : [...currentSelected, tag]
                            });
                          }}
                        >
                          {tag}
                          {isSelected && <X className="h-3 w-3 ml-1" />}
                        </Badge>
                      );
                    })}
                    {selectedTags.notifications && selectedTags.notifications.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedTags({ ...selectedTags, notifications: [] })}
                        className="h-6 text-xs"
                      >
                        清除筛选
                      </Button>
                    )}
                  </div>
                </div>
              )}

              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>标题</TableHead>
                      <TableHead>内容</TableHead>
                      <TableHead>链接</TableHead>
                      <TableHead>类型</TableHead>
                      <TableHead>目标用户</TableHead>
                      <TableHead>发送时间</TableHead>
                      <TableHead>阅读数</TableHead>
                      <TableHead>状态</TableHead>
                      <TableHead className="text-center">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredNotifications.map((notification) => (
                      <TableRow key={notification.id}>
                        <TableCell className="font-medium">
                          <div>{notification.title}</div>
                          {getNotificationTags(notification.id).length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {getNotificationTags(notification.id).slice(0, 2).map((tag: string) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="max-w-xs truncate">{notification.content}</TableCell>
                        <TableCell>
                          {notification.enableLink && notification.link ? (
                            <a 
                              href={notification.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
                            >
                              <Link2 className="h-3 w-3" />
                              查看详情
                            </a>
                          ) : (
                            <span className="text-gray-400 text-sm">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {notification.notificationType === 'system' ? '系统' : '营销'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                            {notification.target === "all_users"
                              ? "全部用户"
                              : notification.target === "dealers"
                                ? "经销商"
                                : "客户"}
                        </TableCell>
                        <TableCell className="text-sm">
                          {notification.sendTime || '-'}
                        </TableCell>
                        <TableCell>
                          {notification.totalCount > 0 ? (
                            <span className="text-sm">
                              {notification.readCount}/{notification.totalCount}
                              <span className="text-gray-500 ml-1">
                                ({Math.round(notification.readCount / notification.totalCount * 100)}%)
                              </span>
                            </span>
                          ) : '-'}
                        </TableCell>
                        <TableCell>
                          <Badge variant={statusMap[notification.status].variant}>
                            {statusMap[notification.status].label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-center gap-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleDelete(notification.id, 'notification')}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* 收集表单管理 */}
            <TabsContent value="forms" className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">收集表单管理</h3>
                  <p className="text-sm text-gray-600">创建和管理自定义表单，收集用户提交的数据</p>
                </div>
                <Button onClick={handleOpenCreateFormDialog}>
                  <Plus className="h-4 w-4 mr-2" />
                  创建表单
                </Button>
              </div>

              {forms.some((f) => getFormTags(f.id).length > 0) && (
                <div className="bg-gray-50 rounded-lg p-4 border">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-gray-700">标签快捷索引</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {Array.from(new Set(forms.flatMap((f) => getFormTags(f.id)))).map((tag: string) => {
                      const isSelected = selectedTags.forms?.includes(tag);
                      return (
                        <Badge
                          key={tag}
                          variant={isSelected ? "default" : "outline"}
                          className={isSelected ? "cursor-pointer transition-all bg-blue-600" : "cursor-pointer transition-all hover:bg-blue-50"}
                          onClick={() => {
                            const currentSelected = selectedTags.forms || [];
                            setSelectedTags({
                              ...selectedTags,
                              forms: isSelected
                                ? currentSelected.filter((t: string) => t !== tag)
                                : [...currentSelected, tag]
                            });
                          }}
                        >
                          {tag}
                          {isSelected && <X className="h-3 w-3 ml-1" />}
                        </Badge>
                      );
                    })}
                    {selectedTags.forms && selectedTags.forms.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedTags({ ...selectedTags, forms: [] })}
                        className="h-6 text-xs"
                      >
                        清除筛选
                      </Button>
                    )}
                  </div>
                </div>
              )}

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredForms.map((form) => (
                  <Card key={form.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <Smartphone className="h-8 w-8 text-blue-600" />
                          <Badge variant={statusMap[form.status].variant}>
                            {statusMap[form.status].label}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h3 className="font-semibold mb-1">{form.name}</h3>
                        {getFormTags(form.id).length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-2">
                            {getFormTags(form.id).slice(0, 3).map((tag: string) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                        <p className="text-sm text-gray-600 mb-3">{form.description}</p>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">表单字段</span>
                            <span className="font-medium">{form.fields.length}个</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">提交次数</span>
                            <span className="font-medium text-blue-600">{form.submissions}次</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">创建时间</span>
                            <span className="text-gray-500 text-xs">{form.createTime}</span>
                          </div>
                        </div>
                      </div>

                      {/* 字段列表预览 */}
                      <div className="pt-2 border-t">
                        <p className="text-xs font-medium text-gray-700 mb-2">表单字段</p>
                        <div className="flex flex-wrap gap-1">
                          {form.fields.slice(0, 4).map((field) => (
                            <Badge key={field.id} variant="outline" className="text-xs">
                              {field.label}
                              {field.required && <span className="text-red-500 ml-0.5">*</span>}
                            </Badge>
                          ))}
                          {form.fields.length > 4 && (
                            <Badge variant="outline" className="text-xs text-gray-500">
                              +{form.fields.length - 4}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2 border-t">
                        <Button 
                          variant="default" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => {
                            // 模拟导出功能
                            alert(`导出 "${form.name}" 的 ${form.submissions} 条申请数据`);
                          }}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          导出数据
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleOpenEditFormDialog(form)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDelete(form.id, 'form')}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* 产品库 */}
            <TabsContent value="products" className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">理光彩色多功能打印机产品</h3>
                <p className="text-sm text-gray-600 mt-1">来源：https://www.ricoh.com.cn/products/multifunction-printer-colour</p>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="搜索产品名称或型号..."
                  value={productSearchTerm}
                  onChange={(e) => setProductSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {products.some((p) => getProductTags(p.id).length > 0) && (
                <div className="bg-gray-50 rounded-lg p-4 border">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-gray-700">标签快捷索引</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {Array.from(new Set(products.flatMap((p) => getProductTags(p.id)))).map((tag: string) => {
                      const isSelected = selectedTags.products?.includes(tag);
                      const badgeClass = isSelected
                        ? "cursor-pointer transition-all bg-blue-600"
                        : "cursor-pointer transition-all hover:bg-blue-50";

                      return (
                        <Badge
                          key={tag}
                          variant={isSelected ? "default" : "outline"}
                          className={badgeClass}
                          onClick={() => {
                            const currentSelected = selectedTags.products || [];
                            setSelectedTags({
                              ...selectedTags,
                              products: isSelected
                                ? currentSelected.filter((t: string) => t !== tag)
                                : [...currentSelected, tag],
                            });
                          }}
                        >
                          {tag}
                          {isSelected && <X className="h-3 w-3 ml-1" />}
                        </Badge>
                      );
                    })}
                    {selectedTags.products && selectedTags.products.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedTags({ ...selectedTags, products: [] })}
                        className="h-6 text-xs"
                      >
                        清除筛选
                      </Button>
                    )}
                  </div>
                </div>
              )}

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {filteredProducts.map((product: ProductItem) => (
                  <Card key={product.id} className="overflow-hidden hover:shadow-md transition-shadow border-blue-100">
                    <div className="aspect-video bg-gradient-to-br from-blue-50 to-gray-50 relative">
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2">
                        <Badge className="bg-blue-600">{product.productCode}</Badge>
                      </div>
                      <div className="absolute top-2 right-2">
                        <Badge variant="secondary">{product.printSpeed}</Badge>
                      </div>
                    </div>
                    <CardContent className="p-4 space-y-3">
                      <div>
                        <h3 className="font-semibold mb-1 text-blue-900">{product.title}</h3>
                        {getProductTags(product.id).length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-2">
                            {getProductTags(product.id).slice(0, 3).map((tag: string) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                        <p className="text-sm text-gray-600 line-clamp-2">{product.features}</p>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm pt-2 border-t">
                        <div className="flex items-center gap-2">
                          <Eye className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">{product.views}</span>
                        </div>
                        <span className="font-medium text-blue-600">{product.price}</span>
                      </div>

                      <div className="pt-2 border-t">
                        <Button variant="outline" size="sm" className="w-full" onClick={() => handleOpenProductEdit(product)}>
                          <Edit className="h-4 w-4 mr-2" />
                          编辑产品
                        </Button>
                      </div>

                      {/* 可见性管理 */}
                      <div className="flex items-center justify-between pt-2 border-t">
                        <div className="space-y-0.5">
                          <Label className="text-xs font-medium">前台可见</Label>
                          <p className="text-xs text-gray-500">
                            {product.visible ? "用户可见" : "仅后台"}
                          </p>
                        </div>
                        <Switch
                          checked={product.visible !== false}
                          onCheckedChange={() => toggleProductVisibility(product.id)}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* 用户指南管理 */}
            <TabsContent value="guides" className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">用户指南管理</h3>
                  <p className="text-sm text-gray-600">管理RICOH产品使用技巧和操作指南</p>
                </div>
                <Button onClick={() => setGuideDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  添加指南
                </Button>
              </div>

              {/* 搜索和筛选 */}
              <div className="grid gap-4 md:grid-cols-4">
                <div className="relative md:col-span-2">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="搜索指南标题或产品名称..."
                    value={guideSearchTerm}
                    onChange={(e) => setGuideSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择分类" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部分类</SelectItem>
                    <SelectItem value="基础操作">基础操作</SelectItem>
                    <SelectItem value="维护保养">维护保养</SelectItem>
                    <SelectItem value="故障排除">故障排除</SelectItem>
                    <SelectItem value="高级功能">高级功能</SelectItem>
                    <SelectItem value="安全功能">安全功能</SelectItem>
                    <SelectItem value="性能优化">性能优化</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                  <SelectTrigger>
                    <SelectValue placeholder="难度等级" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部难度</SelectItem>
                    <SelectItem value="simple">简单</SelectItem>
                    <SelectItem value="中等">中等</SelectItem>
                    <SelectItem value="困难">困难</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 标签快捷索引 */}
              {userGuides.some((g: UserGuideItem) => g.tags && g.tags.length > 0) && (
                <div className="bg-gray-50 rounded-lg p-4 border">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-gray-700">标签快捷索引</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {Array.from(new Set(userGuides.flatMap((g: UserGuideItem) => g.tags || []))).map((tag: string) => {
                      const isSelected = selectedTags.guides?.includes(tag);
                      return (
                        <Badge
                          key={tag}
                          variant={isSelected ? "default" : "outline"}
                          className={isSelected ? "cursor-pointer transition-all bg-blue-600" : "cursor-pointer transition-all hover:bg-blue-50"}
                          onClick={() => {
                            const currentSelected = selectedTags.guides || [];
                            setSelectedTags({
                              ...selectedTags,
                              guides: isSelected
                                ? currentSelected.filter((t: string) => t !== tag)
                                : [...currentSelected, tag]
                            });
                          }}
                        >
                          {tag}
                          {isSelected && <X className="h-3 w-3 ml-1" />}
                        </Badge>
                      );
                    })}
                    {selectedTags.guides && selectedTags.guides.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedTags({ ...selectedTags, guides: [] })}
                        className="h-6 text-xs"
                      >
                        清除筛选
                      </Button>
                    )}
                  </div>
                </div>
              )}

              {/* 统计信息 */}
              <div className="grid gap-4 md:grid-cols-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">总指南数</p>
                        <p className="text-2xl font-bold text-blue-600">{userGuides.length}</p>
                      </div>
                      <BookOpen className="h-8 w-8 text-blue-600 opacity-50" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">总浏览量</p>
                        <p className="text-2xl font-bold text-green-600">
                          {userGuides.reduce((sum, g) => sum + g.views, 0)}
                        </p>
                      </div>
                      <Eye className="h-8 w-8 text-green-600 opacity-50" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">总点赞数</p>
                        <p className="text-2xl font-bold text-orange-600">
                          {userGuides.reduce((sum, g) => sum + g.likes, 0)}
                        </p>
                      </div>
                      <ThumbsUp className="h-8 w-8 text-orange-600 opacity-50" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">有帮</p>
                        <p className="text-2xl font-bold text-purple-600">
                          {userGuides.reduce((sum, g) => sum + g.helpful, 0)}
                        </p>
                      </div>
                      <HelpCircle className="h-8 w-8 text-purple-600 opacity-50" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* 指南卡片列表 */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredGuides.map((guide) => (
                  <Card key={guide.id} className="overflow-hidden hover:shadow-md transition-shadow border-l-4 border-l-blue-500">
                    <CardContent className="p-5 space-y-3">
                      {/* 标题和产品 */}
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className="font-semibold text-base leading-tight flex-1">{guide.title}</h3>
                          <Badge variant="outline" className="text-xs whitespace-nowrap">
                            {guide.product}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge className="bg-blue-600">{guide.category}</Badge>
                          <Badge 
                            variant="secondary"
                            className={
                              guide.difficulty === "简单" ? "bg-green-100 text-green-700" :
                              guide.difficulty === "中等" ? "bg-yellow-100 text-yellow-700" :
                              "bg-red-100 text-red-700"
                            }
                          >
                            {guide.difficulty}
                          </Badge>
                        </div>
                      </div>

                      {/* 内容预览 */}
                      <p className="text-sm text-gray-600 line-clamp-3">
                        {guide.content}
                      </p>

                      {/* 标签 */}
                      {guide.tags && guide.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-2 border-t">
                          {guide.tags.slice(0, 3).map((tag: string) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {guide.tags.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{guide.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                      )}

                      {/* 统计信息 */}
                      <div className="flex items-center justify-between text-sm pt-2 border-t">
                        <div className="flex items-center gap-3 text-gray-600">
                          <span className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            {guide.views}
                          </span>
                          <span className="flex items-center gap-1">
                            <ThumbsUp className="h-4 w-4" />
                            {guide.likes}
                          </span>
                          <span className="flex items-center gap-1">
                            <HelpCircle className="h-4 w-4" />
                            {guide.helpful}
                          </span>
                        </div>
                      </div>

                      {/* 更新时间 */}
                      <div className="text-xs text-gray-500 pt-2 border-t">
                        更新于：{guide.updateTime}
                      </div>

                      {/* 操作按钮 */}
                      <div className="flex gap-2 pt-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="h-4 w-4 mr-2" />
                          编辑
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDelete(guide.id, 'guide')}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* 空状态 */}
              {filteredGuides.length === 0 && (
                <div className="text-center py-12">
                  <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">暂无符合条件的用户指南</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-4"
                    onClick={() => {
                      setGuideSearchTerm("");
                      setSelectedCategory("all");
                      setSelectedDifficulty("all");
                      setSelectedTags({ ...selectedTags, guides: [] });
                    }}
                  >
                    清除所有筛选
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="courses" className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">经销商学院管理</h3>
                  <p className="text-sm text-gray-600">管理经销商学院课程课时和讲师信息</p>
                </div>
                <Button onClick={() => setCourseDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  新增课程
                </Button>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="搜索课程名称、分类或讲师..."
                  value={courseSearchTerm}
                  onChange={(e) => setCourseSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {trainingCourses.some((c) => getCourseTags(c.id).length > 0) && (
                <div className="bg-gray-50 rounded-lg p-4 border">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-gray-700">标签快捷索引</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {Array.from(new Set(trainingCourses.flatMap((c) => getCourseTags(c.id)))).map((tag: string) => {
                      const isSelected = selectedTags.courses?.includes(tag);
                      return (
                        <Badge
                          key={tag}
                          variant={isSelected ? "default" : "outline"}
                          className={isSelected ? "cursor-pointer transition-all bg-blue-600" : "cursor-pointer transition-all hover:bg-blue-50"}
                          onClick={() => {
                            const currentSelected = selectedTags.courses || [];
                            setSelectedTags({
                              ...selectedTags,
                              courses: isSelected
                                ? currentSelected.filter((t: string) => t !== tag)
                                : [...currentSelected, tag]
                            });
                          }}
                        >
                          {tag}
                          {isSelected && <X className="h-3 w-3 ml-1" />}
                        </Badge>
                      );
                    })}
                    {selectedTags.courses && selectedTags.courses.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedTags({ ...selectedTags, courses: [] })}
                        className="h-6 text-xs"
                      >
                        清除筛选
                      </Button>
                    )}
                  </div>
                </div>
              )}

              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>课程名称</TableHead>
                      <TableHead>分类</TableHead>
                      <TableHead>级别</TableHead>
                      <TableHead>课时</TableHead>
                      <TableHead>讲师</TableHead>
                      <TableHead>报名人数</TableHead>
                      <TableHead>通过</TableHead>
                      <TableHead>状态</TableHead>
                      <TableHead className="text-right">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCourses.map((course: TrainingCourseItem) => (
                      <TableRow key={course.id}>
                        <TableCell className="font-medium">
                          <div>{course.title}</div>
                          {getCourseTags(course.id).length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {getCourseTags(course.id).slice(0, 2).map((tag: string) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </TableCell>
                        <TableCell>{course.category}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{course.level}</Badge>
                        </TableCell>
                        <TableCell>{course.durationHours}h</TableCell>
                        <TableCell>{course.instructor}</TableCell>
                        <TableCell>{course.enrolledCount}</TableCell>
                        <TableCell>{course.passRate}%</TableCell>
                        <TableCell>
                          <Badge variant={statusMap[course.status].variant}>
                            {statusMap[course.status].label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDelete(course.id, "course")}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="certifications" className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">技术认证管理</h3>
                  <p className="text-sm text-gray-600">管理技术认证考试、总分、及格线和考试规则</p>
                </div>
                <Button onClick={() => setCertDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  新增认证
                </Button>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="搜索认证名称、考试编码或关联课程..."
                  value={certSearchTerm}
                  onChange={(e) => setCertSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {certifications.some((c) => getCertificationTags(c.id).length > 0) && (
                <div className="bg-gray-50 rounded-lg p-4 border">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-gray-700">标签快捷索引</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {Array.from(new Set(certifications.flatMap((c) => getCertificationTags(c.id)))).map((tag: string) => {
                      const isSelected = selectedTags.certifications?.includes(tag);
                      return (
                        <Badge
                          key={tag}
                          variant={isSelected ? "default" : "outline"}
                          className={isSelected ? "cursor-pointer transition-all bg-blue-600" : "cursor-pointer transition-all hover:bg-blue-50"}
                          onClick={() => {
                            const currentSelected = selectedTags.certifications || [];
                            setSelectedTags({
                              ...selectedTags,
                              certifications: isSelected
                                ? currentSelected.filter((t: string) => t !== tag)
                                : [...currentSelected, tag]
                            });
                          }}
                        >
                          {tag}
                          {isSelected && <X className="h-3 w-3 ml-1" />}
                        </Badge>
                      );
                    })}
                    {selectedTags.certifications && selectedTags.certifications.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedTags({ ...selectedTags, certifications: [] })}
                        className="h-6 text-xs"
                      >
                        清除筛选
                      </Button>
                    )}
                  </div>
                </div>
              )}

              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>认证名称</TableHead>
                      <TableHead>考试编码</TableHead>
                      <TableHead>关联课程</TableHead>
                      <TableHead>题量</TableHead>
                      <TableHead>及格</TableHead>
                      <TableHead>时长</TableHead>
                      <TableHead>参考人数</TableHead>
                      <TableHead>通过</TableHead>
                      <TableHead>状态</TableHead>
                      <TableHead className="text-right">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCertifications.map((cert: CertificationItem) => (
                      <TableRow key={cert.id}>
                        <TableCell className="font-medium">
                          <div>{cert.name}</div>
                          {getCertificationTags(cert.id).length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {getCertificationTags(cert.id).slice(0, 2).map((tag: string) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="font-mono text-xs">{cert.examCode}</TableCell>
                        <TableCell>{cert.relatedCourse}</TableCell>
                        <TableCell>{cert.questionCount}</TableCell>
                        <TableCell>{cert.passScore}</TableCell>
                        <TableCell>{cert.examDurationMin}min</TableCell>
                        <TableCell>{cert.participants}</TableCell>
                        <TableCell>{cert.passRate}%</TableCell>
                        <TableCell>
                          <Badge variant={statusMap[cert.status].variant}>
                            {statusMap[cert.status].label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDelete(cert.id, "cert")}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* 创建通知对话框 */}
      <Dialog open={notificationDialogOpen} onOpenChange={setNotificationDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>创建通知</DialogTitle>
            <DialogDescription>
              选择通知类型并填写相关信息
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={(e) => { e.preventDefault(); setNotificationDialogOpen(false); }}>
            <div className="space-y-4 py-4">
              {/* 通知类型选择 */}
              <div className="space-y-2">
                <Label>通知类型</Label>
                <div className="grid grid-cols-3 gap-4">
                  <div
                    onClick={() => setNotificationType("title")}
                    className={
                      notificationType === "title"
                        ? "p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-blue-500 border-blue-600 bg-blue-50"
                        : "p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-blue-500 border-gray-200"
                    }
                  >
                    <div className="text-center space-y-2">
                      <Bell
                        className={
                          notificationType === "title"
                            ? "h-8 w-8 mx-auto text-blue-600"
                            : "h-8 w-8 mx-auto text-gray-400"
                        }
                      />
                      <div>
                        <p className="font-medium">标题通知</p>
                        <p className="text-xs text-gray-500 mt-1">简短标题+副标题</p>
                      </div>
                    </div>
                  </div>
                  <div
                    onClick={() => setNotificationType("content")}
                    className={
                      notificationType === "content"
                        ? "p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-blue-500 border-blue-600 bg-blue-50"
                        : "p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-blue-500 border-gray-200"
                    }
                  >
                    <div className="text-center space-y-2">
                      <Newspaper
                        className={
                          notificationType === "content"
                            ? "h-8 w-8 mx-auto text-blue-600"
                            : "h-8 w-8 mx-auto text-gray-400"
                        }
                      />
                      <div>
                        <p className="font-medium">内容通知</p>
                        <p className="text-xs text-gray-500 mt-1">标题+详细内容</p>
                      </div>
                    </div>
                  </div>
                  <div
                    onClick={() => setNotificationType("image")}
                    className={
                      notificationType === "image"
                        ? "p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-blue-500 border-blue-600 bg-blue-50"
                        : "p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-blue-500 border-gray-200"
                    }
                  >
                    <div className="text-center space-y-2">
                      <ImageIcon
                        className={
                          notificationType === "image"
                            ? "h-8 w-8 mx-auto text-blue-600"
                            : "h-8 w-8 mx-auto text-gray-400"
                        }
                      />
                      <div>
                        <p className="font-medium">图片通知</p>
                        <p className="text-xs text-gray-500 mt-1">标题+内容+图片</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 标题 */}
              <div className="space-y-2">
                <Label htmlFor="notification-title">通知标题 *</Label>
                <Input
                  id="notification-title"
                  placeholder="请输入通知标题"
                  required
                />
              </div>

              {/* 内容 - 标题类型显示为副标题 */}
              {notificationType === "title" && (
                <div className="space-y-2">
                  <Label htmlFor="notification-subtitle">副标题</Label>
                  <Input
                    id="notification-subtitle"
                    placeholder="请输入副标题（可选）"
                  />
                </div>
              )}

              {/* 内容 - 内容类型和图片类型显示为详细内容 */}
              {(notificationType === "content" || notificationType === "image") && (
                <div className="space-y-2">
                  <Label htmlFor="notification-content">通知内容 *</Label>
                  <Textarea
                    id="notification-content"
                    placeholder="请输入通知的详细内容"
                    rows={5}
                    required
                  />
                </div>
              )}

              {/* 图片上传 - 仅图片类型显示 */}
              {notificationType === "image" && (
                <div className="space-y-2">
                  <Label htmlFor="notification-image">通知图片 *</Label>
                  <div className="flex gap-2">
                    <Input
                      id="notification-image"
                      placeholder="请输入图片 URL 或上传图片"
                      className="flex-1"
                      required
                    />
                    <Button type="button" variant="outline">
                      <ImageIcon className="h-4 w-4 mr-2" />
                      上传图片
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500">建议尺寸：800x400px，格式：JPG/PNG</p>
                </div>
              )}

              {/* 通知分类 */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="notification-category">通知分类</Label>
                  <Select defaultValue="system">
                    <SelectTrigger>
                      <SelectValue placeholder="选择通知分类" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="system">系统通知</SelectItem>
                      <SelectItem value="marketing">营销推</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notification-target">目标用户</Label>
                  <Select defaultValue="all_users">
                    <SelectTrigger>
                      <SelectValue placeholder="选择目标用户" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all_users">全部用户</SelectItem>
                      <SelectItem value="dealers">经销商</SelectItem>
                      <SelectItem value="customers">客户</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* 发送时间 */}
              <div className="space-y-2">
                <Label htmlFor="notification-time">发送时间</Label>
                <Input
                  id="notification-time"
                  type="datetime-local"
                  placeholder="立即发送"
                />
                <p className="text-xs text-gray-500">留空表示立即发送，或选择定时发送</p>
              </div>

              {/* 查看详情链接 */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="notification-link">查看详情链接</Label>
                  <div className="flex items-center gap-2">
                    <Switch
                      id="enable-link"
                      checked={enableLink}
                      onCheckedChange={setEnableLink}
                    />
                    <Label htmlFor="enable-link" className="text-sm font-normal cursor-pointer">
                      启用链接
                    </Label>
                  </div>
                </div>
                {enableLink && (
                  <>
                    <div className="flex gap-2 items-start">
                      <div className="flex-1 space-y-2">
                        <Input
                          id="notification-link"
                          placeholder="请输入跳转链接，例如：/products/new-item"
                          defaultValue=""
                        />
                        <p className="text-xs text-gray-500">
                          启用后，通知可跳转页面查看详情
                        </p>
                      </div>
                      <Link2 className="h-5 w-5 text-gray-400 mt-2" />
                    </div>
                    <div className="rounded-lg bg-blue-50 border border-blue-200 p-3 text-sm">
                      <p className="font-medium text-blue-900 mb-1">链接示例</p>
                      <ul className="text-blue-700 space-y-1 text-xs">
                          <li>• 产品详情：`/products/ricoh-im-c6000`</li>
                          <li>• 活动页面：`/activities/spring-sale-2024`</li>
                          <li>• 新闻详情：`/news/company-announcement`</li>
                          <li>• 外部链接：`https://www.ricoh.com.cn`</li>
                      </ul>
                    </div>
                  </>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setNotificationDialogOpen(false)}>
                取消
              </Button>
              <Button type="button" variant="secondary">
                保存草稿
              </Button>
              <Button type="submit">
                立即发送
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* 案例库/新闻内容对话框 */}
      <Dialog open={dialogOpen} onOpenChange={(open) => {
        setDialogOpen(open);
        if (!open) {
          resetImport();
          setCurrentTags([]);
          setTagInput("");
        }
      }}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {mainTab === "cases" ? "添加案例" : mainTab === "news" ? "发布新闻" : "添加内容"}
            </DialogTitle>
            <DialogDescription>
              {mainTab === "cases" 
                ? "填写客户案例信息，或从外部URL一键导入"
                : mainTab === "news"
                ? "填写新闻内容，或从外部URL一键导入"
                : "填写内容信息"}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={(e) => { 
            e.preventDefault(); 
            setDialogOpen(false); 
            resetImport();
          }}>
            <div className="space-y-6 py-4">
              {/* URL导入区域 */}
              {(mainTab === "cases" || mainTab === "news") && (
                <div className="rounded-lg border-2 border-dashed border-blue-300 bg-blue-50/50 p-4 space-y-3">
                  <div className="flex items-center gap-2 text-blue-900">
                    <Download className="h-5 w-5" />
                    <h4 className="font-semibold">一键导入</h4>
                  </div>
                  <p className="text-sm text-blue-700">
                    输入新闻或博客文章的URL，系统将自动抓取内容并填充到表单。
                  </p>
                  
                  <div className="flex gap-2">
                    <Input
                      placeholder="请输入文章URL，例如：https://example.com/article/123"
                      value={importUrl}
                      onChange={(e) => setImportUrl(e.target.value)}
                      disabled={isImporting}
                      className="flex-1 bg-white"
                    />
                    <Button
                      type="button"
                      onClick={handleImportFromUrl}
                      disabled={!importUrl || isImporting}
                      className="min-w-[100px]"
                    >
                      {isImporting ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          导入中...
                        </>
                      ) : (
                        <>
                          <Download className="h-4 w-4 mr-2" />
                          导入
                        </>
                      )}
                    </Button>
                  </div>

                  {importSuccess && (
                    <div className="flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 rounded-lg p-3">
                      <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span className="text-sm font-medium">
                        内容导入成功！已自动填充到下方表单，请检查并修改
                      </span>
                    </div>
                  )}

                  <div className="text-xs text-blue-600 space-y-1">
                    <p className="font-medium">💡 功能说明</p>
                    <ul className="space-y-0.5 ml-4">
                      <li>• 目前为演示模式，实际使用需要后端 API 支持</li>
                      <li>• 支持导入第三方新闻网站、博客文章等</li>
                      <li>• 导入后可以编辑和调整内容</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* 案例库表单 */}
              {mainTab === "cases" && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="case-title">案例标题 *</Label>
                      <Input
                        id="case-title"
                        placeholder="请输入案例标题"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="case-customer">客户名称 *</Label>
                      <Input
                        id="case-customer"
                        placeholder="请输入客户名称"
                        value={formData.customer}
                        onChange={(e) => setFormData({...formData, customer: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="case-industry">所属行业 *</Label>
                      <Select 
                        value={formData.industry}
                        onValueChange={(value) => setFormData({...formData, industry: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="选择行业" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="制造业">制造业</SelectItem>
                          <SelectItem value="金融">金融</SelectItem>
                          <SelectItem value="教育">教育</SelectItem>
                          <SelectItem value="医疗">医疗</SelectItem>
                          <SelectItem value="科技">科技</SelectItem>
                          <SelectItem value="零售">零售</SelectItem>
                          <SelectItem value="物流">物流</SelectItem>
                          <SelectItem value="其他">其他</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="case-solution">解决方案 *</Label>
                      <Input
                        id="case-solution"
                        placeholder="例如：智能文档管理系统"
                        value={formData.solution}
                        onChange={(e) => setFormData({...formData, solution: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="case-summary">案例摘要 *</Label>
                    <Textarea
                      id="case-summary"
                        placeholder="请输入案例简介（100-200字）"
                      rows={3}
                      value={formData.summary}
                      onChange={(e) => setFormData({...formData, summary: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="case-content">案例详情 *</Label>
                    <Textarea
                      id="case-content"
                      placeholder="请输入案例的详细内容，包括项目背景解决方案实施效果等"
                      rows={12}
                      value={formData.content}
                      onChange={(e) => setFormData({...formData, content: e.target.value})}
                      required
                      className="font-mono text-sm"
                    />
                    <p className="text-xs text-gray-500">
                      支持换行和段落格式，建议包含：项目背景解决方案实施过程实施效果等内容
                    </p>
                  </div>

                  {/* 标签管理 */}
                  <div className="space-y-2">
                    <Label htmlFor="case-tags">标签</Label>
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <Input
                          id="case-tags"
                          placeholder="输入标签后按回车添加"
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              if (tagInput.trim() && !currentTags.includes(tagInput.trim())) {
                                setCurrentTags([...currentTags, tagInput.trim()]);
                                setTagInput("");
                              }
                            }
                          }}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            if (tagInput.trim() && !currentTags.includes(tagInput.trim())) {
                              setCurrentTags([...currentTags, tagInput.trim()]);
                              setTagInput("");
                            }
                          }}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          添加
                        </Button>
                      </div>
                      {currentTags.length > 0 && (
                        <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-lg border">
                          {currentTags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-sm">
                              {tag}
                              <X
                                className="h-3 w-3 ml-1 cursor-pointer hover:text-red-600"
                                onClick={() => setCurrentTags(currentTags.filter(t => t !== tag))}
                              />
                            </Badge>
                          ))}
                        </div>
                      )}
                      <p className="text-xs text-gray-500">
                        例如：数字化转型、智能制造、文档管理
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="case-thumbnail">缩略图URL</Label>
                    <div className="flex gap-2">
                      <Input
                        id="case-thumbnail"
                        placeholder="请输入图片URL"
                        className="flex-1"
                      />
                      <Button type="button" variant="outline">
                        <ImageIcon className="h-4 w-4 mr-2" />
                        上传图片
                      </Button>
                    </div>
                  </div>
                </>
              )}

              {/* 新闻内容表单 */}
              {mainTab === "news" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="news-title">新闻标题 *</Label>
                    <Input
                      id="news-title"
                      placeholder="请输入新闻标题"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="news-category">新闻分类 *</Label>
                      <Select 
                        value={formData.category}
                        onValueChange={(value) => setFormData({...formData, category: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="选择分类" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="公司动态">公司动态</SelectItem>
                          <SelectItem value="产品新闻">产品新闻</SelectItem>
                          <SelectItem value="行业动态">行业动态</SelectItem>
                          <SelectItem value="行业荣誉">行业荣誉</SelectItem>
                          <SelectItem value="技术文章">技术文章</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="news-author">作者 *</Label>
                      <Input
                        id="news-author"
                        placeholder="请输入作者姓名"
                        value={formData.author}
                        onChange={(e) => setFormData({...formData, author: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="news-summary">新闻摘要 *</Label>
                    <Textarea
                      id="news-summary"
                      placeholder="请输入新闻摘要（100-150字）"
                      rows={3}
                      value={formData.summary}
                      onChange={(e) => setFormData({...formData, summary: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="news-content">新闻正文 *</Label>
                    <Textarea
                      id="news-content"
                      placeholder="请输入新闻的详细内容"
                      rows={15}
                      value={formData.content}
                      onChange={(e) => setFormData({...formData, content: e.target.value})}
                      required
                      className="font-mono text-sm"
                    />
                    <p className="text-xs text-gray-500">
                      支持富文本格式，建议使用标题、段落列表等结构化内容
                    </p>
                  </div>

                  {/* 标签管理 */}
                  <div className="space-y-2">
                    <Label htmlFor="news-tags">标签</Label>
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <Input
                          id="news-tags"
                          placeholder="输入标签后按回车添加"
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              if (tagInput.trim() && !currentTags.includes(tagInput.trim())) {
                                setCurrentTags([...currentTags, tagInput.trim()]);
                                setTagInput("");
                              }
                            }
                          }}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            if (tagInput.trim() && !currentTags.includes(tagInput.trim())) {
                              setCurrentTags([...currentTags, tagInput.trim()]);
                              setTagInput("");
                            }
                          }}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          添加
                        </Button>
                      </div>
                      {currentTags.length > 0 && (
                        <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-lg border">
                          {currentTags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-sm">
                              {tag}
                              <X
                                className="h-3 w-3 ml-1 cursor-pointer hover:text-red-600"
                                onClick={() => setCurrentTags(currentTags.filter(t => t !== tag))}
                              />
                            </Badge>
                          ))}
                        </div>
                      )}
                      <p className="text-xs text-gray-500">
                        添加标签以便快速分类和检索，如：战略规划、产品技术、行业荣誉等
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="news-thumbnail">缩略图URL</Label>
                    <div className="flex gap-2">
                      <Input
                        id="news-thumbnail"
                        placeholder="请输入图片URL"
                        className="flex-1"
                      />
                      <Button type="button" variant="outline">
                        <ImageIcon className="h-4 w-4 mr-2" />
                        上传图片
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="news-publish-date">发布日期</Label>
                    <Input
                      id="news-publish-date"
                      type="date"
                      defaultValue={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </>
              )}
            </div>

            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  setDialogOpen(false);
                  resetImport();
                }}
              >
                取消
              </Button>
              <Button type="button" variant="secondary">
                保存草稿
              </Button>
              <Button type="submit">
                发布
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* 广告位对话框 */}
      <Dialog open={bannerDialogOpen} onOpenChange={(open) => {
        setBannerDialogOpen(open);
        if (open) {
          setBannerPosition("homepage"); // 重置为默认位置
          setBannerTagInput("");
          setBannerTags([]);
        }
      }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>添加广告</DialogTitle>
            <DialogDescription>
              配置广告横幅的显示位置时间和跳转链接
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={(e) => { e.preventDefault(); setBannerDialogOpen(false); }}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="banner-title">广告标题 *</Label>
                <Input
                  id="banner-title"
                  placeholder="请输入广告标题"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="banner-position">投放位置 *</Label>
                <Select 
                  defaultValue="homepage"
                  onValueChange={(value) => setBannerPosition(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="选择投放位置" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="homepage">首页轮播</SelectItem>
                    <SelectItem value="sidebar">侧边栏</SelectItem>
                    <SelectItem value="top">顶部横幅</SelectItem>
                    <SelectItem value="bottom">底部横幅</SelectItem>
                    <SelectItem value="product">产品页</SelectItem>
                    <SelectItem value="splash">开屏广告</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 开屏广告特殊设置 */}
              {bannerPosition === "splash" && (
                <div className="rounded-lg border-2 border-blue-200 bg-blue-50 p-4 space-y-4">
                  <div className="flex items-center gap-2 text-blue-900 font-medium">
                    <Smartphone className="h-5 w-5" />
                    <span>开屏广告专属设置</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="splash-duration">显示时长（秒）*</Label>
                      <Input
                        id="splash-duration"
                        type="number"
                        defaultValue="5"
                        min="1"
                        max="10"
                        required
                      />
                      <p className="text-xs text-gray-600">
                        推荐3-5秒，最长不超过10秒
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="splash-frequency">每天显示次数 *</Label>
                      <Select defaultValue="1">
                        <SelectTrigger>
                          <SelectValue placeholder="选择频率" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">每天1次</SelectItem>
                          <SelectItem value="2">每天2次</SelectItem>
                          <SelectItem value="3">每天3次</SelectItem>
                          <SelectItem value="unlimited">不限次数</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center justify-between space-y-0 rounded-lg border border-gray-300 bg-white p-3">
                    <div className="space-y-0.5">
                      <Label htmlFor="splash-skippable" className="text-sm font-medium">
                        允许用户跳过
                      </Label>
                      <p className="text-xs text-gray-600">
                        开启后用户可点击“跳过”按钮关闭广告
                      </p>
                    </div>
                    <Switch
                      id="splash-skippable"
                      defaultChecked={true}
                    />
                  </div>

                  <div className="rounded-md bg-yellow-50 border border-yellow-200 p-3">
                    <p className="text-xs text-yellow-800">
                      💡 <strong>最佳实践：</strong>建议设置3-5秒，允许跳过，每天显示1次，以获得最佳用户体验
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="banner-image">广告图片 *</Label>
                <div className="flex gap-2">
                  <Input
                    id="banner-image"
                    placeholder="请输入图片URL"
                    className="flex-1"
                    required
                  />
                  <Button type="button" variant="outline">
                    <ImageIcon className="h-4 w-4 mr-2" />
                    上传图片
                  </Button>
                </div>
                <p className="text-xs text-gray-500">
                  {bannerPosition === "splash" 
                    ? "开屏广告推荐尺寸：1080x1920px（竖屏全屏）"
                    : "首页轮播推荐尺寸：1920x600px，侧边栏推荐尺寸：400x300px"
                  }
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="banner-link">跳转链接</Label>
                <Input
                  id="banner-link"
                  placeholder="请输入点击后跳转的链接，如：/products/spring-sale"
                />
                <p className="text-xs text-gray-500">
                  留空表示不跳转，仅作展示
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="banner-tags">标签</Label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      id="banner-tags"
                      placeholder="输入标签后按回车添加"
                      value={bannerTagInput}
                      onChange={(e) => setBannerTagInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          const nextTag = bannerTagInput.trim();
                          if (nextTag && !bannerTags.includes(nextTag)) {
                            setBannerTags([...bannerTags, nextTag]);
                            setBannerTagInput("");
                          }
                        }
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        const nextTag = bannerTagInput.trim();
                        if (nextTag && !bannerTags.includes(nextTag)) {
                          setBannerTags([...bannerTags, nextTag]);
                          setBannerTagInput("");
                        }
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      添加
                    </Button>
                  </div>
                  {bannerTags.length > 0 && (
                    <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-lg border">
                      {bannerTags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-sm">
                          {tag}
                          <X
                            className="h-3 w-3 ml-1 cursor-pointer hover:text-red-600"
                            onClick={() => setBannerTags(bannerTags.filter((t) => t !== tag))}
                          />
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="banner-start-date">开始时间 *</Label>
                  <Input
                    id="banner-start-date"
                    type="date"
                    defaultValue={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="banner-end-date">结束时间 *</Label>
                  <Input
                    id="banner-end-date"
                    type="date"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="banner-order">显示顺序 *</Label>
                <Input
                  id="banner-order"
                  type="number"
                  defaultValue="1"
                  min="1"
                  required
                />
                <p className="text-xs text-gray-500">
                  数字越小，排序越靠前。同一位置的广告将按顺序轮播
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="banner-status">状态 *</Label>
                <Select defaultValue="active">
                  <SelectTrigger>
                    <SelectValue placeholder="选择状态" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">启用</SelectItem>
                    <SelectItem value="inactive">停用</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setBannerDialogOpen(false)}>
                取消
              </Button>
              <Button type="submit">保存</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={courseDialogOpen}
        onOpenChange={(open) => {
          setCourseDialogOpen(open);
          if (!open) {
            setCourseTagInput("");
            setCourseFormTags([]);
          }
        }}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>新增课程</DialogTitle>
            <DialogDescription>创建经销商学院课程并设置课程标签</DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setCourseDialogOpen(false);
              setCourseTagInput("");
              setCourseFormTags([]);
            }}
          >
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="course-title">课程名称 *</Label>
                <Input id="course-title" placeholder="请输入课程名称" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="course-category">课程分类 *</Label>
                  <Input id="course-category" placeholder="如：产品知识" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="course-level">课程级别 *</Label>
                  <Input id="course-level" placeholder="如：初级/中级/高级" required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="course-duration">课时（小时） *</Label>
                  <Input id="course-duration" type="number" min="1" placeholder="如：6" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="course-instructor">讲师 *</Label>
                  <Input id="course-instructor" placeholder="请输入讲师姓名" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="course-video-url">课程视频</Label>
                <div className="flex gap-2">
                  <Input id="course-video-url" placeholder="请填写视频链接，如：https://..." className="flex-1" />
                  <Button type="button" variant="outline">
                    <ImageIcon className="h-4 w-4 mr-2" />
                    上传视频
                  </Button>
                </div>
                <p className="text-xs text-gray-500">支持上传视频文件，或直接填写视频链接</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="course-form-tags">课程标签</Label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      id="course-form-tags"
                      placeholder="输入课程标签后按回车添加"
                      value={courseTagInput}
                      onChange={(e) => setCourseTagInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          const nextTag = courseTagInput.trim();
                          if (nextTag && !courseFormTags.includes(nextTag)) {
                            setCourseFormTags([...courseFormTags, nextTag]);
                            setCourseTagInput("");
                          }
                        }
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        const nextTag = courseTagInput.trim();
                        if (nextTag && !courseFormTags.includes(nextTag)) {
                          setCourseFormTags([...courseFormTags, nextTag]);
                          setCourseTagInput("");
                        }
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      添加
                    </Button>
                  </div>
                  {courseFormTags.length > 0 && (
                    <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-lg border">
                      {courseFormTags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-sm">
                          {tag}
                          <X
                            className="h-3 w-3 ml-1 cursor-pointer hover:text-red-600"
                            onClick={() => setCourseFormTags(courseFormTags.filter((t) => t !== tag))}
                          />
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setCourseDialogOpen(false)}>
                取消
              </Button>
              <Button type="submit">创建课程</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={certDialogOpen}
        onOpenChange={(open) => {
          setCertDialogOpen(open);
          if (!open) {
            setCertTagInput("");
            setCertFormTags([]);
            setMcqQuestions([{ id: 1, question: "", options: ["", "", "", ""], answer: "A", score: 2 }]);
          }
        }}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>新增认证</DialogTitle>
            <DialogDescription>创建技术认证并设置课程标签</DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setCertDialogOpen(false);
              setCertTagInput("");
              setCertFormTags([]);
              setMcqQuestions([{ id: 1, question: "", options: ["", "", "", ""], answer: "A", score: 2 }]);
            }}
          >
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="cert-name">认证名称 *</Label>
                <Input id="cert-name" placeholder="请输入认证名称" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cert-code">考试编码 *</Label>
                   <Input id="cert-code" placeholder="如：TC-1001" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cert-course">关联课程 *</Label>
                  <Input id="cert-course" placeholder="请输入关联课程" required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cert-pass-score">及格线 *</Label>
                  <Input id="cert-pass-score" type="number" min="1" max="100" placeholder="如：80" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cert-total-score">总分 *</Label>
                  <Input id="cert-total-score" type="number" min="1" placeholder="如：100" required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cert-duration">考试时长（分钟） *</Label>
                  <Input id="cert-duration" type="number" min="1" placeholder="如：90" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cert-question-count">题量</Label>
                  <Input id="cert-question-count" type="number" value={mcqQuestions.length} readOnly className="bg-gray-50" />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-sm text-gray-700 border-b pb-2">考试内容</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">选择题列表</p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const nextId = mcqQuestions.length > 0 ? Math.max(...mcqQuestions.map((q) => q.id)) + 1 : 1;
                        setMcqQuestions([
                          ...mcqQuestions,
                          { id: nextId, question: "", options: ["", "", "", ""], answer: "A", score: 2 },
                        ]);
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      新增选择题
                    </Button>
                  </div>

                  {mcqQuestions.map((q, questionIndex) => (
                    <div key={q.id} className="rounded-lg border p-4 space-y-3 bg-gray-50">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">第 {questionIndex + 1} 题</Badge>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          disabled={mcqQuestions.length === 1}
                          className="text-red-600 hover:text-red-700"
                          onClick={() => setMcqQuestions(mcqQuestions.filter((item) => item.id !== q.id))}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="space-y-2">
                        <Label>题目 *</Label>
                        <Textarea
                          placeholder="请输入题目内容"
                          rows={2}
                          value={q.question}
                          onChange={(e) => {
                            const updated = [...mcqQuestions];
                            updated[questionIndex] = { ...updated[questionIndex], question: e.target.value };
                            setMcqQuestions(updated);
                          }}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        {["A", "B", "C", "D"].map((label, optionIndex) => (
                          <div key={label} className="space-y-1">
                            <Label>选项 {label} *</Label>
                            <Input
                              placeholder={`请输入选项 ${label}`}
                              value={q.options[optionIndex]}
                              onChange={(e) => {
                                const updated = [...mcqQuestions];
                                const nextOptions = [...updated[questionIndex].options];
                                nextOptions[optionIndex] = e.target.value;
                                updated[questionIndex] = { ...updated[questionIndex], options: nextOptions };
                                setMcqQuestions(updated);
                              }}
                              required
                            />
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>正确答案 *</Label>
                          <Select
                            value={q.answer}
                            onValueChange={(value) => {
                              const updated = [...mcqQuestions];
                              updated[questionIndex] = { ...updated[questionIndex], answer: value };
                              setMcqQuestions(updated);
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="A">A</SelectItem>
                              <SelectItem value="B">B</SelectItem>
                              <SelectItem value="C">C</SelectItem>
                              <SelectItem value="D">D</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>分值 *</Label>
                          <Input
                            type="number"
                            min="1"
                            value={q.score}
                            onChange={(e) => {
                              const updated = [...mcqQuestions];
                              updated[questionIndex] = {
                                ...updated[questionIndex],
                                score: Math.max(1, Number(e.target.value || 1)),
                              };
                              setMcqQuestions(updated);
                            }}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <p className="text-xs text-gray-500">支持按问卷方式持续新增选择题，并逐题配置答案与分值。</p>
                </div>

              <div className="space-y-2">
                <Label htmlFor="cert-form-tags">课程标签</Label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      id="cert-form-tags"
                      placeholder="输入课程标签后按回车添加"
                      value={certTagInput}
                      onChange={(e) => setCertTagInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          const nextTag = certTagInput.trim();
                          if (nextTag && !certFormTags.includes(nextTag)) {
                            setCertFormTags([...certFormTags, nextTag]);
                            setCertTagInput("");
                          }
                        }
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        const nextTag = certTagInput.trim();
                        if (nextTag && !certFormTags.includes(nextTag)) {
                          setCertFormTags([...certFormTags, nextTag]);
                          setCertTagInput("");
                        }
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      添加
                    </Button>
                  </div>
                  {certFormTags.length > 0 && (
                    <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-lg border">
                      {certFormTags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-sm">
                          {tag}
                          <X
                            className="h-3 w-3 ml-1 cursor-pointer hover:text-red-600"
                            onClick={() => setCertFormTags(certFormTags.filter((t) => t !== tag))}
                          />
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setCertDialogOpen(false)}>
                取消
              </Button>
              <Button type="submit">创建认证</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* 市场活动对话框 */}
      <Dialog open={activityDialogOpen} onOpenChange={(open) => {
        setActivityDialogOpen(open);
        if (!open) {
          setCurrentTags([]);
          setTagInput("");
        }
      }}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>创建市场活动</DialogTitle>
            <DialogDescription>
              规划和管理线上线下市场活动、研讨会等
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={(e) => { e.preventDefault(); setActivityDialogOpen(false); }}>
            <div className="space-y-4 py-4">
              {/* 基本信息 */}
              <div className="space-y-4">
                <h4 className="font-medium text-sm text-gray-700 border-b pb-2">基本信息</h4>
                
                <div className="space-y-2">
                  <Label htmlFor="activity-title">活动名称 *</Label>
                  <Input
                    id="activity-title"
                    placeholder="请输入活动名称，例如：2024春季新品发布会"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="activity-type">活动类型 *</Label>
                    <Select defaultValue="offline">
                      <SelectTrigger>
                        <SelectValue placeholder="选择活动类型" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="offline">线下活动</SelectItem>
                        <SelectItem value="online">线上活动</SelectItem>
                        <SelectItem value="hybrid">线上线下结合</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="activity-status">活动状态 *</Label>
                    <Select defaultValue="upcoming">
                      <SelectTrigger>
                        <SelectValue placeholder="选择状态" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="upcoming">即将开始</SelectItem>
                        <SelectItem value="ongoing">进行</SelectItem>
                        <SelectItem value="completed">已完成</SelectItem>
                        <SelectItem value="cancelled">已取消</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="activity-description">活动描述 *</Label>
                  <Textarea
                    id="activity-description"
                    placeholder="请输入活动的详细描述和亮点"
                    rows={4}
                    required
                  />
                </div>
              </div>

              {/* 时间和地点 */}
              <div className="space-y-4">
                <h4 className="font-medium text-sm text-gray-700 border-b pb-2">时间和地点</h4>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="activity-start-date">开始日期 *</Label>
                    <Input
                      id="activity-start-date"
                      type="date"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="activity-start-time">开始时间 *</Label>
                    <Input
                      id="activity-start-time"
                      type="time"
                      defaultValue="09:00"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="activity-end-date">结束日期 *</Label>
                    <Input
                      id="activity-end-date"
                      type="date"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="activity-end-time">结束时间 *</Label>
                    <Input
                      id="activity-end-time"
                      type="time"
                      defaultValue="18:00"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="activity-location">活动地点 *</Label>
                  <Input
                    id="activity-location"
                    placeholder="请输入活动地点，如：上海国际会展中心 或 在线直播"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="activity-address">详细地址</Label>
                  <Input
                    id="activity-address"
                    placeholder="请输入详细地址（线上活动可填写直播链接）"
                  />
                </div>
              </div>

              {/* 活动规模 */}
              <div className="space-y-4">
                <h4 className="font-medium text-sm text-gray-700 border-b pb-2">活动规模</h4>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="activity-capacity">参与人数上限</Label>
                    <Input
                      id="activity-capacity"
                      type="number"
                      placeholder="如：500"
                      min="1"
                    />
                    <p className="text-xs text-gray-500">
                      留空表示不限人数
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="activity-registered">已报名人数</Label>
                    <Input
                      id="activity-registered"
                      type="number"
                      defaultValue="0"
                      min="0"
                      readOnly
                      className="bg-gray-50"
                    />
                  </div>
                </div>
              </div>

              {/* 标签管理 */}
              <div className="space-y-4">
                <h4 className="font-medium text-sm text-gray-700 border-b pb-2">标签管理</h4>
                
                <div className="space-y-2">
                  <Label htmlFor="activity-tags">活动标签</Label>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Input
                        id="activity-tags"
                        placeholder="输入标签后按回车添加"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            if (tagInput.trim() && !currentTags.includes(tagInput.trim())) {
                              setCurrentTags([...currentTags, tagInput.trim()]);
                              setTagInput("");
                            }
                          }
                        }}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          if (tagInput.trim() && !currentTags.includes(tagInput.trim())) {
                            setCurrentTags([...currentTags, tagInput.trim()]);
                            setTagInput("");
                          }
                        }}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        添加
                      </Button>
                    </div>
                    {currentTags.length > 0 && (
                      <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-lg border">
                        {currentTags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-sm">
                            {tag}
                            <X
                              className="h-3 w-3 ml-1 cursor-pointer hover:text-red-600"
                              onClick={() => setCurrentTags(currentTags.filter(t => t !== tag))}
                            />
                          </Badge>
                        ))}
                      </div>
                    )}
                    <p className="text-xs text-gray-500">
                      添加标签以便快速分类和检索，如：新品发布、在线研讨会、峰会、技术培训等
                    </p>
                  </div>
                </div>
              </div>

              {/* 媒体资源 */}
              <div className="space-y-4">
                <h4 className="font-medium text-sm text-gray-700 border-b pb-2">媒体资源</h4>
                
                <div className="space-y-2">
                  <Label htmlFor="activity-thumbnail">活动封面 *</Label>
                  <div className="flex gap-2">
                    <Input
                      id="activity-thumbnail"
                      placeholder="请输入图片URL"
                      className="flex-1"
                      required
                    />
                    <Button type="button" variant="outline">
                      <ImageIcon className="h-4 w-4 mr-2" />
                      上传图片
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500">
                    推荐尺寸：1200x675px（16:9），格式：JPG/PNG
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="activity-link">活动详情页链接</Label>
                  <Input
                    id="activity-link"
                    placeholder="如：/activities/spring-2024"
                  />
                </div>
              </div>

              {/* 联系方式 */}
              <div className="space-y-4">
                <h4 className="font-medium text-sm text-gray-700 border-b pb-2">联系方式</h4>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="activity-contact-person">联系</Label>
                    <Input
                      id="activity-contact-person"
                      placeholder="请输入联系人姓名"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="activity-contact-phone">联系电话</Label>
                    <Input
                      id="activity-contact-phone"
                      type="tel"
                      placeholder="请输入联系电话"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="activity-contact-email">联系邮箱</Label>
                  <Input
                    id="activity-contact-email"
                    type="email"
                    placeholder="请输入联系邮箱"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setActivityDialogOpen(false)}>
                取消
              </Button>
              <Button type="button" variant="secondary">
                保存草稿
              </Button>
              <Button type="submit">
                创建活动
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* 收集表单创建对话框 */}
      <Dialog open={formDialogOpen} onOpenChange={(open) => {
        if (!open) {
          closeFormDialog();
          return;
        }
        setFormDialogOpen(true);
      }}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingFormId !== null ? "编辑收集表单" : "创建收集表单"}</DialogTitle>
            <DialogDescription>
              {editingFormId !== null ? "修改表单配置并保存到当前记录" : "设计自定义表单，收集用户信息和反馈"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={(e) => { 
            e.preventDefault();
            handleSubmitFormDialog();
          }}>
            <div className="space-y-6 py-4">
              {/* 基本信息 */}
              <div className="space-y-4">
                <h4 className="font-medium text-sm text-gray-700 border-b pb-2">基本信息</h4>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="form-name">表单名称 *</Label>
                    <Input
                      id="form-name"
                      placeholder="如：产品咨询表单"
                      value={formMeta.name}
                      onChange={(e) => setFormMeta({ ...formMeta, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="form-type">表单类型 *</Label>
                    <Select value={formMeta.type} onValueChange={(value) => setFormMeta({ ...formMeta, type: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="选择类型" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inquiry">产品咨询</SelectItem>
                        <SelectItem value="service">售后服务</SelectItem>
                        <SelectItem value="partnership">商务合作</SelectItem>
                        <SelectItem value="event">活动报名</SelectItem>
                        <SelectItem value="feedback">意见反馈</SelectItem>
                        <SelectItem value="other">其他</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="form-description">表单描述</Label>
                  <Textarea
                    id="form-description"
                    placeholder="简要描述此表单的用途"
                    rows={2}
                    value={formMeta.description}
                    onChange={(e) => setFormMeta({ ...formMeta, description: e.target.value })}
                  />
                </div>
              </div>

              {/* 表单字段配置 */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <h4 className="font-medium text-sm text-gray-700">表单字段</h4>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      const nextId = formFields.length > 0 ? Math.max(...formFields.map((field) => field.id)) + 1 : 1;
                      const newField = {
                        id: nextId,
                        label: "",
                        type: "text",
                        required: false,
                        options: []
                      };
                      setFormFields([...formFields, newField]);
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    添加字段
                  </Button>
                </div>

                {formFields.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                    <Smartphone className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-sm text-gray-600 mb-2">暂无表单字段</p>
                    <p className="text-xs text-gray-500 mb-4">点击“添加字段”开始设计表单</p>
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => {
                        const newField = {
                          id: 1,
                          label: "",
                          type: "text",
                          required: false,
                          options: []
                        };
                        setFormFields([newField]);
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      添加第一个字段
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {formFields.map((field, index) => (
                      <div key={field.id} className="p-4 border rounded-lg bg-gray-50">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-medium text-sm">
                            {index + 1}
                          </div>
                          <div className="flex-1 grid grid-cols-3 gap-3">
                            <div className="space-y-1">
                              <Label className="text-xs">字段名称 *</Label>
                              <Input
                                placeholder="如：姓名"
                                value={field.label}
                                onChange={(e) => {
                                  const updated = [...formFields];
                                  updated[index].label = e.target.value;
                                  setFormFields(updated);
                                }}
                                required
                              />
                            </div>
                            <div className="space-y-1">
                              <Label className="text-xs">字段类型 *</Label>
                              <Select 
                                value={field.type}
                                onValueChange={(value) => {
                                  const updated = [...formFields];
                                  updated[index].type = value;
                                  setFormFields(updated);
                                }}
                              >
                                <SelectTrigger className="h-9">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="text">单行文本</SelectItem>
                                  <SelectItem value="textarea">多行文本</SelectItem>
                                  <SelectItem value="number">数字</SelectItem>
                                  <SelectItem value="phone">手机</SelectItem>
                                  <SelectItem value="email">邮箱</SelectItem>
                                  <SelectItem value="date">日期</SelectItem>
                                  <SelectItem value="datetime">日期时间</SelectItem>
                                  <SelectItem value="select">下拉选择</SelectItem>
                                  <SelectItem value="file">文件上传</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-1">
                              <Label className="text-xs">是否必填</Label>
                              <div className="flex items-center h-9">
                                <Switch
                                  checked={field.required}
                                  onCheckedChange={(checked) => {
                                    const updated = [...formFields];
                                    updated[index].required = checked;
                                    setFormFields(updated);
                                  }}
                                />
                                <span className="ml-2 text-sm text-gray-600">
                                  {field.required ? "必填" : "可选"}
                                </span>
                              </div>
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setFormFields(formFields.filter((_, i) => i !== index));
                            }}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        {/* 下拉选择的项配置 */}
                        {field.type === "select" && (
                          <div className="mt-3 pt-3 border-t">
                            <Label className="text-xs mb-2 block">下拉选项（每行一个）</Label>
                            <Textarea
                              placeholder="选项1&#10;选项2&#10;选项3"
                              rows={3}
                              className="text-sm"
                              value={(field.options || []).join('\n')}
                              onChange={(e) => {
                                const updated = [...formFields];
                                updated[index].options = e.target.value.split('\n').filter(o => o.trim());
                                setFormFields(updated);
                              }}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 表单设置 */}
              <div className="space-y-4">
                <h4 className="font-medium text-sm text-gray-700 border-b pb-2">表单设置</h4>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center justify-between space-y-0 rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-medium">提交后显示感谢页</Label>
                      <p className="text-xs text-gray-600">用户提交后显示感谢信</p>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>

                  <div className="flex items-center justify-between space-y-0 rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-medium">邮件通知管理</Label>
                      <p className="text-xs text-gray-600">有新提交时发送邮件</p>
                    </div>
                    <Switch defaultChecked={false} />
                  </div>
                </div>
              </div>

              {/* 预览提示 */}
              {formFields.length > 0 && (
                <div className="rounded-lg bg-blue-50 border border-blue-200 p-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0">
                      <Eye className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-blue-900 mb-1">
                        表单预览
                      </p>
                      <p className="text-xs text-blue-700 mb-2">
                        您已添加 {formFields.length} 个字段，其中 {formFields.filter(f => f.required).length} 个必填
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {formFields.map((field) => (
                          <Badge key={field.id} variant="secondary" className="text-xs">
                            {field.label || "未命名"}
                            {field.required && <span className="text-red-500 ml-1">*</span>}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => {
                closeFormDialog();
              }}>
                取消
              </Button>
              <Button type="submit" disabled={formFields.length === 0}>
                {editingFormId !== null ? "保存修改" : "创建表单"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={productEditDialogOpen}
        onOpenChange={(open) => {
          setProductEditDialogOpen(open);
          if (!open) {
            setEditingProductId(null);
            setProductEditTagInput("");
            setProductEditTags([]);
          }
        }}
      >
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>编辑产品</DialogTitle>
            <DialogDescription>编辑产品所有字段和标签</DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSaveProductEdit();
            }}
          >
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-product-title">产品名称 *</Label>
                  <Input
                    id="edit-product-title"
                    value={productEditForm.title}
                    onChange={(e) => setProductEditForm({ ...productEditForm, title: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-product-code">产品型号 *</Label>
                  <Input
                    id="edit-product-code"
                    value={productEditForm.productCode}
                    onChange={(e) => setProductEditForm({ ...productEditForm, productCode: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-product-type">类型</Label>
                  <Input
                    id="edit-product-type"
                    value={productEditForm.type}
                    onChange={(e) => setProductEditForm({ ...productEditForm, type: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-product-category">分类</Label>
                  <Input
                    id="edit-product-category"
                    value={productEditForm.category}
                    onChange={(e) => setProductEditForm({ ...productEditForm, category: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-product-author">作者/来源</Label>
                  <Input
                    id="edit-product-author"
                    value={productEditForm.author}
                    onChange={(e) => setProductEditForm({ ...productEditForm, author: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-product-status">状态</Label>
                  <Input
                    id="edit-product-status"
                    value={productEditForm.status}
                    onChange={(e) => setProductEditForm({ ...productEditForm, status: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-product-views">浏览量</Label>
                  <Input
                    id="edit-product-views"
                    type="number"
                    min="0"
                    value={productEditForm.views}
                    onChange={(e) => setProductEditForm({ ...productEditForm, views: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-product-create-time">创建时间</Label>
                  <Input
                    id="edit-product-create-time"
                    value={productEditForm.createTime}
                    onChange={(e) => setProductEditForm({ ...productEditForm, createTime: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-product-print-speed">打印速度</Label>
                  <Input
                    id="edit-product-print-speed"
                    value={productEditForm.printSpeed}
                    onChange={(e) => setProductEditForm({ ...productEditForm, printSpeed: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-product-price">价格</Label>
                  <Input
                    id="edit-product-price"
                    value={productEditForm.price}
                    onChange={(e) => setProductEditForm({ ...productEditForm, price: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-product-thumbnail">封面图URL</Label>
                  <Input
                    id="edit-product-thumbnail"
                    value={productEditForm.thumbnail}
                    onChange={(e) => setProductEditForm({ ...productEditForm, thumbnail: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-product-features">产品特性</Label>
                <Textarea
                  id="edit-product-features"
                  rows={4}
                  value={productEditForm.features}
                  onChange={(e) => setProductEditForm({ ...productEditForm, features: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-product-tags">标签</Label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      id="edit-product-tags"
                      placeholder="输入标签后按回车添加"
                      value={productEditTagInput}
                      onChange={(e) => setProductEditTagInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          const nextTag = productEditTagInput.trim();
                          if (nextTag && !productEditTags.includes(nextTag)) {
                            setProductEditTags([...productEditTags, nextTag]);
                            setProductEditTagInput("");
                          }
                        }
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        const nextTag = productEditTagInput.trim();
                        if (nextTag && !productEditTags.includes(nextTag)) {
                          setProductEditTags([...productEditTags, nextTag]);
                          setProductEditTagInput("");
                        }
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      添加
                    </Button>
                  </div>
                  {productEditTags.length > 0 && (
                    <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-lg border">
                      {productEditTags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-sm">
                          {tag}
                          <X
                            className="h-3 w-3 ml-1 cursor-pointer hover:text-red-600"
                            onClick={() => setProductEditTags(productEditTags.filter((t) => t !== tag))}
                          />
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <Label htmlFor="edit-product-visible" className="text-sm font-medium">前台可见</Label>
                  <p className="text-xs text-gray-500">控制该产品是否在前台展示</p>
                </div>
                <Switch
                  id="edit-product-visible"
                  checked={productEditForm.visible}
                  onCheckedChange={(checked) => setProductEditForm({ ...productEditForm, visible: checked })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setProductEditDialogOpen(false)}>
                取消
              </Button>
              <Button type="submit">保存修改</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* 用户指南对话框 */}
      <Dialog open={guideDialogOpen} onOpenChange={(open) => {
        setGuideDialogOpen(open);
        if (!open) {
          setCurrentTags([]);
          setTagInput("");
        }
      }}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>添加用户指南</DialogTitle>
            <DialogDescription>
              创建RICOH产品使用技巧和操作指南
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={(e) => { 
            e.preventDefault(); 
            setGuideDialogOpen(false);
            setCurrentTags([]);
            setTagInput("");
          }}>
            <div className="space-y-6 py-4">
              {/* 基本信息 */}
              <div className="space-y-4">
                <h4 className="font-medium text-sm text-gray-700 border-b pb-2">基本信息</h4>
                
                <div className="space-y-2">
                  <Label htmlFor="guide-title">指南标题 *</Label>
                  <Input
                    id="guide-title"
                    placeholder="如：双面打印设置教程"
                    required
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="guide-product">适用产品 *</Label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="选择产品" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">全系</SelectItem>
                        <SelectItem value="im-c">RICOH IM C系列</SelectItem>
                        <SelectItem value="mp">RICOH MP系列</SelectItem>
                        <SelectItem value="sp">RICOH SP系列</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="guide-category">指南分类 *</Label>
                    <Select defaultValue="basic">
                      <SelectTrigger>
                        <SelectValue placeholder="选择分类" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">基础操作</SelectItem>
                        <SelectItem value="maintenance">维护保养</SelectItem>
                        <SelectItem value="troubleshooting">故障排除</SelectItem>
                        <SelectItem value="advanced">高级功能</SelectItem>
                        <SelectItem value="security">安全功能</SelectItem>
                        <SelectItem value="optimization">性能优化</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="guide-difficulty">难度等级 *</Label>
                    <Select defaultValue="simple">
                      <SelectTrigger>
                        <SelectValue placeholder="选择难度" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="simple">简单</SelectItem>
                        <SelectItem value="medium">中等</SelectItem>
                        <SelectItem value="hard">困难</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* 内容编辑 */}
              <div className="space-y-4">
                <h4 className="font-medium text-sm text-gray-700 border-b pb-2">内容编辑</h4>
                
                <div className="space-y-2">
                  <Label htmlFor="guide-content">指南内容 *</Label>
                  <Textarea
                    id="guide-content"
                    placeholder="请输入详细的操作步骤和说明。建议格式：1. 第一步说明 2. 第二步说明 ..."
                    rows={18}
                    required
                    className="font-mono text-sm"
                  />
                  <p className="text-xs text-gray-500">
                    支持使用 emoji 图标增强可读性：💡 ⚠️ ✅ ❌ 🔵 🔶 等
                  </p>
                </div>
              </div>

              {/* 标签管理 */}
              <div className="space-y-4">
                <h4 className="font-medium text-sm text-gray-700 border-b pb-2">标签管理</h4>
                
                <div className="space-y-2">
                  <Label htmlFor="guide-tags">指南标签</Label>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Input
                        id="guide-tags"
                        placeholder="输入标签后按回车添加"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            if (tagInput.trim() && !currentTags.includes(tagInput.trim())) {
                              setCurrentTags([...currentTags, tagInput.trim()]);
                              setTagInput("");
                            }
                          }
                        }}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          if (tagInput.trim() && !currentTags.includes(tagInput.trim())) {
                            setCurrentTags([...currentTags, tagInput.trim()]);
                            setTagInput("");
                          }
                        }}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        添加
                      </Button>
                    </div>
                    {currentTags.length > 0 && (
                      <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-lg border">
                        {currentTags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-sm">
                            {tag}
                            <X
                              className="h-3 w-3 ml-1 cursor-pointer hover:text-red-600"
                              onClick={() => setCurrentTags(currentTags.filter(t => t !== tag))}
                            />
                          </Badge>
                        ))}
                      </div>
                    )}
                    <p className="text-xs text-gray-500">
                      例如：双面打印、故障排除、维护保养
                    </p>
                  </div>
                </div>
              </div>

              {/* 缩略图 */}
              <div className="space-y-4">
                <h4 className="font-medium text-sm text-gray-700 border-b pb-2">媒体资源</h4>
                
                <div className="space-y-2">
                  <Label htmlFor="guide-thumbnail">封面图片（可选）</Label>
                  <div className="flex gap-2">
                    <Input
                      id="guide-thumbnail"
                      placeholder="请输入图片URL"
                      className="flex-1"
                    />
                    <Button type="button" variant="outline">
                      <ImageIcon className="h-4 w-4 mr-2" />
                      上传图片
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500">
                    建议尺寸：800x600px，格式：JPG/PNG
                  </p>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setGuideDialogOpen(false)}>
                取消
              </Button>
              <Button type="submit">
                <BookOpen className="h-4 w-4 mr-2" />
                创建指南
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}





