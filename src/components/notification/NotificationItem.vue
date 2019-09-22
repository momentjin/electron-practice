<template>
  <div class="notification-item" :notification-id="notificationId" @click.stop.capture="onClickNotification(notificationId)" v-bind:class="{ notification_active: !checked}">
    <div class="notification-item-top">{{contents}}</div>
    <div class="notification-item-bottom">{{createDate}}</div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    notificationId: {
      type: Number,
      required: true
    },
    coverletterId: {
      type: Number,
      required: true
    },
    contents: {
      type: String,
      required: true
    },
    createDate: {
      type: String,
      required: true
    },
    checked: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      active: this.isChecked,
    }
  },
  methods: {
    ...mapActions(["CHECK_NOTIFICATION"]),
    onClickNotification(id) {
      this.CHECK_NOTIFICATION(id);

      let routeData = this.$router.resolve({
        name: "coverletterDetail",
        params: { cid: this.coverletterId }
      });

      const popup = window.open(
        routeData.href,
        `coverletter${this.coverletterId}`,
        "width=500,height=700"
      );

      const self = this;

      popup.onload = function() {
        popup.onbeforeunload = function() {
          self.FETCH_COVERLETTERS();
        };
      };
    }
  }
};
</script>

<style>
.notification-item {
  border-bottom: 0.5px solid #E3E3E3;
  padding: 5px 10px 5px 10px;
}

.notification_active {
  background-color: #EDF2FA;
}

.notification-item:hover {
  background-color: #f7f7f7;
  cursor: pointer;
}

.notification-item-top {
  font-size: 12px;
}

.notification-item-bottom {
  color: gray;
  text-align: right;
  font-size: 8px;
}
</style>