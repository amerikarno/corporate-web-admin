// import { render } from "@testing-library/react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { setUser } from "@/features/user/userSlice";
import CorporateAccountOpenning from "@/pages/createJob/addedCorporateAccount/CorporateAccountOpenning";
import { store } from "@/app/store";
import { MemoryRouter } from "react-router-dom";

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

describe("addedCorporateAccount", () => {
  test("should render correctly", () => {
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
    const registerAddressNumber = screen.getByTestId(/registeredBusiness-0/i);
    const registerTambon = screen.getByTestId(/registeredBusiness-6/i);
    const registerAmphoe = screen.getByTestId(/registeredBusiness-7/i);
    const registerProvince = screen.getByTestId(/registeredBusiness-8/i);
    const registerZipCode = screen.getByTestId(/registeredBusiness-9/i);
    const registerCountry = screen.getByTestId(/registeredBusiness-10/i);
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

    fireEvent.change(juristicInvestorName, { target: { value: "hello" } });
    expect(juristicInvestorName).toHaveValue("hello");
    fireEvent.change(comercialRegisterationNo, { target: { value: "1234" } });
    expect(comercialRegisterationNo).toHaveValue("1234");
    fireEvent.change(taxId, { target: { value: "123456789" } });
    expect(taxId).toHaveValue("123456789");
    fireEvent.change(dateOfIncorporation, { target: { value: "1988-11-12" } });
    expect(dateOfIncorporation).toHaveValue("1988-11-12");
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

    // const nextBtn = screen.getByText(/next form/i);
    // fireEvent.click(nextBtn);
    // expect(instructionText).not.toBeTruthy();
  });
});
