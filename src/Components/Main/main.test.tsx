/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { describe, test, expect } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach } from 'vitest'
import Main from './Main.tsx';


describe("Main Component", ()=>{
  beforeEach(()=>{
    render(<Main searchValue="" />);
  })
  test("no. of tasks", ()=>{
    expect(screen.getByText(/tasks/i)).toBeInTheDocument();
  })
  test("Clicking button of add modal", async()=>{
    const addModal = screen.getByRole("button", {name:/New Task/i})
    expect(addModal).toBeInTheDocument();
    await fireEvent.click(addModal)
    waitFor(()=>{
        const sectionAddModal= document.getElementById("sectionAddModal")
        expect(sectionAddModal).toBeInTheDocument()
    })
  })
})



