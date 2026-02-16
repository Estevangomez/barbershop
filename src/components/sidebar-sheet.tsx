
"use client"
import { Button } from "./ui/button";
import { SheetContent } from "./ui/sheet";

import Image from "next/image";
import { SheetClose } from "./ui/sheet";
import { SheetHeader, SheetTitle } from "./ui/sheet";
import { HomeIcon, Calendar1Icon, LogOutIcon, LogInIcon } from "lucide-react";
import Link from "next/link";
import { quickSearchItems } from "@/app/_constants/search";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarImage } from "./ui/avatar";

const SidebarSheet = () => {
    const {data } = useSession()
    const handleLoginWithGoogleClick = async () => {
      await  signIn("google")
    }
    const handleLogOutClick = () => signOut()
    return ( 
        
        <SheetContent className="overflow-y-auto">
            <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
            </SheetHeader>
            <div className="flex items-center gap-2 border-solid border-b"> 
          {/*If ternario para aparecer ou o form de login ou o usuario logado*/}
            {data?.user ?  (
                    <div className="flex items-center gap-2 mb-3 mt-3">
                        <Avatar>
                        <AvatarImage src={data?.user?.image ?? ""} />
                        </Avatar> 
                        <div> 
                            <p className="text-sm font-semibold">{data.user.name}</p>
                            <p className="text-xs">{data.user.email}</p>
                        </div>
                    </div>          
                        
                ) : (
            <>
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
                        <Button variant="outline" className="w-full mt-4" onClick={handleLoginWithGoogleClick}>
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
                </>
            )}                 
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
                <SheetClose asChild key={item.label}> 
                                
                <Button className="gap-2 justify-start" variant="ghost" key={item.label}>  
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
                </SheetClose>
                )) }                                               
            </div>
            {data?.user ? (<div className="flex flex-col p-5 gap-4 border-b border-solid">
                <Button className="justify-start" variant="ghost" onClick={handleLogOutClick}>   
                    <LogOutIcon size={18} /> Sair da Conta
                </Button>                                       
            </div>) : null}        
        </SheetContent>
        

     );
}
 
export default SidebarSheet;