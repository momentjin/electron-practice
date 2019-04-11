<template>
  <div class="my-container">
    <coverletter-item v-for="item in coverletters" :key="item.id" :coverletter="item" />
    <div v-if="!coverletters.length">
      여기를 눌러서 자기소개서를 작성해보세요!
    </div>
    <!-- <v-data-table :headers="headers" :items="coverletters" class="elevation-1">
      <template v-slot:items="props">
        <tr @click="onClickRow(props.item.id)">
          <td>{{ props.item.id }}</td>
          <td>{{ props.item.companyName }}</td>
          <td>{{ props.item.applicationYear }}</td>
          <td>{{ props.item.applicationHalf }}</td>
          <td>{{ props.item.applicationType }}</td>
          <td>{{ props.item.isApplication }}</td>
          <td>{{ props.item.isPass }}</td>
          <td>{{ props.item.deadline }}</td>
        </tr>
      </template>
      <template v-slot:no-data>여기를 눌러서 자기소개서를 작성해보세요</template>
    </v-data-table> -->
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import CoverletterItem from './CoverletterItem'

export default {
  components: {CoverletterItem},
  data() {
    return {
      headers: [
        { text: "번호", value: "id" },
        { text: "기업", value: "companyName" },
        { text: "지원연도", value: "applicationYear" },
        { text: "지원분기", value: "applicationHalf" },
        { text: "지원종류", value: "applicationType" },
        { text: "직무", value: "jobType" },
        { text: "지원", value: "isApplication" },
        { text: "합격", value: "isPass" },
        { text: "서류마감", value: "deadline" }
      ]
    };
  },
  computed: {
    ...mapState(["coverletters"])
  },
  created() {
    // this.getCoverletterList();
  },
  methods: {
    ...mapActions(["FETCH_COVERLETTERS"]),
    getCoverletterList() {
      this.FETCH_COVERLETTERS();
    },
    onClickRow(id) {
      alert("상세 페이지로 이동 : " + id);
    }
  }
};
</script>

<style>

.my-container {
  border: 1px solid black;
  flex-grow: 1;
  margin: 1px;
}

</style>
