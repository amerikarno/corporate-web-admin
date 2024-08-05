import { useEffect, useState } from "react";
import { TSuitAns, TSuitTest } from "../constants/types";
import axios from "@/api/axios";
import { getCookies } from "@/lib/Cookies";
import { mapScore } from "../constants/variables";
import { AxiosError } from "axios";

export function UseSuitTest(corporateCode: string) {
  const [answerSuiteTest, setAnswerSuiteTest] = useState<TSuitAns[]>([]);
  const [quizSuiteTest, setQuizSuiteTest] = useState<TSuitTest[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState<string[]>([]);
  const [score, setScore] = useState(0);

  const validate = () => {
    if (quizSuiteTest) {
      let err: string[] = [];
      for (let i = 0; i < quizSuiteTest.length; i++) {
        const element = quizSuiteTest[i];
        if (!answerSuiteTest?.some((ans) => ans.id === element.id)) {
          err.push(element.id);
        }
      }
      setErrors(err);
      console.log(err);
    }
  };

  const errorCheck = (id: string) => {
    if (errors.includes(id)) {
      const rm = errors.filter((list) => list !== id);
      setErrors(rm);
    }
  };

  const handleSubmit = () => {
    validate();

    let score = 0;
    answerSuiteTest.forEach((element) => {
      score += element.ans + 1;
    });

    const grade = giveGrade(score);
    const ans = {
      corporateCode: corporateCode,
      totalScore: score,
      level: grade,
      invsetorTypeRisk: mapScore[grade],
    };
    console.log(ans);
    setScore(score);
    saveSuitTest(ans);
  };

  const saveSuitTest = async (ans: any) => {
    try {
      const res = await axios.post("/api/v1/suitetest/result", ans, {
        headers: { Authorization: `Bearer ${getCookies()}` },
      });
      if (res.status === 200) {
        console.log("request success", res.data);
      } else {
        console.log("save failed");
      }
    } catch (error) {
      console.log(error);
    }
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

  const handleAnswerSuiteTest = (index: number, quizId: string) => {
    const hasSelected = answerSuiteTest?.some((list) => list.id === quizId);
    if (hasSelected) {
      let rm = answerSuiteTest?.filter((list) => list.id !== quizId);
      rm.push({ id: quizId, ans: index });
      setAnswerSuiteTest(rm);
    } else {
      setAnswerSuiteTest([
        ...answerSuiteTest,
        {
          id: quizId,
          ans: index,
        },
      ]);
    }
    errorCheck(quizId);
  };

  const loadSuitTest = async () => {
    try {
      const res = await axios.get("/api/v1/suitetest/getall", {
        headers: { Authorization: `Bearer ${getCookies()}` },
      });
      if (res.status == 200) {
        setQuizSuiteTest(res.data);
      }
      setIsLoading(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(JSON.stringify(error.response?.data));
      } else {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    loadSuitTest();
  }, []);

  return {
    answerSuiteTest,
    quizSuiteTest,
    handleAnswerSuiteTest,
    isLoading,
    handleSubmit,
    errors,
    score,
  };
}
