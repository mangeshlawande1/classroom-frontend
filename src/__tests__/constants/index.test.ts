import { describe, it, expect } from "vitest";
import {
    USER_ROLES,
    ROLE_OPTIONS,
    DEPARTMENTS,
    DEPARTMENT_OPTIONS,
    MAX_FILE_SIZE,
    ALLOWED_TYPES,
    teachers,
    subjects,
} from "@/constants/index.ts";

describe("USER_ROLES", () => {
    it("defines the STUDENT role as 'student'", () => {
        expect(USER_ROLES.STUDENT).toBe("student");
    });

    it("defines the TEACHER role as 'teacher'", () => {
        expect(USER_ROLES.TEACHER).toBe("teacher");
    });

    it("defines the ADMIN role as 'admin'", () => {
        expect(USER_ROLES.ADMIN).toBe("admin");
    });

    it("contains exactly three roles", () => {
        expect(Object.keys(USER_ROLES)).toHaveLength(3);
    });

    it("all role values are lowercase strings", () => {
        Object.values(USER_ROLES).forEach((role) => {
            expect(role).toBe(role.toLowerCase());
        });
    });
});

describe("ROLE_OPTIONS", () => {
    it("contains exactly two options", () => {
        expect(ROLE_OPTIONS).toHaveLength(2);
    });

    it("includes a student option with the correct value and label", () => {
        const studentOption = ROLE_OPTIONS.find(
            (opt) => opt.value === USER_ROLES.STUDENT
        );
        expect(studentOption).toBeDefined();
        expect(studentOption?.label).toBe("Student");
    });

    it("includes a teacher option with the correct value and label", () => {
        const teacherOption = ROLE_OPTIONS.find(
            (opt) => opt.value === USER_ROLES.TEACHER
        );
        expect(teacherOption).toBeDefined();
        expect(teacherOption?.label).toBe("Teacher");
    });

    it("every option has a value, label, and icon", () => {
        ROLE_OPTIONS.forEach((option) => {
            expect(option).toHaveProperty("value");
            expect(option).toHaveProperty("label");
            expect(option).toHaveProperty("icon");
            expect(typeof option.value).toBe("string");
            expect(typeof option.label).toBe("string");
            // Lucide icons are React forwardRef objects, not plain functions
            expect(option.icon).toBeTruthy();
        });
    });

    it("option values match USER_ROLES values", () => {
        const roleValues = Object.values(USER_ROLES);
        ROLE_OPTIONS.forEach((option) => {
            expect(roleValues).toContain(option.value);
        });
    });

    it("does not include an ADMIN role option", () => {
        const adminOption = ROLE_OPTIONS.find(
            (opt) => opt.value === USER_ROLES.ADMIN
        );
        expect(adminOption).toBeUndefined();
    });
});

describe("DEPARTMENTS", () => {
    it("contains 20 departments", () => {
        expect(DEPARTMENTS).toHaveLength(20);
    });

    it("includes expected departments", () => {
        expect(DEPARTMENTS).toContain("Computer Science");
        expect(DEPARTMENTS).toContain("Mathematics");
        expect(DEPARTMENTS).toContain("Physics");
        expect(DEPARTMENTS).toContain("Chemistry");
        expect(DEPARTMENTS).toContain("Biology");
        expect(DEPARTMENTS).toContain("English");
        expect(DEPARTMENTS).toContain("History");
        expect(DEPARTMENTS).toContain("Geography");
        expect(DEPARTMENTS).toContain("Economics");
        expect(DEPARTMENTS).toContain("Business Administration");
        expect(DEPARTMENTS).toContain("Engineering");
        expect(DEPARTMENTS).toContain("Law");
    });

    it("all entries are non-empty strings", () => {
        DEPARTMENTS.forEach((dept) => {
            expect(typeof dept).toBe("string");
            expect(dept.trim().length).toBeGreaterThan(0);
        });
    });

    it("has no duplicate department names", () => {
        const unique = new Set(DEPARTMENTS);
        expect(unique.size).toBe(DEPARTMENTS.length);
    });
});

describe("DEPARTMENT_OPTIONS", () => {
    it("has the same length as DEPARTMENTS", () => {
        expect(DEPARTMENT_OPTIONS).toHaveLength(DEPARTMENTS.length);
    });

    it("each option has matching value and label equal to the department name", () => {
        DEPARTMENT_OPTIONS.forEach((option, index) => {
            expect(option.value).toBe(DEPARTMENTS[index]);
            expect(option.label).toBe(DEPARTMENTS[index]);
            expect(option.value).toBe(option.label);
        });
    });

    it("every option has a value and label property", () => {
        DEPARTMENT_OPTIONS.forEach((option) => {
            expect(option).toHaveProperty("value");
            expect(option).toHaveProperty("label");
        });
    });

    it("preserves the order of DEPARTMENTS", () => {
        const values = DEPARTMENT_OPTIONS.map((o) => o.value);
        expect(values).toEqual([...DEPARTMENTS]);
    });
});

describe("MAX_FILE_SIZE", () => {
    it("equals 3MB in bytes", () => {
        expect(MAX_FILE_SIZE).toBe(3 * 1024 * 1024);
    });

    it("equals 3145728 bytes", () => {
        expect(MAX_FILE_SIZE).toBe(3145728);
    });

    it("is a positive number", () => {
        expect(MAX_FILE_SIZE).toBeGreaterThan(0);
    });
});

describe("ALLOWED_TYPES", () => {
    it("contains exactly four image mime types", () => {
        expect(ALLOWED_TYPES).toHaveLength(4);
    });

    it("includes image/png", () => {
        expect(ALLOWED_TYPES).toContain("image/png");
    });

    it("includes image/jpeg", () => {
        expect(ALLOWED_TYPES).toContain("image/jpeg");
    });

    it("includes image/jpg", () => {
        expect(ALLOWED_TYPES).toContain("image/jpg");
    });

    it("includes image/webp", () => {
        expect(ALLOWED_TYPES).toContain("image/webp");
    });

    it("all entries start with 'image/'", () => {
        ALLOWED_TYPES.forEach((type) => {
            expect(type.startsWith("image/")).toBe(true);
        });
    });

    it("does not include non-image types such as application/pdf", () => {
        expect(ALLOWED_TYPES).not.toContain("application/pdf");
    });
});

describe("teachers", () => {
    it("contains exactly three teachers", () => {
        expect(teachers).toHaveLength(3);
    });

    it("each teacher has a string id and a name", () => {
        teachers.forEach((teacher) => {
            expect(typeof teacher.id).toBe("string");
            expect(typeof teacher.name).toBe("string");
            expect(teacher.name.trim().length).toBeGreaterThan(0);
        });
    });

    it("includes John Doe with id '1'", () => {
        expect(teachers).toContainEqual({ id: "1", name: "John Doe" });
    });

    it("includes Jane Smith with id '2'", () => {
        expect(teachers).toContainEqual({ id: "2", name: "Jane Smith" });
    });

    it("includes Dr. Alan Turing with id '3'", () => {
        expect(teachers).toContainEqual({ id: "3", name: "Dr. Alan Turing" });
    });

    it("ids are unique", () => {
        const ids = teachers.map((t) => t.id);
        const unique = new Set(ids);
        expect(unique.size).toBe(teachers.length);
    });
});

describe("subjects", () => {
    it("contains exactly four subjects", () => {
        expect(subjects).toHaveLength(4);
    });

    it("each subject has a numeric id, a name, and a code", () => {
        subjects.forEach((subject) => {
            expect(typeof subject.id).toBe("number");
            expect(typeof subject.name).toBe("string");
            expect(typeof subject.code).toBe("string");
            expect(subject.name.trim().length).toBeGreaterThan(0);
            expect(subject.code.trim().length).toBeGreaterThan(0);
        });
    });

    it("includes Mathematics with code MATH", () => {
        expect(subjects).toContainEqual({ id: 1, name: "Mathematics", code: "MATH" });
    });

    it("includes Computer Science with code CS", () => {
        expect(subjects).toContainEqual({ id: 2, name: "Computer Science", code: "CS" });
    });

    it("includes Physics with code PHY", () => {
        expect(subjects).toContainEqual({ id: 3, name: "Physics", code: "PHY" });
    });

    it("includes Chemistry with code CHEM", () => {
        expect(subjects).toContainEqual({ id: 4, name: "Chemistry", code: "CHEM" });
    });

    it("ids are unique", () => {
        const ids = subjects.map((s) => s.id);
        const unique = new Set(ids);
        expect(unique.size).toBe(subjects.length);
    });

    it("codes are uppercase", () => {
        subjects.forEach((subject) => {
            expect(subject.code).toBe(subject.code.toUpperCase());
        });
    });
});