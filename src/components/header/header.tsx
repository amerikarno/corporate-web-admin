import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Logo from "@/assets/logo.svg";
import { urlConfig } from "@/config/url";
import { TUrlConfig, TUrlConfigChild } from "@/config/types";
import { Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { RootState } from "@/app/store";
import { TUser, setUser } from "@/features/user/userSlice";
import { getCookies, removeCookies } from "@/lib/Cookies";
import { jwtDecode } from "jwt-decode";
import { useSelector, useDispatch } from "react-redux";
import { clearCorporateData } from "@/features/editCorporateData/editCorporateData";
export default function Header() {
  const user = useSelector((state: RootState) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (user === null || user === undefined) {
    const token = getCookies();
    if (token) {
      const user: TUser = jwtDecode(token);
      dispatch(setUser(user));
    } else {
      navigate("/login");
    }
  }

  const handleLogout = () => {
    localStorage.clear();
    dispatch(clearCorporateData());
    removeCookies();
    navigate("/login");
  };

  return (
    <nav className="w-full bg-slate-900 fixed top-0 h-16 flex justify-between items-center z-50">
      <div className="flex w-[270px] justify-start pl-4 sm:pl-0 sm:justify-center items-center">
        <div id="logo" className="hidden sm:inline">
          <img src={Logo} alt="logo" />
        </div>
        <div id="hamburger-menu" className="md:hidden ">
          <Sheet>
            <SheetTrigger>
              <Menu color="#ffffff" />
            </SheetTrigger>
            <SheetContent
              side={"left"}
              className="bg-none w-[270px] bg-primary-backoffice"
            >
              <div id="logo" className="flex justify-center items-center">
                <img src={Logo} alt="logo" />
              </div>
              <div className="flex flex-col justify-between">
                <Accordion
                  type="single"
                  collapsible
                  className="p-2 text-secondary-backoffice"
                >
                  {urlConfig.map((item: TUrlConfig, index: number) => {
                    return (
                      <div key={index}>
                        <AccordionItem
                          className="px-2 border-none "
                          value={`item-${index}`}
                        >
                          <AccordionTrigger className="font-bold hover:no-underline">
                            {item.header}
                          </AccordionTrigger>

                          {item.children.map(
                            (child: TUrlConfigChild, index) => {
                              return (
                                <AccordionContent key={index} className="pl-6">
                                  <Link
                                    to={child.href}
                                    className="hover:underline text-secondary-backoffice"
                                  >
                                    {child.label}
                                  </Link>
                                </AccordionContent>
                              );
                            }
                          )}
                        </AccordionItem>
                      </div>
                    );
                  })}
                </Accordion>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <div className="flex text-secondary-backoffice space-x-2 p-4 w-2/5 justify-between">
        <Separator orientation={"vertical"} />
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center space-x-2 w-56">
            <Avatar>
              {/* <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /> */}
              <AvatarFallback>PIC</AvatarFallback>
            </Avatar>
            <div className="text-left w-full text-white">
              <p>name</p>
              <p>role</p>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="">
            <DropdownMenuItem onClick={() => handleLogout()}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
