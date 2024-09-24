// import TodoCorporateAccountOpenning from "@/pages/todoList/corporateAccountOpening/corporateAccountOpening";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { store } from "@/app/store";
import { setUser } from "@/features/user/userSlice";
import { mockUser } from "@/__Test__/utils";
// import { useAccountOpening } from "@/pages/todoList/corporateAccountOpening/hook/useAccountOpening";
// import { TCorporateData } from "@/pages/todoList/corporateAccountOpening/constant/type";
// import { act } from "react";
import CorporateAccountOpenning from "@/pages/createJob/addedCorporateAccount/CorporateAccountOpenning";
import { FormCorporateTypeAndIncome } from "@/pages/createJob/addedCorporateAccount/components/formCorporateInfo2";
import { FormIndividualsContactPerson } from "@/pages/createJob/addedCorporateAccount/components/formContactPerson";
import { FormIndividualsDirector } from "@/pages/createJob/addedCorporateAccount/components/formDirectorInfo";
import { FormIndividualsShareholders } from "@/pages/createJob/addedCorporateAccount/components/formIndividualsShareholders";
import { FormJuristicShareholders } from "@/pages/createJob/addedCorporateAccount/components/formJuristicShareholders";
import { FormAuthorizedPerson } from "@/pages/createJob/addedCorporateAccount/components/formAuthorization";
import { sleep } from "@/lib/utils";
import { FormAttorney } from "@/pages/createJob/addedCorporateAccount/components/formAttorney";
import { FormBank } from "@/pages/createJob/addedCorporateAccount/components/formBank";
import UploadFiles from "@/pages/createJob/addedCorporateAccount/pages/uploadFiles/uploadFiles";
import * as useUploadFileModule from "@/pages/createJob/addedCorporateAccount/pages/uploadFiles/hook/useUploadFile";
import { PageJuristicType } from "@/pages/createJob/addedCorporateAccount/pages/PageJuristicType";
import { TCorporateData } from "@/pages/createJob/constant/type";
import {
  clearCorporateData,
  setCorporateData,
} from "@/features/editCorporateData/editCorporateData";
import { clearTestCorporateData } from "@/features/corporateTest/corporateTestSlice";
// import { PageSuitTest } from "@/pages/createJob/addedCorporateAccount/pages/PageSuitTest";
// Mock the module
// jest.mock(
//   "@/pages/todoList/corporateAccountOpening/hook/useAccountOpening",
//   () => ({
//     useAccountOpening: jest.fn(),
//   })
// );

// Define a mock object that matches the TCorporateData type
// const mockTCorporateData: TCorporateData = {
//   CorporateCode: 80000001,
//   Info: {
//     id: "1",
//     createBy: "user",
//     CreatedAt: "2023-01-01",
//     DeletedAt: null,
//     corporateCode: 80000001,
//     name: "name-80000001",
//     registrationNo: "123456789",
//     taxId: "123456789",
//     dateOfIncorporation: "2023-01-01",
//   },
//   CorporateCountry: [],
//   CorporateAddress: [],
//   CorporateFinancials: {
//     id: "1",
//     createBy: "user",
//     CreatedAt: "2023-01-01",
//     DeletedAt: null,
//     corporateCode: 80000001,
//     registeredCapital: 1000000,
//     revenuePerYear: 500000,
//     netProfitLoss: 100000,
//     shareholderEquity: 200000,
//   },
//   CorporateTypes: {
//     id: "1",
//     createBy: "user",
//     CreatedAt: "2023-01-01",
//     DeletedAt: null,
//     corporateCode: 80000001,
//     isJuristicThailand: true,
//     isTaxExempt: false,
//     isNonTaxExempt: false,
//     isJuristicForeign: false,
//     isOperatingInThailand: true,
//     isNonOperatingInThailand: false,
//     isOther: false,
//     isPartnership: false,
//     isGovernmentStateEnterprise: false,
//     isCoOperative: false,
//     isTaxExemptCompany: false,
//   },
//   BusinessTypes: {
//     CreatedAt: "2023-01-01",
//     DeletedAt: null,
//     id: "1",
//     corporateCode: 80000001,
//     isAntiqueTrading: false,
//     isHotelRestaurant: false,
//     isArmament: false,
//     isInsuranceAssurance: false,
//     isCasinoGambling: false,
//     isJewelryGoldTrading: false,
//     isFoundation: false,
//     isPropertyRealEstate: false,
//     isMoneyTransfer: false,
//     isEmploymentAgency: false,
//     isEntertainment: false,
//     isTravel: false,
//     isFinancial: false,
//     isEducationCenter: false,
//     isForeignCurrencyExchange: false,
//     isCryptoRelated: false,
//     isOtherBusiness: false,
//     otherBusinessType: "",
//   },
//   SourceOfIncomes: {
//     CreatedAt: "2023-01-01",
//     DeletedAt: null,
//     id: "1",
//     corporateCode: 80000001,
//     isDonation: false,
//     isLoan: false,
//     isOtherIncome: false,
//     isRevenue: true,
//     isRevenueSelling: true,
//     isStock: false,
//     otherIncome: "",
//   },
//   CountrySourceIncomes: null,
//   Contact: null,
//   Directors: null,
//   AuthorizedPersons: null,
//   IndividualShareholders: null,
//   Juristics: [],
//   Banks: [],
// };

// const mockHandleSearch = jest.fn();
// const mockUseAccountOpening = useAccountOpening as jest.MockedFunction<
//   typeof useAccountOpening
// >;

// Mock the return value, ensuring that the function is correctly typed
// mockUseAccountOpening.mockReturnValue({
//   handleSearch: mockHandleSearch,
//   searchResult: [mockTCorporateData],
// });
jest.mock("@/lib/utils", () => ({
  ...jest.requireActual("@/lib/utils"),
  isExpiredToken: jest.fn().mockReturnValue(false),
}));

describe("test create corporate form1", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store.dispatch(setUser(mockUser));
  });

  jest.mock("@/lib/Cookies", () => ({
    getCookies: jest
      .fn()
      .mockReturnValue(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZhYjEyMmRjLTc3YzctNDlmYy04ZTBkLTg2NWVjYTY1MmI4MCIsImVtYWlsIjoiYjcwODk4NTY5ZWRjYjk5MjdhMDZkZDUxMTBmMWI4ZmUxZDQ2ZTVmOTg1ZTBkOWYyMjI0ZDc3NDg1NzU3ZjFlYSIsImdyb3VwcyI6WzEwMDEsMTAwMiwxMDAzLDIwMDEsMjAwMiwyMDAzXSwicGVybWlzc2lvbnMiOlsxMDEsMTAyLDEwMywyMDEsMjAyLDIwM10sInJvbGVzIjpbMTEsMTIsMTMsMjEsMjIsMjNdLCJ1c2VySWQiOiIiLCJsb2dpblN0YXR1cyI6IiIsImV4cGlyZXNEYXRlIjoiMDAwMS0wMS0wMVQwMDowMDowMFoiLCJFcnJvciI6bnVsbCwiZXhwIjoxNzI3MTY3MzQyLCJpYXQiOjE3MjcwODA5NDJ9.PWG3vMMN3POr-SWDnO4etQ5D1ZV2mX7D1Fzwsb8sfBg"
      ),
  }));

  test("test input data(multiple input type)", async () => {
    // const onSubmit = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <CorporateAccountOpenning />
        </MemoryRouter>
      </Provider>
    );

    //normal input type
    const juristicName = screen.getByLabelText("Juristic Investor Name");
    expect(juristicName).toBeInTheDocument();
    expect(juristicName).toHaveValue("");
    fireEvent.change(juristicName, { target: { value: "Name" } });
    expect(juristicName).toHaveValue("Name");

    const registerNo = screen.getByLabelText("Commercial Registration No.");
    expect(registerNo).toBeInTheDocument();
    expect(registerNo).toHaveValue("");
    fireEvent.change(registerNo, { target: { value: "No.123456789" } });
    expect(registerNo).toHaveValue("No.123456789");

    //integer input type
    const taxId = screen.getByLabelText("Tax ID");
    expect(taxId).toBeInTheDocument();
    expect(taxId).toHaveValue("");
    fireEvent.change(taxId, { target: { value: "123" } });
    expect(taxId).toHaveValue("123");

    //date input type
    const dateOfIncorporation = screen.getByLabelText("Date of Incorporation");
    expect(dateOfIncorporation).toBeInTheDocument();
    expect(dateOfIncorporation).toHaveValue("");
    fireEvent.change(dateOfIncorporation, { target: { value: "2023-01-01" } });
    expect(dateOfIncorporation).toHaveValue("2023-01-01");

    //checkbox input type
    const checkboxRegisteredCountry = screen.getByTestId(
      "registeredCountry-Thailand"
    );
    expect(checkboxRegisteredCountry).toBeInTheDocument();
    expect(checkboxRegisteredCountry).not.toBeChecked();
    fireEvent.click(checkboxRegisteredCountry);
    expect(checkboxRegisteredCountry).toBeChecked();

    const checkboxPrimaryCountry = screen.getByTestId(
      "primaryCountry-Thailand"
    );
    expect(checkboxPrimaryCountry).toBeInTheDocument();
    expect(checkboxPrimaryCountry).not.toBeChecked();
    fireEvent.click(checkboxPrimaryCountry);
    expect(checkboxPrimaryCountry).toBeChecked();

    //registered business address input component
    //addressNumber
    const addressNumber = screen.getByTestId("registeredBusiness-addressNo");
    expect(addressNumber).toBeInTheDocument();
    expect(addressNumber).toHaveValue("");
    fireEvent.change(addressNumber, { target: { value: "addressNumber" } });
    expect(addressNumber).toHaveValue("addressNumber");

    //Moo
    const moo = screen.getByTestId("registeredBusiness-mooNo");
    expect(moo).toBeInTheDocument();
    expect(moo).toHaveValue("");
    fireEvent.change(moo, { target: { value: "Moo" } });
    expect(moo).toHaveValue("Moo");

    //Soi
    const soi = screen.getByTestId("registeredBusiness-soi");
    expect(soi).toBeInTheDocument();
    expect(soi).toHaveValue("");
    fireEvent.change(soi, { target: { value: "Soi" } });
    expect(soi).toHaveValue("Soi");

    //Floor
    const floor = screen.getByTestId("registeredBusiness-floor");
    expect(floor).toBeInTheDocument();
    expect(floor).toHaveValue("");
    fireEvent.change(floor, { target: { value: "Floor" } });
    expect(floor).toHaveValue("Floor");

    //Building
    const building = screen.getByTestId("registeredBusiness-building");
    expect(building).toBeInTheDocument();
    expect(building).toHaveValue("");
    fireEvent.change(building, { target: { value: "Building" } });
    expect(building).toHaveValue("Building");

    //Road
    const road = screen.getByTestId("registeredBusiness-road");
    expect(road).toBeInTheDocument();
    expect(road).toHaveValue("");
    fireEvent.change(road, { target: { value: "Road" } });
    expect(road).toHaveValue("Road");

    //Tambon
    const tambon = screen.getByTestId("registeredBusiness-tambon");
    expect(tambon).toBeInTheDocument();
    expect(tambon).toHaveValue("");
    fireEvent.change(tambon, { target: { value: "Tambon" } });
    expect(tambon).toHaveValue("Tambon");

    //Amphoe
    const amphoe = screen.getByTestId("registeredBusiness-amphoe");
    expect(amphoe).toBeInTheDocument();
    expect(amphoe).toHaveValue("");
    fireEvent.change(amphoe, { target: { value: "Amphoe" } });
    expect(amphoe).toHaveValue("Amphoe");

    //Province
    const province = screen.getByTestId("registeredBusiness-province");
    expect(province).toBeInTheDocument();
    expect(province).toHaveValue("");
    fireEvent.change(province, { target: { value: "Province" } });
    expect(province).toHaveValue("Province");

    //PostalCode
    const postalCode = screen.getByTestId("registeredBusiness-postalCode");
    expect(postalCode).toBeInTheDocument();
    expect(postalCode).toHaveValue("");
    fireEvent.change(postalCode, { target: { value: "Postal Code" } });
    expect(postalCode).toHaveValue("Postal Code");

    //Country
    const country = screen.getByTestId("registeredBusiness-country");
    expect(country).toBeInTheDocument();
    expect(country).toHaveValue("");
    fireEvent.change(country, { target: { value: "Country" } });
    expect(country).toHaveValue("Country");

    //EmailAddress
    const emailAddress = screen.getByTestId("registeredBusiness-emailAddress");
    expect(emailAddress).toBeInTheDocument();
    expect(emailAddress).toHaveValue("");
    fireEvent.change(emailAddress, { target: { value: "Email Address" } });
    expect(emailAddress).toHaveValue("Email Address");

    //Telephone
    const telephone = screen.getByTestId("registeredBusiness-telephone");
    expect(telephone).toBeInTheDocument();
    expect(telephone).toHaveValue("");
    fireEvent.change(telephone, { target: { value: "Telephone" } });
    expect(telephone).toHaveValue("Telephone");

    //place incorporate address input component
    //addressNumber
    const placeAddressNumber = screen.getByTestId(
      "placeofIncorporation-addressNo"
    );
    expect(placeAddressNumber).toBeInTheDocument();
    expect(placeAddressNumber).toHaveValue("");
    fireEvent.change(placeAddressNumber, {
      target: { value: "addressNumber" },
    });
    expect(placeAddressNumber).toHaveValue("addressNumber");

    //Moo
    const placeMoo = screen.getByTestId("placeofIncorporation-mooNo");
    expect(placeMoo).toBeInTheDocument();
    expect(placeMoo).toHaveValue("");
    fireEvent.change(placeMoo, { target: { value: "Moo" } });
    expect(placeMoo).toHaveValue("Moo");

    //Soi
    const placeSoi = screen.getByTestId("placeofIncorporation-soi");
    expect(placeSoi).toBeInTheDocument();
    expect(placeSoi).toHaveValue("");
    fireEvent.change(placeSoi, { target: { value: "Soi" } });
    expect(placeSoi).toHaveValue("Soi");

    //Floor
    const placeFloor = screen.getByTestId("placeofIncorporation-floor");
    expect(placeFloor).toBeInTheDocument();
    expect(placeFloor).toHaveValue("");
    fireEvent.change(placeFloor, { target: { value: "Floor" } });
    expect(placeFloor).toHaveValue("Floor");

    //Building
    const placeBuilding = screen.getByTestId("placeofIncorporation-building");
    expect(placeBuilding).toBeInTheDocument();
    expect(placeBuilding).toHaveValue("");
    fireEvent.change(placeBuilding, { target: { value: "Building" } });
    expect(placeBuilding).toHaveValue("Building");

    //Road
    const placeRoad = screen.getByTestId("placeofIncorporation-road");
    expect(placeRoad).toBeInTheDocument();
    expect(placeRoad).toHaveValue("");
    fireEvent.change(placeRoad, { target: { value: "Road" } });
    expect(placeRoad).toHaveValue("Road");

    //Tambon
    const placeTambon = screen.getByTestId("placeofIncorporation-tambon");
    expect(placeTambon).toBeInTheDocument();
    expect(placeTambon).toHaveValue("");
    fireEvent.change(placeTambon, { target: { value: "Tambon" } });
    expect(placeTambon).toHaveValue("Tambon");

    //Amphoe
    const placeAmphoe = screen.getByTestId("placeofIncorporation-amphoe");
    expect(placeAmphoe).toBeInTheDocument();
    expect(placeAmphoe).toHaveValue("");
    fireEvent.change(placeAmphoe, { target: { value: "Amphoe" } });
    expect(placeAmphoe).toHaveValue("Amphoe");

    //Province
    const placeProvince = screen.getByTestId("placeofIncorporation-province");
    expect(placeProvince).toBeInTheDocument();
    expect(placeProvince).toHaveValue("");
    fireEvent.change(placeProvince, { target: { value: "Province" } });
    expect(placeProvince).toHaveValue("Province");

    //PostalCode
    const placePostalCode = screen.getByTestId(
      "placeofIncorporation-postalCode"
    );
    expect(placePostalCode).toBeInTheDocument();
    expect(placePostalCode).toHaveValue("");
    fireEvent.change(placePostalCode, { target: { value: "Postal Code" } });
    expect(placePostalCode).toHaveValue("Postal Code");

    //Country
    const placeCountry = screen.getByTestId("placeofIncorporation-country");
    expect(placeCountry).toBeInTheDocument();
    expect(placeCountry).toHaveValue("");
    fireEvent.change(placeCountry, { target: { value: "Country" } });
    expect(placeCountry).toHaveValue("Country");

    //EmailAddress
    const placeEmailAddress = screen.getByTestId(
      "placeofIncorporation-emailAddress"
    );
    expect(placeEmailAddress).toBeInTheDocument();
    expect(placeEmailAddress).toHaveValue("");
    fireEvent.change(placeEmailAddress, { target: { value: "Email Address" } });
    expect(placeEmailAddress).toHaveValue("Email Address");

    //Telephone
    const placeTelephone = screen.getByTestId("placeofIncorporation-telephone");
    expect(placeTelephone).toBeInTheDocument();
    expect(placeTelephone).toHaveValue("");
    fireEvent.change(placeTelephone, { target: { value: "Telephone" } });
    expect(placeTelephone).toHaveValue("Telephone");

    //float input type
    const registeredCapital = screen.getByTestId("registeredCapital");
    expect(registeredCapital).toBeInTheDocument();
    await waitFor(async () => {
      expect(registeredCapital).toHaveValue("0.00");
    });
    await act(async () => {
      fireEvent.change(registeredCapital, { target: { value: "123.45" } });
    });
    await waitFor(async () => {
      expect(registeredCapital).toHaveValue("123.45");
    });

    const revenuePerYear = screen.getByTestId("revenuePerYear");
    expect(revenuePerYear).toBeInTheDocument();
    await waitFor(async () => {
      expect(revenuePerYear).toHaveValue("0.00");
    });
    await act(async () => {
      fireEvent.change(revenuePerYear, { target: { value: "123.45" } });
    });
    await waitFor(async () => {
      expect(revenuePerYear).toHaveValue("123.45");
    });

    const netProfit = screen.getByTestId("netProFitLoss");
    expect(netProfit).toBeInTheDocument();
    await waitFor(async () => {
      expect(netProfit).toHaveValue("0.00");
    });
    await act(async () => {
      fireEvent.change(netProfit, { target: { value: "123.45" } });
    });
    await waitFor(async () => {
      expect(netProfit).toHaveValue("123.45");
    });

    const shareholderEquity = screen.getByTestId("shareholderEquity");
    expect(shareholderEquity).toBeInTheDocument();
    await waitFor(async () => {
      expect(shareholderEquity).toHaveValue("0.00");
    });
    await act(async () => {
      fireEvent.change(shareholderEquity, { target: { value: "123.45" } });
    });
    await waitFor(async () => {
      expect(shareholderEquity).toHaveValue("123.45");
    });

    const submitButton = screen.getByText("Next Form");
    expect(submitButton).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(submitButton);
    });
    // Expected form data

    const expectedFormData = {
      data: {
        corporateCode: "0",
        name: "Name",
        registrationNo: "No.123456789",
        taxId: "123",
        dateofincorporation: "2023-01-01T00:00:00.000Z",
        registeredCapital: 12345,
        revenuePerYear: 12345,
        netProFitLoss: 12345,
        shareholderEquity: 12345,
        registeredBusiness: {
          address: [
            {
              addressNo: "addressNumber",
              mooNo: "Moo",
              soi: "Soi",
              floor: "Floor",
              building: "Building",
              road: "Road",
              tambon: "Tambon",
              amphoe: "Amphoe",
              province: "Province",
              postalCode: "Postal Code",
              country: "Country",
            },
          ],
          emailAddress: "Email Address",
          telephone: "Telephone",
        },
        placeofIncorporation: {
          address: [
            {
              addressNo: "addressNumber",
              mooNo: "Moo",
              soi: "Soi",
              floor: "Floor",
              building: "Building",
              road: "Road",
              tambon: "Tambon",
              amphoe: "Amphoe",
              province: "Province",
              postalCode: "Postal Code",
              country: "Country",
            },
          ],
          emailAddress: "Email Address",
          telephone: "Telephone",
        },
        primary: "",
        registered: "",
        isPrimaryCountry: true,
        isPrimaryOther: false,
        isRegisteredOther: false,
        isRegisteredThailand: true,
      },
    };
    await waitFor(() => {
      const state = store.getState();
      const corporateState = state.corporateTest;
      expect(corporateState).toMatchObject(expectedFormData);
    });
  }, 20000);
});

const mockCorporateData: TCorporateData = {
  CorporateCode: 80000001,
  Info: {
    id: "1",
    createBy: "user",
    CreatedAt: "2023-01-01",
    DeletedAt: null,
    corporateCode: 80000001,
    name: "Test Corporate",
    registrationNo: "123456789",
    taxId: "TAXID789",
    dateOfIncorporation: "2023-10-01",
  },
  CorporateCountry: [
    {
      id: "1",
      createBy: "user",
      CreatedAt: "2023-01-01",
      DeletedAt: null,
      corporateCode: 80000001,
      isThailand: true,
      other: "N/A",
      types: 1,
    },
  ],
  CorporateAddress: [
    {
      address: [
        {
          id: "1",
          createBy: "user",
          CreatedAt: "2023-01-01",
          DeletedAt: null,
          corporateCode: 80000001,
          addressNo: "123",
          mooNo: "2",
          building: "Business Building",
          floor: "4",
          soi: "Main Soi",
          road: "Business Road",
          tambon: "Central Tambon",
          amphoe: "Central Amphoe",
          province: "Bangkok",
          postalCode: "10110",
          country: "Thailand",
          types: 1,
        },
      ],
      emailAddress: "contact@business.com",
      telephone: "+66-123-4567",
    },
  ],
  CorporateFinancials: {
    id: "1",
    createBy: "user",
    CreatedAt: "2023-01-01",
    DeletedAt: null,
    corporateCode: 80000001,
    registeredCapital: 1000000,
    revenuePerYear: 5000000,
    netProfitLoss: 200000,
    shareholderEquity: 3000000,
  },
  CorporateTypes: {
    id: "1",
    createBy: "user",
    CreatedAt: "2023-01-01",
    DeletedAt: null,
    corporateCode: 80000001,
    isJuristicThailand: true,
    isTaxExempt: false,
    isNonTaxExempt: true,
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
    isHotelRestaurant: true,
    isArmament: false,
    isInsuranceAssurance: false,
    isCasinoGambling: false,
    isJewelryGoldTrading: false,
    isFoundation: false,
    isPropertyRealEstate: true,
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
    isRevenueSelling: false,
    isStock: false,
    otherIncome: "",
  },
  CountrySourceIncomes: [
    {
      CreatedAt: "2023-01-01",
      DeletedAt: null,
      corporateCountry: {
        id: "1",
        createBy: "user",
        CreatedAt: "2023-01-01",
        DeletedAt: null,
        corporateCode: 80000001,
        isThailand: true,
        other: "N/A",
        types: 1,
      },
      isliquidation: false,
      otherInvestment: "N/A",
      investmentObject: "N/A",
      isCashManagement: false,
      isInvestment: false,
      isLiquidation: false,
      isOtherInvestment: false,
      otherCountry: "N/A",
    },
  ],
  Contact: [
    {
      id: "1",
      createBy: "user",
      CreatedAt: "2023-01-01",
      DeletedAt: null,
      corporateCode: 80000001,
      fullNames: [
        {
          id: "1",
          createBy: "user",
          CreatedAt: "2023-01-01",
          DeletedAt: null,
          contactID: "1",
          title: "Mr.",
          firstName: "John",
          lastName: "Doe",
          types: 1,
        },
      ],
      telephone: "+66-123-4567",
      email: "john.doe@example.com",
      types: 1,
      personalId: "123456789",
      position: "Manager",
      division: "Sales",
    },
  ],
  Directors: [
    {
      id: "1",
      createBy: "user",
      CreatedAt: "2023-01-01",
      DeletedAt: null,
      personalId: "123456789",
      corporateCode: 80000001,
      fullNames: [
        {
          id: "1",
          createBy: "user",
          CreatedAt: "2023-01-01",
          DeletedAt: null,
          ReferenceID: "1",
          title: "Mr.",
          firstName: "John",
          lastName: "Doe",
          types: 1,
        },
      ],
      addresses: [
        {
          id: "1",
          createBy: "user",
          CreatedAt: "2023-01-01",
          DeletedAt: null,
          ReferenceID: "1",
          addressNo: "123",
          building: "Home Building",
          floor: "4",
          mooNo: "2",
          soi: "Main Soi",
          road: "Home Road",
          tambon: "Central Tambon",
          amphoe: "Central Amphoe",
          province: "Bangkok",
          postalCode: "10110",
          country: "Thailand",
          types: 1,
        },
      ],
      citizenId: "123456789",
      passportId: "987654321",
      expiryDate: "2025-01-01",
      nationality: "Thai",
      types: 1,
    },
  ],
  AuthorizedPersons: [
    {
      id: "1",
      createBy: "user",
      CreatedAt: "2023-01-01",
      DeletedAt: null,
      personalId: "123456789",
      corporateCode: 80000001,
      fullNames: [
        {
          id: "1",
          createBy: "user",
          CreatedAt: "2023-01-01",
          DeletedAt: null,
          ReferenceID: "1",
          title: "Mr.",
          firstName: "John",
          lastName: "Doe",
          types: 1,
        },
      ],
      addresses: [
        {
          id: "1",
          createBy: "user",
          CreatedAt: "2023-01-01",
          DeletedAt: null,
          ReferenceID: "1",
          addressNo: "123",
          building: "Home Building",
          floor: "4",
          mooNo: "2",
          soi: "Main Soi",
          road: "Home Road",
          tambon: "Central Tambon",
          amphoe: "Central Amphoe",
          province: "Bangkok",
          postalCode: "10110",
          country: "Thailand",
          types: 1,
        },
      ],
      passportId: "987654321",
      citizenId: "123456789",
      expiryDate: "2025-01-01",
      nationality: "Thai",
      types: 1,
    },
  ],
  IndividualShareholders: [
    {
      id: "1",
      createBy: "user",
      CreatedAt: "2023-01-01",
      DeletedAt: null,
      personalId: "123456789",
      corporateCode: 80000001,
      fullNames: [
        {
          id: "1",
          createBy: "user",
          CreatedAt: "2023-01-01",
          DeletedAt: null,
          ReferenceID: "1",
          title: "Mr.",
          firstName: "John",
          lastName: "Doe",
          types: 1,
        },
      ],
      citizenId: "123456789",
      passportId: "987654321",
      expiryDate: "2025-01-01",
      nationality: "Thai",
      types: 1,
      sharePercentage: 50,
    },
  ],
  Juristics: [
    {
      id: "1",
      createBy: "user",
      CreatedAt: "2023-01-01",
      DeletedAt: null,
      corporateCode: 80000001,
      juristicName: "Juristic Name",
      registrationNo: "987654321",
      registeredCountry: "Thailand",
      sharePercentage: 50,
    },
  ],
  Banks: [
    {
      id: "1",
      createBy: "user",
      CreatedAt: "2023-01-01",
      DeletedAt: null,
      corporateCode: 80000001,
      accountType: "Savings",
      bankName: "Bank of Thailand",
      accountNo: "1234567890",
      accountLocation: "Bangkok",
      swiftCode: "BOTHTHBK",
      BankId: "BOT123",
    },
  ],
  Documents: [
    {
      id: "1",
      filePath: "/documents/doc1.pdf",
      corporateCode: 80000001,
      docType: "Registration",
      fileName: "registration.pdf",
      fileTypes: "PDF",
    },
  ],
  Attorneys: [
    {
      id: "1",
      createBy: "user",
      CreatedAt: "2023-01-01",
      DeletedAt: null,
      personalId: "123456789",
      corporateCode: 80000001,
      fullNames: [
        {
          id: "1",
          createBy: "user",
          CreatedAt: "2023-01-01",
          DeletedAt: null,
          ReferenceID: "1",
          title: "Mr.",
          firstName: "John",
          lastName: "Doe",
          types: 1,
        },
      ],
      addresses: [
        {
          id: "1",
          createBy: "user",
          CreatedAt: "2023-01-01",
          DeletedAt: null,
          ReferenceID: "1",
          addressNo: "123",
          building: "Home Building",
          floor: "4",
          mooNo: "2",
          soi: "Main Soi",
          road: "Home Road",
          tambon: "Central Tambon",
          amphoe: "Central Amphoe",
          province: "Bangkok",
          postalCode: "10110",
          country: "Thailand",
          types: 1,
        },
      ],
      passportId: "987654321",
      citizenId: "123456789",
      expiryDate: "2025-01-01",
      nationality: "Thai",
      types: 1,
      telephone: "+66-123-4567",
      email: "john.doe@example.com",
    },
  ],
};

describe("test create corporate form2", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store.dispatch(setUser(mockUser));
  });

  test("test Juristic Infomations (Page)", async () => {
    store.dispatch(setCorporateData(mockCorporateData));

    render(
      <Provider store={store}>
        <MemoryRouter>
          <PageJuristicType
          />
        </MemoryRouter>
      </Provider>
    );

    const pageTitle = screen.getByText("Juristic Infomations");
    expect(pageTitle).toBeInTheDocument();

    const juristicId = screen.getByText("Juristic ID");
    expect(juristicId).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(": 80000001"));
    });

    const taxId = screen.getByText("Tax ID");
    expect(taxId).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(": TAXID789"));
    });

    const juristicName = screen.getByText("Juristic Investor Name");
    expect(juristicName).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(": Test Corporate"));
    });

    const dateIncorporation = screen.getByText("Date Of Incorporation");
    expect(dateIncorporation).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(": 2023-10-01"));
    });

    const commercialNumber = screen.getByText("Commercial Number");
    expect(commercialNumber).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(": 123456789"));
    });

    store.dispatch(clearCorporateData());
  }, 20000);

  test("test input data(multiple input type) Specify Other Input", async () => {
    // const onSubmit = jest.fn();
    store.dispatch(clearTestCorporateData());
    const state = store.getState();
    console.log("State after clearCorporateData:", state);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <FormCorporateTypeAndIncome />
        </MemoryRouter>
      </Provider>
    );

    //first box
    const juristicThailand = screen.getByLabelText("Juristic (Thailand)");
    expect(juristicThailand).toBeInTheDocument();
    expect(juristicThailand).not.toBeChecked();
    fireEvent.click(juristicThailand);
    expect(juristicThailand).toBeChecked();

    const TaxExempt = screen.getByLabelText(
      "Tax Exempt On Dividend And Capital Gain"
    );
    expect(TaxExempt).toBeInTheDocument();
    expect(TaxExempt).not.toBeChecked();
    fireEvent.click(TaxExempt);
    expect(TaxExempt).toBeChecked();

    //business type box
    const AntiqueTrading = screen.getByLabelText("Antique Trading");
    expect(AntiqueTrading).toBeInTheDocument();
    expect(AntiqueTrading).not.toBeChecked();
    fireEvent.click(AntiqueTrading);
    expect(AntiqueTrading).toBeChecked();

    //source of income box
    const revenueBusiness = screen.getByLabelText("Revenue From Business");
    expect(revenueBusiness).toBeInTheDocument();
    expect(revenueBusiness).not.toBeChecked();
    fireEvent.click(revenueBusiness);
    expect(revenueBusiness).toBeChecked();

    //country source of income box
    const thailand = screen.getByLabelText("Thailand");
    expect(thailand).toBeInTheDocument();
    expect(thailand).not.toBeChecked();
    fireEvent.click(thailand);
    expect(thailand).toBeChecked();

    //investment objective box
    const liquidityManagment = screen.getByLabelText("Liquidity Management");
    expect(liquidityManagment).toBeInTheDocument();
    expect(liquidityManagment).not.toBeChecked();
    fireEvent.click(liquidityManagment);
    expect(liquidityManagment).toBeChecked();

    const submitButton = screen.getByText("Next Form");
    expect(submitButton).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(submitButton);
    });

    //Expected form data
    const expectedFormData = {
      data: {
        CreatedAt: "",
        DeletedAt: null,
        id: "",
        corporateCode: 0,
        isAntiqueTrading: true,
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
        createBy: "",
        isJuristicThailand: true,
        isTaxExempt: true,
        isNonTaxExempt: false,
        isJuristicForeign: false,
        isOperatingInThailand: false,
        isNonOperatingInThailand: false,
        isOther: false,
        isPartnership: false,
        isGovernmentStateEnterprise: false,
        isCoOperative: false,
        isTaxExemptCompany: false,
        isDonation: false,
        isLoan: false,
        isOtherIncome: false,
        isRevenue: true,
        isRevenueSelling: false,
        isStock: false,
        otherIncome: "",
        corporateCountry: { isThailand: true },
        isLiquidation: true,
      },
    };

    await waitFor(() => {
      const state = store.getState();
      const corporateState = state.corporateTest;
      console.log("Corporate State After Submission:", corporateState);
      expect(corporateState).toMatchObject(expectedFormData);
    });
  }, 20000);

  test("test input data(multiple input type)", async () => {
    // const onSubmit = jest.fn();
    store.dispatch(clearTestCorporateData());
    render(
      <Provider store={store}>
        <MemoryRouter>
          <FormCorporateTypeAndIncome />
        </MemoryRouter>
      </Provider>
    );

    //first box
    const juristicThailand = screen.getByLabelText("Juristic (Thailand)");
    expect(juristicThailand).toBeInTheDocument();
    expect(juristicThailand).not.toBeChecked();
    fireEvent.click(juristicThailand);
    expect(juristicThailand).toBeChecked();

    const TaxExempt = screen.getByLabelText(
      "Tax Exempt On Dividend And Capital Gain"
    );
    expect(TaxExempt).toBeInTheDocument();
    expect(TaxExempt).not.toBeChecked();
    fireEvent.click(TaxExempt);
    expect(TaxExempt).toBeChecked();

    //business type box
    const AntiqueTrading = screen.getByLabelText("Antique Trading");
    expect(AntiqueTrading).toBeInTheDocument();
    expect(AntiqueTrading).not.toBeChecked();
    fireEvent.click(AntiqueTrading);
    expect(AntiqueTrading).toBeChecked();

    //source of income box
    const sourceOfIncomeOther = screen.getByTestId("sourceOfIncomeOther");
    expect(sourceOfIncomeOther).toBeInTheDocument();
    expect(sourceOfIncomeOther).not.toBeChecked();
    fireEvent.click(sourceOfIncomeOther);
    expect(sourceOfIncomeOther).toBeChecked();

    const sourceOfIncomeOtherInput = screen.getByPlaceholderText(
      "Others Please Specific"
    );
    expect(sourceOfIncomeOtherInput).toBeInTheDocument();
    fireEvent.change(sourceOfIncomeOtherInput, {
      target: { value: "Thailand" },
    });
    expect(sourceOfIncomeOtherInput).toHaveValue("Thailand");

    //country source of income box
    const thailandOther = screen.getByLabelText(
      "Others Countries (Please Specify)"
    );
    expect(thailandOther).toBeInTheDocument();
    expect(thailandOther).not.toBeChecked();
    fireEvent.click(thailandOther);
    expect(thailandOther).toBeChecked();

    const thailandOtherInput = screen.getByPlaceholderText(
      "Others Please Specify"
    );
    expect(thailandOtherInput).toBeInTheDocument();
    fireEvent.change(thailandOtherInput, { target: { value: "Thailand" } });
    expect(thailandOtherInput).toHaveValue("Thailand");

    //investment objective box
    const investmentObjectiveOther = screen.getByTestId(
      "investmentObjectiveOther"
    );
    expect(investmentObjectiveOther).toBeInTheDocument();
    expect(investmentObjectiveOther).not.toBeChecked();
    fireEvent.click(investmentObjectiveOther);
    expect(investmentObjectiveOther).toBeChecked();

    const investmentObjectiveOtherInput = screen.getByTestId(
      "investmentObjectiveOtherBox"
    );
    expect(investmentObjectiveOtherInput).toBeInTheDocument();
    fireEvent.change(investmentObjectiveOtherInput, {
      target: { value: "Thailand" },
    });
    expect(investmentObjectiveOtherInput).toHaveValue("Thailand");

    const submitButton = screen.getByText("Next Form");
    expect(submitButton).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(submitButton);
    });

    //Expected form data
    // const expectedFormData = {
    // };

    await waitFor(() => {
      const state = store.getState();
      const corporateState = state.corporateTest;
      console.log("Corporate State After Submission:", corporateState);
      // expect(corporateState).toMatchObject(expectedFormData);
    });
  }, 20000);

  test("test input form2 all radio input", async () => {
    // const onSubmit = jest.fn();
    store.dispatch(clearTestCorporateData());
    render(
      <Provider store={store}>
        <MemoryRouter>
          <FormCorporateTypeAndIncome />
        </MemoryRouter>
      </Provider>
    );

    //first box

    const juristicOthers = screen.getByLabelText("Others");
    expect(juristicOthers).toBeInTheDocument();
    expect(juristicOthers).not.toBeChecked();
    fireEvent.click(juristicOthers);
    expect(juristicOthers).toBeChecked();

    const partnerShip = screen.getByLabelText("Partnership (Thailand)");
    expect(partnerShip).toBeInTheDocument();
    expect(partnerShip).not.toBeChecked();
    fireEvent.click(partnerShip);
    expect(partnerShip).toBeChecked();

    const government = screen.getByLabelText(
      "Government Organization / State Enterprise"
    );
    expect(government).toBeInTheDocument();
    expect(government).not.toBeChecked();
    fireEvent.click(government);
    expect(government).toBeChecked();

    const taxExamptCompany = screen.getByLabelText("Tax Exempt Company");
    expect(taxExamptCompany).toBeInTheDocument();
    expect(taxExamptCompany).not.toBeChecked();
    fireEvent.click(taxExamptCompany);
    expect(taxExamptCompany).toBeChecked();

    const juristicForeign = screen.getByLabelText("Juristic (Foreign)");
    expect(juristicForeign).toBeInTheDocument();
    expect(juristicForeign).not.toBeChecked();
    fireEvent.click(juristicForeign);
    expect(juristicForeign).toBeChecked();

    const operatingThailand = screen.getByLabelText("Operating In Thailand");
    expect(operatingThailand).toBeInTheDocument();
    expect(operatingThailand).not.toBeChecked();
    fireEvent.click(operatingThailand);
    expect(operatingThailand).toBeChecked();

    const nonOperatingThailand = screen.getByLabelText(
      "Non Operating In Thailand"
    );
    expect(nonOperatingThailand).toBeInTheDocument();
    expect(nonOperatingThailand).not.toBeChecked();
    fireEvent.click(nonOperatingThailand);
    expect(nonOperatingThailand).toBeChecked();

    const juristicThailand = screen.getByLabelText("Juristic (Thailand)");
    expect(juristicThailand).toBeInTheDocument();
    expect(juristicThailand).not.toBeChecked();
    fireEvent.click(juristicThailand);
    expect(juristicThailand).toBeChecked();

    const TaxExempt = screen.getByLabelText(
      "Tax Exempt On Dividend And Capital Gain"
    );
    expect(TaxExempt).toBeInTheDocument();
    expect(TaxExempt).not.toBeChecked();
    fireEvent.click(TaxExempt);
    expect(TaxExempt).toBeChecked();

    //business type box

    const armamnet = screen.getByLabelText("Armamnet");
    expect(armamnet).toBeInTheDocument();
    expect(armamnet).not.toBeChecked();
    fireEvent.click(armamnet);
    expect(armamnet).toBeChecked();

    const casinoGambling = screen.getByLabelText("Casino / Gambling");
    expect(casinoGambling).toBeInTheDocument();
    expect(casinoGambling).not.toBeChecked();
    fireEvent.click(casinoGambling);
    expect(casinoGambling).toBeChecked();

    const entertainmentBusiness = screen.getByLabelText(
      "Entertainment Business"
    );
    expect(entertainmentBusiness).toBeInTheDocument();
    expect(entertainmentBusiness).not.toBeChecked();
    fireEvent.click(entertainmentBusiness);
    expect(entertainmentBusiness).toBeChecked();

    const financialService = screen.getByLabelText(
      "Financial Service / Banking"
    );
    expect(financialService).toBeInTheDocument();
    expect(financialService).not.toBeChecked();
    fireEvent.click(financialService);
    expect(financialService).toBeChecked();

    const foreignExhange = screen.getByLabelText("Foreign Currency Exchange");
    expect(foreignExhange).toBeInTheDocument();
    expect(foreignExhange).not.toBeChecked();
    fireEvent.click(foreignExhange);
    expect(foreignExhange).toBeChecked();

    const hotelResturant = screen.getByLabelText("Hotel / Restaurant");
    expect(hotelResturant).toBeInTheDocument();
    expect(hotelResturant).not.toBeChecked();
    fireEvent.click(hotelResturant);
    expect(hotelResturant).toBeChecked();

    const insuranceAssurance = screen.getByLabelText("Insurance / Assurance");
    expect(insuranceAssurance).toBeInTheDocument();
    expect(insuranceAssurance).not.toBeChecked();
    fireEvent.click(insuranceAssurance);
    expect(insuranceAssurance).toBeChecked();

    const jewelryGold = screen.getByLabelText("Jewelry / Gold Trading");
    expect(jewelryGold).toBeInTheDocument();
    expect(jewelryGold).not.toBeChecked();
    fireEvent.click(jewelryGold);
    expect(jewelryGold).toBeChecked();

    const AntiqueTrading = screen.getByLabelText("Antique Trading");
    expect(AntiqueTrading).toBeInTheDocument();
    expect(AntiqueTrading).not.toBeChecked();
    fireEvent.click(AntiqueTrading);
    expect(AntiqueTrading).toBeChecked();

    //source of income box
    const sourceOfIncomeOther = screen.getByTestId("sourceOfIncomeOther");
    expect(sourceOfIncomeOther).toBeInTheDocument();
    expect(sourceOfIncomeOther).not.toBeChecked();
    fireEvent.click(sourceOfIncomeOther);
    expect(sourceOfIncomeOther).toBeChecked();

    const sourceOfIncomeOtherInput = screen.getByPlaceholderText(
      "Others Please Specific"
    );
    expect(sourceOfIncomeOtherInput).toBeInTheDocument();
    fireEvent.change(sourceOfIncomeOtherInput, {
      target: { value: "Thailand" },
    });
    expect(sourceOfIncomeOtherInput).toHaveValue("Thailand");

    //country source of income box
    const thailandOther = screen.getByLabelText(
      "Others Countries (Please Specify)"
    );
    expect(thailandOther).toBeInTheDocument();
    expect(thailandOther).not.toBeChecked();
    fireEvent.click(thailandOther);
    expect(thailandOther).toBeChecked();

    const thailandOtherInput = screen.getByPlaceholderText(
      "Others Please Specify"
    );
    expect(thailandOtherInput).toBeInTheDocument();
    fireEvent.change(thailandOtherInput, { target: { value: "Thailand" } });
    expect(thailandOtherInput).toHaveValue("Thailand");

    //investment objective box

    const investment = screen.getByLabelText("Investment");
    expect(investment).toBeInTheDocument();
    expect(investment).not.toBeChecked();
    fireEvent.click(investment);
    expect(investment).toBeChecked();

    const cashManagement = screen.getByLabelText(
      "Cash Management For Investment"
    );
    expect(cashManagement).toBeInTheDocument();
    expect(cashManagement).not.toBeChecked();
    fireEvent.click(cashManagement);
    expect(cashManagement).toBeChecked();

    const investmentObjectiveOther = screen.getByTestId(
      "investmentObjectiveOther"
    );
    expect(investmentObjectiveOther).toBeInTheDocument();
    expect(investmentObjectiveOther).not.toBeChecked();
    fireEvent.click(investmentObjectiveOther);
    expect(investmentObjectiveOther).toBeChecked();

    const investmentObjectiveOtherInput = screen.getByTestId(
      "investmentObjectiveOtherBox"
    );
    expect(investmentObjectiveOtherInput).toBeInTheDocument();
    fireEvent.change(investmentObjectiveOtherInput, {
      target: { value: "Thailand" },
    });
    expect(investmentObjectiveOtherInput).toHaveValue("Thailand");

    const submitButton = screen.getByText("Next Form");
    expect(submitButton).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(submitButton);
    });

    //Expected form data
    const expectedFormData = {
      data: {
        CreatedAt: "",
        DeletedAt: null,
        id: "",
        corporateCode: 0,
        isAntiqueTrading: true,
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
        createBy: "",
        isJuristicThailand: true,
        isTaxExempt: true,
        isNonTaxExempt: false,
        isJuristicForeign: false,
        isOperatingInThailand: false,
        isNonOperatingInThailand: false,
        isOther: false,
        isPartnership: false,
        isGovernmentStateEnterprise: false,
        isCoOperative: false,
        isTaxExemptCompany: false,
        isDonation: false,
        isLoan: false,
        isOtherIncome: true,
        isRevenue: false,
        isRevenueSelling: false,
        isStock: false,
        otherIncome: "Thailand",
        corporateCountry: { isThailand: false, other: "Thailand" },
        isInvestment: true,
        isCashManagement: true,
        isOtherInvestment: true,
        otherInvestment: "Thailand",
      },
    };

    await waitFor(() => {
      const state = store.getState();
      const corporateState = state.corporateTest;
      console.log("Corporate State After Submission:", corporateState);
      expect(corporateState).toMatchObject(expectedFormData);
    });
  }, 20000);

  test("update form2 (juristicType)", async () => {
    store.dispatch(setCorporateData(mockCorporateData));

    render(
      <Provider store={store}>
        <MemoryRouter>
          <FormCorporateTypeAndIncome />
        </MemoryRouter>
      </Provider>
    );

    const submitButton = screen.getByText("Next Form");
    expect(submitButton).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(submitButton);
    });

    //Expected form data
    const expectedFormData = {
      data: {
        CreatedAt: "2023-01-01",
        DeletedAt: null,
        id: "1",
        corporateCode: 80000001,
        isAntiqueTrading: false,
        isHotelRestaurant: true,
        isArmament: false,
        isInsuranceAssurance: false,
        isCasinoGambling: false,
        isJewelryGoldTrading: false,
        isFoundation: false,
        isPropertyRealEstate: true,
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
        createBy: "user",
        isJuristicThailand: true,
        isTaxExempt: false,
        isNonTaxExempt: true,
        isJuristicForeign: false,
        isOperatingInThailand: true,
        isNonOperatingInThailand: false,
        isOther: false,
        isPartnership: false,
        isGovernmentStateEnterprise: false,
        isCoOperative: false,
        isTaxExemptCompany: false,
        isDonation: false,
        isLoan: false,
        isOtherIncome: false,
        isRevenue: true,
        isRevenueSelling: false,
        isStock: false,
        otherIncome: "",
        corporateCountry: {
          id: "1",
          createBy: "user",
          CreatedAt: "2023-01-01",
          DeletedAt: null,
          corporateCode: 80000001,
          isThailand: true,
          other: "N/A",
          types: 1,
        },
        isliquidation: false,
        otherInvestment: "N/A",
        investmentObject: "N/A",
        isCashManagement: false,
        isInvestment: false,
        isLiquidation: false,
        isOtherInvestment: false,
        otherCountry: "N/A",
      },
    };

    await waitFor(() => {
      const state = store.getState();
      const corporateState = state.corporateTest;
      console.log("Corporate State After Submission:", corporateState);
      expect(corporateState).toMatchObject(expectedFormData);
    });
  }, 20000);
});

describe("test create corporate form3 (contact person)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store.dispatch(setUser(mockUser));
  });

  test("test input data(multiple input type)", async () => {
    // const choosedEditData = {
    //   id: "",
    //   createBy: "",
    //   CreatedAt: "",
    //   DeletedAt: null,
    //   corporateCode: 0,
    //   fullNames: [{ title: '', firstName: '', lastName: '' }],
    //   telephone: '',
    //   email: '',
    //   types: 1,
    //   personalId: '',
    //   position: '',
    //   division: ''
    // }

    const mockOnSubmit = jest.fn();
    const mockClearChoosedEditData = jest.fn();
    const mockCorporateCode = "0";

    render(
      <Provider store={store}>
        <MemoryRouter>
          <FormIndividualsContactPerson
            onsubmit={mockOnSubmit}
            corporateCode={mockCorporateCode}
            clearChoosedEditData={mockClearChoosedEditData}
          />
        </MemoryRouter>
      </Provider>
    );

    const title = screen.getByLabelText("Title");
    expect(title).toBeInTheDocument();
    fireEvent.change(title, { target: { value: "Mr" } });
    expect(title).toHaveValue("Mr");

    const firstName = screen.getByLabelText("First Name");
    expect(firstName).toBeInTheDocument();
    fireEvent.change(firstName, { target: { value: "John" } });
    expect(firstName).toHaveValue("John");

    const surname = screen.getByLabelText("Surname");
    expect(surname).toBeInTheDocument();
    fireEvent.change(surname, { target: { value: "Doe" } });
    expect(surname).toHaveValue("Doe");

    const position = screen.getByLabelText("Position");
    expect(position).toBeInTheDocument();
    fireEvent.change(position, { target: { value: "Position" } });
    expect(position).toHaveValue("Position");

    const division = screen.getByLabelText("Division");
    expect(division).toBeInTheDocument();
    fireEvent.change(division, { target: { value: "Division" } });
    expect(division).toHaveValue("Division");

    const telephone = screen.getByLabelText("Telephone");
    expect(telephone).toBeInTheDocument();
    fireEvent.change(telephone, { target: { value: "0123456789" } });
    expect(telephone).toHaveValue("0123456789");

    const email = screen.getByLabelText("Email");
    expect(email).toBeInTheDocument();
    fireEvent.change(email, { target: { value: "test@example.com" } });
    expect(email).toHaveValue("test@example.com");

    const submitButton = screen.getByText("Save");
    expect(submitButton).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(submitButton);
    });

    //Expected form data
    const expectedFormData = {
      data: {
        fullNames: [{ title: "Mr", firstName: "John", lastName: "Doe" }],
        position: "Position",
        division: "Division",
        telephone: "0123456789",
        email: "test@example.com",
      },
    };

    await waitFor(() => {
      const state = store.getState();
      const corporateState = state.corporateTest;
      console.log("Corporate State After Submission:", corporateState);
      expect(corporateState).toMatchObject(expectedFormData);
    });
  }, 20000);
});

describe("test create corporate form4 (list of director)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store.dispatch(setUser(mockUser));
  });

  test("test input data(multiple input type)", async () => {
    const mockOnSubmit = jest.fn();
    const mockClearChoosedEditData = jest.fn();
    const mockCorporateCode = "0";

    render(
      <Provider store={store}>
        <MemoryRouter>
          <FormIndividualsDirector
            onsubmit={mockOnSubmit}
            corporateCode={mockCorporateCode}
            clearChoosedEditData={mockClearChoosedEditData}
          />
        </MemoryRouter>
      </Provider>
    );

    const title = screen.getByLabelText("Title");
    expect(title).toBeInTheDocument();
    fireEvent.change(title, { target: { value: "Mr" } });
    expect(title).toHaveValue("Mr");

    const firstName = screen.getByLabelText("First Name");
    expect(firstName).toBeInTheDocument();
    fireEvent.change(firstName, { target: { value: "John" } });
    expect(firstName).toHaveValue("John");

    const surname = screen.getByLabelText("Surname");
    expect(surname).toBeInTheDocument();
    fireEvent.change(surname, { target: { value: "Doe" } });
    expect(surname).toHaveValue("Doe");

    const ID = screen.getByLabelText("Please fill ID");
    expect(ID).toBeInTheDocument();
    fireEvent.change(ID, { target: { value: "2571817668244" } });
    expect(ID).toHaveValue("2571817668244");

    const expiredDate = screen.getByTestId("expiredDate");
    expect(expiredDate).toBeInTheDocument();
    fireEvent.change(expiredDate, { target: { value: "2022-01-01" } });
    expect(expiredDate).toHaveValue("2022-01-01");

    const nationality = screen.getByLabelText("Nationality");
    expect(nationality).toBeInTheDocument();
    fireEvent.change(nationality, { target: { value: "Thai" } });
    expect(nationality).toHaveValue("Thai");

    const addressNumber = screen.getByLabelText("Address Number");
    expect(addressNumber).toBeInTheDocument();
    fireEvent.change(addressNumber, { target: { value: "address number" } });
    expect(addressNumber).toHaveValue("address number");

    const moo = screen.getByLabelText("Moo");
    expect(moo).toBeInTheDocument();
    fireEvent.change(moo, { target: { value: "moo" } });
    expect(moo).toHaveValue("moo");

    const soi = screen.getByLabelText("Soi");
    expect(soi).toBeInTheDocument();
    fireEvent.change(soi, { target: { value: "soi" } });
    expect(soi).toHaveValue("soi");

    const floor = screen.getByLabelText("Floor");
    expect(floor).toBeInTheDocument();
    fireEvent.change(floor, { target: { value: "floor" } });
    expect(floor).toHaveValue("floor");

    const building = screen.getByLabelText("Building");
    expect(building).toBeInTheDocument();
    fireEvent.change(building, { target: { value: "building" } });
    expect(building).toHaveValue("building");

    const road = screen.getByLabelText("Road");
    expect(road).toBeInTheDocument();
    fireEvent.change(road, { target: { value: "road" } });
    expect(road).toHaveValue("road");

    const tambon = screen.getByLabelText("Tambon");
    expect(tambon).toBeInTheDocument();
    expect(tambon).toHaveValue("");
    fireEvent.change(tambon, { target: { value: "tambon" } });
    expect(tambon).toHaveValue("tambon");

    const amphoe = screen.getByLabelText("Amphoe");
    expect(amphoe).toBeInTheDocument();
    expect(amphoe).toHaveValue("");
    fireEvent.change(amphoe, { target: { value: "amphoe" } });
    expect(amphoe).toHaveValue("amphoe");

    const province = screen.getByLabelText("Province");
    expect(province).toBeInTheDocument();
    expect(province).toHaveValue("");
    fireEvent.change(province, { target: { value: "province" } });
    expect(province).toHaveValue("province");

    const postalCode = screen.getByLabelText("PostalCode");
    expect(postalCode).toBeInTheDocument();
    expect(postalCode).toHaveValue("");
    fireEvent.change(postalCode, { target: { value: "postal code" } });
    expect(postalCode).toHaveValue("postal code");

    const country = screen.getByLabelText("Country");
    expect(country).toBeInTheDocument();
    expect(country).toHaveValue("");
    fireEvent.change(country, { target: { value: "country" } });
    expect(country).toHaveValue("country");

    const submitButton = screen.getByText("Save");
    expect(submitButton).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(submitButton);
    });

    //Expected form data
    const expectedFormData = {
      data: {
        fullNames: [{ title: "Mr", firstName: "John", lastName: "Doe" }],
        citizenId: "2571817668244",
        passportId: "",
        expiryDate: "2022-01-01",
        nationality: "Thai",
        addresses: [
          {
            addressNo: "address number",
            mooNo: "moo",
            soi: "soi",
            floor: "floor",
            building: "building",
            road: "road",
            tambon: "tambon",
            amphoe: "amphoe",
            province: "province",
            postalCode: "postal code",
            country: "country",
          },
        ],
        types: 101,
        corporateCode: "0",
        personalId: undefined,
      },
    };

    await waitFor(() => {
      const state = store.getState();
      const corporateState = state.corporateTest;
      console.log("Corporate State After Submission:", corporateState);
      expect(corporateState).toMatchObject(expectedFormData);
    });
  }, 20000);
});

describe("test create corporate form5 (individual shareholder)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store.dispatch(setUser(mockUser));
  });

  test("test input data(multiple input type)", async () => {
    const mockOnSubmit = jest.fn();
    const mockClearChoosedEditData = jest.fn();
    const mockCorporateCode = "0";

    render(
      <Provider store={store}>
        <MemoryRouter>
          <FormIndividualsShareholders
            onsubmit={mockOnSubmit}
            corporateCode={mockCorporateCode}
            clearChoosedEditData={mockClearChoosedEditData}
          />
        </MemoryRouter>
      </Provider>
    );

    const title = screen.getByLabelText("Title");
    expect(title).toBeInTheDocument();
    fireEvent.change(title, { target: { value: "Mr" } });
    expect(title).toHaveValue("Mr");

    const firstName = screen.getByLabelText("First Name");
    expect(firstName).toBeInTheDocument();
    fireEvent.change(firstName, { target: { value: "John" } });
    expect(firstName).toHaveValue("John");

    const surname = screen.getByLabelText("Surname");
    expect(surname).toBeInTheDocument();
    fireEvent.change(surname, { target: { value: "Doe" } });
    expect(surname).toHaveValue("Doe");

    const nationality = screen.getByLabelText("Nationality");
    expect(nationality).toBeInTheDocument();
    fireEvent.change(nationality, { target: { value: "Thai" } });
    expect(nationality).toHaveValue("Thai");

    const shares = screen.getByLabelText("Shares");
    expect(shares).toBeInTheDocument();
    expect(shares).toHaveValue(0);
    fireEvent.change(shares, { target: { value: "12.345" } });
    expect(shares).toHaveValue(12.345);

    const ID = screen.getByLabelText("Please fill ID");
    expect(ID).toBeInTheDocument();
    fireEvent.change(ID, { target: { value: "2571817668244" } });
    expect(ID).toHaveValue("2571817668244");

    const expiredDate = screen.getByTestId("expiredDate");
    expect(expiredDate).toBeInTheDocument();
    fireEvent.change(expiredDate, { target: { value: "2022-01-01" } });
    expect(expiredDate).toHaveValue("2022-01-01");

    const submitButton = screen.getByText("Save");
    expect(submitButton).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(submitButton);
    });

    //Expected form data
    const expectedFormData = {
      data: {
        fullNames: [{ title: "Mr", firstName: "John", lastName: "Doe" }],
        citizenId: "2571817668244",
        passportId: "",
        expiryDate: "2022-01-01",
        nationality: "Thai",
        sharePercentage: 1234500,
        types: 301,
        corporateCode: "0",
        personalId: "",
      },
    };

    await waitFor(() => {
      const state = store.getState();
      const corporateState = state.corporateTest;
      console.log("Corporate State After Submission:", corporateState);
      expect(corporateState).toMatchObject(expectedFormData);
    });
  }, 20000);
});

describe("test create corporate form5 (individual shareholder)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store.dispatch(setUser(mockUser));
  });

  test("test input data(multiple input type)", async () => {
    const mockOnSubmit = jest.fn();
    const mockClearChoosedEditData = jest.fn();
    const mockCorporateCode = "0";

    render(
      <Provider store={store}>
        <MemoryRouter>
          <FormIndividualsShareholders
            onsubmit={mockOnSubmit}
            corporateCode={mockCorporateCode}
            clearChoosedEditData={mockClearChoosedEditData}
          />
        </MemoryRouter>
      </Provider>
    );

    const title = screen.getByLabelText("Title");
    expect(title).toBeInTheDocument();
    fireEvent.change(title, { target: { value: "Mr" } });
    expect(title).toHaveValue("Mr");

    const firstName = screen.getByLabelText("First Name");
    expect(firstName).toBeInTheDocument();
    fireEvent.change(firstName, { target: { value: "John" } });
    expect(firstName).toHaveValue("John");

    const surname = screen.getByLabelText("Surname");
    expect(surname).toBeInTheDocument();
    fireEvent.change(surname, { target: { value: "Doe" } });
    expect(surname).toHaveValue("Doe");

    const nationality = screen.getByLabelText("Nationality");
    expect(nationality).toBeInTheDocument();
    fireEvent.change(nationality, { target: { value: "Thai" } });
    expect(nationality).toHaveValue("Thai");

    const shares = screen.getByLabelText("Shares");
    expect(shares).toBeInTheDocument();
    expect(shares).toHaveValue(0);
    fireEvent.change(shares, { target: { value: "12.345" } });
    expect(shares).toHaveValue(12.345);

    const ID = screen.getByLabelText("Please fill ID");
    expect(ID).toBeInTheDocument();
    fireEvent.change(ID, { target: { value: "2571817668244" } });
    expect(ID).toHaveValue("2571817668244");

    const expiredDate = screen.getByTestId("expiredDate");
    expect(expiredDate).toBeInTheDocument();
    fireEvent.change(expiredDate, { target: { value: "2022-01-01" } });
    expect(expiredDate).toHaveValue("2022-01-01");

    const submitButton = screen.getByText("Save");
    expect(submitButton).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(submitButton);
    });

    //Expected form data
    const expectedFormData = {
      data: {
        fullNames: [{ title: "Mr", firstName: "John", lastName: "Doe" }],
        citizenId: "2571817668244",
        passportId: "",
        expiryDate: "2022-01-01",
        nationality: "Thai",
        sharePercentage: 1234500,
        types: 301,
        corporateCode: "0",
        personalId: "",
      },
    };

    await waitFor(() => {
      const state = store.getState();
      const corporateState = state.corporateTest;
      console.log("Corporate State After Submission:", corporateState);
      expect(corporateState).toMatchObject(expectedFormData);
    });
  }, 20000);
});

describe("test create corporate form6 (juristics shareholder)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store.dispatch(setUser(mockUser));
  });

  test("test input data(multiple input type)", async () => {
    const mockOnSubmit = jest.fn();
    const mockClearChoosedEditData = jest.fn();
    const mockCorporateCode = "0";

    render(
      <Provider store={store}>
        <MemoryRouter>
          <FormJuristicShareholders
            onsubmit={mockOnSubmit}
            corporateCode={mockCorporateCode}
            clearChoosedEditData={mockClearChoosedEditData}
          />
        </MemoryRouter>
      </Provider>
    );

    const juristicName = screen.getByLabelText("Juristic Name");
    expect(juristicName).toBeInTheDocument();
    fireEvent.change(juristicName, { target: { value: "John Doe" } });
    expect(juristicName).toHaveValue("John Doe");

    const RegistrationNo = screen.getByLabelText("Commercial Registration No.");
    expect(RegistrationNo).toBeInTheDocument();
    fireEvent.change(RegistrationNo, { target: { value: "2571817668244" } });
    expect(RegistrationNo).toHaveValue("2571817668244");

    const registrationCountry = screen.getByLabelText("Registration Country");
    expect(registrationCountry).toBeInTheDocument();
    fireEvent.change(registrationCountry, { target: { value: "Thailand" } });
    expect(registrationCountry).toHaveValue("Thailand");

    const shares = screen.getByLabelText("Shares");
    expect(shares).toBeInTheDocument();
    expect(shares).toHaveValue(0);
    fireEvent.change(shares, { target: { value: "12.345" } });
    expect(shares).toHaveValue(12.345);

    const submitButton = screen.getByText("Save");
    expect(submitButton).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(submitButton);
    });

    //Expected form data
    const expectedFormData = {
      data: {
        juristicName: "John Doe",
        registrationNo: "2571817668244",
        registeredCountry: "Thailand",
        sharePercentage: 1234500,
        corporateCode: "0",
        juristicId: undefined,
      },
    };

    await waitFor(() => {
      const state = store.getState();
      const corporateState = state.corporateTest;
      console.log("Corporate State After Submission:", corporateState);
      expect(corporateState).toMatchObject(expectedFormData);
    });
  }, 20000);
});

describe("test create corporate form7 (authorized person)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store.dispatch(setUser(mockUser));
  });

  test("test input data(multiple input type)", async () => {
    const mockOnSubmit = jest.fn();
    const mockClearChoosedEditData = jest.fn();
    const mockCorporateCode = "0";

    render(
      <Provider store={store}>
        <MemoryRouter>
          <FormAuthorizedPerson
            onsubmit={mockOnSubmit}
            corporateCode={mockCorporateCode}
            clearChoosedEditData={mockClearChoosedEditData}
          />
        </MemoryRouter>
      </Provider>
    );

    const title = screen.getByLabelText("Title");
    expect(title).toBeInTheDocument();
    fireEvent.change(title, { target: { value: "Mr" } });
    expect(title).toHaveValue("Mr");

    const firstName = screen.getByLabelText("First Name");
    expect(firstName).toBeInTheDocument();
    fireEvent.change(firstName, { target: { value: "John" } });
    expect(firstName).toHaveValue("John");

    const surname = screen.getByLabelText("Surname");
    expect(surname).toBeInTheDocument();
    fireEvent.change(surname, { target: { value: "Doe" } });
    expect(surname).toHaveValue("Doe");

    const ID = screen.getByLabelText("Please fill ID");
    expect(ID).toBeInTheDocument();
    fireEvent.change(ID, { target: { value: "2571817668244" } });
    expect(ID).toHaveValue("2571817668244");

    const expiredDate = screen.getByTestId("expiredDate");
    expect(expiredDate).toBeInTheDocument();
    fireEvent.change(expiredDate, { target: { value: "2022-01-01" } });
    expect(expiredDate).toHaveValue("2022-01-01");

    const nationality = screen.getByLabelText("Nationality");
    expect(nationality).toBeInTheDocument();
    fireEvent.change(nationality, { target: { value: "Thai" } });
    expect(nationality).toHaveValue("Thai");

    const addressNumber = screen.getByLabelText("Address Number");
    expect(addressNumber).toBeInTheDocument();
    fireEvent.change(addressNumber, { target: { value: "address number" } });
    expect(addressNumber).toHaveValue("address number");

    const moo = screen.getByLabelText("Moo");
    expect(moo).toBeInTheDocument();
    fireEvent.change(moo, { target: { value: "moo" } });
    expect(moo).toHaveValue("moo");

    const soi = screen.getByLabelText("Soi");
    expect(soi).toBeInTheDocument();
    fireEvent.change(soi, { target: { value: "soi" } });
    expect(soi).toHaveValue("soi");

    const floor = screen.getByLabelText("Floor");
    expect(floor).toBeInTheDocument();
    fireEvent.change(floor, { target: { value: "floor" } });
    expect(floor).toHaveValue("floor");

    const building = screen.getByLabelText("Building");
    expect(building).toBeInTheDocument();
    fireEvent.change(building, { target: { value: "building" } });
    expect(building).toHaveValue("building");

    const road = screen.getByLabelText("Road");
    expect(road).toBeInTheDocument();
    fireEvent.change(road, { target: { value: "road" } });
    expect(road).toHaveValue("road");

    const tambon = screen.getByLabelText("Tambon");
    expect(tambon).toBeInTheDocument();
    expect(tambon).toHaveValue("");
    fireEvent.change(tambon, { target: { value: "tambon" } });
    expect(tambon).toHaveValue("tambon");

    const amphoe = screen.getByLabelText("Amphoe");
    expect(amphoe).toBeInTheDocument();
    expect(amphoe).toHaveValue("");
    fireEvent.change(amphoe, { target: { value: "amphoe" } });
    expect(amphoe).toHaveValue("amphoe");

    const province = screen.getByLabelText("Province");
    expect(province).toBeInTheDocument();
    expect(province).toHaveValue("");
    fireEvent.change(province, { target: { value: "province" } });
    expect(province).toHaveValue("province");

    const postalCode = screen.getByLabelText("PostalCode");
    expect(postalCode).toBeInTheDocument();
    expect(postalCode).toHaveValue("");
    fireEvent.change(postalCode, { target: { value: "postal code" } });
    expect(postalCode).toHaveValue("postal code");

    const country = screen.getByLabelText("Country");
    expect(country).toBeInTheDocument();
    expect(country).toHaveValue("");
    fireEvent.change(country, { target: { value: "country" } });
    expect(country).toHaveValue("country");

    const submitButton = screen.getByText("Save");
    expect(submitButton).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(submitButton);
    });

    //Expected form data
    const expectedFormData = {
      data: {
        fullNames: [{ title: "Mr", firstName: "John", lastName: "Doe" }],
        citizenId: "2571817668244",
        passportId: "",
        expiryDate: "2022-01-01",
        nationality: "Thai",
        addresses: [
          {
            addressNo: "address number",
            mooNo: "moo",
            soi: "soi",
            floor: "floor",
            building: "building",
            road: "road",
            tambon: "tambon",
            amphoe: "amphoe",
            province: "province",
            postalCode: "postal code",
            country: "country",
          },
        ],
        types: 201,
        corporateCode: "0",
        personalId: undefined,
      },
    };

    await waitFor(async () => {
      const state = store.getState();
      const corporateState = state.corporateTest;
      console.log("Corporate State After Submission:", corporateState);

      await sleep(500);
      expect(corporateState).toMatchObject(expectedFormData);
    });
  }, 20000);
});

describe("test create corporate form8 (attorney)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store.dispatch(setUser(mockUser));
  });

  test("test input data(multiple input type)", async () => {
    const mockOnSubmit = jest.fn();
    const mockClearChoosedEditData = jest.fn();
    const mockCorporateCode = "0";

    render(
      <Provider store={store}>
        <MemoryRouter>
          <FormAttorney
            onsubmit={mockOnSubmit}
            corporateCode={mockCorporateCode}
            clearChoosedEditData={mockClearChoosedEditData}
          />
        </MemoryRouter>
      </Provider>
    );

    const title = screen.getByLabelText("Title");
    expect(title).toBeInTheDocument();
    fireEvent.change(title, { target: { value: "Mr" } });
    expect(title).toHaveValue("Mr");

    const firstName = screen.getByLabelText("First Name");
    expect(firstName).toBeInTheDocument();
    fireEvent.change(firstName, { target: { value: "John" } });
    expect(firstName).toHaveValue("John");

    const surname = screen.getByLabelText("Surname");
    expect(surname).toBeInTheDocument();
    fireEvent.change(surname, { target: { value: "Doe" } });
    expect(surname).toHaveValue("Doe");

    const ID = screen.getByLabelText("Please fill ID");
    expect(ID).toBeInTheDocument();
    fireEvent.change(ID, { target: { value: "2571817668244" } });
    expect(ID).toHaveValue("2571817668244");

    const expiredDate = screen.getByTestId("expiredDate");
    expect(expiredDate).toBeInTheDocument();
    fireEvent.change(expiredDate, { target: { value: "2022-01-01" } });
    expect(expiredDate).toHaveValue("2022-01-01");

    const nationality = screen.getByLabelText("Nationality");
    expect(nationality).toBeInTheDocument();
    fireEvent.change(nationality, { target: { value: "Thai" } });
    expect(nationality).toHaveValue("Thai");

    const addressNumber = screen.getByLabelText("Address Number");
    expect(addressNumber).toBeInTheDocument();
    fireEvent.change(addressNumber, { target: { value: "address number" } });
    expect(addressNumber).toHaveValue("address number");

    const moo = screen.getByLabelText("Moo");
    expect(moo).toBeInTheDocument();
    fireEvent.change(moo, { target: { value: "moo" } });
    expect(moo).toHaveValue("moo");

    const soi = screen.getByLabelText("Soi");
    expect(soi).toBeInTheDocument();
    fireEvent.change(soi, { target: { value: "soi" } });
    expect(soi).toHaveValue("soi");

    const floor = screen.getByLabelText("Floor");
    expect(floor).toBeInTheDocument();
    fireEvent.change(floor, { target: { value: "floor" } });
    expect(floor).toHaveValue("floor");

    const building = screen.getByLabelText("Building");
    expect(building).toBeInTheDocument();
    fireEvent.change(building, { target: { value: "building" } });
    expect(building).toHaveValue("building");

    const road = screen.getByLabelText("Road");
    expect(road).toBeInTheDocument();
    fireEvent.change(road, { target: { value: "road" } });
    expect(road).toHaveValue("road");

    const tambon = screen.getByLabelText("Tambon");
    expect(tambon).toBeInTheDocument();
    expect(tambon).toHaveValue("");
    fireEvent.change(tambon, { target: { value: "tambon" } });
    expect(tambon).toHaveValue("tambon");

    const amphoe = screen.getByLabelText("Amphoe");
    expect(amphoe).toBeInTheDocument();
    expect(amphoe).toHaveValue("");
    fireEvent.change(amphoe, { target: { value: "amphoe" } });
    expect(amphoe).toHaveValue("amphoe");

    const province = screen.getByLabelText("Province");
    expect(province).toBeInTheDocument();
    expect(province).toHaveValue("");
    fireEvent.change(province, { target: { value: "province" } });
    expect(province).toHaveValue("province");

    const postalCode = screen.getByLabelText("PostalCode");
    expect(postalCode).toBeInTheDocument();
    expect(postalCode).toHaveValue("");
    fireEvent.change(postalCode, { target: { value: "postal code" } });
    expect(postalCode).toHaveValue("postal code");

    const country = screen.getByLabelText("Country");
    expect(country).toBeInTheDocument();
    expect(country).toHaveValue("");
    fireEvent.change(country, { target: { value: "country" } });
    expect(country).toHaveValue("country");

    const submitButton = screen.getByText("Save");
    expect(submitButton).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(submitButton);
    });

    //Expected form data
    const expectedFormData = {
      data: {
        fullNames: [{ title: "Mr", firstName: "John", lastName: "Doe" }],
        citizenId: "2571817668244",
        passportId: "",
        expiryDate: "2022-01-01",
        nationality: "Thai",
        addresses: [
          {
            addressNo: "address number",
            mooNo: "moo",
            soi: "soi",
            floor: "floor",
            building: "building",
            road: "road",
            tambon: "tambon",
            amphoe: "amphoe",
            province: "province",
            postalCode: "postal code",
            country: "country",
          },
        ],
        types: 302,
        corporateCode: "0",
        personalId: undefined,
      },
    };

    await waitFor(async () => {
      const state = store.getState();
      const corporateState = state.corporateTest;
      console.log("Corporate State After Submission:", corporateState);

      await sleep(500);
      expect(corporateState).toMatchObject(expectedFormData);
    });
  }, 20000);
});

describe("test create corporate form9 (bank)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store.dispatch(setUser(mockUser));
  });

  test("test input data(multiple input type)", async () => {
    const mockOnSubmit = jest.fn();
    const mockClearChoosedEditData = jest.fn();
    const mockCorporateCode = "0";

    render(
      <Provider store={store}>
        <MemoryRouter>
          <FormBank
            onsubmit={mockOnSubmit}
            corporateCode={mockCorporateCode}
            clearChoosedEditData={mockClearChoosedEditData}
          />
        </MemoryRouter>
      </Provider>
    );

    const accountType = screen.getByLabelText("Account Type");
    expect(accountType).toBeInTheDocument();
    fireEvent.change(accountType, { target: { value: "account type" } });
    expect(accountType).toHaveValue("account type");

    const bankName = screen.getByLabelText("Bank Name");
    expect(bankName).toBeInTheDocument();
    fireEvent.change(bankName, { target: { value: "bank name" } });
    expect(bankName).toHaveValue("bank name");

    const accountNumber = screen.getByLabelText("Account Number");
    expect(accountNumber).toBeInTheDocument();
    fireEvent.change(accountNumber, { target: { value: "123" } });
    expect(accountNumber).toHaveValue("123");

    const accountLocation = screen.getByLabelText("Account Location");
    expect(accountLocation).toBeInTheDocument();
    fireEvent.change(accountLocation, {
      target: { value: "account location" },
    });
    expect(accountLocation).toHaveValue("account location");

    const swiftCode = screen.getByLabelText("SWIFT Code");
    expect(swiftCode).toBeInTheDocument();
    fireEvent.change(swiftCode, { target: { value: "swift code" } });
    expect(swiftCode).toHaveValue("swift code");

    const submitButton = screen.getByText("Save");
    expect(submitButton).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(submitButton);
    });

    //Expected form data
    const expectedFormData = {
      data: {
        bank: [
          {
            bankName: "bank name",
            accountLocation: "account location",
            accountNo: "123",
            accountType: "account type",
            swiftCode: "swift code",
          },
        ],
        CorporateCode: "0",
        BankId: undefined,
      },
    };

    await waitFor(() => {
      const state = store.getState();
      const corporateState = state.corporateTest;
      console.log("Corporate State After Submission:", corporateState);
      expect(corporateState).toMatchObject(expectedFormData);
    });
  }, 20000);
});

jest.mock(
  "@/pages/createJob/addedCorporateAccount/pages/uploadFiles/hook/useUploadFile"
);

describe("UploadFiles Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("handles file upload", () => {
    const handleUpload = jest.fn();
    const handleInputChange = jest.fn((event) => {
      handleUpload(event.target.files[0], "123");
    });

    // Mock the return value of useUploadFile
    (useUploadFileModule.useUploadFile as jest.Mock).mockReturnValue({
      file: new File(["file contents"], "test.doc", {
        type: "application/msword",
      }),
      documentType: { value: "Test Document" },
      handleDocumnetTypeChange: jest.fn(),
      handleInputChange,
      handleUpload,
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <UploadFiles />
        </MemoryRouter>
      </Provider>
    );

    const dropdown = screen.getByText("Select");
    expect(dropdown).toBeInTheDocument();
    fireEvent.click(dropdown);

    const id = screen.getByText("id");
    expect(id).toBeInTheDocument();
    fireEvent.click(id);

    const fileInput = screen.getByTestId("inputfile");
    const uploadButton = screen.getByText("Upload");

    console.log(screen.debug());
    console.log("File Input:", fileInput);
    console.log("Upload Button:", uploadButton);

    if (fileInput) {
      const testFile = new File(["file contents"], "test.doc", {
        type: "application/msword",
      });
      fireEvent.change(fileInput, { target: { files: [testFile] } });

      expect(handleInputChange).toHaveBeenCalledWith(expect.any(Object));

      fireEvent.click(uploadButton);

      expect(handleUpload).toHaveBeenCalledWith(testFile, "123");
      expect(handleUpload).toHaveBeenCalledTimes(2);
    } else {
      throw new Error("File input not found");
    }
  });
});

// describe("test create corporate form11 (suite test)", () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//     store.dispatch(setUser(mockUser));
//   });

//   test("test input data(multiple input type)", async () => {

//     const mockCorporatesInfo = undefined;
//     const mockCorporateCode = "0";

//     render(
//       <Provider store={store}>
//         <MemoryRouter>
//           <PageSuitTest
//             corporateCode={mockCorporateCode}
//             corporatesInfo={mockCorporatesInfo}
//           />
//         </MemoryRouter>
//       </Provider>
//     );

//     await waitFor(() => {
//       const questionOne = screen.getByText("1-5 years");
//       expect(questionOne).toBeInTheDocument();
//     })

//     const submitButton = screen.getByText("Submit")
//     expect(submitButton).toBeInTheDocument();

//     await act(async ()=>{
//       fireEvent.click(submitButton);
//     })

//     //Expected form data
//     // const expectedFormData = {
//     // };

//     await waitFor(() => {
//       const state = store.getState();
//       const corporateState = state.corporateTest;
//       console.log("Corporate State After Submission:", corporateState);
//       // expect(corporateState).toMatchObject(expectedFormData);
//     });

//   }, 20000);
// });
