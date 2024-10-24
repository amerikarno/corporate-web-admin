import { useNavigate, useParams } from "react-router-dom";
import AddedIcoInfo from "./AddedIcoInfo";
import { FooterPageIco } from "./FooterPageIco";
import AddedIcoDetail from "./AddedIcoDetail";
import AddedIcoKeyInfo from "./AddedIcoKeyInfo";
import AddedIcoCompany from "./AddedIcoCompany";
import "./addedico.css"
import AddedIssuance from "./AddedIssuance";
import { useDispatch } from "react-redux";
import { clearAssetData, setAssetData } from "@/features/addedIcoData/AddedIcoData";
import { getCookies } from "@/lib/Cookies";
import { useEffect } from "react";
import axios from "@/api/axios";
import { TAssetData } from "./types";
type TPage = {
    page?: string;
};
type TMapPages = {
    [key: number]: JSX.Element;
}
  
const ChangePageAddedIco = () => {

const navigate = useNavigate();
  const { page } = useParams<TPage>();
  let pageId = page ? Number(page) : 1;

  const mappingPages: TMapPages = {
    1: <AddedIcoInfo />,
    2: <AddedIcoDetail/>,
    3: <AddedIcoKeyInfo/>,
    4: <AddedIssuance/>,
    5: <AddedIcoCompany/>,
  };

  const handlePages = (type: string) => {
    if (type == "next") {
      navigate(`/create-job/change-ico/edit/${pageId + 1}`);
    }else if(type == "Done"){
      navigate(`/create-job/change-ico`);
      dispatch(clearAssetData());
      localStorage.clear();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate(`/create-job/change-ico/edit/${pageId - 1}`);
    }
  };

  const dispatch = useDispatch();
  const token = getCookies();


  const registerId = localStorage.getItem("registerId");
  const fetchData = async () => {
    try{
      const res = await axios.get("/api/v1/ico/query", {
        headers: {
          Authorization: `Bearer ${getCookies()}`,
        },
      })
      if(res.status == 200){
        const matchedData = res.data.find((item: { registerId: string }) => item.registerId === registerId);
        if (matchedData) {
          const assetData:TAssetData = matchedData;
          dispatch(setAssetData(assetData));
        }
      }
    }catch(error){
      console.log("can not query data", error)
    }

  }

  useEffect(() => {
    if(registerId){
      fetchData();
    }else{
      console.log("no registerId")
    }
  }, [pageId,token,dispatch]);

  return (
    <div className="flex flex-col min-h-[95vh] space-y-8 pb-8 relative">
      <div className="content">
        {mappingPages[pageId]}
      </div>
      <FooterPageIco
        handlePages={handlePages}
        pageId={pageId}
        totalPages={Object.keys(mappingPages).length}
      />
    </div>
  );
}

export default ChangePageAddedIco
