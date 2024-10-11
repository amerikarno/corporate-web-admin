import { useState } from "react";
import "./AccountApproval.css"
import DataTable, { TableColumn } from "react-data-table-component";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaXmark } from "react-icons/fa6";
import { FaInfoCircle } from "react-icons/fa";

type TListOfAccount = {
    accountId:string;
}
const AccountApproval = () => {

    const mockedAccount = [
        {
            accountId:"1"
        },
        {
            accountId:"2"
        },
        {
            accountId:"3"
        }
    ]

    const [currentAccountId, setCurrentAccountId] = useState<string | null>(null);
    const [rejectionReason, setRejectionReason] = useState<string>("");
    const [displayBox,setDisplayBox] = useState(false);
    const [checkboxStatus, setCheckboxStatus] = useState<{
        [accountId: string]: { checkerStatus: boolean | undefined , reason?:string};
      }>({});

    const handleSubmitRejection = () => {
        if (currentAccountId) {
          setCheckboxStatus((prevStatus) => ({
            ...prevStatus,
            [currentAccountId]: {
              ...prevStatus[currentAccountId],
              reason: rejectionReason,
            },
          }));
          setRejectionReason("");
          setDisplayBox(false);
          setCurrentAccountId(null);
        }
      };

    const handleCheckboxChange = (
        accountId: string,
        type: "approve" | "decline",
        checked: boolean,
      ) => {
          setCheckboxStatus((prevStatus: { [accountId: string]: { checkerStatus: boolean | undefined } }) => {
          const currentStatus = prevStatus[accountId]?.checkerStatus;
          setDisplayBox(type === "decline" && checked);
          setCurrentAccountId(accountId);
          let newStatus;
          if (type === "approve") {
            newStatus = checked
              ? true
              : currentStatus === true
              ? undefined
              : currentStatus;
          } else if (type === "decline") {
            newStatus = checked
              ? false
              : currentStatus === false
              ? undefined
              : currentStatus;
          }
    
          return {
            ...prevStatus,
            [accountId]: {
              checkerStatus: newStatus,
            },
          };
        });
      };

    const columnsList: TableColumn<TListOfAccount>[] = [
        {
          name: "Account ID",
          selector: (row: TListOfAccount) => row.accountId || "",
        },
        {
          name: "Approve",
          cell: (row: TListOfAccount) => (
            <input
              type="checkbox"
              checked={checkboxStatus[row.accountId]?.checkerStatus === true}
              onChange={(e) =>
                handleCheckboxChange(row.accountId, "approve", e.target.checked)
              }
            />
          ),
          ignoreRowClick: true,
        },
        {
          name: "Reject",
          cell: (row: TListOfAccount) => (
            <div className="relative flex items-center">
                <input
                  data-testid={`reject-${row.accountId}`}
                  type="checkbox"
                  checked={checkboxStatus[row.accountId]?.checkerStatus === false}
                  onChange={(e) =>
                    handleCheckboxChange(row.accountId, "decline", e.target.checked)
                  }
                />
                {checkboxStatus[row.accountId]?.reason &&<div className="flex items-center space-x-2 p-2 bg-white absolute md:w-80 overflow-hidden h-auto -top-3 left-10 whitespace-nowrap text-ellipsis reasonbox">
                    <span className="font-bold gap-1 flex items-center"><FaInfoCircle />Reason </span>
                    <span className="text-slate-800">{checkboxStatus[row.accountId]?.reason}</span>
                </div>}
            </div>
          ),
          ignoreRowClick: true,
        },
      ];

      const handleSubmit = async () => {
        console.log(checkboxStatus)
      }
      return (
        <div className={`h-[45rem] ${displayBox ? "space-y-2 px-4 pt-2" : "space-y-8 p-4"}`}>
            {displayBox && (
                <div className={`overlay ${displayBox ? "visible" : ""}`}>
                    <div className="popup z-5 space-y-4">
                        <div className="absolute right-4 cursor-pointer hover:text-gray-500" onClick={()=>{setDisplayBox(false)}}>
                            <FaXmark />
                        </div>
                        <span>Reason for rejection</span>
                        <div className="w-full">
                            <input className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" 
                            placeholder="Type here..."
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-end">
                            <Button onClick={handleSubmitRejection}>Submit</Button>
                        </div>
                    </div>
                </div>
            )}
            <Card className="h-full">
                <DataTable
                    title="Account Approval Page"
                    columns={columnsList}
                    data={mockedAccount}
                    clearSelectedRows
                />
                <div className="flex justify-end gap-4 p-8">
                    <Button
                        onClick={() => {
                            handleSubmit();
                        }}
                    >
                        Submit
                    </Button>
                </div>
            </Card>
        </div>
    )
}

export default AccountApproval
