<template>
  <div class="profile-image-container">
    <img :src="defaultImageUrl" id="preview" @click="openFileSelector" accept="image/*" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      defaultImageUrl: "@/resource/empty_user.png"
    };
  },
  methods: {
    openFileSelector() {
      alert("프로필 사진 변경은 아직 지원하지 않는 기능입니다.");
    }
  }
};
</script>

<style>
.profile_image_wrapper {
  width: 100px;
  height: 100px;
  margin: 5px;
  display: flex;
}

.profile_image_wrapper > img {
  width: 100%;
  height: 100%;
  border-radius: 40%;
  cursor: pointer;
}
</style>