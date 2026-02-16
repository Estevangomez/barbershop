import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { db } from "@/app/_lib/prisma";
import BarbershopItem from "@/components/barbershop-item";
import { quickSearchItems } from "@/app/_constants/search";
import AgendamentoItem from "@/components/agendamento-item";
import SearchItem from "@/components/search";
import Link from "next/link";

const Home = async () => {
   const barbearias = await db.barbearia.findMany();
    const barbeariasPopulares = await db.barbearia.findMany({
      orderBy: {
        nome: "desc",
      },
    });
 
  return (
    <div>    
     <Header />
     <div className="p-5">
     <h3 className="text-xl font-bold">
       Olá, Estevan!
      </h3>
       <p>Sexta Feira, 30 de Janeiro</p>

     
       {/* Input de busca */}
       <div className="mt-6"> 
           <SearchItem />
        </div>

        <div className="flex gap-3 mt-6 overflow-auto [&::-webkit-scrollbar]:hidden">
          {quickSearchItems.map((item) => (
            <Button key={item.label} className="gap-2" variant="secondary" asChild>
              <Link href={`/barbearia?search=${item.label}`} className="flex items-center gap-2">
              <Image 
                src={item.icon} 
                alt={item.label} 
                width={16} 
                height={16} 
              />
                {item.label}
                </Link>
            </Button>
          ))}

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

      <AgendamentoItem />

       <h2 className="mt-4 mb-3 text-xs font-bold uppercase text-gray-400">RECOMENDADOS</h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
            {barbearias.map((barbearia) => (
                <BarbershopItem key={barbearia.id}  barbearia={barbearia}/>    
            ))}
        </div>

        <h2 className="mt-4 mb-3 text-xs font-bold uppercase text-gray-400">POPULARES</h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
            {barbeariasPopulares.map((barbearia) => (
                <BarbershopItem key={barbearia.id}  barbearia={barbearia}/>    
            ))}
        </div>    

     </div>     
    </div>

    
  );
}

export default Home;