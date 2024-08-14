import { TUrlConfig, TUrlConfigChild } from "@/config/types";
import { urlConfig } from "@/config/url";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MoveRight } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

export default function Sidebar() {
  const user = useSelector((state: RootState) => state.user.user);
  console.log(user);

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
                <AccordionTrigger className="font-bold hover:no-underline text-[#b3b3b3]">
                  {item.header}
                </AccordionTrigger>

                {item.children.map((child: TUrlConfigChild, index) => {
                  // return child?.pageId &&
                  //   user?.groups &&
                  //   user?.groups.includes(child?.pageId) ? (
                  //   <AccordionContent key={index} className="pl-6">
                  //     <Link
                  //       to={child.href}
                  //       className="hover:underline text-[#b3b3b3] flex"
                  //     >
                  //       <MoveRight />
                  //       &nbsp;<p>{child.label}</p>
                  //     </Link>
                  //   </AccordionContent>
                  // ) : (
                  //   <div key={index}></div>
                  // );
                  return (
                    <AccordionContent key={index} className="pl-6">
                      <Link
                        to={child.href}
                        className="hover:underline text-[#b3b3b3] flex"
                      >
                        <MoveRight />
                        &nbsp;<p>{child.label}</p>
                      </Link>
                    </AccordionContent>
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
