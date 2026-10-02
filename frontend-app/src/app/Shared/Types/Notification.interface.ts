export interface NotificationInterface{
    summary : string;
    detail : string;
}

export interface NotificationEvent{
    type : 'success' | 'error' | 'info' | 'warn';
    summary : string;
    detail : string;
}