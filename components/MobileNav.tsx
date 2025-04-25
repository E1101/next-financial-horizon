"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MobileNav = ({ user }: MobileNavProps) => {
  const pathname = usePathname();

  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger>
          <Image src="/icons/hamburger.svg" width={30} height={30} alt="menu" />{" "}
        </SheetTrigger>
        <SheetContent side="left" className="boarder-none bg-white">
          <nav className="flex flex-col gap-1 px-4">
            <Link href={"/"} className="flex cursor-pointer items-center gap-2">
              <Image
                src={"/icons/logo.svg"}
                alt="Logo"
                width={34}
                height={34}
              />
              <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
                Horizon
              </h1>
            </Link>
            <div className="mobilenav-sheet">
              <SheetClose asChild>
                <nav className="flex h-full flex-col gap-6 pt-16 text-white">
                  {/* Sidebar links */}
                  {sidebarLinks.map((item) => {
                    const isActive =
                      pathname === item.route ||
                      pathname.startsWith(item.route + "/");
                    return (
                      <SheetClose asChild key={item.label}>
                        <Link
                          className={cn("mobilenav-sheet_close", {
                            "bg-bank-gradient": isActive,
                          })}
                          key={item.label}
                          href={item.route}
                        >
                          <Image
                            src={item.imgURL}
                            alt={item.label}
                            width={20}
                            height={20}
                            className={cn({
                              "brightness-[3] invert-0": isActive,
                            })}
                          />
                          <p
                            className={cn("text-16 font-semibold text-black-2", {
                              "text-white": isActive,
                            })}
                          >
                            {item.label}
                          </p>
                        </Link>
                      </SheetClose>
                    );
                  })}
                  {/* End Sidebar link */}
                  USER
                </nav>
              </SheetClose>
              FOOTER
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
