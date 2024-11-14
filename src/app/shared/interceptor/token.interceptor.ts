import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

export class tokenInterceptor implements HttpInterceptor {
  constructor(private router: Router, private userService: UserService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = 'jvgzdcklisdbclisd';
    const headers = new HttpHeaders({
      Authorization: token,
    })

    const headerClone = req.clone({headers});
    return next.handle(headerClone).pipe(
      catchError((error) => {
        const myError = error.error.message || '';
        console.log('Error: ' + error);
        
        this.router.navigate(['/welcome/doctor']);

        return throwError(error)
      })
    );
  }
};
