import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import React, { useState } from 'react';

interface Answer {
  questionIndex: number;
  answer: string | string[] | number[];
  score:number;
}

export default function SubSuitTest() {
  const questions = [
    {
      question: 'ท่านมีภาระค่าใช้จ่ายประจำดือนเป็นสัดส่วนเท่าใดของรายได้',
      choices: ['มากกว่า 75% ของรายได้', '50% - 75% ของรายได้', '25% - 50% ของรายได้', 'น้อยกว่า 25% ของรายได้'],
    },
    {
      question: 'ในปัจจุบัน ข้อใดต่อไปนี้ตรงกับสภาวะของท่านมากที่สุด',
      choices: ['ทรัพย์สินน้อยกว่าหนี้สิน', 'ทรัพย์สินเท่ากับหนี้สิน', 'ทรัพย์สินมากกว่าหนี้สิน', 'เงินออมเพียงพอสำหรับวิยเกษียณอายุ'],
    },
    {
      question: 'ท่านมีประสบการณ์/ความรู้เกี่ยวกับการลงทุนในด้านใดมาบ้างแล้ว',
      choices: ['เพื่อการลงทุนระยะสั้น', 'เพื่อการลงทุนระยะยาว', 'เพื่อสิทธิประโยชน์ทางภาษี', 'เพื่อการเกษียณ'],
    },
    {
      question: 'ท่านคาดว่ายังไม่ต้องใช้เงินที่จะนำมาลงทุนอีกนานเท่าใด',
      choices: ['ทรัพย์สินน้อยกว่าหนี้สิน', 'ทรัพย์สินเท่ากับหนี้สิน', 'ทรัพย์สินมากกว่าหนี้สิน', 'เงินออมเพียงพอสำหรับวิยเกษียณอายุ'],
    },
    {
      question: 'วัตถุประสงค์ในการลงทุน/เป้าหมายหลักในการลงทุนของท่าน คือ',
      choices: ['ได้รับผลตอบแทนอาจจะต่ำแต่สม่ำเสมอ เงินต้นปลอดภัย', 'ได้รับผลตอบแทนสม่ำเสมอ ยอมเสี่ยงที่จะสูญสียเงินต้นได้บ้าง', 'ได้รับผลตอบแทนที่สูงขึ้น ยอมเสี่ยงที่จะสูญเสียเงินต้นมากขึ้น', 'ได้ผลตอบแทนสูงสุดในระยะยาว ยอมเสี่ยงที่จะสูญเงินต้น'],
    },
    {
      question: 'ความเสี่ยงจากการลงทุนข้อใดที่ท่านยอมรับได้',
      choices: ['โอกาสกำไร 2.5% แต่อาจขาดทุนถึง 1%', 'โอกาสกำไรสูงสุด 10% แต่อาจขาดทุนถึง 5%', 'โอกาสกำไรสูงสุด 20% แต่อาจขาดทุนถึง 15%', 'โอกาสกำไรสูงสุด 50% แต่อาจขาดทุนถึง 100%'],
    },
    {
      question: 'ถ้าการลงทุนของท่านมีโอกาสได้รับผลตอบแทนมาก แต่มีโอกาสขาดทุนสูงด้วยเช่นกันท่านจะรู้สึกอย่างไร',
      choices: ['กังวล ตื่นตระหนก กลัวขาดทุน', 'ไม่สบายใจ แต่พอเข้าใจได้บ้าง', 'เข้าใจและรับความผันผวนได้ในระดับหนึ่ง', 'ไม่กังวลกับโอกาสขาดทุนสูง ยังหวังว่าอาจมีโอกาสปรับสูงขึ้น'],
    },
    {
      question: 'ท่านจะรู้สึกกังวลหรือรับไม่ได้เมื่อเงินลงทุนของท่านมีการปริบตัวลงในสัดสวนเท่าใด',
      choices: ['5% หรือน้อยกว่า', 'มากกว่า 5% - 10%', 'มากกว่า 10% - 20%', 'มากกว่า 20% ขึ้นไป'],
    },
    {
      question: 'สมมติว่าท่านลงทุนไป 100,000 บาท ต่อมาพบว่าพอร์ตเงินลงทุนลดลงเหลือ 85,000บาท ท่านจะทำอย่างไร',
      choices: ['ตกใจ ต้องการขายพอร์ตลงทุนที่เหลือทิ้ง', 'กังวล จะเปลี่ยนบางส่วนไปในทรัพย์สินที่เสี่ยงน้อยลง', 'อดทนถือต่อไป และรอพลตอบแทนปริบตัวกลับมา', 'มั่นใจ เพราะตั้งใจลงทุนระยะยาว และจะเพิ่มเงินลงทุน'],
    },
  ];

  const [answers, setAnswers] = useState<Answer[]>(questions.map((_, index) => ({
    questionIndex: index,
    answer: index === 2 ? [0,0,0,0] : '', 
    score:0
  })));
  const [totalScore,setTotalScore] = useState(0);
  const [investorType,setInvestorType] = useState("");

  const handleOptionChange = (questionIndex: number, answer: string, choiceIndex: number) => {
    const score = choiceIndex + 1;
    const newAnswers = answers.map((ans, index) =>
      index === questionIndex ? { ...ans, questionIndex, answer, score } : ans
    );
    setAnswers(newAnswers);
  };

  const handleCheckboxChange = (questionIndex: number, choiceIndex: number) => {
    const currentAnswers = answers[questionIndex].answer as number[];
    const newAnswers = [...currentAnswers];
    newAnswers[choiceIndex] = newAnswers[choiceIndex] === 1 ? 0 : 1;
    const highestIndex = newAnswers.reduce((maxIndex, val, index) => (val === 1 ? index : maxIndex), -1);
    const score = highestIndex + 1;
    const updatedAnswers = answers.map((ans, index) =>
      index === questionIndex ? { ...ans, questionIndex, answer: newAnswers, score } : ans
    );
    setAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    let scoreCalculator = answers[2].score;
    const allAnswered = answers.every((ans, index) => {
      if (index === 2) {
        return ans.score !== 0;
      }
      scoreCalculator = scoreCalculator + ans.score;
      return ans.answer !== '';
    });
    
    if (scoreCalculator < 15){
        setInvestorType("เสี่ยงตํ่า")
    }else if(scoreCalculator <= 15 || scoreCalculator <= 21){
        setInvestorType("เสี่ยงปานกลางค่อนตํ่า")
    }else if(scoreCalculator <= 15 || scoreCalculator <= 21){
        setInvestorType("เสี่ยงปานกลางค่อนสูง")
    }else if(scoreCalculator <= 15 || scoreCalculator <= 21){
        setInvestorType("เสี่ยงสูง")
    }else if(scoreCalculator <= 15 || scoreCalculator <= 21){
        setInvestorType("เสี่ยงสูงมาก")
    }
    setTotalScore(scoreCalculator)
    console.log(answers)
    console.log(allAnswered)
    console.log(totalScore)
  };

  return (
    <div className="">
      <div className="px-16 flex flex-col space-y-8">
        {questions.map((question, questionIndex) => ( questionIndex+1 === 3 ? 
            <Card className="p-4" key={questionIndex}>
                <div className="flex flex-col space-y-4 p-8">
                    <p className="font-bold">{questionIndex + 1}.{question.question}</p>
                    <div className="flex flex-col space-y-4">
                        {question.choices.map((choice, choiceIndex) => (
                            <div className="" key={choiceIndex}>
                            <input
                                type="checkbox"
                                name={`question-${questionIndex}`}
                                id={`question-${questionIndex}-choice-${choiceIndex}`}
                                value={choice}
                                checked={(answers[questionIndex].answer as number[])[choiceIndex] === 1}
                                onChange={() => handleCheckboxChange(questionIndex, choiceIndex)}
                                className="mr-4"
                            />
                            <label htmlFor={`question-${questionIndex}-choice-${choiceIndex}`} className="">
                                {choice}
                            </label>
                            </div>
                        ))}
                    </div>
                </div>
            </Card>  
            :
            <Card className="p-4" key={questionIndex}>
                {
                    questionIndex === 0 && 
                    <div className="flex font-bold text-red-500 text-2xl p-4">
                        <h2>กรุณาเลือกข้อที่ตรงกับท่านมากที่สุดเพื่อท่านจะได้ทราบว่าท่านเหมาะที่จะลงทุนในทรัพย์สินประเภทใด</h2>
                    </div>
                }
                <div className="flex flex-col space-y-4 p-8">
                    <p className="font-bold">{questionIndex + 1}.{question.question}</p>
                    <div className="flex space-x-8">
                        {question.choices.map((choice, choiceIndex) => (
                        <div className="flex" key={choiceIndex}>
                            <input
                                type="radio"
                                name={`question-${questionIndex}`}
                                id={`question-${questionIndex}-choice-${choiceIndex}`}
                                value={choice}
                                checked={answers[questionIndex].answer === choice}
                                onChange={() => handleOptionChange(questionIndex, choice, choiceIndex)}
                                className="mr-4"
                            />
                            <label htmlFor={`question-${questionIndex}-choice-${choiceIndex}`} className="">
                            {choice}
                            </label>
                        </div>
                        ))}
                    </div>
                </div>
            </Card> 
        ))}
        <div className="flex justify-center">
            <Button type="button" className="w-1/6" onClick={handleSubmit}>
                Submit
            </Button>
        </div>
        <div>
        <div className="relative flex w-full m-8">
            <div className="flex w-1/4 flex-col items-center space-y-4 border-l-4 p-8 pt-4">
                <div>
                    <span className="font-bold">ผลคะแนนที่ทำได้</span>
                </div>
                <svg className="w-3/4 h-full" viewBox="0 0 100 100">
                    <>
                        <circle
                            className="text-gray-200 stroke-current"
                            strokeWidth="10"
                            cx="50"
                            cy="50"
                            r="40"
                            fill="transparent"
                        />
                        <circle
                            className="text-slate-800 progress-ring__circle stroke-current transition-all duration-500"
                            strokeWidth="10"
                            strokeLinecap="round"
                            cx="50"
                            cy="50"
                            r="40"
                            fill="transparent"
                            strokeDasharray="251.2"
                            strokeDashoffset={`calc(251.2 - (251.2 * ${totalScore}) / 40)`}
                        />
                        <text x="50" y="50" fontFamily="Verdana" fontSize="12" textAnchor="middle" alignmentBaseline="middle">{totalScore}/40</text>
                    </>
                </svg>
            </div>
            <div className="flex w-1/4 flex-col  space-y-4 border-x-4 p-4">
                <div className="flex justify-center">
                    <span className="font-bold">การวิเคราะห์ผล</span>
                </div>
                <div className="flex justify-center">
                    <span className="text-xl pt-24 text-slate-800">ท่านเป็นนักลงทุนประเภท</span>
                    <span>{investorType}</span>
                </div>
            </div>
            <div className="flex w-2/4 justify-center p-4">
                <div>
                    <span className="font-bold">ประเภทตราสารที่สามารถลงทุนได้</span>
                </div>
                <div>
                    <span></span>
                </div>
            </div>
        </div>
        </div>
      </div>
    </div>
  );
}