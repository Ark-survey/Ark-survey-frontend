import { useState, useCallback } from 'react';
import LevelPanel from 'src/components/level-panel';
import SkillGroup from 'src/components/skill-container/SkillGroup';

export type CharLevelDataType = {
  potentialLevel: number;
  level: number;
  trust: number;
  elite: number;
  rarity: number;
} & { [key: string]: any };

export default function Index() {
  const [fold, setFold] = useState(false);
  const [fold2, setFold2] = useState(false);
  const [selectSkill, setSelectSkill] = useState('skchr_aglina_1');

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
    level: 50,
    trust: 50,
    elite: 2,
    rarity: 5,
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
      // 校验
      const newValue = { ...value };

      if (newValue.level > maxLevelVerifyRule[newValue.elite][newValue.rarity]) {
        newValue.level = maxLevelVerifyRule[newValue.elite][newValue.rarity];
      } else if (newValue.level < 1) {
        newValue.level = 1;
      } else {
        newValue.level = Math.floor(newValue.level);
      }
      Object.keys(commonVerifyRule).forEach((key) => {
        if (newValue[key] < commonVerifyRule[key][0]) {
          newValue[key] = commonVerifyRule[key][0];
        } else if (newValue[key] > commonVerifyRule[key][1]) {
          newValue[key] = commonVerifyRule[key][1];
        } else {
          newValue[key] = Math.floor(newValue[key]);
        }
      });
      setCharLevelData(newValue);
    },
    [charLevelData.elite, commonVerifyRule, maxLevelVerifyRule, onSkillLevelChange, selectSkill, skills],
  );

  return (
    <>
      <LevelPanel
        fold={fold2}
        verifyRule={commonVerifyRule}
        maxEliteVerifyRule={maxEliteVerifyRule}
        maxLevelVerifyRule={maxLevelVerifyRule}
        onClickFoldButton={setFold2}
        charLevelData={charLevelData}
        onCharLevelDataChange={handleCharLevelDataChange}
      />
      <SkillGroup
        fold={fold}
        onClickFoldButton={setFold}
        skillChoose={selectSkill}
        onSelectSkillChange={setSelectSkill}
        skills={skills}
        elite={charLevelData.elite}
        onSkillLevelChange={onSkillLevelChange}
      />
    </>
  );
}
