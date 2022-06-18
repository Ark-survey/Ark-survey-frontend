import { post } from 'src/utils/ApiUtils';

export interface MetaData {
  version?: string;
  needUpdate?: boolean;
  imgUrlOrigin?: string;
}

export class MetaDataServer {
  public serviceName = 'metaData';
  public latest() {
    return post<MetaData>(this.serviceName, 'latest');
  }
}
