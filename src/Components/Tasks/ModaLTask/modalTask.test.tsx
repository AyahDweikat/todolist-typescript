/* eslint-disable no-unused-vars */
import { describe, test, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach } from 'vitest'
import { vi } from 'vitest'
import ModalTask from './ModalTask.tsx';



describe("Delete Modal Component", ()=>{
  const handleClose= vi.fn()
  const deleteTask = vi.fn()

  beforeEach(()=>{
    render(<ModalTask deleteTask={deleteTask} handleClose={handleClose} id="" tasks={[]} />);
  })
  test("cancel button", ()=>{
    const cancelBtn = screen.getByRole('button', {name: /cancel/i})
    expect(cancelBtn).toBeInTheDocument()
    fireEvent.click(cancelBtn);
    expect(handleClose).toBeCalled()
  })
  test("deleting task successfully", async()=>{
    const deleteBtn = screen.getByRole('button', {name: /delete/i})
    expect(deleteBtn).toBeInTheDocument();
    await fireEvent.click(deleteBtn)
    expect(deleteTask).toBeCalled();
  })
})
