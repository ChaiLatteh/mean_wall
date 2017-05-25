import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MessagesComponent } from './messages/messages.component';

const APP_ROUTES: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'messages', component: MessagesComponent},
]
export const routing = RouterModule.forRoot(APP_ROUTES);
