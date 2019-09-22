<template>
  <li>
    <v-menu
      content-class="notification-container"
      offset-y
      class="my_clazz"
      min-width="400px"
      max-height="600px"
      :close-on-content-click="false"
      z-index="999"
      :right="true"
      nudge-right="50"
      nudge-top="100"
    >
      <template v-slot:activator="{ on }">
        <v-badge>
          <!-- 새로 도착한 메세지 api로 받아서 바인딩해야 한다. -->
          <template v-slot:badge>15</template>
          <v-icon v-on="on" small dark title="notification">mail_outline</v-icon>
        </v-badge>
      </template>

      <div class="notification-header">
        <b>알림 보관함</b>
      </div>
      <div class="notification-list" v-for="item in notifications" :key="item.id">
        <notification-item
          :coverletter-id="item.coverletterId"
          :contents="item.contents"
          :is-checked="item.isChecked"
          :create-date="item.createDate"
        />
      </div>
      <div v-if="!notifications || !notifications.length">
        알림이 존재하지 않습니다.
      </div>
    </v-menu>
  </li>
</template>

<script>
import NotificationItem from "./NotificationItem.vue";
import { mapState } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["notifications"])
  },
  components: { NotificationItem }
};
</script>

<style>
.notification-container {
  background-color: white;
  border: 0.01px solid black;
}

.notification-header {
  padding: 8px;
  border-bottom: 0.01px solid black;
}
</style>