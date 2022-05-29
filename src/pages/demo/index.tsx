import { Box, Center, Title } from '@mantine/core';
import { useState } from 'react';
import CharContainer from 'src/components/char-container';
import LevelPanel from 'src/components/level-panel';
import SkillGroup from 'src/components/skill-container/SkillGroup';
import { Plus } from 'tabler-icons-react';
export default function Demo() {
  const [fold, setFold] = useState(false);
  const [fold2, setFold2] = useState(false);
  const [selectSkill, setSelectSkill] = useState('skchr_aglina_1');
  const [elite, setElite] = useState(3);
  const [skills, setSkills] = useState<{ [key: string]: any }>({
    skchr_aglina_1: {
      key: 'skchr_aglina_1',
      name: '秘杖·速充模式',
      level: 7,
    },
    skchr_aglina_2: {
      key: 'skchr_aglina_2',
      name: '秘杖·微粒模式',
      level: 7,
    },
    skchr_aglina_3: {
      key: 'skchr_aglina_3',
      name: '秘杖·反重力模式',
      level: 10,
    },
  });

  return (
    <Box p="lg">
      <Box>
        {/* <Title order={5}>这是开发 Demo 页面</Title> */}
        <Box sx={{ display: 'flex', flexFlow: 'wrap' }}>
          {/* <CharContainer charKey="char_010_chen_nian#2" />
          <CharContainer charKey="char_010_chen_nian#2" nameDisplay readonly />
          <CharContainer charKey="char_010_chen_nian#2" nameDisplay selecting />
          <CharContainer charKey="char_010_chen_nian#2" type="tier-list" selecting />
          <CharContainer charKey="char_010_chen_nian#2" charStatus="picked" />
          <CharContainer />
          <CharContainer>
            <Center
              sx={{ height: '100%', cursor: 'pointer' }}
              onClick={() => {
                console.log(1111);
              }}
            >
              <Plus color="grey" />
            </Center>
          </CharContainer>
          <CharContainer charKey="char_010_chen_nian#2" mini />
          <CharContainer charKey="char_010_chen_nian#2" nameDisplay mini readonly />
          <CharContainer charKey="char_010_chen_nian#2" nameDisplay mini selecting />
          <CharContainer charKey="char_010_chen_nian#2" mini type="tier-list" selecting />
          <CharContainer charKey="char_010_chen_nian#2" mini charStatus="picked" />
          <CharContainer mini />
          <CharContainer mini>
            <Center
              sx={{ height: '100%', cursor: 'pointer' }}
              onClick={() => {
                console.log(1111);
              }}
            >
              <Plus color="grey" />
            </Center>
          </CharContainer> */}
          {/* <CharContainer
            charKey="char_010_chen_nian#2"
            mini
            type="tier-list"
            selecting={selecting}
            onSelectChange={(value) => {
              console.log(value);

              setSelecting(value);
            }}
            onDelete={() => {
              console.log('onDelete');
            }}
          /> */}
        </Box>
        <LevelPanel fold={fold2} onClickFoldButton={setFold2} />
        <SkillGroup
          fold={fold}
          onClickFoldButton={setFold}
          skillChoose={selectSkill}
          onSelectSkillChange={setSelectSkill}
          skills={skills}
          elite={elite}
          onSkillDetailChange={setSkills}
        />
        {/* <SkillContainer skillKey="skill_icon_skchr_aguard_1" mini />
        <SkillContainer skillKey="skill_icon_skchr_cuttle_2" mini />
        <SkillContainer skillKey="skill_icon_skchr_demkni_1" mini /> */}
      </Box>
    </Box>
  );
}
