
import { describe, test, expect } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import {vi, beforeEach} from "vitest";
import Header from './Header.tsx';

describe('Header Component', () => {
    const onChangeTheme = vi.fn()
    const onChangeSearchValue= vi.fn()
    beforeEach(()=>{
        render(<Header onChangeSearchValue={onChangeSearchValue} isDarkTheme={false} onChangeTheme={onChangeTheme} searchValue={''} />)
    })
    test("search", ()=>{
        const searchInpt = screen.getByPlaceholderText(/search/i)
        expect(searchInpt).toBeInTheDocument()
    })
    test("calls setSearchText with the input value on search input change", async() => {
        const searchInput = screen.getByPlaceholderText(/search/i)
        await fireEvent.change(searchInput, { target: { value: "test" } })
        waitFor(()=>{
            expect(searchInput).toHaveValue('test')
        })
        expect(onChangeSearchValue).toBeCalled();
    });
    test("logo img", ()=>{
        const img = screen.getByRole('img')
        expect(img).toBeInTheDocument()
    })
    test("toggler Theme", async()=>{
        const themeToggler = screen.getByPlaceholderText("themeToggler")
        expect(themeToggler).toBeInTheDocument();
        expect(themeToggler).not.toBeChecked()
        await fireEvent.click(themeToggler)
        expect(onChangeTheme).toBeCalledTimes(1)
        waitFor(()=>{
            expect(themeToggler).toBeChecked()
        })
    })
});