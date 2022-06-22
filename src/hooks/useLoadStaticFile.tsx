import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateCharMap } from 'src/store/slice/characterSlice';
import { updateCharData, updateImgPosition } from 'src/store/slice/userSlice';
import { getImgPositionJSON, characterDataLoad } from 'src/utils/JSONLoadUtils';

export function useLoadStaticFile() {
  const dispatch = useDispatch();
  const handleLoadImg = async () => {
    const result = await getImgPositionJSON('https://img.yituliu.site/static/');
    dispatch(updateImgPosition(result));
  };

  const handleLoadCharData = async () => {
    const result = await characterDataLoad('https://img.yituliu.site/static/');
    dispatch(updateCharMap(result));
    dispatch(updateCharData(result));
  };

  // 当 userData?.id 改变并不为空时加载
  useEffect(() => {
    const timeout = setTimeout(() => {
      handleLoadImg();
      handleLoadCharData();
    }, 100);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
