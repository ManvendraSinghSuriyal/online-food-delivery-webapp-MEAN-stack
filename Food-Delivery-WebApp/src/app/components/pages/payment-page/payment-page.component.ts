import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})
export class PaymentPageComponent implements OnInit {

  paymentRequest:any
  order:Order=new Order()

  buttonColor = "black";
  buttonType = "buy";
  isCustomSize = false;
  buttonWidth = 240;
  buttonHeight = 40;
  isTop = window === window.top;


  

 



  constructor(private orderService:OrderService,
    private router:Router,
    private toastr:ToastrService){

    
  

  }
  ngOnInit(): void {
    this.orderService.getOrderForCurrentUser().subscribe({
      next:(order)=>{
        this.order=order
        


        this.paymentRequest = {
          apiVersion: 2,
          apiVersionMinor: 0,
          allowedPaymentMethods: [
            {
              type: "CARD",
              parameters: {
                allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                allowedCardNetworks: ["AMEX", "VISA", "MASTERCARD"]
              },
              tokenizationSpecification: {
                type: "PAYMENT_GATEWAY",
                parameters: {
                  gateway: "example",
                  gatewayMerchantId: "exampleGatewayMerchantId"
                }
              }
            }
          ],
          merchantInfo: {
            merchantId: "12345678901234567890",
            merchantName: "Demo Merchant",
           
      
            
          },
          transactionInfo: {
            totalPriceStatus: "FINAL",
            totalPriceLabel: "Total",
            totalPrice: this.formatPrice(order.totalPrice),
            currencyCode: "USD",
            countryCode: "US",
           
      
          }
        };


        
        
      },
      error:(errorResponse)=>{
         this.router.navigate(['/checkout'])
      }

    })
  }



  onLoadPaymentData(event:any){

    console.log(event.detail)

    


    const paymentResponse = event.detail;

    if(!paymentResponse.error){
    // Extract the payment ID from the paymentResponse object

    this.toastr.success("Transaction successfull!!","Payment")
    const paymentId = paymentResponse.paymentMethodData.tokenizationData.token;
  
    // Save the payment ID in your database, along with other relevant data
    // You would typically do this on your server-side code
    this.order.paymentId=paymentId
 
    
    this.orderService.pay(this.order).subscribe({
      next: (orderId) => {
        // Payment ID saved successfully
        // console.log('Payment ID saved:', orderId);

        this.router.navigate(['/track',orderId])
        
      },
      error: (errorResponse) => {
        // Handle error if saving payment ID fails
        console.error('Error saving payment ID:', errorResponse);
      }
    });
  }
  else{
    this.toastr.error("transaction failed, Payment")
  }
  }

  formatPrice(price: number): string {
    return price.toFixed(2); // Format the price with two decimal places
  }
  
  
  
  
  
  

}
 