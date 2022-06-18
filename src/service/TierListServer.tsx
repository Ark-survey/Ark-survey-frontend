import { CharacterType } from 'src/store/slice/userSlice';
import { post } from 'src/utils/ApiUtils';

export interface Tier {
  name?: string;
  value?: number;
  characterKeys: string[];
}

export interface TierList {
  id?: string;
  userId?: string;
  name?: string;
  tiers?: Tier[];
  updatedDate?: string;
  key?: string;
  value?: number;
}

export interface TierLists {
  [key: string]: TierList;
}

export class TierListServer {
  public serviceName = 'tierList';
  public getAllByUserId(params: { userId: string }) {
    return post<TierLists>(this.serviceName, 'getAllByUserId', params);
  }
  public getById(params: { id: string }) {
    return post<TierList>(this.serviceName, 'getById', params);
  }
  public createOne(params: { tierList: TierList; userId: string }) {
    return post<TierList>(this.serviceName, 'createOne', params);
  }
  public deleteById(params: { id: string }) {
    return post<undefined>(this.serviceName, 'deleteById', params);
  }
  public updateOne(params: { tierList: TierList; userId: string }) {
    return post<TierList>(this.serviceName, 'updateOne', params);
  }
}
