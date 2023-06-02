/* eslint-disable no-unused-vars */
import { describe, test, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, vi } from "vitest";
import Filters from "./Filters.tsx";


describe("Filters Component", () => {
  const handleChangeState = vi.fn();
  beforeEach(() => {
    render(<Filters tasks={[]} activeFilter="" onChangeActiveFilter={handleChangeState} />);
  });
  test("filter done button", () => {
    const doneFilter = screen.getByText(/done/i);
    expect(doneFilter).toBeInTheDocument();
    fireEvent.click(doneFilter);
    expect(handleChangeState).toBeCalled();
  });
  test("filter pending button", () => {
    const pendingFilter = screen.getByText(/Pending/i);
    expect(pendingFilter).toBeInTheDocument();
    fireEvent.click(pendingFilter);
    expect(handleChangeState).toBeCalled();
  });
});
