export interface Subscription {
    _id: string;
    user_email : string;
    plan_id: string;
    status : string;
    start_date: string;
    end_date: string;
    billing_cycle: string;
}

export interface Plans {
    _id: string;
    name  : string;
    price : number;
    billing_cycle  : string;
}