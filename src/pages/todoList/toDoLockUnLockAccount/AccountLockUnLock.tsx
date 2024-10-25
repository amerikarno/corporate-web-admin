import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card"
import { useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { FaBackward, FaForward } from "react-icons/fa";

type TSearchBoy = {
    corporateCode?: string;
    accountId?:string;
    page?:number;
}

type TCorporateTable = {
    corporateCode:string;
    juristicName:string;
    taxId:string;
}

type TAccountTable = {
    accountId:string;
    thName:string;
    thSurname:string;
    idCard:string;
}

type CustomPaginationProps = {
    rowsPerPage: number;
    rowCount: number;
    onChangePage: (page: number, totalRows: number) => void;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  }

const AccountLockUnLock = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [total,setTotal] = useState(1);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (body:TSearchBoy) => {
        console.log(body);
    }

    const corporateCoulmn: TableColumn<TCorporateTable>[] = [
        {
            name: "Corporate Code",
            selector: (row:TCorporateTable) => row.corporateCode,
            
        },
        {
            name: "Juristic Name",
            selector: (row:TCorporateTable) => row.juristicName,
        },
        {
            name: "Tax Id",
            selector: (row:TCorporateTable) => row.taxId,
        }
    ]

    const accountCoulmn: TableColumn<TAccountTable>[] = [
        {
            name: "Account Id",
            selector: (row:TAccountTable) => row.accountId,
        },
        {
            name: "Name",
            selector: (row:TAccountTable) => row.thName,
        },
        {
            name: "Surname",
            selector: (row:TAccountTable) => row.thSurname,
        },
        {
            name: "Id Card",
            selector: (row:TAccountTable) => row.idCard,
        }
    ]
    
    const CustomPagination = ({ rowsPerPage, rowCount, onChangePage, currentPage, setCurrentPage }: CustomPaginationProps) => {
        const handleNextPage = () => {
          const nextPage = currentPage + 1;
          setCurrentPage(nextPage);
          onChangePage(nextPage, rowCount);
          setLoading(true);
            handleSearch({
              page: nextPage
            }).then(() =>{
                setLoading(false);
            });
        };
      
        const handlePreviousPage = () => {
          const prevPage = currentPage - 1;
          setCurrentPage(prevPage);
          onChangePage(prevPage, rowCount);
          setLoading(true);
            handleSearch({
              page: prevPage
            }).then(() =>{
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
      
  return (
    <div className="flex justify-center">
      <Card>
      <DataTable
              className="overflow-scroll"
              columns={accountCoulmn}
              data={[]}
            //   data={updatedMockedCorporateData}
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
      </Card>
    </div>
  )
}

export default AccountLockUnLock
