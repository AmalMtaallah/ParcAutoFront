import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ToasterConfig, ToasterService } from 'angular2-toaster';
import { AuthetificationService } from './serviceauth/authetification.service';
import Echo from 'laravel-echo';

@Component({
  selector: 'body',
  styleUrls: ['../scss/vendors/toastr/toastr.scss'],
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  
  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 5000
    });
  user: any;
    
  constructor(private router: Router, private toasterService: ToasterService,private auth:AuthetificationService) { }

  ngOnInit() {
//status auth :
const echo = new Echo({
  broadcaster: 'pusher',
  key: 'ABCDEFG',
  cluster: 'mt1',
  wsHost: window.location.hostname,
  wsPort: 6001,
  forceTLS: false,    // Important Line
  disableStats: true,
});
echo.channel('notification')
  .listen('NotEvent', (res) => {
    console.log('Chat Event Data : ', res);
  });

console.log("test test appcomponents   "+this.router.url);
   
      
this.user = JSON.parse( localStorage.getItem('user'));
this.auth.status();
console.log("test status " +this.auth.status());
//test now
 /*  if(this.user === null )
    {
     this.router.navigateByUrl('/login');
      console.log("user login in app components");
    }*/
    //console.log(this.router.url);

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
