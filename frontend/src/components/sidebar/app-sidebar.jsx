import * as React from "react";
import { getUserData } from "@/lib/auth";
import { useLocation } from "react-router-dom";

import { GalleryVerticalEnd, SquareTerminal } from "lucide-react";

import { NavMain } from "@/components/sidebar/nav-main";
import { NavUser } from "@/components/sidebar/nav-user";
import { TeamSwitcher } from "@/components/sidebar/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

const data = {
  teams: [
    {
      name: "Support Ticket",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Tickets",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "All Ticket",
          url: "/dashboard-customer",
        },
        {
          title: "Create Ticket",
          url: "/dashboard-customer/create-ticket",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }) {
  const [user, setUser] = React.useState(null);
  const location = useLocation();

  const navItems = React.useMemo(() => {
    return data.navMain.map((nav) => ({
      ...nav,
      isActive: nav.items?.some((item) => item.url === location.pathname),
      items: nav.items?.map((item) => ({
        ...item,
        isActive: item.url === location.pathname,
      })),
    }));
  }, [location.pathname]);

  React.useEffect(() => {
    const storedUser = getUserData();
    if (storedUser) {
      setUser({
        name: storedUser.name,
        email: storedUser.email,
        avatar: storedUser.avatar ?? "https://github.com/shadcn.png",
      });
    }
  }, []);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter>{user && <NavUser user={user} />}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
