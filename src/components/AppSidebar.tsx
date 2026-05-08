import { Link, useRouterState } from "@tanstack/react-router";
import {
  Home,
  FileText,
  MessageSquare,
  GraduationCap,
  BookOpen,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";

import { topics } from "@/data/curriculum";

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  const path = useRouterState({
    select: (r) => r.location.pathname,
  });

  const isActive = (p: string) => path === p;

  return (
    <Sidebar
      collapsible="icon"
      className="
        border-r border-slate-200
        bg-white text-slate-800
      "
    >
      {/* HEADER */}
      <SidebarHeader className="border-b border-slate-200 px-4 py-5">
        <Link to="/" className="flex items-center gap-3">

          <div className="
            h-9 w-9 rounded-xl
            bg-slate-100
            border border-slate-200
            flex items-center justify-center
          ">
            <BookOpen className="h-4 w-4 text-slate-700" />
          </div>

          {!collapsed && (
            <div>
              <div className="text-sm font-semibold text-slate-900">
                KM-09
              </div>
              <div className="text-xs text-slate-500">
                learning platform
              </div>
            </div>
          )}

        </Link>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">

        {/* NAV */}
        <SidebarGroup>
          {!collapsed && (
            <SidebarGroupLabel className="text-[10px] uppercase tracking-widest text-slate-400 px-3">
              navigation
            </SidebarGroupLabel>
          )}

          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {[
                { to: "/", label: "Басты бет", icon: Home },
                { to: "/topics", label: "Оку Такырыптары", icon: FileText },
                { to: "/chat", label: "ИИ комекшы", icon: MessageSquare },
                { to: "/test", label: "Тест", icon: GraduationCap },
              ].map((item) => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.to)}
                    className="
                      h-10 rounded-lg
                      text-slate-600
                      hover:bg-slate-100
                      hover:text-slate-900
                      data-[active=true]:bg-slate-100
                      data-[active=true]:text-slate-900
                      data-[active=true]:font-medium
                      transition
                    "
                  >
                    <Link to={item.to} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span className="text-sm">{item.label}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* DIVIDER */}
        <div className="my-4 border-t border-slate-200" />

        {/* TOPICS */}
        <SidebarGroup>

          {!collapsed && (
            <SidebarGroupLabel className="text-[10px] uppercase tracking-widest text-slate-400 px-3">
              content
            </SidebarGroupLabel>
          )}

          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">

              {topics.map((t) => {
                const url = `/topics/${t.id}`;
                const active = path.startsWith(url);

                return (
                  <SidebarMenuItem key={t.id}>
                    <SidebarMenuButton
                      asChild
                      isActive={active}
                      className="
                        h-10 rounded-lg
                        text-slate-600
                        hover:bg-slate-100
                        hover:text-slate-900
                        hover:translate-x-[2px]
                        transition
                        data-[active=true]:bg-slate-100
                        data-[active=true]:text-slate-900
                        data-[active=true]:font-medium
                      "
                    >
                      <Link
                        to="/topics/$topicId"
                        params={{ topicId: t.id }}
                        className="flex items-center gap-3"
                      >

                        <div className="
                          h-5 w-5 rounded
                          bg-slate-100
                          border border-slate-200
                          flex items-center justify-center
                          text-[10px] text-slate-600
                        ">
                          {t.number}
                        </div>

                        {!collapsed && (
                          <span className="text-sm truncate">
                            {t.title}
                          </span>
                        )}

                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}

            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

      </SidebarContent>
    </Sidebar>
  );
}


