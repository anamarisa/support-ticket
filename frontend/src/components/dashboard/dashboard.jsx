import { useState, useEffect } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Outlet, useLocation, useParams, useNavigate } from "react-router-dom";
import { getUserRole } from "@/lib/auth";
import { AgentSidebar } from "../sidebar/agent-sidebar";

export default function DashboardLayout() {
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  const [role, setRole] = useState(null);

  useEffect(() => {
    const userRole = getUserRole();
    setRole(userRole);
    console.log(userRole);
  }, []);

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        {/* Sidebar */}
        {role === "customer" && <AppSidebar />}
        {role === "agent" && <AgentSidebar />}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="flex h-16 shrink-0 items-center gap-2 px-4 border-b">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink to="/" onClick={() => navigate("/")}>
                      Ticket Support
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {location.pathname.startsWith("/course/") && (
                    <>
                      <BreadcrumbSeparator className="hidden md:block" />
                      <BreadcrumbItem>
                        <BreadcrumbPage>{selectedCourse?.title}</BreadcrumbPage>
                      </BreadcrumbItem>
                    </>
                  )}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>

          {/* Main Content - Centered */}
          <main className="flex-1 bg-sidebar overflow-auto py-6 px-8">
            <div className="flex justify-center h-full w-full">
              <div className="w-full">
                <Outlet />
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
