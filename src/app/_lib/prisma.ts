import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

declare global{
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// 1. No Next.js/Node, usamos process.env
const connectionString = process.env.DATABASE_URL;

// 2. Criamos o pool de conexão do PostgreSQL
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);

if(process.env.NODE_ENV === "production"){
 // 3. Instanciamos o cliente com o adaptador
   prisma = new PrismaClient({
  adapter,
});
}else{
  // 4. Evitamos múltiplas instâncias no desenvolvimento
  if(!global.prisma){  
    global.prisma = new PrismaClient({
      adapter,
    });
  }
}
export const db = global.prisma || prisma!;