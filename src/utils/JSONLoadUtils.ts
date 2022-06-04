export function isValidKey(key: string | number | symbol, object: object): key is keyof typeof object {
  return key in object;
}

export async function characterDataLoad(origin: string) {
  let characters = {} as any;
  const characterJsonUrl = origin + 'character_table.json';
  const characterTable: { [key: string]: [number, number] } = await (await fetch(characterJsonUrl)).json();

  Object.getOwnPropertyNames(characterTable).forEach((key) => {
    if (isValidKey(key, characterTable)) {
      characters[key] = characterTable[key];
      characters[key].key = key;
    }
  });
  return characters;
}

export function getCharacterImgUrl(character: any, origin: string) {
  let c = {} as any;
  Object.getOwnPropertyNames(character).forEach((key) => {
    if (isValidKey(key, character)) {
      c[key] = character[key];
      c[key].imgUrl = origin + key + '.png';
    }
  });
  return c;
}

export async function getImgPositionJSON<ImgPosition>(origin: string) {
  const skillJsonUrl = origin + 'skill_0.5.json';
  const avatarJsonUrl = origin + 'char_0.5.json';
  const uniEquipJsonUrl = origin + 'uniequip_0.5.json';
  const skillImgPosition: { [key: string]: [number, number] } = await (await fetch(skillJsonUrl)).json();
  const avatarImgPosition: { [key: string]: [number, number] } = await (await fetch(avatarJsonUrl)).json();
  const uniEquipImgPosition: { [key: string]: [number, number] } = await (await fetch(uniEquipJsonUrl)).json();
  return { skillImgPosition, avatarImgPosition, uniEquipImgPosition };
}
