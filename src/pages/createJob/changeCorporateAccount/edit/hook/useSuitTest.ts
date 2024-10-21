import { useEffect, useRef, useState } from "react";
import { SuitTestResult, TSuitAns, TSuitTest } from "../constants/types";
import axios from "@/api/axios";
import { getCookies } from "@/lib/Cookies";
import { mapScore } from "../constants/variables";
import { AxiosError } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { resetSuit, setSuit } from "@/features/suit/suitSlice";
import { copy, isEmptyObject } from "@/lib/utils";
import { RootState } from "@/app/store";
import { TCorporateData } from "../../constant/type";
import { setCorporateData } from "@/features/editCorporateData/editCorporateData";

export function useSuitTest() {
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
  const [isSave, setIsSave] = useState(false);
  const corporatesInfo = useSelector<RootState, TCorporateData>(
    (state) => state.editCorporate
  ) as TCorporateData;

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

  const handleSubmit = async () => {
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
        registerId: corporatesInfo.registerId.toString(),
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
      await saveSuitTest(ans);
    }
  };

  const saveSuitTest = async (ans: any) => {
    console.log(ans);
    const url = isSave
      ? "/api/v1/suitetest/result/edit"
      : "/api/v1/suitetest/result/save";
    try {
      const res = await axios.post(url, ans, {
        headers: { Authorization: `Bearer ${getCookies()}` },
      });
      console.log(ans);
      if (res.status === 200) {
        console.log("request success", res.data);
        dispatch(resetSuit());
        setIsSave(true);
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
    console.log(name);
    let tmp = [...opitionalQuiz];
    tmp[index] = name;
    setOpitionalQuiz(tmp);
    additionalQuiz.current[index] = name === "yes" ? true : false;
    console.log(additionalQuiz.current);
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
      tmp[quizIndex] = {
        id: quizId,
        ans: listChoice,
        type: 2,
        quiz: quizIndex + 1,
      };
      setAnswerSuiteTest(tmp);
      setTypeTwoAns(listChoice);
      // console.log(rm);
    } else {
      tmp[quizIndex] = {
        id: quizId,
        ans: choiceIndex + 1,
        type: 1,
        quiz: quizIndex + 1,
      };
      setAnswerSuiteTest(tmp);
      // console.log(quizIndex + 1, choiceIndex + 1);
    }
    errorCheck(quizId);
  };

  const fetchSuitData = async () => {
    const code = localStorage.getItem("registerId");
    if (code && code !== null) {
      if (isEmptyObject(suitData)) {
        try {
          const res = await axios.post(
            "/api/v1/corporate/query",
            { registerId: code },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getCookies()}`,
              },
            }
          );
          if (res.status == 200) {
            dispatch(setSuit(res.data[0].SuitTestResult));
            dispatch(setCorporateData(res.data[0]));
            return res.data[0].SuitTestResult;
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        return suitData;
      }
    } else {
      const empty: SuitTestResult = {};
      return empty;
    }
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

      if (data && data !== null) {
        let tmpAns = [];
        if (
          data.suitTestResult.answer !== undefined &&
          data.suitTestResult.answer !== null
        ) {
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
        }
        setAnswerSuiteTest(tmpAns);

        let tmpAddition = [];
        let additional: boolean[] = [];
        if (
          data.suitTestResult.additional !== undefined &&
          data.suitTestResult.additional !== null
        ) {
          for (let i = 0; i < data.suitTestResult.additional.length; i++) {
            const element = data.suitTestResult.additional[i];
            if (element === undefined || element === null) {
              tmpAddition.push("");
              additional.push(false);
            } else {
              tmpAddition.push(element === true ? "yes" : "no");
              additional.push(element === true ? true : false);
            }
          }
        }
        setOpitionalQuiz(tmpAddition);
        additionalQuiz.current = additional;
        console.log(tmpAddition);
        console.log(additionalQuiz.current);
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
    corporatesInfo,
  };
}
