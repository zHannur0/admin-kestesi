import { Form, Formik } from "formik";
import {Input, InputLog} from "../formik";
import { Button } from "../atoms/UI/Buttons/Button";

import { instance } from "@/api/axios.instance";
import { localStorageWrapper } from "../data/storage";
import { useRouter } from "next/router";
import Image from "next/image";
import {kz} from "@/locales/kz";
import {ru} from "@/locales/ru";
import {useEffect, useState} from "react";
import Link from "next/link";

const LoginForms = () => {
  const router = useRouter();
    const translations: any= {
        kz: kz,
        ru: ru,
    };
    const t = translations[router.locale || "kz"] || kz;


  return (
          <div className="login_forms-form">
              {router.locale === "kz" ? (
                  <Link href={"/"} locale="ru">
                      <div className={"login_forms-lang"} >
                          <span>Русский</span></div>
                  </Link> ) :
                  (
                      <Link href={"/"}  locale="kz">
                          <div className={"login_forms-lang"}>
                              <span>Қазақша</span></div>
                      </Link>
                  )
              }
              <div className="login_forms-title">{t.login.login}</div>
              <div className="login_forms-subtitle">{t.login.welcome}</div>

              <Formik
                  initialValues={{
                      username: "",
                      password: "",
                  }}
                  onSubmit={async (values) => {
                      console.log(values)
                      if (values.username && values.password) {
                          await instance
                              .post("https://www.bilimge.kz/admins/login/", {
                                  username: values.username,
                                  password: values.password,
                              })
                              .then(async (res) => {
                                  if (res) {
                                      localStorageWrapper.set(
                                          "token",
                                          (res as { auth_token?: string })?.auth_token,
                                      );

                                      await instance
                                          .get("https://www.bilimge.kz/admins/users/me/", {
                                              headers: {
                                                  Authorization: `Token ${
                                                      (res as { auth_token?: string })?.auth_token
                                                  }`,
                                              },
                                          })
                                          .then((res) => {
                                              if (res) {
                                                  if ((res as { is_superuser?: boolean }).is_superuser) {
                                                      router.push("/superadmin");
                                                  } else {
                                                      router.push("/main");
                                                  }
                                              }
                                          });
                                  }
                              })
                              .catch((err) => {
                                  console.log(err);
                              });
                      }
                  }}
              >
                  {() => {
                      return (
                          <Form>
                              <div className="login_forms-label_black">{t.login.username}</div>
                              <InputLog
                                  type="text"
                                  name="username"
                                  // placeholder="username"
                                  // label="Username"
                                  className={"login_forms-inp"}
                              />
                              <div className="login_forms-label_black">{t.login.password}</div>
                              <InputLog
                                  type="password"
                                  name="password"
                                  // placeholder="Пароль"
                                  // label="Пароль"
                                  className={"login_forms-inp"}
                              />
                                  <button type={"submit"} className={"login_forms-but"}>
                                      {t.login.in}
                                  </button>

                          </Form>
                      );
                  }}
              </Formik>
          </div>
  );
};

export default LoginForms;
