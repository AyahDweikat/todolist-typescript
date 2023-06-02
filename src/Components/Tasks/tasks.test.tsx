/* eslint-disable no-unused-vars */
import { describe, test, expect } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest'
import Tasks from './Tasks.tsx';


describe("tasks display", ()=>{
    const changeState=vi.fn()
    const deleteTask=vi.fn()
    const editTask=vi.fn()

    test("icon pending state", async()=>{
        render(<Tasks tasks={[{task:"task1", assignee:"ayah", id:"fjlfd21fd", isDone:false}]} changeState={changeState} deleteTask={deleteTask} editTask={editTask} />)
        const statePendingIcon = document.querySelector(".fa-circle")!;
        expect(statePendingIcon).toBeInTheDocument();
        await fireEvent.click(statePendingIcon)
        expect(changeState).toBeCalled()
        waitFor(()=>{
            const _stateDoneIcon = document.querySelector(".fa-circle-check")
            expect(_stateDoneIcon).toBeInTheDocument();
        })
    })
    test("icon done state", async()=>{
        render(<Tasks tasks={[{task:"hello", assignee:"ayah", id:"fjlfd24fd", isDone:true}]} changeState={changeState} deleteTask={deleteTask} editTask={editTask} />)
        const stateDoneIcon = document.querySelector(".fa-circle-check")!;
        expect(stateDoneIcon).toBeInTheDocument();
        await fireEvent.click(stateDoneIcon)
        expect(changeState).toBeCalled()
        waitFor(()=>{
            const _statePendingIcon = document.querySelector(".fa-circle")
            expect(_statePendingIcon).toBeInTheDocument();
        })
    })
    test("task paragraph and edit task", async()=>{
        render(<Tasks tasks={[{task:"task1", assignee:"ayah", id:"fjlfd21fd", isDone:false}]} changeState={changeState} deleteTask={deleteTask} editTask={editTask} />)
        const taskParagraph = screen.getByText(/task1/i)
        expect(taskParagraph).toBeInTheDocument()
        const assigneeSpan = screen.getByText(/ayah/i)
        expect(assigneeSpan).toBeInTheDocument()
        await fireEvent.dblClick(taskParagraph)
        waitFor(async () => {
            const editInput =  document.querySelector(".editInpt")!;
            expect(editInput).toBeInTheDocument()
            await fireEvent.change(editInput, {target:"task3"})
            await fireEvent.blur(editInput)
            expect(editTask).toBeCalled()
            waitFor(()=>{
                const taskParagraph = screen.getByText("task3")
                expect(taskParagraph).toBeInTheDocument()
            })
        })
    })
    test("edit button", async()=>{
        render(<Tasks tasks={[{task:"task1", assignee:"ayah", id:"fjlfd21fd", isDone:false}]} changeState={changeState} deleteTask={deleteTask} editTask={editTask} />)
        const editBtn = document.getElementById("btnEdit")!;
        expect(editBtn).toBeInTheDocument()
        expect(editBtn).not.toBeDisabled()
        await fireEvent.click(editBtn)
        waitFor(async () => {
            const editInput =  document.querySelector(".editInpt")!;
            expect(editInput).toBeInTheDocument()
            await fireEvent.change(editInput, {target:"task3"})
            await fireEvent.blur(editInput)
            expect(editTask).toBeCalled()
            waitFor(()=>{
                const taskParagraph = screen.getByText("task3")
                expect(taskParagraph).toBeInTheDocument()
            })
        })
    })
    test("edit button when task is done", async()=>{
        render(<Tasks tasks={[{task:"hello", assignee:"ayah", id:"fjlfd24fd", isDone:true}]} changeState={changeState} deleteTask={deleteTask} editTask={editTask} />)
        const editBtn = document.getElementById("btnEdit")!;
        expect(editBtn).toBeInTheDocument()
        expect(editBtn).toBeDisabled()
    })

    test("Clicking delete button to display delete modal", async()=>{
        render(<Tasks tasks={[{task:"task1", assignee:"ayah", id:"fjlfd21fd", isDone:false}]} changeState={changeState} deleteTask={deleteTask} editTask={editTask} />)
        const deleteBtn = document.getElementById("deleteBtn")!;
        expect(deleteBtn).toBeInTheDocument();
        await fireEvent.click(deleteBtn)
        waitFor(()=>{
            const sectionDeleteModal= document.getElementById("deleteModal")
            expect(sectionDeleteModal).toBeInTheDocument()
        })
      })
})

