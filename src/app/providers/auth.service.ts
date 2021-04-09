import {Injectable} from '@angular/core';
import {HostConfigProvider} from "./host-config.provider";
import {HttpClient} from "@angular/common/http";
import {User} from "./user";
import {Router} from "@angular/router";


const TOKEN_KEY = 'token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated: boolean;

  constructor(
    private configProvider: HostConfigProvider,
    private httpClient: HttpClient,
    private router: Router
  ) {
    if (this.getToken() != ''){
      this.isAuthenticated = true;
    }
    else{
      this.isAuthenticated = false;
    }
  }

  public async authenticate(username: string, password: string): Promise<string | Error> {
    const token = await this.login({username, password});
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
      this.isAuthenticated = true;
    }
    return token;
  }

  protected async login(user: User): Promise<any> {
    return await this.httpClient.post(
      this.configProvider.getApiUrl() + '/user/login',
      {
        username: user.username,
        password: user.password
      }
      , {
        responseType: 'json'
      },
    ).toPromise();
  }

  public async logout(): Promise<void> {
    await this.httpClient.post(
      this.configProvider.getApiUrl() + '/user/logout',
      {}
      , {
        responseType: 'json'
      },
    ).toPromise().then((done: boolean)=>{
      localStorage.removeItem(TOKEN_KEY);
      this.isAuthenticated = false;
      this.router.navigate(['login']);
    }, error => {
      console.log(error);
    });
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  public getToken(): string {
    if (!!localStorage.getItem(TOKEN_KEY)) {
      return localStorage.getItem(TOKEN_KEY);
    } else {
      return '';
    }
  }
}


