import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useMeta } from 'src/pages/store';
import { CharBoxServer } from 'src/service/CharBoxServer';
import { updateCharInBox, updateCharBoxId } from 'src/store/slice/charBoxSlice';

export function useLoadUserTierLists() {
  const { user } = useMeta();
  const dispatch = useDispatch();

  const fetchCharData = async () => {
    try {
      const result = await new CharBoxServer().getCharBoxByUserId({ userId: user.id });
      if (!result.data) {
        return await new CharBoxServer().createOne({ charBox: { userId: user.id, characterKeys: {} } });
      }
      return result;
    } catch {
      return { data: null };
    }
  };

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (user.id) {
        const { data } = await fetchCharData();
        if (data) {
          dispatch(updateCharInBox(data.characterKeys));
          dispatch(updateCharBoxId(data.id ?? ''));
        }
      }
    }, 100);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id]);
}
