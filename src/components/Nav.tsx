import { ActionIcon, Box, SegmentedControl, useMantineColorScheme } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { updateViewPageId } from 'src/store/slice/userSlice';
import { MoonStars, Sun } from 'tabler-icons-react';
import useVersionDialog from './useVersionDialog';

export default function Index() {
  const user = useSelector((state: RootState) => state.user);
  const userTierList = useSelector((state: RootState) => state.userTierList);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const handlePageControlChange = (value: string) => {
    dispatch(updateViewPageId(value));
  };
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  const { dialogContext, setOpened } = useVersionDialog();

  return (
    <Box
      sx={{
        width: '100%',
        borderBottom: '2px #eee solid',
        marginBottom: '20px',
      }}
    >
      <Box
        sx={{
          margin: '0 auto',
          maxWidth: '1500px',
          display: 'flex',
          paddingBottom: '20px',
          padding: '5px',
          flexFlow: 'row wrap',
          width: '100%',
          height: '90px',
          boxSizing: 'border-box',
          alignItems: 'center',
          userSelect: 'none',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            fontSize: '32px',
            paddingLeft: 5,
            fontWeight: 900,
            whiteSpace: 'nowrap',
          }}
        >
          <Box>
            {t('header.title')}
            <Box
              sx={{
                fontSize: '10px',
                paddingBottom: '10px',
                textAlign: 'center',
              }}
            >
              {t('header.ark-survey')}
            </Box>
          </Box>
          <Box
            sx={{
              fontSize: '10px',
              textAlign: 'right',
              cursor: 'pointer',
              height: '15px',
            }}
            onClick={() => setOpened((opened) => !opened)}
          >
            {'v' + user.version}
          </Box>
          {dialogContext}
        </Box>
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <SegmentedControl
            // disabled={user.newTierList || !userTierList?.id}
            orientation="vertical"
            value={user.viewPageId}
            onChange={handlePageControlChange}
            data={[
              { label: t('header.sample-submission'), value: 'tier-list-commit' },
              { label: t('header.statistics'), value: 'tier-list-real-time' },
            ]}
          />
          {/* <ActionIcon
            variant="outline"
            color={dark ? 'yellow' : 'blue'}
            onClick={() => toggleColorScheme()}
            title="Toggle color scheme"
          >
            {dark ? <Sun size={18} /> : <MoonStars size={18} />}
          </ActionIcon> */}
        </Box>
      </Box>
    </Box>
  );
}
