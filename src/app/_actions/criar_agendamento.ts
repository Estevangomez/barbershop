"use server";

import { revalidatePath } from "next/cache";
import { db } from "../_lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";

interface createAgendamento {
  userId: string;
  servicoId: string;
  barbeariaId: string;
  date: Date;
}

export const createAgendamento = async (params: createAgendamento) => {   
    const user = await getServerSession(authOptions)

    if (!user?.user) {
        throw new Error("Usuario nao autenticado")
    }
    await  db.agendamento.create({
        data: params
    })

    revalidatePath("/barbearia/[id]")
}
 
