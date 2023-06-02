/* eslint-disable no-unused-vars */
import { describe, test, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach } from 'vitest'
import { vi } from 'vitest'
import AddModal from './AddModal.tsx';



describe("AddModal Component", ()=>{
  const addTask= vi.fn()
  const changeModalState = vi.fn()

  beforeEach(()=>{
    render(<AddModal onChangeIsModalOpen={changeModalState} addTask={addTask} />);
  })
  test("cancel button", ()=>{
    const cancelBtn = screen.getByRole('button', {name: /cancel/i})
    expect(cancelBtn).toBeInTheDocument()
    fireEvent.click(cancelBtn);
    expect(changeModalState).toBeCalled()
  })
  test("adding empty task", async()=>{
    const taskInput = screen.getByLabelText(/Task/)
    const assigneeInput = screen.getByLabelText(/Assignee/)
    expect(taskInput).toBeInTheDocument();
    expect(assigneeInput).toBeInTheDocument();
    const addSubmit = screen.getByRole('button', {name: /add/i})
    expect(addSubmit).toBeInTheDocument();
    await fireEvent.click(addSubmit)
    expect(addTask).not.toBeCalled();
  })
  test("adding task successfully", async()=>{
    const taskInput = screen.getByLabelText(/Task/)
    const assigneeInput = screen.getByLabelText(/Assignee/)
    expect(taskInput).toBeInTheDocument();
    expect(assigneeInput).toBeInTheDocument();
    const addSubmit = screen.getByRole('button', {name: /add/i})
    expect(addSubmit).toBeInTheDocument();
    await fireEvent.change(taskInput, {target: {value: "aziz"}})
    await fireEvent.change(assigneeInput, {target: {value: "ayah"}})
    await fireEvent.click(addSubmit)
    expect(addTask).toBeCalled();
  })
})



