<template>
  <div
    class="notification-item"
    :notification-id="notificationId"
    @click.stop.capture="onClickNotification(notificationId)"
    v-bind:class="{ notification_active: !checked}"
  >
    <div class="notification-item-top">{{contents}}</div>
    <div class="notification-item-bottom">{{createDate.replace('T', ' ').substring(0, 16)}}</div>
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
      required: true
    }
  },
  data() {
    return {
      active: this.isChecked
    };
  },
  methods: {
    ...mapActions(["CHECK_NOTIFICATION"]),
    onClickNotification() {
      debugger;
      this.CHECK_NOTIFICATION(this.notificationId);

      const popup = window.open(
        `coverletters/${this.coverletterId}/info`,
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
  border-bottom: 0.5px solid #e3e3e3;
  padding: 5px 10px 5px 10px;
}

.notification_active {
  background-color: #edf2fa;
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
  font-size: 12px;
}
</style>