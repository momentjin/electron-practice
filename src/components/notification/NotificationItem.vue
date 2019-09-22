<template>
  <div class="notification-item" @click.stop="onClickNotification" v-bind:class="{ notification_active: isChecked}">
    <div class="notification-item-top">{{contents}}</div>
    <div class="notification-item-bottom">{{createDate}}</div>
  </div>
</template>

<script>
export default {
  props: {
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
    isChecked: {
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
    onClickNotification() {
      alert("클릭");
      return;

      // let routeData = this.$router.resolve({
      //   name: "coverletterDetail",
      //   params: { cid: this.coverletterId }
      // });

      // const popup = window.open(
      //   routeData.href,
      //   `coverletter${this.coverletterId}`,
      //   "width=500,height=700"
      // );

      // const self = this;

      // popup.onload = function() {
      //   popup.onbeforeunload = function() {
      //     self.FETCH_COVERLETTERS();
      //   };
      // };
    }
  }
};
</script>

<style>
.notification-item {
  border-bottom: 0.5px solid #E3E3E3;
  padding: 5px;
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