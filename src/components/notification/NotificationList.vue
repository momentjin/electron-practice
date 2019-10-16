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
      :fixed="true"
    >
      <template v-slot:activator="{ on }">
        <v-badge>
          <template v-if="newNotificationNum>0" v-slot:badge>{{newNotificationNum}}</template>
          <v-icon v-on="on" small dark title="notification">mail_outline</v-icon>
        </v-badge>
      </template>

      <div class="notification-header">
        <b>알림 보관함</b>
      </div>
      <div v-if="!notifications || !notifications.length">알림이 존재하지 않습니다.</div>

      <div v-else class="notification-list">
        <notification-item
          v-for="item in notifications"
          :key="item.id"
          :notification-id="item.id"
          :coverletter-id="item.coverletterId"
          :contents="item.contents"
          :checked="item.checked"
          :create-date="item.createDate"
        />
      </div>
    </v-menu>
  </li>
</template>

<script>
import NotificationItem from "@/components/notification/NotificationItem.vue";
import { mapState } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["notifications"]),
    newNotificationNum() {
      return this.notifications.filter(notifications => !notifications.checked)
        .length;
    }
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
  padding: 8px 10px 8px 10px;
  border-bottom: 0.01px solid black;
  background-color: black;
  color: white;
}

.notification-list {
  overflow: scroll;
  max-height: 500px;
}
</style>