export type TBankOrder = {
    bankName: string;
    bankAccount: string;
    operations? : string;
    orderValue:number | null;
    accountId:number | null;
    id?:string;
    transactionStatus?: number;
}