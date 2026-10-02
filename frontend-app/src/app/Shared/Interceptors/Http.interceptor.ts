import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

export const httpInterceptor: HttpInterceptorFn = (request, next) => {

    const cookieService = inject(CookieService);

	const urlPath = request.url.split(/[?#]/, 1)[0];
	const isAuthRequest = /(?:^|\/)auth(?:\/|$)/.test(urlPath);

	const token = isAuthRequest ? null : cookieService.get('x-access-token');
	const headers: Record<string, string> = {};

	if (!request.headers.has('Accept')) {
		headers['Accept'] = 'application/json';
	}
	if (token && !request.headers.has('Authorization')) {
		headers['Authorization'] = `Bearer ${token}`;
	}

	return next(Object.keys(headers).length ? request.clone({ setHeaders: headers }) : request);
};
