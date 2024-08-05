import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SuitQuestionComp } from "../components/suitQuestion";
import { Button } from "@/components/ui/button";
import { UseSuitTest } from "../hook/useSuitTest";
import { SuitTableResult } from "../components/suitTableResult";
import { CheckBox } from "@/components/Checkbox";

type TPageSuitTestProps = {
  corporateCode: string;
};

export function PageSuitTest({ corporateCode }: TPageSuitTestProps) {
  const {
    quizSuiteTest,
    handleChoice,
    isLoading,
    answerSuiteTest,
    handleSubmit,
    errors,
    score,
    opitionalQuiz,
    handelOptionalQuiz,
    isSubmit,
  } = UseSuitTest(corporateCode);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 space-y-10">
      {/* <Card>
        <CardHeader className="text-xl font-bold">Suitability Test</CardHeader>
        <CardContent>
          <SideLabelInput
            title="Risk Level"
            childrenClassName="w-3/4 items-start"
            labelClassName="w-1/4"
          >
            <Dropdown
              onDropdownSelect={(data) => console.log(data)}
              items={riskItems}
            />
          </SideLabelInput>
        </CardContent>
      </Card> */}

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
                  key={index}
                  quiz={item}
                  handleChoice={handleChoice}
                  answer={answerSuiteTest}
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
                  checked={opitionalQuiz[0] == "no"}
                  onChange={(e) => handelOptionalQuiz(0, e)}
                />
                <CheckBox
                  id="11-2"
                  label="Yes"
                  name="yes"
                  checked={opitionalQuiz[0] == "yes"}
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
                  checked={opitionalQuiz[1] == "no"}
                  onChange={(e) => handelOptionalQuiz(1, e)}
                />
                <CheckBox
                  id="12-2"
                  label="Yes"
                  name="yes"
                  checked={opitionalQuiz[1] == "yes"}
                  onChange={(e) => handelOptionalQuiz(1, e)}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={handleSubmit} disabled={isSubmit}>
                {isSubmit ? "Submiting..." : "Submit"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {isSubmit && <SuitTableResult totalScore={score} />}
    </div>
  );
}
