import { Component, AfterViewChecked, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewChecked {
  title = 'app';

  constructor(private elementRef: ElementRef) {

  }

  ngAfterViewChecked() {
    var existsScript = document.getElementById("customJS");
    if (existsScript != null) {
      this.elementRef.nativeElement.removeChild(existsScript);
    }
    else {
      var cusScript = document.createElement("script");
      cusScript.type = "text/javascript";
      cusScript.src = "../assets/js/custom.js";
      cusScript.id = "customJS";
      this.elementRef.nativeElement.appendChild(cusScript);
    }
  }

}
