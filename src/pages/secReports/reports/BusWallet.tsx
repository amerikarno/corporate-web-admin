import { Button } from "@/components/ui/button";
import DataTable, { createTheme, TableColumn } from "react-data-table-component";

const BusWallet = () => {

    type TBusWalletReports = {
        id: number;
        title: string;
        document: string;
        createAt: string;
    }

    const data: TBusWalletReports[] = Array.from({ length: 20 }, (_, index) => ({
        id: index + 1,
        title: `title ${index + 1}`,
        document: `document ${index + 1}`,
        createAt: `2024-09-${String(index + 1).padStart(2, '0')}`,
      }));
      

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

    const columns: TableColumn<TBusWalletReports>[] = [
        {
            name: "ID",
            selector: (row) => row.id,
        },
        {
            name: "Title",
            selector: (row) => row.title,
        },
        {
            name: "Document",
            selector: (row) => row.document,
        },
        {
            name: "Create At",
            selector: (row) => row.createAt,
        },
        {
        name: "",
        cell: (row) => (
            <Button
            className="bg-[#082c1c] hover:bg-[#5cc95c] hover:font-bold max-w-[85px] transition-all text-white hover:text-black"
            onClick={() => {
                console.log(row);
            }}
            >
            Download
            </Button>
        ),
        ignoreRowClick: true,
        },
      ];

    createTheme('solarized', {
        text: {
          primary: '#082c1c',
          secondary: '#2aa198',
        },
        background: {
          default: '#ffffff',
        },
        context: {
          background: '#cb4b16',
          text: '#FFFFFF',
        },
        divider: {
        },
        action: {
          button: 'rgba(0,0,0,.54)',
          hover: 'rgba(0,0,0,.08)',
          disabled: 'rgba(0,0,0,.12)',
        },
      });
      
  return (
    <div className="p-8 flex flex-col space-y-4">
        <div className="py-4 pl-4 text-lg flex justify-start bg-[#082c1c] text-white rounded-md">
            <span className="flex items-center space-x-4">
                <div className="w-2 h-2 rounded-full bg-[#47cd65]"></div> 
                <span>รายงานบัญชีเก็บสินทรัพย์ดิจิทัลของผู้ประกอบธุรกิจสินทรัพย์ดิจิทัล</span>
            </span>
        </div>
        <div>
            <DataTable
                columns={columns}
                theme="solarized"
                data={data}
                customStyles={customStyles}
            />
        </div>
    </div>
  )
}

export default BusWallet