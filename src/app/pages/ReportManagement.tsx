import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Badge } from "../components/ui/badge";
import { 
  Search, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertCircle, 
  Plus,
  Building2,
  Users,
  Briefcase,
  FileText,
  TrendingUp,
  Shield,
  Loader2,
  AlertTriangle
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "../components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

// 客户类型定义
type CustomerType = "普通客户" | "RGS客户" | "NAM客户" | "央国企大客户" | "框架客户" | "未知";

// 用户角色定义
type UserRole = "一级代理商" | "二级代理商" | "直销经理" | "区域渠道支援" | "市场部担当" | "直销报备协调" | "区域经理" | "直销副总经理" | "大客户报备协调";

// 报备类型
type ReportType = "正常报备" | "共享申请" | "冲突申诉" | "跨渠道申诉" | "直销内部冲突";

// 审批状态
type ApprovalStatus = "pending" | "in_review" | "approved" | "rejected" | "need_supplement";

// 模拟当前用户角色（可以改为从登录信息获取）
const CURRENT_USER_ROLE: UserRole = "一级代理商";

// 客户数据库（模拟）
const customerDatabase = [
  { 
    id: 1, 
    companyName: "中国石油天然气集团有限公司", 
    department: "信息技术部",
    type: "央国企大客户" as CustomerType,
    owner: "王凡",
    region: "华北",
    contractEndDate: "2025-12-31",
    status: "有效"
  },
  { 
    id: 2, 
    companyName: "中国工商银行", 
    department: "总行科技部",
    type: "央国企大客户" as CustomerType,
    owner: "连紫昭",
    region: "华北",
    contractEndDate: "2024-06-30",
    status: "有效"
  },
  { 
    id: 3, 
    companyName: "阿里巴巴集团", 
    department: "采购中心",
    type: "框架客户" as CustomerType,
    owner: "上海理光",
    region: "华东",
    contractEndDate: "2024-03-15",
    status: "有效"
  },
  { 
    id: 4, 
    companyName: "华为技术有限公司", 
    department: "行政部",
    type: "RGS客户" as CustomerType,
    owner: "深圳理光",
    region: "华南",
    contractEndDate: "",
    status: "有效"
  },
  { 
    id: 5, 
    companyName: "腾讯科技", 
    department: "办公服务部",
    type: "NAM客户" as CustomerType,
    owner: "直销团队",
    region: "全国",
    contractEndDate: "",
    status: "有效"
  },
];

// 模拟报备记录
const mockReports = [
  {
    id: 1,
    reportNo: "BB202402210001",
    reportType: "正常报备" as ReportType,
    customerName: "北京科技创新股份有限公司",
    customerDepartment: "IT部",
    customerType: "普通客户" as CustomerType,
    submitterName: "张三",
    submitterRole: "一级代理商" as UserRole,
    dealerName: "北京理光办公设备有限公司",
    region: "华北",
    category: "打印设备",
    status: "pending" as ApprovalStatus,
    currentApprover: "区域渠道支援-王经理",
    priority: "high",
    createTime: "2024-02-21 09:30",
    description: "客户需要采购20台彩色多功能打印机，用于新办公区",
    materials: ["客户需求确认书.pdf", "报价单.pdf"],
    approvalHistory: [
      { approver: "张三", role: "一级代理商", action: "提交报备", time: "2024-02-21 09:30", comment: "已完成客户调研" },
      { approver: "区域渠道支援-王经理", role: "区域渠道支援", action: "待审批", time: "", comment: "" }
    ]
  },
  {
    id: 2,
    reportNo: "BB202402210002",
    reportType: "冲突申诉" as ReportType,
    customerName: "上海浦东国际贸易公司",
    customerDepartment: "财务部",
    customerType: "普通客户" as CustomerType,
    submitterName: "李四",
    submitterRole: "一级代理商" as UserRole,
    dealerName: "上海理光商贸有限公司",
    region: "华东",
    category: "维修服务",
    status: "in_review" as ApprovalStatus,
    currentApprover: "区域渠道支援-陈经理",
    priority: "high",
    createTime: "2024-02-21 10:15",
    description: "该客户已被其他代理商报备，但我方有更早的接洽记录",
    materials: ["接洽记录.pdf", "邮件往来.pdf", "客户确认函.pdf"],
    conflictReason: "与另一代理商存在报备冲突",
    approvalHistory: [
      { approver: "李四", role: "一级代理商", action: "提交申诉", time: "2024-02-21 10:15", comment: "提供完整接洽证据" },
      { approver: "区域渠道支援-陈经理", role: "区域渠道支援", action: "审批中", time: "2024-02-21 11:00", comment: "正在核实双方证据" }
    ]
  },
  {
    id: 3,
    reportNo: "BB202402200003",
    reportType: "正常报备" as ReportType,
    customerName: "中国石油天然气集团有限公司",
    customerDepartment: "信息技术部",
    customerType: "央国企大客户" as CustomerType,
    submitterName: "王五",
    submitterRole: "直销经理" as UserRole,
    dealerName: "直销部",
    region: "华北",
    category: "打印设备",
    status: "approved" as ApprovalStatus,
    currentApprover: "",
    priority: "high",
    createTime: "2024-02-20 14:00",
    description: "央企集团总部采购项目，预计金额500万",
    materials: ["招标文件.pdf", "技术方案.pdf"],
    approvalHistory: [
      { approver: "王五", role: "直销经理", action: "提交报备", time: "2024-02-20 14:00", comment: "重点项目" },
      { approver: "王凡", role: "大客户报备协调", action: "已通过", time: "2024-02-20 16:30", comment: "符合央企大客户报备流程，批准" }
    ]
  },
];

type CustomerRecord = (typeof customerDatabase)[number];
type ReportItem = (typeof mockReports)[number];
type ApprovalHistoryItem = ReportItem["approvalHistory"][number];
type SearchResult = {
  found: boolean;
  customer?: CustomerRecord;
  message: string;
  customerType: CustomerType;
  currentOwner: string;
  status: string;
  contractEndDate?: string;
};

// 审批人配置（根据客户类型和报备类型分配）
const getApproverByRule = (customerType: CustomerType, reportType: ReportType, submitterRole: UserRole, region: string) => {
  // 央国企大客户
  if (customerType === "央国企大客户") {
    return { name: "王凡/连紫昭", role: "大客户报备协调" };
  }
  
  // 框架客户
  if (customerType === "框架客户") {
    return { name: `${region}渠道支援`, role: "区域渠道支援" };
  }
  
  // 直销经理报备
  if (submitterRole === "直销经理") {
    // RGS/NAM客户
    if (customerType === "RGS客户" || customerType === "NAM客户") {
      return { name: `${region}区域经理`, role: "区域经理" };
    }
    
    // 普通客户的跨渠道申诉
    if (reportType === "跨渠道申诉") {
      return { name: "姚俊", role: "市场部担当" };
    }
    
    // 直销内部冲突
    if (reportType === "直销内部冲突") {
      return { name: "黄迪华/周明", role: "直销报备协调" };
    }
    
    // 普通客户正常报备
    return { name: "姚俊", role: "市场部担当" };
  }
  
  // 二级代理商：需要一级代理商初审
  if (submitterRole === "二级代理商") {
    return { name: "上级一级代理商", role: "一级代理商" };
  }
  
  // 一级代理商：区域渠道支援审批
  return { name: `${region}渠道支援`, role: "区域渠道支援" };
};

export default function ReportManagement() {
  const [reports, setReports] = useState(mockReports);
  const [searchTerm, setSearchTerm] = useState("");
  const [detailDialog, setDetailDialog] = useState(false);
  const [createDialog, setCreateDialog] = useState(false);
  const [selectedReport, setSelectedReport] = useState<ReportItem | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [approvalComment, setApprovalComment] = useState("");
  
  // 客户检索相关
  const [customerSearchDialog, setCustomerSearchDialog] = useState(false);
  const [customerCompanyName, setCustomerCompanyName] = useState("");
  const [customerDepartment, setCustomerDepartment] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  
  // 报备表单
  const [reportForm, setReportForm] = useState({
    reportType: "正常报备" as ReportType,
    customerName: "",
    customerDepartment: "",
    customerType: "未知" as CustomerType,
    region: "华北",
    category: "打印设备",
    description: "",
    conflictReason: "",
  });

  const filteredReports = reports.filter((report) => {
    const matchSearch =
      report.reportNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.submitterName.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === "all") return matchSearch;
    return matchSearch && report.status === activeTab;
  });

  // 客户检索功能
  const handleCustomerSearch = async () => {
    setIsSearching(true);
    
    // 模拟查重过程（实际应该调用后端API）
    setTimeout(() => {
      const found = customerDatabase.find(
        c => c.companyName.includes(customerCompanyName) && 
             c.department.includes(customerDepartment)
      );
      
      if (found) {
        setSearchResult({
          found: true,
          customer: found,
          message: `检测到客户：${found.companyName} - ${found.department}`,
          customerType: found.type,
          currentOwner: found.owner,
          status: found.status,
          contractEndDate: found.contractEndDate
        });
        
        // 自动填充到表单
        setReportForm({
          ...reportForm,
          customerName: found.companyName,
          customerDepartment: found.department,
          customerType: found.type,
          region: found.region
        });
      } else {
        setSearchResult({
          found: false,
          message: `未找到客户记录，判定为"普通客户"，可以继续报备`,
          customerType: "普通客户",
          currentOwner: "无",
          status: "可报备"
        });
        
        setReportForm({
          ...reportForm,
          customerName: customerCompanyName,
          customerDepartment: customerDepartment,
          customerType: "普通客户"
        });
      }
      
      setIsSearching(false);
    }, 1500);
  };

  // 提交报备
  const handleSubmitReport = () => {
    const approver = getApproverByRule(
      reportForm.customerType,
      reportForm.reportType,
      CURRENT_USER_ROLE,
      reportForm.region
    );
    
    const newReport = {
      id: reports.length + 1,
      reportNo: `BB${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}${String(reports.length + 1).padStart(4, '0')}`,
      reportType: reportForm.reportType,
      customerName: reportForm.customerName,
      customerDepartment: reportForm.customerDepartment,
      customerType: reportForm.customerType,
      submitterName: "当前用户",
      submitterRole: CURRENT_USER_ROLE,
      dealerName: "北京理光办公设备有限公司",
      region: reportForm.region,
      category: reportForm.category,
      status: "pending" as ApprovalStatus,
      currentApprover: `${approver.role}-${approver.name}`,
      priority: "normal",
      createTime: new Date().toLocaleString('zh-CN'),
      description: reportForm.description,
      conflictReason: reportForm.conflictReason,
      materials: [],
      approvalHistory: [
        {
          approver: "当前用户",
          role: CURRENT_USER_ROLE,
          action: "提交报备",
          time: new Date().toLocaleString('zh-CN'),
          comment: reportForm.description
        },
        {
          approver: approver.name,
          role: approver.role,
          action: "待审批",
          time: "",
          comment: ""
        }
      ]
    };
    
    setReports([newReport, ...reports]);
    setCreateDialog(false);
    setCustomerSearchDialog(false);
    
    // 重置表单
    setReportForm({
      reportType: "正常报备",
      customerName: "",
      customerDepartment: "",
      customerType: "未知",
      region: "华北",
      category: "打印设备",
      description: "",
      conflictReason: "",
    });
    setSearchResult(null);
    setCustomerCompanyName("");
    setCustomerDepartment("");
  };

  const handleViewDetail = (report: ReportItem) => {
    setSelectedReport(report);
    setApprovalComment("");
    setDetailDialog(true);
  };

  const handleCreateReport = () => {
    setCreateDialog(true);
    setCustomerSearchDialog(true);
  };

  const handleApprove = (id: number) => {
    setReports(
      reports.map((report) =>
        report.id === id ? { 
          ...report, 
          status: "approved" as ApprovalStatus,
          approvalHistory: [
            ...report.approvalHistory.slice(0, -1),
            {
              ...report.approvalHistory[report.approvalHistory.length - 1],
              action: "已通过",
              time: new Date().toLocaleString('zh-CN'),
              comment: approvalComment || "批准"
            }
          ]
        } : report
      )
    );
    setDetailDialog(false);
  };

  const handleReject = (id: number) => {
    if (!approvalComment.trim()) {
      alert("请填写拒绝原因");
      return;
    }
    setReports(
      reports.map((report) =>
        report.id === id ? { 
          ...report, 
          status: "rejected" as ApprovalStatus,
          approvalHistory: [
            ...report.approvalHistory.slice(0, -1),
            {
              ...report.approvalHistory[report.approvalHistory.length - 1],
              action: "已拒绝",
              time: new Date().toLocaleString('zh-CN'),
              comment: approvalComment
            }
          ]
        } : report
      )
    );
    setDetailDialog(false);
  };

  const handleNeedSupplement = (id: number) => {
    if (!approvalComment.trim()) {
      alert("请说明需要补充的材料");
      return;
    }
    setReports(
      reports.map((report) =>
        report.id === id ? { 
          ...report, 
          status: "need_supplement" as ApprovalStatus,
          approvalHistory: [
            ...report.approvalHistory.slice(0, -1),
            {
              ...report.approvalHistory[report.approvalHistory.length - 1],
              action: "要求补充",
              time: new Date().toLocaleString('zh-CN'),
              comment: approvalComment
            }
          ]
        } : report
      )
    );
    setDetailDialog(false);
  };

  const getStatusCount = (status: string) => {
    if (status === "all") return reports.length;
    return reports.filter((r) => r.status === status).length;
  };

  const statusMap: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
    pending: { label: "待审批", variant: "default" },
    in_review: { label: "审批中", variant: "outline" },
    approved: { label: "已通过", variant: "secondary" },
    rejected: { label: "已拒绝", variant: "destructive" },
    need_supplement: { label: "待补充", variant: "outline" },
  };

  const customerTypeColor: Record<CustomerType, string> = {
    "普通客户": "bg-blue-100 text-blue-800",
    "RGS客户": "bg-purple-100 text-purple-800",
    "NAM客户": "bg-orange-100 text-orange-800",
    "央国企大客户": "bg-red-100 text-red-800",
    "框架客户": "bg-green-100 text-green-800",
    "未知": "bg-gray-100 text-gray-800"
  };

  return (
    <div className="space-y-6">
      {/* 统计卡片 */}
      <div className="grid gap-6 md:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">待审批</CardTitle>
            <Clock className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getStatusCount("pending")}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">审批中</CardTitle>
            <AlertCircle className="h-5 w-5 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getStatusCount("in_review")}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">已通过</CardTitle>
            <CheckCircle className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getStatusCount("approved")}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">已拒绝</CardTitle>
            <XCircle className="h-5 w-5 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getStatusCount("rejected")}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">待补充</CardTitle>
            <FileText className="h-5 w-5 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getStatusCount("need_supplement")}</div>
          </CardContent>
        </Card>
      </div>

      {/* 功能说明卡片 */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-900">
            <Shield className="h-5 w-5" />
            智能报备流程系统
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-semibold text-blue-800">
                <Users className="h-4 w-4" />
                一级代理商流程
              </div>
              <ul className="space-y-1 text-blue-700 ml-6">
                <li>• 客户检索 → 提交报备</li>
                <li>• 区域渠道支援审批</li>
                <li>• 自动更新客户归属</li>
              </ul>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-semibold text-purple-800">
                <Briefcase className="h-4 w-4" />
                二级代理商流程
              </div>
              <ul className="space-y-1 text-purple-700 ml-6">
                <li>• 提交报备申请</li>
                <li>• 一级代理商初审</li>
                <li>• 区域渠道支援终审</li>
              </ul>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-semibold text-orange-800">
                <TrendingUp className="h-4 w-4" />
                直销经理流程
              </div>
              <ul className="space-y-1 text-orange-700 ml-6">
                <li>• 普通客户 → 市场部担当</li>
                <li>• RGS/NAM → 区域经理</li>
                <li>• 央企大客户 → 专审通道</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 报备列表 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>报备列表</CardTitle>
            <div className="flex gap-2">
              <Badge variant="outline" className="text-sm">
                当前角色：{CURRENT_USER_ROLE}
              </Badge>
              <Button onClick={handleCreateReport}>
                <Plus className="h-4 w-4 mr-2" />
                新建报备
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="搜索报备编号、客户名称..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="all">全部</TabsTrigger>
                <TabsTrigger value="pending">待审批</TabsTrigger>
                <TabsTrigger value="in_review">审批中</TabsTrigger>
                <TabsTrigger value="approved">已通过</TabsTrigger>
                <TabsTrigger value="rejected">已拒绝</TabsTrigger>
              </TabsList>
              <TabsContent value={activeTab} className="mt-4">
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>报备编号</TableHead>
                        <TableHead>报备类型</TableHead>
                        <TableHead>客户信息</TableHead>
                        <TableHead>客户类型</TableHead>
                        <TableHead>提交人</TableHead>
                        <TableHead>当前审批人</TableHead>
                        <TableHead>状态</TableHead>
                        <TableHead>提交时间</TableHead>
                        <TableHead className="text-right">操作</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredReports.map((report) => (
                        <TableRow key={report.id}>
                          <TableCell className="font-mono text-sm">{report.reportNo}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{report.reportType}</Badge>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{report.customerName}</div>
                              <div className="text-sm text-gray-500">{report.customerDepartment}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className={`text-xs px-2 py-1 rounded-full ${customerTypeColor[report.customerType]}`}>
                              {report.customerType}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium text-sm">{report.submitterName}</div>
                              <div className="text-xs text-gray-500">{report.submitterRole}</div>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm">{report.currentApprover}</TableCell>
                          <TableCell>
                            <Badge variant={statusMap[report.status].variant}>
                              {statusMap[report.status].label}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm">{report.createTime}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewDetail(report)}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              查看
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {/* 客户检索对话框 */}
      <Dialog open={customerSearchDialog} onOpenChange={setCustomerSearchDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              客户检索与报备
            </DialogTitle>
            <DialogDescription>
              输入"公司名+二级部门名称"进行全局查重，系统将自动判定客户类别
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* 步骤1：客户检索 */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-semibold text-blue-900">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">1</div>
                客户信息检索
              </div>
              
              <div className="grid grid-cols-2 gap-4 pl-8">
                <div className="space-y-2">
                  <Label htmlFor="companyName">公司名称 *</Label>
                  <Input
                    id="companyName"
                    placeholder="例如：中国石油天然气集团"
                    value={customerCompanyName}
                    onChange={(e) => setCustomerCompanyName(e.target.value)}
                    disabled={isSearching || searchResult !== null}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">二级部门 *</Label>
                  <Input
                    id="department"
                    placeholder="例如：信息技术部"
                    value={customerDepartment}
                    onChange={(e) => setCustomerDepartment(e.target.value)}
                    disabled={isSearching || searchResult !== null}
                  />
                </div>
              </div>
              
              <div className="pl-8">
                <Button
                  onClick={handleCustomerSearch}
                  disabled={!customerCompanyName || !customerDepartment || isSearching || searchResult !== null}
                  className="w-full"
                >
                  {isSearching ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      正在查重检索...
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4 mr-2" />
                      执行全局静默查重
                    </>
                  )}
                </Button>
              </div>
              
              {/* 查重结果 */}
              {searchResult && (
                <div className={`pl-8 p-4 rounded-lg border-2 ${
                  searchResult.found 
                    ? 'bg-yellow-50 border-yellow-300' 
                    : 'bg-green-50 border-green-300'
                }`}>
                  <div className="flex items-start gap-3">
                    {searchResult.found ? (
                      <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1 space-y-2">
                      <p className={`font-semibold ${searchResult.found ? 'text-yellow-900' : 'text-green-900'}`}>
                        {searchResult.message}
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-600">客户类型：</span>
                          <span className={`ml-2 px-2 py-0.5 rounded ${customerTypeColor[searchResult.customerType as CustomerType]}`}>
                            {searchResult.customerType}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">当前归属：</span>
                          <span className="ml-2 font-medium">{searchResult.currentOwner}</span>
                        </div>
                        {searchResult.contractEndDate && (
                          <div className="col-span-2">
                            <span className="text-gray-600">合同到期：</span>
                            <span className="ml-2 font-medium">{searchResult.contractEndDate}</span>
                          </div>
                        )}
                      </div>
                      
                      {searchResult.found && (
                        <p className="text-xs text-yellow-700 mt-2">
                          ⚠️ 该客户已被保护，如需报备请选择"冲突申诉"或"共享申请"类型
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* 步骤2：填写报备信息 */}
            {searchResult && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 font-semibold text-blue-900">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">2</div>
                  填写报备信息
                </div>
                
                <div className="space-y-4 pl-8">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="reportType">报备类型 *</Label>
                      <Select
                        value={reportForm.reportType}
                        onValueChange={(value) => setReportForm({...reportForm, reportType: value as ReportType})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="正常报备">正常报备</SelectItem>
                          <SelectItem value="共享申请">共享申请（共享MIF/客户）</SelectItem>
                          <SelectItem value="冲突申诉">冲突申诉</SelectItem>
                          {CURRENT_USER_ROLE === "直销经理" && (
                            <>
                              <SelectItem value="跨渠道申诉">跨渠道申诉</SelectItem>
                              <SelectItem value="直销内部冲突">直销内部冲突申诉</SelectItem>
                            </>
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="category">品类/区域 *</Label>
                      <Select
                        value={reportForm.category}
                        onValueChange={(value) => setReportForm({...reportForm, category: value})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="打印设备">打印设备</SelectItem>
                          <SelectItem value="维修服务">维修服务</SelectItem>
                          <SelectItem value="耗材供应">耗材供应</SelectItem>
                          <SelectItem value="解决方案">解决方案</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">报备说明 *</Label>
                    <Textarea
                      id="description"
                      placeholder="请详细说明报备内容、客户需求、接洽情况等..."
                      rows={4}
                      value={reportForm.description}
                      onChange={(e) => setReportForm({...reportForm, description: e.target.value})}
                    />
                  </div>
                  
                  {(reportForm.reportType === "冲突申诉" || reportForm.reportType === "跨渠道申诉") && (
                    <div className="space-y-2">
                      <Label htmlFor="conflictReason">冲突原因/申诉理由 *</Label>
                      <Textarea
                        id="conflictReason"
                        placeholder="请说明冲突情况或申诉理由，并提供相关证据材料..."
                        rows={3}
                        value={reportForm.conflictReason}
                        onChange={(e) => setReportForm({...reportForm, conflictReason: e.target.value})}
                      />
                    </div>
                  )}
                  
                  {/* 审批路由预览 */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-blue-900 font-semibold mb-2">
                      <FileText className="h-4 w-4" />
                      审批路由预览
                    </div>
                    <div className="text-sm text-blue-700">
                      {(() => {
                        const approver = getApproverByRule(
                          reportForm.customerType,
                          reportForm.reportType,
                          CURRENT_USER_ROLE,
                          reportForm.region
                        );
                        
                        if (reportForm.customerType === "央国企大客户") {
                          return `✓ 检测到央国企大客户，将自动流转至【${approver.name}】进行专审`;
                        } else if (reportForm.customerType === "框架客户") {
                          return `✓ 检测到框架客户，将流转至【${approver.name}】审批`;
                        } else if (CURRENT_USER_ROLE === "二级代理商") {
                          return `✓ 二级代理商报备，将先由【一级代理商】初审，通过后再由【区域渠道支援】终审`;
                        } else if (CURRENT_USER_ROLE === "直销经理") {
                          if (reportForm.customerType === "RGS客户" || reportForm.customerType === "NAM客户") {
                            return `✓ RGS/NAM客户，将流转至【${reportForm.region}区域经理】初审`;
                          } else if (reportForm.reportType === "跨渠道申诉") {
                            return `✓ 跨渠道申诉，将流转至【市场部担当-姚俊】审批`;
                          } else if (reportForm.reportType === "直销内部冲突") {
                            return `✓ 直销内部冲突，将流转至【直销报备协调-黄迪华/周明】审批`;
                          }
                          return `✓ 普通客户报备，将流转至【${approver.name}】审批`;
                        } else {
                          return `✓ 将流转至【${approver.name}】审批`;
                        }
                      })()}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setCustomerSearchDialog(false);
                setSearchResult(null);
                setCustomerCompanyName("");
                setCustomerDepartment("");
              }}
            >
              取消
            </Button>
            {searchResult && (
              <Button
                onClick={handleSubmitReport}
                disabled={!reportForm.description}
              >
                提交报备
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 报备详情对话框 */}
      <Dialog open={detailDialog} onOpenChange={setDetailDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>报备详情</DialogTitle>
            <DialogDescription>
              查看报备的详细信息并进行审批操作
            </DialogDescription>
          </DialogHeader>
          {selectedReport && (
            <div className="space-y-6 py-4">
              {/* 基本信息 */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">基本信息</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">报备编号</p>
                    <p className="font-medium font-mono">{selectedReport.reportNo}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">报备类型</p>
                    <Badge variant="outline">{selectedReport.reportType}</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">提交时间</p>
                    <p className="font-medium">{selectedReport.createTime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">提交人</p>
                    <p className="font-medium">{selectedReport.submitterName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">提交人角色</p>
                    <Badge variant="outline">{selectedReport.submitterRole}</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">状态</p>
                    <Badge variant={statusMap[selectedReport.status].variant}>
                      {statusMap[selectedReport.status].label}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* 客户信息 */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">客户信息</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">客户名称</p>
                    <p className="font-medium">{selectedReport.customerName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">客户部门</p>
                    <p className="font-medium">{selectedReport.customerDepartment}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">客户类型</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${customerTypeColor[selectedReport.customerType]}`}>
                      {selectedReport.customerType}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">所属区域</p>
                    <p className="font-medium">{selectedReport.region}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">品类</p>
                    <p className="font-medium">{selectedReport.category}</p>
                  </div>
                </div>
              </div>

              {/* 报备内容 */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">报备内容</h3>
                <div>
                  <p className="text-sm text-gray-600 mb-2">详细说明</p>
                  <p className="text-sm bg-gray-50 p-3 rounded-lg">{selectedReport.description}</p>
                </div>
                {selectedReport.conflictReason && (
                  <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">冲突原因/申诉理由</p>
                    <p className="text-sm text-yellow-900 font-medium">{selectedReport.conflictReason}</p>
                  </div>
                )}
              </div>

              {/* 审批流程 */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">审批流程</h3>
                <div className="space-y-3">
                  {selectedReport.approvalHistory.map((item: ApprovalHistoryItem, index: number) => (
                    <div key={index} className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0">
                        {item.action === "已通过" && <CheckCircle className="h-5 w-5 text-green-600" />}
                        {item.action === "已拒绝" && <XCircle className="h-5 w-5 text-red-600" />}
                        {item.action === "审批中" && <Clock className="h-5 w-5 text-orange-600" />}
                        {item.action === "待审批" && <AlertCircle className="h-5 w-5 text-gray-400" />}
                        {item.action === "要求补充" && <FileText className="h-5 w-5 text-yellow-600" />}
                        {(item.action === "提交报备" || item.action === "提交申诉") && <TrendingUp className="h-5 w-5 text-blue-600" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{item.approver}</span>
                          <Badge variant="outline" className="text-xs">{item.role}</Badge>
                          <Badge variant={
                            item.action === "已通过" ? "secondary" :
                            item.action === "已拒绝" ? "destructive" :
                            "default"
                          }>{item.action}</Badge>
                        </div>
                        {item.time && <p className="text-sm text-gray-600">时间：{item.time}</p>}
                        {item.comment && <p className="text-sm text-gray-700 mt-1">意见：{item.comment}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 审批意见 */}
              {selectedReport?.status === "pending" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">审批意见</h3>
                  <Textarea
                    placeholder="请输入审批意见..."
                    value={approvalComment}
                    onChange={(e) => setApprovalComment(e.target.value)}
                    rows={3}
                  />
                </div>
              )}
            </div>
          )}
          {selectedReport?.status === "pending" && (
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => handleReject(selectedReport.id)}
                className="text-red-600 hover:text-red-700"
              >
                <XCircle className="h-4 w-4 mr-2" />
                拒绝
              </Button>
              <Button
                variant="outline"
                onClick={() => handleNeedSupplement(selectedReport.id)}
              >
                <FileText className="h-4 w-4 mr-2" />
                要求补充材料
              </Button>
              <Button onClick={() => handleApprove(selectedReport.id)}>
                <CheckCircle className="h-4 w-4 mr-2" />
                通过
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
