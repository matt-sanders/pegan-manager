export function parseResponse(response){
    if ( typeof response.data == 'Object' ) return response.data;
    if ( typeof response.body == 'string' ) {
        let body = JSON.parse(response.body);
        return body;
    }
    return response.body;
}
