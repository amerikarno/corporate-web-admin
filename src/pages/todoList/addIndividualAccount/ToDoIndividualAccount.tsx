import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TIndividualData } from "./type";
import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { getCookies } from "@/lib/Cookies";
import axios from "@/api/axios";
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
import { setIndividualData } from "@/features/fetchIndividualData/fetchIndividualDataSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

type CustomPaginationProps = {
  rowsPerPage: number;
  rowCount: number;
  onChangePage: (page: number, totalRows: number) => void;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;

}

const customStyles = {
  rows: {
      style: {
          minHeight: '60px', 
        },
  },
  headCells: {
      style: {
      },
  },
  cells: {
      style: {
      },
  },
};

const CustomLoader = () => (
  <div className="flex justify-center items-center p-4">
      <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-900" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
      </svg>
      <span className="ml-4 text-[#082c14]">Loading...</span>
  </div>
);

// export const mockedQueryApprove :TIndividualData[] = [
//   {
//     "id": "6cb3c66c-7143-4ff6-96da-391811f8754f",
//     "createBy": "163e6a07-bd7d-453d-9f57-c7ca8d7e34ba",
//     "CreatedAt": "2024-10-16T10:46:31+07:00",
//     "DeletedAt": null,
//     "status": 0,
//     "registerId": "90000002",
//     "thTitle": "นาย",
//     "thName": "เกตเต้อ-ชื่อ",
//     "thSurname": "เกตเต้อ-นามสกุล",
//     "engTitle": "Mr.",
//     "engName": "getter-name",
//     "engSurname": "getter-surname",
//     "email": "test@gmail.com",
//     "mobile": "0884744411",
//     "agreement": true,
//     "birthDate": "2024-08-20T07:00:00+07:00",
//     "marriageStatus": "โสด",
//     "citizenId": "1103703348990",
//     "laserCode": "12123",
//     "education": "2",
//     "sourceOfIncome": "4",
//     "currentOccupation": "5",
//     "officeName": "ทิสโก้ทาวเวอร์",
//     "typeOfBusiness": "6",
//     "positionName": "ทิสโก้ทาวเวอร์",
//     "salaryRange": "3",
//     "shortTermInvestment": true,
//     "taxesInvestment": true,
//     "address": [
//         {
//             "id": "3270c9c7-f1c2-4f42-9949-1838fb91d7ed",
//             "createBy": "163e6a07-bd7d-453d-9f57-c7ca8d7e34ba",
//             "CreatedAt": "2024-10-16T10:46:38+07:00",
//             "DeletedAt": null,
//             "registerId": "90000002",
//             "homeNumber": "homeAddress",
//             "villageNumber": "homeAddress",
//             "villageName": "homeAddress",
//             "subStreetName": "homeAddress",
//             "streetName": "homeAddress",
//             "subDistrictName": "ตลาดยอด",
//             "districtName": "เขตมีนบุรี",
//             "provinceName": "ตราด",
//             "zipCode": "10400",
//             "countryName": "หมู่เกาะอะแลนด์",
//             "types": 1
//         },
//         {
//             "id": "88836d34-d200-4d9d-aef6-ea5771596984",
//             "createBy": "163e6a07-bd7d-453d-9f57-c7ca8d7e34ba",
//             "CreatedAt": "2024-10-16T10:46:38+07:00",
//             "DeletedAt": null,
//             "registerId": "90000002",
//             "homeNumber": "currentAddress",
//             "villageNumber": "currentAddress",
//             "villageName": "currentAddress",
//             "subStreetName": "currentAddress",
//             "streetName": "currentAddress",
//             "subDistrictName": "กระทุ่มราย",
//             "districtName": "เขตตลิ่งชัน",
//             "provinceName": "สุรินทร์",
//             "zipCode": "10170",
//             "countryName": "เบลเยียม",
//             "types": 2
//         },
//         {
//             "id": "be03335b-c8aa-4cb2-bb90-396f8ca804a2",
//             "createBy": "163e6a07-bd7d-453d-9f57-c7ca8d7e34ba",
//             "CreatedAt": "2024-10-16T10:46:38+07:00",
//             "DeletedAt": null,
//             "registerId": "90000002",
//             "homeNumber": "officeAddress",
//             "villageNumber": "officeAddress",
//             "villageName": "officeAddress",
//             "subStreetName": "officeAddress",
//             "streetName": "officeAddress",
//             "subDistrictName": "คลองสิบ",
//             "districtName": "เขตภาษีเจริญ",
//             "provinceName": "สุรินทร์",
//             "zipCode": "10160",
//             "countryName": "บูร์กินาฟาโซ",
//             "types": 3
//         }
//     ],
//     "bank": [
//         {
//             "id": "325b75b9-8f39-43f1-9291-4025ee336d4b",
//             "createBy": "163e6a07-bd7d-453d-9f57-c7ca8d7e34ba",
//             "CreatedAt": "2024-10-16T10:46:38+07:00",
//             "DeletedAt": null,
//             "registerId": "90000002",
//             "bankName": "ธนาคารกรุงเทพ จำกัด (มหาชน)",
//             "bankBranchName": "bank1",
//             "bankAccountNumber": "bankaccountid1",
//             "types": 1
//         },
//         {
//             "id": "86df573d-9138-42fd-8b9f-13c0a60c6727",
//             "createBy": "163e6a07-bd7d-453d-9f57-c7ca8d7e34ba",
//             "CreatedAt": "2024-10-16T10:46:38+07:00",
//             "DeletedAt": null,
//             "registerId": "90000002",
//             "bankName": "ธนาคารกรุงศรีอยุธยา จำกัด (มหาชน)",
//             "bankBranchName": "bank2",
//             "bankAccountNumber": "bankaccountid2",
//             "types": 2
//         }
//     ],
//     "SuiteTestResult": {
//         "createBy": "",
//         "deletedBy": "",
//         "registerId": "90000002",
//         "suiteTestResult": {
//             "registerId": "fb496f22-146b-4062-8abc-b7a673a7bdee",
//             "investorTypeRisk": "เสี่ยงปานกลางค่อนสูง",
//             "level": 3,
//             "totalScore": 24,
//             "suiteTestResult": {
//                 "answer": {
//                     "0": {
//                         "ans": [
//                             0,
//                             1,
//                             0,
//                             0
//                         ]
//                     },
//                     "1": {
//                         "ans": [
//                             0,
//                             0,
//                             1,
//                             0
//                         ]
//                     },
//                     "2": {
//                         "ans": [
//                             0,
//                             1,
//                             1,
//                             0
//                         ]
//                     },
//                     "3": {
//                         "ans": [
//                             0,
//                             0,
//                             1,
//                             0
//                         ]
//                     },
//                     "4": {
//                         "ans": [
//                             0,
//                             0,
//                             1,
//                             0
//                         ]
//                     },
//                     "5": {
//                         "ans": [
//                             0,
//                             1,
//                             0,
//                             0
//                         ]
//                     },
//                     "6": {
//                         "ans": [
//                             0,
//                             0,
//                             1,
//                             0
//                         ]
//                     },
//                     "7": {
//                         "ans": [
//                             0,
//                             1,
//                             0,
//                             0
//                         ]
//                     },
//                     "8": {
//                         "ans": [
//                             0,
//                             0,
//                             1,
//                             0
//                         ]
//                     }
//                 }
//             }
//         },
//         "isFatca": true,
//         "fatcaInfo": [
//             1,
//             0,
//             1,
//             0,
//             1,
//             0,
//             1,
//             0
//         ],
//         "isKnowLedgeDone": true,
//         "knowLedgeTestResult": 15
//     },
//     "ndid": true,
//     "thaid": false
// },
// ]

// const updatedMocked = Array.from({ length: 100 }).flatMap((_, index) => 
//   mockedQueryApprove.map(data => ({ 
//     ...data,
//     id:String(index+1), 
//     registerId:`${index + data.registerId}`
//   }))
// );

export default function TodoIndividualAccount() {


  const navigate = useNavigate();
  const dispatch = useDispatch();

  // console.log("reset:", reset);
  const [total,setTotal] = useState(1);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  // const [registerIdInput,setRegisterIdInput] = useState('');
  // const [registerIdList, setRegisterIdList] = useState<TIndividualData[]>([]);
  const [ fetchData , setFetchData] = useState<TIndividualData[]>([]);

  const CustomPagination = ({ rowsPerPage, rowCount, onChangePage, currentPage, setCurrentPage }: CustomPaginationProps) => {
    const handleNextPage = () => {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      onChangePage(nextPage, rowCount);
      setLoading(true);
      fetchQueryPending(nextPage).then(() => {
        setLoading(false);
      });
    };
  
    const handlePreviousPage = () => {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      onChangePage(prevPage, rowCount);
      setLoading(true);
      fetchQueryPending(prevPage).then(() => {
        setLoading(false);
      });
    };
  
    return (
      <div className="m-4 mt-8 flex justify-center items-center space-x-8">
        <Button onClick={handlePreviousPage} data-testid="prevBtn" disabled={currentPage === 1}>
        <FaBackward />
        </Button>
        <span>{`Page ${currentPage} of ${Math.ceil(rowCount / rowsPerPage)}`}</span>
        <Button onClick={handleNextPage} data-testid="nextBtn" disabled={currentPage === Math.ceil(rowCount / rowsPerPage)}>
        <FaForward />
        </Button>
      </div>
    );
  };

    const fetchTotalRow = async () => {
      try {
        const res = await axios.post("/api/v1/individual/total/pending",{}, {
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
  
  const fetchQueryPending = async (page:number) => {
    fetchTotalRow();
    console.log({page:page})
    try{
      const res = await axios.post('/api/v1/individual/list/pending',{page:page},{
        headers: {
          Authorization: `Bearer ${getCookies()}`
        }
      })
      if(res.status === 200){
        console.log("Query for Pending User success",res)
        setFetchData(res.data);
        // const registerIds = res.data.map((item: TIndividualData) => ({
        //   registerId: item.registerId,
        // }));
        // setRegisterIdList(registerIds);
      }else{
        console.log("Query for Pending User fail ",res)
      }
    }catch(error){
      console.log("Query for Pending User failed", error)
    }
  }

  const handleViewClick = (row: TIndividualData) => {
    dispatch(setIndividualData(row));
    navigate("/todo-list/individual-account-opening/view");
    window.scrollTo(0, 0);
  }

  const handleApproveClick = async (row: TIndividualData) => {
    let body = {
      registerId : row.registerId,
      status : 1
    }
    console.log(body);
    try {
      const res = await axios.post('/api/v1/user/individual/approve',body,{
        headers: {
          Authorization: `Bearer ${getCookies()}`
        }
      })

      if(res.status === 200){
        console.log("Approve User success",res)
        fetchQueryPending(currentPage);

      }else{
        console.log("Approve User fail ",res)
      }
    }catch(error){
      console.log("Approve User failed", error)
    }
  }
  
  const handleRejectClick = async (row: TIndividualData) => {
    let body = {
      registerId : row.registerId,
      status : -1
    }
    console.log(body);
    try {
      const res = await axios.post('/api/v1/user/individual/approve',body,{
        headers: {
          Authorization: `Bearer ${getCookies()}`
        }
      })

      if(res.status === 200){
        console.log("Reject User success",res)
        fetchQueryPending(currentPage);
      }else{
        console.log("Reject User fail ",res)
      }
    }catch(error){
      console.log("Reject User failed", error)
    }
  }
  
  const ColumnsOfIndividualSearch: TableColumn<TIndividualData>[] = [
    {
      name: "Register ID",
      selector: (row: TIndividualData) => row.registerId || "",
      width: "200px",
      style: { maxWidth: "200px" },
    },
    {
      name: "Individual Name",
      selector: (row: TIndividualData) => row.thName || "",
      width: "200px",
      style: { maxWidth: "200px" },
    },
    {
      name: "Individual Email",
      selector: (row: TIndividualData) => row.email || "",
      width: "200px",
      style: { maxWidth: "200px" },
    },
    {
      name: "Status",
      selector: (row: TIndividualData) => {
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
      cell: (row: TIndividualData) => (
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
                    <span>{`Individual Name : ${row.thName}`}</span><br/>
                    <span>{`Individual Email : ${row.email}`}</span>
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
                    <span>{`Individual Name : ${row.thName}`}</span><br/>
                    <span>{`Individual Email : ${row.email}`}</span>
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
      width: "325px",
      style: { maxWidth: "325px" },
      ignoreRowClick: true,
    },
    {
      name: "",
      cell: (row) => (
          <Button
          className="bg-[#002f18] hover:bg-white hover:font-bold border-4 hover:text-black w-[85px] transition-all text-white"
          onClick={() => {
              handleViewClick(row);
          }}
          >
          View
          </Button>
      ),
      width: "300px",
      style: { maxWidth: "300px" },
      ignoreRowClick: true,
      },
  ];

  useEffect(() => {
    fetchTotalRow();
    setLoading(true);
    fetchQueryPending(currentPage).then(() => {
      setLoading(false);
    });
  }, []);

  return (
    <div className="p-4 space-y-10">
            {/* <Card >
              <div className="flex items-center w-full space-x-4 p-4 px-8 bg-[#002f18] text-white rounded-md">
                  <div className="font-bold">
                      Search by Register Id
                  </div>
                  <div className="max-w-96 w-full">
                      <Input
                      list="juristicId"
                      autoComplete="off"
                      className="h-10 w-full bg-white text-black"
                      onChange={(e)=>setRegisterIdInput(e.target.value)}
                      value={registerIdInput}
                      />
                      <datalist id="juristicId">
                      {registerIdList.map((code, index) => (
                          <option key={index} value={code.registerId}>
                          {code.registerId}
                          </option>
                      ))}
                      </datalist>
                  </div>
                  <div 
                    className="bg-[#5cc95c] cursor-pointer hover:bg-[#51b351] text-black flex p-3 px-3 rounded-md" 
                    onClick={() => {
                      setLoading(true); 
                      handleSearch(1).then(() => {
                        setLoading(false);
                      }).catch(() => {
                        // Handle any errors if necessary
                        setLoading(false);
                      });
                    }}
                  >
                          <FaSearch />
                  </div>
              </div>
      </Card> */}

      <Card>
        <CardHeader>
          <CardTitle>Individual Account Opening</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <DataTable 
            columns={ColumnsOfIndividualSearch}
            data = {fetchData}
            // data = {mockedQueryApprove}
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
