import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Search, Plus, Edit, Trash2, Package, Coins } from "lucide-react";
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

type ProductStatus = "active" | "inactive";
type PointsType = "none" | "partial" | "full";

type Product = {
  id: number;
  name: string;
  category: string;
  tag: string;
  price: number;
  stock: number;
  status: ProductStatus;
  image: string;
  description: string;
  pointsType: PointsType;
  pointsValue: number;
  maxPointsAmount: number;
};

type ProductForm = Omit<Product, "id">;

const unifiedTagMap: Record<string, string> = {
  color_mfp: "彩色多功能",
  office: "办公场景",
  mid_volume: "中等负载",
  workgroup: "工作组",
  high_volume: "高负载",
  smart: "智能办公",
  security: "安全管控",
  energy_saving: "节能低碳",
  premium: "高端方案",
  production: "生产级输出",
  enterprise: "企业级部署",
};
const unifiedTagKeys = Object.keys(unifiedTagMap);

const mockProducts: Product[] = [
  {
    id: 1,
    name: "RICOH MP C3004 彩色多功能复合机",
    category: "打印设备",
    tag: "office",
    price: 15999,
    stock: 48,
    status: "active",
    image: "/images/ricoh/ricoh-local-01.png",
    description: "A3 彩色多功能设备，适合中小企业。",
    pointsType: "partial",
    pointsValue: 30,
    maxPointsAmount: 5000,
  },
  {
    id: 2,
    name: "RICOH SP 330DN 黑白激光打印机",
    category: "打印设备",
    tag: "smart",
    price: 2899,
    stock: 156,
    status: "active",
    image: "/images/ricoh/ricoh-local-02.png",
    description: "32 页/分钟，适合日常办公。",
    pointsType: "full",
    pointsValue: 100,
    maxPointsAmount: 2899,
  },
  {
    id: 3,
    name: "理光原装碳粉盒 MP C3004",
    category: "打印耗材",
    tag: "production",
    price: 899,
    stock: 0,
    status: "inactive",
    image: "/images/ricoh/ricoh-local-03.png",
    description: "原装碳粉盒，打印量约 5000 页。",
    pointsType: "none",
    pointsValue: 0,
    maxPointsAmount: 0,
  },
];

const defaultForm: ProductForm = {
  name: "",
  category: "打印设备",
  tag: "office",
  price: 0,
  stock: 0,
  status: "active",
  image: "",
  description: "",
  pointsType: "none",
  pointsValue: 0,
  maxPointsAmount: 0,
};

export default function ProductManagement() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<ProductForm>(defaultForm);

  const filteredProducts = useMemo(
    () => products.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase())),
    [products, searchTerm],
  );

  const activeCount = products.filter((p) => p.status === "active").length;
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
  const pointsCount = products.filter((p) => p.pointsType !== "none").length;

  const openAdd = () => {
    setEditingId(null);
    setForm(defaultForm);
    setDialogOpen(true);
  };

  const openEdit = (product: Product) => {
    setEditingId(product.id);
    setForm({ ...product, id: undefined } as ProductForm);
    setDialogOpen(true);
  };

  const saveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    if (editingId === null) {
      const newProduct: Product = { ...form, id: Date.now() };
      setProducts((prev) => [newProduct, ...prev]);
    } else {
      setProducts((prev) => prev.map((p) => (p.id === editingId ? { ...p, ...form } : p)));
    }
    setDialogOpen(false);
  };

  const deleteProduct = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const toggleStatus = (id: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: p.status === "active" ? "inactive" : "active" } : p)),
    );
  };

  const getPointsTypeLabel = (type: PointsType) => {
    if (type === "partial") return "部分积分抵扣";
    if (type === "full") return "全额积分抵扣";
    return "不可积分抵扣";
  };
  const getTagLabel = (tag: string) => unifiedTagMap[tag] || tag || "-";

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">总商品数</CardTitle>
            <Package className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">{products.length}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">在售商品</CardTitle>
            <Package className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">{activeCount}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">总库存</CardTitle>
            <Package className="h-5 w-5 text-purple-600" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">{totalStock}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">积分商品</CardTitle>
            <Coins className="h-5 w-5 text-orange-600" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">{pointsCount}</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>商品列表</CardTitle>
            <Button onClick={openAdd}><Plus className="h-4 w-4 mr-2" />添加商品</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="搜索商品名称..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-square bg-gray-100 relative">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    <div className="absolute top-2 right-2 flex gap-2">
                      {product.stock === 0 && <Badge variant="destructive">缺货</Badge>}
                      {product.tag && <Badge variant="outline" className="bg-white">{getTagLabel(product.tag)}</Badge>}
                    </div>
                  </div>
                  <CardContent className="p-4 space-y-3">
                    <div>
                      <h3 className="font-semibold mb-1">{product.name}</h3>
                      <p className="text-sm text-gray-600">{product.category}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-bold text-blue-600">¥{product.price}</p>
                      <p className={`text-lg font-bold ${product.stock === 0 ? "text-red-600" : "text-green-600"}`}>{product.stock}</p>
                    </div>
                    <div className="rounded-lg border bg-orange-50 p-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Coins className="h-4 w-4 text-orange-600" />
                        <Badge variant="outline">{getPointsTypeLabel(product.pointsType)}</Badge>
                      </div>
                      {product.pointsType === "partial" && (
                        <p className="mt-1 text-xs text-gray-600">
                          最高抵扣 {product.maxPointsAmount} 积分（{product.pointsValue}%）
                        </p>
                      )}
                      {product.pointsType === "full" && (
                        <p className="mt-1 text-xs text-gray-600">
                          全额兑换需要 {product.maxPointsAmount} 积分
                        </p>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge variant={product.status === "active" ? "default" : "secondary"}>{product.status === "active" ? "已上架" : "已下架"}</Badge>
                      <Button variant="outline" size="sm" onClick={() => toggleStatus(product.id)}>{product.status === "active" ? "下架" : "上架"}</Button>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1" onClick={() => openEdit(product)}><Edit className="h-4 w-4 mr-2" />编辑</Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700" onClick={() => deleteProduct(product.id)}><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingId ? "编辑商品" : "添加商品"}</DialogTitle>
            <DialogDescription>配置商品基础信息、Tag、库存与积分规则。</DialogDescription>
          </DialogHeader>

          <form onSubmit={saveProduct} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="productName">商品名称</Label>
              <Input id="productName" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="请输入商品名称" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">分类</Label>
                <Select value={form.category} onValueChange={(value) => setForm((f) => ({ ...f, category: value }))}>
                  <SelectTrigger><SelectValue placeholder="选择分类" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="打印设备">打印设备</SelectItem>
                    <SelectItem value="打印耗材">打印耗材</SelectItem>
                    <SelectItem value="办公用品">办公用品</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">价格</Label>
                <Input id="price" type="number" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: Number(e.target.value || 0) }))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="productTag">商品Tag</Label>
                <Select value={form.tag} onValueChange={(value) => setForm((f) => ({ ...f, tag: value }))}>
                  <SelectTrigger id="productTag">
                    <SelectValue placeholder="选择标签" />
                  </SelectTrigger>
                  <SelectContent>
                    {unifiedTagKeys.map((tagKey) => (
                      <SelectItem key={tagKey} value={tagKey}>{unifiedTagMap[tagKey]}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="stock">库存</Label>
                <Input id="stock" type="number" value={form.stock} onChange={(e) => setForm((f) => ({ ...f, stock: Number(e.target.value || 0) }))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">状态</Label>
                <Select value={form.status} onValueChange={(value: ProductStatus) => setForm((f) => ({ ...f, status: value }))}>
                  <SelectTrigger><SelectValue placeholder="选择状态" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">上架</SelectItem>
                    <SelectItem value="inactive">下架</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="border-t pt-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pointsType">积分类型</Label>
                <Select value={form.pointsType} onValueChange={(value: PointsType) => setForm((f) => ({ ...f, pointsType: value }))}>
                  <SelectTrigger><SelectValue placeholder="选择积分类型" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">不支持积分抵扣</SelectItem>
                    <SelectItem value="partial">部分积分抵扣</SelectItem>
                    <SelectItem value="full">全额积分兑换</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500">
                  `不可积分抵扣`：只能现金购买；
                  `部分积分抵扣`：按比例+上限抵扣；
                  `全额积分抵扣`：仅使用积分兑换。
                </p>
              </div>
              {form.pointsType === "partial" && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pointsValue">抵扣比例 (%)</Label>
                    <Input id="pointsValue" type="number" min="1" max="100" value={form.pointsValue} onChange={(e) => setForm((f) => ({ ...f, pointsValue: Number(e.target.value || 0) }))} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxPointsAmount">最高抵扣积分</Label>
                    <Input id="maxPointsAmount" type="number" min="1" value={form.maxPointsAmount} onChange={(e) => setForm((f) => ({ ...f, maxPointsAmount: Number(e.target.value || 0) }))} />
                  </div>
                </div>
              )}
              {form.pointsType === "full" && (
                <div className="space-y-2">
                  <Label htmlFor="fullPointsAmount">兑换所需积分</Label>
                  <Input id="fullPointsAmount" type="number" min="1" value={form.maxPointsAmount} onChange={(e) => setForm((f) => ({ ...f, maxPointsAmount: Number(e.target.value || 0) }))} />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">商品图片 URL</Label>
              <Input id="image" value={form.image} onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))} placeholder="请输入图片 URL" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">商品描述</Label>
              <Textarea id="description" rows={4} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} placeholder="请输入商品描述" />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>取消</Button>
              <Button type="submit">保存</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
