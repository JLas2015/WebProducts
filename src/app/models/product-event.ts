import { ProductEvents } from "./data-state-enum";

export interface ProductActionEvent {
    type: ProductEvents,
    payload?: any
}
