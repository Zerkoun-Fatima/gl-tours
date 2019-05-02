import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanLoad,
  Router,
  UrlSegment,
  Route
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../../services/auth.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) { }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authService.isAuthenticated) {
      this.router.navigateByUrl("/login");
    }
    return this.authService.isAuthenticated;
  }
}
