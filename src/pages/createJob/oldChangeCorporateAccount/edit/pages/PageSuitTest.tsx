import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SuitQuestionComp } from "../components/suitQuestion";
import { Button } from "@/components/ui/button";
import { useSuitTest } from "../hook/useSuitTest";
import { SuitTableResult } from "../components/suitTableResult";
import { CheckBox } from "@/components/Checkbox";

export function PageSuitTest() {
  const {
    answerSuiteTest,
    quizSuiteTest,
    handleChoice,
    isLoading,
    handleSubmit,
    errors,
    score,
    opitionalQuiz,
    handelOptionalQuiz,
    isSubmit,
    corporatesInfo,
  } = useSuitTest();

  if (isLoading) {
    return <div>Loading Suitability Questions...</div>;
  }

  const isAdditionChecked = (quizIndex: number, name: string) => {
    if (opitionalQuiz[quizIndex] === "") {
      return undefined;
    } else {
      return name === opitionalQuiz[quizIndex];
    }
  };

  return (
    <div className="p-4 space-y-10">
      <Card className=" p-4 space-y-6">
        <h1 className="text-xl font-bold">Juristic Infomations</h1>
        <div className="flex">
          <div className="w-1/2 space-y-4">
            <div className="flex flex-row gap-4">
              <h1 className="font-bold">Juristic ID</h1>
              <h1 className="">: {corporatesInfo?.registerId ?? ""}</h1>
            </div>
            <div className="flex flex-row gap-4">
              <h1 className="font-bold">Juristic Investor Name</h1>
              <h1 className="">: {corporatesInfo?.Info.name ?? ""}</h1>
            </div>
            <div className="flex flex-row gap-4">
              <h1 className="font-bold">Commercial Number</h1>
              <h1 className="">
                : {corporatesInfo?.Info.registrationNo ?? ""}
              </h1>
            </div>
          </div>
          <div className="w-1/2 space-y-4">
            <div className="flex flex-row gap-4">
              <h1 className="font-bold">Tax ID</h1>
              <h1 className="">: {corporatesInfo?.Info.taxId ?? ""}</h1>
            </div>
            <div className="flex flex-row gap-4">
              <h1 className="font-bold">Date Of Incorporation</h1>
              <h1 className="">
                : {corporatesInfo?.Info.dateOfIncorporation.split("T")[0]}
              </h1>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex flex-row space-x-6 items-end">
            <h1 className="text-2xl font-bold">Suitabily Test : </h1>
            <p className="text-xl ">Selected Your Best Matched Answer</p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {quizSuiteTest &&
              quizSuiteTest.map((item, index) => (
                <SuitQuestionComp
                  answer={answerSuiteTest}
                  key={index}
                  quizIndex={index}
                  quiz={item}
                  handleChoice={handleChoice}
                  errors={errors}
                />
              ))}
            <h1 className="text-xl font-bold">
              Questions 11-12 are used as additional information for guidance
              (Scores will NOT be counted)
            </h1>
            <h1 className="font-bold">
              Apply only to investment in derivatives and structure note
            </h1>
            <div className="space-y-4">
              <h1>
                11. Successful derivatives and structure notes investment has
                high return. On the other hand, investors can lose all of their
                investment and must increase more capital. Are you able to
                accept this?
              </h1>
              <div className="grid grid-cols-2 gap-x-8 px-4">
                <CheckBox
                  id="11-1"
                  label="No"
                  name="no"
                  data-testid="checkbox-11-1"
                  checked={isAdditionChecked(0, "no")}
                  onChange={(e) => handelOptionalQuiz(0, e)}
                />
                <CheckBox
                  id="11-2"
                  label="Yes"
                  name="yes"
                  data-testid="checkbox-11-2"
                  checked={isAdditionChecked(0, "yes")}
                  onChange={(e) => handelOptionalQuiz(0, e)}
                />
              </div>
            </div>
            <h1 className="font-bold"> Apply only to offshore investment</h1>
            <div className="space-y-4">
              <h1>
                12. In addition to investment risk, are you able to accept
                foreign exchange rate risk?
              </h1>
              <div className="grid grid-cols-2 gap-x-8 px-4">
                <CheckBox
                  id="12-1"
                  label="No"
                  name="no"
                  data-testid="checkbox-12-1"
                  checked={isAdditionChecked(1, "no")}
                  onChange={(e) => handelOptionalQuiz(1, e)}
                />
                <CheckBox
                  id="12-2"
                  label="Yes"
                  name="yes"
                  data-testid="checkbox-12-2"
                  checked={isAdditionChecked(1, "yes")}
                  onChange={(e) => handelOptionalQuiz(1, e)}
                />
              </div>
            </div>
            <div className="flex justify-end relative">
              <Button
                className="absolute top-20 right-0 w-24 "
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {isSubmit && <SuitTableResult totalScore={score} />}
    </div>
  );
}
