import ProfileCard from "@/app/(home)/_components/ProfileCard";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'


describe("ProfileCard", () => {
  it("renders the profile image", () => {
    render(<ProfileCard />);
    const profileImage = screen.getByAltText("Avatar");
    expect(profileImage).toBeInTheDocument();
  });

  it("displays the correct name", () => {
    render(<ProfileCard />);
    const name = screen.getByText("Hala Ahmed");
    expect(name).toBeInTheDocument();
  });

  it("renders the Follow button", () => {
    render(<ProfileCard />);
    const button = screen.getByRole("button", { name: /follow/i });
    expect(button).toBeInTheDocument();
  });
});