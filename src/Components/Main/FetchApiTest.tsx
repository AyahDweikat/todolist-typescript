// import React from "react";
// import { render, renderHook, screen, waitFor } from "@testing-library/react";

// import { vi } from "vitest";
// import App from "../../App";

// global.fetch = vi.fn()




// describe("App", () => {
//     global.fetch = vi.fn();
//   beforeEach(() => {
//     fetchMock.resetMocks();
//   });

// //   test("renders users when API call succeeds", async () => {
// //     const fakeToDos = [
// //       { id: "fddffdfds", task: "first task", assignee: "aziz", isDone: false },
// //       { id: "sdgfgfhgh", task: "second task", assignee: "ayah", isDone: true },
// //     ];
// //     fetchMock.mockResolvedValue({json: vi.fn(() => fakeToDos) });
// //     // fetchMock.mockResolvedValue(createFetchResponse(fakeToDos))
// //     render(<App />);
// //     // expect(await screen.findByText("first task")).toBeInTheDocument();
// //     // expect(await screen.findByText("aziz")).toBeInTheDocument();
// //     // expect(screen.queryByText("No users found")).not.toBeInTheDocument();
// //   });

// describe("when data is fetched successfully", () => {
//     beforeEach(() => {
//         const fakeToDos = [
//             { id: "fddffdfds", task: "first task", assignee: "aziz", isDone: false },
//             { id: "sdgfgfhgh", task: "second task", assignee: "ayah", isDone: true },
//         ];
//         fetchMock.mockResolvedValue({
//             json: vi.fn().mockResolvedValue(fakeToDos)
//         });
//     });
  
//     it("should return data", async () => {
//       const { result } = renderHook(() => useFetchedData());
  
//       await waitFor(() =>
//         expect(result.current).toEqual({
//           data: fakeToDos,
//         })
//       );
//     });
//   });


// });