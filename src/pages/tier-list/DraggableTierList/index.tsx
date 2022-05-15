import { Box, Button } from '@mantine/core';
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
import { useRef, useState } from 'react';
import { capture } from 'src/utils/CaptureUtils';
// import html2canvas from "html2canvas";
import { format } from 'date-fns';
import { successNotice } from '../components/Notice';

export default function Index() {
  const tiers = useSelector((state: RootState) => state.userTierList.tierList);
  const dispatch = useDispatch();
  const tiersBox = useRef<HTMLDivElement>(null);

  const [makingImg, setMakingImg] = useState(false);

  const handleDropCharacterOnTier = ({ character, type, fromTierValue }: CharDragItem, toTierValue: number) => {
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
  };

  const makeTierImg = () => {
    setMakingImg(true);
    setTimeout(async () => {
      if (tiersBox.current) {
        await capture(tiersBox.current.id, '等级表 ' + format(new Date().getTime(), 'yy-MM-dd hh-mm-ss'));
        successNotice('截图成功', '已自动下载。');
      }
      setMakingImg(false);
    });
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
      <Header title="等级表编辑">
        <ResetAllCharacterPopover />
        <Box sx={{ width: '10px' }} />
        <AddTierPopover />
        <Box sx={{ width: '10px' }} />
        <Button size="xs" variant="outline" color="blue" radius="xl" onClick={makeTierImg}>
          截图
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
