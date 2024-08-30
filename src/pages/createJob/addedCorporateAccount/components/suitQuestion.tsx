import { CheckBox } from "@/components/Checkbox";
import { TSuitAns, TSuitTest } from "../constants2/types";

type TSuitQuestionCompProps = {
  answer?: TSuitAns[];
  quiz: TSuitTest;
  quizIndex: number;
  handleChoice: (
    e: React.ChangeEvent<HTMLInputElement>,
    quizIndex: number,
    choiceIndex: number,
    quizId: string,
    type?: string
  ) => void;
  errors: string[];
};

export function SuitQuestionComp({
  quiz,
  handleChoice,
  errors,
  quizIndex,
  answer,
}: TSuitQuestionCompProps) {
  const isCheckedType1 = (index: number) => {
    let checked = false;
    // const suit = answer?.suitTestResult;
    // const suit = suitData.suitTestResult;
    // if (suit) {
    //   checked = suit.answer[quizIndex].ans === index + 1 ? true : false;
    // }
    // const ans = answer?.find((list) => list.id === quizId);
    // if (ans && typeof ans.ans === "number") {
    //   return ans.ans - 1 === index;
    // }
    // return false;
    if (answer) {
      // for (let i = 0; i < answer.length; i++) {
      //   console.log(answer[i], "index", index);
      // }
      checked = answer[quizIndex]?.ans === index + 1 ? true : false;
    }
    return checked;
  };

  const isCheckedType2 = (index: number): boolean => {
    let checked = false;
    // const suit = answer?.suitTestResult;
    // // const suit = suitData.suitTestResult;
    // if (suit) {
    //   const list = suit.answer[quizIndex].ans;
    //   if (Array.isArray(list)) {
    //     checked = list.includes(index + 1) ? true : false;
    //   }
    // }
    if (answer && Array.isArray(answer[quizIndex].ans)) {
      checked = answer[quizIndex].ans.includes(index + 1) ? true : false;
    }
    return checked;
  };

  const error = (id: string) => {
    return errors.includes(id);
  };

  return (
    <div className="space-y-4">
      <h1>
        {quiz.questionNumber}. {quiz.question}
      </h1>

      <div className="grid grid-cols-2 gap-x-8 px-4">
        {quiz.choices.map((choice, index) =>
          quiz.types === "2" ? (
            <CheckBox
              name={choice.id}
              key={index}
              id={choice.id}
              label={`${index + 1}. ${choice.answer}`}
              onChange={(e) =>
                handleChoice(e, quizIndex, index, quiz.id, quiz.types)
              }
              checked={isCheckedType2(index)}
            />
          ) : (
            <CheckBox
              name={choice.id}
              key={index}
              type="radio"
              id={choice.id}
              label={`${index + 1}. ${choice.answer}`}
              onChange={(e) =>
                handleChoice(e, quizIndex, index, quiz.id, quiz.types)
              }
              checked={isCheckedType1(index)}
            />
          )
        )}
        {error(quiz.id) && (
          <p className="text-red-500">Please select your answer</p>
        )}
      </div>
    </div>
  );
}
