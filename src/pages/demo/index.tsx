import { Box, Center, Title } from '@mantine/core';
import { useState } from 'react';
import CharContainer from 'src/components/char-container';
import SkillGroup from 'src/components/skill-container/SkillGroup';
import { Plus } from 'tabler-icons-react';

export default function Demo() {
  const [selecting, setSelecting] = useState(false);
  const [fold, setFold] = useState(false);
  const [selectSkill, setSelectSkill] = useState('skill_icon_skchr_aglina_3');
  const [skill1, setSkill1] = useState({
    key: 'skill_icon_skchr_aglina_1',
    name: '秘杖·速充模式',
    level: 7,
  });
  const [skill2, setSkill2] = useState({
    key: 'skill_icon_skchr_aglina_2',
    name: '秘杖·微粒模式',
    level: 9,
  });
  const [skill3, setSkill3] = useState({
    key: 'skill_icon_skchr_aglina_3',
    name: '秘杖·反重力模式',
    level: 9,
  });

  return (
    <Box p="lg">
      <Box>
        <Title order={5}>这是开发 Demo 页面</Title>
        <Box sx={{ display: 'flex', flexFlow: 'wrap' }}>
          <CharContainer charKey="char_010_chen_nian#2" />
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
          </CharContainer>
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
        <SkillGroup
          fold={fold}
          onClickFoldButton={(v) => {
            setFold(v);
          }}
          onSelectSkillChange={(v) => {
            setSelectSkill(v);
          }}
          onSkillDetailChange={(v, index) => {
            switch (index) {
              case 0:
                setSkill1(v);
                break;
              case 1:
                setSkill2(v);
                break;
              case 2:
                setSkill3(v);
                break;
            }
          }}
          skill1={skill1}
          skill2={skill2}
          skill3={skill3}
          skillChoose={selectSkill}
        />
        {/* <SkillContainer skillKey="skill_icon_skchr_aguard_1" mini />
        <SkillContainer skillKey="skill_icon_skchr_cuttle_2" mini />
        <SkillContainer skillKey="skill_icon_skchr_demkni_1" mini /> */}
      </Box>
    </Box>
  );
}
