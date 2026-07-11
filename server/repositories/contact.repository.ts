import type { Prisma } from "@prisma/client";
import { db } from "@/server/db";

export const contactRepository = {
  findMany() {
    return db.contact.findMany({ orderBy: { createdAt: "desc" } });
  },

  create(data: Prisma.ContactCreateInput) {
    return db.contact.create({ data });
  },

  setRead(id: string, read: boolean) {
    return db.contact.update({ where: { id }, data: { read } });
  },

  delete(id: string) {
    return db.contact.delete({ where: { id } });
  },

  countUnread() {
    return db.contact.count({ where: { read: false } });
  },
};
