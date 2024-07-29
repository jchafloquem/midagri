import {CommonModule, NgClass} from '@angular/common';
import {Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';

@Component({
	selector: 'app-sidebar',
	standalone: true,
	imports: [CommonModule, MatIconModule, NgClass],
	templateUrl: './sidebar.component.html',
	styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
	public subMenu = 'capas';
	public toogleMenu = true;

	clickToogleMenu(): void {
		this.toogleMenu = !this.toogleMenu;
	}
}
