"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet";
import { navlinks } from "@/config/navLinks";
import { Menu } from "lucide-react";
import Link from "next/link";

export default function NavbarMobile() {
  return (
    <div className="flex items-center">
      {/* Trigger para abrir el menú */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="p-2">
            <Menu className="w-10 h-10 stroke-[5]	" />
          </Button>
        </SheetTrigger>

        {/* Contenido del menú móvil */}
        <SheetContent side="left" className="bg-[rgb(var(--background))] text-neutral-white w-full">
          <SheetHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Menú</h2>
            </div>
          </SheetHeader>
          <nav className="mt-6">
            <ul className="space-y-4">
              {navlinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="block text-lg hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
