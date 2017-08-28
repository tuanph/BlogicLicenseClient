import { Routes } from '@angular/router';
import { MainComponent } from './main.component';
export const mainRoutes: Routes = [
    {
        path: '', component: MainComponent, children: [
            { path: '', redirectTo: 'store', pathMatch: 'full' },
            { path: 'home', loadChildren: './home/home.module#HomeModule' },
            { path: 'user', loadChildren: './user/user.module#UserModule' },
            { path: 'announcement', loadChildren: './announcement/announcement.module#AnnouncementModule' },
            { path: 'store', loadChildren: './store/store.module#StoreModule' },
            { path: 'unregister-key', loadChildren: './unregister-key/unregister-key.module#UnregisterKeyModule' }
        ]
    }

]