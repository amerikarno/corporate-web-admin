import { Button } from "@/components/ui/button";

type TIcoFooter = {
  handlePages: (type: string) => void;
  pageId: number;
  totalPages: number;
};
export function FooterPageIco({
  handlePages,
  pageId,
  totalPages,
}: TIcoFooter) {
  return (
    <div className="flex flex-row">
      <div className="flex justify-start px-4">
        <Button onClick={() => handlePages("prev")} disabled={pageId <= 1}>
          Prevoius Form
        </Button>
      </div>
      <div className="flex-grow items-center justify-center">
        <p className="text-center">{`${pageId} / ${totalPages}`}</p>
      </div>
      {pageId === 5 ? <div className="flex justify-end px-4">
          <Button
            data-testid="next-button"
            onClick={() => handlePages("next")}
            className=""
          >
            Done
          </Button>
      </div> : (<div className="flex justify-end px-4">
          <Button
            data-testid="next-button"
            onClick={() => handlePages("next")}
            disabled={pageId >= 4}
            className="hidden"
          >
            Next Form
          </Button>
      </div>)}
    </div>
  );
}
