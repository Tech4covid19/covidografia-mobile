import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'status-update',
    loadChildren: () => import('./pages/status-update/status-update.module').then( m => m.StatusUpdatePageModule)
  },
  {
    path: 'change-state-step1',
    loadChildren: () => import('./pages/change-state-step1/change-state-step1.module').then( m => m.ChangeStateStep1PageModule)
  },
  {
    path: 'change-state-step2',
    loadChildren: () => import('./pages/change-state-step2/change-state-step2.module').then( m => m.ChangeStateStep2PageModule)
  },
  {
    path: 'change-state-step3',
    loadChildren: () => import('./pages/change-state-step3/change-state-step3.module').then( m => m.ChangeStateStep3PageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
