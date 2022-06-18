import { CharacterType } from 'src/store/slice/userSlice';
import { post } from '.';

export interface CharStatistic {
  avgValue?: number; // 均分
  count?: number; // 被评价的次数
  char: CharacterType;
  statistic: {
    avgValue?: number; // 均分
    count?: number; // 被评价的次数
  };
}

// 同一个 key 的 TierList 统计信息
export interface TierListStatistic {
  count: number; // 样本数量
  validCount: number; // 被纳入统计的样本数量
  charStatistics: { [key: string]: CharStatistic };
  createdDate: string; // 创建日期
}

export interface TierListStatistics {
  [key: string]: TierListStatistic;
}

export class TierListStatisticsServer {
  public serviceName = 'tierListStatistics';
  public getLatest(params: { keys: string[] }) {
    return post<TierListStatistics>(this.serviceName, 'getLatest', params);
  }
  public getStatisticsByKey(params: { key: string; startDate: string; endDate: string }) {
    return post<TierListStatistic[]>(this.serviceName, 'getStatisticsByKey', params);
  }
}
