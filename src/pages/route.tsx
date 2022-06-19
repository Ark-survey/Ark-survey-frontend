import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { RootState } from 'src/store';
import CharBox from './char-box';
import Demo from './demo';
import Home from './Home';
import NotFound from './NotFound';
import Setting from './Setting';
import TierList from './TierList';
import Statistics from './Statistics';
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
  const user = useSelector((state: RootState) => state.user);
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        {navbarData.map((section) =>
          section.nav
            .filter((it) => !it.disabled && (!it.needLogin || (it.needLogin && user.userData?.id)))
            .map((it, i) => <Route key={it.id} path={it.id} element={it.element} />),
        )}
        <Route path="demo" element={<Demo />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
