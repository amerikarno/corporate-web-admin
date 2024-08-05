import { CheckBox } from "@/components/Checkbox";
import { TSuitAns, TSuitTest } from "../constants/types";

type TSuitQuestionCompProps = {
  quiz: TSuitTest;
  answer: TSuitAns[];
  handleChoice: (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number,
    quizId: string,
    type?: string
  ) => void;
  errors: string[];
};

export function SuitQuestionComp({
  quiz,
  answer,
  handleChoice,
  errors,
}: TSuitQuestionCompProps) {
  const isChecked = (quizId: string, index: number) => {
    const ans = answer?.find((list) => list.id === quizId);
    if (ans) {
      return ans.ans - 1 === index;
    }
    return false;
  };

  const error = (id: string) => {
    return errors.includes(id);
  };

  return (
    <div className="space-y-4">
      <h1>
        {quiz.questionNumber}. {quiz.question}
      </h1>
      {quiz.types === "2" ? (
        <div className="grid grid-cols-2 gap-x-8 px-4">
          {quiz.choices.map((choice, index) => (
            <CheckBox
              name={choice.id}
              key={index}
              id={choice.id}
              label={`${index + 1}. ${choice.answer}`}
              onChange={(e) => handleChoice(e, index, quiz.id, quiz.types)}
              // checked={isChecked(quiz.id, index)}
            />
          ))}
          {error(quiz.id) && (
            <p className="text-red-500">Please select your answer</p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-8 px-4">
          {quiz.choices.map((choice, index) => (
            <CheckBox
              name={choice.id}
              key={index}
              type="radio"
              id={choice.id}
              label={`${index + 1}. ${choice.answer}`}
              onChange={(e) => handleChoice(e, index, quiz.id, quiz.types)}
              checked={isChecked(quiz.id, index)}
            />
          ))}
          {error(quiz.id) && (
            <p className="text-red-500">Please select your answer</p>
          )}
        </div>
      )}
    </div>
  );
}
