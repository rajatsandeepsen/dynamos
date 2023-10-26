import { MainNav } from "@/components/build/main-nav"
import { Search } from "@/components/build/search"
import TeamSwitcher from "@/components/build/team-switcher"
import { UserNav } from "@/components/build/user-nav"

const Navbar = () => {
    return ( 
        <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            Dyn
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <UserNav />
            </div>
          </div>
        </div>
        </div>
     );
}
 
export default Navbar;