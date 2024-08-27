import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { clearCorporateData } from "@/features/editCorporateData/editCorporateData";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

type TSuitTableResult = {
  totalScore: number;
};
export function SuitTableResult({ totalScore }: TSuitTableResult) {
  const borderTable = "border border-gray-300 p-2 text-center";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDone = () =>{
      localStorage.clear();
      dispatch(clearCorporateData());
      navigate(`/create-job/added-corporate-account`);
  }
  return (
    <Card>
      <CardHeader>
        <h1 className="text-2xl font-bold">For Staff</h1>
      </CardHeader>
      <CardContent className="space-y-10">
        <div>
          <h1 className="text-blue-400 pb-2">Part 1 : Assessment Scores</h1>
          <p>
            Answer 1 = 1 point Answer 2 = 2 point Answer 3 = 3 point Answer 4 =
            4 point
          </p>
          <p>
            For Suitabilty Assessment No.4, if selected more than one answer,
            the highest score of the answer will be selected.
          </p>
        </div>

        <div>
          <h1 className="text-blue-400 pb-2">Part 2 : Assessment Result</h1>
          <table className="w-full">
            <thead>
              <tr>
                <th className={borderTable}>Total Score</th>
                <th className={borderTable}>Level</th>
                <th className={borderTable}>Investor Type of Risk</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={borderTable}>Below 15</td>
                <td className={borderTable}>1</td>
                <td className={borderTable}>Low</td>
              </tr>
              <tr>
                <td className={borderTable}>15-21</td>
                <td className={borderTable}>2</td>
                <td className={borderTable}>Moderate to Low</td>
              </tr>
              <tr>
                <td className={borderTable}>22-29</td>
                <td className={borderTable}>3</td>
                <td className={borderTable}>Moderate to high</td>
              </tr>
              <tr>
                <td className={borderTable}>30-36</td>
                <td className={borderTable}>4</td>
                <td className={borderTable}>high</td>
              </tr>
              <tr>
                <td className={borderTable}>Above 37</td>
                <td className={borderTable}>5</td>
                <td className={borderTable}>very high</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>
          <h1 className="text-blue-400 pb-2">Part 3: Basic Asset Allocation</h1>
          <div className="w-full text-center border-t border-l border-r border-gray-300 font-bold p-2">
            Asset Allocation
          </div>
          <table className="w-full">
            <thead>
              <tr>
                <th className={borderTable}>Invsetor Type of Risk</th>
                <th className={borderTable}>
                  Deposit and Short-Term Fixed Income Funds
                </th>
                <th className={borderTable}>Long-Term FIed Income</th>
                <th className={borderTable}>Debenture</th>
                <th className={borderTable}>Equity FUnd</th>
                <th className={borderTable}>Other Options</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={borderTable}>Low</td>
                <td
                  className="text-center border-b border-gray-300"
                  colSpan={2}
                >
                  &gt;60%
                </td>
                <td className={borderTable}>&lt;20%</td>
                <td className={borderTable}>&lt;10%</td>
                <td className={borderTable}>&lt;5%</td>
              </tr>
              <tr>
                <td className={borderTable}>Moderate to Low</td>
                <td className={borderTable}>&lt;20%</td>
                <td
                  className="text-center border-b border-gray-300"
                  colSpan={2}
                >
                  &lt;70%
                </td>
                <td className={borderTable}>&lt;20%</td>
                <td className={borderTable}>&lt;10%</td>
              </tr>
              <tr>
                <td className={borderTable}>Moderate to High</td>
                <td className={borderTable}>&lt;10%</td>
                <td
                  className="text-center border-b border-gray-300"
                  colSpan={2}
                >
                  &lt;60%
                </td>
                <td className={borderTable}>&lt;30%</td>
                <td className={borderTable}>&lt;10%</td>
              </tr>
              <tr>
                <td className={borderTable}>High</td>
                <td className={borderTable}>&lt;10%</td>
                <td
                  className="text-center border-b border-gray-300"
                  colSpan={2}
                >
                  &lt;40%
                </td>
                <td className={borderTable}>&lt;40%</td>
                <td className={borderTable}>&lt;20%</td>
              </tr>
              <tr>
                <td className={borderTable}>Very High</td>
                <td className={borderTable}>&lt;5%</td>
                <td
                  className="text-center border-b border-gray-300"
                  colSpan={2}
                >
                  &lt;30%
                </td>
                <td className={borderTable}>&gt;60%</td>
                <td className={borderTable}>&lt;30%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="space-y-2">
          <p>
            <span className="text-red-500">*</span>
            Including consumer product and derivatives products
          </p>
          <div className="flex flex-row space-x-6">
            <p>Total Scores</p>
            <div className="w-[100px] border border-green-300 flex justify-center">
              {totalScore}
            </div>
          </div>
        </div>
        <div className="flex justify-end relative">
          <Button className="absolute top-20 right-0 w-24 " onClick={handleDone}>Done</Button>
        </div>
      </CardContent>
    </Card>
  );
}
