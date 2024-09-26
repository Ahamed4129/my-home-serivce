import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AllServicesService {
  private categoriesUrl = 'http://localhost:3000/categories';
  private servicesUrl = 'http://localhost:3000/services';
  private baseUrl = 'https://localhost:7163/api';
  constructor(private http: HttpClient) { }
 
  // getCategories(): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.categoriesUrl}/categories`);
  // }

  // addCategory(category: any): Observable<any> {
  //   return this.http.post<any>(this.categoriesUrl, category);
  // }

  // updateCategory(category: any): Observable<any> {
  //   return this.http.put<any>(`${this.categoriesUrl}/${category.id}`, category);
  // }

  // deleteCategory(id: number): Observable<any> {
  //   return this.http.delete<any>(`${this.categoriesUrl}/${id}`);
  // }

  // // Service methods
  // getServices(): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.servicesUrl}/services`);
  // }

  // addService(service: any): Observable<any> {
  //   // Remove the File object before sending to the server
  //   const serviceData = { ...service };
  //   delete serviceData.image;
       
  //   return this.http.post<any>(this.servicesUrl, serviceData);
  // }
  // updateService(service: any): Observable<any> {
  //   return this.http.put<any>(`${this.servicesUrl}/${service.id}`, service);
  // }

  // deleteService(id: number): Observable<any> {
  //   return this.http.delete<any>(`${this.servicesUrl}/${id}`);
  // }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/categories`);
  }

  // Add a new category
  addCategory(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/categories`, formData);
  }
  

  // Update a category
  updateCategory(formData: FormData, id: number): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/categories/${id}`, formData);
  }
  

  // Delete a category
  deleteCategory(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/categories/${id}`);
  }

  getService():Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrl}/service`);
  }
  addService(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/service`, formData);
  }
  
  updateService(formData: FormData, id: number): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/service/${id}`, formData);
  }
  deleteService(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/service/${id}`);
  }
  addBooking(bookingData: any): Observable<any> {
    const headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    return this.http.post<any>(`${this.baseUrl}/Booking`, JSON.stringify(bookingData), { headers });
}
getBooking():Observable<any[]>{
  return this.http.get<any[]>(`${this.baseUrl}/booking`);
}
  updateBooking(formData: FormData, id: number): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/booking/${id}`, formData);
  }
  deleteBooking(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/booking/${id}`);
  }
getTestimonal():Observable<any[]>{
  return this.http.get<any[]>(`${this.baseUrl}/Testimonal`);
}
addTestimonal(formData: FormData): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}/Testimonal`, formData);
}

updateTestimonal(formData: FormData, id: number): Observable<any> {
  return this.http.put<any>(`${this.baseUrl}/Testimonal/${id}`, formData);
}
deleteTestimonal(id: number): Observable<any> {
  return this.http.delete<any>(`${this.baseUrl}/Testimonal/${id}`);
}
addSetting(formData:FormData):Observable<any>{
  return this.http.post<any>(`${this.baseUrl}/Setting`,formData)
}
getStatic():Observable<any[]>{
  return this.http.get<any[]>(`${this.baseUrl}/StaticPage`);
}
updateStatic(formData:FormData,id:number):Observable<any>{
  console.log("formData",formData)
  return this.http.put<any>(`${this.baseUrl}/StaticPage/${id}`, formData);
}
}