import { createBrowserRouter } from "react-router";
import Layout from "./components/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        lazy: async () => ({ Component: (await import("./pages/Dashboard")).default }),
      },
      {
        path: "users",
        lazy: async () => ({ Component: (await import("./pages/UserManagement")).default }),
      },
      {
        path: "reports",
        lazy: async () => ({ Component: (await import("./pages/ReportManagement")).default }),
      },
      {
        path: "permissions",
        lazy: async () => ({ Component: (await import("./pages/PermissionManagement")).default }),
      },
      {
        path: "content",
        lazy: async () => ({ Component: (await import("./pages/ContentManagement")).default }),
      },
      {
        path: "products",
        lazy: async () => ({ Component: (await import("./pages/ProductManagement")).default }),
      },
      {
        path: "orders",
        lazy: async () => ({ Component: (await import("./pages/OrderManagement")).default }),
      },
      {
        path: "chatbot",
        lazy: async () => ({ Component: (await import("./pages/ChatbotManagement")).default }),
      },
    ],
  },
]);
