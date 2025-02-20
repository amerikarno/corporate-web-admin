import TodoCorporateAccountOpenning from "@/pages/createJob/changeCorporateAccount/ChangeCorproateAccountOpening";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { store } from "@/app/store";
import { setUser } from "@/features/user/userSlice";
import { mockUser } from "@/__Test__/utils";
import { useAccountOpening } from "@/pages/createJob/changeCorporateAccount/hook/useAccountOpening";
import { TCorporateData } from "@/pages/createJob/changeCorporateAccount/constants2/types";
import { act } from "react";
import MockAdapter from "axios-mock-adapter";
import axios from "@/api/axios";

// Mock the module
jest.mock(
  "@/pages/createJob/changeCorporateAccount/hook/useAccountOpening",
  () => ({
    useAccountOpening: jest.fn(),
  })
);


// Define a mock object that matches the TCorporateData type
const mockTCorporateData: TCorporateData = {
  registerId: "80000001",
  Info: {
    id: "1",
    createBy: "user",
    CreatedAt: "2023-01-01",
    DeletedAt: null,
    registerId: "80000001",
    name: "name-80000001",
    registrationNo: "123456789",
    taxId: "123456789",
    dateOfIncorporation: "2023-01-01",
  },
  CorporateCountry: [],
  CorporateAddress: [],
  CorporateFinancials: {
    id: "1",
    createBy: "user",
    CreatedAt: "2023-01-01",
    DeletedAt: null,
    registerId: "80000001",
    registeredCapital: 1000000,
    revenuePerYear: 500000,
    netProfitLoss: 100000,
    shareholderEquity: 200000,
  },
  CorporateTypes: {
    id: "1",
    createBy: "user",
    CreatedAt: "2023-01-01",
    DeletedAt: null,
    registerId: "80000001",
    isJuristicThailand: true,
    isTaxExempt: false,
    isNonTaxExempt: false,
    isJuristicForeign: false,
    isOperatingInThailand: true,
    isNonOperatingInThailand: false,
    isOther: false,
    isPartnership: false,
    isGovernmentStateEnterprise: false,
    isCoOperative: false,
    isTaxExemptCompany: false,
  },
  BusinessTypes: {
    createBy:"",
    CreatedAt: "2023-01-01",
    DeletedAt: null,
    id: "1",
    registerId: "80000001",
    isAntiqueTrading: false,
    isHotelRestaurant: false,
    isArmament: false,
    isInsuranceAssurance: false,
    isCasinoGambling: false,
    isJewelryGoldTrading: false,
    isFoundation: false,
    isPropertyRealEstate: false,
    isMoneyTransfer: false,
    isEmploymentAgency: false,
    isEntertainment: false,
    isTravel: false,
    isFinancial: false,
    isEducationCenter: false,
    isForeignCurrencyExchange: false,
    isCryptoRelated: false,
    isOtherBusiness: false,
    otherBusinessType: "",
  },
  SourceOfIncomes: {
    createBy:"",
    CreatedAt: "2023-01-01",
    DeletedAt: null,
    id: "1",
    registerId: "80000001",
    isDonation: false,
    isLoan: false,
    isOtherIncome: false,
    isRevenue: true,
    isRevenueSelling: true,
    isStock: false,
    otherIncome: "",
  },
  CountrySourceIncomes: null,
  Contact: null,
  Directors: null,
  AuthorizedPersons: null,
  IndividualShareholders: null,
  Juristics: [],
  Banks: [],
};

const mockHandleSearch = jest.fn();
const mockUseAccountOpening = useAccountOpening as jest.MockedFunction<
  typeof useAccountOpening
>;

// Mock the return value, ensuring that the function is correctly typed
mockUseAccountOpening.mockReturnValue({
  handleSearch: mockHandleSearch,
  searchResult: [mockTCorporateData],
});

const mockAxios = new MockAdapter(axios);

describe("test change corporate", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("test handleSearch function", async () => {
    mockAxios.onPost("/api/v1/corporate/query/all").reply(200, {
      data:mockTCorporateData
    });
    store.dispatch(setUser(mockUser));
    render(
      <Provider store={store}>
        <MemoryRouter>
          <TodoCorporateAccountOpenning />
        </MemoryRouter>
      </Provider>
    );

    await act(async () => {
      fireEvent.click(screen.getByText(/search/i));
    });
    await waitFor(async () => {
      const name1 = screen.getByText("name-80000001");
      expect(name1).toBeInTheDocument();
    });
  }, 40000);

  test("test query", async () => {
    const { handleSearch } = useAccountOpening();
    store.dispatch(setUser(mockUser));

    render(
      <Provider store={store}>
        <MemoryRouter>
          <TodoCorporateAccountOpenning />
        </MemoryRouter>
      </Provider>
    );

    await act(async () => {
      await handleSearch({ registerId: "80000001" });
    });

    await waitFor(
      async () => {
        const name1 = screen.getByText("name-80000001");
        expect(name1).toBeInTheDocument();
      },
      { timeout: 20000 }
    );
  }, 40000);

  test("test init first data", async () => {
    store.dispatch(setUser(mockUser));
    let fetchedData: any = null;
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
      registerId: "",
      dateFrom: dateStr,
      dateTo: dateStr,
      page:1
    };

    render(
      <Provider store={store}>
        <MemoryRouter>
          <TodoCorporateAccountOpenning
            onDataFetched={(data : any) => {
              fetchedData = data;
            }}
          />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => expect(fetchedData).toBe(JSON.stringify(data)), {
      timeout: 10000,
    });

    const id = screen.getByTestId(/juristicId/i);
    const datefrom = screen.getByTestId(/dateFrom/i);
    const dateto = screen.getByTestId(/dateTo/i);

    expect(id).toHaveValue("");
    expect(datefrom).toHaveValue(prevStr);
    expect(dateto).toHaveValue(dateStr);
  }, 40000);

  test("test input data", async () => {
    store.dispatch(setUser(mockUser));

    render(
      <Provider store={store}>
        <MemoryRouter>
          <TodoCorporateAccountOpenning />
        </MemoryRouter>
      </Provider>
    );

    const id = screen.getByTestId(/juristicId/i);
    const datefrom = screen.getByTestId(/dateFrom/i);
    const dateto = screen.getByTestId(/dateTo/i);

    await act(async () => {
      fireEvent.change(datefrom, { target: { value: "2024-09-09" } });
      fireEvent.change(dateto, { target: { value: "2024-09-09" } });
      fireEvent.change(id, { target: { value: "80000001" } });
    });
    expect(datefrom).toHaveValue("2024-09-09");
    expect(dateto).toHaveValue("2024-09-09");
    expect(id).toHaveValue("80000001");
  }, 40000);

  test("test click edit corporate", async () => {
    store.dispatch(setUser(mockUser));

    render(
      <Provider store={store}>
        <MemoryRouter>
          <TodoCorporateAccountOpenning />
        </MemoryRouter>
      </Provider>
    );

    const editBtn = screen.getByTestId("editButton-80000001");
    await waitFor(() => expect(editBtn).toBeInTheDocument());
    expect(editBtn).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(editBtn);
    });

  }, 40000);

  
});
