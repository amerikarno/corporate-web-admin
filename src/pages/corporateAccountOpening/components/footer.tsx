import { Button } from "@/components/ui/button";

type TCreateCorporateFooter = {
  handlePages: (type: string) => void;
  pageId: number;
};
export function CreateCorporateFooter({
  handlePages,
  pageId,
}: TCreateCorporateFooter) {

  return (
    <div className="flex flex-row">
      <div className="flex justify-start px-4">
        <Button onClick={() => handlePages("prev")} disabled={pageId <= 3}>
          Prevoius Form
        </Button>
      </div>
      <div className="flex-grow items-center justify-center">
        <p className="text-center">{`${pageId} / 8`}</p>
      </div>
      <div className="flex justify-end px-4">
        {/* <Button onClick={() => handlePages("next")} disabled={pageId <= 1 || pageId >= 8}> */}
        <Button onClick={() => handlePages("next")} disabled={pageId<=2}>
          Next Form
        </Button>
      </div>
    </div>
  );
}
