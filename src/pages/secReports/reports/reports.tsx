import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { isAllowedPage } from "@/lib/utils";
import UnAuthorize from "@/pages/unAuthorizePage/unAuthorize";
import DataTable, {TableColumn } from "react-data-table-component";
import { useNavigate } from "react-router-dom";

type TReportData = {
  id: number;
  type: string;
  name: string;
  createdAt: string;
};
export default function Reports() {
  if (!isAllowedPage(6001)) {
    return <UnAuthorize />;
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

  const navigate = useNavigate();
  const handleViewClick = (row: TReportData) => {
    console.log(row);
    navigate(`/reports/sec-reports/${row.type}`);
    window.scrollTo(0, 0);
  }

  const columnsReports: TableColumn<TReportData>[] = [
    {
      name: "ID",
      selector: (row: TReportData) => row.id.toString() || "",
      width: "75px",
      style: { maxWidth: "75px" },
    },
    {
      name: "Type",
      selector: (row: TReportData) => row.type || "",
      width: "150px",
      style: { maxWidth: "150px" },
    },
    {
      name: "Document",
      selector: (row: TReportData) => row.name || "",
      width:"100px",
      style: { maxWidth: "1000px" },
      wrap: true,
    },
    // {
    //   name: "Created At",
    //   selector: (row: TReportData) => row.createdAt || "",
    //   width:"250px",
    //   style: { maxWidth: "250px" },
    // },
    {
      name: "",
      cell: (row : TReportData) => (
        <Button
          className="bg-[#082c1c] hover:bg-[#5cc95c] hover:font-bold max-w-[85px] transition-all text-white hover:text-black"
          onClick={() => handleViewClick(row)}
        >
          View
        </Button>
      ),
      ignoreRowClick: true,
      style: { maxWidth: "150px" },
    },
    // {
    //   name: "",
    //   cell: (row: TReportData) => (
    //     <p
    //       className="hover:cursor-pointer text-blue-600"
    //       onClick={() => {
    //         console.log(row);
    //         handleDownloadFile();
    //       }}
    //     >
    //       Download
    //     </p>
    //   ),
    //   ignoreRowClick: true,
    //   style: { maxWidth: "150px" },
    // },
  ];

  const data: TReportData[] = [
    {
      id: 1,
      type: "BusWallet",
      name: "รายงานบัญชีเก็บสินทรัพย์ดิจิทัลของผู้ประกอบธุรกิจสินทรัพย์ดิจิทัล",
      createdAt: "10-09-2024",
    },
    {
      id: 2,
      type: "CusData",
      name: "รายงานข้อมูลผู้ลงทุน",
      createdAt: "10-09-2024",
    },
    {
      id: 3,
      type: "CusIdentification",
      name: "รายงานข้อมูลจำแนกผู้ลงทุน",
      createdAt: "10-09-2024",
    },
    {
      id: 4,
      type: "CusOutstanding",
      name: "รายงานปริมาณสินทรัพย์ดิจิทัลคงเหลือของผู้ลงทุน",
      createdAt: "10-09-2024",
    },
    {
      id: 5,
      type: "CusWallet",
      name: "รายงานบัญชีเก็บสินทรัพย์ดิจิทัลของผู้ลงทุน",
      createdAt: "10-09-2024",
    },
    {
      id: 6,
      type: "DTW",
      name: "รายงานข้อมูลรายการฝากสินทรัพย์ดิจิทัลหรือถอนและโอนสินทรัพย์ดิจิทัล",
      createdAt: "10-09-2024",
    },
    {
      id: 7,
      type: "Orderbook",
      name: "รายงานข้อมูลการทำธุรกรรมสินทรัพย์ดิจิทัลนอกศูนย์ซื้อขายสินทรัพย์ดิจิทัล",
      createdAt: "10-09-2024",
    },
    {
      id: 8,
      type: "PartnerExProfile",
      name: "รายงานข้อมูลประวัติผู้ประกอบธุรกิจสินทรัพย์ดิจิทัลรายอื่นที่ผู้ประกอบธุรกิจสินทรัพย์ดิจิทัลดำเนินธุรกิจด้วย",
      createdAt: "10-09-2024",
    },
    {
      id: 9,
      type: "ProfileListing",
      name: "รายงานข้อมูลประวัติสินทรัพย์ดิจิทัลที่ผู้ประกอบธุรกิจสินทรัพย์ดิจิทัลนำมาให้บริการแก่ผู้ลงทุน",
      createdAt: "10-09-2024",
    },
    {
      id: 10,
      type: "Tradebook",
      name: "สมุดบันทึกรายการจับคู่คำสั่งเสนอซื้อหรือเสนอขายสินทรัพย์ดิจิทัล",
      createdAt: "10-09-2024",
    },
  ];

  // const handleDownloadFile = async () => {
  //   // try {
  //   //   const res = await axios.get("");
  //   //   console.log(res);
  //   // } catch (error) {
  //   //   console.log(error);
  //   // }
  //   console.log("download file");
  // };

  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle>SEC Reports</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <DataTable
          className="border-b border-gray-300"
          columns={columnsReports}
          data={data}
          customStyles={customStyles}
        />
      </CardContent>
    </Card>
  );
}