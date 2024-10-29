import { store } from "@/app/store";
import { setUser } from "@/features/user/userSlice";
import { mockUser } from "@/__Test__/utils";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import OrderTradeEdit from "@/pages/createJob/orderTrade/orderTrade";
import userEvent from '@testing-library/user-event';
import { setOrderTrades } from "@/features/orderTrade/orderTradeSlice";
import { TOrderTrade } from "@/pages/createJob/orderTrade/constant/type";
import axios from "@/api/axios";
import MockAdapter from "axios-mock-adapter";

jest.mock("@/lib/utils", () => ({
  ...jest.requireActual("@/lib/utils"),
  isExpiredToken: jest.fn().mockReturnValue(false),
}));

jest.mock("@/lib/Cookies", () => ({
getCookies: jest.fn().mockReturnValue("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZhYjEyMmRjLTc3YzctNDlmYy04ZTBkLTg2NWVjYTY1MmI4MCIsImVtYWlsIjoiYjcwODk4NTY5ZWRjYjk5MjdhMDZkZDUxMTBmMWI4ZmUxZDQ2ZTVmOTg1ZTBkOWYyMjI0ZDc3NDg1NzU3ZjFlYSIsImdyb3VwcyI6WzEwMDEsMTAwMiwxMDAzLDIwMDEsMjAwMiwyMDAzXSwicGVybWlzc2lvbnMiOlsxMDEsMTAyLDEwMywyMDEsMjAyLDIwM10sInJvbGVzIjpbMTEsMTIsMTMsMjEsMjIsMjNdLCJ1c2VySWQiOiIiLCJsb2dpblN0YXR1cyI6IiIsImV4cGlyZXNEYXRlIjoiMDAwMS0wMS0wMVQwMDowMDowMFoiLCJFcnJvciI6bnVsbCwiZXhwIjoxNzI3MTY3MzQyLCJpYXQiOjE3MjcwODA5NDJ9.PWG3vMMN3POr-SWDnO4etQ5D1ZV2mX7D1Fzwsb8sfBg"),
}));

const mockAxios = new MockAdapter(axios);

const orderTradeMock =
  [
    {
        "id": "0614ff48-c498-4f2b-a70f-c86d639ce4c9",
        "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
        "CreatedAt": "2024-09-18T05:19:40.673Z",
        "DeletedAt": null,
        "operations": "buy",
        "registerId": "80000001",
        "cryptoAmount": 112345,
        "fiatAmount": 100010,
        "currency": "THB",
        "cryptoPrice": 110000,
        "pair": "THB/USDT",
        "transactionStatus": 0,
        "checkerStatus": false
    },
    {
        "id": "2d767e03-dbd5-4774-aff5-8ef825b5a2f2",
        "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
        "CreatedAt": "2024-09-18T05:20:28.135Z",
        "DeletedAt": null,
        "operations": "buy",
        "registerId": "80000001",
        "cryptoAmount": 111112,
        "fiatAmount": 110,
        "currency": "THB",
        "cryptoPrice": 110000,
        "pair": "THB/USDT",
        "transactionStatus": 0,
        "checkerStatus": false
    },
    {
        "id": "3b7c40da-723b-46f7-8012-60e769f18064",
        "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
        "CreatedAt": "2024-09-20T07:18:30.022Z",
        "DeletedAt": null,
        "operations": "buy",
        "registerId": "80000001",
        "cryptoAmount": 1000000,
        "fiatAmount": 1000000,
        "currency": "THB",
        "cryptoPrice": 1000000,
        "pair": "THB/USDT",
        "transactionStatus": 0,
        "checkerStatus": false
    },
    {
        "id": "441e3b29-93c2-4f72-95a5-2657898917e8",
        "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
        "CreatedAt": "2024-09-20T08:47:10.109Z",
        "DeletedAt": null,
        "operations": "buy",
        "registerId": "80000001",
        "cryptoAmount": 100000,
        "fiatAmount": 300000,
        "currency": "THB",
        "cryptoPrice": 200000,
        "pair": "THB/USDT",
        "transactionStatus": 0,
        "checkerStatus": false
    },
    {
        "id": "46e2a76b-df1a-4197-84ec-ca271c72f213",
        "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
        "CreatedAt": "2024-09-20T08:17:01.019Z",
        "DeletedAt": null,
        "operations": "buy",
        "registerId": "8001",
        "cryptoAmount": 100000,
        "fiatAmount": 100000,
        "currency": "THB",
        "cryptoPrice": 100000,
        "pair": "THB/USDT",
        "transactionStatus": 0,
        "checkerStatus": false
    },
    {
        "id": "52219af4-b083-4d4a-95f7-7b2a221978f1",
        "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
        "CreatedAt": "2024-09-20T08:42:32.227Z",
        "DeletedAt": null,
        "operations": "buy",
        "registerId": "80000006",
        "cryptoAmount": 100000,
        "fiatAmount": 100000,
        "currency": "THB",
        "cryptoPrice": 100000,
        "pair": "THB/USDT",
        "transactionStatus": 0,
        "checkerStatus": false
    },
    {
        "id": "70870d9e-1bd0-4b82-ae9c-4cece96dd6fb",
        "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
        "CreatedAt": "2024-09-20T08:03:17.852Z",
        "DeletedAt": null,
        "operations": "buy",
        "registerId": "80000010",
        "cryptoAmount": 100000,
        "fiatAmount": 100000,
        "currency": "THB",
        "cryptoPrice": 100000,
        "pair": "THB/USDT",
        "transactionStatus": 0,
        "checkerStatus": false
    },
    {
        "id": "838b03a4-e41a-4b6b-bbd0-14b3f2ea7259",
        "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
        "CreatedAt": "2024-09-20T08:03:30.146Z",
        "DeletedAt": null,
        "operations": "buy",
        "registerId": "80000012",
        "cryptoAmount": 200000,
        "fiatAmount": 200000,
        "currency": "USD",
        "cryptoPrice": 200000,
        "pair": "THB/USDT",
        "transactionStatus": 0,
        "checkerStatus": false
    },
    {
        "id": "a69b11cf-39b6-421c-8953-92c2865c38f7",
        "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
        "CreatedAt": "2024-10-03T02:36:38.059Z",
        "DeletedAt": null,
        "operations": "buy",
        "registerId": "234",
        "cryptoAmount": 23400000,
        "fiatAmount": 23400000,
        "currency": "THB",
        "cryptoPrice": 23400000,
        "pair": "THB/USDT",
        "transactionStatus": 0,
        "checkerStatus": false
    },
    {
        "id": "f607968e-cfc9-40a3-bee1-fe6bc5ed6ed2",
        "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
        "CreatedAt": "2024-09-18T05:19:59.279Z",
        "DeletedAt": null,
        "operations": "buy",
        "registerId": "80000001",
        "cryptoAmount": 112000,
        "fiatAmount": 123000,
        "currency": "THB",
        "cryptoPrice": 134500,
        "pair": "THB/USDT",
        "transactionStatus": 0,
        "checkerStatus": false
    },
    {
        "id": "fbcd5dd8-1b19-49f5-bef0-872e28c91c7d",
        "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
        "CreatedAt": "2024-09-24T05:34:20.727Z",
        "DeletedAt": null,
        "operations": "buy",
        "registerId": "80000005",
        "cryptoAmount": 100000,
        "fiatAmount": 100000,
        "currency": "THB",
        "cryptoPrice": 100000,
        "pair": "THB/USDT",
        "transactionStatus": 0,
        "checkerStatus": false
    }
]


describe("test order trade", () => {
    beforeEach(() => {
      jest.clearAllMocks();
      store.dispatch(setUser(mockUser));
    });
  
    test("test input data(multiple input type) create (buy)", async () => {

      let capturedRequestBody: any = null;

      mockAxios.onPost("/api/v1/transaction/order/create").reply((config) => {
        capturedRequestBody = JSON.parse(config.data);
        return [200, {}];
      });

      render(
        <Provider store={store}>
          <MemoryRouter>
            <OrderTradeEdit/>
          </MemoryRouter>
        </Provider>
      );

      const registerId = screen.getByLabelText("Corporate Code");
      expect(registerId).toBeInTheDocument();
      await act(async () => {
        fireEvent.change(registerId, { target: { value: 80000001 } });
      })

      userEvent.selectOptions(
        screen.getByTestId('pairDropdown'),
        screen.getByTestId('THB/USDC')
      )

      const buyButton = screen.getByTestId("buySellBtn-buy");
      expect(buyButton).toBeInTheDocument();
      fireEvent.click(buyButton);

      const cryptoAmount = screen.getByLabelText("Crypto Amount");
      expect(cryptoAmount).toBeInTheDocument();
      await act(async () => {
        fireEvent.change(cryptoAmount, { target: { value: 100 } });
      })

      const cryptoPrice = screen.getByLabelText("Crypto Price");
      expect(cryptoPrice).toBeInTheDocument();
      await act(async () => {
        fireEvent.change(cryptoPrice, { target: { value: 100 } });
      }) 

      const fiatAmount = screen.getByLabelText("Fiat Amount");
      expect(fiatAmount).toBeInTheDocument();
      await act(async () => {
        fireEvent.change(fiatAmount, { target: { value: 100 } });
      })

      userEvent.selectOptions(
        screen.getByTestId('currency-combobox'),
        screen.getByText('THB')
      );
  
      await waitFor(() => {
        expect(screen.getByTestId('currency-combobox')).toHaveValue('THB');
      });

      const submitBtn = screen.getByRole("button", { name: "Submit" });
      expect(submitBtn).toBeInTheDocument();
      await act(async () => {
        fireEvent.click(submitBtn);
      })

      // await waitFor(() => {
      //   const registerIdError = screen.getByText("Corporate Code is required");
      //   expect(registerIdError).toBeInTheDocument();
      // })
      
      //Expected form data
      const expectedFormData = {
          cryptoAmount: 10000000,
          fiatAmount: 10000000,
          currency: 'THB',
          cryptoPrice: 10000000,
          registerId: "80000001",
          operations: 'buy',
          pair: 'THB/USDC'
      };

      await waitFor(() => {
        expect(capturedRequestBody).toEqual(expectedFormData);
      })
  
    }, 20000);

    test("test input data(multiple input type) create (sell)", async () => {

      let capturedRequestBody: any = null;

      mockAxios.onPost("/api/v1/transaction/order/create").reply((config) => {
        capturedRequestBody = JSON.parse(config.data);
        return [200, {}];
      });

      render(
        <Provider store={store}>
          <MemoryRouter>
            <OrderTradeEdit/>
          </MemoryRouter>
        </Provider>
      );

      const registerId = screen.getByLabelText("Corporate Code");
      expect(registerId).toBeInTheDocument();
      await act(async () => {
        fireEvent.change(registerId, { target: { value: 80000001 } });
      })

      userEvent.selectOptions(
        screen.getByTestId('pairDropdown'),
        screen.getByTestId('THB/USDC')
      )

      const sellButton = screen.getByTestId("buySellBtn-sell");
      expect(sellButton).toBeInTheDocument();
      fireEvent.click(sellButton);

      const cryptoAmount = screen.getByLabelText("Crypto Amount");
      expect(cryptoAmount).toBeInTheDocument();
      await act(async () => {
        fireEvent.change(cryptoAmount, { target: { value: 100 } });
      })

      const cryptoPrice = screen.getByLabelText("Crypto Price");
      expect(cryptoPrice).toBeInTheDocument();
      await act(async () => {
        fireEvent.change(cryptoPrice, { target: { value: 100 } });
      }) 

      const fiatAmount = screen.getByLabelText("Fiat Amount");
      expect(fiatAmount).toBeInTheDocument();
      await act(async () => {
        fireEvent.change(fiatAmount, { target: { value: 100 } });
      })

      userEvent.selectOptions(
        screen.getByTestId('currency-combobox'),
        screen.getByTestId('sellCurrency')
      );
  
      await waitFor(() => {
        expect(screen.getByTestId('currency-combobox')).toHaveValue('USDC');
      });

      const submitBtn = screen.getByRole("button", { name: "Submit" });
      expect(submitBtn).toBeInTheDocument();
      await act(async () => {
        fireEvent.click(submitBtn);
      })

      // await waitFor(() => {
      //   const registerIdError = screen.getByText("Corporate Code is required");
      //   expect(registerIdError).toBeInTheDocument();
      // })
      //Expected form data
      const expectedFormData = {
          cryptoAmount: 10000000,
          fiatAmount: 10000000,
          currency: 'USDC',
          cryptoPrice: 10000000,
          registerId: "80000001",
          operations: 'sell',
          pair: 'THB/USDC'
      };

      await waitFor(() => {
        expect(capturedRequestBody).toEqual(expectedFormData);
      })
  
    }, 20000);

    test("test input data(multiple input type) update", async () => {

      let capturedRequestBody: any = null;

      mockAxios.onPost("/api/v1/transaction/order/edit").reply((config) => {
        capturedRequestBody = JSON.parse(config.data);
        return [200, {}];
      });

      render(
        <Provider store={store}>
          <MemoryRouter>
            <OrderTradeEdit/>
          </MemoryRouter>
        </Provider>
      );

      const orderTrades = orderTradeMock || [];

        const uniqueOrderTrades = orderTrades.filter(
          (order: any, index: any, self: any) =>
            index === self.findIndex((t: any) => t.id === order.id)
        );

        const adjustedOrderTrades = uniqueOrderTrades.map((order: TOrderTrade) => ({
          ...order,
          cryptoAmount: (Number(order.cryptoAmount) / 100000).toString(),
          cryptoPrice:  (Number(order.cryptoPrice) / 100000).toString(),
          fiatAmount:  (Number(order.fiatAmount) / 100000).toString(),
        }));

        store.dispatch(setOrderTrades(adjustedOrderTrades));

      await waitFor(() => {
        const editButton = screen.getByTestId("editButton-0614ff48-c498-4f2b-a70f-c86d639ce4c9");
        expect(editButton).toBeInTheDocument();
      })

      await act(async () => {
        const editButton = screen.getByTestId("editButton-0614ff48-c498-4f2b-a70f-c86d639ce4c9");
        fireEvent.click(editButton);
      })

      const submitBtn = screen.getByRole("button", { name: "Submit" });
      expect(submitBtn).toBeInTheDocument();
      await act(async () => {
        fireEvent.click(submitBtn);
      })

      //Expected form data
      const expectedFormData = {
          registerId: "80000001",
          cryptoAmount: 112345,
          fiatAmount: 100010,
          currency: 'THB',
          cryptoPrice: 110000,
          operations: 'buy',
          pair: "THB/USDT",
          id: '0614ff48-c498-4f2b-a70f-c86d639ce4c9'
      };

      await waitFor(() => {
        expect(capturedRequestBody).toEqual(expectedFormData);
      })
  
    }, 20000);

  });