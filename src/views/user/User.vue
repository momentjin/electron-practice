<template>
  <div class="menu_view">
    <my-header title="내정보"></my-header>

    <div class="profile_item">
      <div class="profile_image_wrapper">
        <img :src="memberInfo.profileImageUrl" id="preview" @click="openFileSelector" accept="image/*" />
      </div>
    </div>

    <div class="profile_item">
      <div class="input_wrapper">
        <div class="input_label">
          <b>이름</b>
          ({{name.length}}/10)
        </div>
        <div>
          <input class="my_input" v-model="name" type="text" maxlength="10" />
        </div>
      </div>
    </div>

    <div class="profile_item">
      <div class="input_wrapper">
        <div class="input_label">
          <b>취업 성공을 위한 각오</b>
          ({{motto.length}}/50)
        </div>
        <div>
          <textarea class="my_input" v-model="motto" maxlength="50"></textarea>
        </div>
      </div>
    </div>

    <div class="profile_item">
      <button @click="onClickSave">저장</button>
    </div>
  </div>
</template>

<script>
import MyHeader from "../../components/common/MyHeader.vue";
import { mapActions, mapState } from "vuex";

export default {
  components: { MyHeader },
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
    }
  },
  methods: {
    ...mapActions(["GET_MEMBER_INFO", "UPDATE_MEMBER_INFO"]),
    getMemberInfo() {
      this.GET_MEMBER_INFO();
    },
    onClickSave() {
      const data = {
        name: this.name,
        motto: this.motto,
        profileImageUrl: this.profileImageUrl
      };

      this.UPDATE_MEMBER_INFO(data).then(() => alert("저장되었습니다."));
    },
    openFileSelector() {
      alert("프로필 사진 변경은 아직 지원하지 않는 기능입니다.");
    }
  }
};
</script>

<style>
.profile_item {
  border: 1px solid black;
  display: flex;
  justify-content: center;
  margin: 1px;
  padding: 5px;
}

.profile_image_wrapper {
  width: 100px;
  height: 100px;
  margin: 5px;
  display: flex;
  justify-content: center;
}

.profile_image_wrapper > img {
  width: 100%;
  height: 100%;
  border-radius: 40%;
  cursor: pointer;
}

.label {
  font-weight: bold;
}

.input_label {
  margin-bottom: 5px;
}

.input_wrapper {
  width: 80%;
  display: flex;
  flex-direction: column;
}

.my_input {
  border: 1.2px solid #e5e5e5;
  border-radius: 10px;
  width: 100%;
  padding: 5px;
}

.profile_item > button {
  border-radius: 10px;
  background-color: #ffe509;
  border: 1px solid #f3d905;
  padding: 5px;
  width: 100px;
}
</style>
