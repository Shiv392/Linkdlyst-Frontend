import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SideBar } from '../side-bar/side-bar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [CommonModule, SideBar, RouterOutlet],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {}
