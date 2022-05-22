import { post } from '.';

export interface CharStatistic {
  avgValue: 0; // 均分
  count: 0; // 被评价的次数
}

// 同一个 key 的 TierList 统计信息
export interface TierListStatistic {
  count: 0; // 样本数量
  validCount: 0; // 被纳入统计的样本数量
  charStatistics: { [key: string]: CharStatistic };
  createdDate: string; // 创建日期
}

export interface TierListStatistics {
  [key: string]: TierListStatistic;
}

export class TierListStatisticsServer {
  public serviceName = 'tierListStatistics';
  public getLatestStatisticsByKeys(params: { keys: string[] }) {
    return post<TierListStatistics>(this.serviceName, 'getLatestStatisticsByKeys', params);
  }
  public getStatisticsByKey(params: { key: string; startDate: string; endDate: string }) {
    return post<TierListStatistic[]>(this.serviceName, 'getStatisticsByKey', params);
  }
}
