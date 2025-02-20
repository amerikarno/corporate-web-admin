export type TOrderTrade = {
  registerId: string | null;
  operations?: string;
  cryptoAmount: string | number | null;
  fiatAmount: string | number | null;
  currency: string;
  cryptoPrice: string | number | null;
  pair?: string;
  id?: string;
  transactionStatus?: number;
};
