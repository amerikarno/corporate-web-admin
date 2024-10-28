import ChangeTodoIndividualAccount from "@/pages/createJob/changeIndividualAccount/ToDoIndividualAccount";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { store } from "@/app/store";
import { setUser } from "@/features/user/userSlice";
import { mockUser } from "@/__Test__/utils";
import { useToDoIndividualAccount } from "@/pages/createJob/changeIndividualAccount/useToDoIndividualAccount";
import { act } from "react";
import MockAdapter from "axios-mock-adapter";
import axios from "@/api/axios";
import { TIndividualData } from "@/pages/createJob/changeIndividualAccount/type";

// Mock the module
jest.mock(
  "@/pages/createJob/changeIndividualAccount/useToDoIndividualAccount",
  () => ({
    useToDoIndividualAccount: jest.fn(),
  })
);


// Define a mock object that matches the TIndividualData type
const mockTIndividualData: TIndividualData = {
    createBy: "9b84c76d-fe84-4113-ba30-17014a02b6b5",
    CreatedAt: "2024-09-10T01:48:32.941Z",
    DeletedAt: null,
    registerId: "90000006",
    thTitle: "นาย",
    id:"getter",
    thName: "test3",
    thSurname: "test3",
    engTitle: "Mr.",
    engName: "test",
    engSurname: "test",
    email: "1",
    mobile: "1",
    agreement: true,
    birthDate: "2024-09-27T00:00:00Z",
    marriageStatus: "สมรส",
    citizenId: "1",
    laserCode: "1",
    education: "2",
    sourceOfIncome: "3",
    currentOccupation: "14",
    officeName: "1",
    typeOfBusiness: "14",
    positionName: "1",
    salaryRange: "5",
    shortTermInvestment: true,
    taxesInvestment: true,
    address: [
        {
            CreatedAt: "2024-09-10T03:53:27.44Z",
            DeletedAt: null,
            id:"90000006",
            registerId: "90000006",
            homeNumber: "70/178 ramintra65 yak 2-4",
            villageNumber: "123",
            villageName: "Some Village",
            subStreetName: "Some Sub Street",
            streetName: "Main Street",
            subDistrictName: "บ้านพานถม",
            districtName: "เขตลาดกระบัง",
            provinceName: "ระยอง",
            zipCode: "10100",
            countryName: "อารูบา",
            types: 1
        },
        {
            CreatedAt: "2024-09-10T03:53:27.44Z",
            DeletedAt: null,
            id:"90000006",
            registerId: "90000006",
            homeNumber: "70/178 ramintra65 yak 2-4",
            villageNumber: "123",
            villageName: "Some Village",
            subStreetName: "Some Sub Street",
            streetName: "Main Street",
            subDistrictName: "บ้านพานถม",
            districtName: "เขตลาดกระบัง",
            provinceName: "ระยอง",
            zipCode: "10100",
            countryName: "อารูบา",
            types: 2
        },
        {
            CreatedAt: "2024-09-10T03:53:27.44Z",
            DeletedAt: null,
            id:"90000006",
            registerId: "90000006",
            homeNumber: "70/178 ramintra65 yak 2-4",
            villageNumber: "123",
            villageName: "Some Village",
            subStreetName: "Some Sub Street",
            streetName: "Main Street",
            subDistrictName: "บ้านพานถม",
            districtName: "เขตลาดกระบัง",
            provinceName: "ระยอง",
            zipCode: "10100",
            countryName: "อารูบา",
            types: 3
        }
    ],
    bank: [
        {
            CreatedAt: "2024-09-10T03:53:27.443Z",
            DeletedAt: null,
            id:"90000006",
            registerId: "90000006",
            bankName: "ธนาคารอาร์ เอช บี จำกัด",
            bankBranchName: "1",
            bankAccountNumber: "bankaccountid1",
            types: 0
        }
    ],
    SuiteTestResult: {
        createBy: "",
        deletedBy:"",
        registerId: "90000006",
        suiteTestResult: {
            registerId: "893d7e4c-e22d-4af4-b808-a570e2f3f13e",
            investorTypeRisk: "เสี่ยงปานกลางค่อนสูง",
            level: 3,
            totalScore: 23,
            suiteTestResult: {
                answer: {
                    "0": {
                        ans: [0, 1, 0, 0]
                    },
                    "1": {
                        ans: [0, 0, 1, 0]
                    },
                    "2": {
                        ans: [0, 1, 1, 0]
                    },
                    "3": {
                        ans: [0, 1, 0, 0]
                    },
                    "4": {
                        ans: [0, 0, 1, 0]
                    },
                    "5": {
                        ans: [0, 1, 0, 0]
                    },
                    "6": {
                        ans: [0, 0, 1, 0]
                    },
                    "7": {
                        ans: [0, 0, 1, 0]
                    },
                    "8": {
                        ans: [0, 1, 0, 0]
                    }
                }
            }
        },
        isFatca: false,
        fatcaInfo: null,
        isKnowLedgeDone: false,
        knowLedgeTestResult: 0
    },
    ndid: true,
    thaid: false
};

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
          <ChangeTodoIndividualAccount />
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
          <ChangeTodoIndividualAccount />
        </MemoryRouter>
      </Provider>
    );

    await act(async () => {
      await handleSearch({ registerId: "90000006" , dateFrom : null , dateTo : null });
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
          <ChangeTodoIndividualAccount
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
          <ChangeTodoIndividualAccount />
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
          <ChangeTodoIndividualAccount />
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
