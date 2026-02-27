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
import { Badge } from "../components/ui/badge";
import { Search, Plus, Edit, Trash2, Power, Ban } from "lucide-react";
import { Textarea } from "../components/ui/textarea";

interface KeywordReply {
  id: number;
  keyword: string;
  reply: string;
  status: "active" | "inactive";
  matchType: "exact" | "partial";
  createTime: string;
  updateTime: string;
}

const mockKeywordReplies: KeywordReply[] = [
  {
    id: 1,
    keyword: "价格",
    reply: "您好！关于产品价格，请访问我们的产品页面查看详细报价，或联系销售顾问获取专属优惠方案。",
    status: "active",
    matchType: "partial",
    createTime: "2024-01-15 10:30:00",
    updateTime: "2024-02-20 14:25:00",
  },
  {
    id: 2,
    keyword: "售后服务",
    reply: "理光中国提供全面的售后服务，包括7×24小时技术支持、全国联保、上门维修等服务。详情请致电客服热线：400-888-8888",
    status: "active",
    matchType: "exact",
    createTime: "2024-01-16 09:15:00",
    updateTime: "2024-02-18 11:20:00",
  },
  {
    id: 3,
    keyword: "如何报备",
    reply: "报备流程：\n1. 登录账户\n2. 进入报备管理\n3. 填写客户信息\n4. 提交审核\n详细指南请访问帮助中心。",
    status: "active",
    matchType: "partial",
    createTime: "2024-01-20 15:45:00",
    updateTime: "2024-02-25 09:30:00",
  },
  {
    id: 4,
    keyword: "产品参数",
    reply: "您可以在产品详情页查看完整的技术参数和规格说明。如需产品白皮书，请联系您的销售代表。",
    status: "active",
    matchType: "partial",
    createTime: "2024-02-01 11:20:00",
    updateTime: "2024-02-22 16:10:00",
  },
  {
    id: 5,
    keyword: "配送时间",
    reply: "标准配送时间为3-5个工作日，具体时效根据您的地理位置而定。加急订单可选择次日达服务。",
    status: "inactive",
    matchType: "exact",
    createTime: "2024-02-05 14:30:00",
    updateTime: "2024-02-19 10:15:00",
  },
];

export default function ChatbotManagement() {
  const [replies, setReplies] = useState(mockKeywordReplies);
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingReply, setEditingReply] = useState<KeywordReply | null>(null);
  const [formData, setFormData] = useState({
    keyword: "",
    reply: "",
    matchType: "partial" as "exact" | "partial",
    status: "active" as "active" | "inactive",
  });

  const filteredReplies = replies.filter(
    (reply) =>
      reply.keyword.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reply.reply.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddReply = () => {
    setEditingReply(null);
    setFormData({
      keyword: "",
      reply: "",
      matchType: "partial",
      status: "active",
    });
    setDialogOpen(true);
  };

  const handleEditReply = (reply: KeywordReply) => {
    setEditingReply(reply);
    setFormData({
      keyword: reply.keyword,
      reply: reply.reply,
      matchType: reply.matchType,
      status: reply.status,
    });
    setDialogOpen(true);
  };

  const handleToggleStatus = (id: number) => {
    setReplies(
      replies.map((reply) =>
        reply.id === id
          ? { ...reply, status: reply.status === "active" ? "inactive" : "active" }
          : reply
      )
    );
  };

  const handleDeleteReply = (id: number) => {
    if (window.confirm("确定要删除该关键字回复吗？")) {
      setReplies(replies.filter((reply) => reply.id !== id));
    }
  };

  const handleSaveReply = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingReply) {
      // 编辑现有回复
      setReplies(
        replies.map((reply) =>
          reply.id === editingReply.id
            ? {
                ...reply,
                ...formData,
                updateTime: new Date().toLocaleString("zh-CN", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                }),
              }
            : reply
        )
      );
    } else {
      // 添加新回复
      const newReply: KeywordReply = {
        id: Math.max(...replies.map((r) => r.id)) + 1,
        ...formData,
        createTime: new Date().toLocaleString("zh-CN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        updateTime: new Date().toLocaleString("zh-CN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      };
      setReplies([newReply, ...replies]);
    }
    
    setDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* 说明卡片 */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <div className="bg-blue-500 text-white rounded-full p-2">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">关于 Chatbot 关键字回复</h3>
              <p className="text-sm text-blue-800">
                配置前台用户页面聊天机器人的自动回复规则。当用户输入包含关键字的问题时，系统会自动匹配并回复相应内容。
              </p>
              <ul className="text-sm text-blue-800 mt-2 space-y-1 list-disc list-inside">
                <li><strong>精确匹配</strong>：用户输入必须完全匹配关键字</li>
                <li><strong>模糊匹配</strong>：用户输入包含关键字即可触发</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 主内容卡片 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>关键字回复列表</CardTitle>
            <Button onClick={handleAddReply}>
              <Plus className="h-4 w-4 mr-2" />
              添加关键字回复
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* 搜索框 */}
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="搜索关键字或回复内容..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* 统计信息 */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">总关键字数</p>
              <p className="text-2xl font-bold text-blue-600">{replies.length}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">启用中</p>
              <p className="text-2xl font-bold text-green-600">
                {replies.filter((r) => r.status === "active").length}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">已停用</p>
              <p className="text-2xl font-bold text-gray-600">
                {replies.filter((r) => r.status === "inactive").length}
              </p>
            </div>
          </div>

          {/* 表格 */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>关键字</TableHead>
                  <TableHead>回复内容</TableHead>
                  <TableHead>匹配类型</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>更新时间</TableHead>
                  <TableHead className="text-center">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReplies.map((reply) => (
                  <TableRow key={reply.id}>
                    <TableCell>{reply.id}</TableCell>
                    <TableCell>
                      <span className="font-medium text-blue-600">{reply.keyword}</span>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-md truncate text-sm text-gray-600">
                        {reply.reply}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={reply.matchType === "exact" ? "default" : "outline"}>
                        {reply.matchType === "exact" ? "精确匹配" : "模糊匹配"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={reply.status === "active" ? "default" : "secondary"}>
                        {reply.status === "active" ? "启用" : "停用"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {reply.updateTime}
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditReply(reply)}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          编辑
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleStatus(reply.id)}
                          className={
                            reply.status === "active"
                              ? "text-orange-600 hover:text-orange-700"
                              : "text-green-600 hover:text-green-700"
                          }
                        >
                          {reply.status === "active" ? (
                            <>
                              <Ban className="h-4 w-4 mr-1" />
                              停用
                            </>
                          ) : (
                            <>
                              <Power className="h-4 w-4 mr-1" />
                              启用
                            </>
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteReply(reply.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          删除
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

      {/* 添加/编辑对话框 */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingReply ? "编辑关键字回复" : "添加关键字回复"}
            </DialogTitle>
            <DialogDescription>
              {editingReply
                ? "修改关键字和回复内容"
                : "配置新的关键字自动回复规则"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveReply}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="keyword">关键字 *</Label>
                <Input
                  id="keyword"
                  value={formData.keyword}
                  onChange={(e) =>
                    setFormData({ ...formData, keyword: e.target.value })
                  }
                  placeholder="例如：价格、售后服务、如何报备"
                  required
                />
                <p className="text-xs text-gray-500">
                  用户输入包含此关键字时会触发自动回复
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reply">回复内容 *</Label>
                <Textarea
                  id="reply"
                  value={formData.reply}
                  onChange={(e) =>
                    setFormData({ ...formData, reply: e.target.value })
                  }
                  placeholder="请输入自动回复的内容..."
                  rows={6}
                  required
                />
                <p className="text-xs text-gray-500">
                  支持换行，建议控制在300字以内以获得更好的阅读体验
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="matchType">匹配类型 *</Label>
                  <select
                    id="matchType"
                    value={formData.matchType}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        matchType: e.target.value as "exact" | "partial",
                      })
                    }
                    className="w-full h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="partial">模糊匹配</option>
                    <option value="exact">精确匹配</option>
                  </select>
                  <p className="text-xs text-gray-500">
                    模糊匹配：包含关键字即可触发；精确匹配：必须完全一致
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">状态 *</Label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: e.target.value as "active" | "inactive",
                      })
                    }
                    className="w-full h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="active">启用</option>
                    <option value="inactive">停用</option>
                  </select>
                  <p className="text-xs text-gray-500">
                    停用后将不会触发此关键字回复
                  </p>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
              >
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
