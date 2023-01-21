import { Component, EventEmitter, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { SuccessSubmitModel } from "src/app/models/cart/successSubmit.model";

@Component({
    selector: 'app-submit-cart',
    templateUrl: './submitCart.component.html',
    styleUrls: ['./submitCart.component.css']
})

export class SubmitCartComponent {
    @Output() afterSubmit = new EventEmitter<string>();

    // form controles
    cartForm: FormGroup = new FormGroup({
        fullName: new FormControl('', [Validators.required, Validators.minLength(3)]),
        address: new FormControl('', [Validators.required, Validators.minLength(6)]),
        cardDigit: new FormControl('',
            [Validators.required,
            Validators.minLength(16),
            Validators.maxLength(16),
            // regex to enter numbers between 0 and 9 with max length 16 digit
            Validators.pattern("^[0-9]{16}$")],
        )
    });

    enter16NumberOnly(event: Event): boolean {
        return !((event.target as HTMLInputElement).value.length >= 16);
    }

    submitCart() {
        if (this.cartForm.invalid) {
            this.cartForm.markAllAsTouched();
            return;
        }
        var fullName = this.cartForm.value.fullName;
        var address = this.cartForm.value.address;
        var cardDigit = this.cartForm.value.cardDigit;
        // after saving
        this.afterSubmit.emit(fullName);
    }


}
