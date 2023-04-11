
import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerHasAddressChangedEvent from "../customer-has-address-changed.event";

export default class EnviaConsoleLogChangeAddress implements EventHandlerInterface<CustomerHasAddressChangedEvent>{

    handle(event: CustomerHasAddressChangedEvent): void {
        console.log(`Endereço do cliente id ${event.eventData.id} foi alterado para ${JSON.stringify(event.eventData.Address)}`)
    }

}