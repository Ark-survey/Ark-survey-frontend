import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { TierListServer } from 'src/api';
import { successNotice } from 'src/pages/tier-list/components/Notice';
import { RootState } from 'src/store';
import { updateTierLists } from 'src/store/slice/TierListSlice';

export function useLoadUserTierLists() {
  const userData = useSelector((state: RootState) => state.user.userData);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const fetchUserTierLists = async ({ userId }: { userId: string }) => {
    return await new TierListServer().getAllByUserId({ userId });
  };

  const handleLoadData = async () => {
    if (userData.id) {
      const { data } = await fetchUserTierLists({ userId: userData.id });
      dispatch(updateTierLists(data));
      successNotice(t('dataLoad.tierListLoadingSuccess'));
    }
  };

  // 当 userData.id 改变并不为空时加载
  useEffect(() => {
    const timeout = setTimeout(() => handleLoadData(), 100);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData.id]);
}
