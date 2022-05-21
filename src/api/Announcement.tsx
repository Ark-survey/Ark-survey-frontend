import { post } from '.';

export interface VersionAnnouncement {
  version?: string;
  lang?: string; // 语言
  overview?: string; // 概览
  descriptions?: string[]; // 描述
}

export class VersionAnnouncementServer {
  public serviceName = 'versionAnnouncement';
  public getList() {
    return post<VersionAnnouncement[]>(this.serviceName, 'getList');
  }
}
