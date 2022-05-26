import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateImgPosition } from 'src/store/slice/userSlice';
import { getImgPositionJSON } from 'src/utils/JSONLoadUtils';

export function useLoadStaticFile() {
  const dispatch = useDispatch();
  const handleLoadImg = async () => {
    const result = await getImgPositionJSON('https://arksurvey-1258424659.cos.ap-shanghai.myqcloud.com/static/');
    dispatch(updateImgPosition(result));
  };

  // 当 userData?.id 改变并不为空时加载
  useEffect(() => {
    const timeout = setTimeout(() => handleLoadImg(), 100);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
