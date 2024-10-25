import axios from "@/api/axios";
import { Input } from "@/components/Input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card"
import { getCookies } from "@/lib/Cookies";
import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { FaBackward, FaForward, FaSearch } from "react-icons/fa";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

type TSearchBody = {
    corporateCode?: string;
    accountId?:string;
    page?:number;
}

type TSearchAccount = {

}

// type TCorporateTable = {
//     corporateCode:string;
//     juristicName:string;
//     taxId:string;
// }

type TAccountTable = {
    customerCode:string;
    name:string;
    citizenId:string;
    isLock:boolean;
}

type CustomPaginationProps = {
    rowsPerPage: number;
    rowCount: number;
    onChangePage: (page: number, totalRows: number) => void;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  }

  const CustomLoader = () => (
    <div className="flex justify-center items-center p-4">
        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-900" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span className="ml-4 text-[#082c14]">Loading...</span>
    </div>
);

const AccountLockUnLock = () => {

    const [customerCodeInput,setCustomerCodeInput] = useState("");
    const [customerCodeList,setCustomerCodeList] = useState<TAccountTable[]>([]);
    const [customerData, setCustomerData] = useState<TAccountTable[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [total,setTotal] = useState(1);
    const [loading, setLoading] = useState(false);

    const handleLock = async (row: TAccountTable) => {
      let body = {
          customerCode: row.customerCode,
          isLock: false
      };
      console.log(body);
      try {
          const res = await axios.post("/api/v1/user/lock", body, {
              headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${getCookies()}`,
              },
          });
          if (res.status === 200) {
              console.log("lock success", res);
              setLoading(true);
              fetchTableData(currentPage).then(() =>{
                  setLoading(false);
              });  
          } else {
              console.log("lock not success", res);
          }
      } catch (error) {
          console.log("lock error", error);
      }
  };

  const handleUnLock = async (row: TAccountTable) => {
    let body = {
        customerCode: row.customerCode,
        isLock: true
    };
    console.log(body);
    try {
        const res = await axios.post("/api/v1/user/lock", body, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getCookies()}`,
            },
        });
        if (res.status === 200) {
            console.log("unlock success", res);
            setLoading(true);
            fetchTableData(currentPage).then(() =>{
                setLoading(false);
            }); 
        } else {
            console.log("unlock not success", res);
        }
    } catch (error) {
        console.log("unlock error", error);
    }
};

    const mockedCustomerData: TAccountTable[] = [
      {
          "customerCode": "90000003",
          "name": "เกตเต้อ-ชื่อ เกตเต้อ-นามสกุล",
          "citizenId": "1103703348990",
          "isLock": false
      },
      {
          "customerCode": "90000002",
          "name": "เกตเต้อ-ชื่อ เกตเต้อ-นามสกุล",
          "citizenId": "1103703348990",
          "isLock": false
      },
      {
          "customerCode": "90000001",
          "name": "เกตเต้อ-ชื่อ เกตเต้อ-นามสกุล",
          "citizenId": "1103703348990",
          "isLock": true
      }
  ]

  const fetchTotalRow = async () => {
    try {
        const res = await axios.post("/api/v1/user/individual/total",{}, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getCookies()}`,
            },
        });
        if (res.status === 200) {
            console.log("fetch total row success", res);
            setTotal(res.data.total);
        } else {
            console.log("fetch total row not success", res);
        }
    } catch (error) {
        console.log("fetch total row error", error);
    }
  }

  const duplicateArrayUntilLength = (desiredLength: number = 100): TAccountTable[] => {
    let result = [...mockedCustomerData];
    while (result.length < desiredLength) {
        result = [...result, ...mockedCustomerData];
    }
    return result.slice(0, desiredLength);
};

    // const corporateCoulmn: TableColumn<TCorporateTable>[] = [
    //     {
    //         name: "Corporate Code",
    //         selector: (row:TCorporateTable) => row.corporateCode,
            
    //     },
    //     {
    //         name: "Juristic Name",
    //         selector: (row:TCorporateTable) => row.juristicName,
    //     },
    //     {
    //         name: "Tax Id",
    //         selector: (row:TCorporateTable) => row.taxId,
    //     }
    // ]


    const accountCoulmn: TableColumn<TAccountTable>[] = [
        {
            name: "Account Id",
            selector: (row:TAccountTable) => row.customerCode,
        },
        {
            name: "Name",
            selector: (row:TAccountTable) => row.name,
        },
        {
            name: "Citizen Id",
            selector: (row:TAccountTable) => row.citizenId,
        },
        {
          name: "Status",
          cell: (row: TAccountTable) => (row.isLock ? "Lock" : "Not Lock"),
        },
        {
          name: "",
          cell: (row: TAccountTable) => (
              row.isLock ? (
                <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" className="bg-[#082c1c] w-20 hover:bg-[#5cc95c] font-bold max-w-[85px] transition-all text-white hover:text-black">UnLock</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>คุณแน่ใจมั้ย?</AlertDialogTitle>
                    <AlertDialogDescription>
                      ต้องการปลดล็อคบัญชี {row.name} ใช่หรือไม่
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => {handleLock(row);}} data-testid="comfirmButton">ตกลง</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              ) : (
                <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" className="bg-[#082c1c] w-20 hover:bg-[#5cc95c] font-bold max-w-[85px] transition-all text-white hover:text-black">Lock</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>คุณแน่ใจมั้ย?</AlertDialogTitle>
                    <AlertDialogDescription>
                      ต้องการล็อคบัญชี {row.name} ใช่หรือไม่
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => {handleUnLock(row);}} data-testid="comfirmButton">ตกลง</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              )
          ),
          ignoreRowClick: true,
      },
    ]

    const handleSearch = async () => {
       setTotal(1);
       try{
          const res = await axios.post("/api/v1/user/individual/status/code",{customerCode:customerCodeInput},{
              headers: {
                  Authorization: `Bearer ${getCookies()}`,
                },
          })
          if (res.status === 200){
              setCustomerData(res.data);
              console.log("search by customer code success", res.data);
          }
       }catch(error){
          console.log("search by customer code error",error);
       }
    };
    
    const CustomPagination = ({ rowsPerPage, rowCount, onChangePage, currentPage, setCurrentPage }: CustomPaginationProps) => {
        const handleNextPage = () => {
          const nextPage = currentPage + 1;
          setCurrentPage(nextPage);
          onChangePage(nextPage, rowCount);
          setLoading(true);
          fetchTableData(
              nextPage
            ).then(() =>{
                setLoading(false);
            });
        };
      
        const handlePreviousPage = () => {
          const prevPage = currentPage - 1;
          setCurrentPage(prevPage);
          onChangePage(prevPage, rowCount);
          setLoading(true);
          fetchTableData(
              prevPage
            ).then(() =>{
                setLoading(false);
            });
        };
      
        return (
          <div className="m-4 mt-8 flex justify-center items-center space-x-8">
            <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
            <FaBackward />
            </Button>
            <span>{`Page ${currentPage} of ${Math.ceil(rowCount / rowsPerPage)}`}</span>
            <Button onClick={handleNextPage} disabled={currentPage === Math.ceil(rowCount / rowsPerPage)}>
            <FaForward />
            </Button>
          </div>
        );
      };
  
  const fetchTableData = async (page:number) => {
    console.log(page);
    fetchTotalRow();
    try{
      const res = await axios.post("/api/v1/user/individual/status",page,{
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookies()}`,
        },
      })
      if(res.status === 200){
        console.log("fetch all account success",res);
        setCustomerData(res.data[0]);
        const customerCodes = res.data.map((customerCode: TAccountTable) => customerCode);
        setCustomerCodeList(customerCodes);
      }else{
        console.log("fetch all account fail",res);
      }
    }catch(error){
      console.log("fetch all account error",error);
    }
  }

  useEffect(()=>{
    setLoading(true);
    fetchTableData(1).then(() =>{
        setLoading(false);
    });  
  },[])
      
  return (
    <div className="flex flex-col flex-center p-8 space-y-4">
      <Card >
        <div className="flex items-center w-full space-x-4 p-4 px-8 bg-[#002f18] text-white rounded-md">
            <div className="font-bold">
                Search by Customer Code
            </div>
            <div className="max-w-96 w-full">
                <Input
                list="customerId"
                autoComplete="off"
                inputClassName="h-10 w-full bg-white"
                onChange={(e)=>setCustomerCodeInput(e.target.value)}
                value={customerCodeInput}
                />
                <datalist id="customerId">
                {customerCodeList.map((code, index) => (
                    <option key={index} value={code.customerCode}>
                    {code.customerCode}
                    </option>
                ))}
                </datalist>
            </div>
            <div className="bg-[#5cc95c] cursor-pointer hover:bg-[#51b351] text-black flex p-3 px-3 rounded-md" onClick={()=>handleSearch}>
                    <FaSearch />
            </div>
        </div>
      </Card>
      <Card className="w-full">
      <DataTable
              title="Lock / UnLock Account"
              className="overflow-scroll h-full"
              columns={accountCoulmn}
              data={customerData}
              // data={duplicateArrayUntilLength(120)}
              paginationPerPage={20}
              progressComponent={<CustomLoader />}
              progressPending={loading}
              noDataComponent={
                <div className="">
                  No Data Available
                </div>
              }
              pagination
              paginationTotalRows={total}
              paginationComponentOptions={{ noRowsPerPage: false }}
              paginationComponent={(props) => (
                <CustomPagination
                  {...props}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              )}
            />
      </Card>
    </div>
  )
}

export default AccountLockUnLock
