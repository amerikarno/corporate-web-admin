export type TBankOrder = {
    bankName: string;
    bankAccount: string;
    operations? : string;
    orderValue:number;
    accountId:number;
    id?:string;
}