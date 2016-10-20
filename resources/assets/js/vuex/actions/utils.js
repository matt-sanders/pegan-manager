export function parseResponse(response){
    if ( typeof response.data == 'Object' || typeof response.data == 'object' ) return response.data;
    if ( typeof response.body == 'string' ) {
        let body = JSON.parse(response.body);
        return body;
    }
    return response.body;
}

export function encodeBase64(data){
    return btoa(JSON.stringify(data));
}

export function decodeBase64(data){
    return JSON.parse(window.atob(data));
}
