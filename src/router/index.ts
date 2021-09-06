import { ObjectType, RegistrableApp } from "qiankun";

export const microRouter: RegistrableApp<ObjectType>[] = [
  {
    entry: "//localhost:8001/",
    name: "home",
    container: "#sub-app-container",
    activeRule: "/login",
  },
];

export const defaultApp = "/login";
