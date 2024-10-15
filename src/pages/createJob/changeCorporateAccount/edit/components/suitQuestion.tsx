import { CheckBox } from "@/components/Checkbox";
import { TSuitAns, TSuitTest } from "../constants/types";

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
    if (answer) {
      checked = answer[quizIndex]?.ans === index + 1 ? true : false;
    }
    return checked;
  };

  const isCheckedType2 = (index: number): boolean => {
    let checked = false;
    // console.log(JSON.stringify(answer, null, 2));
    if (answer && answer?.length > 0) {
      if (answer[quizIndex] && Array.isArray(answer[quizIndex].ans)) {
        checked = answer[quizIndex].ans.includes(index + 1) ? true : false;
      }
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
              data-testid={`checkbox-${quiz.questionNumber}-${index}`}
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
              data-testid={`radio-${quiz.questionNumber}-${index}`}
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
