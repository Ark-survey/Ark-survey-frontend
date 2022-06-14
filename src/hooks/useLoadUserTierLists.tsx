import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { TierListServer } from 'src/api';
import { CharBoxServer } from 'src/api/CharBoxServer';
import { successNotice } from 'src/components/Notice';
import { RootState } from 'src/store';
import { updateCharInBox, updateCharBoxId } from 'src/store/slice/charBoxSlice';
import { updateTierLists } from 'src/store/slice/TierListSlice';

export function useLoadUserTierLists() {
  const tierList = useSelector((state: RootState) => state.tierList);
  const userData = useSelector((state: RootState) => state.user.userData);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const fetchUserTierLists = async ({ userId }: { userId: string }) => {
    return await new TierListServer().getAllByUserId({ userId });
  };

  const handleLoadData = async () => {
    if (userData?.id) {
      const { data } = await fetchUserTierLists({ userId: userData?.id });
      dispatch(updateTierLists({ ...tierList.tierLists, ...data }));
      successNotice(t('dataLoad.tierListLoadingSuccess'));
    }
  };

  const fetchCharData = async () => {
    try {
      const result = await new CharBoxServer().getCharBoxByUserId({ userId: userData?.id ?? '' });
      if (!result.data) {
        return await new CharBoxServer().createOne({ charBox: { userId: userData?.id ?? '', characterKeys: {} } });
      }
      return result;
    } catch {
      return { data: null };
    }
  };

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (userData?.id) {
        const { data } = await fetchCharData();
        if (data) {
          dispatch(updateCharInBox(data.characterKeys));
          dispatch(updateCharBoxId(data.id ?? ''));
        }
      }
    }, 100);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData?.id]);

  // 当 userData?.id 改变并不为空时加载
  useEffect(() => {
    const timeout = setTimeout(() => handleLoadData(), 100);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData?.id]);
}
