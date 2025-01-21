import { Sequelize } from 'sequelize-typescript';
import { Status } from './models/statuses';
import { Category } from './models/categories';

const sequelize = new Sequelize({
    dialect: "mysql", // Sesuaikan dengan database Anda
    host: "localhost",
    username: "admin",
    password: "adminlrs123",
    database: "dbticketing",
    models: [Status, Category], // Model yang perlu di-load
    logging: console.log, // Optional: untuk debugging query
});

async function connectAndSyncDB() {
    try {
        // Tes koneksi ke database
        await sequelize.authenticate();
        console.log('Koneksi database berhasil');

        // Sinkronisasi model
        await sequelize.sync; 
        console.log('Sinkronisasi model berhasil');
    } catch (error) {
        console.error('Gagal menghubungkan atau menyinkronkan database:', error);
    }
}

// Jalankan koneksi dan sinkronisasi
connectAndSyncDB();

export default sequelize;
