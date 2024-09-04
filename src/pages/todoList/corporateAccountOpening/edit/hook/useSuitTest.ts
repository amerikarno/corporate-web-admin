import { useEffect, useRef, useState } from "react";
import { SuitTestResult, TSuitAns, TSuitTest } from "../constants/types";
import axios from "@/api/axios";
import { getCookies } from "@/lib/Cookies";
import { mapScore } from "../constants/variables";
import { AxiosError } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { resetSuit, setSuit } from "@/features/suit/suitSlice";
import { copy, isEmptyObject } from "@/lib/utils";

export function UseSuitTest(corporateCode: string) {
  const suitData = useSelector((state: any) => state.suit);
  const dispatch = useDispatch();
  const [answerSuiteTest, setAnswerSuiteTest] = useState<TSuitAns[]>([]);
  const [quizSuiteTest, setQuizSuiteTest] = useState<TSuitTest[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [typeTwoAns, setTypeTwoAns] = useState<number[]>([0, 0, 0, 0]);
  const [opitionalQuiz, setOpitionalQuiz] = useState<string[]>(["", ""]);
  const [isSubmit, setIsSubmit] = useState(false);
  const additionalQuiz = useRef<boolean[]>([]);

  const mock = {
    corporateCode: "80000022",
    totalScore: 18,
    level: 2,
    invsetorTypeRisk: "Moderate to Low",
    suitTestResult: {
      answer: [
        {
          id: "cd7bc545-b28f-4fd8-b156-c1336fe3c2b0",
          ans: 1,
          type: 1,
          quiz: 1,
        },
        {
          id: "7c807c2f-4bfa-438d-b44a-cfff8a81ac2b",
          ans: 4,
          type: 1,
          quiz: 2,
        },
        {
          id: "b52326a2-8c77-4be9-8a17-5f901f04f767",
          ans: 1,
          type: 1,
          quiz: 3,
        },
        {
          id: "d3d13ec1-ff5e-4177-88dc-341d24c49d68",
          ans: [0, 2, 3, 0],
          type: 2,
          quiz: 4,
        },
        {
          id: "695451aa-b95b-412b-8f6f-9ab322df4d52",
          ans: 1,
          type: 1,
          quiz: 5,
        },
        {
          id: "ff6c0cb1-2952-40e1-a759-a624fa0495c4",
          ans: 3,
          type: 1,
          quiz: 6,
        },
        {
          id: "cb59f6ca-4904-4c2a-9869-e9c4c0dc4afe",
          ans: 1,
          type: 1,
          quiz: 7,
        },

        {
          id: "ee411a9b-8012-42be-903f-1a080f369daf",
          ans: 2,
          type: 1,
          quiz: 8,
        },
        {
          id: "47710e6d-4341-40e3-b699-ba4d98cbb81c",
          ans: 1,
          type: 1,
          quiz: 9,
        },
        {
          id: "59dbea36-94e7-4f67-b728-0a9de7f1cc22",
          ans: 1,
          type: 1,
          quiz: 10,
        },
      ],
      additional: [null, false],
    },
    type: 80000000,
  };

  const validate = () => {
    let err: string[] = [];
    if (quizSuiteTest) {
      for (let i = 0; i < quizSuiteTest.length; i++) {
        const element = quizSuiteTest[i];
        if (!answerSuiteTest?.some((ans) => ans.id === element.id)) {
          err.push(element.id);
        }
      }
      setErrors(err);
      // console.log(err);
    }
    return err.length === 0;
  };

  const errorCheck = (id: string) => {
    if (errors.includes(id)) {
      const rm = errors.filter((list) => list !== id);
      setErrors(rm);
    }
  };

  const handleSubmit = () => {
    if (validate()) {
      const additionData = {
        answer: [...answerSuiteTest],
        additional: [...additionalQuiz.current],
      };
      console.log(additionData);

      let score = 0;
      for (let i = 0; i < answerSuiteTest.length; i++) {
        const element = answerSuiteTest[i];
        if (element.type === 1) {
          if (!Array.isArray(element.ans)) {
            score += element.ans;
          }
        } else {
          if (Array.isArray(element.ans)) {
            const max = Math.max(...element.ans);
            score += max;
          }
        }
      }

      const grade = giveGrade(score);
      const ans = {
        corporateCode: corporateCode,
        totalScore: score,
        level: grade,
        investorTypeRisk: mapScore[grade],
        suitTestResult: additionData,
        type: 80000000,
      };
      console.log(ans);
      // console.log(answerSuiteTest);
      setScore(score);
      setIsSubmit(true);
      dispatch(setSuit(ans));
      saveSuitTest(ans);
    }
  };

  const saveSuitTest = async (ans: any) => {
    console.log(ans);
    try {
      const res = await axios.post("/api/v1/suitetest/result/edit", ans, {
        headers: { Authorization: `Bearer ${getCookies()}` },
      });
      console.log(ans);
      if (res.status === 200) {
        console.log("request success", res.data);
        dispatch(resetSuit());
      } else {
        console.log("save failed");
      }
    } catch (error) {
      console.log(error);
    }
    dispatch(resetSuit());
  };

  const giveGrade = (score: number) => {
    if (score <= 15) {
      return 1;
    } else if (score < 22) {
      return 2;
    } else if (score < 29) {
      return 3;
    } else if (score < 36) {
      return 4;
    } else {
      return 5;
    }
  };

  const handelOptionalQuiz = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name } = e.target;
    let tmp = [...opitionalQuiz];
    tmp[index] = name;
    setOpitionalQuiz(tmp);
    additionalQuiz.current[index] = name === "yes" ? true : false;
  };

  const handleChoice = (
    e: React.ChangeEvent<HTMLInputElement>,
    quizIndex: number,
    choiceIndex: number,
    quizId: string,
    type?: string
  ) => {
    isSubmit ? setIsSubmit(false) : null;
    // const hasSelected = answerSuiteTest?.some((list) => list.id === quizId);
    let tmp = copy(answerSuiteTest);
    if (type === "2") {
      let listChoice = typeTwoAns;
      listChoice[choiceIndex] = e.target.checked ? choiceIndex + 1 : 0;
      tmp[quizIndex] = { id: quizId, ans: listChoice, type: 2, quiz: 1 };
      setAnswerSuiteTest(tmp);
      setTypeTwoAns(listChoice);
      // console.log(rm);
    } else {
      tmp[quizIndex] = { id: quizId, ans: choiceIndex + 1, type: 1, quiz: 1 };
      setAnswerSuiteTest(tmp);
      // console.log(quizIndex + 1, choiceIndex + 1);
    }
    errorCheck(quizId);
  };

  const fetchSuitData = async () => {
    const code = localStorage.getItem("corporateCode");
    console.log(code);
    if (isEmptyObject(suitData)) {
      try {
        const res = await axios.post(
          "/api/v1/corporate/query",
          { corporateCode: corporateCode },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getCookies()}`,
            },
          }
        );
        if (res.status == 200) {
          // const todo = "change all to real data";
          // dispatch(setSuit(mock));
          // return mock;
          console.log(res.data[0].SuitTestResult);
          dispatch(setSuit(res.data.SuitTestResult[0]));
          return res.data;
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      return suitData;
    }
    // // const code = null;
    // const code = localStorage.getItem("corporateCode");
    // if (code && code !== null) {
    //   if (isEmptyObject(suitData)) {
    //     try {
    //       const res = await axios.post(
    //         "/api/v1/corporate/query",
    //         { corporateCode: code },
    //         {
    //           headers: {
    //             "Content-Type": "application/json",
    //             Authorization: `Bearer ${getCookies()}`,
    //           },
    //         }
    //       );
    //       if (res.status == 200) {
    //         const todo = "change all to real data";
    //         dispatch(setSuit(mock));
    //         return mock;
    //       }
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   } else {
    //     return suitData;
    //   }
    // } else {
    //   const empty: SuitTestResult = {};
    //   return empty;
    // }
  };

  const loadSuitTest = async () => {
    try {
      const res = await axios.get("/api/v1/suitetest/getall", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookies()}`,
        },
      });
      if (res.status == 200) {
        setQuizSuiteTest(res.data);
        return true;
      }
      return false;
    } catch (error) {
      if (error instanceof AxiosError) {
        // alert(JSON.stringify(error.response?.data));
      } else {
        console.log(error);
      }
      return false;
    }
  };

  const initData = async () => {
    if (await loadSuitTest()) {
      const data = await fetchSuitData();
      setIsLoading(false);

      console.log(data);
      if (data) {
        let tmpAns = [];
        for (let i = 0; i < data.suitTestResult.answer.length; i++) {
          const element = data.suitTestResult.answer[i];
          const ans = {
            id: element.id,
            quiz: element.quiz,
            ans: element.ans,
            type: element.type,
          };
          tmpAns.push(ans);
        }
        console.log(tmpAns);
        setAnswerSuiteTest(tmpAns);

        let tmpAddition = [];
        for (let i = 0; i < data.suitTestResult.additional.length; i++) {
          const element = data.suitTestResult.additional[i];
          if (element === undefined || element === null) {
            tmpAddition.push("");
          } else {
            tmpAddition.push(element === true ? "yes" : "no");
          }
        }
        setOpitionalQuiz(tmpAddition);
        console.log(tmpAddition);
      }
    }
  };

  useEffect(() => {
    initData();
  }, []);

  return {
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
    fetchSuitData,
    additionalQuiz,
  };
}
