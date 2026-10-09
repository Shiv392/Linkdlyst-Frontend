export interface getLinksApiResponse{
    success : boolean,
    message : string,
    data: {
        data : Link[],
        totalCount: number
    }
}
export interface Link{
    id: number,
    name: string,
    shortCode: string,
    url: string,
    createdAt : string
}

export interface addLinkApiBody{
    name : string,
    url : string,
    securityPassword : string
}
export interface editLinkApiBody{
    id: number
    url : string,
    securityPassword : string
}