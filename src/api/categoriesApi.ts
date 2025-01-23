import { Category, CategoriesEntity } from "../models/categories";
import sequelize from "../db";
import { Elysia, } from "elysia";

const app = new Elysia();


app.get("/master/categories", async () => {
  try {
    console.log("📥 Menjalankan query untuk mengambil kategori...");

    if (!sequelize.isDefined('Category')) {
      throw new Error('Model Category belum terinialisasi!');
    }

    const category = await Category.findAll({
      where: {
        is_active: 1,
      },
    });

    console.log("✅ Query berhasil, hasil:", category);

    if (category.length === 0){
      return {
        code: 404,
        message: "Data categories tidak dapat ditemukan",
        data: [],
      };  
    }
    return {
      code: 200,
      message: "Data categories ditemukan",
      data: category,
    };
  } catch (error) {
    console.error("❌ Error saat mengambil data:", error);
    return {
      code: 500,
      message: "Data categories tidak dapat ditemukan",
    };
  }
});


// Definisikan tipe untuk body request

interface CategoriesRequestBody {
  name: string;
  is_active?: number;
}

app.post("/master/categories", async ({error, body}) => {
  try {
    // Cast req.body ke tipe StatusRequestBody
    const { name, is_active }: CategoriesRequestBody = body as CategoriesRequestBody;  // Ambil data dari request body

    // Validasi data
    if (!body || Object.keys(body).length === 0) {
      return error(400, "Nama status tidak boleh kosong");
    }

    // Definisikan objek yang hanya berisi kolom yang dapat diisi (name, is_active)
    const categorydata: CategoriesEntity = {
      name: name,
      is_active: is_active || 0,  // Default ke 0 jika is_active tidak diberikan
    };

    // Tambahkan status baru ke database
    const category = await Category.create(categorydata);

    return {
      code: 200,
      message: "Data category berhasil ditambahkan",
      data: category,  // Kembalikan data status yang baru dibuat
    };
  } catch (error) {
    console.error("❌ Error saat menambahkan data category:", error);
    return {
      code: 500,
      message: "Gagal menambahkan data category",
    };
  }
});

// PATCH - Edit Status

// PATCH - Edit Category
app.patch("/master/categories/:id", async ({error, params,body}) => {
  try {
    const id = params.id; // Ambil ID dari parameter URL
    const { name, is_active }: Partial<CategoriesRequestBody> = body as CategoriesRequestBody;

    // Validasi ID
    const category = await Category.findByPk(id);
    if (!category) {
      return error(400, "Id tidak dapat ditemukan!");
    }

    // Update data
    if (name) category.name = name;
    if (is_active !== undefined) category.is_active = is_active;
    await category.save();

    return {
      code: 200,
      message: "Data category berhasil diperbarui",
      data: category,
    };
  } catch (error) {
    console.error("❌ Error saat mengedit data category:", error);
    return {
      code: 500,
      message: "Gagal mengedit data category",
    };
  }
});

// SOFT DELETE - Hapus Status

// SOFT DELETE - Hapus Category
app.delete("/master/categories/:id", async ({error, params}) => {
  try {
    const id = params.id; // Ambil ID dari parameter URL

    // Validasi ID
    const category = await Category.findByPk(id);
    if (!category) {
      return error(400, "Id tidak dapat ditemukan!");
    }

    // Soft delete dengan mengisi deleted_at
    category.deleted_at = new Date();
    await category.save();

    return {
      code: 200,
      message: "Data category berhasil dihapus (soft delete)",
      data: category,
    };
  } catch (error) {
    console.error("❌ Error saat menghapus data category:", error);
    return {
      code: 500,
      message: "Gagal menghapus data category",
    };
  }
});

export default app;