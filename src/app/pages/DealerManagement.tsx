import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Label } from "../components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Search, Plus, Edit, Trash2 } from "lucide-react";
import { Switch } from "../components/ui/switch";

type DealerStatus = "active" | "inactive";
type RegistrationStatus = "registered" | "pending_registration" | "pending_review";

interface PrimaryDealer {
  id: string;
  name: string;
  region: string;
}

interface SecondaryDealer {
  id: number;
  name: string;
  region: string;
  taxNo: string;
  businessLicenseNo: string;
  businessLicenseFile: string;
  primaryDealerId: string;
  contact: string;
  phone: string;
  status: DealerStatus;
  registrationStatus: RegistrationStatus;
  createTime: string;
}

const primaryDealers: PrimaryDealer[] = [
  { id: "p1", name: "华东一级经销商A", region: "华东" },
  { id: "p2", name: "华北一级经销商B", region: "华北" },
  { id: "p3", name: "华南一级经销商C", region: "华南" },
];

const initialSecondaryDealers: SecondaryDealer[] = [
  {
    id: 1,
    name: "上海星联办公设备有限公司",
    region: "华东",
    taxNo: "91310101MA1ABC1234",
    businessLicenseNo: "LIC-SH-2024-001",
    businessLicenseFile: "https://example.com/licenses/sh-001.jpg",
    primaryDealerId: "p1",
    contact: "王经理",
    phone: "13800001111",
    status: "active",
    registrationStatus: "registered",
    createTime: "2025-12-10 10:00",
  },
  {
    id: 2,
    name: "北京宏达办公科技有限公司",
    region: "华北",
    taxNo: "91110108MA7XYZ8888",
    businessLicenseNo: "LIC-BJ-2024-007",
    businessLicenseFile: "https://example.com/licenses/bj-007.jpg",
    primaryDealerId: "p2",
    contact: "李经理",
    phone: "13900002222",
    status: "active",
    registrationStatus: "pending_review",
    createTime: "2025-12-22 15:30",
  },
  {
    id: 3,
    name: "深圳信达办公服务有限公司",
    region: "华南",
    taxNo: "91440300MA5AAAA222",
    businessLicenseNo: "LIC-SZ-2025-013",
    businessLicenseFile: "https://example.com/licenses/sz-013.jpg",
    primaryDealerId: "p3",
    contact: "陈经理",
    phone: "13600005555",
    status: "inactive",
    registrationStatus: "pending_registration",
    createTime: "2026-01-08 14:20",
  },
];

const now = () =>
  new Date().toLocaleString("zh-CN", {
    hour12: false,
  });

export default function DealerManagement() {
  const [dealers, setDealers] = useState<SecondaryDealer[]>(initialSecondaryDealers);
  const [searchTerm, setSearchTerm] = useState("");
  const [dealerDialogOpen, setDealerDialogOpen] = useState(false);
  const [editingDealer, setEditingDealer] = useState<SecondaryDealer | null>(null);

  const [dealerForm, setDealerForm] = useState({
    name: "",
    region: "华东",
    taxNo: "",
    businessLicenseNo: "",
    businessLicenseFile: "",
    primaryDealerId: "",
    contact: "",
    phone: "",
    status: true,
    registrationStatus: "pending_registration" as RegistrationStatus,
  });

  const filteredDealers = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();
    if (!keyword) return dealers;
    return dealers.filter((dealer) =>
      [dealer.name, dealer.taxNo, dealer.businessLicenseNo, dealer.contact, dealer.phone]
        .join(" ")
        .toLowerCase()
        .includes(keyword),
    );
  }, [dealers, searchTerm]);

  const getPrimaryDealerName = (id?: string) =>
    primaryDealers.find((dealer) => dealer.id === id)?.name || "-";

  const resetDealerForm = () => {
    setDealerForm({
      name: "",
      region: "华东",
      taxNo: "",
      businessLicenseNo: "",
      businessLicenseFile: "",
      primaryDealerId: "",
      contact: "",
      phone: "",
      status: true,
      registrationStatus: "pending_registration",
    });
    setEditingDealer(null);
  };

  const handleOpenAddDealer = () => {
    resetDealerForm();
    setDealerDialogOpen(true);
  };

  const handleOpenEditDealer = (dealer: SecondaryDealer) => {
    setEditingDealer(dealer);
    setDealerForm({
      name: dealer.name,
      region: dealer.region,
      taxNo: dealer.taxNo,
      businessLicenseNo: dealer.businessLicenseNo,
      businessLicenseFile: dealer.businessLicenseFile,
      primaryDealerId: dealer.primaryDealerId,
      contact: dealer.contact,
      phone: dealer.phone,
      status: dealer.status === "active",
      registrationStatus: dealer.registrationStatus,
    });
    setDealerDialogOpen(true);
  };

  const handleSaveDealer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dealerForm.taxNo || !dealerForm.businessLicenseNo || !dealerForm.businessLicenseFile) {
      alert("新增/编辑经销商时，营业执照配置（执照号+文件）和税务登记号为必填");
      return;
    }
    if (!dealerForm.primaryDealerId) {
      alert("请关联一级经销商");
      return;
    }

    if (editingDealer) {
      setDealers((prev) =>
        prev.map((item) =>
          item.id === editingDealer.id
            ? {
                ...item,
                ...dealerForm,
                status: dealerForm.status ? "active" : "inactive",
              }
            : item,
        ),
      );
    } else {
      const nextId = dealers.length > 0 ? Math.max(...dealers.map((item) => item.id)) + 1 : 1;
      setDealers((prev) => [
        {
          id: nextId,
          ...dealerForm,
          status: dealerForm.status ? "active" : "inactive",
          createTime: now(),
        },
        ...prev,
      ]);
    }

    setDealerDialogOpen(false);
    resetDealerForm();
  };

  const handleDeleteDealer = (id: number) => {
    if (!window.confirm("确认删除该二级经销商吗？")) return;
    setDealers((prev) => prev.filter((item) => item.id !== id));
  };

  const renderRegistrationBadge = (status: RegistrationStatus) => {
    if (status === "registered") {
      return <Badge className="bg-green-600">已注册</Badge>;
    }
    if (status === "pending_review") {
      return <Badge variant="secondary">待审核</Badge>;
    }
    return <Badge variant="outline">待注册</Badge>;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>二级经销商列表</CardTitle>
            <Button onClick={handleOpenAddDealer}>
              <Plus className="h-4 w-4 mr-2" />
              新增二级经销商
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="搜索经销商名称/税务登记号/营业执照号/联系人..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>名称</TableHead>
                  <TableHead>税务登记号</TableHead>
                  <TableHead>营业执照配置</TableHead>
                  <TableHead>关联一级经销商</TableHead>
                  <TableHead>注册状态</TableHead>
                  <TableHead>启用状态</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDealers.map((dealer) => (
                  <TableRow key={dealer.id}>
                    <TableCell>{dealer.name}</TableCell>
                    <TableCell className="font-mono text-xs">{dealer.taxNo}</TableCell>
                    <TableCell>
                      <div className="text-sm">{dealer.businessLicenseNo}</div>
                      <div className="text-xs text-gray-500 truncate max-w-[240px]">{dealer.businessLicenseFile}</div>
                    </TableCell>
                    <TableCell>{getPrimaryDealerName(dealer.primaryDealerId)}</TableCell>
                    <TableCell>{renderRegistrationBadge(dealer.registrationStatus)}</TableCell>
                    <TableCell>
                      <Badge variant={dealer.status === "active" ? "default" : "secondary"}>
                        {dealer.status === "active" ? "启用" : "停用"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleOpenEditDealer(dealer)}>
                          <Edit className="h-4 w-4 mr-1" />编辑
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700" onClick={() => handleDeleteDealer(dealer.id)}>
                          <Trash2 className="h-4 w-4 mr-1" />删除
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={dealerDialogOpen} onOpenChange={setDealerDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingDealer ? "编辑二级经销商" : "新增二级经销商"}</DialogTitle>
            <DialogDescription>新增时必须完成营业执照配置并关联一级经销商</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveDealer} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>经销商名称</Label>
                <Input value={dealerForm.name} onChange={(e) => setDealerForm({ ...dealerForm, name: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label>区域</Label>
                <Select value={dealerForm.region} onValueChange={(value) => setDealerForm({ ...dealerForm, region: value })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="华东">华东</SelectItem>
                    <SelectItem value="华北">华北</SelectItem>
                    <SelectItem value="华南">华南</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>税务登记号 *</Label>
                <Input value={dealerForm.taxNo} onChange={(e) => setDealerForm({ ...dealerForm, taxNo: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label>营业执照号 *</Label>
                <Input value={dealerForm.businessLicenseNo} onChange={(e) => setDealerForm({ ...dealerForm, businessLicenseNo: e.target.value })} required />
              </div>
            </div>
            <div className="space-y-2">
              <Label>营业执照文件URL *</Label>
              <Input value={dealerForm.businessLicenseFile} onChange={(e) => setDealerForm({ ...dealerForm, businessLicenseFile: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label>关联一级经销商 *</Label>
              <Select value={dealerForm.primaryDealerId} onValueChange={(value) => setDealerForm({ ...dealerForm, primaryDealerId: value })}>
                <SelectTrigger><SelectValue placeholder="请选择一级经销商" /></SelectTrigger>
                <SelectContent>
                  {primaryDealers.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.name}（{item.region}）
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>注册状态</Label>
              <Select
                value={dealerForm.registrationStatus}
                onValueChange={(value) => setDealerForm({ ...dealerForm, registrationStatus: value as RegistrationStatus })}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="registered">已注册</SelectItem>
                  <SelectItem value="pending_registration">待注册</SelectItem>
                  <SelectItem value="pending_review">待审核</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>联系人</Label>
                <Input value={dealerForm.contact} onChange={(e) => setDealerForm({ ...dealerForm, contact: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>联系电话</Label>
                <Input value={dealerForm.phone} onChange={(e) => setDealerForm({ ...dealerForm, phone: e.target.value })} />
              </div>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div>
                <Label className="text-sm font-medium">启用状态</Label>
                <p className="text-xs text-gray-500">停用后不参与业务处理</p>
              </div>
              <Switch checked={dealerForm.status} onCheckedChange={(checked) => setDealerForm({ ...dealerForm, status: checked })} />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDealerDialogOpen(false)}>取消</Button>
              <Button type="submit">保存</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
