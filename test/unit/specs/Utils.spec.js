import chai from 'chai';
const expect = chai.expect;
import * as utils from '../../../resources/assets/js/vuex/actions/utils.js';

let body = {
    foo: 'bar'
};

let encoded = 'eyJmb28iOiJiYXIifQ=='; //base64 for body

describe('Utils', () => {
    describe('parseResponse', () => {
        it('returns object', () => {
            let data = {
                data: body
            };
            let response = utils.parseResponse(data);
            expect(response).to.deep.equal(body);
        });

        it('returns from string', () => {
            let data = {
                body: JSON.stringify(body)
            };
            let response = utils.parseResponse(data);
            expect(response).to.deep.equal(body);
        });

        it('returns body', () => {
            let data = {
                body: {}
            };
            let response = utils.parseResponse(data);
            expect(response).to.deep.equal(data.body);
        });
    });

    it('encodeBase64', () => {
        let response = utils.encodeBase64(body);
        expect(encoded).to.equal(response);
    });

    it('decodeBase64', () => {
        let response = utils.decodeBase64(encoded);
        expect(response).to.deep.equal(body);
    });
});
