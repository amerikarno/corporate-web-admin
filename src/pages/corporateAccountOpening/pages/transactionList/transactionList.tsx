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
  const [triggerSubmit, setTriggerSubmit] = useState<boolean>(true);
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

  const handleSubmit = () => {
    const dataToSend = listOfTransaction
      .map((transaction) => ({
        transactionId: transaction.id,
        checkerStatus:
          checkboxStatus[transaction.id]?.checkerStatus === true
            ? true
            : checkboxStatus[transaction.id]?.checkerStatus === false
            ? false
            : undefined,
      }))
      .filter((data) => data.checkerStatus !== undefined);

    console.log(dataToSend);

    axios
      .post("/api/v1/transaction/order/update", dataToSend, {
        headers: {
          Authorization: `Bearer ${getCookies()}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("Data submitted successfully ", response);
        } else {
          console.error("Failed to submit data");
        }
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
      });
  };

  const fetchListOfTransaction = async () => {
    try {
      const token = getCookies();
      const res = await axios.get("/api/v1/transaction/order/get/approve", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        const transactions: TTransaction[] = res.data.map((item: any) => {
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
        console.error("Failed to fetch corporate codes");
      }
    } catch (error) {
      console.error("Error fetching corporate codes:", error);
    }
  };

  useEffect(() => {
    fetchListOfTransaction();
    if (triggerSubmit) {
      setTriggerSubmit(false);
    }
  }, [triggerSubmit]);

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
      name: "Decline",
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
              setTriggerSubmit(true);
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
