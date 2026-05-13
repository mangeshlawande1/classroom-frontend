import { describe, it, expect } from "vitest";
import { UserRole } from "@/types/index.ts";

describe("UserRole enum", () => {
    it("STUDENT value is 'student'", () => {
        expect(UserRole.STUDENT).toBe("student");
    });

    it("TEACHER value is 'teacher'", () => {
        expect(UserRole.TEACHER).toBe("teacher");
    });

    it("ADMIN value is 'admin'", () => {
        expect(UserRole.ADMIN).toBe("admin");
    });

    it("has exactly three members accessible by name", () => {
        // TypeScript string enums are one-directional (name → value only)
        const keys = Object.keys(UserRole);
        expect(keys).toHaveLength(3);
    });

    it("all values are lowercase strings", () => {
        Object.values(UserRole).forEach((value) => {
            expect(value).toBe(value.toLowerCase());
            expect(typeof value).toBe("string");
        });
    });

    it("STUDENT, TEACHER and ADMIN are all distinct values", () => {
        const values = [UserRole.STUDENT, UserRole.TEACHER, UserRole.ADMIN];
        const unique = new Set(values);
        expect(unique.size).toBe(3);
    });

    it("can be used as a value in a role-check comparison", () => {
        const role: string = "teacher";
        expect(role === UserRole.TEACHER).toBe(true);
        expect(role === UserRole.STUDENT).toBe(false);
        expect(role === UserRole.ADMIN).toBe(false);
    });

    it("contains the string 'student', 'teacher', and 'admin' in its values", () => {
        const values = Object.values(UserRole);
        expect(values).toContain("student");
        expect(values).toContain("teacher");
        expect(values).toContain("admin");
    });
});