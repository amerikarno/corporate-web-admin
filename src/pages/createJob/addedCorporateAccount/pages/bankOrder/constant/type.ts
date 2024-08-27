export type TBankOrder = {
    corporateCode: number;
    operations? : string;
    cryptoAmount:number;
    fiatAmount:number;
    currency:string;
    cryptoPrice:number;
    pair:string;
    id?:string;
}