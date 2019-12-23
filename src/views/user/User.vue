<template>
  <div class="menu-container">
    <my-header title="설정" :buttons="headerButtons"></my-header>
    <div class="my-form-row">
      <profile-image />
    </div>
    <div class="my-form-row">
      <my-input label="아이디" :value.sync="memberInfo.id" :disabled="true" />
    </div>
    <div class="my-form-row">
      <my-input label="이름" :maxLength="10" :required="true" :value.sync="name" />
    </div>
    <div class="my-form-row">
      <my-input label="좌우명" :maxLength="30" :value.sync="motto" />
    </div>
  </div>
</template>

<script>
import ProfileImage from "@/components/user/ProfileImage.vue";
import MyHeader from "@/components/common/MyHeader.vue";
import MyInput from "@/components/common/MyInput.vue";
import { mapActions, mapState } from "vuex";

export default {
  components: { MyHeader, MyInput, ProfileImage },
  data() {
    return {
      headerButtons: [
        {
          title: "save",
          icon: "save",
          action: this.saveUserData,
          tooltip: "내 정보를 저장합니다",
          disabled: false
        }
      ]
    };
  },
  watch: {
    name() {
      this.headerButtons[0].disabled = !(this.name && this.name.length >= 1);
    }
  },
  computed: {
    ...mapState(["memberInfo"]),
    name: {
      get() {
        return this.memberInfo.name || '';
      },
      set(value) {
        return this.$store.commit("SET_MEMBER_NAME", value);
      }
    },
    motto: {
      get() {
        return this.memberInfo.motto || '';
      },
      set(value) {
        return this.$store.commit("SET_MEMBER_MOTTO", value);
      }
    },
    saveButtonDisabled() {
      return !!name;
    }
  },
  created() {
    this.getMemberInfo();
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
        .catch(e => alert(e.data.message));
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
