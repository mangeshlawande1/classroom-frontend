import { describe, it, expect } from "vitest";
import { MOCK_SUBJECTS } from "@/constants/mock-data.ts";

describe("MOCK_SUBJECTS", () => {
    it("is an array", () => {
        expect(Array.isArray(MOCK_SUBJECTS)).toBe(true);
    });

    it("contains exactly three subjects", () => {
        expect(MOCK_SUBJECTS).toHaveLength(3);
    });

    describe("required fields on each subject", () => {
        it("every subject has a numeric id", () => {
            MOCK_SUBJECTS.forEach((subject) => {
                expect(typeof subject.id).toBe("number");
            });
        });

        it("every subject has a non-empty code string", () => {
            MOCK_SUBJECTS.forEach((subject) => {
                expect(typeof subject.code).toBe("string");
                expect(subject.code.trim().length).toBeGreaterThan(0);
            });
        });

        it("every subject has a non-empty name string", () => {
            MOCK_SUBJECTS.forEach((subject) => {
                expect(typeof subject.name).toBe("string");
                expect(subject.name.trim().length).toBeGreaterThan(0);
            });
        });

        it("every subject has a non-empty department string", () => {
            MOCK_SUBJECTS.forEach((subject) => {
                expect(typeof subject.department).toBe("string");
                expect(subject.department.trim().length).toBeGreaterThan(0);
            });
        });

        it("every subject has a non-empty description string", () => {
            MOCK_SUBJECTS.forEach((subject) => {
                expect(typeof subject.description).toBe("string");
                expect(subject.description.trim().length).toBeGreaterThan(0);
            });
        });

        it("every subject has a createdAt ISO string", () => {
            MOCK_SUBJECTS.forEach((subject) => {
                expect(subject.createdAt).toBeDefined();
                expect(typeof subject.createdAt).toBe("string");
                // Verify it parses as a valid date
                const parsed = new Date(subject.createdAt as string);
                expect(isNaN(parsed.getTime())).toBe(false);
            });
        });
    });

    describe("individual subject data", () => {
        it("first subject is Introduction to Computer Science with id 1", () => {
            const first = MOCK_SUBJECTS[0];
            expect(first.id).toBe(1);
            expect(first.code).toBe("CS101");
            expect(first.name).toBe("Introduction to Computer Science");
            expect(first.department).toBe("CS");
        });

        it("second subject is Calculus II with id 2", () => {
            const second = MOCK_SUBJECTS[1];
            expect(second.id).toBe(2);
            expect(second.code).toBe("MATH201");
            expect(second.name).toBe("Calculus II");
            expect(second.department).toBe("Math");
        });

        it("third subject is Literature and Composition with id 3", () => {
            const third = MOCK_SUBJECTS[2];
            expect(third.id).toBe(3);
            expect(third.code).toBe("ENG102");
            expect(third.name).toBe("Literature and Composition");
            expect(third.department).toBe("English");
        });

        it("first subject description mentions computer science", () => {
            expect(MOCK_SUBJECTS[0].description.toLowerCase()).toContain("computer science");
        });

        it("second subject description mentions integration or series", () => {
            const desc = MOCK_SUBJECTS[1].description.toLowerCase();
            expect(desc.match(/integration|series/)).not.toBeNull();
        });
    });

    describe("data integrity", () => {
        it("subject ids are unique", () => {
            const ids = MOCK_SUBJECTS.map((s) => s.id);
            const unique = new Set(ids);
            expect(unique.size).toBe(MOCK_SUBJECTS.length);
        });

        it("subject codes are unique", () => {
            const codes = MOCK_SUBJECTS.map((s) => s.code);
            const unique = new Set(codes);
            expect(unique.size).toBe(MOCK_SUBJECTS.length);
        });

        it("subject names are unique", () => {
            const names = MOCK_SUBJECTS.map((s) => s.name);
            const unique = new Set(names);
            expect(unique.size).toBe(MOCK_SUBJECTS.length);
        });

        it("ids are sequential starting from 1", () => {
            const ids = MOCK_SUBJECTS.map((s) => s.id).sort((a, b) => a - b);
            expect(ids).toEqual([1, 2, 3]);
        });
    });
});