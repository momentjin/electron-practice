<template>
  <div class="profile-image-container">
    <img
      v-if="!profileImage"
      src="../../resource/empty_user.png"
      id="preview"
      @click="openFileSelector"
    />
    <img
      v-else
      :src="'data:image/jpg;base64,'+profileImage"
      id="preview"
      @click="openFileSelector"
    />
    <input type="file" ref="profile" @change="onChangeFile" hidden accept=".jpg, .png" />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      profileByte: null,
      defaultImageUrl: "@/resource/empty_user.png"
    };
  },
  computed: {
    ...mapState(["memberInfo", "profileImage"]),
    hasProfileImage() {
      return (
        this.profileImage &&
        this.profileImage != 0
      );
    }
  },
  created() {
    this.GET_PROFILE_IMAGE();
  },
  methods: {
    ...mapActions(["GET_PROFILE_IMAGE", "UPDATE_PROFILE_IMAGE"]),
    openFileSelector() {
      this.$refs.profile.click();
    },
    onChangeFile() {
      const selectedFiles = this.$refs.profile.files;
      if (!selectedFiles || !selectedFiles.length) return;

      // call api
      let formDatas = new FormData();
      formDatas.append("file", selectedFiles[0]);

      this.UPDATE_PROFILE_IMAGE(formDatas)
        .then(() => {
          alert("프로필 사진이 변경되었습니다");
        })
        .catch(err => {
          alert("프로필 사진 변경 중 오류가 발생했습니다");
          console.log(err);
        });
    }
  }
};
</script>

<style>
.profile-image-container {
  width: 120px;
  height: 150px;
  margin: 5px;
  display: flex;
}

.profile-image-container > img {
  width: 100%;
  height: 100%;
  border-radius: 40%;
  cursor: pointer;
}
</style>