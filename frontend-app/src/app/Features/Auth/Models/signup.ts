export interface signupApiBody{
    email: string;
    password: string;
    name: string;
}

export interface signupResponse{
    success: boolean;
    message: string;
}