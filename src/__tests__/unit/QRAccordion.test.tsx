import Collapsable, { ToggleButton } from "@/app/(home)/_components/Collapsable";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Collapsable", () => {
  it("toggles the collapsable section when the toggle button is clicked", () => {
    render(<Collapsable />);

    // Check if the collapsable section is open by default
    expect(screen.getByText("Hala Ahmed")).toBeInTheDocument();

    // Click the toggle button
    const toggleButton = screen.getByLabelText("Collapse");
    fireEvent.click(toggleButton);

    // Check if the collapsable section is closed
    expect(screen.queryByText("Hala Ahmed")).not.toBeInTheDocument();

    // Click the toggle button again
    fireEvent.click(toggleButton);

    // Check if the collapsable section is open again
    expect(screen.getByText("Hala Ahmed")).toBeInTheDocument();
  });

  it("renders all action buttons with correct aria-labels", () => {
    render(<Collapsable />);

    // Check if all action buttons are rendered
    expect(screen.getByLabelText("view QR Code")).toBeInTheDocument();
    expect(screen.getByLabelText("share QR Code")).toBeInTheDocument();
    expect(screen.getByLabelText("download QR Code")).toBeInTheDocument();
  });
});


describe("ToggleButton", () => {
  it("calls onClick handler and updates aria-label when clicked", () => {
    const onClick = jest.fn();
    render(<ToggleButton isOpen={true} onClick={onClick} />);

    // Check if the button is rendered with the correct aria-label
    const button = screen.getByLabelText("Collapse");
    expect(button).toBeInTheDocument();

    // Click the button
    fireEvent.click(button);

    // Check if the onClick handler is called
    expect(onClick).toHaveBeenCalled();

    // Re-render with isOpen=false
    render(<ToggleButton isOpen={false} onClick={onClick} />);

    // Check if the aria-label updates
    expect(screen.getByLabelText("Expand")).toBeInTheDocument();
  });
});