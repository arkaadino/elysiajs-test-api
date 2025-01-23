import { Elysia } from "elysia";
import sequelize from "./db";
import statusesApi from "./api/statusesApi"; // Match the existing file name
import categoriesApi from "./api/categoriesApi"; // Match the existing file name

const app = new Elysia();

app.get("/", () => "Hello Elysia");

// Use the API routes
app.use(statusesApi);
app.use(categoriesApi);

sequelize.authenticate().then(() => {
    console.log('✅ Database terhubung. Memulai server...');
    const server = app.listen(3001);
    console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
}).catch(err => {
    console.error('❌ Gagal menghubungkan database:', err);
});

export default app;