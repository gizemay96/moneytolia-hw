import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, HostListener, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  menuItems = [
    {
      path: 'campaigns',
      label: 'Kampanya Listeleme',
      icon: 'campaign_link.png',
      activeIcon: 'campaign_link_active.png'
    },
    {
      path: 'create-campaign',
      label: 'Kampanya Oluşturma',
      icon: 'create_camp_link.png',
      activeIcon: 'create_camp_link_active.png'
    }
  ]


  constructor(private router: Router, private route: ActivatedRoute, private observer: BreakpointObserver , private cdr: ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 992px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
      this.cdr.detectChanges();
    });
  }

  ngOnInıt() {
    this.router.navigate(['campaigns'], { relativeTo: this.route });
  }

  routeToChild(path: string) {
    this.router.navigate([path], { relativeTo: this.route });
  }

  isActiveRoute(path: string) {
    return this.router.url === `/dashboard/${path}`;
  }

}
