import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CharBoxServer } from 'src/service/CharBoxServer';
import { RootState } from 'src/store';
import { updateCharInBox, updateCharBoxId } from 'src/store/slice/charBoxSlice';

export function useLoadUserTierLists() {
  const userData = useSelector((state: RootState) => state.user.userData);
  const dispatch = useDispatch();

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
}
