"use client"
import {  Prisma } from "@prisma/client";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { format, isFuture } from "date-fns";
import { ptBR } from "date-fns/locale"; 
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import Image from "next/image";
import PhoneItem from "./phone-item";
import { Button } from "./ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { toast } from "sonner";
import { deleteAgendamento } from "./delete-agendamento";
import { useState } from "react";


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
  const phone = "(92) 98463-1508"
  const [isSheetOpen, setIsSheetOpen] = useState(false)

const handleCancelarAgendamento = async () => {
  try {
      await deleteAgendamento(agendamento.id)
      setIsSheetOpen(false)
      toast.success("Agemdamento Cancelado com sucesso")
  } catch (error) {
    console.log(error)
    toast.error("Erro ao cancelar agendamento: " + error)
  }
}

const handleSheetOpenChange = (isOpen: boolean) => {
  setIsSheetOpen(isOpen)
}
const {service: {barbearia}} = agendamento
    return ( 
      <Sheet open={isSheetOpen} onOpenChange={handleSheetOpenChange}>
        <SheetTrigger className="w-full">
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
        </SheetTrigger>
        <SheetContent className="w-[85%]">
          <SheetHeader>
            <SheetTitle className="text-left">Infromações da Reserva</SheetTitle>
          </SheetHeader>
          <div className="relative h-[180px] w-full flex items-end mt-6">
            <Image  src="/mapa.png" alt="Mapa da Barbearia" fill className="object-cover rounded-xl"           
            />

            <Card className="z-50 w-full mx-5 mb-3 rounded-xl">
              <CardContent className="py-3 px-5 flex items-center gap-3">
                   <Avatar>
                     <AvatarImage src = {barbearia.imageUrl || ""} />
                </Avatar>
                <div>
                  <h3 className="font-bold">{barbearia.nome}</h3>
                  <p className="text-xs">{barbearia.endereco}</p>
                </div>
              </CardContent>               
            </Card>
          </div>

          <div className="mt-6">
              <Badge className="w-fit rounded-full" variant={isConfirmed ? "default" : "secondary"}>  
                  {isConfirmed ? "Confirmado" : "Finalizado"}
                </Badge>

                  <Card className="mb-6 mt-3">
                <CardContent className="p-3 space-y-3">
                        <div className="flex items-center justify-between">
                            <h5 className="font-semibold">{agendamento.service.nome}</h5> 
                              <p className="text-sm font-bold text-primary">
                                {Intl.NumberFormat("pt-BR", {
                                    style: "currency",
                                    currency: "BRL"
                                }).format(Number(agendamento.service?.preco))}
                                </p>
                        </div>

                        <div className="flex items-center justify-between">
                            <h5 className="text-sm text-gray-400">Data</h5> 
                              <p className="text-sm text-gray-400">
                                {format(agendamento.date, "d 'de' MMMM" , {locale: ptBR})}
                                </p>
                        </div>

                        <div className="flex items-center justify-between">
                            <h5 className="text-sm text-gray-400">Horário</h5> 
                              <p className="text-sm text-gray-400">
                                  {format(agendamento.date, "HH:mm" , {locale: ptBR})}
                            </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <h5 className="text-sm text-gray-400">Barbearia</h5> 
                            <p className="text-sm text-gray-400">
                              {barbearia.nome}
                          </p>
                        </div>              
                </CardContent>
              </Card>   
             <PhoneItem key={phone} phone={phone} />

            <SheetFooter className="mt-6">
              <div className="flex items-center gap-3">
                <SheetClose asChild>
                    <Button className="w-full" variant="outline">
                      Voltar
                    </Button>
                </SheetClose>       

                  {isConfirmed && (                   
               

                      <Dialog>
                        <DialogTrigger className="w-full">
                             <Button className="w-full" variant="destructive">
                                Cancelar
                              </Button>
                        </DialogTrigger>
                        <DialogContent className="w-[90%]">
                          <DialogHeader> 
                            <DialogTitle>Você deseja cancelar sua reserva ?</DialogTitle>
                            <DialogDescription>
                              Ao cancelar, você perderá sua reserva e não poderá recuperá-la. Essa ação é irreversível.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter className="flex flex-row gap-3">
                            <DialogClose asChild>
                              <Button variant="secondary" className="w-full">Voltar</Button>
                            </DialogClose>

                           <DialogClose asChild>
                            <Button variant="destructive" className="w-full"
                              onClick={handleCancelarAgendamento}
                              >Cancelar
                              </Button>  
                           </DialogClose>

                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                  
                )}                  
             
              </div>
            </SheetFooter>

          </div>
        </SheetContent>
        </Sheet>
     );
}
 
export default AgendamentoItem;