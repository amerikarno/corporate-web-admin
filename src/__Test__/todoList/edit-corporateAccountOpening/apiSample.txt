import { render, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import List from "@/pages/apiSample";
import { act } from "react";

describe("59892259", () => {
  let originFetch: any;
  beforeEach(() => {
    originFetch = (global as any).fetch;
  });
  afterEach(() => {
    (global as any).fetch = originFetch;
  });

  test("should pass", async () => {
    const fakeResponse = {
      userId: 1,
      id: 1,
      title: "delectus aut autem",
      completed: false,
    };
    const mRes = { json: jest.fn().mockResolvedValueOnce(fakeResponse) };
    const mockedFetch = jest.fn().mockResolvedValueOnce(mRes as any);
    (global as any).fetch = mockedFetch;

    await act(async () => render(<List />));

    await waitFor(
      async () => {
        expect(screen.getByText("delectus aut autem")).toBeInTheDocument();
        expect(mockedFetch).toHaveBeenCalledTimes(1);
        expect(mRes.json).toHaveBeenCalledTimes(1);
      },
      { timeout: 10000 }
    );
  }, 10000);
});
