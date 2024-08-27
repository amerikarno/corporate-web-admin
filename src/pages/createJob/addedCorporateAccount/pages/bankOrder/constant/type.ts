export type TBankOrder = {
    bankName: string;
    bankAccount: string;
    operations? : string;
    orderValue:number;
    id?:string;
}