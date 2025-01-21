import { Status, StatusEntity } from "../models/statuses";
import sequelize from "../db";
import { Elysia, } from "elysia";

const app = new Elysia();

app.get("/master/statuses", async () => {
    try {
      console.log("📥 Menjalankan query untuk mengambil status...");
  
      // Pastikan koneksi database telah selesai
      if (!sequelize.isDefined('Status')) {
        throw new Error('Model Status belum terinisialisasi!');
      }
  
      // Ambil status dengan is_active = 1
      const status = await Status.findAll({
        where: {
          is_active: 1, // Cari status dengan is_active = 1
        },
      });
  
      console.log("✅ Query berhasil, hasil:", status);
  
      // Jika data kosong, kembalikan response 500
      if (status.length === 0) {
        return {
          code: 500,
          message: "Data status tidak dapat ditemukan", // Jika tidak ada data dengan is_active = 1
        };
      }
  
      return {
        code: 200,
        message: "Data status ditemukan",
        data: status,
      };
    } catch (error) {
      console.error("❌ Error saat mengambil data:", error);
      return {
        code: 500,
        message: "Data status tidak dapat ditemukan",
      };
    }
  });

  interface StatusRequestBody {
    name: string;
    is_active?: number; // is_active optional, default ke 0 jika tidak diberikan
  }
  
  // POST - Tambah Status
  app.post("/master/statuses", async (req) => {
    try {
      // Cast req.body ke tipe StatusRequestBody
      const { name, is_active }: StatusRequestBody = req.body as StatusRequestBody;  // Ambil data dari request body
  
      // Validasi data
      if (!name) {
        return {
          code: 400,
          message: "Nama status wajib diisi",  // Jika nama tidak ada
        };
      }
  
      // Definisikan objek yang hanya berisi kolom yang dapat diisi (name, is_active)
      const statusData: StatusEntity = {
        name: name,
        is_active: is_active || 0,  // Default ke 0 jika is_active tidak diberikan
      };
  
      // Tambahkan status baru ke database
      const status = await Status.create(statusData);
  
      return {
        code: 201,
        message: "Data status berhasil ditambahkan",
        data: status,  // Kembalikan data status yang baru dibuat
      };
    } catch (error) {
      console.error("❌ Error saat menambahkan data status:", error);
      return {
        code: 500,
        message: "Gagal menambahkan data status",
      };
    }
  });
  
  app.patch("/master/statuses/:id", async (req) => {
    try {
      const id = req.params.id; // Ambil ID dari parameter URL
      const { name, is_active }: Partial<StatusRequestBody> = req.body as StatusRequestBody;
  
      // Validasi ID
      const status = await Status.findByPk(id);
      if (!status) {
        return {
          code: 404,
          message: "Data status tidak ditemukan", // Jika ID tidak ditemukan
        };
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
  
  app.delete("/master/statuses/:id", async (req) => {
    try {
      const id = req.params.id; // Ambil ID dari parameter URL
  
      // Validasi ID
      const status = await Status.findByPk(id);
      if (!status) {
        return {
          code: 404,
          message: "Data status tidak ditemukan", // Jika ID tidak ditemukan
        };
      }
  
      // Soft delete dengan mengisi deleted_at
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
  