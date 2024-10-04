import { store } from "@/app/store";
import { setUser } from "@/features/user/userSlice";
import { mockUser } from "@/__Test__/utils";
import axios from "@/api/axios";
import MockAdapter from "axios-mock-adapter";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import BankOrderEdit from "@/pages/createJob/addedCorporateAccount/pages/bankOrder/bankOrder";
import { act, fireEvent,render,screen, waitFor} from "@testing-library/react";

jest.mock("@/lib/utils", () => ({
    ...jest.requireActual("@/lib/utils"),
    isExpiredToken: jest.fn().mockReturnValue(false),
}));

const mockAxios = new MockAdapter(axios);

describe("test ico form1",()=>{

    beforeEach(() => {
      jest.clearAllMocks();
      store.dispatch(setUser(mockUser));
    })

    test("test ico form1 create", async ()=>{
        mockAxios.onPost("/api/v1/ico/asset/create").reply(200, {
          message: "create ico form1 success"
        });
        render(
            <Provider store={store}>
              <MemoryRouter>
                <BankOrderEdit/>
              </MemoryRouter>
            </Provider>
        );
        
        const corporateCode = screen.getByLabelText("Corporate Code");
        expect(corporateCode).toBeInTheDocument();
        await act(async () => {
          fireEvent.change(corporateCode, { target: { value: 80000001 } });
        })

        userEvent.selectOptions(
          screen.getByTestId('bankName'),
          screen.getByTestId('004')
        )

        await waitFor(() => {
            expect(screen.getByTestId('bankName')).toHaveValue("ธนาคารกสิกรไทย จำกัด (มหาชน)");
        });

        const bankId = screen.getByLabelText("Bank Account ID");
        expect(bankId).toBeInTheDocument();
        await act(async () => {
          fireEvent.change(bankId, { target: { value: 753285427852 } });
        })

        const withDraw = screen.getByText("Withdraw");
        await act(async () => {
          fireEvent.click(withDraw);
        })

        const orderValue = screen.getByLabelText("Order Value");
        expect(orderValue).toBeInTheDocument();
        await act(async () => {
            fireEvent.change(orderValue, { target: { value: "1000" } });
        })

        const submitFormBtn = screen.getByText("Submit");
        expect(submitFormBtn).toBeInTheDocument();
        await act(async () => {
          fireEvent.click(submitFormBtn);
        })
    
        //  Expected form data
        // const expectedFormData = {
        // };
    
        await waitFor(() => {
            const state = store.getState();
            const corporateState = state.corporateTest;
            console.log("Corporate State After Submission:", corporateState);
            // expect(corporateState).toMatchObject(expectedFormData);
          });
        })
})