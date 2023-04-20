export type NotificationErrorProps = {
    message: string;
    context: string;
}

export default class Notification{
    private _errors: NotificationErrorProps[] = [];

    addError(error: NotificationErrorProps){
        this._errors.push(error);
    }

    errors():NotificationErrorProps[]{
        return this._errors;
    }

    messages(context?: string){
        let message = "";
        this._errors.forEach(error => {
            if(context === undefined || error.context === context){
                message += `${error.context}: ${error.message}, `
            }
        });
        return message;
    }

    hasErrors(){
        return this._errors.length > 0;
    }

    
}