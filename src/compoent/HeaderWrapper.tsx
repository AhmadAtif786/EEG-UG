"use client";

import { usePathname } from "next/navigation";
import Header from "@/compoent/Header";

export default function HeaderWrapper() {
  const pathname = usePathname();

  const hideHeaderRoutes = ["/login", "/dashboard"];
  const shouldHideHeader = hideHeaderRoutes.includes(pathname);

  return !shouldHideHeader ? <Header /> : null;
}
