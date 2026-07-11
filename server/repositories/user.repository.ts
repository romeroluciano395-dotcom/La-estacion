import { db } from "@/server/db";

export const userRepository = {
  findByEmail(email: string) {
    return db.user.findUnique({ where: { email } });
  },

  findMany() {
    return db.user.findMany({ orderBy: { createdAt: "asc" } });
  },
};
