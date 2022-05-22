import { Box, Button, Select } from '@mantine/core';
import Header from 'src/components/Header';

import { delCharacterByTier, addCharacterByTier } from 'src/store/slice/tierSlice';
import { updateCharacterPicked, updateCharacterSelecting } from 'src/store/slice/characterSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/store';

import { CharDragItem, CharListItemType } from '../CharListBox/components/CharListItem';
import AddTierPopover from './components/AddTierPopover';
import ResetAllCharacterPopover from './components/ResetAllCharacterPopover';
import TierBox from './components/TierBox';
import UploadPopover from './components/UploadPopover';
import { useCallback, useMemo, useRef, useState } from 'react';
import { capture } from 'src/utils/CaptureUtils';
import { format } from 'date-fns';
import { successNotice } from '../components/Notice';
import { useTranslation } from 'react-i18next';
import { treeToArray } from 'src/utils/TreeUtils';

export default function Index() {
  const tiers = useSelector((state: RootState) => state.userTierList.tierList);
  const listTypeCollection = useSelector((state: RootState) => state.tierListType.collection);
  const dispatch = useDispatch();
  const tiersBox = useRef<HTMLDivElement>(null);

  const { t } = useTranslation();
  const [makingImg, setMakingImg] = useState(false);
  const [type1Select, setType1Select] = useState('');
  const [type2Select, setType2Select] = useState('');

  const type1List = useMemo(() => {
    const list = listTypeCollection.map((it) => ({
      value: it.id,
      label: it.name,
    }));
    setType1Select(list[0].value);
    return list;
  }, [listTypeCollection]);

  const type2List = useMemo(() => {
    let list = [];
    if (type1Select === 'AE') {
      list = treeToArray(listTypeCollection[0].children).map((it) => ({
        value: it.id,
        label: it.name,
      }));
    } else {
      list = treeToArray(listTypeCollection[1].children, [1, 2], (node, road, level) => {
        if (level === 0) {
          return node.id;
        } else if (level === 1) {
          return road + '#' + node.id + ' ' + node.name;
        } else {
          return road + ' ' + node.name;
        }
      }).map((it) => ({
        value: it.id,
        label: it.road,
      }));
    }
    setType2Select(list[0].value);
    return list;
  }, [listTypeCollection, type1Select]);

  const handleDropCharacterOnTier = useCallback(
    ({ character, type, fromTierValue }: CharDragItem, toTierValue: number) => {
      if (type === CharListItemType.NORMAL || (type === CharListItemType.TIER && fromTierValue !== toTierValue)) {
        dispatch(updateCharacterPicked({ key: character?.key ?? '', picked: true }));
        dispatch(updateCharacterSelecting({ key: character?.key ?? '', selecting: false }));

        if (type === CharListItemType.TIER) {
          dispatch(
            delCharacterByTier({
              tierValue: fromTierValue ?? 0,
              key: character?.key ?? '',
            }),
          );
        }

        dispatch(
          addCharacterByTier({
            tierValue: toTierValue,
            key: character?.key ?? '',
          }),
        );
      }
    },
    [dispatch],
  );

  const makeTierImg = useCallback(() => {
    setMakingImg(true);
    setTimeout(async () => {
      if (tiersBox.current) {
        await capture(tiersBox.current.id, t('tier-list') + ' ' + format(new Date().getTime(), t('screenshot-time')));
        successNotice(t('downloaded-successfully'));
      }
      setMakingImg(false);
    });
  }, [t]);

  const handleType1Change = (value: string) => {
    setType1Select(value);
  };

  const handleType2Change = (value: string) => {
    setType2Select(value);
  };

  return (
    <Box
      sx={{
        flex: '1.5',
        width: '100%',
        boxShadow: '0 0 5px 5px #eee',
        borderRadius: '20px',
        maxHeight: '890px',
        overflow: 'hidden',
        userSelect: 'none',
        minWidth: '326px',
      }}
    >
      <Header
        title={
          <>
            <Select sx={{ width: '75px' }} value={type1Select} onChange={handleType1Change} data={type1List} />
            <Select
              sx={{ width: '220px' }}
              value={type2Select}
              onChange={handleType2Change}
              searchable
              data={type2List}
            />
          </>
        }
      >
        <ResetAllCharacterPopover />
        <Box sx={{ width: '10px' }} />
        <AddTierPopover />
        <Box sx={{ width: '10px' }} />
        <Button size="xs" variant="outline" color="blue" radius="xl" onClick={makeTierImg}>
          {t('screenshot')}
        </Button>
        <Box sx={{ width: '10px' }} />
        <UploadPopover />
      </Header>
      <Box
        sx={{
          overflow: 'auto',
          height: 'calc(100% - 100px)',
          '::-webkit-scrollbar': { width: '0 !important' },
        }}
      >
        <Box
          ref={tiersBox}
          id="tierList"
          sx={{
            overflow: 'auto',
            marginTop: '2px',
            background: '#fff',
          }}
        >
          <Box
            sx={{
              margin: '15px',
            }}
          >
            {tiers.map((tier) => (
              <TierBox
                key={tier.value}
                tier={tier}
                onDropCharacter={(item) => handleDropCharacterOnTier(item, tier.value)}
                operationDisplay={!makingImg}
              />
            ))}
          </Box>
        </Box>
      </Box>
      <Box sx={{ width: '100%', height: '15px' }} />
    </Box>
  );
}
