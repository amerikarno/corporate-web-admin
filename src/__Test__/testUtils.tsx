import React, { ReactElement } from "react";
import { render as rtlRender } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "@/app/store";
import { BrowserRouter } from "react-router-dom";

function render(ui: ReactElement, { ...renderOptions } = {}) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    );
  }

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from "@testing-library/react";
export { render };
