import { describe, expect, it } from 'bun:test';
import Elysia from 'elysia';

// GET Tests
describe("GET Tests", () => {
    describe("GET STATUSES", () => {
        it("should return a list of statuses", async () => {
            const response = await fetch("http://localhost:3000/master/statuses");
            const data = await response.json();
            expect(response.status).toBe(200);
            expect(data).toHaveProperty("data");
        });
    });

    describe("GET CATEGORIES", () => {
        it("should return a list of categories", async () => {
            const response = await fetch("http://localhost:3000/master/categories");
            const data = await response.json();
            expect(response.status).toBe(200);
            expect(data).toHaveProperty("data");
        });
    });
});

// POST Tests
describe("POST Tests", () => {
    describe("POST STATUSES", () => {
        it("should create a new status", async () => {
            const response = await fetch("http://localhost:3000/master/statuses", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: "New Status" })
            });
            const data = await response.json();
            expect(response.status).toBe(200);
            expect(data).toHaveProperty("data");
        });

        it("should return 400 for invalid status creation", async () => {
            const response = await fetch("http://localhost:3000/master/statuses", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({})
            });
            expect(response.status).toBe(400);
        });
    });

    describe("POST CATEGORIES", () => {
        it("should create a new category", async () => {
            const response = await fetch("http://localhost:3000/master/categories", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: "New Category" })
            });
            const data = await response.json();
            expect(response.status).toBe(200);
            expect(data).toHaveProperty("data");
        });
    });
});

// PATCH Tests
describe("PATCH Tests", () => {
    describe("PATCH STATUSES", () => {
        it("should update an existing status", async () => {
            const response = await fetch("http://localhost:3000/master/statuses/1", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: "Updated Status" })
            });
            const data = await response.json();
            expect(response.status).toBe(200);
            expect(data).toHaveProperty("data");
        });

        it("should return 400 for non-existent status", async () => {
            const response = await fetch("http://localhost:3000/master/statuses/999", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: "Non-existent Status" })
            });
            expect(response.status).toBe(400);
        });
    });

    describe("PATCH CATEGORIES", () => {
        it("should update an existing category", async () => {
            const response = await fetch("http://localhost:3000/master/categories/1", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: "Updated Category" })
            });
            const data = await response.json();
            expect(response.status).toBe(200);
            expect(data).toHaveProperty("data");
        });
    });
});

// DELETE Tests
describe("DELETE Tests", () => {
    describe("DELETE STATUSES", () => {
        it("should delete an existing status", async () => {
            const response = await fetch("http://localhost:3000/master/statuses/1", {
                method: "DELETE"
            });
            const data = await response.json();
            expect(response.status).toBe(200);
            expect(data).toHaveProperty("data");
        });

        it("should return 400 for non-existent status", async () => {
            const response = await fetch("http://localhost:3000/master/statuses/999", {
                method: "DELETE"
            });
            expect(response.status).toBe(400);
        });
    });

    describe("DELETE CATEGORIES", () => {
        it("should delete an existing category", async () => {
            const response = await fetch("http://localhost:3000/master/categories/1", {
                method: "DELETE"
            });
            const data = await response.json();
            expect(response.status).toBe(200);
            expect(data).toHaveProperty("data");
        });
    });
});
