import { loadJsonFile } from 'load-json-file';

export async function characterDataLoad() {
  return await loadJsonFile('character_table_new.json') as { [key: string]: Character }
}