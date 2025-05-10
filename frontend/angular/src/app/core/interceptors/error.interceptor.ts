// error.interceptor.ts

import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: any) => {
      let msg: string;

      // Eğer backend {"message":"..."} diye bir JSON objesi yolladıysa:
      if (error.error && typeof error.error === 'object' && error.error.message) {
        msg = error.error.message;
      }
      // Eğer düz string geliyorsa:
      else if (typeof error.error === 'string') {
        msg = error.error;
      }
      // Diğer tüm durumlar için fallback:
      else {
        msg = error.statusText || 'Bilinmeyen bir hata oluştu';
      }

      return throwError(() => msg);
    })
  );
};
