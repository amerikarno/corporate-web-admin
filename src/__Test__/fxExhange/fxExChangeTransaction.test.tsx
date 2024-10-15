import { store } from "@/app/store";
import { setUser } from "@/features/user/userSlice";
import { mockUser } from "@/__Test__/utils";
import {fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import axios from "@/api/axios";
import MockAdapter from "axios-mock-adapter";
import FxExchangeTransactionList from "@/pages/todoList/fxExchange/fxExchangeTransaction";
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

const mockListOfFxExChange = [
    {
        "id": "0438df56-d8d1-42b7-aaeb-cdd8fcba8426",
        "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
        "CreatedAt": "2024-10-07T03:48:47.238Z",
        "DeletedAt": null,
        "corporateCode": 12345,
        "accountId": 0,
        "exchange": "THB/USD",
        "exchangeRate": 1234500000,
        "exchangeSpread": 1234500000,
        "operationSpread": 1234500000,
        "buyCurrency": 12345600000,
        "transactionStatus": 0,
        "checkerStatus": false
    },
    {
        "id": "0e44fc58-8b08-4631-a108-adf0f3997841",
        "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
        "CreatedAt": "2024-10-07T03:35:53.899Z",
        "DeletedAt": null,
        "corporateCode": 80000001,
        "accountId": 0,
        "exchange": "THB/USD",
        "exchangeRate": 3000000,
        "exchangeSpread": 10000,
        "operationSpread": 5000,
        "buyCurrency": 100000000,
        "transactionStatus": 0,
        "checkerStatus": false
    },
    {
        "id": "66fe9584-7e74-49b0-ae96-93daec0e4ed0",
        "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
        "CreatedAt": "2024-10-07T03:39:34.46Z",
        "DeletedAt": null,
        "corporateCode": 80000003,
        "accountId": 0,
        "exchange": "THB/USD",
        "exchangeRate": 1000000,
        "exchangeSpread": 1000000,
        "operationSpread": 2000000,
        "buyCurrency": 12300000,
        "transactionStatus": 0,
        "checkerStatus": false
    },
    {
        "id": "b3b1b1b0-a4d6-46c6-ab62-f4e4d1321f2c",
        "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
        "CreatedAt": "2024-09-18T05:22:17.91Z",
        "DeletedAt": null,
        "corporateCode": 80000005,
        "accountId": 0,
        "exchange": "THB/USD",
        "exchangeRate": 12312300,
        "exchangeSpread": 12312300,
        "operationSpread": 12312300,
        "buyCurrency": 12300000,
        "transactionStatus": 0,
        "checkerStatus": false
    },
    {
        "id": "dcd09767-a276-42f7-9919-140a3844a44a",
        "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
        "CreatedAt": "2024-09-18T05:22:35.524Z",
        "DeletedAt": null,
        "corporateCode": 80000007,
        "accountId": 0,
        "exchange": "THB/USD",
        "exchangeRate": 1200000,
        "exchangeSpread": 12300000,
        "operationSpread": 12300000,
        "buyCurrency": 110000,
        "transactionStatus": 0,
        "checkerStatus": false
    },
    {
        "id": "fc14a010-83ce-4f37-a77d-a33beffa7057",
        "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
        "CreatedAt": "2024-10-07T03:37:55.21Z",
        "DeletedAt": null,
        "corporateCode": 80000007,
        "accountId": 0,
        "exchange": "THB/USD",
        "exchangeRate": 32400000,
        "exchangeSpread": 1000000,
        "operationSpread": 2000000,
        "buyCurrency": 12300000,
        "transactionStatus": 0,
        "checkerStatus": false
    }
]


describe("test cash deposite/withdraw transaction", () => {
    beforeEach(() => {
      jest.clearAllMocks();
      store.dispatch(setUser(mockUser));
      mockAxios.reset();
    });
  
    test("test table", async () => {
      mockAxios.onGet("/api/v1/transaction/exchange/get/corporate").reply(200, 
        mockListOfFxExChange,
      );
  
      render(
        <Provider store={store}>
          <MemoryRouter>
            <FxExchangeTransactionList />
          </MemoryRouter>
        </Provider>
      );
  
      await waitFor(() => {

        expect(screen.getByText("Transaction ID")).toBeInTheDocument();
        expect(screen.getByText("Corporate Code")).toBeInTheDocument();
        expect(screen.getByText("Buy Amount")).toBeInTheDocument();
        expect(screen.getByText("Exchange Pairs")).toBeInTheDocument();
        expect(screen.getByText("Exchange Rate")).toBeInTheDocument();
        expect(screen.getByText("Exchange Spread")).toBeInTheDocument();
        expect(screen.getByText("Operation Spread")).toBeInTheDocument();
        expect(screen.getByText("Status")).toBeInTheDocument();
        expect(screen.getByText("Approve")).toBeInTheDocument();
        expect(screen.getByText("Reject")).toBeInTheDocument();
      });
    }, 20000);

    test("test approve button", async () => {
      mockAxios.onGet("/api/v1/transaction/exchange/get/corporate").reply(200, 
        mockListOfFxExChange,
      );
      mockAxios.onPost("/api/v1/transaction/exchange/review").reply(200, 
        {
            message:"aprrove success"
        },
      );
  
      render(
        <Provider store={store}>
          <MemoryRouter>
            <FxExchangeTransactionList />
          </MemoryRouter>
        </Provider>
      );
      
      await waitFor(() => {
        expect(screen.getByTestId("approve-0438df56-d8d1-42b7-aaeb-cdd8fcba8426")).toBeInTheDocument();
        expect(screen.getByTestId("approve-0438df56-d8d1-42b7-aaeb-cdd8fcba8426")).not.toBeChecked();
        expect(screen.getByTestId("reject-0438df56-d8d1-42b7-aaeb-cdd8fcba8426")).toBeInTheDocument();
        expect(screen.getByTestId("reject-0438df56-d8d1-42b7-aaeb-cdd8fcba8426")).not.toBeChecked();
      });

      await act(async () => {
        fireEvent.click(screen.getByTestId("approve-0438df56-d8d1-42b7-aaeb-cdd8fcba8426"));
      });

      const submitBtn = screen.getByRole("button", { name: "Submit" });
      expect(submitBtn).toBeInTheDocument();
      await act(async () => {
        fireEvent.click(submitBtn);
      });

      const expectedFormData = {data: [
        {
          transactionId: '0438df56-d8d1-42b7-aaeb-cdd8fcba8426',
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
        mockAxios.onGet("/api/v1/transaction/exchange/get/corporate").reply(200, 
            mockListOfFxExChange,
        );
        mockAxios.onPost("/api/v1/transaction/exchange/review").reply(200, 
            {
                message:"reject success"
            },
          );
    
        render(
          <Provider store={store}>
            <MemoryRouter>
              <FxExchangeTransactionList />
            </MemoryRouter>
          </Provider>
        );
        
        await waitFor(() => {
          expect(screen.getByTestId("approve-0438df56-d8d1-42b7-aaeb-cdd8fcba8426")).toBeInTheDocument();
          expect(screen.getByTestId("approve-0438df56-d8d1-42b7-aaeb-cdd8fcba8426")).not.toBeChecked();
          expect(screen.getByTestId("reject-0438df56-d8d1-42b7-aaeb-cdd8fcba8426")).toBeInTheDocument();
          expect(screen.getByTestId("reject-0438df56-d8d1-42b7-aaeb-cdd8fcba8426")).not.toBeChecked();
        });
  
        await act(async () => {
          fireEvent.click(screen.getByTestId("reject-0438df56-d8d1-42b7-aaeb-cdd8fcba8426"));
        });
  
        const submitBtn = screen.getByRole("button", { name: "Submit" });
        expect(submitBtn).toBeInTheDocument();
        await act(async () => {
          fireEvent.click(submitBtn);
        });
  
        const expectedFormData = {data: [
          {
            transactionId: '0438df56-d8d1-42b7-aaeb-cdd8fcba8426',
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