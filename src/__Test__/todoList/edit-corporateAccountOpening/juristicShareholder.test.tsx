import { PageJuristicShareholder } from "@/pages/todoList/corporateAccountOpening/edit/pages/PageJuristicShareholder";
import { render, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { store } from "@/app/store";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { setUser } from "@/features/user/userSlice";
import { mockUser } from "@/__Test__/utils";
import { setCookies } from "@/lib/Cookies";

describe("form 6 - juristic shareholder", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("test init data", async () => {
    store.dispatch(setUser(mockUser));
    localStorage.setItem("corporateCode", "80000001");
    setCookies(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjliODRjNzZkLWZlODQtNDExMy1iYTMwLTE3MDE0YTAyYjZiNSIsImVtYWlsIjoiYWEyYzY5NjYzNDg2NDdmMzhjYmZiN2YyOWFiNDU5YzE3Zjc0MGZiNTdjYTJmZWIzODQwNDdhNTAzYmIxZTRmNiIsImdyb3VwcyI6WzEwMDEsMTAwMiwxMDAzLDEwMDQsMTAwNSwxMDA2LDEwMDcsMTAwOCwxMDA5LDEwMTAsMjAwMSwyMDAyLDIwMDMsMjAwNCwyMDA1LDIwMDYsMjAwNywyMDA4LDIwMDksMjAxMCwyMDExLDIwMTIsMjAxMywyMDE0LDIwMTUsMjAxNiwyMDE3LDIwMTgsMjAxOSwyMDIwLDIwMjEsMjAyMiwzMDAxLDMwMDIsMzAwMywzMDA0LDMwMDUsMzAwNiwzMDA3LDMwMDgsMzAwOSwzMDEwLDMwMTEsMzAxMiwzMDEzLDMwMTQsNDAwMSw0MDAyLDQwMDMsNDAwNCw0MDA1LDQwMDYsNTAwMSw1MDAyLDUwMDMsNTAwNCw1MDA1LDUwMDYsNTAwNyw1MDA4LDUwMDksNTAxMCw1MDExLDUwMTIsNTAxMyw1MDE0LDUwMTUsNTAxNiw1MDE3LDUwMTgsNTAxOSw1MDIwLDUwMjEsNTAyMiw1MDIzLDUwMjQsNTAyNSw1MDI2LDUwMjcsNTAyOCw1MDI5LDUwMzAsNTAzMSw1MDMyLDUwMzMsNTAzNCw1MDM1LDUwMzYsNTAzNyw2MDAxLDYwMDIsNjAwMyw2MDA0LDYwMDUsNjAwNiw2MDA3LDYwMDgsNzAwMSw3MDAyLDcwMDMsNzAwNCw3MDA1LDcwMDZdLCJwZXJtaXNzaW9ucyI6WzEwMSwxMDIsMTAzLDIwMSwyMDIsMjAzXSwicm9sZXMiOlsxMSwxMiwxMywyMSwyMiwyMywzMSwzMiwzM10sInVzZXJJZCI6IiIsImxvZ2luU3RhdHVzIjoiIiwiZXhwaXJlc0RhdGUiOiIwMDAxLTAxLTAxVDAwOjAwOjAwWiIsIkVycm9yIjpudWxsLCJleHAiOjE3MjYyNzkzODQsImlhdCI6MTcyNjE5Mjk4NH0.OTot9uNA_ZstpyXDIra6aBy-D1zayxEU0n1aJawCWlU"
    );
    render(
      <Provider store={store}>
        <MemoryRouter>
          <PageJuristicShareholder />
        </MemoryRouter>
      </Provider>
    );
    await waitFor(
      async () => {
        const name1 = screen.getByText("name-80000001");
        expect(name1).toBeInTheDocument();
      },
      { timeout: 30000 }
    );
    localStorage.clear();
  }, 60000);
});
