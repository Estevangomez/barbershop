"use client"
import { Button } from "./ui/button";
import { DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { signIn } from "next-auth/react";
import Image from "next/image";

const SignInDialog = () => {

        const handleLoginWithGoogleClick = async () => {
          await  signIn("google")
        }

    return ( 
            <>
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
      </>
          
     );
}
 
export default SignInDialog;