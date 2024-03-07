import { Component, OnInit } from '@angular/core';
import { UserDto } from 'src/app/dto/user.dto';
import { SessionService } from 'src/app/services/session.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.scss'],
})
export class UserProfilComponent implements OnInit {
  user: UserDto = { id: 0, email: '', username: '' };

  constructor(
    private userService: UserService,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    this.userService.getUserById().subscribe((data) => {
      this.user = data;
    });
  }

  updateProfile(): void {
    this.userService.updateUser(this.user).subscribe(() => {});
    alert('Modification effectuée !')
  }

  logOut(): void {
    this.sessionService.logOut();
  }
}
