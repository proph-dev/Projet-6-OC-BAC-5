import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';
import { SessionInformation } from 'src/app/interfaces/sessionInformation.interface';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let controller: HttpTestingController;
  const pathService: string = 'api/auth';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AuthService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register', () => {
    service
      .register({ email: '', password: '' })
      .subscribe({
        next: (_) => {},
      });
    controller.expectOne(pathService + '/register');
    controller.verify();
  });

  it('should login', () => {
    const expectedSessionInfo: SessionInformation = {
      id: 1,
      username: 'jonny',
      token: 'jwt',
      type: 'Bearer',
      admin: false,
    };
    var actualSessionInfo: SessionInformation | undefined;
    service.login({ email: '', password: '' }).subscribe({
      next: (sessionInfo) => (actualSessionInfo = sessionInfo),
    });
    const request = controller.expectOne(pathService + '/login');
    request.flush(expectedSessionInfo);
    expect(actualSessionInfo).toBe(expectedSessionInfo);
    controller.verify();
  });
});
