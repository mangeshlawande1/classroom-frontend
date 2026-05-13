import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Mock complex external dependencies before importing the component
vi.mock("@refinedev/react-table", () => ({
    useTable: vi.fn(() => ({ mockTable: true })),
}));

vi.mock("@/components/refine-ui/views/list-view.tsx", () => ({
    ListView: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="list-view">{children}</div>
    ),
}));

vi.mock("@/components/refine-ui/layout/breadcrumb.tsx", () => ({
    Breadcrumb: () => <nav data-testid="breadcrumb" />,
}));

vi.mock("@/components/refine-ui/buttons/create.tsx", () => ({
    CreateButton: () => <button data-testid="create-button">Create</button>,
}));

vi.mock("@/components/refine-ui/data-table/data-table.tsx", () => ({
    DataTable: ({ table }: { table: unknown }) => (
        <div data-testid="data-table" data-table={JSON.stringify(table)} />
    ),
}));

vi.mock("@/components/ui/badge.tsx", () => ({
    Badge: ({ children, variant }: { children: React.ReactNode; variant?: string }) => (
        <span data-testid="badge" data-variant={variant}>
            {children}
        </span>
    ),
}));

vi.mock("@/components/ui/input.tsx", () => ({
    Input: (props: React.InputHTMLAttributes<HTMLInputElement>) => (
        <input data-testid="search-input" {...props} />
    ),
}));

vi.mock("@/components/ui/select.tsx", () => ({
    Select: ({
        children,
        value,
        onValueChange,
    }: {
        children: React.ReactNode;
        value?: string;
        onValueChange?: (value: string) => void;
    }) => (
        <div data-testid="select" data-value={value}>
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    // Pass onValueChange to SelectContent children if needed
                    return child;
                }
                return child;
            })}
            {/* Expose a hidden select element for testing */}
            <select
                data-testid="native-select"
                value={value}
                onChange={(e) => onValueChange?.(e.target.value)}
            >
                <option value="all">All Departments</option>
                <option value="Computer Science">Computer Science</option>
            </select>
        </div>
    ),
    SelectTrigger: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="select-trigger">{children}</div>
    ),
    SelectValue: ({ placeholder }: { placeholder?: string }) => (
        <span data-testid="select-value">{placeholder}</span>
    ),
    SelectContent: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="select-content">{children}</div>
    ),
    SelectItem: ({
        children,
        value,
    }: {
        children: React.ReactNode;
        value: string;
    }) => (
        <div data-testid={`select-item-${value}`} data-value={value}>
            {children}
        </div>
    ),
}));

// Import after mocks are set up
import SubjectsList from "@/pages/subjects/SubjectsList.tsx";
import { useTable } from "@refinedev/react-table";
import { DEPARTMENT_OPTIONS } from "@/constants/index.ts";

const mockUseTable = vi.mocked(useTable);

describe("SubjectsList", () => {
    beforeEach(() => {
        mockUseTable.mockClear();
        mockUseTable.mockReturnValue({ mockTable: true } as ReturnType<typeof useTable>);
    });

    describe("rendering", () => {
        it("renders the page title 'Subjects'", () => {
            render(<SubjectsList />);
            expect(screen.getByRole("heading", { name: "Subjects" })).toBeInTheDocument();
        });

        it("renders the breadcrumb", () => {
            render(<SubjectsList />);
            expect(screen.getByTestId("breadcrumb")).toBeInTheDocument();
        });

        it("renders the list view wrapper", () => {
            render(<SubjectsList />);
            expect(screen.getByTestId("list-view")).toBeInTheDocument();
        });

        it("renders the descriptive intro paragraph", () => {
            render(<SubjectsList />);
            expect(
                screen.getByText(/Quick access to essential Metrics and Management Tools/i)
            ).toBeInTheDocument();
        });

        it("renders the search input with correct placeholder", () => {
            render(<SubjectsList />);
            const input = screen.getByTestId("search-input");
            expect(input).toBeInTheDocument();
            expect(input).toHaveAttribute("placeholder", "Search by name...");
        });

        it("renders the search input as type text", () => {
            render(<SubjectsList />);
            const input = screen.getByTestId("search-input");
            expect(input).toHaveAttribute("type", "text");
        });

        it("renders the department select", () => {
            render(<SubjectsList />);
            expect(screen.getByTestId("select")).toBeInTheDocument();
        });

        it("renders 'All Departments' option in the select", () => {
            render(<SubjectsList />);
            expect(screen.getByTestId("select-item-all")).toBeInTheDocument();
            expect(screen.getByTestId("select-item-all")).toHaveTextContent("All Departments");
        });

        it("renders a SelectItem for each department option", () => {
            render(<SubjectsList />);
            DEPARTMENT_OPTIONS.forEach((dept) => {
                expect(screen.getByTestId(`select-item-${dept.value}`)).toBeInTheDocument();
            });
        });

        it("renders the create button", () => {
            render(<SubjectsList />);
            expect(screen.getByTestId("create-button")).toBeInTheDocument();
        });

        it("renders the data table", () => {
            render(<SubjectsList />);
            expect(screen.getByTestId("data-table")).toBeInTheDocument();
        });
    });

    describe("initial state", () => {
        it("search input starts empty", () => {
            render(<SubjectsList />);
            const input = screen.getByTestId("search-input") as HTMLInputElement;
            expect(input.value).toBe("");
        });

        it("department select starts with value 'all'", () => {
            render(<SubjectsList />);
            const select = screen.getByTestId("select");
            expect(select).toHaveAttribute("data-value", "all");
        });
    });

    describe("useTable integration", () => {
        it("calls useTable once on mount", () => {
            render(<SubjectsList />);
            expect(mockUseTable).toHaveBeenCalledTimes(1);
        });

        it("calls useTable with resource 'subjects'", () => {
            render(<SubjectsList />);
            const callArgs = mockUseTable.mock.calls[0][0];
            expect(callArgs.refineCoreProps?.resource).toBe("subjects");
        });

        it("calls useTable with pagination pageSize of 10", () => {
            render(<SubjectsList />);
            const callArgs = mockUseTable.mock.calls[0][0];
            expect(callArgs.refineCoreProps?.pagination?.pageSize).toBe(10);
        });

        it("calls useTable with server pagination mode", () => {
            render(<SubjectsList />);
            const callArgs = mockUseTable.mock.calls[0][0];
            expect(callArgs.refineCoreProps?.pagination?.mode).toBe("server");
        });

        it("calls useTable with initial sorter on field 'id' descending", () => {
            render(<SubjectsList />);
            const callArgs = mockUseTable.mock.calls[0][0];
            const initialSorters = callArgs.refineCoreProps?.sorters?.initial;
            expect(initialSorters).toEqual([{ field: "id", order: "desc" }]);
        });

        it("calls useTable with empty permanent filters initially (no search, no department filter)", () => {
            render(<SubjectsList />);
            const callArgs = mockUseTable.mock.calls[0][0];
            const permanentFilters = callArgs.refineCoreProps?.filters?.permanent;
            expect(permanentFilters).toEqual([]);
        });

        it("calls useTable with exactly 4 column definitions", () => {
            render(<SubjectsList />);
            const callArgs = mockUseTable.mock.calls[0][0];
            expect(callArgs.columns).toHaveLength(4);
        });

        it("defines columns for code, name, department, and description", () => {
            render(<SubjectsList />);
            const callArgs = mockUseTable.mock.calls[0][0];
            const columnIds = callArgs.columns.map((col: { id: string }) => col.id);
            expect(columnIds).toContain("code");
            expect(columnIds).toContain("name");
            expect(columnIds).toContain("department");
            expect(columnIds).toContain("description");
        });

        it("passes the useTable result to DataTable", () => {
            const mockTableResult = { rows: [], getHeaderGroups: vi.fn() };
            mockUseTable.mockReturnValue(mockTableResult as unknown as ReturnType<typeof useTable>);
            render(<SubjectsList />);
            const dataTable = screen.getByTestId("data-table");
            expect(dataTable).toBeInTheDocument();
        });
    });

    describe("search interaction", () => {
        it("updates the search input value when typed into", async () => {
            const user = userEvent.setup();
            render(<SubjectsList />);
            const input = screen.getByTestId("search-input") as HTMLInputElement;
            await user.type(input, "Math");
            expect(input.value).toBe("Math");
        });

        it("clears the search input when value is deleted", async () => {
            const user = userEvent.setup();
            render(<SubjectsList />);
            const input = screen.getByTestId("search-input") as HTMLInputElement;
            await user.type(input, "Physics");
            await user.clear(input);
            expect(input.value).toBe("");
        });
    });

    describe("department select interaction", () => {
        it("updates the selected department when changed via native select", () => {
            render(<SubjectsList />);
            const nativeSelect = screen.getByTestId("native-select") as HTMLSelectElement;
            fireEvent.change(nativeSelect, { target: { value: "Computer Science" } });
            const selectWrapper = screen.getByTestId("select");
            expect(selectWrapper).toHaveAttribute("data-value", "Computer Science");
        });

        it("resets back to 'all' when 'all' is selected", () => {
            render(<SubjectsList />);
            const nativeSelect = screen.getByTestId("native-select") as HTMLSelectElement;
            fireEvent.change(nativeSelect, { target: { value: "Computer Science" } });
            fireEvent.change(nativeSelect, { target: { value: "all" } });
            const selectWrapper = screen.getByTestId("select");
            expect(selectWrapper).toHaveAttribute("data-value", "all");
        });
    });

    describe("filter logic", () => {
        it("applies a department filter when a specific department is selected (re-renders useTable with filter)", async () => {
            render(<SubjectsList />);
            const nativeSelect = screen.getByTestId("native-select") as HTMLSelectElement;
            // "Computer Science" is included in the mock native select options
            fireEvent.change(nativeSelect, { target: { value: "Computer Science" } });

            // After state update, useTable should have been called again with department filter
            const lastCall = mockUseTable.mock.calls[mockUseTable.mock.calls.length - 1][0];
            const permanentFilters = lastCall.refineCoreProps?.filters?.permanent;
            expect(permanentFilters).toContainEqual({
                field: "department",
                operator: "eq",
                value: "Computer Science",
            });
        });

        it("applies a search filter when query is entered", async () => {
            const user = userEvent.setup();
            render(<SubjectsList />);
            const input = screen.getByTestId("search-input") as HTMLInputElement;
            await user.type(input, "C");

            // After typing, useTable should have been called with name contains filter
            const lastCall = mockUseTable.mock.calls[mockUseTable.mock.calls.length - 1][0];
            const permanentFilters = lastCall.refineCoreProps?.filters?.permanent;
            expect(permanentFilters).toContainEqual({
                field: "name",
                operator: "contains",
                value: "C",
            });
        });

        it("uses no permanent filters when department is 'all' and search is empty", () => {
            render(<SubjectsList />);
            const firstCall = mockUseTable.mock.calls[0][0];
            const permanentFilters = firstCall.refineCoreProps?.filters?.permanent;
            expect(permanentFilters).toEqual([]);
        });
    });
});