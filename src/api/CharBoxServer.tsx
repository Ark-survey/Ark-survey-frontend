import { post } from '.';

// 模组
export interface Module {
  key: string; // 模组 key
  level: number; // 模组 等级 1 到 3
}

// 技能
export interface Skill {
  key: string; // 技能key
  level: number; // 技能等级 1 到 10
}

// 干员
export type Character = {
  key: string; // 干员key
  potentialLevel: number; // 潜能等级 0 - 6
  elite: number; // 精英 0 - 2
  level: number; // 等级 1 - 90
  trust: number; // 信赖 0 - 200
  skill: { [key: string]: Skill }; // 技能
  module: { [key: string]: Module }; // 模组
  moduleUse: string; // 生效模组 key
  skillUse: string; // 生效技能 key
  skinUse: string; // 生效皮肤 key
  favorite: boolean; // 收藏
  // groupValue: number; // 分组 value，默认分组 0
} & { [key: string]: any };

// 干员分组
// export interface Group {
//   name: string;
//   value: number;
// }

// 干员盒
export interface CharBox {
  id: string;
  userId: string; // 创建的时候保存，不可更改，永远不返回
  characterKeys: { [key: string]: Character }; // 持有的干员 keys
  // 默认有一个 { name:'默认分组', value:'0' }，value不可重复
  // groups: Group[];
  updatedDate: string; // 更新日期
}

export class CharBoxServer {
  public serviceName = 'charBox';
  public getCharBoxByUserId(params: { userId: string }) {
    return post<CharBox>(this.serviceName, 'getCharBoxByUserId', params);
  }
  public createOne(params: { charBox: CharBox }) {
    return post<CharBox>(this.serviceName, 'createOne', params);
  }
  public updateOne(params: { charBox: CharBox }) {
    return post<CharBox>(this.serviceName, 'updateOne', params);
  }
}
