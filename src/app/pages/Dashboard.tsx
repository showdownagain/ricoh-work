import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Users, FileText, Shield, TrendingUp, DollarSign } from "lucide-react";

// 模拟订单数据（与OrderManagement保持一致）
const mockOrders = [
  { id: 1, orderNo: "ORD202402190001", totalAmount: 31998, orderStatus: "invoiced" },
  { id: 2, orderNo: "ORD202402190002", totalAmount: 32595, orderStatus: "invoiced" },
  { id: 3, orderNo: "ORD202402190003", totalAmount: 45999, orderStatus: "to_invoice" },
  { id: 4, orderNo: "ORD202402190004", totalAmount: 38997, orderStatus: "confirmed" },
  { id: 5, orderNo: "ORD202402190005", totalAmount: 37998, orderStatus: "receipt_uploaded" },
  { id: 6, orderNo: "ORD202402190006", totalAmount: 16999, orderStatus: "pending" },
];

// 计算订单总额（不包括待支付状态）
const calculateTotalOrderAmount = () => {
  return mockOrders
    .filter(order => order.orderStatus !== "pending")
    .reduce((sum, order) => sum + order.totalAmount, 0);
};

const stats = [
  {
    title: "总用户数",
    value: "12,345",
    change: "+12.5%",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    title: "报备总数",
    value: "3,456",
    change: "+8.3%",
    icon: FileText,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    title: "订单总额",
    value: `¥${calculateTotalOrderAmount().toLocaleString()}`,
    change: "+23.8%",
    icon: DollarSign,
    color: "text-emerald-600",
    bgColor: "bg-emerald-100",
  },
  {
    title: "商品数量",
    value: "8,901",
    change: "+15.7%",
    icon: TrendingUp,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
];

const recentActivities = [
  { user: "张三", action: "创建了新用户", time: "5分钟前" },
  { user: "李四", action: "提交了报备申请", time: "15分钟前" },
  { user: "王五", action: "修改了商品信息", time: "1小时前" },
  { user: "赵六", action: "更新了权限配置", time: "2小时前" },
  { user: "钱七", action: "发布了新内容", time: "3小时前" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* 统计卡片 */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-green-600 mt-1">
                  {stat.change} 较上月
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* 最近活动 */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>最近活动</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between pb-4 border-b last:border-0 last:pb-0"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{activity.user}</p>
                    <p className="text-sm text-gray-600">{activity.action}</p>
                  </div>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>快捷操作</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              <button className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors text-left">
                <Users className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">添加新用户</p>
                  <p className="text-sm text-gray-600">创建新的用户账户</p>
                </div>
              </button>
              <button className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors text-left">
                <FileText className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium">查看报备</p>
                  <p className="text-sm text-gray-600">查看待处理的报备</p>
                </div>
              </button>
              <button className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors text-left">
                <Shield className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="font-medium">权限设置</p>
                  <p className="text-sm text-gray-600">配置用户权限</p>
                </div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}