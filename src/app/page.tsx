import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { SearchIcon } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { db } from "@/app/_lib/prisma";
import BarbershopItem from "@/components/barbershop-item";


const Home = async () => {
   const barbearias = await db.barbearia.findMany();
 
  return (
    <div>    
     <Header />
     <div className="p-5">
     <h3 className="text-xl font-bold">
       Olá, Estevan!
      </h3>
       <p>Sexta Feira, 30 de Janeiro</p>
       <div className="flex items-center gap-2 mt-2">
        <Input 
          type="text" 
          placeholder="Buscar serviços ou barbeiros" 
        />
        <Button size="icon">
          <SearchIcon />
        </Button>
       </div>

        <div className="mt-6 flex justify-between items-center">
         <p>Cabelo</p>
         <p>Barba</p>
         <p>Acabamento</p>
        </div>

       <div className="relative w-full h-[150px] mt-4">        
        <Image 
        src="/banner-01.png" 
        alt="Banner Promocional" 
        width={400} 
        height={150} 
        className="object-cover rounded-xl"
       />
       </div>
         <h2 className="mt-4 mb-3 text-xs font-bold uppercase text-gray-400">AGENDAMENTOS</h2>
          <Card> 
          <CardContent className="flex justify-between p-0">
          <div className="flex flex-col gap-2 py-5 pl-5">
            <Badge className="w-fit rounded-full">  
              confirmado
            </Badge>
            <h3 className="font-semibold">Corte de Cabelo</h3>
           
           <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png"/>
            </Avatar>
            <p className="text-sm">Barbearia do FSW</p>

           </div>
          </div>
          <div className="flex flex-col items-center justify-center px-5 border-l-2 border-solid">           
              <p className="font-bold text-sm">Janeiro</p>
              <p className="text-2xl">05</p>
              <p className="text-sm">15:00</p>        
          </div>
          </CardContent>
      </Card>

       <h2 className="mt-4 mb-3 text-xs font-bold uppercase text-gray-400">RECOMENDADOS</h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
            {barbearias.map((barbearia) => (
                <BarbershopItem key={barbearia.id}  barbearia={barbearia}/>    
            ))}
        </div>
     </div>     
    </div>

    
  );
}

export default Home;