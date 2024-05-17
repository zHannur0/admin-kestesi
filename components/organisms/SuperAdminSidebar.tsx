import Link from "next/link";
import { useRouter } from "next/router";

const SuperAdminSidebar = () => {
  const router = useRouter();

  return (
    <div className="sidebar">
        <div className="sidebar_top">KESTESI.KZ</div>
      <nav className="sidebar_links">
        {sidebar.map((item) => (
          <Link
            href={`/${item.link}`}
            key={item.id}
            className={`${
              router.asPath.split("/")[1] === item.link?.split("/")[0]
                ? "active"
                : ""
            }`}
          >
            <div>{item.type}</div>
          </Link>
        ))}
      </nav>
    </div>
  );
};

interface IType {
  id?: number;
  type?: string;
  link?: string;
}

const sidebar: IType[] = [
  {
    id: 1,
    type: "Школы",
    link: "superadmin",
  },

  {
    id: 2,
    type: "Администраторы",
    link: "administrators",
  },

];

export default SuperAdminSidebar;
