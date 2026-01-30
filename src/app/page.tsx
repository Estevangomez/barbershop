import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import Image from "next/image";

const Home = () => {
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

       <div className="relative w-full h-[150px] mt-4">        
        <Image 
        src="/banner-01.png" 
        alt="Banner Promocional" 
        width={400} 
        height={150} 
        className="object-cover rounded-xl"
       />
       </div>
   

     </div>
    </div>
  );
}

export default Home;