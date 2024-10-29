import { mockUser } from "@/__Test__/utils";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import axios from "@/api/axios";
import MockAdapter from "axios-mock-adapter";
import { store } from "@/app/store";
import { setUser } from "@/features/user/userSlice";
import ToDoAddedIcoSearch from "@/pages/todoList/toDoIcoAccount/ToDoAddedIcoSearch";

jest.mock("@/lib/utils", () => ({
    ...jest.requireActual("@/lib/utils"),
    isExpiredToken: jest.fn().mockReturnValue(false),
  }));

  jest.mock("@/lib/Cookies", () => ({
    getCookies: jest.fn().mockReturnValue("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZhYjEyMmRjLTc3YzctNDlmYy04ZTBkLTg2NWVjYTY1MmI4MCIsImVtYWlsIjoiYjcwODk4NTY5ZWRjYjk5MjdhMDZkZDUxMTBmMWI4ZmUxZDQ2ZTVmOTg1ZTBkOWYyMjI0ZDc3NDg1NzU3ZjFlYSIsImdyb3VwcyI6WzEwMDEsMTAwMiwxMDAzLDIwMDEsMjAwMiwyMDAzXSwicGVybWlzc2lvbnMiOlsxMDEsMTAyLDEwMywyMDEsMjAyLDIwM10sInJvbGVzIjpbMTEsMTIsMTMsMjEsMjIsMjNdLCJ1c2VySWQiOiIiLCJsb2dpblN0YXR1cyI6IiIsImV4cGlyZXNEYXRlIjoiMDAwMS0wMS0wMVQwMDowMDowMFoiLCJFcnJvciI6bnVsbCwiZXhwIjoxNzI3MTY3MzQyLCJpYXQiOjE3MjcwODA5NDJ9.PWG3vMMN3POr-SWDnO4etQ5D1ZV2mX7D1Fzwsb8sfBg"),
  }));

  const mockAxios = new MockAdapter(axios);

  const mockIcoAccount = 
  [
    {
        "registerId": "5ef8861b-0c10-4c60-a073-645376aae700",
        "status": 0,
        "asset": {
            "id": "35bb1a3e-c15e-4d85-b84a-ec805f9ba435",
            "createBy": "ee082cb5-00ae-4c54-a184-4738f562bc92",
            "CreatedAt": "2024-10-22T14:15:42+07:00",
            "DeletedAt": null,
            "registerId": "5ef8861b-0c10-4c60-a073-645376aae700",
            "title": "Digital Asset",
            "logo": "getImages",
            "issueBy": "Issue By Digital Asset",
            "image": "image",
            "name": "THGG",
            "description": "Blockchain Innovations Global (B.I.G.)",
            "category": "Healthcare",
            "return": "18%",
            "region": "Asia",
            "minimum": "250.00 USD",
        },
        "info": {
            "CreatedAt": "0001-01-01T00:00:00Z",
            "DeletedAt": null,
            "registerId": "5ef8861b-0c10-4c60-a073-645376aae700",
            "totalIssuance": "1000.12 DA",
            "totalAmountRaised": "50000.00 USD",
            "contractInfomation": "0xC92Ff5e3A94...89e7e8a5b378b",
            "minimumInvestmentAmount": "1000.00 USD",
            "minimumInvestmentQuantity": "100.00 DA",
            "issueUnitPrice": "100.00 USD"
        },
        "details": [],
        "documents": null,
        "images": null,
        "videos": null,
        "faq": [],
        "keyInformation": null,
        "issuanceTerms": null,
        "companyMembers": []
    },
  ]



  describe("test rendering and approve/reject account", ()=>{
    beforeEach(() => {

      jest.clearAllMocks();
      store.dispatch(setUser(mockUser));

      mockAxios.onPost("/api/v1/ico/total/pending").reply(200, {
        total:100
      })

      mockAxios.onPost("/api/v1/ico/query/pending").reply(200,
        mockIcoAccount
      )

    });

    test("test table rendering", async () => {

      render(
        <Provider store={store}>
          <MemoryRouter>
            <ToDoAddedIcoSearch/>
          </MemoryRouter>
        </Provider>
      );

      expect(screen.getByText("ICO Account Opening")).toBeInTheDocument();

      await waitFor (() => {
        expect(screen.getByText("Register ID")).toBeInTheDocument();
        expect(screen.getByText("Symbol")).toBeInTheDocument();
        expect(screen.getByText("Company Name")).toBeInTheDocument();
        expect(screen.getByText("Issued By")).toBeInTheDocument();
        expect(screen.getByText("Status")).toBeInTheDocument();
      })

      await waitFor(() => {
        expect(screen.getByText("5ef8861b-0c10-4c60-a073-645376aae700")).toBeInTheDocument();
        expect(screen.getByText("THGG")).toBeInTheDocument();
        expect(screen.getByText("Blockchain Innovations Global (B.I.G.)")).toBeInTheDocument();
        expect(screen.getByText("Issue By Digital Asset")).toBeInTheDocument();
        expect(screen.getByText("Pending")).toBeInTheDocument();
      })

      await waitFor(() => {
        expect(screen.getByText("Page 1 of 5")).toBeInTheDocument();
      })

    })

    test("test click approve/reject", async () => {

      mockAxios.onPost("/api/v1/ico/approve").reply(200, {
      })

      render(
        <Provider store={store}>
          <MemoryRouter>
            <ToDoAddedIcoSearch/>
          </MemoryRouter>
        </Provider>
      );

      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Reject' })).toBeInTheDocument();
      })
      fireEvent.click(screen.getByRole('button', { name: 'Reject' }));
      await waitFor(() => {
        expect(screen.getByText("Are you sure? Reject")).toBeInTheDocument();
      })
      fireEvent.click(screen.getByRole('button', { name: 'Reject' }));

      expect(screen.getByRole('button', { name: 'Approve' })).toBeInTheDocument();
      fireEvent.click(screen.getByRole('button', { name: 'Approve' }));
      await waitFor(() => {
        expect(screen.getByText("Are you sure? Approve")).toBeInTheDocument();
      })
      fireEvent.click(screen.getByRole('button', { name: 'Approve' }));

    })
    test("test change page", async () => {

      mockAxios.onPost("/api/v1/ico/total/pending").reply(200, {
        total:100
      })

      mockAxios.onPost("/api/v1/ico/query/pending").reply(200,
        mockIcoAccount
      )

      mockAxios.onPost("/api/v1/ico/approve").reply(200, {
      })

      render(
        <Provider store={store}>
          <MemoryRouter>
            <ToDoAddedIcoSearch/>
          </MemoryRouter>
        </Provider>
      );

      await waitFor(() => {
        expect(screen.getByTestId("nextBtn")).toBeInTheDocument();
      })

      fireEvent.click(screen.getByTestId("nextBtn"));

      await waitFor(() => {
        expect(screen.getByText("Page 2 of 5")).toBeInTheDocument();
      })

      await waitFor(() => {
        expect(screen.getByTestId("prevBtn")).toBeInTheDocument();
      })

      fireEvent.click(screen.getByTestId("prevBtn"));

      await waitFor(() => {
        expect(screen.getByText("Page 1 of 5")).toBeInTheDocument();
      })  
      
    })
  })
