import type { Prisma } from "@prisma/client";
import { db } from "@/server/db";

export const settingsRepository = {
  get() {
    return db.settings.findFirst();
  },

  update(id: string, data: Prisma.SettingsUpdateInput) {
    return db.settings.update({ where: { id }, data });
  },
};
