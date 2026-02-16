
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Sheet, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import SidebarSheet from "./sidebar-sheet";


const Header = () => {
    return ( 
        <Card>
            <CardContent className="p-5 justify-between items-center flex flex-row">
                <Link href="/">
                <Image 
                    src="/logo.png" 
                    alt="FSW Barber" 
                    width={120}  
                    height={18} 
                />
                </Link>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button size="icon" variant="outline">
                            <MenuIcon />
                        </Button>
                    </SheetTrigger>
                    <SidebarSheet />
                </Sheet>  
    
     
            </CardContent>

        </Card>
     );
}
 
export default Header;