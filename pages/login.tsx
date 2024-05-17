import { CheckIcons } from "@/components/atoms/Icons";
import LoginForms from "@/components/forms/LoginForms";
import Image from "next/image";
import {useRouter} from "next/router";
import {kz} from "@/locales/kz";
import {ru} from "@/locales/ru";

const LoginPage = () => {
  const router = useRouter();
  const translations: any= {
    kz: kz,
    ru: ru,
  };
  const t = translations[router.locale || "kz"] || kz;
  return (
    <div className="section">
      <div className="login">
        <div style = {{width: "40%",
          padding:"32px",
          position:"relative"
        }}>
          <Image src="/Logo.svg" alt="" width={86} height={32}/>
          <div className="login_forms">
            <LoginForms />
          </div>
        </div>
        <div className="login_content">
          <div className="login_content-title">
            <span>{t.login.contentTitle}</span> <br />
            {t.login.contentSubTitle}
          </div>

          <div className="login_content-check">
            <div>
              <CheckIcons />
              <span>{t.login.content[0]}</span>
            </div>

            <div>
              <CheckIcons />
              <span>{t.login.content[1]}</span>
            </div>

            <div>
              <CheckIcons />
              <span>{t.login.content[2]}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
