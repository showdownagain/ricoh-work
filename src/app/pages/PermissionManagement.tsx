import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Search, Plus, Edit, Trash2, Users, Shield } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

// 管理后台路由
const adminRoutes = [
  { path: "/", name: "仪表盘", description: "系统概览和数据统计", module: "dashboard" },
  { path: "/users", name: "用户管理", description: "管理系统用户账户", module: "users" },
  { path: "/reports", name: "报备管理", description: "处理经销商报备申请", module: "reports" },
  { path: "/permissions", name: "权限管理", description: "配置角色和权限", module: "permissions" },
  { path: "/content", name: "内容管理", description: "管理文章和媒体资源", module: "content" },
  { path: "/products", name: "商品管理", description: "管理理光产品信息", module: "products" },
];

// 前台页面路由（示例）
const frontendRoutes = [
  { path: "/home", name: "首页", description: "网站首页展示", module: "home" },
  { path: "/products", name: "产品展示", description: "展示理光产品目录", module: "products_display" },
  { path: "/solutions", name: "解决方案", description: "行业解决方案介绍", module: "solutions" },
  { path: "/services", name: "服务支持", description: "技术支持和服务", module: "services" },
  { path: "/about", name: "关于我们", description: "公司介绍和联系方式", module: "about" },
  { path: "/news", name: "新闻中心", description: "公司动态和行业资讯", module: "news" },
  { path: "/contact", name: "联系我们", description: "在线咨询和联系表单", module: "contact" },
];

const mockRoles = [
  {
    id: 1,
    name: "超级管理员",
    description: "拥有所有权限",
    userCount: 3,
    permissions: ["用户管理", "报备管理", "权限管理", "内容管理", "商品管理"],
  },
  {
    id: 2,
    name: "管理员",
    description: "拥有大部分管理权限",
    userCount: 8,
    permissions: ["用户管理", "报备管理", "内容管理", "商品管理"],
  },
  {
    id: 3,
    name: "编辑",
    description: "可以编辑内容和商品",
    userCount: 25,
    permissions: ["内容管理", "商品管理"],
  },
  {
    id: 4,
    name: "审核员",
    description: "负责报备审核",
    userCount: 12,
    permissions: ["报备管理"],
  },
  {
    id: 5,
    name: "查看者",
    description: "只能查看数据",
    userCount: 50,
    permissions: [],
  },
];

const allPermissions = [
  { id: "user", name: "用户管理", description: "管理系统用户", type: "admin", path: "/users", module: "users", createTime: "2024-01-10" },
  { id: "report", name: "报备管理", description: "处理报备申请", type: "admin", path: "/reports", module: "reports", createTime: "2024-01-10" },
  { id: "permission", name: "权限管理", description: "配置角色权限", type: "admin", path: "/permissions", module: "permissions", createTime: "2024-01-10" },
  { id: "content", name: "内容管理", description: "管理内容资源", type: "admin", path: "/content", module: "content", createTime: "2024-01-10" },
  { id: "product", name: "商品管理", description: "管理商品信息", type: "admin", path: "/products", module: "products", createTime: "2024-01-10" },
  { id: "home", name: "首页访问", description: "访问网站首页", type: "frontend", path: "/home", module: "home", createTime: "2024-01-15" },
  { id: "solutions", name: "解决方案", description: "查看行业解决方案", type: "frontend", path: "/solutions", module: "solutions", createTime: "2024-01-15" },
];

type Role = (typeof mockRoles)[number];
type PermissionItem = (typeof allPermissions)[number];

export default function PermissionManagement() {
  const [roles, setRoles] = useState(mockRoles);
  const [permissions, setPermissions] = useState(allPermissions);
  const [searchTerm, setSearchTerm] = useState("");
  const [permissionSearchTerm, setPermissionSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [permissionDialogOpen, setPermissionDialogOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [editingPermission, setEditingPermission] = useState<PermissionItem | null>(null);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [selectedRouteType, setSelectedRouteType] = useState<string>("admin");
  const [selectedRoute, setSelectedRoute] = useState<string>("");

  const filteredRoles = roles.filter((role) =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPermissions = permissions.filter((perm) =>
    perm.name.toLowerCase().includes(permissionSearchTerm.toLowerCase()) ||
    perm.description.toLowerCase().includes(permissionSearchTerm.toLowerCase())
  );

  const handleAddRole = () => {
    setEditingRole(null);
    setSelectedPermissions([]);
    setDialogOpen(true);
  };

  const handleEditRole = (role: Role) => {
    setEditingRole(role);
    setSelectedPermissions(role.permissions);
    setDialogOpen(true);
  };

  const handleDeleteRole = (id: number) => {
    setRoles(roles.filter((role) => role.id !== id));
  };

  const handleSaveRole = (e: React.FormEvent) => {
    e.preventDefault();
    setDialogOpen(false);
  };

  const togglePermission = (permissionName: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(permissionName)
        ? prev.filter((p) => p !== permissionName)
        : [...prev, permissionName]
    );
  };

  const handleAddPermission = () => {
    setEditingPermission(null);
    setPermissionDialogOpen(true);
  };

  const handleEditPermission = (permission: PermissionItem) => {
    setEditingPermission(permission);
    setPermissionDialogOpen(true);
  };

  const handleDeletePermission = (id: string) => {
    setPermissions(permissions.filter((perm) => perm.id !== id));
  };

  const handleSavePermission = (e: React.FormEvent) => {
    e.preventDefault();
    setPermissionDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>角色列表</CardTitle>
            <Button onClick={handleAddRole}>
              <Plus className="h-4 w-4 mr-2" />
              添加角色
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="搜索角色..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredRoles.map((role) => (
              <Card key={role.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{role.name}</CardTitle>
                      <p className="text-sm text-gray-600 mt-1">{role.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="h-4 w-4" />
                    <span>{role.userCount} 个用户</span>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium mb-2">权限</p>
                    <div className="flex flex-wrap gap-2">
                      {role.permissions.length > 0 ? (
                        role.permissions.map((permission) => (
                          <Badge key={permission} variant="secondary">
                            {permission}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-sm text-gray-500">无权限</span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditRole(role)}
                      className="flex-1"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      编辑
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteRole(role.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingRole ? "编辑角色" : "添加角色"}</DialogTitle>
            <DialogDescription>
              {editingRole ? "修改角色信息和权限配置" : "创建新角色并分配相应权限"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveRole}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="roleName">角色名称</Label>
                <Input
                  id="roleName"
                  defaultValue={editingRole?.name}
                  placeholder="请输入角色名称"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">描述</Label>
                <Textarea
                  id="description"
                  defaultValue={editingRole?.description}
                  placeholder="请输入角色描述"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label>权限配置</Label>
                <div className="border rounded-lg p-4 space-y-3">
                  {allPermissions.map((permission) => (
                    <div key={permission.id} className="flex items-start space-x-3">
                      <Checkbox
                        id={permission.id}
                        checked={selectedPermissions.includes(permission.name)}
                        onCheckedChange={() => togglePermission(permission.name)}
                      />
                      <div className="flex-1">
                        <label
                          htmlFor={permission.id}
                          className="text-sm font-medium leading-none cursor-pointer"
                        >
                          {permission.name}
                        </label>
                        <p className="text-sm text-gray-600 mt-1">
                          {permission.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
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

      <Dialog open={permissionDialogOpen} onOpenChange={setPermissionDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingPermission ? "编辑权限" : "添加权限"}</DialogTitle>
            <DialogDescription>
              {editingPermission ? "修改权限信息" : "创建新权限"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSavePermission}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="permissionName">权限名称</Label>
                <Input
                  id="permissionName"
                  defaultValue={editingPermission?.name}
                  placeholder="请输入权限名称"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="permissionDescription">描述</Label>
                <Textarea
                  id="permissionDescription"
                  defaultValue={editingPermission?.description}
                  placeholder="请输入权限描述"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label>类型</Label>
                <Select
                  value={selectedRouteType}
                  onValueChange={setSelectedRouteType}
                >
                  <SelectTrigger>
                    <SelectValue>{selectedRouteType}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">管理后台</SelectItem>
                    <SelectItem value="frontend">前台页面</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>路由</Label>
                <Select
                  value={selectedRoute}
                  onValueChange={setSelectedRoute}
                >
                  <SelectTrigger>
                    <SelectValue>{selectedRoute}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {selectedRouteType === "admin"
                      ? adminRoutes.map((route) => (
                          <SelectItem key={route.path} value={route.path}>
                            {route.name}
                          </SelectItem>
                        ))
                      : frontendRoutes.map((route) => (
                          <SelectItem key={route.path} value={route.path}>
                            {route.name}
                          </SelectItem>
                        ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setPermissionDialogOpen(false)}>
                取消
              </Button>
              <Button type="submit">保存</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>权限列表</CardTitle>
            <Button onClick={handleAddPermission}>
              <Plus className="h-4 w-4 mr-2" />
              添加权限
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="搜索权限..."
                value={permissionSearchTerm}
                onChange={(e) => setPermissionSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredPermissions.map((permission) => (
              <Card key={permission.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{permission.name}</CardTitle>
                      <p className="text-sm text-gray-600 mt-1">{permission.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Shield className="h-4 w-4" />
                    <span>{permission.type} 权限</span>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium mb-2">路由</p>
                    <div className="flex flex-wrap gap-2">
                      {permission.path ? (
                        <Badge key={permission.path} variant="secondary">
                          {permission.path}
                        </Badge>
                      ) : (
                        <span className="text-sm text-gray-500">无路由</span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditPermission(permission)}
                      className="flex-1"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      编辑
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeletePermission(permission.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
