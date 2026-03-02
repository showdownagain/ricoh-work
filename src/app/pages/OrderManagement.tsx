import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import {
  Search,
  Eye,
  FileText,
  Truck,
  DollarSign,
  Package,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  MapPin,
  Download,
  Edit,
  Upload,
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

type OrderStatus =
  | "pending_customer_sign"
  | "pending_merchant_sign"
  | "pending_payment"
  | "paid"
  | "shipped"
  | "completed"
  | "cancelled";

type ContractFlowStatus =
  | "not_required"
  | "pending_customer_sign"
  | "pending_merchant_sign"
  | "signed";

type OrderProduct = {
  sku: string;
  name: string;
  quantity: number;
  price: number;
};

type OrderItem = {
  id: number;
  orderNo: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  customerCity: string;
  dealerName: string;
  dealerContact: string;
  dealerPhone: string;
  products: OrderProduct[];
  totalAmount: number;
  status: OrderStatus;
  hasStock: boolean | null;
  stockConfirmTime: string;
  stockConfirmNote: string;
  paymentTime: string;
  shippingCompany: string;
  trackingNo: string;
  shippingTime: string;
  receivedTime: string;
  createTime: string;
  requiresContract: boolean;
  contractFlowStatus: ContractFlowStatus;
  contractCheckedTime: string;
  contractCustomerSignTime: string;
  contractMerchantSignTime: string;
  contractSignedTime: string;
  invoiceNo?: string;
  invoiceFileUrl?: string;
  invoiceUploadTime?: string;
  invoiceRemark?: string;
};

const now = () => new Date().toLocaleString("zh-CN");

const mockOrders: OrderItem[] = [
  {
    id: 1,
    orderNo: "ORD202402210001",
    customerName: "上海某科技有限公司",
    customerPhone: "021-6666****",
    customerAddress: "上海市浦东新区张江高科技园区",
    customerCity: "上海",
    dealerName: "上海理光经销商A",
    dealerContact: "张经理",
    dealerPhone: "021-8888-1234",
    products: [{ sku: "RICOH-MP-C3004", name: "RICOH MP C3004", quantity: 2, price: 15999 }],
    totalAmount: 31998,
    status: "completed",
    hasStock: true,
    stockConfirmTime: "2024-02-21 11:30",
    stockConfirmNote: "库存充足，可立即发货",
    paymentTime: "2024-02-21 14:20",
    shippingCompany: "顺丰",
    trackingNo: "SF1234567890",
    shippingTime: "2024-02-21 16:00",
    receivedTime: "2024-02-23 10:30",
    createTime: "2024-02-21 10:30",
    requiresContract: true,
    contractFlowStatus: "signed",
    contractCheckedTime: "2024-02-21 10:31",
    contractCustomerSignTime: "2024-02-21 10:45",
    contractMerchantSignTime: "2024-02-21 11:10",
    contractSignedTime: "2024-02-21 11:10",
  },
  {
    id: 2,
    orderNo: "ORD202402210002",
    customerName: "北京某集团有限公司",
    customerPhone: "010-8888****",
    customerAddress: "北京市海淀区中关村软件园",
    customerCity: "北京",
    dealerName: "北京理光经销商B",
    dealerContact: "王经理",
    dealerPhone: "010-6666-5678",
    products: [
      { sku: "RICOH-IM-C4500", name: "RICOH IM C4500", quantity: 1, price: 28999 },
      { sku: "RICOH-TONER-BK", name: "黑色墨粉", quantity: 4, price: 899 },
    ],
    totalAmount: 32595,
    status: "shipped",
    hasStock: true,
    stockConfirmTime: "2024-02-22 09:15",
    stockConfirmNote: "主机有货，配件齐全",
    paymentTime: "2024-02-22 15:30",
    shippingCompany: "德邦",
    trackingNo: "DB9876543210",
    shippingTime: "2024-02-23 08:30",
    receivedTime: "",
    createTime: "2024-02-22 08:45",
    requiresContract: true,
    contractFlowStatus: "signed",
    contractCheckedTime: "2024-02-22 08:46",
    contractCustomerSignTime: "2024-02-22 09:00",
    contractMerchantSignTime: "2024-02-22 09:08",
    contractSignedTime: "2024-02-22 09:08",
  },
  {
    id: 3,
    orderNo: "ORD202402220003",
    customerName: "广州某制造有限公司",
    customerPhone: "020-3333****",
    customerAddress: "广东省广州市天河区科韵路",
    customerCity: "广州",
    dealerName: "广州理光经销商C",
    dealerContact: "李经理",
    dealerPhone: "020-8888-9999",
    products: [{ sku: "RICOH-MP-C6004", name: "RICOH MP C6004", quantity: 1, price: 45999 }],
    totalAmount: 45999,
    status: "pending_payment",
    hasStock: true,
    stockConfirmTime: "2024-02-22 14:20",
    stockConfirmNote: "有现货，已预留",
    paymentTime: "",
    shippingCompany: "",
    trackingNo: "",
    shippingTime: "",
    receivedTime: "",
    createTime: "2024-02-22 13:45",
    requiresContract: false,
    contractFlowStatus: "not_required",
    contractCheckedTime: "2024-02-22 13:46",
    contractCustomerSignTime: "",
    contractMerchantSignTime: "",
    contractSignedTime: "",
  },
  {
    id: 4,
    orderNo: "ORD202402230004",
    customerName: "深圳某网络科技有限公司",
    customerPhone: "0755-8888****",
    customerAddress: "广东省深圳市南山区科技园",
    customerCity: "深圳",
    dealerName: "深圳理光经销商D",
    dealerContact: "赵经理",
    dealerPhone: "0755-2222-3333",
    products: [{ sku: "RICOH-IM-C2500", name: "RICOH IM C2500", quantity: 3, price: 12999 }],
    totalAmount: 38997,
    status: "pending_customer_sign",
    hasStock: null,
    stockConfirmTime: "",
    stockConfirmNote: "",
    paymentTime: "",
    shippingCompany: "",
    trackingNo: "",
    shippingTime: "",
    receivedTime: "",
    createTime: "2024-02-23 09:15",
    requiresContract: true,
    contractFlowStatus: "pending_customer_sign",
    contractCheckedTime: "2024-02-23 09:16",
    contractCustomerSignTime: "",
    contractMerchantSignTime: "",
    contractSignedTime: "",
  },
  {
    id: 5,
    orderNo: "ORD202402230005",
    customerName: "杭州某电子商务有限公司",
    customerPhone: "0571-6666****",
    customerAddress: "浙江省杭州市滨江区网商路",
    customerCity: "杭州",
    dealerName: "杭州理光经销商E",
    dealerContact: "周经理",
    dealerPhone: "0571-8888-7777",
    products: [{ sku: "RICOH-MP-C3504", name: "RICOH MP C3504", quantity: 2, price: 18999 }],
    totalAmount: 37998,
    status: "cancelled",
    hasStock: false,
    stockConfirmTime: "2024-02-23 10:45",
    stockConfirmNote: "该型号暂时缺货，预计3周后到货",
    paymentTime: "",
    shippingCompany: "",
    trackingNo: "",
    shippingTime: "",
    receivedTime: "",
    createTime: "2024-02-23 10:20",
    requiresContract: false,
    contractFlowStatus: "not_required",
    contractCheckedTime: "2024-02-23 10:21",
    contractCustomerSignTime: "",
    contractMerchantSignTime: "",
    contractSignedTime: "",
  },
  {
    id: 6,
    orderNo: "ORD202402240006",
    customerName: "成都某信息技术有限公司",
    customerPhone: "028-8888****",
    customerAddress: "四川省成都市高新区天府软件园",
    customerCity: "成都",
    dealerName: "成都理光经销商F",
    dealerContact: "陈经理",
    dealerPhone: "028-6666-5555",
    products: [{ sku: "RICOH-IM-C3000", name: "RICOH IM C3000", quantity: 1, price: 16999 }],
    totalAmount: 16999,
    status: "pending_merchant_sign",
    hasStock: null,
    stockConfirmTime: "",
    stockConfirmNote: "",
    paymentTime: "",
    shippingCompany: "",
    trackingNo: "",
    shippingTime: "",
    receivedTime: "",
    createTime: "2024-02-24 08:30",
    requiresContract: true,
    contractFlowStatus: "pending_merchant_sign",
    contractCheckedTime: "2024-02-24 08:31",
    contractCustomerSignTime: "2024-02-24 08:40",
    contractMerchantSignTime: "",
    contractSignedTime: "",
  },
  {
    id: 7,
    orderNo: "ORD202402250007",
    customerName: "南京某教育科技有限公司",
    customerPhone: "025-7777****",
    customerAddress: "江苏省南京市雨花台区软件大道",
    customerCity: "南京",
    dealerName: "南京理光经销商G",
    dealerContact: "孙经理",
    dealerPhone: "025-8888-6666",
    products: [{ sku: "RICOH-IM-C3500", name: "RICOH IM C3500", quantity: 1, price: 23999 }],
    totalAmount: 23999,
    status: "paid",
    hasStock: true,
    stockConfirmTime: "2024-02-25 09:20",
    stockConfirmNote: "库存已确认，等待仓库出库",
    paymentTime: "2024-02-25 10:05",
    shippingCompany: "",
    trackingNo: "",
    shippingTime: "",
    receivedTime: "",
    createTime: "2024-02-25 08:50",
    requiresContract: true,
    contractFlowStatus: "signed",
    contractCheckedTime: "2024-02-25 08:52",
    contractCustomerSignTime: "2024-02-25 09:00",
    contractMerchantSignTime: "2024-02-25 09:10",
    contractSignedTime: "2024-02-25 09:10",
  },
  {
    id: 8,
    orderNo: "ORD202402260008",
    customerName: "苏州某工业设备有限公司",
    customerPhone: "0512-6666****",
    customerAddress: "江苏省苏州市工业园区金鸡湖大道",
    customerCity: "苏州",
    dealerName: "苏州理光经销商H",
    dealerContact: "钱经理",
    dealerPhone: "0512-8888-2222",
    products: [{ sku: "RICOH-MP-C4504", name: "RICOH MP C4504", quantity: 1, price: 26999 }],
    totalAmount: 26999,
    status: "pending_payment",
    hasStock: null,
    stockConfirmTime: "",
    stockConfirmNote: "",
    paymentTime: "",
    shippingCompany: "",
    trackingNo: "",
    shippingTime: "",
    receivedTime: "",
    createTime: "2024-02-26 09:30",
    requiresContract: true,
    contractFlowStatus: "signed",
    contractCheckedTime: "2024-02-26 09:31",
    contractCustomerSignTime: "2024-02-26 09:40",
    contractMerchantSignTime: "2024-02-26 09:50",
    contractSignedTime: "2024-02-26 09:50",
  },
];

const orderStatusMap: Record<
  OrderStatus,
  { label: string; variant: "default" | "secondary" | "destructive" | "outline"; icon: LucideIcon }
> = {
  pending_customer_sign: { label: "待客户签署", variant: "outline", icon: FileText },
  pending_merchant_sign: { label: "待商家签署", variant: "outline", icon: Edit },
  pending_payment: { label: "待付款", variant: "default", icon: DollarSign },
  paid: { label: "已付款", variant: "secondary", icon: CheckCircle },
  shipped: { label: "已发货", variant: "default", icon: Truck },
  completed: { label: "已完成", variant: "secondary", icon: CheckCircle },
  cancelled: { label: "已取消", variant: "destructive", icon: XCircle },
};

const contractFlowLabelMap: Record<ContractFlowStatus, string> = {
  not_required: "无需合同",
  pending_customer_sign: "待客户签署",
  pending_merchant_sign: "待商家签署",
  signed: "已完成签署",
};

export default function OrderManagement() {
  const [orders, setOrders] = useState<OrderItem[]>(mockOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [detailDialog, setDetailDialog] = useState(false);
  const [shippingDialog, setShippingDialog] = useState(false);
  const [invoiceDialog, setInvoiceDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);
  const [shippingForm, setShippingForm] = useState({ shippingCompany: "", trackingNo: "" });
  const [invoiceForm, setInvoiceForm] = useState({ invoiceNo: "", invoiceFileUrl: "", remark: "" });

  const filteredOrders = orders.filter((order) => {
    const matchSearch =
      order.orderNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.dealerName.toLowerCase().includes(searchTerm.toLowerCase());
    return statusFilter === "all" ? matchSearch : matchSearch && order.status === statusFilter;
  });

  const handleViewOrder = (order: OrderItem) => {
    setSelectedOrder(order);
    setDetailDialog(true);
  };

  const handleCustomerSignedContract = (orderId: number) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status: "pending_merchant_sign",
              contractFlowStatus: "pending_merchant_sign",
              contractCustomerSignTime: now(),
            }
          : order,
      ),
    );
    setDetailDialog(false);
  };

  const handleMerchantSignedContract = (orderId: number) => {
    const signedAt = now();
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status: "pending_payment",
              contractFlowStatus: "signed",
              contractMerchantSignTime: signedAt,
              contractSignedTime: signedAt,
            }
          : order,
      ),
    );
    setDetailDialog(false);
  };

  const handleOpenShippingDialog = (order: OrderItem) => {
    setSelectedOrder(order);
    setShippingForm({ shippingCompany: order.shippingCompany || "", trackingNo: order.trackingNo || "" });
    setShippingDialog(true);
  };

  const handleSubmitShipping = () => {
    if (!selectedOrder) return;
    if (!shippingForm.shippingCompany || !shippingForm.trackingNo) {
      alert("请填写完整的物流信息");
      return;
    }
    setOrders((prev) =>
      prev.map((order) =>
        order.id === selectedOrder.id
          ? {
              ...order,
              status: "shipped",
              shippingCompany: shippingForm.shippingCompany,
              trackingNo: shippingForm.trackingNo,
              shippingTime: now(),
            }
          : order,
      ),
    );
    setShippingDialog(false);
    setDetailDialog(false);
  };

  const handleConfirmReceived = (orderId: number) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status: "completed",
              receivedTime: now(),
            }
          : order,
      ),
    );
    setDetailDialog(false);
  };

  const handleOpenInvoiceDialog = (order: OrderItem) => {
    setSelectedOrder(order);
    setInvoiceForm({
      invoiceNo: order.invoiceNo || "",
      invoiceFileUrl: order.invoiceFileUrl || "",
      remark: order.invoiceRemark || "",
    });
    setInvoiceDialog(true);
  };

  const handleSubmitInvoice = () => {
    if (!selectedOrder) return;
    if (!invoiceForm.invoiceNo.trim() || !invoiceForm.invoiceFileUrl.trim()) {
      alert("请填写发票号和电子发票文件");
      return;
    }
    const uploadedAt = now();
    setOrders((prev) =>
      prev.map((order) =>
        order.id === selectedOrder.id
          ? {
              ...order,
              invoiceNo: invoiceForm.invoiceNo.trim(),
              invoiceFileUrl: invoiceForm.invoiceFileUrl.trim(),
              invoiceRemark: invoiceForm.remark.trim(),
              invoiceUploadTime: uploadedAt,
            }
          : order,
      ),
    );
    setInvoiceDialog(false);
  };

  const handleViewInvoice = (order: OrderItem) => {
    if (!order.invoiceFileUrl) {
      alert("该订单暂未上传电子发票");
      return;
    }
    window.open(order.invoiceFileUrl, "_blank", "noopener,noreferrer");
  };

  const handleExportReport = () => {
    const reportData = filteredOrders.map((order) => ({
      "订单号": order.orderNo,
      "产品SKU": order.products.map((p) => p.sku).join("; "),
      "产品名称": order.products.map((p) => `${p.name} x${p.quantity}`).join("; "),
      "下单时间": order.createTime,
      "客户名称": order.customerName,
      "客户城市": order.customerCity,
      "经销商名称": order.dealerName,
      "经销商联系人": order.dealerContact,
      "经销商电话": order.dealerPhone,
      "物流公司": order.shippingCompany || "-",
      "物流单号": order.trackingNo || "-",
      "是否需要合同": order.requiresContract ? "是" : "否",
      "合同状态": contractFlowLabelMap[order.contractFlowStatus],
      "订单状态": orderStatusMap[order.status].label,
      "订单金额": `¥${order.totalAmount.toLocaleString()}`,
      "付款时间": order.paymentTime || "-",
      "发货时间": order.shippingTime || "-",
      "收货时间": order.receivedTime || "-",
    }));

    const headers = Object.keys(reportData[0] || {});
    const csvContent = [
      headers.join(","),
      ...reportData.map((row) => headers.map((header) => `"${row[header as keyof typeof row]}"`).join(",")),
    ].join("\n");

    const blob = new Blob(["\ufeff" + csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `订单报表_${new Date().toLocaleDateString()}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusCount = (status: string) => (status === "all" ? orders.length : orders.filter((o) => o.status === status).length);
  const getTotalAmount = (status?: string) => {
    const target = status ? orders.filter((o) => o.status === status) : orders;
    return target.reduce((sum, order) => sum + order.totalAmount, 0);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <div className="bg-blue-500 text-white rounded-full p-2">
              <AlertCircle className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">订单状态流转说明</h3>
              <p className="text-sm text-blue-800">
                订单状态与触发条件如下（按流转顺序）：
              </p>
              <ul className="text-sm text-blue-800 mt-2 space-y-1 list-disc list-inside">
                <li>待客户签署：创建订单 + 需要合同</li>
                <li>待商家签署：需要合同 + 客户签署</li>
                <li>待付款：无需合同 或 双签确认完成</li>
                <li>已付款：已上传付款凭证</li>
                <li>已发货：已填写物流单号</li>
                <li>已完成：已确认收货</li>
                <li>已取消：订单取消或缺货关闭</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-5">
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium text-gray-600">总订单</CardTitle><FileText className="h-5 w-5 text-blue-600" /></CardHeader><CardContent><div className="text-2xl font-bold">{orders.length}</div><p className="text-sm text-blue-600 font-semibold mt-1">¥{getTotalAmount().toLocaleString()}</p></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium text-gray-600">待签署</CardTitle><AlertCircle className="h-5 w-5 text-orange-600" /></CardHeader><CardContent><div className="text-2xl font-bold">{getStatusCount("pending_customer_sign") + getStatusCount("pending_merchant_sign")}</div></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium text-gray-600">待付款</CardTitle><DollarSign className="h-5 w-5 text-blue-600" /></CardHeader><CardContent><div className="text-2xl font-bold">{getStatusCount("pending_payment")}</div></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium text-gray-600">待发货</CardTitle><Package className="h-5 w-5 text-purple-600" /></CardHeader><CardContent><div className="text-2xl font-bold">{getStatusCount("paid")}</div></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium text-gray-600">已完成</CardTitle><CheckCircle className="h-5 w-5 text-green-600" /></CardHeader><CardContent><div className="text-2xl font-bold">{getStatusCount("completed")}</div></CardContent></Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>订单列表</CardTitle>
            <Button onClick={handleExportReport} variant="outline"><Download className="h-4 w-4 mr-2" />导出报表</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="搜索订单号/客户/经销商" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[220px]"><SelectValue placeholder="筛选状态" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部状态</SelectItem>
                  <SelectItem value="pending_customer_sign">待客户签署</SelectItem>
                  <SelectItem value="pending_merchant_sign">待商家签署</SelectItem>
                  <SelectItem value="pending_payment">待付款</SelectItem>
                  <SelectItem value="paid">已付款</SelectItem>
                  <SelectItem value="shipped">已发货</SelectItem>
                  <SelectItem value="completed">已完成</SelectItem>
                  <SelectItem value="cancelled">已取消</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>订单号</TableHead>
                    <TableHead>客户</TableHead>
                    <TableHead>经销商</TableHead>
                    <TableHead>金额</TableHead>
                    <TableHead>合同</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead>下单时间</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => {
                    const StatusIcon = orderStatusMap[order.status].icon;
                    return (
                      <TableRow key={order.id}>
                        <TableCell className="font-mono text-sm">{order.orderNo}</TableCell>
                        <TableCell><div className="font-medium">{order.customerName}</div><div className="text-xs text-gray-500 flex items-center gap-1"><MapPin className="h-3 w-3" />{order.customerCity}</div></TableCell>
                        <TableCell><div className="text-sm">{order.dealerName}</div><div className="text-xs text-gray-500">{order.dealerContact}</div></TableCell>
                        <TableCell className="font-semibold text-green-600">¥{order.totalAmount.toLocaleString()}</TableCell>
                        <TableCell><Badge variant={order.requiresContract ? "default" : "secondary"}>{order.requiresContract ? "需要合同" : "无需合同"}</Badge></TableCell>
                        <TableCell><Badge variant={orderStatusMap[order.status].variant} className="gap-1"><StatusIcon className="h-3 w-3" />{orderStatusMap[order.status].label}</Badge></TableCell>
                        <TableCell className="text-sm">{order.createTime}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm" onClick={() => handleViewOrder(order)}><Eye className="h-4 w-4 mr-2" />查看</Button>
                            <Button variant="ghost" size="sm" onClick={() => handleViewInvoice(order)}><FileText className="h-4 w-4 mr-2" />电子发票</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={detailDialog} onOpenChange={setDetailDialog}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>订单详情</DialogTitle><DialogDescription>查看订单完整信息并处理状态流转</DialogDescription></DialogHeader>
          {selectedOrder && (
            <div className="space-y-6 py-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div><p className="text-sm text-gray-600">当前状态</p><Badge variant={orderStatusMap[selectedOrder.status].variant}>{orderStatusMap[selectedOrder.status].label}</Badge></div>
                <div className="flex gap-3">
                  {selectedOrder.status === "pending_customer_sign" && <Button onClick={() => handleCustomerSignedContract(selectedOrder.id)}><FileText className="h-4 w-4 mr-2" />客户已签署</Button>}
                  {selectedOrder.status === "pending_merchant_sign" && <Button onClick={() => handleMerchantSignedContract(selectedOrder.id)}><Edit className="h-4 w-4 mr-2" />商家已签署</Button>}
                  {selectedOrder.status === "paid" && <Button onClick={() => handleOpenShippingDialog(selectedOrder)}><Truck className="h-4 w-4 mr-2" />填写物流</Button>}
                  {(selectedOrder.status === "paid" || selectedOrder.status === "shipped" || selectedOrder.status === "completed") && (
                    <Button variant="outline" onClick={() => handleOpenInvoiceDialog(selectedOrder)}><Upload className="h-4 w-4 mr-2" />上传电子发票</Button>
                  )}
                  {selectedOrder.status === "shipped" && <Button variant="outline" onClick={() => handleConfirmReceived(selectedOrder.id)}><CheckCircle className="h-4 w-4 mr-2" />模拟确认收货</Button>}
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div><p className="text-sm text-gray-600">订单号</p><p className="font-mono">{selectedOrder.orderNo}</p></div>
                <div><p className="text-sm text-gray-600">下单时间</p><p>{selectedOrder.createTime}</p></div>
                <div><p className="text-sm text-gray-600">订单金额</p><p className="text-green-600 font-semibold">¥{selectedOrder.totalAmount.toLocaleString()}</p></div>
                <div><p className="text-sm text-gray-600">合同状态</p><Badge variant={selectedOrder.requiresContract ? "default" : "secondary"}>{selectedOrder.requiresContract ? "需要合同" : "无需合同"}</Badge><p className="text-xs text-gray-500 mt-1">{contractFlowLabelMap[selectedOrder.contractFlowStatus]}</p></div>
              </div>

              <div className="border rounded-lg">
                <Table>
                  <TableHeader><TableRow><TableHead>SKU</TableHead><TableHead>名称</TableHead><TableHead>单价</TableHead><TableHead>数量</TableHead><TableHead className="text-right">小计</TableHead></TableRow></TableHeader>
                  <TableBody>
                    {selectedOrder.products.map((p, i) => (
                      <TableRow key={i}><TableCell className="font-mono">{p.sku}</TableCell><TableCell>{p.name}</TableCell><TableCell>¥{p.price.toLocaleString()}</TableCell><TableCell>{p.quantity}</TableCell><TableCell className="text-right">¥{(p.price * p.quantity).toLocaleString()}</TableCell></TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold">订单时间线</h3>
                <div className="space-y-2 text-sm">
                  <div className="p-3 bg-gray-50 rounded">订单创建：{selectedOrder.createTime}</div>
                  {selectedOrder.requiresContract && <div className="p-3 bg-gray-50 rounded">客户勾选电子合同：{selectedOrder.contractCheckedTime}</div>}
                  {selectedOrder.contractCustomerSignTime && <div className="p-3 bg-gray-50 rounded">客户签署完成：{selectedOrder.contractCustomerSignTime}</div>}
                  {selectedOrder.contractMerchantSignTime && <div className="p-3 bg-gray-50 rounded">商家签署完成：{selectedOrder.contractMerchantSignTime}</div>}
                  {selectedOrder.stockConfirmTime && <div className="p-3 bg-gray-50 rounded">库存确认：{selectedOrder.stockConfirmTime}（{selectedOrder.stockConfirmNote}）</div>}
                  {selectedOrder.paymentTime && <div className="p-3 bg-gray-50 rounded">客户付款：{selectedOrder.paymentTime}</div>}
                  {selectedOrder.shippingTime && <div className="p-3 bg-gray-50 rounded">发货：{selectedOrder.shippingCompany} - {selectedOrder.trackingNo}（{selectedOrder.shippingTime}）</div>}
                  {selectedOrder.invoiceUploadTime && <div className="p-3 bg-gray-50 rounded">电子发票上传：{selectedOrder.invoiceNo}（{selectedOrder.invoiceUploadTime}）</div>}
                  {selectedOrder.receivedTime && <div className="p-3 bg-gray-50 rounded">确认收货：{selectedOrder.receivedTime}</div>}
                </div>
              </div>
            </div>
          )}
          <DialogFooter><Button variant="outline" onClick={() => setDetailDialog(false)}>关闭</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={shippingDialog} onOpenChange={setShippingDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader><DialogTitle>填写物流信息</DialogTitle><DialogDescription>发货后填写物流公司和运单号。</DialogDescription></DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2"><Label>物流公司 *</Label><Select value={shippingForm.shippingCompany} onValueChange={(v) => setShippingForm({ ...shippingForm, shippingCompany: v })}><SelectTrigger><SelectValue placeholder="选择物流公司" /></SelectTrigger><SelectContent><SelectItem value="顺丰">顺丰</SelectItem><SelectItem value="德邦">德邦</SelectItem><SelectItem value="中通">中通</SelectItem><SelectItem value="圆通">圆通</SelectItem><SelectItem value="申通">申通</SelectItem><SelectItem value="韵达">韵达</SelectItem><SelectItem value="京东物流">京东物流</SelectItem><SelectItem value="EMS">EMS</SelectItem></SelectContent></Select></div>
            <div className="space-y-2"><Label htmlFor="trackingNo">物流单号 *</Label><Input id="trackingNo" value={shippingForm.trackingNo} onChange={(e) => setShippingForm({ ...shippingForm, trackingNo: e.target.value })} placeholder="请输入物流单号" /></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setShippingDialog(false)}>取消</Button><Button onClick={handleSubmitShipping}>提交物流信息</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={invoiceDialog} onOpenChange={setInvoiceDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader><DialogTitle>上传电子发票</DialogTitle><DialogDescription>上传发票文件或填写电子发票链接。</DialogDescription></DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2"><Label htmlFor="invoiceNo">发票号 *</Label><Input id="invoiceNo" value={invoiceForm.invoiceNo} onChange={(e) => setInvoiceForm({ ...invoiceForm, invoiceNo: e.target.value })} placeholder="请输入发票号" /></div>
            <div className="space-y-2">
              <Label htmlFor="invoiceFile">电子发票文件/链接 *</Label>
              <div className="flex gap-2">
                <Input id="invoiceFile" value={invoiceForm.invoiceFileUrl} onChange={(e) => setInvoiceForm({ ...invoiceForm, invoiceFileUrl: e.target.value })} placeholder="请输入电子发票链接或文件地址" />
                <Button type="button" variant="outline"><Upload className="h-4 w-4 mr-2" />上传文件</Button>
              </div>
            </div>
            <div className="space-y-2"><Label htmlFor="invoiceRemark">备注</Label><Textarea id="invoiceRemark" rows={3} value={invoiceForm.remark} onChange={(e) => setInvoiceForm({ ...invoiceForm, remark: e.target.value })} placeholder="选填：开票抬头、税号等说明" /></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setInvoiceDialog(false)}>取消</Button><Button onClick={handleSubmitInvoice}>确认上传</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
