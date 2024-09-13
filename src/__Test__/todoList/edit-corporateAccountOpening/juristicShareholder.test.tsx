import { PageJuristicShareholder } from "@/pages/todoList/corporateAccountOpening/edit/pages/PageJuristicShareholder";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { store } from "@/app/store";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { setUser } from "@/features/user/userSlice";
import { mockUser } from "@/__Test__/utils";

describe("form 6 - juristic shareholder", () => {
  test("test init data", async () => {
    store.dispatch(setUser(mockUser));
    render(
      <Provider store={store}>
        <MemoryRouter>
          <PageJuristicShareholder corporateCode="80000001" />
        </MemoryRouter>
      </Provider>
    );
    // await waitFor(
    //   async () => {
    //     const name1 = screen.getByText("name-80000001");
    //     expect(name1).toBeInTheDocument();
    //   },
    //   { timeout: 20000 }
    // );
  }, 20000);
});
