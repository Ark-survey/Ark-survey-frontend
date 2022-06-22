import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MetaDataServer } from 'src/service/MetaDataServer.';
import { successNotice } from 'src/components/Notice';
import { useMeta } from 'src/pages/store';

export function useLoadingGlobalData() {
  const { t } = useTranslation();
  const { setVersion } = useMeta();

  const fetchLatestMetaData = async () => {
    return await new MetaDataServer().latest();
  };

  const handleLoadData = async () => {
    const { data } = await fetchLatestMetaData();
    setVersion(data.version);
    successNotice(t('basic-data-updated-successfully'));
  };

  useEffect(() => {
    const timeout = setTimeout(() => handleLoadData(), 100);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
