import { PrismaClient } from '@prisma/client';
import { getFilesFromPath } from '../../../util/get-files-from-path';
import { randomUUID } from 'crypto';

export async function seedFiles(
  prisma: PrismaClient,
  dataDirectory: string,
): Promise<void> {
  const fileList = getFilesFromPath(dataDirectory);
  for (const path of fileList) {
    await prisma.file.create({ data: { id: randomUUID() as string, path } });
  }
}
