import axios from "@/api/axios";
import { Card } from "@/components/ui/card";
import { getCookies } from "@/lib/Cookies";
import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { TTransaction } from "./constant/type";
import { Button } from "@/components/ui/button";

const TransactionList = () => {
  const [listOfTransaction, setFetchedListOfTransaction] = useState<
    TTransaction[]
  >([]);
  const [checkboxStatus, setCheckboxStatus] = useState<{
    [transactionId: string]: { checkerStatus: boolean | undefined };
  }>({});
  const handleCheckboxChange = (
    transactionId: string,
    type: "approve" | "decline",
    checked: boolean
  ) => {
    setCheckboxStatus((prevStatus) => {
      const currentStatus = prevStatus[transactionId]?.checkerStatus;

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
        [transactionId]: {
          checkerStatus: newStatus,
        },
      };
    });
  };

  const handleSubmit = async () => {
    const dataToSend = listOfTransaction
      .map((transaction) => ({
        transactionId: transaction.id,
        ReviewStatus:
          checkboxStatus[transaction.id]?.checkerStatus === true
            ? true
            : checkboxStatus[transaction.id]?.checkerStatus === false
            ? false
            : undefined,
      }))
      .filter((data) => data.ReviewStatus !== undefined);
  
    console.log(dataToSend);
  
    try {
      const response = await axios.post("/api/v1/transaction/order/review", dataToSend, {
        headers: {
          Authorization: `Bearer ${getCookies()}`,
        },
      });
  
      if (response.status === 200) {
        console.log("Data submitted successfully ", response);
  
        const updatedListOfTransaction = listOfTransaction.filter(
          (transaction) =>
            !dataToSend.some((data) => data.transactionId === transaction.id)
        );
        setFetchedListOfTransaction(updatedListOfTransaction);
  
        setCheckboxStatus((prevStatus) => {
          const updatedStatus = { ...prevStatus };
          dataToSend.forEach((data) => {
            delete updatedStatus[data.transactionId];
          });
          return updatedStatus;
        });
      } else {
        console.error("Failed to submit data");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };
  

  const fetchListOfTransaction = async () => {
    try {
      const token = getCookies();
      const res = await axios.get("/api/v1/transaction/order/get", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        console.log(res.data);
        const data = res.data ?? [];
        const seenIds = new Set();
        const transactions: TTransaction[] = data
          .filter((item: any) => {
            if (seenIds.has(item.id)) {
              return false;
            } else {
              seenIds.add(item.id);
              return true;
            }
          })
          .map((item: any) => {
            console.log(item);
            return {
              id: item.id || "",
              corporateCode: item.corporateCode || 0,
              operations: item.operations || "",
              cryptoAmount: item.cryptoAmount || 0,
              cryptoPrice: item.cryptoPrice || 0,
              currency: item.currency || "",
              fiatAmount: item.fiatAmount || 0,
              pair: item.pair || "",
            };
          });
        setFetchedListOfTransaction(transactions);
      } else {
        console.error("Failed to fetch order list codes");
      }
    } catch (error) {
      console.error("Error fetching order list:", error);
    }
  };

  useEffect(() => {
    fetchListOfTransaction();
  }, []);

  console.log(listOfTransaction);

  const columnsContactPerson: TableColumn<TTransaction>[] = [
    {
      name: "Transaction ID",
      selector: (row: TTransaction) => row.id || "",
    },
    {
      name: "Corporate Code",
      selector: (row: TTransaction) => row.corporateCode || "",
    },
    {
      name: "Buy/Sell",
      selector: (row: TTransaction) => row.operations || "",
    },
    {
      name: "Crypto Amount",
      selector: (row: TTransaction) => row.cryptoAmount || "",
    },
    {
      name: "Crypto Price",
      selector: (row: TTransaction) => row.cryptoPrice || "",
    },
    {
      name: "Fiat Amount",
      selector: (row: TTransaction) => row.fiatAmount || "",
    },
    {
      name: "Trading Pairs",
      selector: (row: TTransaction) => row.pair || "",
    },
    {
      name: "Currency",
      selector: (row: TTransaction) => row.currency || "",
    },
    {
      name: "Approve",
      cell: (row: TTransaction) => (
        <input
          type="checkbox"
          checked={checkboxStatus[row.id]?.checkerStatus === true}
          onChange={(e) =>
            handleCheckboxChange(row.id, "approve", e.target.checked)
          }
        />
      ),
      ignoreRowClick: true,
    },
    {
      name: "Reject",
      cell: (row: TTransaction) => (
        <input
          type="checkbox"
          checked={checkboxStatus[row.id]?.checkerStatus === false}
          onChange={(e) =>
            handleCheckboxChange(row.id, "decline", e.target.checked)
          }
        />
      ),
      ignoreRowClick: true,
    },
  ];

  return (
    <div className="p-4 space-y-8">
      <Card>
        <DataTable
          title="List of Transactions"
          columns={columnsContactPerson}
          data={listOfTransaction}
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
  );
};

export default TransactionList;
