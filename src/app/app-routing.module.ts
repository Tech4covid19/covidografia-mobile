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
  },
  {
    path: 'video',
    loadChildren: () => import('./pages/video/video.module').then( m => m.VideoPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'post-code',
    loadChildren: () => import('./pages/post-code/post-code.module').then( m => m.PostCodePageModule)
  },
  {
    path: 'walkthrough',
    loadChildren: () => import('./pages/walkthrough/walkthrough.module').then( m => m.WalkthroughPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
