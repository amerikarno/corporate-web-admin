import { TUrlConfig, TUrlConfigChild } from "@/config/types";
import { urlConfig } from "@/config/url";
import { Link, useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MoveRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { isAllowedPage, isAllowedPageByRange } from "@/lib/utils";
import { getCookies } from "@/lib/Cookies";
import { TUser, setUser } from "@/features/user/userSlice";
import { jwtDecode } from "jwt-decode";
import { clearCorporateData } from "@/features/editCorporateData/editCorporateData";

export default function Sidebar() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const handleClick = (pageId: number) => {
    if (pageId === 2001) {
      localStorage.clear();
      dispatch(clearCorporateData());
    }
  };
  
  if (user === null || user === undefined) {
    const token = getCookies();
    if (token) {
      const dispatch = useDispatch();
      const user: TUser = jwtDecode(token);
      dispatch(setUser(user));
    } else {
      const navigate = useNavigate();
      navigate("/login");
    }
  }

    return (
      <aside className="w-[270px] bg-slate-900 h-screen fixed hidden sm:inline ease bg-primary-backoffice overflow-y-auto">
        <Accordion type="single" collapsible className="p-2">
          {urlConfig.map((item: TUrlConfig, index: number) => {
            return (
              <div key={index}>
                <AccordionItem
                  className="px-2 border-none "
                  value={`item-${index}`}
                >
                  {isAllowedPageByRange(item.pages) && (
                    <AccordionTrigger className="font-bold hover:no-underline text-[#b3b3b3]">
                      {item.header}
                    </AccordionTrigger>
                  )}
  
                  {item.children.map((child: TUrlConfigChild, index) => {
                    return isAllowedPage(child.pageId) || child.pageId >= 7000 ? (
                      <AccordionContent key={index} className="pl-6">
                        <Link
                          to={child.href}
                          className="hover:underline text-[#b3b3b3] flex"
                          onClick={() => handleClick(child.pageId)}
                        >
                          <MoveRight />
                          &nbsp;<p>{child.label}</p>
                        </Link>
                      </AccordionContent>
                    ) : (
                      <div key={index}></div>
                    );
                  })}
                </AccordionItem>
              </div>
            );
          })}
        </Accordion>
      </aside>
    );
  }
