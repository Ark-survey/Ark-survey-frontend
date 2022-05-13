import { AxiosResponse } from "axios";
import { get, post } from ".";

export interface Tier {
  name?: string;
  value: number;
  characterIds: string[];
}

export interface UserTierList {
  id?: string;
  name?: string;
  tierList: Tier[];
  updatedDate?: string;
  // todo enum
  type: string;
}

export class TierListServer {
  serviceName = 'userTierList';
  public createOne(params: UserTierList) {
    return post<UserTierList>(this.serviceName, 'createOne', params)
  }
  public updateOne(params: UserTierList) {
    return post<UserTierList>(this.serviceName, 'updateOne', params)
  }
  public findById(params: { id: string }) {
    return post<UserTierList>(this.serviceName, 'findById', params)
  }
  public deleteById(params: { id: string }) {
    return post<UserTierList>(this.serviceName, 'deleteById', params)
  }
}