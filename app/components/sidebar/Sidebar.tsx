import getCurrentUser from "@/app/actions/getCurrentUser";
import DesktopSidebar from "./DesktopSidebar";
import MobileFooter from "./MobileFooter";

async function Sidebar({children}:{
    children:React.ReactNode;
}){
    const currentUser = await getCurrentUser();
    return(
        <div className="h-full">
            {/* renders either desktopsidebar or mobilefooter depending on screen size */}
            {/* adding ! to the end makes it possible for smth to be null */}
            <DesktopSidebar currentUser={currentUser!}/>
            <MobileFooter/>
            <main className="lg:pl-20 h-full">
            {children}
            </main>
        </div>
    )
}

export default Sidebar;