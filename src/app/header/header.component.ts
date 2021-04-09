import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from "../providers/auth.service";
import {FormControl} from "@angular/forms";
import {FilterService} from "../providers/filter.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private filterService: FilterService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  applyFilter(filter: string): void{
    this.filterService.applyFilter(filter);
  }

  performLogout(): void {
    this.authService.logout();
    this.router.navigate(['login'])
  }

  checkLogin(): boolean{
    return this.authService.isLoggedIn();
  }
}
