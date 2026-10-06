export interface loginApiBody{
    email: string;
    password: string;
}

export interface loginApiResponse{
    success : boolean,
    message : string,
    data : {
        access_token: string,
        refresh_token: string
    }
}