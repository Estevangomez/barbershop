"use client";
import { Agendamento, Barbearia, Servico } from "@prisma/client";
import Image from "next/image";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "./ui/sheet";
import { Calendar } from "./ui/calendar";
import { ptBR } from "date-fns/locale";
import { useEffect, useMemo, useState } from "react";
import { format, isPast, isToday, set } from "date-fns";
import { createAgendamento } from "@/app/_actions/criar_agendamento";
import { toast } from "sonner";
import { getAgendamentos } from "@/app/_actions/get_agendamentos";
import { useSession } from "next-auth/react";
import { Dialog, DialogContent } from "./ui/dialog";
import SignInDialog from "./sign-in-dialog";


const TIME_LIST = [
    "09:00",
    "09:30",
    "10:00",    
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "17:30",
    "18:00",
]


interface GetTimeListProps {
    agendamentos: Agendamento[],
    selectedDay: Date
}

const getTimeList = ({agendamentos,selectedDay} : GetTimeListProps) => { 
    const timelist = TIME_LIST.filter((time) => {
        const hour = Number(time.split(":")[0])
        const minute = Number(time.split(":")[1])
        
        const timeIsOnThePast = isPast(set(new Date(), { hours: hour, minutes: minute }))
        
        if(timeIsOnThePast && isToday(selectedDay)) {
            return false;
        }

        const hasAgendamentoOnCurrentTime =  agendamentos.some( agendamento => agendamento.date.getHours() === hour 
            && agendamento.date.getMinutes() === minute)        

        if(hasAgendamentoOnCurrentTime) {
            return false;
        }
        return true;
    })
    return timelist;
}   



interface ServiceItemProps {
   service: Servico
   barbearia: Pick<Barbearia, "nome">
}

const ServiceItem = ({service, barbearia} : ServiceItemProps) => { 
    const [signInDialogIsOpen, setSignInDialogIsOpen] = useState(false)
    const {data} = useSession();
    const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
    const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined)
    const [dayAgendamentos, setDayAgendamentos] = useState<Agendamento[]>([])
    const [agendamentoSheetIsOpen, setAgendamentoSheetIsOpen] = useState(false)


   useEffect(() => {     
       const fetch = async () => {
        if (selectedDay) {
            const agendamentos = await getAgendamentos({date: selectedDay, serviceId: service.id, barbeariaId: service.barbeariaId})
            setDayAgendamentos(agendamentos)
        }
    }
    fetch()
},[selectedDay, service.barbeariaId, service.id]) 

    const handleAgendamentoClick =() => {
        if (data?.user) {
            return setAgendamentoSheetIsOpen(true);
        }
        return setSignInDialogIsOpen(true);
    }
    const handleAgendamentoSheetOpenChange = (open: boolean) => {
    setAgendamentoSheetIsOpen(open);
    if (!open) {
        setSelectedDay(undefined);
        setSelectedTime(undefined);
    }
}
 
    const handleCreateAgendamento = async () => {
        if (!selectedDay || !selectedTime) {
            return;
     }

    if (!data?.user?.id) {
        toast.error("Você precisa estar autenticado para fazer uma reserva.");
        return;
    }

    try {
        const newDate = set(selectedDay, {
            hours: Number(selectedTime.split(":")[0]),
            minutes: Number(selectedTime.split(":")[1])    
        })

        await createAgendamento({
            userId: data.user.id,
            servicoId: service.id,
            barbeariaId: service.barbeariaId, 
            date: newDate
        })
        toast.success("Agendamento criado com sucesso!")
    } catch (error) {
        console.error("Erro ao criar agendamento:", error);
        toast.error("Ocorreu um erro ao criar o agendamento. Por favor, tente novamente.")  
    }
}    

    const handleDaySelected = (day: Date) => {
        setSelectedDay(day)
    }
    const handleTimeSelected = (time: string) => {
        setSelectedTime(time)
    }

    const timeList = useMemo(() => {
        if(!selectedDay) return []
        return getTimeList({
        agendamentos: dayAgendamentos,
        selectedDay
    })
    }, [dayAgendamentos, selectedDay])
    return ( 
        <>
            <Card>
            <CardContent className="flex items-center gap-3 p-3">
                    
            <div className="relative min-h-[110px] min-w-[110px] max-h-[110px] max-w-[110px]">
               <Image src={service?.imageUrl ?? "/placeholder.png"} alt={service?.nome ?? "Serviço"} fill className="object-cover rounded-lg"/>
            </div>

            <div className="space-y-2">
                <h3 className="font-semibold text-sm">{service.nome}</h3>
                <p className="text-sm text-gray-400">{service.descricao}</p>
                <div className="flex items-center justify-between">                    
                    <p className="text-sm font-bold text-primary">
                    {Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL"
                    }).format(Number(service?.preco))}
                    </p>

                 <Sheet open={agendamentoSheetIsOpen} onOpenChange={handleAgendamentoSheetOpenChange}>
                        <Button 
                            variant="secondary" 
                            className="ml-auto" 
                            size="sm" 
                            onClick={handleAgendamentoClick}
                        >
                            Reservar
                        </Button>                 
            
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Fazer Reserva</SheetTitle>
                        </SheetHeader>   
                        <div className="py-5">
                        <Calendar mode="single" required={true} locale={ptBR} className="border-b border-solid w-[100%] pb-4"
                            selected={selectedDay}    
                            onSelect={handleDaySelected}   
                            disabled={{ before: new Date() }}              
                            classNames={{
                                head_cell: "w-full capitalize",
                                cell: "w-full",
                                day: "w-full",
                                nav_button_previous: "w-8 h-8",
                                nav_button_next: "w-8 h-8",
                                caption: "capitalize",
                            }}
                            /> 
                        </div>  
                        {selectedDay && (
                        <div className="px-2 border-b border-solid flex overflow-x-auto gap-2 [&::-webkit-scrollbar]:hidden">
                            { timeList.length > 0 ? timeList.map((time) => (
                                <Button key={time} 
                                 variant= {selectedTime === time ? "default" : "outline"}  
                                 className="rounded-full mb-4"
                                 onClick={() => handleTimeSelected(time)}>
                                    {time}
                                </Button>
                            )) :  <p className="text-xs">Nenhum horário disponível
                            
                            </p>}
                        </div>  
                        )}

                        {selectedTime && selectedDay && (                            
                        <div className="p-0 mt-3">
                               <Card>
                                <CardContent className="p-3 space-y-3">
                                        <div className="flex items-center justify-between">
                                            <h5 className="font-semibold">{service.nome}</h5> 
                                             <p className="text-sm font-bold text-primary">
                                                {Intl.NumberFormat("pt-BR", {
                                                    style: "currency",
                                                    currency: "BRL"
                                                }).format(Number(service?.preco))}
                                                </p>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <h5 className="text-sm text-gray-400">Data</h5> 
                                             <p className="text-sm text-gray-400">
                                               {format(selectedDay, "d 'de' MMMM" , {locale: ptBR})}
                                                </p>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <h5 className="text-sm text-gray-400">Horário</h5> 
                                             <p className="text-sm text-gray-400">
                                                {selectedTime}
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
                        </div>                        
                        )}
                        <SheetFooter className="px-1 mt-4">
                                <SheetClose asChild>
                                    <Button className="w-full"
                                     onClick={handleCreateAgendamento}
                                     disabled={!selectedDay || !selectedTime}>Confirmar Reserva</Button>
                                </SheetClose>
                        </SheetFooter>
                    </SheetContent>
                 </Sheet>
                </div>
            </div>
        </CardContent>
    </Card>

<Dialog open={signInDialogIsOpen} onOpenChange={(open) => setSignInDialogIsOpen(open)}>
<DialogContent className="w-[90%]">
    <SignInDialog />
</DialogContent>

</Dialog>

</>
);

}
export default ServiceItem; 