import { store } from "@/app/store";
import { setUser } from "@/features/user/userSlice";
import { mockUser } from "@/__Test__/utils";
import {fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import axios from "@/api/axios";
import MockAdapter from "axios-mock-adapter";
import BankTransactionList from "@/pages/todoList/bankTransactionList/bankTransactionList";
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

const mockListOfBank =[
    {
        "id": "4a7aef54-222c-42f0-ba5c-a518ab884e64",
        "createBy": "fab122dc-77c7-49fc-8e0d-865eca652b80",
        "CreatedAt": "2024-09-06T05:42:57.12Z",
        "DeletedAt": null,
        "corporateCode": 80000001,
        "accountId": 0,
        "bankName": "ธนาคารกรุงเทพ จำกัด (มหาชน)",
        "bankAccount": "1212312121",
        "orderValue": 50000,
        "operations": "deposite",
        "transactionStatus": 0,
        "checkerStatus": false,
        "type": 0
    },
    {
        "id": "92e7bb2b-619a-4e6f-88b9-c9c286ba90d9",
        "createBy": "fab122dc-77c7-49fc-8e0d-865eca652b80",
        "CreatedAt": "2024-09-06T05:42:32.06Z",
        "DeletedAt": null,
        "corporateCode": 80000001,
        "accountId": 0,
        "bankName": "ธนาคารกรุงเทพ จำกัด (มหาชน)",
        "bankAccount": "1212312121",
        "orderValue": 50000,
        "operations": "deposite",
        "transactionStatus": 0,
        "checkerStatus": false,
        "type": 0
    }
]


describe("test cash deposite/withdraw transaction", () => {
    beforeEach(() => {
      jest.clearAllMocks();
      store.dispatch(setUser(mockUser));
      mockAxios.reset();
    });
  
    test("test table", async () => {
      mockAxios.onGet("/api/v1/transaction/bank/get/individual").reply(200, 
        mockListOfBank,
      );
  
      render(
        <Provider store={store}>
          <MemoryRouter>
            <BankTransactionList />
          </MemoryRouter>
        </Provider>
      );
  
      await waitFor(() => {

        expect(screen.getByText("Transaction ID")).toBeInTheDocument();
        expect(screen.getByText("Corporate Code")).toBeInTheDocument();
        expect(screen.getByText("Bank Name")).toBeInTheDocument();
        expect(screen.getByText("Bank Account")).toBeInTheDocument();
        expect(screen.getByText("Cash Value")).toBeInTheDocument();
        expect(screen.getByText("Status")).toBeInTheDocument();
        expect(screen.getByText("Approve")).toBeInTheDocument();
        expect(screen.getByText("Reject")).toBeInTheDocument();
      });
    }, 20000);

    test("test approve button", async () => {
      mockAxios.onGet("/api/v1/transaction/bank/get/individual").reply(200, 
        mockListOfBank,
      );
      mockAxios.onPost("/api/v1/transaction/bank/review").reply(200, 
        {
            message:"aprrove success"
        },
      );
  
      render(
        <Provider store={store}>
          <MemoryRouter>
            <BankTransactionList />
          </MemoryRouter>
        </Provider>
      );
      
      await waitFor(() => {
        expect(screen.getByTestId("approve-4a7aef54-222c-42f0-ba5c-a518ab884e64")).toBeInTheDocument();
        expect(screen.getByTestId("approve-4a7aef54-222c-42f0-ba5c-a518ab884e64")).not.toBeChecked();
        expect(screen.getByTestId("reject-4a7aef54-222c-42f0-ba5c-a518ab884e64")).toBeInTheDocument();
        expect(screen.getByTestId("reject-4a7aef54-222c-42f0-ba5c-a518ab884e64")).not.toBeChecked();
      });

      await act(async () => {
        fireEvent.click(screen.getByTestId("approve-4a7aef54-222c-42f0-ba5c-a518ab884e64"));
      });

      const submitBtn = screen.getByRole("button", { name: "Submit" });
      expect(submitBtn).toBeInTheDocument();
      await act(async () => {
        fireEvent.click(submitBtn);
      });

      const expectedFormData = {data: [
        {
          transactionId: '4a7aef54-222c-42f0-ba5c-a518ab884e64',
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
        mockAxios.onGet("/api/v1/transaction/bank/get/individual").reply(200, 
            mockListOfBank,
        );
        mockAxios.onPost("/api/v1/transaction/bank/review").reply(200, 
            {
                message:"reject success"
            },
          );
    
        render(
          <Provider store={store}>
            <MemoryRouter>
              <BankTransactionList />
            </MemoryRouter>
          </Provider>
        );
        
        await waitFor(() => {
          expect(screen.getByTestId("approve-4a7aef54-222c-42f0-ba5c-a518ab884e64")).toBeInTheDocument();
          expect(screen.getByTestId("approve-4a7aef54-222c-42f0-ba5c-a518ab884e64")).not.toBeChecked();
          expect(screen.getByTestId("reject-4a7aef54-222c-42f0-ba5c-a518ab884e64")).toBeInTheDocument();
          expect(screen.getByTestId("reject-4a7aef54-222c-42f0-ba5c-a518ab884e64")).not.toBeChecked();
        });
  
        await act(async () => {
          fireEvent.click(screen.getByTestId("reject-4a7aef54-222c-42f0-ba5c-a518ab884e64"));
        });
  
        const submitBtn = screen.getByRole("button", { name: "Submit" });
        expect(submitBtn).toBeInTheDocument();
        await act(async () => {
          fireEvent.click(submitBtn);
        });
  
        const expectedFormData = {data: [
          {
            transactionId: '4a7aef54-222c-42f0-ba5c-a518ab884e64',
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