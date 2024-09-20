import { store } from "@/app/store";
import { setUser } from "@/features/user/userSlice";
import { mockUser } from "@/__Test__/utils";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import AddIndividualAccount from "@/pages/createJob/addIndividualAccount/addIndividualAccount";
import "@testing-library/jest-dom";
import BasicInfo from "@/pages/createJob/addIndividualAccount/basicInfo/basicInfo";
import SuitTestFatca from "@/pages/createJob/addIndividualAccount/suitTestFatca/suitTestFatca";
import IdentityVerification from "@/pages/createJob/addIndividualAccount/identityVerification/identityVerification";

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
        fireEvent.submit(submitButton);
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

  describe("test create individual form2 (basicinfo)", () => {
    beforeEach(() => {
      jest.clearAllMocks();
      store.dispatch(setUser(mockUser));
    });
  
    test("test input data(multiple input type)", async () => {

      render(
        <Provider store={store}>
          <MemoryRouter>
            <BasicInfo/>
          </MemoryRouter>
        </Provider>
      );

      //id card address
      const addressNoIDCard = screen.getByTestId("addressNoIDCard");
      expect(addressNoIDCard).toBeInTheDocument();
      expect(addressNoIDCard).toHaveValue("");
      fireEvent.change(addressNoIDCard, { target: { value: "address number" } });
      expect(addressNoIDCard).toHaveValue("address number");

      const floorIDCard = screen.getByTestId("floorIDCard");
      expect(floorIDCard).toBeInTheDocument();
      expect(floorIDCard).toHaveValue("");
      fireEvent.change(floorIDCard, { target: { value: "floor" } });
      expect(floorIDCard).toHaveValue("floor");

      const mooIDCard = screen.getByTestId("mooIDCard");
      expect(mooIDCard).toBeInTheDocument();
      expect(mooIDCard).toHaveValue("");
      fireEvent.change(mooIDCard, { target: { value: "moo" } });
      expect(mooIDCard).toHaveValue("moo");

      const soiIDCard = screen.getByTestId("soiIDCard");
      expect(soiIDCard).toBeInTheDocument();
      expect(soiIDCard).toHaveValue("");
      fireEvent.change(soiIDCard, { target: { value: "soi" } });
      expect(soiIDCard).toHaveValue("soi");

      const roadIDCard = screen.getByTestId("roadIDCard");
      expect(roadIDCard).toBeInTheDocument();
      expect(roadIDCard).toHaveValue("");
      fireEvent.change(roadIDCard, { target: { value: "road" } });
      expect(roadIDCard).toHaveValue("road");

      const tambonIDCard = screen.getByTestId("tambonIDCard");
      expect(tambonIDCard).toBeInTheDocument();
      expect(tambonIDCard).toHaveValue("");
      fireEvent.change(tambonIDCard, { target: { value: "tambon" } });
      expect(tambonIDCard).toHaveValue("tambon");

      const amphoeIDCard = screen.getByTestId("amphoeIDCard");
      expect(amphoeIDCard).toBeInTheDocument();
      expect(amphoeIDCard).toHaveValue("");
      fireEvent.change(amphoeIDCard, { target: { value: "amphoe" } });
      expect(amphoeIDCard).toHaveValue("amphoe");

      const provinceIDCard = screen.getByTestId("provinceIDCard");
      expect(provinceIDCard).toBeInTheDocument();
      expect(provinceIDCard).toHaveValue("");
      fireEvent.change(provinceIDCard, { target: { value: "province" } });
      expect(provinceIDCard).toHaveValue("province");

      const postalCodeIDCard = screen.getByTestId("postalCodeIDCard");
      expect(postalCodeIDCard).toBeInTheDocument();
      expect(postalCodeIDCard).toHaveValue("");
      fireEvent.change(postalCodeIDCard, { target: { value: "postalCode" } });
      expect(postalCodeIDCard).toHaveValue("postalCode");

      const countryIDCard = screen.getByTestId("countryIDCard");
      expect(countryIDCard).toBeInTheDocument();
      expect(countryIDCard).toHaveValue("");
      fireEvent.change(countryIDCard, { target: { value: "country" } });
      expect(countryIDCard).toHaveValue("country");

      //current address
      const addressNoHome = screen.getByTestId("addressNoHome");
      expect(addressNoHome).toBeInTheDocument();
      expect(addressNoHome).toHaveValue("");
      fireEvent.change(addressNoHome, { target: { value: "address home" } });
      expect(addressNoHome).toHaveValue("address home");

      const floorHome = screen.getByTestId("floorHome");
      expect(floorHome).toBeInTheDocument();
      expect(floorHome).toHaveValue("");
      fireEvent.change(floorHome, { target: { value: "floor home" } });
      expect(floorHome).toHaveValue("floor home");

      const mooHome = screen.getByTestId("mooHome");
      expect(mooHome).toBeInTheDocument();
      expect(mooHome).toHaveValue("");
      fireEvent.change(mooHome, { target: { value: "moo home" } });
      expect(mooHome).toHaveValue("moo home");

      const soiHome = screen.getByTestId("soiHome");
      expect(soiHome).toBeInTheDocument();
      expect(soiHome).toHaveValue("");
      fireEvent.change(soiHome, { target: { value: "soi home" } });
      expect(soiHome).toHaveValue("soi home");

      const roadHome = screen.getByTestId("roadHome");
      expect(roadHome).toBeInTheDocument();
      expect(roadHome).toHaveValue("");
      fireEvent.change(roadHome, { target: { value: "road home" } });
      expect(roadHome).toHaveValue("road home");

      const tambonHome = screen.getByTestId("tambonHome");
      expect(tambonHome).toBeInTheDocument();
      expect(tambonHome).toHaveValue("");
      fireEvent.change(tambonHome, { target: { value: "tambon home" } });
      expect(tambonHome).toHaveValue("tambon home");

      const amphoeHome = screen.getByTestId("amphoeHome");
      expect(amphoeHome).toBeInTheDocument();
      expect(amphoeHome).toHaveValue("");
      fireEvent.change(amphoeHome, { target: { value: "amphoe home" } });
      expect(amphoeHome).toHaveValue("amphoe home");

      const provinceHome = screen.getByTestId("provinceHome");
      expect(provinceHome).toBeInTheDocument();
      expect(provinceHome).toHaveValue("");
      fireEvent.change(provinceHome, { target: { value: "province home" } });
      expect(provinceHome).toHaveValue("province home");

      const postalCodeHome = screen.getByTestId("postalCodeHome");
      expect(postalCodeHome).toBeInTheDocument();
      expect(postalCodeHome).toHaveValue("");
      fireEvent.change(postalCodeHome, { target: { value: "postalCode home" } });
      expect(postalCodeHome).toHaveValue("postalCode home");

      const countryHome = screen.getByTestId("countryHome");
      expect(countryHome).toBeInTheDocument();
      expect(countryHome).toHaveValue("");
      fireEvent.change(countryHome, { target: { value: "country home" } });
      expect(countryHome).toHaveValue("country home");

      //occupation and source of income
      const education = screen.getByText("ระดับการศึกษาสูงสุด");
      expect(education).toBeInTheDocument();
      expect(education).toHaveValue("");
      fireEvent.change(education, { target: { value: "ปริญญาตรี" } });
      expect(education).toHaveValue("ปริญญาตรี");

      const sourceOfIncome = screen.getByText("แหล่งที่มาของเงินลงทุน");
      expect(sourceOfIncome).toBeInTheDocument();
      expect(sourceOfIncome).toHaveValue("");
      fireEvent.change(sourceOfIncome, { target: { value: "เงินเดือน" } });
      expect(sourceOfIncome).toHaveValue("เงินเดือน");

      const occupation = screen.getByText("อาชีพปัจจุบัน");
      expect(occupation).toBeInTheDocument();
      expect(occupation).toHaveValue("");
      fireEvent.change(occupation, { target: { value: "เจ้าของธุรกิจ/ธุรกิจส่วนตัว" } });
      expect(occupation).toHaveValue("เจ้าของธุรกิจ/ธุรกิจส่วนตัว");

      const officeName = screen.getByLabelText("ชื่อสถานที่ทำงาน");
      expect(officeName).toBeInTheDocument();
      expect(officeName).toHaveValue("");
      fireEvent.change(officeName, { target: { value: "office name" } });
      expect(officeName).toHaveValue("office name");

      const typeOfBusiness = screen.getByText("ประเภทธุระกิจ");
      expect(typeOfBusiness).toBeInTheDocument();
      expect(typeOfBusiness).toHaveValue("");
      fireEvent.change(typeOfBusiness, { target: { value: "โรงแรม / ภัตตาคาร" } });
      expect(typeOfBusiness).toHaveValue("โรงแรม / ภัตตาคาร");

      const jobPosition = screen.getByLabelText("ตำแหน่งงาน");
      expect(jobPosition).toBeInTheDocument();
      expect(jobPosition).toHaveValue("");
      fireEvent.change(jobPosition, { target: { value: "job position" } });
      expect(jobPosition).toHaveValue("job position");

      const salaryRange = screen.getByText("รายได้ต่อเดือน");
      expect(salaryRange).toBeInTheDocument();
      expect(salaryRange).toHaveValue("");
      fireEvent.change(salaryRange, { target: { value: "<15,000" } });
      expect(salaryRange).toHaveValue("<15,000");

      //work address
      const addressNoWork = screen.getByTestId("addressNoWork");
      expect(addressNoWork).toBeInTheDocument();
      expect(addressNoWork).toHaveValue("");
      fireEvent.change(addressNoWork, { target: { value: "address work" } });
      expect(addressNoWork).toHaveValue("address work");

      const floorWork = screen.getByTestId("floorWork");
      expect(floorWork).toBeInTheDocument();
      expect(floorWork).toHaveValue("");
      fireEvent.change(floorWork, { target: { value: "floor work" } });
      expect(floorWork).toHaveValue("floor work");

      const mooWork = screen.getByTestId("mooWork");
      expect(mooWork).toBeInTheDocument();
      expect(mooWork).toHaveValue("");
      fireEvent.change(mooWork, { target: { value: "moo work" } });
      expect(mooWork).toHaveValue("moo work");

      const soiWork = screen.getByTestId("soiWork");
      expect(soiWork).toBeInTheDocument();
      expect(soiWork).toHaveValue("");
      fireEvent.change(soiWork, { target: { value: "soi work" } });
      expect(soiWork).toHaveValue("soi work");

      const roadWork = screen.getByTestId("roadWork");
      expect(roadWork).toBeInTheDocument();
      expect(roadWork).toHaveValue("");
      fireEvent.change(roadWork, { target: { value: "road work" } });
      expect(roadWork).toHaveValue("road work");

      const tambonWork = screen.getByTestId("tambonWork");
      expect(tambonWork).toBeInTheDocument();
      expect(tambonWork).toHaveValue("");
      fireEvent.change(tambonWork, { target: { value: "tambon work" } });
      expect(tambonWork).toHaveValue("tambon work");

      const amphoeWork = screen.getByTestId("amphoeWork");
      expect(amphoeWork).toBeInTheDocument();
      expect(amphoeWork).toHaveValue("");
      fireEvent.change(amphoeWork, { target: { value: "amphoe work" } });
      expect(amphoeWork).toHaveValue("amphoe work");

      const provinceWork = screen.getByTestId("provinceWork");
      expect(provinceWork).toBeInTheDocument();
      expect(provinceWork).toHaveValue("");
      fireEvent.change(provinceWork, { target: { value: "province work" } });
      expect(provinceWork).toHaveValue("province work");

      const postalCodeWork = screen.getByTestId("postalCodeWork");
      expect(postalCodeWork).toBeInTheDocument();
      expect(postalCodeWork).toHaveValue("");
      fireEvent.change(postalCodeWork, { target: { value: "postalCode work" } });
      expect(postalCodeWork).toHaveValue("postalCode work");

      const countryWork = screen.getByTestId("countryWork");
      expect(countryWork).toBeInTheDocument();
      expect(countryWork).toHaveValue("");
      fireEvent.change(countryWork, { target: { value: "country work" } });
      expect(countryWork).toHaveValue("country work");

      //objective
      const shortTermInvesment = screen.getByLabelText("เพื่อการลงทุนระยะสั้น");
      expect(shortTermInvesment).toBeInTheDocument();
      expect(shortTermInvesment).not.toBeChecked();
      fireEvent.click(shortTermInvesment);
      expect(shortTermInvesment).toBeChecked();

      const longTermInvesment = screen.getByLabelText("เพื่อการลงทุนระยะยาว");
      expect(longTermInvesment).toBeInTheDocument();
      expect(longTermInvesment).not.toBeChecked();
      fireEvent.click(longTermInvesment);
      expect(longTermInvesment).toBeChecked();

      //bank account
      const firstBankName = screen.getByTestId("firstBankName")
      expect(firstBankName).toBeInTheDocument();
      expect(firstBankName).toHaveValue("");
      fireEvent.change(firstBankName, { target: { value: "ธนาคารกรุงเทพ จำกัด (มหาชน)" } });
      expect(firstBankName).toHaveValue("ธนาคารกรุงเทพ จำกัด (มหาชน)");

      const firstBankBranch = screen.getByTestId("firstBankBranch")
      expect(firstBankBranch).toBeInTheDocument();
      expect(firstBankBranch).toHaveValue("");
      fireEvent.change(firstBankBranch, { target: { value: "ชื่อสาขา" } });
      expect(firstBankBranch).toHaveValue("ชื่อสาขา");

      const firstBankAccount = screen.getByTestId("firstBankAccount")
      expect(firstBankAccount).toBeInTheDocument();
      expect(firstBankAccount).toHaveValue("");
      fireEvent.change(firstBankAccount, { target: { value: "เลขที่บัญชี" } });
      expect(firstBankAccount).toHaveValue("เลขที่บัญชี");

      const secondBankName = screen.getByTestId("secondBankName")
      expect(secondBankName).toBeInTheDocument();
      expect(secondBankName).toHaveValue("");
      fireEvent.change(secondBankName, { target: { value: "ธนาคารกรุงเทพ จำกัด (มหาชน)" } });
      expect(secondBankName).toHaveValue("ธนาคารกรุงเทพ จำกัด (มหาชน)");

      const secondBankBranch = screen.getByTestId("secondBankBranch")
      expect(secondBankBranch).toBeInTheDocument();
      expect(secondBankBranch).toHaveValue("");
      fireEvent.change(secondBankBranch, { target: { value: "ชื่อสาขา" } });
      expect(secondBankBranch).toHaveValue("ชื่อสาขา");

      const secondBankAccount = screen.getByTestId("secondBankAccount")
      expect(secondBankAccount).toBeInTheDocument();
      expect(secondBankAccount).toHaveValue("");
      fireEvent.change(secondBankAccount, { target: { value: "เลขที่บัญชี" } });
      expect(secondBankAccount).toHaveValue("เลขที่บัญชี");

      const submitButton = screen.getByTestId("submitButton")
      expect(submitButton).toBeInTheDocument();
      
      const formData = {
        addressNoIDCard: (addressNoIDCard as HTMLInputElement).value,
        floorIDCard: (floorIDCard as HTMLInputElement).value,
        mooIDCard: (mooIDCard as HTMLInputElement).value,
        soiIDCard: (soiIDCard as HTMLInputElement).value,
        roadIDCard: (roadIDCard as HTMLInputElement).value,
        tambonIDCard: (tambonIDCard as HTMLInputElement).value,
        amphoeIDCard: (amphoeIDCard as HTMLInputElement).value,
        provinceIDCard: (provinceIDCard as HTMLInputElement).value,
        postalCodeIDCard: (postalCodeIDCard as HTMLInputElement).value,
        countryIDCard: (countryIDCard as HTMLInputElement).value,
        addressNoHome: (addressNoHome as HTMLInputElement).value,
        floorHome: (floorHome as HTMLInputElement).value,
        mooHome: (mooHome as HTMLInputElement).value,
        soiHome: (soiHome as HTMLInputElement).value,
        roadHome: (roadHome as HTMLInputElement).value,
        tambonHome: (tambonHome as HTMLInputElement).value,
        amphoeHome: (amphoeHome as HTMLInputElement).value,
        provinceHome: (provinceHome as HTMLInputElement).value,
        postalCodeHome: (postalCodeHome as HTMLInputElement).value,
        countryHome: (countryHome as HTMLInputElement).value,
        education: (education as HTMLInputElement).value,
        sourceOfIncome: (sourceOfIncome as HTMLInputElement).value,
        occupation: (occupation as HTMLInputElement).value,
        officeName: (officeName as HTMLInputElement).value,
        typeOfBusiness: (typeOfBusiness as HTMLInputElement).value,
        jobPosition: (jobPosition as HTMLInputElement).value,
        salaryRange: (salaryRange as HTMLInputElement).value,
        addressNoWork: (addressNoWork as HTMLInputElement).value,
        floorWork: (floorWork as HTMLInputElement).value,
        mooWork: (mooWork as HTMLInputElement).value,
        soiWork: (soiWork as HTMLInputElement).value,
        roadWork: (roadWork as HTMLInputElement).value,
        tambonWork: (tambonWork as HTMLInputElement).value,
        amphoeWork: (amphoeWork as HTMLInputElement).value,
        provinceWork: (provinceWork as HTMLInputElement).value,
        postalCodeWork: (postalCodeWork as HTMLInputElement).value,
        countryWork: (countryWork as HTMLInputElement).value,
        shortTermInvesment: (shortTermInvesment as HTMLInputElement).checked,
        longTermInvesment: (longTermInvesment as HTMLInputElement).checked,
        firstBankName: (firstBankName as HTMLInputElement).value,
        firstBankBranch: (firstBankBranch as HTMLInputElement).value,
        firstBankAccount: (firstBankAccount as HTMLInputElement).value,
        secondBankName: (secondBankName as HTMLInputElement).value,
        secondBankBranch: (secondBankBranch as HTMLInputElement).value,
        secondBankAccount: (secondBankAccount as HTMLInputElement).value,
      };
    
      console.log("All Input Values:", formData);
      console.log("Input Range: ",Object.keys(formData).length);
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

  describe("test create individual form3 (suite test)", () => {
    beforeEach(() => {
      jest.clearAllMocks();
      store.dispatch(setUser(mockUser));
    });
  
    test("test input data(multiple input type)", async () => {

      render(
        <Provider store={store}>
          <MemoryRouter>
            <SuitTestFatca/>
          </MemoryRouter>
        </Provider>
      );

      //suite test
      const question1 = screen.getByTestId("question-0-choice-0");
      expect(question1).toBeInTheDocument();
      expect(question1).not.toBeChecked();
      fireEvent.click(question1);
      expect(question1).toBeChecked();

      const question2 = screen.getByTestId("question-1-choice-0");
      expect(question2).toBeInTheDocument();
      expect(question2).not.toBeChecked();
      fireEvent.click(question2);
      expect(question2).toBeChecked();

      const question3 = screen.getByTestId("question-2-choice-0");
      expect(question3).toBeInTheDocument();
      expect(question3).not.toBeChecked();
      fireEvent.click(question3);
      expect(question3).toBeChecked();

      const question4 = screen.getByTestId("question-3-choice-0");
      expect(question4).toBeInTheDocument();
      expect(question4).not.toBeChecked();
      fireEvent.click(question4);
      expect(question4).toBeChecked();

      const question5 = screen.getByTestId("question-4-choice-0");
      expect(question5).toBeInTheDocument();
      expect(question5).not.toBeChecked();
      fireEvent.click(question5);
      expect(question5).toBeChecked();

      const question6 = screen.getByTestId("question-5-choice-0");
      expect(question6).toBeInTheDocument();
      expect(question6).not.toBeChecked();
      fireEvent.click(question6);
      expect(question6).toBeChecked();

      const question7 = screen.getByTestId("question-6-choice-0");
      expect(question7).toBeInTheDocument();
      expect(question7).not.toBeChecked();
      fireEvent.click(question7);
      expect(question7).toBeChecked();

      const question8 = screen.getByTestId("question-7-choice-0");
      expect(question8).toBeInTheDocument();
      expect(question8).not.toBeChecked();
      fireEvent.click(question8);
      expect(question8).toBeChecked();

      const question9 = screen.getByTestId("question-8-choice-0");
      expect(question9).toBeInTheDocument();
      expect(question9).not.toBeChecked();
      fireEvent.click(question9);
      expect(question9).toBeChecked();

      const DoneButton = screen.getByTestId("DoneButton")
      expect(DoneButton).toBeInTheDocument();
      
      await act(async ()=>{
        fireEvent.click(DoneButton);
      })

      const suiteTestResult = screen.getByText("ผลคะแนนที่ทำได้")
      expect(suiteTestResult).toBeInTheDocument();

      const submitButton = screen.getByText("Next Form");
      expect(submitButton).toBeInTheDocument();

      await act( async ()=>{
        fireEvent.click(submitButton);
      })
      
      //Expected form data
      const expectedFormData = {
        data: {
            id: null,
            suiteTestResult: {
              cid: null,
              investorTypeRisk: 'เสี่ยงตํ่า',
              level: 1,
              totalScore: 9,
              suitTestResult: {
                answer: {
                  0: { ans: [ 1, 0, 0, 0 ] },
                  1: { ans: [ 1, 0, 0, 0 ] },
                  2: { ans: [ 1 ] },
                  3: { ans: [ 1, 0, 0, 0 ] },
                  4: { ans: [ 1, 0, 0, 0 ] },
                  5: { ans: [ 1, 0, 0, 0 ] },
                  6: { ans: [ 1, 0, 0, 0 ] },
                  7: { ans: [ 1, 0, 0, 0 ] },
                  8: { ans: [ 1, 0, 0, 0 ] }
                }
              }
            },
            isFatca: false,
            fatcaInfo: [],
            isKnowLedgeDone: false,
            knowLedgeTestResult: 0,
            pageID: 400
          }
      };

      await waitFor(() => {
        const state = store.getState();
        const corporateState = state.corporateTest;
        console.log("Corporate State After Submission:", corporateState);
        expect(corporateState).toMatchObject(expectedFormData);
      })
  
    }, 20000);
  });

  describe("test create individual form4 (identity verification)", () => {
    beforeEach(() => {
      jest.clearAllMocks();
      store.dispatch(setUser(mockUser));
    });
  
    test("test input data(multiple input type)", async () => {

      render(
        <Provider store={store}>
          <MemoryRouter>
            <IdentityVerification/>
          </MemoryRouter>
        </Provider>
      );

      const ndidButton = screen.getByTestId("ndidButton")
      expect(ndidButton).toBeInTheDocument();
      fireEvent.click(ndidButton);

      const comfirmButton = screen.getByTestId("comfirmButton")
      expect(comfirmButton).toBeInTheDocument();

      await act(async ()=>{
        fireEvent.click(comfirmButton);
      })
      
      //Expected form data
      const expectedFormData = {
        data: { 
          ndid: true, 
          cid: null
         }
      };
      await waitFor(() => {
        const state = store.getState();
        const corporateState = state.corporateTest;
        console.log("Corporate State After Submission:", corporateState);
        expect(corporateState).toMatchObject(expectedFormData);
      })
  
    }, 20000);
  });