import { Elysia } from "elysia";
import sequelize from "./db";
import statusesAPI from "./api/statusesAPI"; // Match the existing file name
import categoriesAPI from "./api/categoriesAPI"; // Match the existing file name

const app = new Elysia();

app.get("/", () => "Hello Elysia");

// Use the API routes
app.use(statusesAPI);
app.use(categoriesAPI);

sequelize.authenticate().then(() => {
    console.log('✅ Database terhubung. Memulai server...');
    app.listen(3000);
    console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
}).catch(err => {
    console.error('❌ Gagal menghubungkan database:', err);
});
