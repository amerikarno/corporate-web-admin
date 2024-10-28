export type TTransaction = {
  id: string;
  registerId: string;
  operations: string;
  cryptoAmount: number;
  cryptoPrice: number;
  currency: string;
  fiatAmount: number;
  pair: string;
  transactionStatus?: number;
};
