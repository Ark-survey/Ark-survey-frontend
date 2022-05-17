import { CharacterType } from 'src/store/slice/characterSlice';
import { post } from '.';

export interface Tier {
  name?: string;
  value: number;
  characterKeys: string[];
}

export interface UserTierList {
  id?: string;
  name?: string;
  tierList: Tier[];
  updatedDate?: string;
  // todo enum
  type: string;
}

export interface CharStatistic {
  avgValue?: number;
  count?: number;
}

export interface TierListStatisticType {
  count: string;
  validCount: string;
  charStatistics: {
    [key: string]: { statistic: CharStatistic; char: CharacterType } & CharStatistic;
  };
}

export class TierListServer {
  public serviceName = 'userTierList';
  public createOne(params: UserTierList) {
    return post<UserTierList>(this.serviceName, 'createOne', params);
  }
  public updateOne(params: UserTierList) {
    return post<UserTierList>(this.serviceName, 'updateOne', params);
  }
  public findById(params: { id: string }) {
    return post<UserTierList>(this.serviceName, 'findById', params);
  }
  public deleteById(params: { id: string }) {
    return post<UserTierList>(this.serviceName, 'deleteById', params);
  }
  public averageAll() {
    return post<TierListStatisticType>(this.serviceName, 'averageAll');
  }
}
