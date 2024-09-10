import TodoCorporateAccountOpenning from "@/pages/todoList/corporateAccountOpening/corporateAccountOpening";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { store } from "@/app/store";
import { setUser } from "@/features/user/userSlice";
import { mockUser } from "@/__Test__/utils";
import { useAccountOpening } from "@/pages/todoList/corporateAccountOpening/hook/useAccountOpening";
import { TCorporateData } from "@/pages/todoList/corporateAccountOpening/constant/type";
import axios from "@/api/axios";

// Mock the module
jest.mock(
  "@/pages/todoList/corporateAccountOpening/hook/useAccountOpening",
  () => ({
    useAccountOpening: jest.fn(),
  })
);

// Define a mock object that matches the TCorporateData type
const mockTCorporateData: TCorporateData = {
  CorporateCode: 80000001,
  Info: {
    id: "1",
    createBy: "user",
    CreatedAt: "2023-01-01",
    DeletedAt: null,
    corporateCode: 80000001,
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
    corporateCode: 80000001,
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
    corporateCode: 80000001,
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
    CreatedAt: "2023-01-01",
    DeletedAt: null,
    id: "1",
    corporateCode: 80000001,
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
    CreatedAt: "2023-01-01",
    DeletedAt: null,
    id: "1",
    corporateCode: 80000001,
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

jest.mock("@/api/axios");
const mockAxios = axios as jest.Mocked<typeof axios>;

describe("CorporateAccountOpenning", () => {
  test("should render correctly", async () => {
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
      corporateCode: "",
      dateFrom: dateStr,
      dateTo: dateStr,
    };

    render(
      <Provider store={store}>
        <MemoryRouter>
          <TodoCorporateAccountOpenning
            onDataFetched={(data) => {
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
    const searchBtn = screen.getByTestId(/searchBtn/i);

    expect(id).toHaveValue("");
    expect(datefrom).toHaveValue(prevStr);
    expect(dateto).toHaveValue(dateStr);

    fireEvent.change(datefrom, { target: { value: "2024-09-09" } });
    expect(datefrom).toHaveValue("2024-09-09");
    fireEvent.change(dateto, { target: { value: "2024-09-09" } });
    expect(dateto).toHaveValue("2024-09-09");
    fireEvent.change(id, { target: { value: "80000001" } });
    expect(id).toHaveValue("80000001");

    searchBtn.click();
  }, 20000);
});

describe("test axios", () => {
  test("should make an axios POST request and handle success response with a list of corporate data", async () => {
    store.dispatch(setUser(mockUser));

    // Mock axios.post implementation
    const mockResponse = {
      data: [mockTCorporateData],
    };
    mockAxios.post.mockResolvedValueOnce(mockResponse);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <TodoCorporateAccountOpenning />
        </MemoryRouter>
      </Provider>
    );

    // Simulate user input
    fireEvent.change(screen.getByTestId("juristicId"), {
      target: { value: "80000001" },
    });
    fireEvent.change(screen.getByTestId("dateFrom"), {
      target: { value: "2024-09-09" },
    });
    fireEvent.change(screen.getByTestId("dateTo"), {
      target: { value: "2024-09-09" },
    });

    // Simulate form submission
    fireEvent.click(screen.getByTestId(/searchBtn/i));

    // Assert that axios.post was called with the correct URL and payload
    await waitFor(() => {
      expect(mockAxios.post).toHaveBeenCalledWith(
        "/api/v1/corporate/query",
        {
          corporateCode: "80000001",
          //     "dateFrom": "2024-09-09T17:00:00.000Z",
          //     "dateTo": "2024-09-09T16:59:00.000Z"
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE2M2U2YTA3LWJkN2QtNDUzZC05ZjU3LWM3Y2E4ZDdlMzRiYSIsImVtYWlsIjoiZjAxNzlkZDNkOGY1Zjg1ZGQzMDMzMjY5MTEzMjBiZDNmOTg1YWM0Y2I4OWQ2YjNhNDRiMzBmMGYzNjI0OWE3NSIsImdyb3VwcyI6WzIwMDEsMjAwMiwyMDAzLDIwMDQsMjAwNSwyMDA2LDIwMDcsMjAwOCwyMDA5LDIwMTAsMjAxMSwyMDEyLDIwMTMsMjAxNCwyMDE1LDIwMTYsMjAxNywyMDE4LDIwMTksMjAyMCwyMDIxLDIwMjIsMzAwMSwzMDAyLDMwMDMsMzAwNCwzMDA1LDMwMDYsMzAwNywzMDA4LDMwMDksMzAxMCwzMDExLDMwMTIsMzAxMywzMDE0LDQwMDEsNDAwMiw0MDAzLDQwMDQsNDAwNSw0MDA2LDUwMDEsNTAwMiw1MDAzLDUwMDQsNTAwNSw1MDA2LDUwMDcsNTAwOCw1MDA5LDUwMTAsNTAxMSw1MDEyLDUwMTMsNTAxNCw1MDE1LDUwMTYsNTAxNyw1MDE4LDUwMTksNTAyMCw1MDIxLDUwMjIsNTAyMyw1MDI0LDUwMjUsNTAyNiw1MDI3LDUwMjgsNTAyOSw1MDMwLDUwMzEsNTAzMiw1MDMzLDUwMzQsNTAzNSw1MDM2LDUwMzcsNjAwMSw2MDAyLDYwMDMsNjAwNCw2MDA1LDYwMDYsNjAwNyw2MDA4LDcwMDEsNzAwMiw3MDAzLDcwMDQsNzAwNSw3MDA2XSwicGVybWlzc2lvbnMiOlsxMDEsMTAyLDEwM10sInJvbGVzIjpbMTEsMTIsMTMsMjEsMjIsMjMsMzEsMzIsMzNdLCJ1c2VySWQiOiIiLCJsb2dpblN0YXR1cyI6IiIsImV4cGlyZXNEYXRlIjoiMDAwMS0wMS0wMVQwMDowMDowMFoiLCJFcnJvciI6bnVsbCwiZXhwIjoxNzI1OTU3MzM4LCJpYXQiOjE3MjU4NzA5Mzh9.VCi-cQhYvbSBViVzXqsAWw8v5XFX1CODz-HPv7inViI",
          },
        }
      );
    });

    // Assert that the table data is rendered correctly
    await waitFor(() => {
      expect(screen.getByText("name-80000001")).toBeInTheDocument();
      expect(screen.getByText("123456789")).toBeInTheDocument();
    });
  });

  test("should handle axios POST request failure", async () => {
    store.dispatch(setUser(mockUser));

    // Mock axios.post implementation to reject
    mockAxios.post.mockRejectedValueOnce(new Error("Network Error"));

    render(
      <Provider store={store}>
        <MemoryRouter>
          <TodoCorporateAccountOpenning />
        </MemoryRouter>
      </Provider>
    );

    // Simulate user input
    fireEvent.change(screen.getByTestId("juristicId"), {
      target: { value: "80000001" },
    });
    fireEvent.change(screen.getByTestId("dateFrom"), {
      target: { value: "2024-09-09" },
    });
    fireEvent.change(screen.getByTestId("dateTo"), {
      target: { value: "2024-09-09" },
    });

    // Simulate form submission
    fireEvent.click(screen.getByText("Search"));

    // Assert that axios.post was called with the correct URL and payload
    await waitFor(() => {
      expect(mockAxios.post).toHaveBeenCalledWith(
        "/api/v1/corporate/query",
        {
          corporateCode: "80000001",
          dateFrom: "2024-09-09",
          dateTo: "2024-09-09",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: expect.any(String), // assuming you have a mock token
          },
        }
      );
    });

    // Assert that an error message is displayed
    await waitFor(() => {
      expect(screen.getByText("No data found.")).toBeInTheDocument();
    });
  });
});
