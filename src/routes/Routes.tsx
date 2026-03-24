import { MasterLayout } from "@/components/Layout";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import CsharpDashboard from "@/pages/CsharpDashboard/CsharpDashboard";
import Page403 from "@/pages/Error/Page403";
import Page404 from "@/pages/Error/Page404";
import Page500 from "@/pages/Error/Page500";
import Blog from "@/pages/blog/Blog";
import BlogDetail from "@/pages/blogDetail/BlogDetail";
import Home from "@/pages/home/Home";
import LessonLayout from "@/pages/lesson/Layout/LessonLayout";
import Lesson from "@/pages/lesson/Lesson";
import Login from "@/pages/login/Login";
import Register from "@/pages/register/Regiser";
import React from "react";

interface RouteProps {
  path: string;
  element: React.ReactNode;
}

export const appRoutes: RouteProps[] = [
  {
    path: "/login",
    element: (
      // <ProtectedRoute isProtected={false}>
      <Login />
      // </ProtectedRoute>
    ),
  },
  {
    path: "/register",
    element: (
      // <ProtectedRoute isProtected={false}>
      <Register />
      // </ProtectedRoute>
    ),
  },
  // Main Application Routes
  {
    path: "/",
    element: <MasterLayout children={<Home />} />,
  },
  {
    path: "/welcome-csharp",
    element: <CsharpDashboard />,
  },
  {
    path: "/lesson",
    element: <LessonLayout children={<Lesson />} />,
  },
  {
    path: "/blog",
    element: <MasterLayout children={<Blog />} />,
  },
  {
    path: "/blog-detail",
    element: <BlogDetail />,
  },
  // {
  //   path: "/quan-ly-quyen",
  //   element: (
  //     <MasterLayout>
  //       <ProtectedRoute
  //         isProtected={true}
  //         requireAdminRole={true}
  //         requireAll={false}
  //         // requiredPermissions={[
  //         //   PERMISSIONS.QLY_QUYEN_DANH_SACH,
  //         //   PERMISSIONS.QLY_QUYEN_DANH_SACH,
  //         //   PERMISSIONS.QLY_QUYEN_DANH_SACH,
  //         // ]}
  //       >
  //         <QuanLyQuyen />
  //       </ProtectedRoute>
  //     </MasterLayout>
  //   ),
  // },

  // Error Pages
  {
    path: "/403",
    element: (
      <ProtectedRoute isProtected={false}>
        <Page403 />
      </ProtectedRoute>
    ),
  },
  {
    path: "/404",
    element: (
      <ProtectedRoute isProtected={false}>
        <Page404 />
      </ProtectedRoute>
    ),
  },
  {
    path: "/500",
    element: (
      <ProtectedRoute isProtected={false}>
        <Page500 />
      </ProtectedRoute>
    ),
  },
];

export default appRoutes;
