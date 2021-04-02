import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class HostConfigProvider {

  private config: HostConfig = {
    apiUrl: undefined
  };


  constructor(private httpClient: HttpClient) {
  }
  getApiUrl(): string {
    return this.config.apiUrl;
  }

  async loadConfig(): Promise<void> {
    const jsonFile = '/assets/config.json';
    this.config = await this.httpClient.get<HostConfig>(jsonFile).toPromise();
  }
}

interface HostConfig {
  apiUrl: string;
}
