import {
  NavActions,
  NavLinks,
} from "@/components/general-blocks/Navbar";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

// 1. NavLinks Unit Test
const NAV_ITEMS = [
  { name: "Home", path: "/" },
  { name: "Blog", path: "/blog" },
  { name: "Gifts", path: "/gifts" },
] as const;

describe("NavLinks", () => {
  it("renders all links and highlights the active link", () => {
    render(<NavLinks navItems={NAV_ITEMS} pathname="/blog" />);

    // Check if all links are rendered
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Blog")).toBeInTheDocument();
    expect(screen.getByText("Gifts")).toBeInTheDocument();

    // Check if the active link is highlighted
    const activeLink = screen.getByText("Blog");
    expect(activeLink).toHaveClass("text-primary font-bold");
  });
});

// 2. NavActions Unit Test

describe("NavActions", () => {
  it("renders all buttons and the avatar", () => {
    render(<NavActions />);

    // Check if buttons are rendered with correct aria-labels
    expect(screen.getByLabelText("Open Search")).toBeInTheDocument();
    expect(screen.getByLabelText("Open Notifications")).toBeInTheDocument();
    expect(screen.getByLabelText("Add new product")).toBeInTheDocument();

    // Check if the avatar is rendered
    expect(screen.getByAltText("Avatar")).toBeInTheDocument();
  });
});
