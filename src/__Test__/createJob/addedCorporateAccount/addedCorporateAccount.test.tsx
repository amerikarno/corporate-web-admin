import CorporateAccountOpenning from "@/pages/createJob/addedCorporateAccount/CorporateAccountOpenning";
import { fireEvent, render, screen } from "@/__Test__/testUtils";
import { useNavigate } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("addedCorporateAccount", () => {
  const mockNavigate = useNavigate as jest.Mock;

  beforeEach(() => {
    mockNavigate.mockReset();
  });

  // test main page render
  it("should render correctly", () => {
    render(<CorporateAccountOpenning />);
  });

  // test next button
  it("should handle 'next' page navigation", () => {
    const { getByText } = render(<CorporateAccountOpenning />);
    screen.debug();

    const nextButton = getByText((_, element) => {
      return element?.textContent === "Next Form";
    });
    fireEvent.click(nextButton);

    expect(mockNavigate).toHaveBeenCalledWith(
      "/create-job/added-corporate-account/2"
    );
  });
});
