import { Status, StatusEntity } from "../models/statuses";
import sequelize from "../db";
import { Elysia } from "elysia";

const app = new Elysia();

app.get("/master/statuses", async () => {
  try {
    console.log("📥 Menjalankan query untuk mengambil status...");

    if (!sequelize.isDefined('Status')) {
      throw new Error('Model Status belum terinisialisasi!');
    }

    const status = await Status.findAll({
      where: {
        is_active: 1,
      },
    });

    console.log("✅ Query berhasil, hasil:", status);

    if (status.length === 0){
      return {
        code: 404,
        message: "Data status tidak dapat ditemukan",
        data: [], // Return an empty array if no statuses found
      };  
    }
    return {
      code: 200,
      message: "Data status ditemukan",
      data: status, // Return the data array
    };
  } catch (error) {
    console.error("❌ Error saat mengambil data:", error);
    return {
      code: 500,
      message: "Data status tidak dapat ditemukan",
    };
  }
});

// Define type for request body
interface StatusRequestBody {
  name: string;
  is_active?: number;
}

app.post("/master/statuses", async ({error, body, params}) => {
  try {
    // Check if the request body is JSON

    const { name, is_active }: StatusRequestBody = body as StatusRequestBody;

    // Validate data
    if (!body || Object.keys(body).length === 0) {
      return error(400, "Nama status tidak boleh kosong");
    }

    const statusData: StatusEntity = {
      name: name,
      is_active: is_active || 0,  // Default to 0 if is_active is not provided
    };

    const status = await Status.create(statusData);

    return {
      code: 200,
      message: "Data status berhasil ditambahkan",
      data: status,  // Return the newly created status data
    };
  } catch (error) {
    console.error("❌ Error saat menambahkan data status:", error);
    return {
      code: 500,
      message: "Gagal menambahkan data status",
    };
  }
});

// PATCH - Edit Status
app.patch("/master/statuses/:id", async ({error, body, params}) => {
  try {
    const id = params.id; // Get ID from URL parameter

    const { name, is_active }: Partial<StatusRequestBody> = body as StatusRequestBody;

    // Validate ID
    const status = await Status.findByPk(id);
    if (!status) {
      return error(400, "Id tidak dapat ditemukan!");
    }

    // Update data
    if (name) status.name = name;
    if (is_active !== undefined) status.is_active = is_active;
    await status.save();

    return {
      code: 200,
      message: "Data status berhasil diperbarui",
      data: status,
    };
  } catch (error) {
    console.error("❌ Error saat mengedit data status:", error);
    return {
      code: 500,
      message: "Gagal mengedit data status",
    };
  }
});

// SOFT DELETE - Hapus Status
app.delete("/master/statuses/:id", async ({error, params}) => {
  try {
    const id = params.id; // Get ID from URL parameter

    // Validate ID
    const status = await Status.findByPk(id);
    if (!status) {
      return error(400, "Id tidak dapat ditemukan!");
    }

    // Soft delete by setting deleted_at
    status.deleted_at = new Date();
    await status.save();

    return {
      code: 200,
      message: "Data status berhasil dihapus (soft delete)",
      data: status,
    };
  } catch (error) {
    console.error("❌ Error saat menghapus data status:", error);
    return {
      code: 500,
      message: "Gagal menghapus data status",
    };
  }
});

export default app;
