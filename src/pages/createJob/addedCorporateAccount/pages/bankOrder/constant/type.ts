export type TBankOrder = {
    bankName: string;
    bankAccount: string;
    operations? : string;
    orderValue:number | string |null;
    registerId:string | null;
    id?:string;
    transactionStatus?: number;
}