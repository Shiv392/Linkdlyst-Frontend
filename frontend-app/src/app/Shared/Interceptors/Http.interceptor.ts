import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

export const httpInterceptor: HttpInterceptorFn = (request, next) => {

    const cookieService = inject(CookieService);

    const urlPath = request.url.split(/[?#]/, 1)[0];
    const isAuthRequest = /(?:^|\/)auth(?:\/|$)/.test(urlPath);

    const token = isAuthRequest
        ? null
        : cookieService.get('user_access_token');
	const refreshToken = isAuthRequest ? null : cookieService.get("refresh_token");

    const headers: Record<string, string> = {};

    if (!request.headers.has('Accept')) {
        headers['Accept'] = 'application/json';
    }

    if (token && !request.headers.has('Authorization')) {
        headers['Authorization'] = `Bearer ${token}`;
    }
	if(refreshToken && !request.headers.has("RefreshToken")){
		headers['RefreshToken'] = refreshToken;
	}

    const clonedRequest = request.clone({
        withCredentials: true,
        ...(Object.keys(headers).length > 0
            ? { setHeaders: headers }
            : {})
    });

    return next(clonedRequest);
};