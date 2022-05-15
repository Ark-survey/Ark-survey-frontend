import character_table_new from 'src/assets/character_table_new.json';

export function isValidKey(key: string | number | symbol, object: object): key is keyof typeof object {
  return key in object;
}

export function characterDataLoad() {
  let characters = {} as any;
  Object.getOwnPropertyNames(character_table_new).forEach((key) => {
    if (isValidKey(key, character_table_new)) {
      characters[key] = character_table_new[key];
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
