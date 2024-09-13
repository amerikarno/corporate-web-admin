// import { fireEvent, render, screen } from "@testing-library/react";
// import "@testing-library/jest-dom";
// import { Provider } from "react-redux";
// import { setUser } from "@/features/user/userSlice";
// import CorporateAccountOpenning from "@/pages/createJob/addedCorporateAccount/CorporateAccountOpenning";
// import { store } from "@/app/store";
// import { MemoryRouter, Route, Routes } from "react-router-dom";

// const user = {
//   id: "9b84c76d-fe84-4113-ba30-17014a02b6b5",
//   email: "aa2c6966348647f38cbfb7f29ab459c17f740fb57ca2feb384047a503bb1e4f6",
//   groups: [
//     1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 2001, 2002,
//     2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014,
//     2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 3001, 3002, 3003, 3004,
//     3005, 3006, 3007, 3008, 3009, 3010, 3011, 3012, 3013, 3014, 4001, 4002,
//     4003, 4004, 4005, 4006,
//   ],
//   permissions: [101, 102, 103, 201, 202, 203],
//   roles: [11, 12, 13],
//   userId: "",
//   loginStatus: "",
//   expiresDate: "0001-01-01T00:00:00Z",
//   Error: null,
//   exp: 1725430626,
//   iat: 1725344226,
// };

// const BASE_URL = "http://cwa-alb-607898773.eu-north-1.elb.amazonaws.com";

// describe("addedCorporateAccount", () => {
//   test("should render correctly", async () => {

//     store.dispatch(setUser(user));

//     render(
//       <Provider store={store}>
//         <MemoryRouter>
//           <CorporateAccountOpenning />
//         </MemoryRouter>
//       </Provider>
//     );

//     const instructionText = screen.getByText(/instructions/i);
//     expect(instructionText).toBeTruthy();

//     const juristicInvestorName = screen.getByLabelText(
//       /juristic investor name/i
//     );
//     const comercialRegisterationNo = screen.getByLabelText(
//       /Commercial Registration No./i
//     );
//     const taxId = screen.getByLabelText(/tax id/i);
//     const dateOfIncorporation = screen.getByLabelText(/date of incorporation/i);

//     const registeredCountryThailand = screen.getByTestId(/registeredCountry-Thailand/i);
//     const registeredCountryOther = screen.getByTestId(/registeredCountry-Others Countries \(Please Specify\)/i);

//     const primaryCountryThailand = screen.getByTestId(/primaryCountry-Thailand/i);
//     const primaryCountryOther = screen.getByTestId(/primaryCountry-Others Countries \(Please Specify\)/i);

//     const registerAddressNumber = screen.getByTestId(/registeredBusiness-0/i);
//     const registerTambon = screen.getByTestId(/registeredBusiness-6/i);
//     const registerAmphoe = screen.getByTestId(/registeredBusiness-7/i);
//     const registerProvince = screen.getByTestId(/registeredBusiness-8/i);
//     const registerZipCode = screen.getByTestId(/registeredBusiness-9/i);
//     const registerCountry = screen.getByTestId(/registeredBusiness-10/i);
//     const registerEmail = screen.getByTestId(/registeredBusiness-emailAddress/i);
//     const registerTelephone = screen.getByTestId(/registeredBusiness-telephone/i);

//     const incorporatePlaceAddressNumber = screen.getByTestId(
//       /placeofIncorporation-0/i
//     );
//     const incorporatePlaceTambon = screen.getByTestId(
//       /placeofIncorporation-6/i
//     );
//     const incorporatePlaceAmphoe = screen.getByTestId(
//       /placeofIncorporation-7/i
//     );
//     const incorporatePlaceProvince = screen.getByTestId(
//       /placeofIncorporation-8/i
//     );
//     const incorporatePlaceZipCode = screen.getByTestId(
//       /placeofIncorporation-9/i
//     );
//     const incorporatePlaceCountry = screen.getByTestId(
//       /placeofIncorporation-10/i
//     );
//     const incorporatePlaceEmail = screen.getByTestId(/placeofIncorporation-emailAddress/i);
//     const incorporatePlaceTelephone = screen.getByTestId(/placeofIncorporation-telephone/i);

//     fireEvent.change(juristicInvestorName, { target: { value: "hello" } });
//     expect(juristicInvestorName).toHaveValue("hello");
//     fireEvent.change(comercialRegisterationNo, { target: { value: "1234" } });
//     expect(comercialRegisterationNo).toHaveValue("1234");
//     fireEvent.change(taxId, { target: { value: "123456789" } });
//     expect(taxId).toHaveValue("123456789");
//     fireEvent.change(dateOfIncorporation, { target: { value: "1988-11-12" } });
//     expect(dateOfIncorporation).toHaveValue("1988-11-12");

//     fireEvent.click(registeredCountryThailand);
//     expect(registeredCountryThailand).toBeChecked();
//     expect(registeredCountryOther).not.toBeChecked();
//     fireEvent.click(registeredCountryOther);
//     const registeredCountrySpecificInput = screen.getByTestId(/registeredCountry-otherInput/i);
//     expect(registeredCountryThailand).not.toBeChecked();
//     expect(registeredCountryOther).toBeChecked();
//     expect(registeredCountrySpecificInput).toBeInTheDocument();
//     fireEvent.change(registeredCountrySpecificInput, { target: { value: "registered country brazil" } });
//     expect(registeredCountrySpecificInput).toHaveValue( "registered country brazil");

//     fireEvent.click(primaryCountryThailand);
//     expect(primaryCountryThailand).toBeChecked();
//     expect(primaryCountryOther).not.toBeChecked();
//     fireEvent.click(primaryCountryOther);
//     const primaryCountrySpecificInput = screen.getByTestId(/primaryCountry-otherInput/i);
//     expect(primaryCountryOther).toBeChecked();
//     expect(primaryCountryThailand).not.toBeChecked();
//     expect(primaryCountrySpecificInput).toBeInTheDocument();
//     fireEvent.change(primaryCountrySpecificInput, { target: { value: "primary country brazil" } });
//     expect(primaryCountrySpecificInput).toHaveValue( "primary country brazil");

//     fireEvent.change(registerAddressNumber, { target: { value: "123" } });
//     expect(registerAddressNumber).toHaveValue("123");
//     fireEvent.change(registerTambon, { target: { value: "tambon" } });
//     expect(registerTambon).toHaveValue("tambon");
//     fireEvent.change(registerAmphoe, { target: { value: "amphoe" } });
//     expect(registerAmphoe).toHaveValue("amphoe");
//     fireEvent.change(registerProvince, { target: { value: "province" } });
//     expect(registerProvince).toHaveValue("province");
//     fireEvent.change(registerZipCode, { target: { value: 12345 } });
//     expect(registerZipCode).toHaveValue("12345");
//     fireEvent.change(registerCountry, { target: { value: "country" } });
//     expect(registerCountry).toHaveValue("country");
//     fireEvent.change(registerEmail,{ target: { value: "test@gmail.com"}});
//     expect(registerEmail).toHaveValue("test@gmail.com")
//     fireEvent.change(registerTelephone,{ target: { value: "0888888888"}});
//     expect(registerTelephone).toHaveValue("0888888888")

//     fireEvent.change(incorporatePlaceAddressNumber, {
//       target: { value: "777" },
//     });
//     expect(incorporatePlaceAddressNumber).toHaveValue("777");
//     fireEvent.change(incorporatePlaceTambon, { target: { value: "tambon" } });
//     expect(incorporatePlaceTambon).toHaveValue("tambon");
//     fireEvent.change(incorporatePlaceAmphoe, { target: { value: "amphoe" } });
//     expect(incorporatePlaceAmphoe).toHaveValue("amphoe");
//     fireEvent.change(incorporatePlaceProvince, {
//       target: { value: "province" },
//     });
//     expect(incorporatePlaceProvince).toHaveValue("province");
//     fireEvent.change(incorporatePlaceZipCode, { target: { value: 12345 } });
//     expect(incorporatePlaceZipCode).toHaveValue("12345");
//     fireEvent.change(incorporatePlaceCountry, { target: { value: "country" } });
//     expect(incorporatePlaceCountry).toHaveValue("country");
//     fireEvent.change(incorporatePlaceEmail,{ target: { value: "test@gmail.com"}});
//     expect(incorporatePlaceEmail).toHaveValue("test@gmail.com")
//     fireEvent.change(incorporatePlaceTelephone,{ target: { value: "0888888888"}});
//     expect(incorporatePlaceTelephone).toHaveValue("0888888888")

//     const financialRegisteredCapital = screen.getByLabelText(/Registered Capital/i);
//     const financialRevenuePerYear = screen.getByLabelText(/Revenue Per Year/i);
//     const financialNetProFitLoss = screen.getByLabelText(/Net Profit \(Loss\)/i);
//     const financialShareholderEquity = screen.getByLabelText(/Shareholder's equity/i);

//     fireEvent.change(financialRegisteredCapital, { target: { value: 123456 } });
//     expect(financialRegisteredCapital).toHaveValue("123,456")
//     fireEvent.change(financialRevenuePerYear, { target: { value: 123456 } });
//     expect(financialRevenuePerYear).toHaveValue("123,456")
//     fireEvent.change(financialNetProFitLoss, { target: { value: 123456 } });
//     expect(financialNetProFitLoss).toHaveValue("123,456")
//     fireEvent.change(financialShareholderEquity, { target: { value: 123456 } });
//     expect(financialShareholderEquity).toHaveValue("123,456")

//   });
// });

// describe("createcorporate form2", () => {
//   test("should render correctly", async () => {

//     store.dispatch(setUser(user));

//     render(
//       <Provider store={store}>
//         <MemoryRouter initialEntries={[BASE_URL]}>
//           <Routes>
//             <Route path="create-job/added-corporate-account/2" element={<CorporateAccountOpenning />} />
//           </Routes>
//       </MemoryRouter>
//       </Provider>
//     );

//     const location = screen.getByTestId("location-display");
//     expect(location).toHaveTextContent("/create-job/added-corporate-account/2");
//   });
// });
