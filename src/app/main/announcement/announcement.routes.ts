import { Routes, RouterModule } from '@angular/router';
import { AnnouncementComponent } from "./announcement.component";
let aRoutes: Routes = [
    { path: '', component: AnnouncementComponent }
];
export const AnnouncementRoutes = RouterModule.forChild(aRoutes);