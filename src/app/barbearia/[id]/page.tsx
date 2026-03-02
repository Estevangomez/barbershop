/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { db } from "@/app/_lib/prisma";
import ServiceItem from "@/components/service-item";
import { Button } from "@/components/ui/button";
import { ChevronLeft, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import PhoneItem from "@/components/phone-item";
import { notFound } from "next/navigation";
import { Sheet } from "@/components/ui/sheet";
import { SheetTrigger } from "@/components/ui/sheet";
import SidebarSheet from "@/components/sidebar-sheet";



interface BarbeariaPageProps {
    params: {
        id: string
    }
}
const phoneNumber = "(11) 98765-4321";

const BarbeariaPage = async ({params} : BarbeariaPageProps) => {
    const barbearia = await db.barbearia.findUnique({
        where: {
            id: params.id
        },
        include: {
            services: true
        }
    })
    
    if (!barbearia) {
        return notFound();
    }

    return ( 
        <div>

            <div className="relative w-full h-[250px]">
                <Image src={barbearia?.imageUrl} fill alt={barbearia?.nome!} className="object-cover"/>
                <Button variant="secondary" className="absolute top-4 left-4" asChild> 
                    <Link href="/">     
                         <ChevronLeft size={20}/> 
                    </Link>
                </Button>

                <Sheet>
                    <SheetTrigger asChild>
                        <Button size="icon" variant="outline" className="absolute top-4 right-4">
                            <MenuIcon />
                        </Button>
                    </SheetTrigger> 
                    <SidebarSheet />
                </Sheet>  
    
         

            </div>

           <div className="p-4 border-b border-solid">
                <h1 className="text-xl font-bold"> {barbearia?.nome}</h1>
                <div className="flex items-center gap-1">
                    <MapPinIcon className="text-primary"  size={18}/> 
                    <p className="text-sm text-gray-400">{barbearia?.endereco}</p>
                </div>               
                
              
            <div className="flex items-center gap-1">
                <StarIcon className="text-primary fill-primary" size={18}/> 
                <p className="text-sm text-gray-400">5,0 (499 avaliações)</p>
            </div>               
          
        </div>

        <div className="p-4 border-b border-solid space-y-3">   
            <h2 className="text-xs font-bold mb-2 uppercase text-gray-400">Sobre nos</h2>
            <p className="text-sm text-gray-600">Bem-vindo à {barbearia?.nome}! Aqui, a tradição encontra a modernidade para criar o seu estilo único. Oferecemos cortes clássicos e tendências atuais, cuidados completos com a barba e tratamentos capilares, tudo em um ambiente descontraído e aconchegante. Sinta-se em casa e saia pronto para impressionar. Seu visual é o nosso compromisso</p>
        </div>

        <div className="p-5">
            <h2 className="text-xs font-bold uppercase text-gray-400 mb-3">Serviços</h2>
            <div className="space-y-3">
            {barbearia?.services.map((service => (
                 <ServiceItem key={service.id} service={service} barbearia={barbearia} />
            )))  } 
            </div>
        </div>
        <div className="p-5 space-y-3">
            <PhoneItem key={phoneNumber}  phone={phoneNumber}/>
        </div>
        
        </div>
     );
}
 
export default BarbeariaPage;