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
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";

jest.mock("@/lib/utils", () => ({
  ...jest.requireActual("@/lib/utils"),
  isAllowedPage: jest.fn().mockReturnValue(true),
}));

const mockAxios = new MockAdapter(axios);

describe("BankOrderEdit Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store.dispatch(setUser(mockUser));
  });

  test("renders the component", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <BankOrderEdit />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Cash Deposit/Withdraw")).toBeInTheDocument();
  });

  test("handles form input and submission", async () => {
    mockAxios.onGet("/api/v1/transaction/bank/get/individual").reply(200, []);
    mockAxios.onPost("/api/v1/corporate/query/all").reply(200, [
      { CorporateCode: 80000001 },
    ]);
    mockAxios.onPost("/api/v1/transaction/bank/create").reply(200, {
      message: "create bank order success",
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <BankOrderEdit />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByLabelText("Corporate Code")).toBeInTheDocument();
    });

    const corporateCode = screen.getByLabelText("Corporate Code");
    await act(async () => {
      fireEvent.change(corporateCode, { target: { value: 80000001 } });
    });

    userEvent.selectOptions(
      screen.getByTestId('bankName'),
      screen.getByTestId('ธนาคารกรุงไทย จำกัด (มหาชน)')
    );

    await waitFor(() => {
      expect(screen.getByTestId('bankName')).toHaveValue("ธนาคารกรุงไทย จำกัด (มหาชน)");
    });

    const bankId = screen.getByLabelText("Bank Account ID");
    await act(async () => {
      fireEvent.change(bankId, { target: { value: 753285427852 } });
    });

    await waitFor(() => {
      expect(bankId).toHaveValue("753285427852");
    });

    const withDraw = screen.getByText("Withdraw");
    await act(async () => {
      fireEvent.click(withDraw);
    });

    const orderValue = screen.getByLabelText("Order Value");
    await act(async () => {
      fireEvent.change(orderValue, { target: { value: 1000 } });
    });

    await waitFor(() => {
      expect(orderValue).toHaveValue(1000);
    });

    const submitFormBtn = screen.getByText("Submit");
    await act(async () => {
      fireEvent.click(submitFormBtn);
    });

    await waitFor(() => {
      const state = store.getState();
      const corporateState = state.corporateTest;
      expect(corporateState).toMatchObject({
        accountId: "80000001",
        bankName: "ธนาคารกรุงไทย จำกัด (มหาชน)",
        bankAccount: "753285427852",
        orderValue: 100000000,
        operations: "withdraw",
        id: "",
      });
    });
  });

  test("handles unauthorized page", async () => {
    jest.mock("@/lib/utils", () => ({
      ...jest.requireActual("@/lib/utils"),
      isAllowedPage: jest.fn().mockReturnValue(false),
    }));

    render(
      <Provider store={store}>
        <MemoryRouter>
          <BankOrderEdit />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Unauthorized")).toBeInTheDocument();
  });

  test("handles fetch errors", async () => {
    mockAxios.onGet("/api/v1/transaction/bank/get/individual").reply(500);
    mockAxios.onPost("/api/v1/corporate/query/all").reply(500);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <BankOrderEdit />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByLabelText("Corporate Code")).toBeInTheDocument();
    });

    expect(screen.queryByText("Failed to fetch corporate codes")).toBeInTheDocument();
    expect(screen.queryByText("Failed to fetch orderTrade")).toBeInTheDocument();
  });
});