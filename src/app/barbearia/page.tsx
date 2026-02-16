import BarbershopItem from "@/components/barbershop-item";
import { db } from "../_lib/prisma";
import Header from "@/components/header";
import { Search } from "lucide-react";
import SearchItem from "@/components/search";

interface BarbeariaPageProps {
     searchParams: {
        search?: string;
    }
}   

const BarbeariaPage = async ({searchParams} : BarbeariaPageProps) => {
    const barbearias = await db.barbearia.findMany({
        where: {
           services: {
            some: {
                nome: {
                    contains: searchParams.search,
                    mode: "insensitive"
                }
            }      
           }
        }
    })

    return ( 
        <div>
            <Header />
            <div className="my-6 px-5">   
                <SearchItem />
            </div>
           <div className="px-5">
             <h1 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">Resultado para : &quot;{searchParams.search}&quot;</h1>

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {barbearias.map(barbearia => (
                    <BarbershopItem key={barbearia.id} barbearia={barbearia} />
                ))}
                </div>
            </div>
        </div>   
     );
}
 
export default BarbeariaPage;