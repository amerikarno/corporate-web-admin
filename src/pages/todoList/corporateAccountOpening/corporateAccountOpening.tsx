import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { getCookies } from "@/lib/Cookies";
import axios from "@/api/axios";
import { TCorporateData } from "./constant/type";
import { FaBackward, FaForward } from "react-icons/fa";
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
import { TableColumn } from "react-data-table-component";

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

const customStyles = {
  rows: {
    style: {
      minHeight: '60px', 
    },
  },
}

export default function TodoCorporateAccountOpenning() {

  const [total,setTotal] = useState(1);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetchData, setFetchData] = useState<TCorporateData[]>([]);

  const CustomPagination = ({ rowsPerPage, rowCount, onChangePage, currentPage, setCurrentPage }: CustomPaginationProps) => {
    const handleNextPage = () => {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      onChangePage(nextPage, rowCount);
      setLoading(true);
      fetchQueryApproved(nextPage).then(() => {
        setLoading(false);
      });
    };
  
    const handlePreviousPage = () => {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      onChangePage(prevPage, rowCount);
      setLoading(true);
      fetchQueryApproved(prevPage).then(() => {
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

  const fetchQueryApproved = async (page:number) => {
    fetchTotalRow();
    console.log({page:page})
    try{
      const res = await axios.post('/api/v1/corporate/query/pending',{page:page},{
        headers: {
          Authorization: `Bearer ${getCookies()}`
        }
      })
      if(res.status === 200){
        console.log("Query for Pending User success",res)
        setFetchData(res.data);
      }else{
        console.log("Query for Pending User fail ",res)
      }
    }catch(error){
      console.log("Query for Pending User failed", error)
    }
  }

  const fetchTotalRow = async () => {
    try {
      const res = await axios.post("/api/v1/corporate/total/pending",{}, {
        headers: {
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
  };

  const handleApproveClick = async (row: TCorporateData) => {
    let body = {
      registerId : row.registerId,
      status : 1
    }
    console.log(body);
    try {
      const res = await axios.post('/api/v1/user/corporate/approve',body,{
        headers: {
          Authorization: `Bearer ${getCookies()}`
        }
      })

      if(res.status === 200){
        console.log("Approve User success",res)
        fetchQueryApproved(currentPage);

      }else{
        console.log("Approve User fail ",res)
      }
    }catch(error){
      console.log("Approve User failed", error)
    }
  }
  
  const handleRejectClick = async (row: TCorporateData) => {
    let body = {
      registerId : row.registerId,
      status : -1
    }
    console.log(body);
    try {
      const res = await axios.post('/api/v1/user/corporate/approve',body,{
        headers: {
          Authorization: `Bearer ${getCookies()}`
        }
      })

      if(res.status === 200){
        console.log("Reject User success",res)
        fetchQueryApproved(currentPage);
      }else{
        console.log("Reject User fail ",res)
      }
    }catch(error){
      console.log("Reject User failed", error)
    }
  }

  const columnsCorporateInfo: TableColumn<TCorporateData>[] = [
    {
      name: "Register ID",
      selector: (row: TCorporateData) => row.registerId || "",
      width: "200px",
      style: { maxWidth: "200px" },
    },
    {
      name: "Juristic Name",
      selector: (row: TCorporateData) => row.Info.name || "",
      width: "200px",
      style: { maxWidth: "200px" },
    },
    {
      name: "TAX ID",
      selector: (row: TCorporateData) => row.Info.taxId || "",
      width: "200px",
      style: { maxWidth: "200px" },
    },
    {
      name: "status",
      selector: (row: TCorporateData) => {
        if (row.status === -1) {
          return "Rejected";
        } else if (row.status === 0) {
          return "Pending";
        } else if (row.status === 1) {
          return "Approved";
        }
        return "Unknown";
      },
      width: "200px",
      style: { maxWidth: "200px" },
    },
    {
      cell: (row: TCorporateData) => (
        row.status === 0 ? (
          <div className="flex space-x-20">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="bg-[#002f18] hover:bg-[#5cc95c] hover:font-bold max-w-[85px] transition-all text-white">Approve</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure? Approve</AlertDialogTitle>
                  <AlertDialogDescription>
                    <span>{`Register ID : ${row.registerId}`}</span><br/>
                    <span>{`Juristic Name : ${row.Info.name}`}</span><br/>
                    <span>{`Tax ID : ${row.Info.taxId}`}</span>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleApproveClick(row)}>Approve</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="bg-[#002f18] hover:bg-[#ca4047] hover:font-bold hover:text-white w-[85px] transition-all text-white">Reject</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure? Reject</AlertDialogTitle>
                  <AlertDialogDescription>
                    <span>{`Register ID : ${row.registerId}`}</span><br/>
                    <span>{`Juristic Name : ${row.Info.name}`}</span><br/>
                    <span>{`Tax ID : ${row.Info.taxId}`}</span>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleRejectClick(row)}>Reject</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        ) : null
      ),
      ignoreRowClick: true,
    },
  ];

  useEffect(() => {
    fetchTotalRow();
    setLoading(true);
    fetchQueryApproved(currentPage).then(() => {
      setLoading(false);
    });
  }, []);

  return (
    <div className="p-4 space-y-10">
      {/* <Card>
        <CardContent>
          <form
            className="grid grid-cols-2 gap-4 pt-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <SideLabelInput title="Juristic ID">
              <Input
                data-testid="juristicId"
                {...register("registerId")}
                onChange={handleDisableDate}
                disabled={disableCode}
                list="juristicId"
                autoComplete="off"
              />
              {errors && (
                <p className="text-red-500">{errors.registerId?.message}</p>
              )}
              <datalist id="juristicId">
                {mockedregisterIds.map((code, index) => (
                  <option key={index} value={code.registerId}>
                    {code.registerId}
                  </option>
                ))}
              </datalist>
            </SideLabelInput>
            <div className="col-start-1">
              <SideLabelInput title="Date From">
                <Input
                  data-testid="dateFrom"
                  type="date"
                  {...register("dateFrom")}
                  onChange={handleDisableCode}
                  disabled={disableDate}
                />
                {errors && (
                  <p className="w-full text-red-500 py-1">
                    {errors.dateFrom?.message}
                  </p>
                )}
              </SideLabelInput>
            </div>
            <SideLabelInput title="Date To">
              <Input
                data-testid="dateTo"
                type="date"
                {...register("dateTo")}
                onChange={handleDisableCode}
                disabled={disableDate}
              />
              {errors && (
                <p className="w-full py-1 text-red-500">
                  {errors.dateTo?.message}
                </p>
              )}
            </SideLabelInput>
            <div className="col-start-2 flex justify-end">
              <Button type="submit" data-testid="searchBtn">
                {isSubmitting ? "Search..." : "Search"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card> */}

      <Card>
        <CardHeader>
          <CardTitle>Corporates Account Opening</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <DataTable 
            columns={columnsCorporateInfo} 
            data={fetchData} 
            paginationPerPage={20}
            progressComponent={<CustomLoader />}
            progressPending={loading}
            noDataComponent={
              <div className="">
                No Data Available
              </div>
            }
            customStyles={customStyles}
            pagination
            // paginationTotalRows={100}
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
        </CardContent>
      </Card>
    </div>
  );
}
