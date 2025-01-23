import sequelize from '../db'; // Adjusted path
import { Status } from '../models/statuses'; // Adjusted path
import { Category } from '../models/categories'; // Adjusted path

async function seedDatabase() {
    try {
        // Ensure the database connection is established
        await sequelize.authenticate();
        console.log('Koneksi database berhasil');

        // Create initial statuses
        await Status.bulkCreate([
            { name: 'Selesai', is_active: 1 },
            { name: 'Pending', is_active: 0 },
            { name: 'Open', is_active: 0 },
            { name: 'On Going', is_active: 0 },
        ]);

        // Create initial categories
        await Category.bulkCreate([
            { name: 'Jaringan', is_active: 1 },
            { name: 'Aplikasi', is_active: 0 },
            { name: 'Data Center', is_active: 0 },
            { name: 'Printer', is_active: 0 },
            { name: 'Laptop/PC', is_active: 0 },
            { name: 'Email', is_active: 0 },
        ]);

        console.log('Database seeded successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
}

// Run the seeding function
seedDatabase();
