import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterModule } from './footer/footer.module';
import { NavbarModule } from './navbar/navbar.module';
import { SidebarModule } from './sidebar/sidebar.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, SidebarModule, NavbarModule, FooterModule],
  exports: [SidebarModule, NavbarModule, FooterModule],
})
export class SharedModule {}
