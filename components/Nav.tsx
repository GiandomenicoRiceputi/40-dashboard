import { Session } from "next-auth";
import Navbar from "@/components/Navbar";

type NavProps = {
  user: Session["user"];
};

const Nav: React.FC<NavProps> = ({ user }) => {
  return <Navbar user={user} />;
};

export default Nav;
