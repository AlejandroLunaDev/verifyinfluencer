import { navlinks } from "@/config/navLinks";
import NavLinks from "./navlinks";
import Logo from "./logo";
import NavbarMobile from "./navbarMobile";
import UserLogin from "@/components/auth/userlogin";


export default function Navbar() {
  // Mapea los elementos fuera del JSX
  const Links = navlinks.map((link) => (
    <nav key={link.href} >
      <NavLinks {...link} />
    </nav>
  ));

  return (
    <div className='w-full fixed bg-background border-b-2 border-gray-400 text-gray-400 flex justify-between gap-4 px-16 py-5'>
      <Logo />
      <div className='hidden lg:flex items-center gap-20'>
      {Links} 
      <UserLogin />
      </div>
      <div className='lg:hidden'>
            <NavbarMobile />
          </div>
    </div>
  );
}
