export type TOrderTrade = {
  corporateCode: number;
  operations?: string;
  cryptoAmount: number | null;
  fiatAmount: number | null;
  currency: string;
  cryptoPrice: number | null;
  pair: string;
  id?: string;
  transactionStatus?: number;
};
