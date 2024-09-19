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

describe("test create corporate", () => {
  const timoeout = 10000;

  beforeEach(() => {
    jest.clearAllMocks();
    store.dispatch(setUser(mockUser));
  });

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
    await act(async () => {
      fireEvent.click(checkboxRegisteredCountry);
    });
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
    await waitFor(
      async () => {
        expect(registeredCapital).toHaveValue("0.00");
      },
      { timeout: timoeout }
    );
    await act(async () => {
      fireEvent.change(registeredCapital, { target: { value: "12345.67" } });
    });
    await waitFor(
      async () => {
        expect(registeredCapital).toHaveValue("12,345.67");
      },
      { timeout: timoeout }
    );

    const revenuePerYear = screen.getByTestId("revenuePerYear");
    expect(revenuePerYear).toBeInTheDocument();

    await waitFor(
      async () => {
        expect(revenuePerYear).toHaveValue("0.00");
      },
      { timeout: timoeout }
    );
    await act(async () => {
      fireEvent.change(revenuePerYear, { target: { value: "12345.67" } });
    });
    await waitFor(
      async () => {
        expect(revenuePerYear).toHaveValue("12,345.67");
      },
      { timeout: timoeout }
    );

    const netProfit = screen.getByTestId("netProFitLoss");
    expect(netProfit).toBeInTheDocument();
    await waitFor(
      async () => {
        expect(netProfit).toHaveValue("0.00");
      },
      { timeout: timoeout }
    );
    await act(async () => {
      fireEvent.change(netProfit, { target: { value: "12345.67" } });
    });
    await waitFor(
      async () => {
        expect(netProfit).toHaveValue("12,345.67");
      },
      { timeout: timoeout }
    );

    const ShareholderEquity = screen.getByTestId("shareholderEquity");
    expect(ShareholderEquity).toBeInTheDocument();
    await waitFor(
      async () => {
        expect(ShareholderEquity).toHaveValue("0.00");
      },
      { timeout: timoeout }
    );
    await act(async () => {
      fireEvent.change(ShareholderEquity, { target: { value: "12345.67" } });
    });
    await waitFor(
      async () => {
        expect(ShareholderEquity).toHaveValue("12,345.67");
      },
      { timeout: timoeout }
    );

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
        registeredCapital: 1234567,
        revenuePerYear: 1234567,
        netProFitLoss: 1234567,
        shareholderEquity: 1234567,
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
    await waitFor(
      () => {
        const state = store.getState();
        const corporateState = state.corporateTest;
        expect(corporateState).toMatchObject(expectedFormData);
      },
      { timeout: timoeout }
    );
  }, 20000);
});
