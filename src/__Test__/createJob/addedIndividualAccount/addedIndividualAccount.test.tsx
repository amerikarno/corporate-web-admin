import { store } from "@/app/store";
import { setUser } from "@/features/user/userSlice";
import { mockUser } from "@/__Test__/utils";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import AddIndividualAccount from "@/pages/createJob/addIndividualAccount/addIndividualAccount";
import "@testing-library/jest-dom";

jest.mock("@/lib/utils", () => ({
    ...jest.requireActual("@/lib/utils"),
    isExpiredToken: jest.fn().mockReturnValue(false),
  }));

describe("test create individual form1 (preinfo)", () => {
    beforeEach(() => {
      jest.clearAllMocks();
      store.dispatch(setUser(mockUser));
    });
  
    test("test input data(multiple input type)", async () => {

      render(
        <Provider store={store}>
          <MemoryRouter>
            <AddIndividualAccount/>
          </MemoryRouter>
        </Provider>
      );
      
      const thTitleDropDown = screen.getByText("คำนำหน้าชื่อ (ภาษาไทย)");
      expect(thTitleDropDown).toBeInTheDocument();
      fireEvent.change(thTitleDropDown, { target: { value: "นาย" } });
      expect(thTitleDropDown).toHaveValue("นาย");

      const thFirstName = screen.getByLabelText("ชื่อ (ภาษาไทย)");
      expect(thFirstName).toBeInTheDocument();
      expect(thFirstName).toHaveValue("");
      fireEvent.change(thFirstName, { target: { value: "ชื่อจริง" } });
      expect(thFirstName).toHaveValue("ชื่อจริง");

      const thSurnameName = screen.getByLabelText("ชื่อสกุล (ภาษาไทย)");
      expect(thSurnameName).toBeInTheDocument();
      expect(thSurnameName).toHaveValue("");
      fireEvent.change(thSurnameName, { target: { value: "นามสกุล" } });
      expect(thSurnameName).toHaveValue("นามสกุล");

      const enTitleDropDown = screen.getByText("คำนำหน้าชื่อ (ภาษาอังกฤษ)");
      expect(enTitleDropDown).toBeInTheDocument();
      fireEvent.change(enTitleDropDown,{target:{value:"Mr."}})
      expect(enTitleDropDown).toHaveValue("Mr.");

      const enFirstName = screen.getByLabelText("ชื่อ (ภาษาอังกฤษ)");
      expect(enFirstName).toBeInTheDocument();
      expect(enFirstName).toHaveValue("");
      fireEvent.change(enFirstName, { target: { value: "FirstName" } });
      expect(enFirstName).toHaveValue("FirstName");

      const enSurname = screen.getByLabelText("ชื่อสกุล (ภาษาอังกฤษ)");
      expect(enSurname).toBeInTheDocument();
      expect(enSurname).toHaveValue("");
      fireEvent.change(enSurname, { target: { value: "Surname" } });
      expect(enSurname).toHaveValue("Surname");

      const email = screen.getByLabelText("อีเมลล์");
      expect(email).toBeInTheDocument();
      expect(email).toHaveValue("");
      fireEvent.change(email, { target: { value: "test@example.com" } });
      expect(email).toHaveValue("test@example.com");

      const telephone = screen.getByLabelText("หมายเลขโทรศัพท์มือถือ");
      expect(telephone).toBeInTheDocument();
      expect(telephone).toHaveValue("");
      fireEvent.change(telephone, { target: { value: "0123456789" } });
      expect(telephone).toHaveValue("0123456789");

      const birthDay = screen.getByTestId("birthDate")
      expect(birthDay).toBeInTheDocument();
      expect(birthDay).toHaveValue("");
      fireEvent.change(birthDay, { target: { value: "2022-01-01" } });
      expect(birthDay).toHaveValue("2022-01-01");

      const marriageStatusDropDown = screen.getByText("สถานะ")
      expect(marriageStatusDropDown).toBeInTheDocument();
      fireEvent.change(marriageStatusDropDown, { target: { value: "Single" } });
      expect(marriageStatusDropDown).toHaveValue("Single");

      const idCard = screen.getByLabelText("หมายเลขบัตรประชาชน")
      expect(idCard).toBeInTheDocument();
      expect(idCard).toHaveValue("");
      fireEvent.change(idCard, { target: { value: "1234567890123" } });
      expect(idCard).toHaveValue("1234567890123");

      const laserCode = screen.getByLabelText("เลขหลังบัตรประชาชน (Laser Code)");
      expect(laserCode).toBeInTheDocument();
      expect(laserCode).toHaveValue("");
      fireEvent.change(laserCode, { target: { value: "1234567890123" } });
      expect(laserCode).toHaveValue("1234567890123");

      const agreementBox = screen.getByTestId("agreement");
      expect(agreementBox).toBeInTheDocument();
      expect(agreementBox).not.toBeChecked();
      fireEvent.click(agreementBox);
      expect(agreementBox).toBeChecked();

      expect(screen.queryByText("title cannot be empty")).not.toBeInTheDocument();
      expect(screen.queryByText("lastname cannot be empty")).not.toBeInTheDocument();
      expect(screen.queryByText("firstname cannot be empty")).not.toBeInTheDocument();
      expect(screen.queryByText("mobile cannot be empty")).not.toBeInTheDocument();
      expect(screen.queryByText("email cannot be empty")).not.toBeInTheDocument();
      expect(screen.queryByText("marriageStatus cannot be empty")).not.toBeInTheDocument();
      expect(screen.queryByText("birthDate cannot be empty")).not.toBeInTheDocument();
      expect(screen.queryByText("laserCode cannot be empty")).not.toBeInTheDocument();
      expect(screen.queryByText("idCard cannot be empty")).not.toBeInTheDocument();

      console.log((thTitleDropDown as HTMLInputElement).value)
      console.log((thFirstName as HTMLInputElement).value)
      console.log((thSurnameName as HTMLInputElement).value)
      console.log((enTitleDropDown as HTMLInputElement).value)
      console.log((enFirstName as HTMLInputElement).value)
      console.log((enSurname as HTMLInputElement).value)
      console.log((email as HTMLInputElement).value)
      console.log((telephone as HTMLInputElement).value)
      console.log((birthDay as HTMLInputElement).value)
      console.log((marriageStatusDropDown as HTMLInputElement).value)
      console.log((idCard as HTMLInputElement).value)
      console.log((laserCode as HTMLInputElement).value)
      console.log((agreementBox as HTMLInputElement).value)

      const submitButton = screen.getByTestId("submitButton")
      expect(submitButton).toBeInTheDocument();
      
      await act(async ()=>{
        fireEvent.click(submitButton);
      })
      
      //Expected form data
    //   const expectedFormData = {
    //   };
  
      await waitFor(() => {
        const state = store.getState();
        const corporateState = state.corporateTest;
        console.log("Corporate State After Submission:", corporateState);
        // expect(corporateState).toMatchObject(expectedFormData);
      })
  
    }, 20000);
  });