import { post } from 'src/utils/ApiUtils';

export interface User {
  id?: string;
  password?: string;
}

export class UserServer {
  public serviceName = 'user';
  public createOne(params: User) {
    return post<User>(this.serviceName, 'createOne', params);
  }
  public updateOne(params: User) {
    return post<User>(this.serviceName, 'updateOne', params);
  }
  public getById(params: { id: string }) {
    return post<User>(this.serviceName, 'getById', params);
  }
}
