import { Group, Stack } from '@mantine/core';
import { useState, useCallback, useEffect } from 'react';
import { Character } from 'src/service/CharBoxServer';
import LevelPanel from 'src/components/@arksurvey/LevelPanel';
import SkillGroup from 'src/components/@arksurvey/SkillContainer/SkillGroup';
import UnitEquipPanel from 'src/components/@arksurvey/UniequipPanel';
import SkinUsePanel from '../SkinUsePanel';
import { useDataMap } from 'src/pages/store';
import { useEditingCharKey } from 'src/pages/CharBox/store';
import useCharBox from 'src/pages/CharBox/useCharBox';
import useSkinBox from 'src/pages/CharBox/useSkinBox';

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
  const { charMap } = useDataMap();
  const { editingCharKey, updateEditingCharKey } = useEditingCharKey();
  const { charBox, updateChar } = useCharBox();
  const editingChar = charBox?.characterKeys?.[editingCharKey];
  const rarity = editingChar?.key ? charMap[editingChar.key].rarity : 0;
  const maxPotentialLevel = (editingChar?.key && charMap[editingChar.key].maxPotentialLevel) ?? 0;
  const { skinBox } = useSkinBox();

  useEffect(() => {
    if (!editingChar) updateEditingCharKey(Object.keys(charMap)[0]);
  }, [charMap, editingChar, updateEditingCharKey]);

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
  }, [maxPotentialLevel]);

  const onSkillLevelChange = useCallback((v: string, char: Character, changeKey: string) => {
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
    return newSkills;
  }, []);

  const handleCharLevelDataChange = useCallback(
    (value: Character) => {
      // ????????????
      let maxIndex = 0;
      let maxKey = '';
      let hasSelectedIndex = -1;
      Object.keys(editingChar?.skills ?? {}).forEach((key, index) => {
        // ??????????????? index ??????
        if (key === editingChar?.skillUse) hasSelectedIndex = index;
        // ??????????????????
        if (value.elite >= index) {
          maxIndex = index;
          maxKey = key;
        }
      });
      // ????????????
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
      // ????????????

      // ??????
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

      // ????????? index ???????????????????????????????????????????????????Index
      if (editingChar) {
        const newChar = {
          ...editingChar,
          ...newValue,
          skinUse:
            (editingChar.elite > (newValue?.elite ?? 0) && newValue?.skinUse.includes('_2')) ||
            newValue?.skinUse.includes('_1')
              ? newValue?.key
              : newValue.skinUse,
          skillUse: hasSelectedIndex > maxIndex ? maxKey : editingChar?.skillUse,
          modules: newUniEquipData,
          moduleUse: equipResetFlag ? 'default' : editingChar?.moduleUse,
        };
        // ??????????????????
        Object.keys(editingChar?.skills).forEach((key, index) => {
          if (value.elite !== editingChar?.elite)
            if (maxIndex < 1) {
              newChar.skills = onSkillLevelChange?.('4', newChar, key);
            } else {
              newChar.skills = onSkillLevelChange?.('7', newChar, key);
            }
        });
        updateChar.mutate(newChar);
      }
    },
    [commonVerifyRule, editingChar, maxLevelVerifyRule, onSkillLevelChange, rarity, updateChar],
  );

  const handleUniEquipLevelChange = useCallback(
    (level: number, key: string) => {
      if (editingChar) {
        const obj = { ...editingChar?.modules };
        obj[key] = {
          ...obj[key],
          level,
        };
        updateChar.mutate({ ...editingChar, moduleUse: level === 0 ? 'default' : editingChar.moduleUse, modules: obj });
      }
    },
    [editingChar, updateChar],
  );

  return (
    <Group position="center" sx={{ alignItems: 'flex-start', flex: '1' }}>
      {editingChar && (
        <>
          <Stack>
            <SkinUsePanel
              data={editingChar}
              charSkinKeys={skinBox?.charSkinKeys ?? []}
              onSelectChange={(key) => updateChar.mutate({ ...editingChar, skinUse: key })}
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
              onSelectSkillChange={(key) => updateChar.mutate({ ...editingChar, skillUse: key })}
              onSkillLevelChange={(v, char, skillKey) => {
                updateChar.mutate({
                  ...char,
                  skills: onSkillLevelChange(v, char, skillKey),
                });
              }}
            />
            {Object.keys(charMap[editingChar?.key]?.equips).length > 0 && (
              <UnitEquipPanel
                fold={fold3}
                onClickFoldButton={setFold3}
                data={editingChar}
                onSelectUniEquipChange={(key) => updateChar.mutate({ ...editingChar, moduleUse: key })}
                onUniEquipLevelChange={handleUniEquipLevelChange}
              />
            )}
          </Stack>
        </>
      )}
    </Group>
  );
}
