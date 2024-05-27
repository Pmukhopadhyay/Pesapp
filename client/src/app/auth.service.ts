import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { share } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: any;
  email: any;
  
  constructor(private http: HttpClient,public cookieService: CookieService) { 
    let tokenFromCookie =  this.cookieService.get('token');
    let emailFromCookie = this.cookieService.get('email');
    if(emailFromCookie) this.email = emailFromCookie;
    console.log("From authService constructor, tokenFromCookie="+tokenFromCookie);
    console.log("From authService constructor, emailFromCookie="+emailFromCookie);
    if(tokenFromCookie) this.token = tokenFromCookie;
  }

  login(email:string,password:string){
    let ob = this.http.post('http://localhost:3000/api/auth/login',{
      email: email,
      password: password,
    }).pipe(share());
    
    ob.subscribe((response) => {
      let token = this.getTokenFromResponse(JSON.stringify(response));
      this.token=token;
      this.email = email;
      this.cookieService.set('token', token);
      this.cookieService.set('email', email);
    });
    return ob;
  }

  logout(){
    this.token=undefined;
    this.email=undefined;
    this.cookieService.deleteAll();
  }

  getTokenFromResponse(response:string){
    let obj = JSON.parse(response);
    let token = obj.token;
    return token;
  }

  getToken(){
    return this.token;
  }
}
