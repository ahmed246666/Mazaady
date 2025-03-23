import { renderHook, act } from "@testing-library/react"; // Use @testing-library/react
import { useCountdown } from "@/hooks/useCountdown";
import "@testing-library/jest-dom";

describe("useCountdown", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("returns the correct countdown values", () => {
    const targetDate = new Date(Date.now() + 1000 * 60 * 60 * 25); // 25 hours from now
    const { result } = renderHook(() => useCountdown(targetDate.toISOString()));

    // Check initial values
    expect(result.current.days).toBe(1);
    expect(result.current.hours).toBe(1);
    expect(result.current.minutes).toBe(0);

    // Fast-forward time by 1 minute
    act(() => {
      jest.advanceTimersByTime(1000 * 60);
    });

    // Check updated values
    expect(result.current.days).toBe(1);
    expect(result.current.hours).toBe(0);
    expect(result.current.minutes).toBe(59);
  });

  it("handles the case when the target date is in the past", () => {
    const targetDate = new Date(Date.now() - 1000); // 1 second in the past
    const { result } = renderHook(() => useCountdown(targetDate.toISOString()));

    // Check if all values are 0
    expect(result.current.days).toBe(0);
    expect(result.current.hours).toBe(0);
    expect(result.current.minutes).toBe(0);
  });
});