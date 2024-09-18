import axios from "@/api/axios";
import { Card } from "@/components/ui/card";
import { getCookies } from "@/lib/Cookies";
import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { Button } from "@/components/ui/button";

type TTransaction = {
  id: string;
  buyCurrency: number;
  corporateCode: number;
  exchangeSpread: number;
  operationSpread: number;
  exchangeRate: number;
  transactionStatus?: number;
  exchange: string;
};

const FxExchangeTransactionList = () => {
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
      const response = await axios.post(
        "/api/v1/transaction/exchange/review",
        dataToSend,
        {
          headers: {
            Authorization: `Bearer ${getCookies()}`,
          },
        }
      );

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
      const res = await axios.get(
        "/api/v1/transaction/exchange/get/corporate",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
            // console.log(item);
            return {
              id: item.id,
              buyCurrency: item.buyCurrency/100000,
              corporateCode: item.corporateCode,
              exchangeSpread: item.exchangeSpread/100000,
              operationSpread: item.operationSpread/100000,
              exchangeRate: item.exchangeRate/100000,
              transactionStatus: item.transactionStatus,
              exchange: item.exchange,
            };
          });
        setFetchedListOfTransaction(transactions);
        // console.log(transactions);
      } else {
        console.error("Failed to fetch bank list codes");
      }
    } catch (error) {
      console.error("Error fetching bank list:", error);
    }
  };

  useEffect(() => {
    fetchListOfTransaction();
  }, []);

  const getStatus = (status?: number) => {
    // console.log(typeof status, status);
    if (status === -1) {
      return "Reject";
    } else if (status === 0) {
      return "Pending";
    } else if (status === 1) {
      return "Checked";
    } else if (status === 2) {
      return "Approved";
    } else {
      return "";
    }
  };

  const isDisabled = (status?: number) => {
    if (status === -1) {
      return true;
    } else {
      return false;
    }
  };

  const columnsContactPerson: TableColumn<TTransaction>[] = [
    {
      name: "Transaction ID",
      selector: (row: TTransaction) => row.id || "",
    },
    {
      name: "Corporate Code",
      selector: (row: TTransaction) => row.corporateCode || "",
    },
    // {
    //   name: "Buy Amount",
    //   selector: (row: TTransaction) => row.buyCurrency || "",
    // },
    {
      name: "Exchange Pairs",
      selector: (row: TTransaction) => row.exchange || "",
    },
    {
      name: "Exchange Rate",
      selector: (row: TTransaction) => row.exchangeRate || "",
    },
    {
      name: "Exchange Spread",
      selector: (row: TTransaction) => row.exchangeSpread || "",
    },
    {
      name: "Operation Spread",
      selector: (row: TTransaction) => row.operationSpread || "",
    },
    {
      name: "Status",
      selector: (row: TTransaction) => getStatus(row.transactionStatus) || "",
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
          // disabled={user.user && user.user!.roles!.includes(13) ? false : true}
          disabled={isDisabled(row.transactionStatus)}
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
          // disabled={user.user && user.user!.roles!.includes(13) ? false : true}
          disabled={isDisabled(row.transactionStatus)}
        />
      ),
      ignoreRowClick: true,
    },
  ];

  return (
    <div className="p-4 space-y-8">
      <Card>
        <DataTable
          title="List of FX Exchange"
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

export default FxExchangeTransactionList;
