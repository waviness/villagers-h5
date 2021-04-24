import Vue from 'vue';
import md5 from 'js-md5';
import moment from 'moment';
import uView from 'uview-ui';

import App from './App';
import moments from '@/components-private/moments';
import peaceItem from '@/components-private/peace-item';
import ActionSheet from '@/components-private/action-sheet';
import CommentItem from '@/components-private/comment-item';
import MessageTag from '@/components-private/message-tag';
import eventItem from '@/components-private/event-item.vue';
import nodata from '@/components-private/nodata.vue';
import PeaceSection from '@/components-private/peace-section.vue';
import appTabbar from '@/components-private/app-tabbar.vue';
import commentInput from '@/components-private/comment-input';

// 全局挂载toast
import { toast } from './common/js/util.js';

// 引入api
import './api';

Vue.config.productionTip = false;

Vue.prototype.$md5 = md5;
Vue.prototype.$toast = toast;
Vue.prototype.$moment = moment;

Vue.use(uView);
Vue.component('moments', moments);
Vue.component('peace-item', peaceItem);
Vue.component('action-sheet', ActionSheet);
Vue.component('comment-item', CommentItem);
Vue.component('message-tag', MessageTag);
Vue.component('event-item', eventItem);
Vue.component('nodata', nodata);
Vue.component('peace-section', PeaceSection);
Vue.component('app-tabbar', appTabbar);
Vue.component('comment-input', commentInput);

Vue.mixin({
  methods: {
    setTabBarIndex(index) {
      if (
        typeof this.$mp.page.getTabBar === 'function' &&
        this.$mp.page.getTabBar()
      ) {
        this.$mp.page.getTabBar().setData({
          selected: index,
        });
      }
    },
  },
});

App.mpType = 'app';

const app = new Vue({
  ...App,
});
app.$mount();
