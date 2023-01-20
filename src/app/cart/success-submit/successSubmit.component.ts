import { Component, Input } from "@angular/core";
import { SuccessSubmitModel } from "src/app/models/cart/successSubmit.model";

@Component({
    selector: 'app-success-submit',
    templateUrl: 'successSubmit.component.html',
    styleUrls: ['successSubmit.component.css']
})

export class SuccessSubmitComponent {
    @Input() successSubmitModel: SuccessSubmitModel = new SuccessSubmitModel('', 0);
}