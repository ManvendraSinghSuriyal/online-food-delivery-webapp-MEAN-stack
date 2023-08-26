import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoodPageComponent } from './components/pages/food-page/food-page.component';
import { HomeComponent } from './components/pages/home/home.component';
import { SearchComponent } from './components/pages/search/search.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { LoginComponent } from './components/pages/login/login.component';
import { CheckoutComponent } from './components/pages/checkout/checkout.component';
import { authGuard } from './guards/auth.guard';
import { PaymentPageComponent } from './components/pages/payment-page/payment-page.component';
import { TrackOrderComponent } from './components/pages/track-order/track-order.component';

const routes: Routes = [
  {
    path:'',component:HomeComponent
  },{

    path:'search/:searchTerm', component:HomeComponent
  },
  {
    path:'tag/:tag', component:HomeComponent
  },
  {
    path:'food/:foodId', component:FoodPageComponent
  }

  ,{


    path:'cart-page', component:CartPageComponent
  },

  {


    path:'login', component:LoginComponent
  },
  {
    path:'checkout', component:CheckoutComponent ,canActivate:[authGuard]
  },
  {
    path:'payment',component:PaymentPageComponent,canActivate:[authGuard]
  },
  {path:'track/:orderId', component: TrackOrderComponent, canActivate:[authGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
