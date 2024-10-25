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
    try {
      const res = await axios.post("/api/v1/ico/query",{page}, {
        headers: {
          Authorization: `Bearer ${getCookies()}`,
        },
      });
      console.log(res)
      if (res.status === 200) {
        setIcoAccountList(res.data);
        setTotal(res.data.totalRows);
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
