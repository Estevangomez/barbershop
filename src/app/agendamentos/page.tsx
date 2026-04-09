import Header from "@/components/header";
import { db } from "../_lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import AgendamentoItem from "@/components/agendamento-item";
import SignInDialog from "@/components/sign-in-dialog";
import { Dialog } from "@/components/ui/dialog";


const Agendamentos = async () => {
    const session = await getServerSession(authOptions)
    if(!session?.user){ 
      return (
            <>
                <Header />
                <div className="flex flex-col items-center justify-center p-10">
                    <h1 className="text-xl font-bold mb-4">Acesse sua conta para ver agendamentos</h1>   
                    <Dialog>
                        <SignInDialog /> 
                    </Dialog>                
                </div>
            </>
        )
    }
    const agendamentosConfirmados = await db.agendamento.findMany({

        where: {
            userId : session?.user.id,
            date: {
               gte: new Date()     
            }
        },
        include : {
            service: {
                include : {
                    barbearia:true
                }
            }
        },
        orderBy:{
        date:"asc"
      }

    })

        const agendamentosFinalizados = await db.agendamento.findMany({

        where: {
            userId : session?.user.id,
            date: {
               lt: new Date()     
            }
        },
        include : {
            service: {
                include : {
                    barbearia:true
                }
            }
        }

    })

    return ( 

        <>
            <Header />
            <div className="p-5 space-y-3">
                <h1 className="text-xl font-bold">Agendamentos</h1>        
                <h2 className="mb-3 text-xs font-bold uppercase text-gray-400">Confirmados</h2>                
                {agendamentosConfirmados.map(agendamento => <AgendamentoItem key={agendamento.id} agendamento={agendamento} />)}

                 <h2 className="mb-3 text-xs font-bold uppercase text-gray-400">Finalizados</h2>                
                {agendamentosFinalizados.map(agendamento => <AgendamentoItem key={agendamento.id} agendamento={agendamento} />)}

            </div>

        </>
     );
}
 
export default Agendamentos;