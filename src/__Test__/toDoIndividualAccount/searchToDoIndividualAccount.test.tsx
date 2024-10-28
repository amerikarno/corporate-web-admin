import TodoIndividualAccount from "@/pages/todoList/addIndividualAccount/ToDoIndividualAccount";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { store } from "@/app/store";
import { setUser } from "@/features/user/userSlice";
import { mockUser } from "@/__Test__/utils";
import { useToDoIndividualAccount } from "@/pages/todoList/addIndividualAccount/useToDoIndividualAccount";
import { act } from "react";
import MockAdapter from "axios-mock-adapter";
import axios from "@/api/axios";
import { TIndividualData } from "@/pages/todoList/addIndividualAccount/type";

// Mock the module
jest.mock(
  "@/pages/todoList/addIndividualAccount/useToDoIndividualAccount",
  () => ({
    useToDoIndividualAccount: jest.fn(),
  })
);


// Define a mock object that matches the TIndividualData type
const mockTIndividualData: TIndividualData = {
  "id": "29b11256-c7ae-4e6d-b9ab-4d11012b0a53",
  "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
  "CreatedAt": "2024-10-16T10:54:45+07:00",
  "DeletedAt": null,
  "registerId": "90000003",
  "thTitle": "นาย",
  "thName": "เกตเต้อ-ชื่อ",
  "thSurname": "เกตเต้อ-นามสกุล",
  "engTitle": "Mr.",
  "engName": "getter-name",
  "engSurname": "getter-surname",
  "email": "test1@example.com",
  "mobile": "0884744411",
  "birthDate": "2024-10-02T07:00:00+07:00",
  "marriageStatus": "โสด",
  "citizenId": "1103703348990",
  "laserCode": "12123",
  "education": "1",
  "sourceOfIncome": "6",
  "currentOccupation": "13",
  "officeName": "1",
  "typeOfBusiness": "16",
  "positionName": "1",
  "salaryRange": "9",
  "taxesInvestment": true,
  "address": [
      {
          "id": "23421bcb-5fbf-4a6d-b95d-8b0579fdb3a1",
          "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
          "CreatedAt": "2024-10-16T10:55:34+07:00",
          "DeletedAt": null,
          "registerId": "90000003",
          "homeNumber": "1",
          "villageNumber": "1",
          "villageName": "1",
          "subStreetName": "1",
          "streetName": "1",
          "subDistrictName": "1",
          "districtName": "1",
          "provinceName": "1",
          "zipCode": "11",
          "countryName": "1",
          "types": 1
      },
      {
          "id": "423f53a1-bf82-4415-ad0f-c9b93c26637f",
          "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
          "CreatedAt": "2024-10-16T10:55:34+07:00",
          "DeletedAt": null,
          "registerId": "90000003",
          "homeNumber": "1",
          "villageNumber": "1",
          "villageName": "1",
          "subStreetName": "1",
          "streetName": "1",
          "subDistrictName": "1",
          "districtName": "1",
          "provinceName": "1",
          "zipCode": "11",
          "countryName": "1",
          "types": 2
      },
      {
          "id": "ad0f1dc1-a81a-43a8-b58a-b0d7b44f08d9",
          "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
          "CreatedAt": "2024-10-16T10:55:34+07:00",
          "DeletedAt": null,
          "registerId": "90000003",
          "homeNumber": "1",
          "villageNumber": "1",
          "villageName": "1",
          "subStreetName": "1",
          "streetName": "1",
          "subDistrictName": "1",
          "districtName": "1",
          "provinceName": "1",
          "zipCode": "11",
          "countryName": "1",
          "types": 3
      }
  ],
  "bank": [
      {
          "id": "27314179-b2a0-466e-b830-77ac62c50820",
          "createBy": "9b84c76d-fe84-4113-ba30-17014a02b6b5",
          "CreatedAt": "2024-10-16T10:55:34+07:00",
          "DeletedAt": null,
          "registerId": "90000003",
          "bankName": "ธนาคารไทยพาณิชย์ จำกัด (มหาชน)",
          "bankBranchName": "11",
          "bankAccountNumber": "1",
          "types": 1
      },
  ],
  "SuiteTestResult": {
      "createBy": "",
      "deletedBy": "",
      "registerId": "90000003",
      "suiteTestResult": {
          "registerId": "219c16d8-693e-49bb-a550-106e90c0d496",
          "investorTypeRisk": "เสี่ยงสูง",
          "level": 4,
          "totalScore": 35,
          "suiteTestResult": {
              "answer": {
                  "0": {
                      "ans": [
                          0,
                          0,
                          0,
                          1
                      ]
                  },
                  "1": {
                      "ans": [
                          0,
                          0,
                          0,
                          1
                      ]
                  },
                  "2": {
                      "ans": [
                          0,
                          1,
                          1
                      ]
                  },
                  "3": {
                      "ans": [
                          0,
                          0,
                          0,
                          1
                      ]
                  },
                  "4": {
                      "ans": [
                          0,
                          0,
                          0,
                          1
                      ]
                  },
                  "5": {
                      "ans": [
                          0,
                          0,
                          0,
                          1
                      ]
                  },
                  "6": {
                      "ans": [
                          0,
                          0,
                          0,
                          1
                      ]
                  },
                  "7": {
                      "ans": [
                          0,
                          0,
                          0,
                          1
                      ]
                  },
                  "8": {
                      "ans": [
                          0,
                          0,
                          0,
                          1
                      ]
                  }
              }
          }
      },
      "isFatca": false,
      "fatcaInfo": null,
      "isKnowLedgeDone": true,
      "knowLedgeTestResult": 15
  },
  "ndid": false,
  "thaid": true
}

const mockHandleSearch = jest.fn();
const mockUseToDoIndividualAccount = useToDoIndividualAccount as jest.MockedFunction<
  typeof useToDoIndividualAccount
>;

// Mock the return value, ensuring that the function is correctly typed
mockUseToDoIndividualAccount.mockReturnValue({
  handleSearch: mockHandleSearch,
  searchResult: mockTIndividualData,
});

const mockAxios = new MockAdapter(axios);

describe("test change individual", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("test handleSearch function", async () => {
    mockAxios.onPost("/api/v1/individual/list/all").reply(200, {
      data:mockTIndividualData
    });
    store.dispatch(setUser(mockUser));
    render(
      <Provider store={store}>
        <MemoryRouter>
          <TodoIndividualAccount />
        </MemoryRouter>
      </Provider>
    );

    await act(async () => {
      fireEvent.click(screen.getByText(/search/i));
    });
    await waitFor(async () => {
      const name1 = screen.getByText("test3");
      expect(name1).toBeInTheDocument();
    });
  }, 40000);

  test("test query", async () => {
    mockAxios.onPost("/api/v1/individual/list/all").reply(200, {
      data:mockTIndividualData
    });
    const { handleSearch } = useToDoIndividualAccount();
    store.dispatch(setUser(mockUser));

    render(
      <Provider store={store}>
        <MemoryRouter>
          <TodoIndividualAccount />
        </MemoryRouter>
      </Provider>
    );

    await act(async () => {
      await handleSearch({ registerId: "90000006" });
    });

    await waitFor(
      async () => {
        const name1 = screen.getByText("test3");
        expect(name1).toBeInTheDocument();
      },
      { timeout: 20000 }
    );
  }, 40000);

  test("test init first data", async () => {
    mockAxios.onPost("/api/v1/individual/list/all").reply(200, {
      data:mockTIndividualData
    });
    store.dispatch(setUser(mockUser));
    let fetchedData: any = null;
    await waitFor(() => {
      const state = store.getState();
      const corporateState = state.corporateTest;
      console.log("Corporate State After Submission:", corporateState);
      fetchedData = corporateState;
    })
    const date = new Date();
    const mm = date.getMonth() + 1;
    const dd = date.getDate();
    const dateStr = `${date.getFullYear()}-${mm > 9 ? mm : `0${mm}`}-${
      dd > 9 ? dd : `0${dd}`
    }`;
    const prev = date.setDate(date.getDate() - 7);
    const mmPrev = new Date(prev).getMonth() + 1;
    const ddPrev = new Date(prev).getDate();
    const prevStr = `${date.getFullYear()}-${
      mmPrev > 9 ? mmPrev : `0${mmPrev}`
    }-${ddPrev > 9 ? ddPrev : `0${ddPrev}`}`;

    let data = {
      AccountID: "",
      dateFrom: dateStr,
      dateTo: dateStr,
    };

    render(
      <Provider store={store}>
        <MemoryRouter>
          <TodoIndividualAccount
          />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => expect(fetchedData.data).toStrictEqual(data), {
      timeout: 10000,
    });

    const id = screen.getByTestId(/accountId/i);
    const datefrom = screen.getByTestId(/dateFrom/i);
    const dateto = screen.getByTestId(/dateTo/i);

    expect(id).toHaveValue("");
    expect(datefrom).toHaveValue(prevStr);
    expect(dateto).toHaveValue(dateStr);
  }, 40000);

  test("test input data", async () => {
    mockAxios.onPost("/api/v1/individual/list/all").reply(200, {
      data:mockTIndividualData
    });
    store.dispatch(setUser(mockUser));

    render(
      <Provider store={store}>
        <MemoryRouter>
          <TodoIndividualAccount />
        </MemoryRouter>
      </Provider>
    );

    const id = screen.getByTestId(/accountId/i);
    const datefrom = screen.getByTestId(/dateFrom/i);
    const dateto = screen.getByTestId(/dateTo/i);

    await act(async () => {
      fireEvent.change(datefrom, { target: { value: "2024-09-09" } });
      fireEvent.change(dateto, { target: { value: "2024-09-09" } });
      fireEvent.change(id, { target: { value: "90000006" } });
    });
    expect(datefrom).toHaveValue("2024-09-09");
    expect(dateto).toHaveValue("2024-09-09");
    expect(id).toHaveValue("90000006");
  }, 40000);

  test("test click edit individual", async () => {
    mockAxios.onPost("/api/v1/individual/list/all").reply(200, {
      data:mockTIndividualData
    });
    store.dispatch(setUser(mockUser));

    render(
      <Provider store={store}>
        <MemoryRouter>
          <TodoIndividualAccount />
        </MemoryRouter>
      </Provider>
    );

    const editBtn = screen.getByTestId("editButton-90000006");
    expect(editBtn).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(editBtn);
    });

  }, 40000);

  
});
