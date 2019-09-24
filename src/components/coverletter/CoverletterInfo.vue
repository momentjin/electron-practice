<template>
  <div class="menu_view">
    <my-header title="자기소개서 지원 정보"></my-header>
    <div class="coverletter_info">
      <div class="coverletter_info_row row_type1">
        <label class="info_title" for="companyName">기업명</label>
        <br />
        <input class="info_field" type="text" id="companyName" />
      </div>
      <div class="coverletter_info_row row_type2">
        <div class="row2">
          <label class="info_title" for="applicationYear">지원 연도</label>
          <select class="info_field" name="applicationYear">
            <option value="2017">2017</option>
            <option value="2018">2018</option>
            <option value="2019">2019</option>
            <option value="2020">2020</option>
          </select>
        </div>
        <div class="row2">
          <label class="info_title" for="applicationHalf">지원 분기</label>
          <select class="info_field" name="applicationHalf">
            <option value="1">상반기</option>
            <option value="2">하반기</option>
            <option value="3">수시</option>
            <option value="4">기타</option>
          </select>
        </div>
        <div class="row2">
          <label class="info_title" for="applicationHalf">지원 종류</label>
          <select class="info_field" name="applicationType">
            <option value="1">신입</option>
            <option value="2">경력</option>
            <option value="3">인턴</option>
            <option value="4">기타</option>
          </select>
        </div>
      </div>
      <div class="coverletter_info_row row_type2">
        <div class="row2">
          <label class="info_title" for="deadline">서류 마감일</label>
          <input class="info_field" type="text" id="deadline" />
        </div>
      </div>
      <div class="coverletter_info_row row_type2">
        <div class="row2">
          <label class="info_title" for="isApplication">제출 여부</label>
          <input class="info_field" type="checkbox" id="isApplication" />
        </div>
        <div class="row2">
          <label class="info_title" for="isPass">합격 여부</label>
          <input class="info_field" type="checkbox" id="isPass" />
        </div>
      </div>
    </div>
    <div class="menu_view_footer">
      <div class="button-container">
        <button> 저장 </button>
      </div>
    </div>
  </div>
</template>

<script>
import MyHeader from "../common/MyHeader.vue";

export default {
  components: { MyHeader }
};
</script>

<style>
.coverletter_info {
  display: flex;
  flex-direction: column;

}

.info_title {
  font-weight: bold;
}

.info_field {
  margin-top: 5px;
  border: 1px solid #E5E5E5;
  padding: 5px;
  width: 100%;
  border-radius: 5px 5px 5px 5px;
}

.coverletter_info_row {
  margin: 10px;
}

.row_type1 {
  flex-grow: 1;
}

.row_type2 {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}


.menu_view_footer {
  text-align: center;
  padding: 10px;
  margin-top: 30px;
}

button {
  width: 120px;
  padding: 10px;
  border: 1px solid #F3D905;
  border-radius: 50px 50px 50px 50px;
  background-color: #FFE509;
}

.row2 {
  margin-right: 5px;
  flex-grow: 1;
}

</style>