import { AuthService } from "./../../../services/auth.service";
import { Component, OnInit } from "@angular/core";
import { User } from "src/app/models/user.model";
import { NavController } from "@ionic/angular";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-profil",
  templateUrl: "./profil.page.html",
  styleUrls: ["./profil.page.scss"]
})
export class ProfilPage implements OnInit {
  user: User;
  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has("profilId")) {
        this.router.navigate(["/places/tabs/discover"]);
        return;
      }
      const userId = paramMap.get("profilId");
      console.log("user'id", userId);

      this.user = this.authService.getUser().value;
    });
  }
}
