import Image from "next/image";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();
  return (
    <header>
      <div className="cursor-pointer" onClick={() => router.push("/")}>
        <Image src="/assets/logo.png" alt={"Logo"} width={150} height={150} />
      </div>
    </header>
  );
};

export default Navbar;
