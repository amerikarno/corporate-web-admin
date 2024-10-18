import { useEffect, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { TAssetData } from '@/pages/createJob/changeIcoAccount/types';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAssetData } from '@/features/addedIcoData/AddedIcoData';
import { Pencil } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/Input';
import axios from '@/api/axios';
import { getCookies } from '@/lib/Cookies';
import { FaSearch } from "react-icons/fa";
import { mockedAssetData } from './utils';
import { Button } from '@/components/ui/button';

interface IcoInfo {
  icoCode: string;
}

const ViewIco = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleViewClick = (row: TAssetData) => {
    dispatch(setAssetData(row));
    navigate("/enquiry/ico-campaign/view");
    window.scrollTo(0, 0);
  }

  const [icoCodeInput,setIcoCodeInput] = useState('');
  const [icoCodeList, setIcoCodeList] = useState<IcoInfo[]>([]);
  const [icoAccountList, setIcoAccountList] = useState<TAssetData[]>([]);

  const ColumnsIcoSearch: TableColumn<TAssetData>[] = [
    {
      name: "ICO Code",
      selector: (row: TAssetData) => row.icoCode || "",
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
        cell: (row) => (
            <Button
            className="bg-[#082c1c] hover:bg-[#5cc95c] hover:font-bold max-w-[85px] transition-all text-white hover:text-black"
            onClick={() => {
                handleViewClick(row);
            }}
            >
            View
            </Button>
        ),
        ignoreRowClick: true,
        },
  ];

  const handleSearch = async () =>{
    if(icoCodeInput === ''){
        fetchIcoAccount();
    }else{
        try{
            const res = await axios.post("/api/v1/ico/query/code",{icoCode:icoCodeInput},{
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

  const fetchIcoAccount = async () => {
    try {
      const res = await axios.get("/api/v1/ico/query", {
        headers: {
          Authorization: `Bearer ${getCookies()}`,
        },
      });
      console.log(res)
      if (res.status === 200) {
        const icoCodes = res.data.map((icoInfo: IcoInfo) => icoInfo);
        setIcoCodeList(icoCodes);
        setIcoAccountList(res.data);
      } else {
        console.log("fetch all ico fail",res);
      }
    } catch (error) {
      console.log("fetch all ico error", error);
    }
  };

  useEffect(() => {
    fetchIcoAccount();
  }, []);

  return (
    <div className="pt-8 px-4 space-y-4 h-screen">
      <Card >
        <div className="flex items-center w-full space-x-4 p-4 px-8 bg-[#002f18] text-white rounded-md">
            <div className="font-bold">
                Search by ICO code
            </div>
            <div className="max-w-96 w-full">
                <Input
                list="juristicId"
                autoComplete="off"
                inputClassName="h-10 w-full bg-white"
                onChange={(e)=>setIcoCodeInput(e.target.value)}
                value={icoCodeInput}
                />
                <datalist id="juristicId">
                {icoCodeList.map((code, index) => (
                    <option key={index} value={code.icoCode}>
                    {code.icoCode}
                    </option>
                ))}
                </datalist>
            </div>
            <div className="bg-[#5cc95c] cursor-pointer hover:bg-[#51b351] text-black flex p-3 px-3 rounded-md" onClick={handleSearch}>
                    <FaSearch />
            </div>
        </div>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>ICO Account Information</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto max-h-[45rem]">
          <DataTable columns={ColumnsIcoSearch} data={[mockedAssetData]} />
        </CardContent>
      </Card>
    </div>
  );
};

export default ViewIco;
