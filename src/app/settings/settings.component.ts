import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AllServicesService } from '../all-services.service';
interface Setting{
  footerContent:string;
  address:string;
  phoneNumber:string;
  email:string;
  map:string;
  facebook:string;
  instagram:string;
  twitter:string;
  youtube:string;
}
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  settingsForm: FormGroup | any;
  constructor(private fb: FormBuilder,private  allServicesService: AllServicesService) {}

  ngOnInit(): void {
    this.settingsForm = this.fb.group({
      footerContent: ['', Validators.required],
      address: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      map: ['', Validators.required],
      facebook: [''],
      instagram: [''],
      twitter: [''],
      youtube: ['']
    });

    // Load existing settings (if applicable)
    this.loadSettings();
  }

  loadSettings(): void {
    // Mock existing data (you can replace this with actual data from your API)
    const existingSettings = {
      footerContent: 'Elevating cleanliness to an art form...',
      address: 'B1, Gulmohar Apartments, 35 South Boag Road, T Nagar, Chennai - 600001',
      phoneNumber: 'Phone: 755 009 0966',
      email: 'hello@tidytribe.in',
      map: 'https://www.google.com/maps/embed?...',
      facebook: 'https://www.facebook.com/profile.php?...',
      instagram: 'https://www.instagram.com/tidytribechennai/',
      twitter: '',
      youtube: ''
    };

    this.settingsForm.patchValue(existingSettings);
  }

  onSubmit(): void {
    if (this.settingsForm.valid) {
      // Convert form data to a JSON object
      const formData = this.settingsForm.value;
      
      // Call the service to submit the form data
      this.allServicesService.addSetting(formData).subscribe(
        response => {
          console.log('Settings successfully updated!', response);
        },
        error => {
          console.error('Error updating settings', error);
        }
      );
    }
  }
  
  

}
