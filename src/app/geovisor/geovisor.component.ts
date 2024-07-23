import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { SidebarComponent } from "../shared/sidebar/sidebar.component";

@Component({
  selector: 'app-geovisor',
  standalone: true,
  imports: [RouterModule, NavbarComponent, SidebarComponent],
  templateUrl: './geovisor.component.html',
  styleUrl: './geovisor.component.css'
})
export default class GeovisorComponent {

}
