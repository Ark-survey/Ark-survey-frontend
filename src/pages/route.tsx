import { lazy, ReactNode, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  IconHome,
  IconSchool,
  IconCheckupList,
  IconBoxMultiple5,
  IconNotebook,
  IconChartBar,
  IconCopy,
  IconSettings,
} from '@tabler/icons';
import { LoadingOverlay } from '@mantine/core';
import { useMeta } from './store';

const Home = lazy(() => import('./Home'));
const Setting = lazy(() => import('./Setting'));
const NotFound = lazy(() => import('./NotFound'));
const Demo = lazy(() => import('./demo'));
const Statistics = lazy(() => import('./Statistics'));
const CharBox = lazy(() => import('./CharBox'));
const TierList = lazy(() => import('./TierList'));

interface NavbarDataType {
  id: string;
  icon?: ReactNode;
  hidden?: boolean;
  element?: ReactNode;
  disabled?: boolean;
  needLogin?: boolean;
  onClick?: () => void;
  action?: 'copy-id';
}

export const navbarData: { grow?: boolean; nav: NavbarDataType[] }[] = [
  {
    nav: [
      {
        id: 'home',
        icon: <IconHome />,
        element: <Home />,
      },
    ],
  },
  {
    nav: [
      {
        id: 'doctorInfo',
        icon: <IconSchool />,
        disabled: true,
        needLogin: true,
      },
      {
        id: 'charBox',
        icon: <IconCheckupList />,
        needLogin: true,
        element: <CharBox />,
      },
    ],
  },
  {
    nav: [
      {
        id: 'tierList',
        icon: <IconBoxMultiple5 />,
        needLogin: true,
        element: <TierList />,
      },
    ],
  },
  {
    grow: true,
    nav: [
      {
        id: 'charNote',
        icon: <IconNotebook />,
        disabled: true,
      },
      {
        id: 'statistics',
        icon: <IconChartBar />,
        element: <Statistics />,
      },
    ],
  },
  {
    nav: [
      {
        id: 'copy',
        icon: <IconCopy />,
        needLogin: true,
        action: 'copy-id',
      },
      {
        id: 'setting',
        icon: <IconSettings />,
        element: <Setting />,
      },
    ],
  },
];

export function RootRouter() {
  const { user } = useMeta();
  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={
            <Suspense fallback={<LoadingOverlay visible />}>
              <Home />
            </Suspense>
          }
        />
        {navbarData.map((section) =>
          section.nav
            .filter((it) => !it.disabled && (!it.needLogin || (it.needLogin && user.id)))
            .map((it, i) => (
              <Route
                key={it.id}
                path={it.id}
                element={<Suspense fallback={<LoadingOverlay visible />}>{it.element}</Suspense>}
              />
            )),
        )}
        <Route
          path="demo"
          element={
            <Suspense fallback={<LoadingOverlay visible />}>
              <Demo />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<LoadingOverlay visible />}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}
