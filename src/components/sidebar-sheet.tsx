
import { Button } from "./ui/button";
import { SheetContent } from "./ui/sheet";

import Image from "next/image";
import { SheetClose } from "./ui/sheet";
import { SheetHeader, SheetTitle } from "./ui/sheet";
import { HomeIcon, Calendar1Icon, LogOutIcon, LogInIcon } from "lucide-react";
import Link from "next/link";
import { quickSearchItems } from "@/app/_constants/search";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

const SidebarSheet = () => {
    return ( 
        
        <SheetContent className="overflow-y-auto">
            <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
            </SheetHeader>
            
            <div className="py-5 border-solid border-b flex justify-between gap-3">
                <h2 className="font-bold">Olá, faça seu Login</h2>
                <Dialog>
                    <DialogTrigger asChild>
                         <Button size="icon"> <LogInIcon > </LogInIcon> </Button>
                    </DialogTrigger>

                    <DialogContent className="w-[90%]">
                        <DialogHeader>
                            <DialogTitle>Faça Login na Plataforma</DialogTitle>
                            <DialogDescription>
                                Conecte-se usando sua conta do Google
                            </DialogDescription>
                        </DialogHeader>
                        <Button variant="outline" className="w-full mt-4">
                            <Image 
                            src="/google.png" 
                            alt="Fazer Login com Google"
                            width={16}
                            height={16} 
                            />
                            Continuar com Google
                        </Button>
                    </DialogContent>

                </Dialog>              
               {/* <Avatar>
                    <AvatarImage  src="https://images.unsplash.com/photo-1769096913011-5430ddef71ba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDU3fHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D" />
                </Avatar> 
                <div> 
                    <p className="text-sm font-semibold">Estevan Gomes</p>
                    <p className="text-xs">gomes.estevan1@gmail.com</p>
                </div>*/}
                
            </div>
 

            <div className="flex flex-col p-5 gap-4 border-b border-solid">
                <SheetClose asChild >
                <Button className="gap-2 justify-start" variant="ghost" >  
                    <HomeIcon size={18} /> 
                    <Link href="/">Início</Link>                               
                </Button>
                </SheetClose>
                <Button className="gap-2 justify-start" variant="ghost">
                    <Calendar1Icon size={18} />   Agendamentos
                </Button>                          
            </div>

            <div className="flex flex-col p-5 gap-4 border-b border-solid">
                {quickSearchItems.map((item) => (                           
                <Button className="gap-2 justify-start" variant="ghost" key={item.label}>  
                    <Image 
                    src={item.icon} 
                    alt={item.label}
                    width={16}
                    height={16}
                    />
                    {item.label}
                </Button>
                )) }                                               
            </div>

            <div className="flex flex-col p-5 gap-4 border-b border-solid">
                <Button className="justify-start" variant="ghost">   
                    <LogOutIcon size={18} /> Sair da Conta
                </Button>                                       
            </div>

        </SheetContent>
        

     );
}
 
export default SidebarSheet;