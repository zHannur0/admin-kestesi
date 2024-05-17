import { instance } from "@/api/axios.instance";
import { LogoutIcons } from "@/components/atoms/Icons";
import { ButtonLogout } from "@/components/atoms/UI/Buttons/Button";
import { localStorageWrapper } from "@/components/data/storage";
import SuperAdminSidebar from "@/components/organisms/SuperAdminSidebar";
import { getTokenInLocalStorage } from "@/utils/assets.utils";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import {kz} from "@/locales/kz";
import {ru} from "@/locales/ru";

interface ILayouts {
  children: ReactNode;
}

const SuperAdminLayouts = ({ children }: ILayouts) => {
  const router = useRouter();
    const translations: any= {
        kz: kz,
        ru: ru,
    };
    const t = translations[router.locale || "kz"] || kz;
  const onLogout = async () => {
    try {
      router.push("/");
      localStorageWrapper.remove("token");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <div className="container">
      <SuperAdminSidebar />

      <div className="main">
        <div className="main_inner">
          <div
            className="flex-end"
            style={{
              width: "100%",
              marginBottom: "2.5rem",
              alignItems: "center",
              gap: "4rem",
            }}
          >
            <div
              style={{
                fontSize: "1.6rem",
                color: "#060C3C",
                fontWeight: "600",
              }}
            >
              SuperAdmin
            </div>
            <ButtonLogout onClick={onLogout}>
              <LogoutIcons />
                {t.actions.exit}
            </ButtonLogout>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default SuperAdminLayouts;
