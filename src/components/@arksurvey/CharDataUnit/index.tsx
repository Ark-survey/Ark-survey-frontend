import { Group, Stack } from '@mantine/core';
import { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Character } from 'src/service/CharBoxServer';
import LevelPanel from 'src/components/@arksurvey/LevelPanel';
import SkillGroup from 'src/components/@arksurvey/SkillContainer/SkillGroup';
import UnitEquipPanel from 'src/components/@arksurvey/UniequipPanel';
import { RootState } from 'src/store';
import { updateEditingChar, updateEditingCharKey } from 'src/store/slice/charBoxSlice';
import SkinUsePanel from '../SkinUsePanel';

export type CharLevelDataType = {
  potentialLevel: number;
  level: number;
  trust: number;
  elite: number;
  rarity: number;
} & { [key: string]: any };

export type UniEquipDataType = {
  key: string;
  level: number;
  name: string;
} & { [key: string]: any };

export type CharSkinType = {
  key: string;
  hold: boolean;
  name: string;
} & { [key: string]: any };

export default function Index() {
  const [fold, setFold] = useState(false);
  const [fold2, setFold2] = useState(false);
  const [fold3, setFold3] = useState(false);
  const charBox = useSelector((state: RootState) => state.charBox);
  const editingChar = useSelector((state: RootState) => state.charBox.charInBox[state.charBox.editingCharKey]) as
    | Character
    | undefined;
  const { charData } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const rarity = editingChar?.key ? charData[editingChar.key].rarity : 0;
  const maxPotentialLevel = (editingChar?.key && charData[editingChar.key].maxPotentialLevel) ?? 0;

  useEffect(() => {
    if (!editingChar) dispatch(updateEditingCharKey(Object.keys(charBox)[0]));
  }, [charBox, editingChar, dispatch]);

  const [maxEliteVerifyRule] = useState<Array<number>>([0, 0, 1, 2, 2, 2]);
  const [maxLevelVerifyRule] = useState<Array<number>[]>([
    [30, 30, 40, 40, 50, 50],
    [0, 0, 55, 60, 70, 80],
    [0, 0, 0, 70, 80, 90],
  ]);

  const [commonVerifyRule, setCommonVerifyRule] = useState<{ [key: string]: any }>({
    potentialLevel: [0, 0],
    trust: [0, 200],
  });

  useEffect(() => {
    setCommonVerifyRule((rules) => ({
      ...rules,
      potentialLevel: [0, maxPotentialLevel],
    }));
  }, [charData, maxPotentialLevel]);

  const onSkillLevelChange = useCallback(
    (v: string, char: Character, changeKey: string) => {
      const level = parseInt(v, 10);
      const newSkills = { ...char.skills };
      if ((level <= 7 && char.skills[changeKey].level <= 7) || (level < 7 && char.skills[changeKey].level >= 7)) {
        Object.keys(newSkills).forEach((key) => {
          if (key !== changeKey) newSkills[key] = { ...newSkills[key], level };
        });
      } else if (level > 7 && char.skills[changeKey].level < 7) {
        Object.keys(newSkills).forEach((key) => {
          if (key !== changeKey) newSkills[key] = { ...newSkills[key], level: 7 };
        });
      }
      Object.keys(newSkills).forEach((key) => {
        if (key === changeKey) newSkills[key] = { ...newSkills[key], level };
      });
      dispatch(
        updateEditingChar({
          ...char,
          skills: newSkills,
        }),
      );
    },
    [dispatch],
  );

  const handleCharLevelDataChange = useCallback(
    (value: Character) => {
      // 控制技能
      let maxIndex = 0;
      let maxKey = '';
      let hasSelectedIndex = -1;
      Object.keys(editingChar?.skills ?? {}).forEach((key, index) => {
        // 找到当前的 index 位置
        if (key === editingChar?.skillUse) hasSelectedIndex = index;
        // 找到最大位置
        if (value.elite >= index) {
          maxIndex = index;
          maxKey = key;
        }
      });
      // 控制模组
      const newUniEquipData = { ...editingChar?.modules };
      let equipResetFlag = false;
      if (editingChar?.modules && value.elite !== editingChar?.elite) {
        equipResetFlag = true;
        Object.keys(newUniEquipData).forEach((key, index) => {
          newUniEquipData[key] = {
            ...newUniEquipData[key],
            level: 1,
          };
        });
      }
      // 校验
      const newValue = { ...value };
      if (isNaN(newValue.level)) newValue.level = 1;
      else {
        if (newValue.level > maxLevelVerifyRule[newValue.elite][rarity]) {
          newValue.level = maxLevelVerifyRule[newValue.elite][rarity];
        } else if (newValue.level < 1) {
          newValue.level = 1;
        } else {
          newValue.level = Math.floor(newValue.level);
        }
      }
      Object.keys(commonVerifyRule).forEach((key) => {
        if (['potentialLevel', 'trust'].includes(key)) {
          if (isNaN(newValue[key])) newValue[key] = commonVerifyRule[key][0];
          else {
            if (newValue[key] < commonVerifyRule[key][0]) {
              newValue[key] = commonVerifyRule[key][0];
            } else if (newValue[key] > commonVerifyRule[key][1]) {
              newValue[key] = commonVerifyRule[key][1];
            } else {
              newValue[key] = Math.floor(newValue[key]);
            }
          }
        }
      });
      // 当前的 index 位置比最大位置大的时候，设置为最大Index
      if (editingChar) {
        const newChar = {
          ...editingChar,
          ...newValue,
          skillUse: hasSelectedIndex > maxIndex ? maxKey : editingChar?.skillUse,
          modules: newUniEquipData,
          moduleUse: equipResetFlag ? 'default' : editingChar?.moduleUse,
        };
        dispatch(updateEditingChar(newChar));
        // 提交技能更改
        Object.keys(editingChar?.skills).forEach((key, index) => {
          if (value.elite !== editingChar?.elite)
            if (maxIndex < 1) {
              onSkillLevelChange?.('4', newChar, key);
            } else {
              onSkillLevelChange?.('7', newChar, key);
            }
        });
      }
    },
    [commonVerifyRule, dispatch, editingChar, maxLevelVerifyRule, onSkillLevelChange, rarity],
  );

  const handleUniEquipLevelChange = useCallback(
    (level: number, editingChar: Character) => {
      const obj = { ...editingChar.modules };
      obj[editingChar.moduleUse] = {
        ...obj[editingChar.moduleUse],
        level,
      };
      dispatch(updateEditingChar({ ...editingChar, modules: obj }));
    },
    [dispatch],
  );

  return (
    <Group position="center" sx={{ alignItems: 'flex-start', flex: '1' }}>
      {editingChar && (
        <>
          <Stack>
            <SkinUsePanel
              data={editingChar}
              selectedSkinKey={editingChar?.skinUse}
              onSelectChange={(key) => dispatch(updateEditingChar({ ...editingChar, skinUse: key }))}
            />
            <LevelPanel
              fold={fold2}
              verifyRule={commonVerifyRule}
              maxEliteVerifyRule={maxEliteVerifyRule}
              maxLevelVerifyRule={maxLevelVerifyRule}
              onClickFoldButton={setFold2}
              data={editingChar}
              onCharBasicDataChange={handleCharLevelDataChange}
            />
          </Stack>
          <Stack>
            <SkillGroup
              fold={fold}
              onClickFoldButton={setFold}
              data={editingChar}
              onSelectSkillChange={(key) => dispatch(updateEditingChar({ ...editingChar, skillUse: key }))}
              onSkillLevelChange={onSkillLevelChange}
            />
            {Object.keys(charData[editingChar?.key]?.equips).length > 0 && (
              <UnitEquipPanel
                fold={fold3}
                onClickFoldButton={setFold3}
                data={editingChar}
                onSelectUniEquipChange={(key) => dispatch(updateEditingChar({ ...editingChar, moduleUse: key }))}
                onUniEquipLevelChange={handleUniEquipLevelChange}
              />
            )}
          </Stack>
        </>
      )}
    </Group>
  );
}
