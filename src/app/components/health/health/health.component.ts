import { Component, OnInit } from '@angular/core';
import { HealthService } from 'src/app/services/health/health.service';

@Component({
  selector: 'app-health',
  templateUrl: './health.component.html',
  styleUrls: ['./health.component.scss']
})
export class HealthComponent implements OnInit {
  healthData:any = {}; 
  constructor(private healthService: HealthService) { }

  ngOnInit(): void {
    this.getPatientHealthInfo()
  }

  
  getPatientHealthInfo() {
    this.healthService.getPatientHealthInfo().subscribe((result: any) => {
      this.healthData = result.data
      console.log(this.healthData);
    });

  }
}
