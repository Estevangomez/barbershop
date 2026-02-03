import { Barbearia } from "@prisma/client";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { StarIcon } from "lucide-react";

interface BarbershopItemProps {
    barbearia: Barbearia
}

const BarbershopItem = ({barbearia} : BarbershopItemProps) => {
    return (
      <Card className="min-w-[167px]">
       <CardContent className="p-0 px-1 pt-1 pb-2">       
           <div className="relative h-[159px] w-full"> 
                <Image  fill
                 src={barbearia.imageUrl} 
                 alt={barbearia.nome} 
                 className="object-cover rounded-lg"
                />
               <Badge className="absolute top-2 left-2 space-x-1" variant="secondary">
                  <StarIcon size={12} className="fill-primary text-primary"/> 
                  <p className="text-xs font-semibold">5,0</p>
                </Badge> 
            </div>                   
            
            <div className="py-3">
                <h3 className="mt-2 font-semibold truncate">{barbearia.nome}</h3>
                <p className="text-sm text-gray-400 truncate">{barbearia.endereco}</p>
                <Button variant="secondary" className="w-full mt-3">Reservar</Button>
            </div>
       </CardContent>
      </Card>
    )

}
 
export default BarbershopItem;