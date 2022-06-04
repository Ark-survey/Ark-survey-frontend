import { Group, Stack } from '@mantine/core';
import { useState, useCallback } from 'react';
import LevelPanel from 'src/components/level-panel';
import SkillGroup from 'src/components/skill-container/SkillGroup';
import UnitEquipPanel from 'src/components/uni-equip-panel';
import SkinUsePanel from './skin-use-panel';

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
  const [selectSkill, setSelectSkill] = useState('char_291_aglina_summer#5');
  const [selectedSkinKey, setSelectedSkinKey] = useState('char_291_aglina');
  const [selectUniEquip, setSelectUniEquip] = useState('uniequip_002_aglina');

  const [maxEliteVerifyRule] = useState<Array<number>>([0, 0, 1, 2, 2, 2]);
  const [maxLevelVerifyRule] = useState<Array<number>[]>([
    [30, 30, 40, 40, 50, 50],
    [0, 0, 55, 60, 70, 80],
    [0, 0, 0, 70, 80, 90],
  ]);

  const [commonVerifyRule] = useState<{ [key: string]: any }>({
    potentialLevel: [0, 6],
    trust: [0, 200],
  });
  const [charLevelData, setCharLevelData] = useState<CharLevelDataType>({
    potentialLevel: 5,
    level: 70,
    trust: 199,
    elite: 2,
    rarity: 5,
  });
  const [uniEquipData, setUniEquipData] = useState<{ [key: string]: UniEquipDataType } | null>({
    default: {
      key: 'default',
      name: '基础证章',
      level: 1,
    },
    uniequip_002_aglina: {
      key: 'uniequip_002_aglina',
      name: '重力校准模块',
      level: 1,
    },
  });
  const [skills, setSkills] = useState<{ [key: string]: any }>({
    skchr_aglina_1: {
      key: 'skchr_aglina_1',
      name: '秘杖·速充模式',
      level: 8,
    },
    skchr_aglina_2: {
      key: 'skchr_aglina_2',
      name: '秘杖·微粒模式',
      level: 9,
    },
    skchr_aglina_3: {
      key: 'skchr_aglina_3',
      name: '秘杖·反重力模式',
      level: 10,
    },
  });
  const [skinList, setSkinList] = useState<{ [key: string]: CharSkinType }>({
    char_291_aglina: {
      key: 'char_291_aglina',
      name: '普通',
      hold: true,
    },
    char_291_aglina_2: {
      key: 'char_291_aglina_2',
      name: '精二',
      hold: true,
    },
    'char_291_aglina_boc#1': {
      key: 'char_291_aglina_boc#1',
      name: 'BOC',
      hold: true,
    },
    'char_291_aglina_summer#5': {
      key: 'char_291_aglina_summer#5',
      name: 'summer',
      hold: false,
    },
  });

  const onSkillLevelChange = useCallback(
    (v: string, changeKey: string) => {
      const syncNumber = parseInt(v, 10);
      if ((syncNumber <= 7 && skills[changeKey].level <= 7) || (syncNumber < 7 && skills[changeKey].level >= 7)) {
        setSkills((s: any) => {
          const newSkills = { ...s };
          Object.keys(newSkills).forEach((key) => {
            if (key !== changeKey) newSkills[key].level = syncNumber;
          });
          return newSkills;
        });
      } else if (syncNumber > 7 && skills[changeKey].level < 7) {
        setSkills((s: any) => {
          const newSkills = { ...s };
          Object.keys(newSkills).forEach((key) => {
            if (key !== changeKey) newSkills[key].level = 7;
          });
          return newSkills;
        });
      }
      setSkills((s: any) => {
        const newSkills = { ...s };
        Object.keys(newSkills).forEach((key) => {
          if (key === changeKey) newSkills[key].level = syncNumber;
        });
        return newSkills;
      });
    },
    [skills],
  );

  const handleCharLevelDataChange = useCallback(
    (value: CharLevelDataType) => {
      // 控制技能
      let maxIndex = 0;
      let maxKey = '';
      let hasSelectedIndex = -1;
      Object.keys(skills).forEach((key, index) => {
        // 找到当前的 index 位置
        if (key === selectSkill) hasSelectedIndex = index;
        // 找到最大位置
        if (value.elite >= index) {
          maxIndex = index;
          maxKey = key;
        }
      });
      // 当前的 index 位置比最大位置大的时候，设置为最大Index
      if (hasSelectedIndex > maxIndex) {
        setSelectSkill(maxKey);
      }
      Object.keys(skills).forEach((key, index) => {
        if (value.elite !== charLevelData.elite)
          if (maxIndex < 1) {
            onSkillLevelChange?.('4', key);
          } else {
            onSkillLevelChange?.('7', key);
          }
      });
      // 控制模组
      if (uniEquipData && value.elite !== charLevelData.elite) {
        const newUniEquipData = { ...uniEquipData };
        Object.keys(newUniEquipData).forEach((key, index) => {
          newUniEquipData[key].level = 1;
        });
        setUniEquipData(newUniEquipData);
        setSelectUniEquip('default');
      }
      // 校验
      const newValue = { ...value };
      if (isNaN(newValue.level)) newValue.level = 1;
      else {
        if (newValue.level > maxLevelVerifyRule[newValue.elite][newValue.rarity]) {
          newValue.level = maxLevelVerifyRule[newValue.elite][newValue.rarity];
        } else if (newValue.level < 1) {
          newValue.level = 1;
        } else {
          newValue.level = Math.floor(newValue.level);
        }
      }
      Object.keys(commonVerifyRule).forEach((key) => {
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
      });
      setCharLevelData(newValue);
    },
    [charLevelData.elite, commonVerifyRule, maxLevelVerifyRule, onSkillLevelChange, selectSkill, skills, uniEquipData],
  );

  const handleUniEquipLevelChange = useCallback(
    (level: number) => {
      const obj = { ...uniEquipData };
      obj[selectUniEquip].level = level;
      setUniEquipData(obj);
    },
    [selectUniEquip, uniEquipData],
  );

  return (
    <Group position="center" sx={{ alignItems: 'flex-start' }}>
      <Stack>
        <SkinUsePanel skins={skinList} selectedSkinKey={selectedSkinKey} onSelectChange={setSelectedSkinKey} />
        <LevelPanel
          fold={fold2}
          verifyRule={commonVerifyRule}
          maxEliteVerifyRule={maxEliteVerifyRule}
          maxLevelVerifyRule={maxLevelVerifyRule}
          onClickFoldButton={setFold2}
          charLevelData={charLevelData}
          onCharLevelDataChange={handleCharLevelDataChange}
        />
      </Stack>
      <Stack>
        <SkillGroup
          fold={fold}
          onClickFoldButton={setFold}
          skillChoose={selectSkill}
          onSelectSkillChange={setSelectSkill}
          skills={skills}
          elite={charLevelData.elite}
          onSkillLevelChange={onSkillLevelChange}
        />
        {uniEquipData && (
          <UnitEquipPanel
            fold={fold3}
            onClickFoldButton={setFold3}
            uniEquipData={uniEquipData}
            selectUniEquip={selectUniEquip}
            elite={charLevelData.elite}
            onSelectUniEquipChange={setSelectUniEquip}
            onUniEquipLevelChange={handleUniEquipLevelChange}
          />
        )}
      </Stack>
    </Group>
  );
}
