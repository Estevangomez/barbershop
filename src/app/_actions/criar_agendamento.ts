"use server";

import { revalidatePath } from "next/cache";
import { db } from "../_lib/prisma";

interface createAgendamento {
  userId: string;
  servicoId: string;
  barbeariaId: string;
  date: Date;
}

export const createAgendamento = async (params: createAgendamento) => {   
    await  db.agendamento.create({
        data: params
    })

    revalidatePath("/barbearia/[id]")
}
 
