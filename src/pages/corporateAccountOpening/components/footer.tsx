import { Button } from "@/components/ui/button";

type TCreateCorporateFooter = {
  handlePages: (type: string) => void;
  pageId: number;
  totalPages: number;
};
export function CreateCorporateFooter({
  handlePages,
  pageId,
  totalPages,
}: TCreateCorporateFooter) {
  return (
    <div className="flex flex-row">
      <div className="flex justify-start px-4">
        <Button onClick={() => handlePages("prev")} disabled={pageId <= 3}>
          Prevoius Form
        </Button>
      </div>
      <div className="flex-grow items-center justify-center">
        <p className="text-center">{`${pageId} / ${totalPages}`}</p>
      </div>
      <div className="flex justify-end px-4">
        {pageId === 1 ? (
          <Button
            type="submit"
            form="corporateInfo"
            onClick={() => handlePages("submit")}
          >
            Submit
          </Button>
        ) : pageId === 2 ? (
          <Button
            onClick={() => handlePages("submit2")}
            type="submit"
            form="corporateInfo2"
          >
            Submit
          </Button>
        ) : (
          <Button
            onClick={() => handlePages("next")}
            disabled={pageId <= 2 || pageId >= 10}
          >
            Next Form
          </Button>
        )}
      </div>
    </div>
  );
}
