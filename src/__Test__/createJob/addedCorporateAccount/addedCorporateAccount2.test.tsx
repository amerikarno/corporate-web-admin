import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { setUser } from "@/features/user/userSlice";
import CorporateAccountOpenning from "@/pages/createJob/addedCorporateAccount/CorporateAccountOpenning";
import { store } from "@/app/store";
import { MemoryRouter, Route, Routes } from "react-router-dom";
// import { createStore } from "redux";
import { setCorporateData } from "@/features/editCorporateData/editCorporateData";

const mockCorporateData = {
    CorporateCode: 80000091,
    Info: {
        id: "65932599-23f3-4686-8067-e40e2f930a58",
        createBy: "9b84c76d-fe84-4113-ba30-17014a02b6b5",
        CreatedAt: "2024-09-11T05:23:10.874Z",
        DeletedAt: null,
        corporateCode: 80000091,
        name: "test",
        registrationNo: "getter",
        taxId: "123",
        dateOfIncorporation: "2024-09-20T00:00:00Z"
    },
    CorporateCountry: [
        {
            id: "192a97af-5030-441e-8921-25a54720dde3",
            createBy: "9b84c76d-fe84-4113-ba30-17014a02b6b5",
            CreatedAt: "2024-09-11T05:23:10.877Z",
            DeletedAt: null,
            corporateCode: 80000091,
            isThailand: true,
            other: "",
            types: 601
        },
        {
            id: "9980aab7-98ba-413c-8ce3-a57118469baa",
            createBy: "9b84c76d-fe84-4113-ba30-17014a02b6b5",
            CreatedAt: "2024-09-11T05:23:28.304Z",
            DeletedAt: null,
            corporateCode: 80000091,
            isThailand: true,
            other: "",
            types: 603
        },
        {
            id: "e9593861-3b81-4bfb-96d8-cf38551c745d",
            createBy: "9b84c76d-fe84-4113-ba30-17014a02b6b5",
            CreatedAt: "2024-09-11T05:23:10.877Z",
            DeletedAt: null,
            corporateCode: 80000091,
            isThailand: true,
            other: "",
            types: 602
        }
    ],
    CorporateAddress: [
        {
            corporateCode: "",
            address: [
                {
                    id: "a0edcf67-7d68-4679-8ded-62644f6b1bf8",
                    createBy: "9b84c76d-fe84-4113-ba30-17014a02b6b5",
                    CreatedAt: "2024-09-11T05:23:10.882Z",
                    DeletedAt: null,
                    corporateCode: 80000091,
                    addressNo: "70/178 ramintra65 yak 2-4",
                    mooNo: "Google",
                    tambon: "Google",
                    amphoe: "Google",
                    building:"g", floor:"g", soi:"g", road:"g",
                    province: "Bangkok",
                    postalCode: "10220",
                    country: "Thailand",
                    types: 701
                }
            ],
            emailAddress: "teste@exemplo.us",
            telephone: "0884744411"
        },
        {
            corporateCode: "",
            address: [
                {
                    id: "e165d151-75cd-48e4-95b7-b1aeed3f32be",
                    createBy: "9b84c76d-fe84-4113-ba30-17014a02b6b5",
                    CreatedAt: "2024-09-11T05:23:10.884Z",
                    DeletedAt: null,
                    corporateCode: 80000091,
                    addressNo: "70/178 ramintra65 yak 2-4",
                    mooNo: "Google",
                    tambon: "Google",
                    amphoe: "Google",
                    province: "Bangkok",
                    building:"g", floor:"g", soi:"g", road:"g",
                    postalCode: "10220",
                    country: "Thailand",
                    types: 702
                }
            ],
            emailAddress: "teste@exemplo.us",
            telephone: "0884744411"
        }
    ],
    CorporateFinancials: {
        id: "84132fda-fa95-406e-bd1a-87bd59b73ea1",
        createBy: "9b84c76d-fe84-4113-ba30-17014a02b6b5",
        CreatedAt: "2024-09-11T05:23:10.88Z",
        DeletedAt: null,
        corporateCode: 80000091,
        registeredCapital: 100,
        revenuePerYear: 100,
        netProfitLoss: 100,
        shareholderEquity: 100
    },
    CorporateTypes: {
        id: "f2656a96-c76b-4f1e-bfa1-1ef3b5ed74e9",
        createBy: "9b84c76d-fe84-4113-ba30-17014a02b6b5",
        CreatedAt: "2024-09-11T05:23:28.292Z",
        DeletedAt: null,
        corporateCode: 80000091,
        isJuristicThailand: true,
        isTaxExempt: false,
        isNonTaxExempt: true,
        isJuristicForeign: false,
        isOperatingInThailand: false,
        isNonOperatingInThailand: false,
        isOther: false,
        isPartnership: false,
        isGovernmentStateEnterprise: false,
        isCoOperative: false,
        isTaxExemptCompany: false
    },
    BusinessTypes: {
        id: "d570a3d6-30de-4aea-a557-ff814fe5ab1a",
        createBy: "9b84c76d-fe84-4113-ba30-17014a02b6b5",
        CreatedAt: "2024-09-11T05:23:28.296Z",
        DeletedAt: null,
        corporateCode: 80000091,
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
        otherBusinessType: ""
    },
    Banks:[{
        BankId: "e0d209a6-8f3b-4be3-a6f1-2dee6fc07bcb",
        id: "e0d209a6-8f3b-4be3-a6f1-2dee6fc07bcb",
        createBy: "9b84c76d-fe84-4113-ba30-17014a02b6b5",
        CreatedAt: "2024-09-11T05:45:00.998Z",
        DeletedAt: null,
        corporateCode: 80000091,
        accountType: "nowtoto",
        bankName: "1",
        accountNo: "123",
        accountLocation: "test1",
        swiftCode: "test1"
    }],
    SourceOfIncomes: {
        id: "6150d4ac-6d0c-4ea1-897e-e1a488c19e22",
        createBy: "9b84c76d-fe84-4113-ba30-17014a02b6b5",
        CreatedAt: "2024-09-11T05:23:28.299Z",
        DeletedAt: null,
        corporateCode: 80000091,
        isRevenue: true,
        isStock: false,
        isDonation: true,
        isLoan: false,
        isRevenueSelling: false,
        isOtherIncome: false,
        otherIncome: ""
    },
    CountrySourceIncomes: [
        {
            CreatedAt: "0001-01-01T00:00:00Z",
            DeletedAt: null,
            corporateCode: 0,
            corporateCountry: {
                id: "9980aab7-98ba-413c-8ce3-a57118469baa",
                createBy: "9b84c76d-fe84-4113-ba30-17014a02b6b5",
                CreatedAt: "2024-09-11T05:23:28.304Z",
                DeletedAt: null,
                corporateCode: 80000091,
                isThailand: true,
                other: "",
                types: 603
            },
            otherCountry: "",
            investmentObject: "",
            isLiquidation: true,
            isInvestment: true,
            isCashManagement: false,
            isliquidation:false,
            isOtherInvestment: false,
            otherInvestment: ""
        }
    ],
    Contact: [
        {
            id: "436e68b7-d10c-4b2d-9bf0-79c19e35542e",
            createBy: "9b84c76d-fe84-4113-ba30-17014a02b6b5",
            CreatedAt: "2024-09-11T05:23:42.225Z",
            DeletedAt: null,
            corporateCode: 80000091,
            personalId: "dac0f95f-4a87-4174-ab4e-d4003795a511",
            fullNames: [
                {
                    id: "6fab3f74-f047-451a-979e-e7553cfc3e7b",
                    createBy: "9b84c76d-fe84-4113-ba30-17014a02b6b5",
                    CreatedAt: "2024-09-11T05:23:42.228Z",
                    DeletedAt: null,
                    contactID: "dac0f95f-4a87-4174-ab4e-d4003795a511",
                    title: "123123",
                    firstName: "123123",
                    lastName: "1",
                    types: 401
                }
            ],
            personalID: "dac0f95f-4a87-4174-ab4e-d4003795a511",
            position: "q",
            division: "2",
            telephone: "0884744411",
            email: "user1@gmail.com",
            types: 401
        }
    ],
    Directors: [
        {
            id: "59b542f0-32a5-4058-8436-5a8804c5a433",
            createBy: "9b84c76d-fe84-4113-ba30-17014a02b6b5",
            CreatedAt: "2024-09-11T05:24:05.818Z",
            DeletedAt: null,
            personalId: "9d4bd5f7-ba8a-4e1c-ad1c-ea9f4857ff03",
            citizenId: "123123",
            corporateCode: 80000091,
            fullNames: [
                {
                    id: "8e5e8b59-66dc-4c91-9d05-793acb5494d2",
                    createBy: "9b84c76d-fe84-4113-ba30-17014a02b6b5",
                    CreatedAt: "2024-09-11T05:24:05.824Z",
                    DeletedAt: null,
                    ReferenceID: "9d4bd5f7-ba8a-4e1c-ad1c-ea9f4857ff03",
                    title: "1",
                    firstName: "123123",
                    lastName: "2",
                    types: 101
                }
            ],
            addresses: [
                {
                    id: "94618773-edca-43a9-8566-a7c286596ba3",
                    createBy: "9b84c76d-fe84-4113-ba30-17014a02b6b5",
                    CreatedAt: "2024-09-11T05:24:05.822Z",
                    DeletedAt: null,
                    ReferenceID: "9d4bd5f7-ba8a-4e1c-ad1c-ea9f4857ff03",
                    addressNo: "70/178 ramintra65 yak 2-4",
                    tambon: "1",
                    amphoe: "1",
                    province: "Bangkok",
                    postalCode: "10220",
                    building:"g", floor:"g", soi:"g", road:"g",
                    country: "Thailand",
                    types: 101
                }
            ],
            passportId: "12345",
            expiryDate: "2024-10-03T00:00:00Z",
            nationality: "1",
            types: 101
        }
    ],
    AuthorizedPersons: [
        {
            id: "b204dec1-911d-4d6d-9309-954c76ebf523",
            createBy: "9b84c76d-fe84-4113-ba30-17014a02b6b5",
            CreatedAt: "2024-09-11T05:25:01.999Z",
            DeletedAt: null,
            personalId: "85a72d2d-9429-4009-80e0-660473cfbfa2",
            corporateCode: 80000091,
            fullNames: [
                {
                    id: "c10c955d-8a10-41ec-a91c-2f6ce6c0fc12",
                    createBy: "9b84c76d-fe84-4113-ba30-17014a02b6b5",
                    CreatedAt: "2024-09-11T05:25:02.006Z",
                    DeletedAt: null,
                    ReferenceID: "85a72d2d-9429-4009-80e0-660473cfbfa2",
                    title: "123123",
                    firstName: "123123",
                    lastName: "Doe",
                    types: 201
                }
            ],
            addresses: [
                {
                    id: "c51aafad-ed13-4539-929c-35f6bb474f37",
                    createBy: "9b84c76d-fe84-4113-ba30-17014a02b6b5",
                    CreatedAt: "2024-09-11T05:25:02.003Z",
                    DeletedAt: null,
                    ReferenceID: "85a72d2d-9429-4009-80e0-660473cfbfa2",
                    addressNo: "70/178 ramintra65 yak 2-4",
                    tambon: "q",
                    amphoe: "4",
                    province: "Bangkok",
                    postalCode: "10220",
                    building:"g", floor:"g", soi:"g", road:"g",
                    country: "Thailand",
                    types: 201
                }
            ],
            passportId: "1234",
            expiryDate: "2024-10-03T00:00:00Z",
            nationality: "3",
            types: 201
        }
    ],
    IndividualShareholders: [
        {
            id: "bccddf26-845c-467f-9252-15b94ef91fdd",
            createBy: "9b84c76d-fe84-4113-ba30-17014a02b6b5",
            CreatedAt: "2024-09-11T05:24:29.667Z",
            DeletedAt: null,
            personalId: "49167d7a-5405-4df2-9802-87c6e05ff458",
            corporateCode: 80000091,
            fullNames: [
                {
                    id: "e51f0154-e27f-4f39-b2d9-d799a222786c",
                    createBy: "9b84c76d-fe84-4113-ba30-17014a02b6b5",
                    CreatedAt: "2024-09-11T05:24:29.671Z",
                    DeletedAt: null,
                    ReferenceID: "49167d7a-5405-4df2-9802-87c6e05ff458",
                    title: "123123",
                    firstName: "q",
                    lastName: "q",
                    types: 301
                }
            ],
            passportId: "12123123",
            expiryDate: "2024-09-23T00:00:00Z",
            nationality: "3",
            types: 301,
            sharePercentage: 1
        }
    ],
    Attorneys: [
        {
            id: "0ce17efe-2b22-4e16-8f7e-620ff7419ac8",
            createBy: "9b84c76d-fe84-4113-ba30-17014a02b6b5",
            CreatedAt: "2024-09-11T05:44:23.43Z",
            DeletedAt: null,
            personalId: "5ebb72cb-7a54-4a16-8a69-a3371c485bae",
            corporateCode: 80000091,
            fullNames: [
                {
                    id: "ffb3367c-9630-426d-acf5-0d74e488e228",
                    createBy: "9b84c76d-fe84-4113-ba30-17014a02b6b5",
                    CreatedAt: "2024-09-11T05:44:23.435Z",
                    DeletedAt: null,
                    ReferenceID: "5ebb72cb-7a54-4a16-8a69-a3371c485bae",
                    title: "q",
                    firstName: "q",
                    lastName: "q",
                    types: 302
                }
            ],
            addresses: [
                {
                    id: "cb9df21e-2812-4c16-84e0-789a2033fec7",
                    createBy: "9b84c76d-fe84-4113-ba30-17014a02b6b5",
                    CreatedAt: "2024-09-11T05:44:23.432Z",
                    DeletedAt: null,
                    ReferenceID: "5ebb72cb-7a54-4a16-8a69-a3371c485bae",
                    addressNo: "70/178 ramintra65 yak 2-4",
                    tambon: "4",
                    amphoe: "3",
                    province: "Bangkok",
                    postalCode: "10220",
                    country: "Thailand",
                    building:"g", floor:"g", soi:"g", road:"g",
                    types: 302
                }
            ],
            passportId: "12123123",
            expiryDate: "2024-09-27T00:00:00Z",
            nationality: "d",
            telephone: "0884744411",
            email: "user1@gmail.com",
            types: 302
        }
    ],
    Juristics: [
        {
            id: "df054d21-c7cf-45fa-a3b6-ed42131ef719",
            createBy: "9b84c76d-fe84-4113-ba30-17014a02b6b5",
            CreatedAt: "2024-09-11T05:24:41.226Z",
            DeletedAt: null,
            corporateCode: 80000091,
            juristicName: "getter",
            registrationNo: "getter",
            sharePercentage: 1,
            registeredCountry: "Thailand",
            addresses: [
                {
                    id: "7e1b2e3a-9d08-4a3f-9e3a-6aebe5b8f0a6",
                    createBy: "9b84c76d-fe84-4113-ba30-17014a02b6b5",
                    CreatedAt: "2024-09-11T05:24:41.229Z",
                    DeletedAt: null,
                    ReferenceID: "df054d21-c7cf-45fa-a3b6-ed42131ef719",
                    addressNo: "70/178 ramintra65 yak 2-4",
                    tambon: "1",
                    amphoe: "1",
                    building:"g", floor:"g", soi:"g", road:"g",
                    province: "Bangkok",
                    postalCode: "10220",
                    country: "Thailand",
                    types: 101
                }
            ],
            telephone: "0884744411",
            email: "user1@gmail.com",
            types: 101
        }
    ]
}

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

// const BASE_URL = "http://cwa-alb-607898773.eu-north-1.elb.amazonaws.com";

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
  expect(screen.getByText(/Juristic Infomations/i)).toBeInTheDocument();
});
});
