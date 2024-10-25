import { useEffect, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { TAssetData } from './types';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAssetData } from '@/features/addedIcoData/AddedIcoData';
import { Pencil } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/Input';
import axios from '@/api/axios';
import { getCookies } from '@/lib/Cookies';
// import { Button } from '@/components/ui/button';
import { FaBackward, FaForward, FaSearch } from "react-icons/fa";
import { Button } from '@/components/ui/button';

interface IcoInfo {
  registerId: string;
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

type CustomPaginationProps = {
  rowsPerPage: number;
  rowCount: number;
  onChangePage: (page: number, totalRows: number) => void;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;

}

const ChangeAddedIcoSearch = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const EditButtonCell = ({ row }: { row: TAssetData }) => {
    const handleEditClick = () => {
      console.log(row);
      dispatch(setAssetData(row));
      localStorage.setItem('registerId', row.registerId!);
      navigate("/create-job/change-ico/edit/1", {
        state: row,
      });
    };

    return (
      <Pencil className="h-4 hover:cursor-pointer" onClick={handleEditClick} />
    );
  };

  const CustomPagination = ({ rowsPerPage, rowCount, onChangePage, currentPage, setCurrentPage }: CustomPaginationProps) => {
    const handleNextPage = () => {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      onChangePage(nextPage, rowCount);
      setLoading(true);
      handleSearch(nextPage).then(() => {
        setLoading(false);
      });
    };
  
    const handlePreviousPage = () => {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      onChangePage(prevPage, rowCount);
      setLoading(true);
      handleSearch(prevPage).then(() => {
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

  const [total,setTotal] = useState(1);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [registerIdInput,setRegisterIdInput] = useState('');
  const [registerIdList, setRegisterIdList] = useState<IcoInfo[]>([]);
  const [icoAccountList, setIcoAccountList] = useState<TAssetData[]>([]);

  const ColumnsIcoSearch: TableColumn<TAssetData>[] = [
    {
      name: "registerId",
      selector: (row: TAssetData) => row.registerId || "",
      maxWidth: '120px'
    },
    {
      name: "Symbol",
      selector: (row: TAssetData) => row.asset.name || "",
      maxWidth: '150px'
    },
    {
      name: "Company Name",
      selector: (row: TAssetData) => row.asset.description || "",
      maxWidth: '300px'
    },
    {
      name: "Issue By",
      selector: (row: TAssetData) => row.asset.issueBy || "",
    },
    {
      name: "",
      cell: (row: TAssetData) => <EditButtonCell row={row} />,
      ignoreRowClick: true,
    },
  ];

  const handleSearch = async (page:number) =>{
    if(registerIdInput === ''){
        setLoading(true);
        fetchIcoAccount(page).then(() => {
          setLoading(false);
        });
    }else{
        setTotal(1);
        try{
            const res = await axios.post("/api/v1/ico/query/code",{registerId:registerIdInput},{
                headers: {
                    Authorization: `Bearer ${getCookies()}`,
                  },
            })
            if (res.status === 200){
                setIcoAccountList(res.data);
                console.log("search ico account by ico code success", res.data);
            }
        }catch(error){
            console.log("search ico account by ico code error", error);
        }
    }
  }

  const fetchTotalRow = async () => {
    try {
      const res = await axios.post("/api/v1/ico/total", {
        headers: {
          Authorization: `Bearer ${getCookies()}`,
        },
      });
      if (res.status === 200) {
        console.log("fetch total row success", res);
        setTotal(res.data);
      } else {
        console.log("fetch total row not success", res);
      }
    } catch (error) {
      console.log("fetch total row error", error);
    }
  };

  const fetchAllIcoAccount = async () => {
    try {
      const res = await axios.post("/api/v1/ico/query",{}, {
        headers: {
          Authorization: `Bearer ${getCookies()}`,
        },
      });
      console.log(res)
      if (res.status === 200) {
        const registerIds = res.data.map((icoInfo: IcoInfo) => icoInfo);
        setRegisterIdList(registerIds);
      } else {
        console.log("fetch all ico fail",res);
      }
    } catch (error) {
      console.log("fetch all ico error", error);
    }
  };
  const fetchIcoAccount = async (page:number) => {
    fetchTotalRow();
    try {
      const res = await axios.post("/api/v1/ico/query",{page}, {
        headers: {
          Authorization: `Bearer ${getCookies()}`,
        },
      });
      console.log(res)
      if (res.status === 200) {
        setIcoAccountList(res.data);
      } else {
        console.log("fetch all ico fail",res);
      }
    } catch (error) {
      console.log("fetch all ico error", error);
    }
  };

  useEffect(() => {
    fetchAllIcoAccount();
    setLoading(true);
    fetchIcoAccount(currentPage).then(() => {
      setLoading(false);
    });
  }, []);

  return (
    <div className="pt-8 px-4 space-y-4 h-screen">
      <Card >
        <div className="flex items-center w-full space-x-4 p-4 px-8 bg-[#002f18] text-white rounded-md">
            <div className="font-bold">
                Search by Register Id
            </div>
            <div className="max-w-96 w-full">
                <Input
                list="juristicId"
                autoComplete="off"
                inputClassName="h-10 w-full bg-white"
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
            <div className="bg-[#5cc95c] cursor-pointer hover:bg-[#51b351] text-black flex p-3 px-3 rounded-md" onClick={()=>handleSearch}>
                    <FaSearch />
            </div>
        </div>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>ICO Account Information</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto h-full">
          <DataTable
            columns={ColumnsIcoSearch}
            data={icoAccountList}
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
        </CardContent>
      </Card>
    </div>
  );
};

export default ChangeAddedIcoSearch;
