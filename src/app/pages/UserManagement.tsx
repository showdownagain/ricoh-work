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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import { Search, Plus, Edit, Trash2, Ban, Power } from "lucide-react";
import { Switch } from "../components/ui/switch";

interface User {
  id: number;
  name: string;
  role: string;
  status: "active" | "inactive";
  createTime: string;
  hasBackendAccess: boolean;
  companyName?: string;
  department?: string;
  employeeId?: string;
  email?: string;
  phone?: string;
}

const mockUsers: User[] = [
  {
    id: 1,
    name: "张三",
    employeeId: "EMP001",
    role: "管理员",
    status: "active",
    createTime: "2024-01-15",
    hasBackendAccess: true,
    department: "技术部",
  },
  {
    id: 2,
    name: "李四",
    employeeId: "EMP002",
    role: "编辑",
    status: "active",
    createTime: "2024-02-20",
    hasBackendAccess: true,
    department: "运营部",
  },
  {
    id: 3,
    name: "王五",
    email: "wangwu@example.com",
    phone: "13800138000",
    role: "查看者",
    status: "inactive",
    createTime: "2024-03-10",
    hasBackendAccess: false,
    companyName: "上海XX科技有限公司",
  },
  {
    id: 4,
    name: "赵六",
    employeeId: "EMP003",
    role: "编辑",
    status: "active",
    createTime: "2024-04-05",
    hasBackendAccess: true,
    department: "市场部",
  },
  {
    id: 5,
    name: "钱七",
    email: "qianqi@example.com",
    role: "查看者",
    status: "active",
    createTime: "2024-05-12",
    hasBackendAccess: false,
    companyName: "北京YY集团有限公司",
  },
];

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [userTab, setUserTab] = useState<"frontend" | "backend">("frontend");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [hasBackendAccess, setHasBackendAccess] = useState(false);

  const normalizedSearch = searchTerm.trim().toLowerCase();
  const filteredUsers = users.filter((user) => {
    const searchTargets = [
      user.name,
      user.email || "",
      user.phone || "",
      user.employeeId || "",
      user.companyName || "",
      user.department || "",
    ];
    return searchTargets.some((value) => value.toLowerCase().includes(normalizedSearch));
  });

  const frontendUsers = filteredUsers.filter((user) => !user.hasBackendAccess);
  const backendUsers = filteredUsers.filter((user) => user.hasBackendAccess);

  const handleAddUser = () => {
    setEditingUser(null);
    setHasBackendAccess(false);
    setDialogOpen(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setHasBackendAccess(user.hasBackendAccess);
    setDialogOpen(true);
  };

  const handleToggleStatus = (id: number) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? { ...user, status: user.status === "active" ? "inactive" : "active" }
          : user,
      ),
    );
  };

  const handleDeleteUser = (id: number) => {
    if (window.confirm("确定要删除该用户吗？")) {
      setUsers((prev) => prev.filter((user) => user.id !== id));
    }
  };

  const handleSaveUser = (e: React.FormEvent) => {
    e.preventDefault();
    setDialogOpen(false);
  };

  const renderUsersTable = (list: User[]) => (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>姓名</TableHead>
            <TableHead>联系方式</TableHead>
            <TableHead>用户类型</TableHead>
            <TableHead>所属单位</TableHead>
            <TableHead>角色</TableHead>
            <TableHead>状态</TableHead>
            <TableHead>创建时间</TableHead>
            <TableHead className="text-center">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {list.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>
                {user.hasBackendAccess ? (
                  <span className="text-sm text-gray-600">员工号: {user.employeeId || "-"}</span>
                ) : (
                  <div className="text-sm text-gray-600 space-y-1">
                    {user.email && <div>邮箱 {user.email}</div>}
                    {user.phone && <div>手机 {user.phone}</div>}
                    {!user.email && !user.phone && "-"}
                  </div>
                )}
              </TableCell>
              <TableCell>
                <Badge variant={user.hasBackendAccess ? "default" : "outline"}>
                  {user.hasBackendAccess ? "管理用户" : "portal用户"}
                </Badge>
              </TableCell>
              <TableCell>
                <span className="text-sm text-gray-600">
                  {user.hasBackendAccess ? user.department || "-" : user.companyName || "-"}
                </span>
              </TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Badge variant={user.status === "active" ? "default" : "secondary"}>
                  {user.status === "active" ? "已启用" : "已停用"}
                </Badge>
              </TableCell>
              <TableCell>{user.createTime}</TableCell>
              <TableCell className="text-center">
                <div className="flex items-center justify-center gap-2">
                  <Button variant="ghost" size="sm" onClick={() => handleEditUser(user)}>
                    <Edit className="h-4 w-4 mr-1" />编辑
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleToggleStatus(user.id)}
                    className={
                      user.status === "active"
                        ? "text-orange-600 hover:text-orange-700"
                        : "text-green-600 hover:text-green-700"
                    }
                  >
                    {user.status === "active" ? (
                      <>
                        <Ban className="h-4 w-4 mr-1" />停用
                      </>
                    ) : (
                      <>
                        <Power className="h-4 w-4 mr-1" />启用
                      </>
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteUser(user.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />删除
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>用户列表</CardTitle>
            <Button onClick={handleAddUser}>
              <Plus className="h-4 w-4 mr-2" />添加用户
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={userTab} onValueChange={(value) => setUserTab(value as "frontend" | "backend")} className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="frontend">portal用户 ({frontendUsers.length})</TabsTrigger>
              <TabsTrigger value="backend">管理用户 ({backendUsers.length})</TabsTrigger>
            </TabsList>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="搜索姓名/邮箱/手机号/员工号/公司/部门..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <TabsContent value="frontend" className="space-y-3">
              {renderUsersTable(frontendUsers)}
            </TabsContent>
            <TabsContent value="backend" className="space-y-3">
              {renderUsersTable(backendUsers)}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingUser ? "编辑用户" : "添加用户"}</DialogTitle>
            <DialogDescription>
              {editingUser ? "修改用户信息并保存更新" : "填写用户信息创建新账号"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveUser}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">姓名 *</Label>
                <Input id="name" defaultValue={editingUser?.name} placeholder="请输入姓名" required />
              </div>

              <div className="flex items-center justify-between space-y-0 rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label htmlFor="backend-access" className="text-base">
                    开通管理后台
                  </Label>
                  <p className="text-sm text-gray-500">开通后可访问后台，否则仅可访问前台页面</p>
                </div>
                <Switch id="backend-access" checked={hasBackendAccess} onCheckedChange={setHasBackendAccess} />
              </div>

              {hasBackendAccess && (
                <div className="space-y-2">
                  <Label htmlFor="employeeId">员工号 *</Label>
                  <Input
                    id="employeeId"
                    defaultValue={editingUser?.employeeId}
                    placeholder="例如：EMP001"
                    required
                  />
                </div>
              )}

              {!hasBackendAccess && (
                <div className="space-y-4 rounded-lg border p-4 bg-gray-50">
                  <div className="space-y-2">
                    <Label htmlFor="email">邮箱</Label>
                    <Input id="email" type="email" defaultValue={editingUser?.email} placeholder="example@company.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">手机号</Label>
                    <Input id="phone" type="tel" defaultValue={editingUser?.phone} placeholder="13800138000" />
                  </div>
                </div>
              )}

              {!hasBackendAccess && (
                <div className="space-y-2">
                  <Label htmlFor="companyName">所属公司 *</Label>
                  <Input id="companyName" defaultValue={editingUser?.companyName} placeholder="请输入所属公司" required />
                </div>
              )}

              {hasBackendAccess && (
                <div className="space-y-2">
                  <Label htmlFor="department">所属部门 *</Label>
                  <Input id="department" defaultValue={editingUser?.department} placeholder="请输入所属部门" required />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="role">角色 *</Label>
                <Select defaultValue={editingUser?.role || "查看者"}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择角色" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="管理员">管理员</SelectItem>
                    <SelectItem value="编辑">编辑</SelectItem>
                    <SelectItem value="查看者">查看者</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">状态 *</Label>
                <Select defaultValue={editingUser?.status || "active"}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择状态" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">已启用</SelectItem>
                    <SelectItem value="inactive">已停用</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                取消
              </Button>
              <Button type="submit">保存</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
