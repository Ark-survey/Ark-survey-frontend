import { useEffect } from 'react';
import { useDataMap } from 'src/pages/store';
import { getImgPositionJSON, characterDataLoad } from 'src/utils/JSONLoadUtils';

export function useLoadStaticFile() {
  const { setCharMap, setImgPositionMap } = useDataMap();
  const handleLoadImg = async () => {
    const result = await getImgPositionJSON('https://img.yituliu.site/static/');
    setImgPositionMap({ ...result });
  };

  const handleLoadCharData = async () => {
    const result = await characterDataLoad('https://img.yituliu.site/static/');
    setCharMap({ ...result });
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
