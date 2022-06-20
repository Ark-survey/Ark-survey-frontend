import { CharacterType } from 'src/store/slice/userSlice';
import { post } from 'src/utils/ApiUtils';

export interface Tier {
  name?: string;
  value?: number;
  characterKeys: string[];
}

export interface TierList {
  id?: string;
  userId?: string; // cannot get from server, should be set by frontend
  name?: string;
  tiers?: Tier[];
  updatedDate?: string;
  key?: string;
  value?: number;
}

export class TierListServer {
  public serviceName = 'tierList';

  // know key & userId
  public getOne(params: { key: string; userId: string }) {
    return post<TierList>(this.serviceName, 'getOne', params);
  }

  // know id
  public getOneById(params: { id: string }) {
    return post<TierList>(this.serviceName, 'getOneById', params);
  }

  // need userId
  public createOne(params: { tierList: TierList }) {
    return post<TierList>(this.serviceName, 'createOne', params);
  }

  // need userId
  public updateOne(params: { tierList: TierList }) {
    return post<TierList>(this.serviceName, 'updateOne', params);
  }
}
