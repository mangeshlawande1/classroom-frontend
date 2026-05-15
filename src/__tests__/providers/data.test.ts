import { describe, it, expect } from "vitest";
import { dataProvider } from "@/providers/data.ts";
import { MOCK_SUBJECTS } from "@/constants/mock-data.ts";

describe("dataProvider", () => {
    describe("getApiUrl", () => {
        it("returns an empty string", () => {
            expect(dataProvider.getApiUrl()).toBe("");
        });
    });

    describe("getList", () => {
        it("returns all mock subjects when resource is 'subjects'", async () => {
            const result = await dataProvider.getList({ resource: "subjects" } as Parameters<typeof dataProvider.getList>[0]);
            expect(result.data).toEqual(MOCK_SUBJECTS);
        });

        it("returns the correct total count equal to MOCK_SUBJECTS length", async () => {
            const result = await dataProvider.getList({ resource: "subjects" } as Parameters<typeof dataProvider.getList>[0]);
            expect(result.total).toBe(MOCK_SUBJECTS.length);
        });

        it("returns total of 3 for 'subjects' resource", async () => {
            const result = await dataProvider.getList({ resource: "subjects" } as Parameters<typeof dataProvider.getList>[0]);
            expect(result.total).toBe(3);
        });

        it("returns empty data array when resource is not 'subjects'", async () => {
            const result = await dataProvider.getList({ resource: "classes" } as Parameters<typeof dataProvider.getList>[0]);
            expect(result.data).toEqual([]);
        });

        it("returns total of 0 when resource is not 'subjects'", async () => {
            const result = await dataProvider.getList({ resource: "classes" } as Parameters<typeof dataProvider.getList>[0]);
            expect(result.total).toBe(0);
        });

        it("returns empty data for 'teachers' resource", async () => {
            const result = await dataProvider.getList({ resource: "teachers" } as Parameters<typeof dataProvider.getList>[0]);
            expect(result.data).toEqual([]);
            expect(result.total).toBe(0);
        });

        it("returns empty data for 'users' resource", async () => {
            const result = await dataProvider.getList({ resource: "users" } as Parameters<typeof dataProvider.getList>[0]);
            expect(result.data).toEqual([]);
            expect(result.total).toBe(0);
        });

        it("returns empty data for an empty string resource", async () => {
            const result = await dataProvider.getList({ resource: "" } as Parameters<typeof dataProvider.getList>[0]);
            expect(result.data).toEqual([]);
            expect(result.total).toBe(0);
        });

        it("returned subject data has the expected shape (id, code, name, department, description)", async () => {
            const result = await dataProvider.getList({ resource: "subjects" } as Parameters<typeof dataProvider.getList>[0]);
            const firstSubject = result.data[0] as Record<string, unknown>;
            expect(firstSubject).toHaveProperty("id");
            expect(firstSubject).toHaveProperty("code");
            expect(firstSubject).toHaveProperty("name");
            expect(firstSubject).toHaveProperty("department");
            expect(firstSubject).toHaveProperty("description");
        });

        it("data length matches total for 'subjects'", async () => {
            const result = await dataProvider.getList({ resource: "subjects" } as Parameters<typeof dataProvider.getList>[0]);
            expect(result.data.length).toBe(result.total);
        });

        it("data is consistent across multiple calls", async () => {
            const result1 = await dataProvider.getList({ resource: "subjects" } as Parameters<typeof dataProvider.getList>[0]);
            const result2 = await dataProvider.getList({ resource: "subjects" } as Parameters<typeof dataProvider.getList>[0]);
            expect(result1.data).toEqual(result2.data);
        });
    });

    describe("getOne", () => {
        it("throws an error with the mock error message", async () => {
            await expect(
                dataProvider.getOne({ resource: "subjects", id: 1 })
            ).rejects.toThrow("This function is not present in mock");
        });

        it("throws an Error instance", async () => {
            await expect(
                dataProvider.getOne({ resource: "subjects", id: 1 })
            ).rejects.toBeInstanceOf(Error);
        });
    });

    describe("create", () => {
        it("throws an error with the mock error message", async () => {
            await expect(
                dataProvider.create({ resource: "subjects", variables: {} })
            ).rejects.toThrow("This function is not present in mock");
        });

        it("throws an Error instance", async () => {
            await expect(
                dataProvider.create({ resource: "subjects", variables: {} })
            ).rejects.toBeInstanceOf(Error);
        });
    });

    describe("update", () => {
        it("throws an error with the mock error message", async () => {
            await expect(
                dataProvider.update({ resource: "subjects", id: 1, variables: {} })
            ).rejects.toThrow("This function is not present in mock");
        });

        it("throws an Error instance", async () => {
            await expect(
                dataProvider.update({ resource: "subjects", id: 1, variables: {} })
            ).rejects.toBeInstanceOf(Error);
        });
    });

    describe("deleteOne", () => {
        it("throws an error with the mock error message", async () => {
            await expect(
                dataProvider.deleteOne({ resource: "subjects", id: 1 })
            ).rejects.toThrow("This function is not present in mock");
        });

        it("throws an Error instance", async () => {
            await expect(
                dataProvider.deleteOne({ resource: "subjects", id: 1 })
            ).rejects.toBeInstanceOf(Error);
        });
    });
});