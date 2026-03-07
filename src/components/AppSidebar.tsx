import {
  BookOpen,
  Shield,
  FileText,
  Gamepad2,
  ClipboardList,
  Settings,
  Trophy,
  Ticket,
  Star,
  User,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Home", url: "/", icon: BookOpen },
  { title: "Rank Lookup", url: "/rank-lookup", icon: Trophy },
  { title: "Account", url: "/settings", icon: User },
];

const sectionItems = [
  { title: "Wiki", url: "/wiki", icon: BookOpen },
  { title: "More Rules", url: "/more-rules", icon: Shield },
  { title: "Forms", url: "/forms", icon: FileText },
  { title: "Extra Mini Games", url: "/extra-mini-games", icon: Gamepad2 },
  { title: "Rank Applications", url: "/rank-applications", icon: ClipboardList },
  { title: "Tickets", url: "/tickets", icon: Ticket },
  { title: "Reviews", url: "/reviews", icon: Star },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="border-r border-border bg-card">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-primary font-bold">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className="flex items-center gap-2 px-3 py-2 rounded-md text-muted-foreground transition-all duration-300 hover:text-primary hover:bg-primary/5 hover:shadow-[0_0_12px_hsl(45_100%_51%/0.15),inset_0_0_12px_hsl(45_100%_51%/0.05)]"
                      activeClassName="bg-primary/10 text-primary font-medium shadow-[0_0_16px_hsl(45_100%_51%/0.2),inset_0_0_16px_hsl(45_100%_51%/0.08)]"
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-primary font-bold">Sections</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sectionItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className="flex items-center gap-2 px-3 py-2 rounded-md text-muted-foreground transition-all duration-300 hover:text-primary hover:bg-primary/5 hover:shadow-[0_0_12px_hsl(45_100%_51%/0.15),inset_0_0_12px_hsl(45_100%_51%/0.05)]"
                      activeClassName="bg-primary/10 text-primary font-medium shadow-[0_0_16px_hsl(45_100%_51%/0.2),inset_0_0_16px_hsl(45_100%_51%/0.08)]"
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
