import { PrismaClient } from "@prisma/client";
import { TrackSeeder } from "./track.seed";
import { seedFiles } from "./file.seed";
import path from "path";

export async function seed(): Promise<void> {
  const dir = "D:\\TRACKS\\downloads";
  const prisma = new PrismaClient();
  try {
    const trackSeeder = new TrackSeeder(prisma);
    const tracksDirectory = path.join(".", "input", "tracks");
    await trackSeeder.execute(tracksDirectory);
    await seedFiles(prisma, dir);
    await prisma.$disconnect();
  } catch (e) {
    console.error(e);
    console.log(
      "Database seed could not be completed. Probably the data already exists"
    );
    await prisma.$disconnect();
    process.exit(0);
  }
}

seed();
