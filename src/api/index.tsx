import { SWRConfig } from "swr";

const DOMAIN = {
  dev: "http://arksurvey.fun/api",
  local: "http://localhost:3000/api",
};

export const API = {
  charList: {
    get: "/charList/get",
  },
  tierList: {
    create: "/tierList/create",
    delete: "/tierList/delete",
    update: "/tierList/update",
  },
  staticData: {
    get: "/staticData/get",
  },
};

export default function SWR({ children }: { children: any }) {
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) =>
          fetch(DOMAIN.dev + resource, init).then((res) => res.json()),
      }}
    >
      {children}
    </SWRConfig>
  );
}
