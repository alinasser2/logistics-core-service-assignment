import { DataSource } from 'typeorm';
import { Status } from '../shipment/entities/status.entity';
import { Shipment } from '../shipment/entities/shipment.entity';

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'logistics.db',
  entities: [Status, Shipment],
  synchronize: true,
});

async function seed() {
  await AppDataSource.initialize();

  const statusRepo = AppDataSource.getRepository(Status);

  const statuses = ['Ready to Pick Up', 'Out for Delivery', 'Delivered'];

  for (const name of statuses) {
    const exists = await statusRepo.findOne({ where: { name } });
    if (!exists) {
      const status = statusRepo.create({ name });
      await statusRepo.save(status);
    }
  }

  console.log('✅ Seeding complete!');
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});

