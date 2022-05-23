import { Routes, Route } from 'react-router-dom';
import MainPage from './main-page';
import NotFound from './not-found';
import TierList from './tier-list';
import TierListStatistics from './tier-list/TierListStatistics';

export function RootRouter() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<MainPage />} />
        <Route path="tierList" element={<TierList />}>
          <Route path="submit" />
          <Route path="statistics" element={<TierListStatistics />} />
          <Route index element={<TierList />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
