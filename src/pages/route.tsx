import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { RootState } from 'src/store';
import CharBox from './char-box';
import Demo from './demo';
import MainPage from './main-page';
import NotFound from './not-found';
import Setting from './setting';
import TierList from './tier-list';
import Statistics from './statistics';

export function RootRouter() {
  const user = useSelector((state: RootState) => state.user);
  return (
    <Routes>
      <Route path="/">
        <Route index element={<MainPage />} />
        {user?.userData?.id ? (
          <>
            <Route path="tierList" element={<TierList />} />
            <Route path="charBox" element={<CharBox />} />
          </>
        ) : (
          <Route path="*" element={<NotFound />} />
        )}
        <Route path="statistics" element={<Statistics />} />
        <Route path="demo" element={<Demo />} />
        <Route path="setting" element={<Setting />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
