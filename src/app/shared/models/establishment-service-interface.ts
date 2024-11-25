import { EstablishmentInterface } from "./establishment-interface";
import { ServiceInterface } from "./service-interface";

export interface EstablishmentServiceInterface {
    service: ServiceInterface,
    establishment: EstablishmentInterface,
}
