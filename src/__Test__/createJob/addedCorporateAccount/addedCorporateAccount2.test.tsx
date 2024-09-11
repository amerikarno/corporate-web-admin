import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { setUser } from "@/features/user/userSlice";
import CorporateAccountOpenning from "@/pages/createJob/addedCorporateAccount/CorporateAccountOpenning";
import { store } from "@/app/store";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { createStore } from "redux";
import { setCorporateData } from "@/features/editCorporateData/editCorporateData";

const mockCorporateData = {
    CorporateCode: 80000003,
    Info: {
        id: "ac756294-21ab-4e3d-904f-8195a2406d0f",
        createBy: "9b84c76d-fe84-4113-ba30-17014a02b6b5",
        CreatedAt: "2024-08-13T04:11:12.578Z",
        DeletedAt: null,
        corporateCode: 80000003,
        name: "juristic 1",
        registrationNo: "555",
        taxId: "11111111111",
        dateOfIncorporation: "2011-01-11T00:00:00Z"
    },
    CorporateCountry: [
        {
            id: "2d4ca27a-b633-42ef-9827-8945e2c9b3f4",
            createBy: "12345",
            CreatedAt: "2024-08-02T15:18:22.075+07:00",
            DeletedAt: null,
            corporateCode: 80000000,
            isThailand: true,
            other: "12314556",
            types: 601
        },
        {
            id: "9beed968-0674-4e72-b11f-1a9870cd0761",
            createBy: "12345",
            CreatedAt: "2024-08-02T15:18:22.075+07:00",
            DeletedAt: null,
            corporateCode: 80000000,
            isThailand: true,
            other: "dfdasgdgh",
            types: 602
        }
    ],
    CorporateAddress: [
        {
            address: [
                {
                    id: "7f5b2e8e-bbfd-433e-9d1a-490074cef0f9",
                    createBy: "12345",
                    CreatedAt: "2024-08-02T15:18:22.098+07:00",
                    DeletedAt: null,
                    corporateCode: 80000000,
                    addressNo: "123",
                    mooNo: "456", 
                    building: "Building 1",
                    floor: "1st floor", 
                    soi: "Soi 1", 
                    road: "Road 1", 
                    tambon: "Tambon 1", 
                    amphoe: "Amphoe 1", 
                    province: "Province 1", 
                    postalCode: "10100",
                    country: "thailand",
                    types: 701
                }
            ],
            emailAddress: "aaaaaa@ooooo.com",
            telephone: "0912341511"
        }
    ],
    CorporateFinancials: {
        id: "0b88e26f-a00c-4cf9-9fde-338c1da26432",
        createBy: "12345",
        CreatedAt: "2024-08-02T15:18:22.088+07:00",
        DeletedAt: null,
        corporateCode: 80000000,
        registeredCapital: 12346,
        revenuePerYear: 123456,
        netProfitLoss: 123456,
        shareholderEquity: 123456
    },
    CorporateTypes: 
        {
          id: "ac756294-21ab-4e3d-904f-8195a2406d0f",
          createBy: "9b84c76d-fe84-4113-ba30-17014a02b6b5",
          CreatedAt: "2024-08-13T05:14:19.329Z",
          DeletedAt: null,
          corporateCode: 80000003,
          isJuristicThailand: true,
          isTaxExempt: false,
          isNonTaxExempt: false,
          isJuristicForeign: false,
          isOperatingInThailand: false,
          isNonOperatingInThailand: false,
          isOther: false,
          isPartnership: false,
          isGovernmentStateEnterprise: false,
          isCoOperative: false,
          isTaxExemptCompany: false,
        },
      
    BusinessTypes: {
        id: 'some-id', 
    corporateCode: 80000003,
    isAntiqueTrading: false,
    isHotelRestaurant: false
        CreatedAt: "0001-01-01T00:00:00Z",
        DeletedAt: null
    },
    SourceOfIncomes: {
        CreatedAt: "0001-01-01T00:00:00Z",
        DeletedAt: null
    },
    CountrySourceIncomes: null,
    Contact: null,
    Directors: null,
    AuthorizedPersons: null,
    IndividualShareholders: null,
    Juristics: [
        {
            id: "1e5cf1fd-d3d1-4544-baac-ab14361516da",
            createBy: "moss@123.com",
            CreatedAt: "2024-08-01T13:46:46.792+07:00",
            DeletedAt: null,
            corporateCode: 80000000,
            juristicName: "Real Corporation",
            registrationNo: "REG123456",
            registeredCountry: "Thailand",
            sharePercentage: 75
        },
        {
            id: "ac756294-21ab-4e3d-904f-8195a2406d0f",
            createBy: "9b84c76d-fe84-4113-ba30-17014a02b6b5",
            CreatedAt: "2024-08-13T05:14:19.329Z",
            DeletedAt: null,
            corporateCode: 80000003,
            juristicName: "jsn2",
            registrationNo: "2222",
            registeredCountry: "jsrc2",
            sharePercentage: 20
        },
        {
            id: "fbf34bed-f778-4d7f-bfe2-476630df1fd0",
            createBy: "9b84c76d-fe84-4113-ba30-17014a02b6b5",
            CreatedAt: "2024-08-13T05:13:59.7Z",
            DeletedAt: null,
            corporateCode: 80000003,
            juristicName: "jsn1",
            registrationNo: "11111",
            registeredCountry: "jsrc1",
            sharePercentage: 10
        }
    ],
    Banks: [
        {
            id: "4fd837fe-a209-4fb9-93f4-fecb0dcab567",
            createBy: "9b84c76d-fe84-4113-ba30-17014a02b6b5",
            CreatedAt: "2024-08-13T05:15:59.97Z",
            DeletedAt: null,
            corporateCode: 80000003,
            accountType: "bankt1",
            bankName: "bankn1",
            accountNo: "11111",
            accountLocation: "bankl1",
            swiftCode: "123123"
        }
    ],
    Documents: [],
    SuitTestResult: null
};

const renderWithProviders = (ui: React.ReactElement, { route = "/" } = {}) => {
    store.dispatch(setCorporateData(mockCorporateData));
    return {
      ...render(
        <Provider store={store}>
          <MemoryRouter initialEntries={[route]}>
            <Routes>
              <Route path="create-job/added-corporate-account/:page?" element={ui} />
            </Routes>
          </MemoryRouter>
        </Provider>
      ),
      store
    };
  };
  
const user = {
  id: "9b84c76d-fe84-4113-ba30-17014a02b6b5",
  email: "aa2c6966348647f38cbfb7f29ab459c17f740fb57ca2feb384047a503bb1e4f6",
  groups: [
    1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 2001, 2002,
    2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014,
    2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 3001, 3002, 3003, 3004,
    3005, 3006, 3007, 3008, 3009, 3010, 3011, 3012, 3013, 3014, 4001, 4002,
    4003, 4004, 4005, 4006,
  ],
  permissions: [101, 102, 103, 201, 202, 203],
  roles: [11, 12, 13],
  userId: "",
  loginStatus: "",
  expiresDate: "0001-01-01T00:00:00Z",
  Error: null,
  exp: 1725430626,
  iat: 1725344226,
};

const BASE_URL = "http://cwa-alb-607898773.eu-north-1.elb.amazonaws.com";

describe("addedCorporateAccount", () => {
  test("should render correctly", async () => {
   
    store.dispatch(setUser(user));

    render(
      <Provider store={store}>
        <MemoryRouter>
          <CorporateAccountOpenning />
        </MemoryRouter>
      </Provider>
    );

    const instructionText = screen.getByText(/instructions/i);
    expect(instructionText).toBeTruthy();

    const juristicInvestorName = screen.getByLabelText(
      /juristic investor name/i
    );
    const comercialRegisterationNo = screen.getByLabelText(
      /Commercial Registration No./i
    );
    const taxId = screen.getByLabelText(/tax id/i);
    const dateOfIncorporation = screen.getByLabelText(/date of incorporation/i);

    const registeredCountryThailand = screen.getByTestId(/registeredCountry-Thailand/i);
    const registeredCountryOther = screen.getByTestId(/registeredCountry-Others Countries \(Please Specify\)/i);
  
    const primaryCountryThailand = screen.getByTestId(/primaryCountry-Thailand/i);
    const primaryCountryOther = screen.getByTestId(/primaryCountry-Others Countries \(Please Specify\)/i);

    const registerAddressNumber = screen.getByTestId(/registeredBusiness-0/i);
    const registerTambon = screen.getByTestId(/registeredBusiness-6/i);
    const registerAmphoe = screen.getByTestId(/registeredBusiness-7/i);
    const registerProvince = screen.getByTestId(/registeredBusiness-8/i);
    const registerZipCode = screen.getByTestId(/registeredBusiness-9/i);
    const registerCountry = screen.getByTestId(/registeredBusiness-10/i);
    const registerEmail = screen.getByTestId(/registeredBusiness-emailAddress/i);
    const registerTelephone = screen.getByTestId(/registeredBusiness-telephone/i);

    const incorporatePlaceAddressNumber = screen.getByTestId(
      /placeofIncorporation-0/i
    );
    const incorporatePlaceTambon = screen.getByTestId(
      /placeofIncorporation-6/i
    );
    const incorporatePlaceAmphoe = screen.getByTestId(
      /placeofIncorporation-7/i
    );
    const incorporatePlaceProvince = screen.getByTestId(
      /placeofIncorporation-8/i
    );
    const incorporatePlaceZipCode = screen.getByTestId(
      /placeofIncorporation-9/i
    );
    const incorporatePlaceCountry = screen.getByTestId(
      /placeofIncorporation-10/i
    );
    const incorporatePlaceEmail = screen.getByTestId(/placeofIncorporation-emailAddress/i);
    const incorporatePlaceTelephone = screen.getByTestId(/placeofIncorporation-telephone/i);

    fireEvent.change(juristicInvestorName, { target: { value: "hello" } });
    expect(juristicInvestorName).toHaveValue("hello");
    fireEvent.change(comercialRegisterationNo, { target: { value: "1234" } });
    expect(comercialRegisterationNo).toHaveValue("1234");
    fireEvent.change(taxId, { target: { value: "123456789" } });
    expect(taxId).toHaveValue("123456789");
    fireEvent.change(dateOfIncorporation, { target: { value: "1988-11-12" } });
    expect(dateOfIncorporation).toHaveValue("1988-11-12");

    fireEvent.click(registeredCountryThailand);
    expect(registeredCountryThailand).toBeChecked();
    expect(registeredCountryOther).not.toBeChecked();
    fireEvent.click(registeredCountryOther);
    const registeredCountrySpecificInput = screen.getByTestId(/registeredCountry-otherInput/i);
    expect(registeredCountryThailand).not.toBeChecked();
    expect(registeredCountryOther).toBeChecked();
    expect(registeredCountrySpecificInput).toBeInTheDocument();
    fireEvent.change(registeredCountrySpecificInput, { target: { value: "registered country brazil" } });
    expect(registeredCountrySpecificInput).toHaveValue( "registered country brazil");

    fireEvent.click(primaryCountryThailand);
    expect(primaryCountryThailand).toBeChecked();
    expect(primaryCountryOther).not.toBeChecked();
    fireEvent.click(primaryCountryOther);
    const primaryCountrySpecificInput = screen.getByTestId(/primaryCountry-otherInput/i);
    expect(primaryCountryOther).toBeChecked();
    expect(primaryCountryThailand).not.toBeChecked();
    expect(primaryCountrySpecificInput).toBeInTheDocument();
    fireEvent.change(primaryCountrySpecificInput, { target: { value: "primary country brazil" } });
    expect(primaryCountrySpecificInput).toHaveValue( "primary country brazil");
    
    fireEvent.change(registerAddressNumber, { target: { value: "123" } });
    expect(registerAddressNumber).toHaveValue("123");
    fireEvent.change(registerTambon, { target: { value: "tambon" } });
    expect(registerTambon).toHaveValue("tambon");
    fireEvent.change(registerAmphoe, { target: { value: "amphoe" } });
    expect(registerAmphoe).toHaveValue("amphoe");
    fireEvent.change(registerProvince, { target: { value: "province" } });
    expect(registerProvince).toHaveValue("province");
    fireEvent.change(registerZipCode, { target: { value: 12345 } });
    expect(registerZipCode).toHaveValue("12345");
    fireEvent.change(registerCountry, { target: { value: "country" } });
    expect(registerCountry).toHaveValue("country");
    fireEvent.change(registerEmail,{ target: { value: "test@gmail.com"}});
    expect(registerEmail).toHaveValue("test@gmail.com")
    fireEvent.change(registerTelephone,{ target: { value: "0888888888"}});
    expect(registerTelephone).toHaveValue("0888888888")


    fireEvent.change(incorporatePlaceAddressNumber, {
      target: { value: "777" },
    });
    expect(incorporatePlaceAddressNumber).toHaveValue("777");
    fireEvent.change(incorporatePlaceTambon, { target: { value: "tambon" } });
    expect(incorporatePlaceTambon).toHaveValue("tambon");
    fireEvent.change(incorporatePlaceAmphoe, { target: { value: "amphoe" } });
    expect(incorporatePlaceAmphoe).toHaveValue("amphoe");
    fireEvent.change(incorporatePlaceProvince, {
      target: { value: "province" },
    });
    expect(incorporatePlaceProvince).toHaveValue("province");
    fireEvent.change(incorporatePlaceZipCode, { target: { value: 12345 } });
    expect(incorporatePlaceZipCode).toHaveValue("12345");
    fireEvent.change(incorporatePlaceCountry, { target: { value: "country" } });
    expect(incorporatePlaceCountry).toHaveValue("country");
    fireEvent.change(incorporatePlaceEmail,{ target: { value: "test@gmail.com"}});
    expect(incorporatePlaceEmail).toHaveValue("test@gmail.com")
    fireEvent.change(incorporatePlaceTelephone,{ target: { value: "0888888888"}});
    expect(incorporatePlaceTelephone).toHaveValue("0888888888")

    const financialRegisteredCapital = screen.getByLabelText(/Registered Capital/i);
    const financialRevenuePerYear = screen.getByLabelText(/Revenue Per Year/i);
    const financialNetProFitLoss = screen.getByLabelText(/Net Profit \(Loss\)/i);
    const financialShareholderEquity = screen.getByLabelText(/Shareholder's equity/i);
    
    fireEvent.change(financialRegisteredCapital, { target: { value: 123456 } });
    expect(financialRegisteredCapital).toHaveValue("123,456")
    fireEvent.change(financialRevenuePerYear, { target: { value: 123456 } });
    expect(financialRevenuePerYear).toHaveValue("123,456")
    fireEvent.change(financialNetProFitLoss, { target: { value: 123456 } });
    expect(financialNetProFitLoss).toHaveValue("123,456")
    fireEvent.change(financialShareholderEquity, { target: { value: 123456 } });
    expect(financialShareholderEquity).toHaveValue("123,456")
    
  });
});


describe("createcorporate form2", () => {
  test("renders PageJuristicType directly", () => {
  renderWithProviders(<CorporateAccountOpenning />, {
    route: "/create-job/added-corporate-account/2"
  });

  // assertions to verify the component renders correctly
  expect(screen.getByText(/Some text from PageJuristicType/)).toBeInTheDocument();
});
});
