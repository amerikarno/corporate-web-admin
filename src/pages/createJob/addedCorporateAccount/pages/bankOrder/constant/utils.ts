type TBankOrder = {
    corporateCode?: number;
    customerCode?: number;
    bankName: string;
    bankAccount: string;
    orderValue: number;
    operations?: string;
    id?:string;
    transactionStatus?: number;
  }
  
export const mockCorporateTransactionData: TBankOrder[] = [
    {
      corporateCode: 101,
      customerCode: 1001,
      bankName: "ธนาคารกรุงเทพ จำกัด (มหาชน)",
      bankAccount: "123456789",
      orderValue: 5000,
      operations: "deposit",
      id: "1",
      transactionStatus: 2,
    },
    {
      corporateCode: 102,
      customerCode: 1002,
      bankName: "ธนาคารกสิกรไทย จำกัด (มหาชน)",
      bankAccount: "987654321",
      orderValue: 7500,
      operations: "withdraw",
      id: "2",
      transactionStatus: 1,
    },
    {
      corporateCode: 103,
      customerCode: 1003,
      bankName: "ธนาคารกรุงไทย จำกัด (มหาชน)",
      bankAccount: "112233445",
      orderValue: 10000,
      operations: "deposit",
      id: "3",
      transactionStatus: 0,
    },
    {
      corporateCode: 104,
      customerCode: 1004,
      bankName: "ธนาคารเจพีมอร์แกน เชส",
      bankAccount: "556677889",
      orderValue: 12000,
      operations: "withdraw",
      id: "4",
      transactionStatus: -1,
    },
    {
      corporateCode: 105,
      customerCode: 1005,
      bankName: "ธนาคารโอเวอร์ซี-ไชนีสแบงกิ้งคอร์ปอเรชั่น จำกัด",
      bankAccount: "998877665",
      orderValue: 15000,
      operations: "deposit",
      id: "5",
      transactionStatus: 2,
    }
  ];