import chai from 'chai';
const expect = chai.expect;
import sinonChai from 'sinon-chai';
import sinon from 'sinon';
import Vue from 'vue';
import Vuex from 'vuex';
const ToggleNavInjector = require('!!vue?inject!../../../resources/assets/js/components/ToggleNav.vue');
import menu from '../../../resources/assets/js/vuex/modules/menu';
Vue.use(Vuex);
chai.use(sinonChai);

let SetMenuSpy = sinon.spy();

const ToggleNavWithMocks = ToggleNavInjector({
    '../vuex/actions/menu': {
        setMenu: SetMenuSpy
    }
});

let store = new Vuex.Store({
    modules: {
        menu
    }
});

const getComponent = () => {
    let vm = new Vue({
        template: '<div><toggle-nav v-ref:nav></toggle-nav></div>',
        components: {
            'toggle-nav': ToggleNavWithMocks
        }
    });
};

describe('Toggle Nav', () => {

    it('should call the inverted menu state', () => {
        /*
        let vm = getComponent();
        let nav = vm.$refs.nav;
        nav.toggleMenu();

        expect(store.state.menu.active).to.be.true;
         */
    });
    
});
