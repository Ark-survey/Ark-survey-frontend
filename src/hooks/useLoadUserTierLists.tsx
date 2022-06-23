import { useEffect } from 'react';
import { useCharBox } from 'src/pages/CharBox/store';
import { useMeta } from 'src/pages/store';
import { CharBoxServer } from 'src/service/CharBoxServer';

export function useLoadUserTierLists() {
  const { user } = useMeta();
  const { updateCharInBox, updateCharBoxId } = useCharBox();

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
          updateCharInBox(data.characterKeys);
          updateCharBoxId(data.id ?? '');
        }
      }
    }, 100);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id]);
}
