<template>
  <div class="view_wrapper coverletter_info">
    <h2>{{ companyName }} 자기소개서</h2>
    <v-text-field v-model="companyName" label="기업명" :rules="[v => !!value || '기업명을 입력해주세요']"/>
    <v-text-field v-model="applicationYear" label="지원연도" :rules="applicationYearRules"/>
    <v-select
      v-model="applicationType"
      :items="applicationTypes"
      item-value="key"
      item-text="value"
      label="지원종류"
    ></v-select>
    <v-select
      v-model="applicationHalf"
      :items="applicationHalfs"
      item-value="key"
      item-text="value"
      label="지원분기"
    ></v-select>
    <v-text-field v-model="jobType" label="직무"/>
    <v-text-field
      v-model="deadline"
      label="마감일"
      placeholder="예시) 2019-05-19 18:00"
      :rules="deadlineRules"
    />
    <v-select
      v-model="isApplication"
      :items="isApplications"
      item-value="key"
      item-text="value"
      label="지원여부"
    ></v-select>
    <v-select v-model="isPass" :items="isPasses" label="합격여부" item-value="key" item-text="value"></v-select>
  </div>
</template>

<script>
export default {
  props: ["coverletter"],
  data() {
    return {
      applicationHalfs: [
        { key: 0, value: "상반기" },
        { key: 1, value: "하반기" },
        { key: 2, value: "수시" },
        { key: 3, value: "기타" }
      ],
      applicationTypes: [
        { key: 0, value: "인턴" },
        { key: 1, value: "신입" },
        { key: 2, value: "경력" },
        { key: 3, value: "기타" }
      ],
      isApplications: [
        { key: -1, value: "대기" },
        { key: false, value: "미지원" },
        { key: true, value: "지원완료" }
      ],
      isPasses: [
        { key: -1, value: "대기" },
        { key: true, value: "합격" },
        { key: false, value: "불합격" }
      ],
      applicationYearRules: [
        v => Number(v) >= 2017 && Number(v) <= 2019 || '2017 ~ 2019 사이의 값을 입력해주세요.'
      ],
      deadlineRules: [
        v => {
          if (!v) return true;
          return (
            /[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}/.test(v) ||
            "날짜 형식을 지켜주세요. (2019-05-04 14:00)"
          );
        }
      ]
    };
  },
  computed: {
    companyName: {
      get() {
        return this.coverletter.companyName;
      },
      set(value) {
        return this.$store.commit("SET_COMPANY_NAME", {
          cid: this.coverletter.id,
          value
        });
      }
    },
    applicationYear: {
      get() {
        return this.coverletter.applicationYear;
      },
      set(value) {
        this.$store.commit("SET_APPLICATION_YEAR", {
          cid: this.coverletter.id,
          value
        });
      }
    },
    applicationType: {
      get() {
        return this.coverletter.applicationType;
      },
      set(value) {
        this.$store.commit("SET_APPLICATION_TYPE", {
          cid: this.coverletter.id,
          value
        });
      }
    },
    applicationHalf: {
      get() {
        return this.coverletter.applicationHalf;
      },
      set(value) {
        this.$store.commit("SET_APPLICATION_HALF", {
          cid: this.coverletter.id,
          value
        });
      }
    },
    isApplication: {
      get() {
        return this.coverletter.application;
      },
      set(value) {
        this.$store.commit("SET_IS_APPLICATION", {
          cid: this.coverletter.id,
          value
        });
      }
    },
    isPass: {
      get() {
        return this.coverletter.pass;
      },
      set(value) {
        this.$store.commit("SET_IS_PASS", { cid: this.coverletter.id, value });
      }
    },
    jobType: {
      get() {
        return this.coverletter.jobType;
      },
      set(value) {
        this.$store.commit("SET_JOB_TYPE", { cid: this.coverletter.id, value });
      }
    },
    deadline: {
      get() {
        return this.coverletter.deadline;
      },
      set(value) {
        this.$store.commit("SET_DEADLINE", { cid: this.coverletter.id, value });
      }
    }
  }
};
</script>

<style>
.view_wrapper {
  padding: 10px;
  border: 1px solid gray;
  /* margin: 5px; */
}
</style>
