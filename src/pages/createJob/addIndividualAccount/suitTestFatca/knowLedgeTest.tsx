import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

const questionsData = {
    "id": "1",
    "version": "1",
    "items": [
        {
            "id": 1,
            "question": "คริปโทเคอร์เรนซี ทำงานอยู่บนเทคโนโลยีที่ชื่อว่า บล็อกเชน(Blockchain)ทำให้มีความปลอดภัยต่ำ ต้นทุนการทำธุรกรรมสูง ไม่มีความเป็นส่วนตัว",
            "choice_list": [
                "ใช่",
                "ไม่"
            ],
            "ans": 2,
            "ans_detail": "คริปโทเคอร์เรนซี (Cryptocurrency) คือ \"สกุลเงินดิจิทัล\" เกิดจากการรวมศัพท์ 2 คำเข้าไว้ด้วยกัน คือ Cryptography (การเข้ารหัส) และ Currency (สกุลเงิน) ดังนั้น ทางราชบัณฑิตยสภาจึงกำหนดศัพท์บัญญัติของคำนี"
        },
        {
            "id": 2,
            "question": "Stablecoinเป็นคริปทเคอร์เรนซีที่มีการตรึงมูลค่าไว้กับสินทรัพย์ที่มีความมั่นคงใช่หรือไม่",
            "choice_list": [
                "ใช่",
                "ไม่"
            ],
            "ans": 1,
            "ans_detail": "Stablecoin เป็นคริปโทเคอร์เรนซีที่มีการตรึงมูลค่าไว้กับสินทรัพย์ที่มีความมั่นคง เช่น ทองคำ พันธบัตร หรือสกุลเงินต่าง ๆ และมีการรักษามูลค่าให้คงที่ ทำให้มีความผันผวนน้อยกว่าคริปโทเคอร์เรนซีประเภทอื่นจึ"
        },
        {
            "id": 3,
            "question": "ข้อแตกต่างของหุ้นและคริปโทคอร์เรนซีกับโทเคนดิจิทัลคือหุ้นได้รับสิทธิ์ต่าง ๆ เช่น สิทธิ์การโหวต การได้เงินปันผลแต่คริปโทเคอร์เรนซี กับโทเคนดิจิทัล อาจจะมีหรือไม่มีก็ได้",
            "choice_list": [
                "ใช่",
                "ไม่"
            ],
            "ans": 1,
            "ans_detail": "การซื้อหรือถือครองคริปโทเคอร์เรนซี อาจจะทำให้ได้รับสิทธิ์ต่าง ๆ เช่น สิทธิ์ในการนำไปใช้งาน (Utility), สิทธิ์ในการโหวต, สิทธิ์ในการได้รับส่วนแบ่งจากแพลตฟอร์ม เป็นต้น ซึ่งแต่ละเหรียญก็อาจจะมีสิทธิ์ต่าง "
        },
        {
            "id": 4,
            "question": "จุดเด่นของบล็อกเชนคือมีความน่าเชื่อถือในการจัดเก็บข้อสูงและไม่สามารถเปลี่ยนแปลงข้อมูลได้",
            "choice_list": [
                "ใช่",
                "ไม่"
            ],
            "ans": 1,
            "ans_detail": "Blockchain คือเทคโนโลยีจัดเก็บข้อมูล (Data Structure) ที่ไม่มีตัวกลาง ข้อมูลจะถูกแชร์และจัดเก็บเป็นสำเนาไว้ในเครื่องของทุกคนที่ใช้ฐานข้อมูลเดียวกันเสมือนห่วงโซ่ (Chain) โดยทุกคนจะรับทราบร่วมกัน ว่าใคร"
        },
        {
            "id": 5,
            "question": "บล็อกเชนมีความปลอดภัยสูงเพราะข้อมูลทั้งหมดถูกจัดเก็บรักษาไว้ที่เดียว",
            "choice_list": [
                "ใช่",
                "ไม่"
            ],
            "ans": 2,
            "ans_detail": "Blockchain เป็นเทคโนโลยีที่มีความปลอดภัย น่าเชื่อถือ โดยไม่ต้องอาศัยคนกลางมาช่วยทำหน้าที่เป็นคนกลางคอยตรวจสอบความน่าเชื่อถือเวลาทำธุรกรรม ทั้งยังกระจายข้อมูลให้ผู้ที่เกี่ยวข้องสามารถตรวจสอบความถูกต้อง"
        },
        {
            "id": 6,
            "question": "บล็อกเชนอาจจะมีความผิดพลาดจากมนุษย์ (Human Error)ในเรื่องการยืนยันธุรกรรมของการซื้อขาย, โอนคริปโทเคอร์เรนซี",
            "choice_list": [
                "ใช่",
                "ไม่"
            ],
            "ans": 2,
            "ans_detail": "บล็อกเชน (Blockchain) คือ เทคนโนโลยีเก็บข้อมูลแบบกระจายศูนย์ (Decentralized) ที่สามารถยืนยันธุรกรรมการโอน การซื้อขายโดยไม่ต้องมีตัวกลาง ทำให้มีความโปร่งใสและลดความผิดพลาดจากมนุษย์ (Human Error)"
        },
        {
            "id": 7,
            "question": "การเก็บรักษาเหรียญคริปโทเคอร์เรนซีไว้กับผู้ประกอบการที่ได้รับใบอนุญาตในการดำเนินธุรกิจสินทรัพย์ดิจิทัลเป็นการใช้งานกระเป๋า สินทรัพย์ดิจิทัลประเภn Hardware Wallet",
            "choice_list": [
                "ใช่",
                "ไม่"
            ],
            "ans": 2,
            "ans_detail": "Hardware Wallet เป็นการเก็บรักษาสินทรัพย์ดิจิทัลในลักษณะออฟไลน์ ซึ่งผู้ใช้งานอาจมีค่าใช้งานเพิ่มเติมสำหรับอุปกรณ์ในการจัดเก็บ อีกทั้งต้องเก็บรักษา Private Keys ด้วยตนเอง"
        },
        {
            "id": 8,
            "question": "เมื่อผู้ประกอบธุรกิจสินทรัพย์ดิจิทัลมีการฝากสินทรัพย์ดิจิทัลของลูกค้าไว้กับบุคคลที่สามหากผู้ประกอบธุรกิจไม่สามารถ ให้บริการต่อได้สินทรัพย์ของลูกค้าจะยังคงอยู่",
            "choice_list": [
                "ใช่",
                "ไม่"
            ],
            "ans": 1,
            "ans_detail": "ในกรณีที่ผู้ประกอบการมีการเก็บรักษาสินทรัพย์ของลูกค้าไว้กับบุคคลที่สาม ทำให้สินทรัพย์ของลูกค้าได้รับการดูแลจากบุคคลที่สาม และแยกออกจากสินทรัพย์ของผู้ประกอบการ"
        },
        {
            "id": 9,
            "question": "หากต้องการโอนสินทรัพย์ดิจิทัลออกจากกระเป๋าสินทรัพย์ดิจิทัล (Wallet)ลูกค้าจำเป็นต้องตรวจสอบรายละเอียดการโอนให้ถูกต้อง และครบถ้วน เช่นตรวจสอบเครือข่าย Blockchain ที่ต้องการทำธุรกรรม,ตรวจสอบรายละเอียดกระ",
            "choice_list": [
                "ใช่",
                "ไม่"
            ],
            "ans": 1,
            "ans_detail": "ความเสี่ยงที่มักเกิดขึ้นจากการใช้งานกระเป๋าสินทรัพย์ดิจิทัล (Wallet) นั่นคือความเสี่ยงจากความผิดพลาดในการโอนสินทรัพย์ติจิทัล ตัวอย่างเช่นการโอนโดยเลือก Blockchain ที่ใช้ทำธุรกรรมไม่ถูกต้อง, การกรอกราย"
        },
        {
            "id": 10,
            "question": "เหรียญคริปโทเคอร์เรนซีที่มาร์เก็ต แคป (Market Cap) สูงที่สุด ได้แก่เหรียญ Bitcoin (BTC)",
            "choice_list": [
                "ใช่",
                "ไม่"
            ],
            "ans": 1,
            "ans_detail": "เหรียญ Bitcoin (BTC) เป็นเหรียญคริปโทเคอร์เรนซีที่มีมูลค่าตามราคาตลาด (Market Cap) สูงที่สุด ประมาณ 40% ของทั้งตลาด (ข้อมูล ณ วันที่ 16 กันยายน 2565)"
        },
        {
            "id": 11,
            "question": "มีหลายปัจจัยที่ทำให้การลงทุนในตลาดคริปโทเคอร์เรนซีมีความผันผวน เช่นข่าวสารทางเศรษฐกิจ เงิน Fund Flow ไหลเข้าออก สามารถทำธุรกรรมได้ตลอด 24ชั่วโมง, ไม่มีการกำหนดเงื่อนไขการเคลื่อนไหวของราคา เป็นต้น",
            "choice_list": [
                "ใช่",
                "ไม่"
            ],
            "ans": 1,
            "ans_detail": "ความผันผวนของตลาดคริปโทฯ เกิดขึ้นจากหลายปัจจัย ทั้งปัจจัยที่เกิดขึ้นโดยตรงกับเหรียญคริปโทนั้น, ปัจจัยที่มากระทบกับเหรียญคริปโทฯ ที่มีขนาดใหญ่ หรือแม้กระทั่งปัจจัยจากภาพรวมเศรษฐกิจ นอกจากนั้นตลาดคริปโท"
        },
        {
            "id": 12,
            "question": "รายละเอียดและความคืบหน้าของการพัฒนาโปรเจกต์อาจส่งผลกระทบทั้งเชิงบวกและเชิงลบต่อราคาเหรียญคริปโทฯ",
            "choice_list": [
                "ใช่",
                "ไม่"
            ],
            "ans": 1,
            "ans_detail": "หนึ่งในปัจจัยที่ส่งผลกระทบโดยตรงต่อราคาซื้อและราคาขายเหรียญคริปโทฯ นั่นคือ รายละเอียดและความคืบหน้าของการพัฒนาโปรเจกต์ ซึ่งอาจเป็นได้ทั้งเชิงบวกและเชิงลบต่อราคาเหรียญคริปโทฯ"
        },
        {
            "id": 13,
            "question": "Market Cap ของ Bitcoin (BTC) คือการนำมูลค่าที่ควรจะเป็นคูณกับราคาปัจจุบัน (Fair Value X Price) ใช่หรือไม่",
            "choice_list": [
                "ใช่",
                "ไม่"
            ],
            "ans": 2,
            "ans_detail": "Market Cap ของคริปโทเคอร์เรนซีคำนวณจากจำนวนเหรียญ คูณกับราคาปัจจุบัน เพื่อที่จะได้เห็นถึงขนาดหรือมูลค่าของเหรียญนั้นว่าใหญ่หรือเล็กเท่าไหร่ ดังนั้นจะเห็นว่า Market Cap ขึ้นอยู่กับเพียง 2 ปัจจัย เท่านั"
        },
        {
            "id": 14,
            "question": "คริปโทเคอร์เรนซีมีราคาผันผวนสูงสาเหตุหนึ่งเพราะตลาดคริปโทเคอร์เรนซีไม่มีเพดาน Ceiling Floor และ CircuitBreaker ส่งผลให้ราคา สามารถเปลี่ยนแปลงได้ตลอดเวลา",
            "choice_list": [
                "ใช่",
                "ไม่"
            ],
            "ans": 1,
            "ans_detail": "นักลงทุนควรมีการกระจายความเสี่ยง (Diversification) และไม่ควรลงทุนแบบ All in ในสินทรัพย์นั้น ๆ เพื่อลดโอกาสขาดทุนหนักหรือหมดตัวในที่สุด"
        },
        {
            "id": 15,
            "question": "การ AII Inหรือทุ่มเงินหมดหน้าตักในเหรียญที่มีอนาคตจะสร้างผลตอบแทนได้ยั่งยืนเพราะโอกาสสร้างตัวไม่ได้มีมาบ่อย ๆ",
            "choice_list": [
                "ใช่",
                "ไม่"
            ],
            "ans": 2,
            "ans_detail": "ราคาคริปโทเคอร์เรนซีสามารถเปลี่ยนแปลงได้มากกว่า 20-30% ต่อวัน เนื่องจากราคาเหรียญคริปโทฯ ขึ้นอยู่กับปัจจัยด้านข่าวสาร, สถานการณ์โลกและตลาดมีการซื้อขาย ตลอดเวลาโดยปราศจาก Ceiling Floor และ Circuit Brea"
        }
    ]
}

type KnowLedgeTestProps = {
    onTestSuccess: (success: boolean) => void;
};

type AnswersType = {
    [key: number]: number;
  };

  export default function KnowLedgeTest({ onTestSuccess }: KnowLedgeTestProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [answers, setAnswers] = useState<AnswersType>({});
    const [highlightedQuestion, setHighlightedQuestion] = useState<number | null>(null);
    const totalPages = Math.ceil(questionsData.items.length / 5);
    const totalQuestions = questionsData.items.length;
    const answeredQuestionsCount = Object.keys(answers).length;


    const handleNext = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
        setHighlightedQuestion(null);
    };

    const handlePrev = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
        setHighlightedQuestion(null);
    };

    const handleDone = () => {
        let firstWrongPage = null;
        let firstWrongQuestionId = null;

        for (let page = 1; page <= totalPages; page++) {
            const startIndex = (page - 1) * 5;
            const questionsOnPage = questionsData.items.slice(startIndex, startIndex + 5);

            for (let question of questionsOnPage) {
                if (answers[question.id] !== question.ans) {
                    firstWrongPage = firstWrongPage || page;
                    firstWrongQuestionId = firstWrongQuestionId || question.id;
                    break;
                }
            }

            if (firstWrongPage) break;
        }

        if (firstWrongPage) {
            setCurrentPage(firstWrongPage);
            setHighlightedQuestion(firstWrongQuestionId);
        } else {
            onTestSuccess(true);
            console.log("All Answer Corrected!")
        }
    };

    const handleAnswerChange = (questionId: number, answer: number) => {
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: answer,
        }));
        setHighlightedQuestion(null);
    };

    const renderQuestions = () => {
        const startIndex = (currentPage - 1) * 5;
        const questionsOnPage = questionsData.items.slice(startIndex, startIndex + 5);

        return questionsOnPage.map((question) => (
            <div key={question.id} className={`my-4 ${highlightedQuestion === question.id ? 'bg-red-100' : ''}`}>
                <div className="font-bold">{question.id}.{question.question}</div>
                <div className="space-y-2 p-3">
                    {question.choice_list.map((choice, index) => (
                        <div key={index} className="space-x-2">
                            <input
                                type="radio"
                                id={`knowledge-question-${question.id}-choice-${index}`}
                                name={`knowledge-question-${question.id}`}
                                value={index + 1}
                                checked={answers[question.id] === index + 1}
                                onChange={() => handleAnswerChange(question.id, index + 1)}
                            />
                            <label htmlFor={`knowledge-question-${question.id}-choice-${index}`}>{choice}</label>
                        </div>
                    ))}
                </div>
            </div>
        ));
    };

    return (
        <div className="space-y-8 mt-8">
            <div className="flex items-center gap-4">
                <div className="rounded-full h-3 w-full bg-neutral-200 dark:bg-neutral-600">
                    <div
                        className="rounded-full h-3 bg-primary transition-all"
                        style={{ width: `${(answeredQuestionsCount / totalQuestions) * 100}%`, transitionDuration: "300ms" }}
                    ></div>
                </div>
                <div className="border rounded-full p-5 bg-primary text-neutral-200 font-bold text-lg">
                    {answeredQuestionsCount}/{totalQuestions}
                </div>
            </div>
            <div className="mx-16 mt-16">
                <div className="text-xl font-bold text-slate-800">แบบประเมินความเหมาะสมในการลงทุน</div>
            </div>
            <Card>
                <CardContent>
                    <div className="p-4 space-y-4 pr-8 pl-8 flex flex-col">
                        <div id={`page-${currentPage}`}>
                            {renderQuestions()}
                        </div>
                        <div className="flex justify-between">
                            <Button onClick={handlePrev} disabled={currentPage === 1}>Previous</Button>
                            {currentPage < totalPages ? (
                                <Button onClick={handleNext}>Next</Button>
                            ) : (
                                <Button onClick={handleDone}>Done</Button>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}