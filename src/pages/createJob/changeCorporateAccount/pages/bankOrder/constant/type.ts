export type TBankOrder = {
    bankName: string;
    bankAccount: string;
    operations? : string;
    orderValue:number | string |null;
    accountId:number | null;
    id?:string;
    transactionStatus?: number;
}