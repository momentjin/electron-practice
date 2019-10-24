import Vue from 'vue';
import moment from 'moment';
import VueMomentJs from 'vue-momentjs';


moment.locale('ko');
Vue.use(VueMomentJs, moment);