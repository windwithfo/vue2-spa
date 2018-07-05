/**
 * @file mint-ui components
 * @author windwithfo(windwithfo@yeah.net)
 */

import Vue from 'vue';

// components
import {
  Field,
  Swipe,
  popup,
  Button,
  Picker,
  SwipeItem,
  TabContainer,
  TabContainerItem,
} from 'mint-ui';

// add reference
Vue.component(Swipe.name, Swipe);
Vue.component(popup.name, popup);
Vue.component(Field.name, Field);
Vue.component(Picker.name, Picker);
Vue.component(Button.name, Button);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
