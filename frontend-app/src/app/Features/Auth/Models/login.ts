export interface loginApiBody{
    email: string;
    password: string;
}

export interface loginApiResponse{
    success : boolean,
    message : string,
    data : {
        accessToken: string,
        refreshToken: string
    }
}