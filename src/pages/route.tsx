import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { RootState } from 'src/store';
import CharBox from './char-box';
import Demo from './demo';
import MainPage from './main-page';
import NotFound from './not-found';
import TierList from './tier-list';
import TierListStatistics from './tier-list/TierListStatistics';

export function RootRouter() {
  const user = useSelector((state: RootState) => state.user);
  return (
    <Routes>
      <Route path="/">
        <Route index element={<MainPage />} />
        {user?.userData?.id ? (
          <Route path="tierList" element={<TierList />} />
        ) : (
          <Route path="*" element={<NotFound />} />
        )}
        <Route path="charBox" element={<CharBox />} />
        <Route path="statistics" element={<TierListStatistics />} />
        <Route path="demo" element={<Demo />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
