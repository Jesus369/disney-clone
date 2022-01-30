import Link from "next/Link";
import Image from "next/Image";

import logo from "../public/disneylogo.png";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link href="/">
        <a>
          <Image src={logo} alt="Disney Logo" width={90} height={50} />
        </a>
      </Link>
    </div>
  );
};

export default Navbar;
