"use server"
import { db } from "@/app/_lib/prisma";
import { endOfDay, startOfDay } from "date-fns";

interface GetaAgendammentosProps {
    serviceId: string;
    barbeariaId: string;    
    date: Date;
}


export const getAgendamentos = ({ serviceId, barbeariaId, date }: GetaAgendammentosProps) => {
    return db.agendamento.findMany({
        where: {
            servicoId: serviceId,     
            barbeariaId: barbeariaId,
            date: {
                lte: endOfDay(date),
                gte: startOfDay(date)
            },
        },
}
  )
}

