import {  Prisma } from "@prisma/client";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { format, isFuture } from "date-fns";
import { ptBR } from "date-fns/locale";


interface AgendamentoItemProps {
  agendamento: Prisma.AgendamentoGetPayload<{
    include: {
      service: {
        include: {
          barbearia:true
      }
    }}
  }>
  
}

const AgendamentoItem = ({agendamento} : AgendamentoItemProps) => {
  const isConfirmed = isFuture(agendamento.date)
  console.log(isConfirmed)
    return ( 
        <>
     
          <Card className="min-w-[90%]"> 
          <CardContent className="flex justify-between p-0">
          <div className="flex flex-col gap-2 py-5 pl-5">
            <Badge className="w-fit rounded-full" variant={isConfirmed ? "default" : "secondary"}>  
              {isConfirmed ? "Confirmado" : "Finalizado"}
            </Badge>
            <h3 className="font-semibold">{agendamento.service.nome}</h3>
           
           <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={agendamento.service.barbearia.imageUrl || ""} />
            </Avatar>
            <p className="text-sm">{agendamento.service.barbearia.nome}</p>

           </div>
          </div>
          <div className="flex flex-col items-center justify-center px-5 border-l-2 border-solid">           
              <p className="font-bold text-sm capitalize">{format(agendamento.date, "MMMM", {locale:ptBR})}</p>
              <p className="text-2xl">{format(agendamento.date, "dd", {locale:ptBR})}</p>
              <p className="text-sm">{format(agendamento.date, "HH:mm", {locale:ptBR})}</p>        
          </div>
          </CardContent>
      </Card>
        </>
     );
}
 
export default AgendamentoItem;