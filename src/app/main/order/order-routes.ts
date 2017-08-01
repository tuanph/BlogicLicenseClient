import { OrderComponent } from './order.component';
import { OrderAddComponent } from './order-add/order-add.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { Routes, RouterModule } from '@angular/router';

let orderRoutes: Routes = [
    { path: '', component: OrderComponent },
    { path: 'add', component: OrderAddComponent },
    { path: 'detail/:id', component: OrderDetailComponent }
];
export const OrderRouter = RouterModule.forChild(orderRoutes);