import { post } from 'src/utils/ApiUtils';

// 皮肤
export interface CharSkinBox {
  id: string;
  userId: string; // 创建的时候保存，不可更改，永远不返回
  charSkinKeys: string[]; // 持有的干员皮肤 keys
  updatedDate: string; // 更新日期
}

export class CharSkinBoxServer {
  public serviceName = 'charSkinBox';
  public getCharSkinBoxByUserId(params: { userId: string }) {
    return post<CharSkinBox>(this.serviceName, 'getCharSkinBoxByUserId', params);
  }
  public createOne(params: { charSkinBox: CharSkinBox }) {
    return post<CharSkinBox>(this.serviceName, 'createOne', params);
  }
  public updateOne(params: { charSkinBox: CharSkinBox }) {
    return post<CharSkinBox>(this.serviceName, 'updateOne', params);
  }
}
