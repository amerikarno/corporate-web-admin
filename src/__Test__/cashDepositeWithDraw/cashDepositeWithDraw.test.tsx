import { store } from "@/app/store";
import { setUser } from "@/features/user/userSlice";
import { mockUser } from "@/__Test__/utils";
import axios from "@/api/axios";
import MockAdapter from "axios-mock-adapter";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import BankOrderEdit from "@/pages/createJob/addedCorporateAccount/pages/bankOrder/bankOrder";
import { act, fireEvent,render,screen, waitFor, } from "@testing-library/react";
import { setBankOrder } from "@/features/bankOrder/bankOrdersSlice";
import { TBankOrder } from "@/pages/createJob/addedCorporateAccount/pages/bankOrder/constant/type";

jest.mock("@/lib/utils", () => ({
    ...jest.requireActual("@/lib/utils"),
    isExpiredToken: jest.fn().mockReturnValue(false),
}));

const mockAxios = new MockAdapter(axios);

const mockedCashDesositeWithdraw = 
[
  {
      "id": "0f153a84-13cc-40e1-a5fa-eb3faf0564d6",
      "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
      "CreatedAt": "2024-09-18T05:21:28.452Z",
      "DeletedAt": null,
      "corporateCode": 0,
      "accountId": 80000010,
      "bankName": "ธนาคารซูมิโตโม มิตซุย แบงกิ้ง คอร์ปอเรชั่น",
      "bankAccount": "1",
      "orderValue": 12345612300,
      "operations": "deposite",
      "transactionStatus": 0,
      "checkerStatus": false
  },
  {
      "id": "21680078-886a-4e53-95b1-366b3a375c8e",
      "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
      "CreatedAt": "2024-10-07T01:52:27.535Z",
      "DeletedAt": null,
      "corporateCode": 0,
      "accountId": 80000010,
      "bankName": "ธนาคารยูโอบี จำกัด (มหาชน)",
      "bankAccount": "1212312121",
      "orderValue": 5432100000,
      "operations": "deposite",
      "transactionStatus": 0,
      "checkerStatus": false
  },
  {
      "id": "368e8fe7-c632-4f17-b819-0e6c91cacfee",
      "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
      "CreatedAt": "2024-10-04T01:39:18.119Z",
      "DeletedAt": null,
      "corporateCode": 0,
      "accountId": 80000011,
      "bankName": "ธนาคารกสิกรไทย จำกัด (มหาชน)",
      "bankAccount": "1212312121",
      "orderValue": 5000000000,
      "operations": "deposite",
      "transactionStatus": 0,
      "checkerStatus": false
  },
  {
      "id": "a75e26d5-c040-46c7-b6c5-571a426a0038",
      "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
      "CreatedAt": "2024-10-07T01:52:40.803Z",
      "DeletedAt": null,
      "corporateCode": 0,
      "accountId": 12345,
      "bankName": "ธนาคารกรุงเทพ จำกัด (มหาชน)",
      "bankAccount": "12345",
      "orderValue": 5000000000,
      "operations": "deposite",
      "transactionStatus": 0,
      "checkerStatus": false
  },
  {
      "id": "afffc565-a592-400f-a6f0-e4a357dbe3eb",
      "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
      "CreatedAt": "2024-09-18T05:21:16.367Z",
      "DeletedAt": null,
      "corporateCode": 0,
      "accountId": 80000010,
      "bankName": "ธนาคารกรุงเทพ จำกัด (มหาชน)",
      "bankAccount": "1",
      "orderValue": 144400,
      "operations": "deposite",
      "transactionStatus": 0,
      "checkerStatus": false
  },
  {
      "id": "c4b12490-dbc6-450f-b6d1-fe0c12aff4f6",
      "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
      "CreatedAt": "2024-10-04T01:54:47.958Z",
      "DeletedAt": null,
      "corporateCode": 0,
      "accountId": 80000001,
      "bankName": "ธนาคารกสิกรไทย จำกัด (มหาชน)",
      "bankAccount": "753285427852",
      "orderValue": 100000000,
      "operations": "withdraw",
      "transactionStatus": 0,
      "checkerStatus": false
  }
]

describe("test cash deposite withdraw", () => {
  beforeEach(() => {
      jest.clearAllMocks();
      store.dispatch(setUser(mockUser));
  });
  test("test cash deposite withdraw edit", async () => {
      mockAxios.onPost("/api/v1/transaction/bank/create").reply(200, {
          message: "create bank order success",
      });
      mockAxios.onPost("/api/v1/transaction/bank/edit").reply(200, {
        message: "edit bank order success",
    });
    mockAxios.onPost("/api/v1/corporate/query/all").reply(200, {
      message: "edit bank order success",
      data:{}
  });
  mockAxios.onPost("/api/v1/transaction/bank/get/individual").reply(200, {
    message: "edit bank order success",
    data:mockedCashDesositeWithdraw
});

      const orderTrades = mockedCashDesositeWithdraw || [];

          const uniqueOrderTrades = orderTrades.filter((order:any, index:any, self:any) =>
            index === self.findIndex((t:any) => t.id === order.id)
          );

          const adjustedBankOrders = uniqueOrderTrades.map((order:TBankOrder) => ({
            ...order,
            orderValue: (Number(order.orderValue) / 100000).toString(),
          }));

          store.dispatch(setBankOrder(adjustedBankOrders));
          console.log( adjustedBankOrders[0]);
      render(
          <Provider store={store}>
              <MemoryRouter>
                  <BankOrderEdit />
              </MemoryRouter>
          </Provider>
      );

      
      const corporateCode = screen.getByLabelText("Corporate Code");
      expect(corporateCode).toBeInTheDocument();
      await act(async () => {
          fireEvent.change(corporateCode, { target: { value: 80000001 } });
      });

      await waitFor(() => {
          expect(screen.getByLabelText("Corporate Code")).toHaveValue("80000001");
      });

      userEvent.selectOptions(
          screen.getByTestId('bankName'),
          screen.getByTestId('ธนาคารกสิกรไทย จำกัด (มหาชน)')
      );

      await waitFor(() => {
          expect(screen.getByTestId('bankName')).toHaveValue("ธนาคารกสิกรไทย จำกัด (มหาชน)");
      });

      const bankId = screen.getByLabelText("Bank Account ID");
      expect(bankId).toBeInTheDocument();
      await act(async () => {
          fireEvent.change(bankId, { target: { value: "753285427852" } });
      });

      await waitFor(() => {
          expect(screen.getByLabelText("Bank Account ID")).toHaveValue("753285427852");
      });

      const orderValue = screen.getByLabelText("Order Value");
      expect(orderValue).toBeInTheDocument();
      await act(async () => {
          fireEvent.change(orderValue, { target: { value: "1000" } });
      });

      await waitFor(() => {
          expect(screen.getByLabelText("Order Value")).toHaveValue(1000);
      });

      await waitFor(() => {
          expect(screen.getByTestId("editButton-0f153a84-13cc-40e1-a5fa-eb3faf0564d6")).toBeInTheDocument();
      })

      await act(async () => {
          fireEvent.click(screen.getByTestId("editButton-0f153a84-13cc-40e1-a5fa-eb3faf0564d6"));
      });

      await waitFor(() => {
        expect(screen.getByLabelText("Corporate Code")).toHaveValue("80000010");
        expect(screen.getByTestId('bankName')).toHaveValue("ธนาคารซูมิโตโม มิตซุย แบงกิ้ง คอร์ปอเรชั่น");
        expect(screen.getByLabelText("Bank Account ID")).toHaveValue("1");
        expect(screen.getByLabelText("Order Value")).toHaveValue(123456.123);
      })

      await act(async () => {
          fireEvent.click(screen.getByText("Withdraw"));
      })

      const submitFormBtn = screen.getByText("Submit");
      expect(submitFormBtn).toBeInTheDocument();
      await act(async () => {
          fireEvent.click(submitFormBtn);
      });

      const expectedFormData = {
        data: {
          bankName: 'ธนาคารซูมิโตโม มิตซุย แบงกิ้ง คอร์ปอเรชั่น',
          bankAccount: '1',
          orderValue: 12345612300,
          accountId: 80000010,
          operations: 'withdraw',
          id: '0f153a84-13cc-40e1-a5fa-eb3faf0564d6'
        },
      };

      await waitFor(() => {
          const state = store.getState();
          const corporateState = state.corporateTest;
          console.log("Corporate State After Submission:", corporateState);
          // Ensure the corporateState contains the expected values
          expect(corporateState).toMatchObject(expectedFormData);
      });
  });
});