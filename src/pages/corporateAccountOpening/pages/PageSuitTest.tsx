import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SuitQuestionComp } from "../components/suitQuestion";
import { Button } from "@/components/ui/button";
import { UseSuitTest } from "../hook/useSuitTest";
import { SuitTableResult } from "../components/suitTableResult";

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
            <div className="flex justify-end">
              <Button onClick={handleSubmit}>Submit</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <SuitTableResult totalScore={score} />
    </div>
  );
}
