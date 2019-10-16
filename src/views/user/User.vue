<template>
  <div class="menu-container">
    <my-header title="설정" :buttons="headerButtons"></my-header>

    <div class="profile-item">
      <profile-image />
    </div>

    <div class="profile-item">
      <div class="input_wrapper">
        <div class="info-title">
          아이디
        </div>
        <div>
          <input class="info-field" :value="memberInfo.id" disabled type="text" />
        </div>
      </div>
    </div>

    <div class="profile-item">
      <div class="input_wrapper">
        <div class="info-title">
          이름
          <span class="rule"> ({{name.length}}/10) </span>
        </div>
        <div>
          <input class="info-field" v-model="name" type="text" maxlength="10" />
        </div>
      </div>
    </div>

    <div class="profile-item">
      <div class="input_wrapper">
        <div class="info-title">
          좌우명
          <span class="rule"> ({{motto.length}}/30) </span>
        </div>
        <div>
          <input class="info-field" v-model="motto" maxlength="30" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileImage from "@/components/user/ProfileImage.vue";
import MyHeader from "@/components/common/MyHeader.vue";
import { mapActions, mapState } from "vuex";

export default {
  components: { MyHeader, ProfileImage },
  data() {
    return {
      headerButtons: [
        {
          title: "save",
          icon: "send",
          action: this.saveUserData,
        }
      ]
    }
  },
  created() {
    this.getMemberInfo();
  },
  computed: {
    ...mapState(["memberInfo"]),
    name: {
      get() {
        return this.memberInfo.name;
      },
      set(value) {
        return this.$store.commit("SET_MEMBER_NAME", value);
      }
    },
    motto: {
      get() {
        return this.memberInfo.motto;
      },
      set(value) {
        return this.$store.commit("SET_MEMBER_MOTTO", value);
      }
    },
    profileImageUrl: {
      get() {
        return this.memberInfo.profileImageUrl;
      },
      set(value) {
        this.$store.commit("SET_PROFILE_IMAGE_URL", value);
      }
    },
    saveButtonDisabled() {
      return !name || name.length == 0;
    }
  },
  methods: {
    ...mapActions(["GET_MEMBER_INFO", "UPDATE_MEMBER_INFO"]),
    getMemberInfo() {
      this.GET_MEMBER_INFO();
    },
    saveUserData() {
      const data = {
        name: this.name,
        motto: this.motto,
        profileImageUrl: this.profileImageUrl
      };

      this.UPDATE_MEMBER_INFO(data)
        .then(() => alert("저장되었습니다."))
        .catch((e) => alert(e.data.message));
    }
  }
};
</script>

<style>
.profile-item {
  display: flex;
  margin: 1px 1px 20px 1px;
  padding: 5px;
}

.label {
  font-weight: bold;
}

.input_wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.profile-item > button {
  border-radius: 10px;
  background-color: #ffe509;
  border: 1px solid #f3d905;
  padding: 5px;
  width: 100px;
}
</style>
