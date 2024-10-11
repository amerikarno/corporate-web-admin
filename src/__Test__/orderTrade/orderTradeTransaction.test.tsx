import { store } from "@/app/store";
import { setUser } from "@/features/user/userSlice";
import { mockUser } from "@/__Test__/utils";
import {fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import axios from "@/api/axios";
import MockAdapter from "axios-mock-adapter";
import TransactionList from "@/pages/todoList/orderTrade/transactionList";
import { act } from "react";
// import React from "react";
// import { TTransaction } from "@/pages/todoList/orderTrade/constant/type";

jest.mock("@/lib/utils", () => ({
  ...jest.requireActual("@/lib/utils"),
  isExpiredToken: jest.fn().mockReturnValue(false),
}));

jest.mock("@/lib/Cookies", () => ({
getCookies: jest.fn().mockReturnValue("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZhYjEyMmRjLTc3YzctNDlmYy04ZTBkLTg2NWVjYTY1MmI4MCIsImVtYWlsIjoiYjcwODk4NTY5ZWRjYjk5MjdhMDZkZDUxMTBmMWI4ZmUxZDQ2ZTVmOTg1ZTBkOWYyMjI0ZDc3NDg1NzU3ZjFlYSIsImdyb3VwcyI6WzEwMDEsMTAwMiwxMDAzLDIwMDEsMjAwMiwyMDAzXSwicGVybWlzc2lvbnMiOlsxMDEsMTAyLDEwMywyMDEsMjAyLDIwM10sInJvbGVzIjpbMTEsMTIsMTMsMjEsMjIsMjNdLCJ1c2VySWQiOiIiLCJsb2dpblN0YXR1cyI6IiIsImV4cGlyZXNEYXRlIjoiMDAwMS0wMS0wMVQwMDowMDowMFoiLCJFcnJvciI6bnVsbCwiZXhwIjoxNzI3MTY3MzQyLCJpYXQiOjE3MjcwODA5NDJ9.PWG3vMMN3POr-SWDnO4etQ5D1ZV2mX7D1Fzwsb8sfBg"),
}));

const mockAxios = new MockAdapter(axios);

const mockListOfTransaction = [
    {
        "id": "d87c14f2-83c5-4d1a-a90f-062ad450a23e",
        "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
        "CreatedAt": "2024-10-03T09:44:39.471Z",
        "DeletedAt": null,
        "operations": "sell",
        "corporateCode": 80000013,
        "cryptoAmount": 12312300,
        "fiatAmount": 12300000,
        "currency": "USDC",
        "cryptoPrice": 21312312300,
        "pair": "THB/USDC",
        "transactionStatus": 0,
        "checkerStatus": false
    },
    {
        "id": "ddee8bf9-783c-410c-8a13-0cd36c8c803f",
        "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
        "CreatedAt": "2024-10-03T09:44:23.321Z",
        "DeletedAt": null,
        "operations": "buy",
        "corporateCode": 80000011,
        "cryptoAmount": 100000,
        "fiatAmount": 100000,
        "currency": "THB",
        "cryptoPrice": 100000,
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
        "corporateCode": 80000001,
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
        "corporateCode": 80000005,
        "cryptoAmount": 100000,
        "fiatAmount": 100000,
        "currency": "THB",
        "cryptoPrice": 100000,
        "pair": "THB/USDT",
        "transactionStatus": 0,
        "checkerStatus": false
    }
]


describe("test order trade transaction", () => {
    beforeEach(() => {
      jest.clearAllMocks();
      store.dispatch(setUser(mockUser));
      mockAxios.reset();
    });
  
    test("test table", async () => {
      mockAxios.onGet("/api/v1/transaction/order/get").reply(200, 
        mockListOfTransaction,
      );
  
      render(
        <Provider store={store}>
          <MemoryRouter>
            <TransactionList />
          </MemoryRouter>
        </Provider>
      );
  
      await waitFor(() => {

        expect(screen.getByText("Transaction ID")).toBeInTheDocument();
        expect(screen.getByText("Corporate Code")).toBeInTheDocument();
        expect(screen.getByText("Buy/Sell")).toBeInTheDocument();
        expect(screen.getByText("Crypto Amount")).toBeInTheDocument();
        expect(screen.getByText("Crypto Price")).toBeInTheDocument();
        expect(screen.getByText("Fiat Amount")).toBeInTheDocument();
        expect(screen.getByText("Trading Pairs")).toBeInTheDocument();
        expect(screen.getByText("Currency")).toBeInTheDocument();
        expect(screen.getByText("Status")).toBeInTheDocument();
        expect(screen.getByText("Approve")).toBeInTheDocument();
        expect(screen.getByText("Reject")).toBeInTheDocument();
      });
    }, 20000);

    test("test approve button", async () => {
      mockAxios.onGet("/api/v1/transaction/order/get").reply(200, 
        mockListOfTransaction,
      );
      mockAxios.onPost("/api/v1/transaction/order/review").reply(200, 
        {
            message:"aprrove success"
        },
      );
  
      render(
        <Provider store={store}>
          <MemoryRouter>
            <TransactionList />
          </MemoryRouter>
        </Provider>
      );
      
      await waitFor(() => {
        expect(screen.getByTestId("approve-f607968e-cfc9-40a3-bee1-fe6bc5ed6ed2")).toBeInTheDocument();
        expect(screen.getByTestId("approve-f607968e-cfc9-40a3-bee1-fe6bc5ed6ed2")).not.toBeChecked();
        expect(screen.getByTestId("reject-f607968e-cfc9-40a3-bee1-fe6bc5ed6ed2")).toBeInTheDocument();
        expect(screen.getByTestId("reject-f607968e-cfc9-40a3-bee1-fe6bc5ed6ed2")).not.toBeChecked();
      });

      await act(async () => {
        fireEvent.click(screen.getByTestId("approve-f607968e-cfc9-40a3-bee1-fe6bc5ed6ed2"));
      });

      const submitBtn = screen.getByRole("button", { name: "Submit" });
      expect(submitBtn).toBeInTheDocument();
      await act(async () => {
        fireEvent.click(submitBtn);
      });

      const expectedFormData = {data: [
        {
          transactionId: 'f607968e-cfc9-40a3-bee1-fe6bc5ed6ed2',
          ReviewStatus: true
        }
      ]}

      await waitFor(() => {
        const state = store.getState();
        const corporateState = state.corporateTest;
        console.log("orderTrade State After Submission:", corporateState);
        expect(corporateState).toMatchObject(expectedFormData);
    });
      
    }, 20000);

    test("test reject button", async () => {
        mockAxios.onGet("/api/v1/transaction/order/get").reply(200, 
          mockListOfTransaction,
        );
        mockAxios.onPost("/api/v1/transaction/order/review").reply(200, 
            {
                message:"reject success"
            },
          );
    
        render(
          <Provider store={store}>
            <MemoryRouter>
              <TransactionList />
            </MemoryRouter>
          </Provider>
        );
        
        await waitFor(() => {
          expect(screen.getByTestId("approve-f607968e-cfc9-40a3-bee1-fe6bc5ed6ed2")).toBeInTheDocument();
          expect(screen.getByTestId("approve-f607968e-cfc9-40a3-bee1-fe6bc5ed6ed2")).not.toBeChecked();
          expect(screen.getByTestId("reject-f607968e-cfc9-40a3-bee1-fe6bc5ed6ed2")).toBeInTheDocument();
          expect(screen.getByTestId("reject-f607968e-cfc9-40a3-bee1-fe6bc5ed6ed2")).not.toBeChecked();
        });
  
        await act(async () => {
          fireEvent.click(screen.getByTestId("reject-f607968e-cfc9-40a3-bee1-fe6bc5ed6ed2"));
        });
  
        const submitBtn = screen.getByRole("button", { name: "Submit" });
        expect(submitBtn).toBeInTheDocument();
        await act(async () => {
          fireEvent.click(submitBtn);
        });
  
        const expectedFormData = {data: [
          {
            transactionId: 'f607968e-cfc9-40a3-bee1-fe6bc5ed6ed2',
            ReviewStatus: false
          }
        ]}
  
        await waitFor(() => {
          const state = store.getState();
          const corporateState = state.corporateTest;
          console.log("orderTrade State After Submission:", corporateState);
          expect(corporateState).toMatchObject(expectedFormData);
      });
        
      }, 20000);
  });