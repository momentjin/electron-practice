<template>
  <div>
    <my-header title="자기소개서 지원 정보" :buttons="headerButtons"></my-header>

    <div v-if="coverletter" class="coverletter_info">
      <div class="coverletter_info_row row_type2">
        <div class="row2">
          <label class="info-title" for="companyName">
            기업명
            <span class="rule">{{companyName.length}}/{{rules.companyName.maxLength}}</span>
          </label>
          <input
            class="info-field"
            type="text"
            id="companyName"
            :maxLength="rules.companyName.maxLength"
            v-model="companyName"
          />
        </div>
        <div class="row2">
          <label class="info-title" for="jobType">
            직무
            <span class="rule">{{jobType.length}}/{{rules.jobType.maxLength}}</span>
          </label>
          <input
            class="info-field"
            type="text"
            id="jobType"
            :maxlength="rules.jobType.maxLength"
            v-model="jobType"
          />
        </div>
      </div>
      <div class="coverletter_info_row row_type2">
        <div class="row2">
          <label class="info-title" for="applicationYear">지원 연도</label>
          <select class="info-field" name="applicationYear" v-model="applicationYear">
            <option v-for="year in years" :key="year">{{ year }}</option>
          </select>
        </div>
        <div class="row2">
          <label class="info-title" for="applicationHalf">지원 분기</label>
          <select
            class="info-field"
            id="applicationHalf"
            name="applicationHalf"
            v-model="applicationHalf"
          >
            <option
              v-for="item in applicationHalfs"
              :key="item.key"
              :value="item.value"
            >{{item.value}}</option>
          </select>
        </div>
        <div class="row2">
          <label class="info-title" for="applicationType">지원 종류</label>
          <select
            class="info-field"
            id="applicationType"
            name="applicationType"
            v-model="applicationType"
          >
            <option
              v-for="item in applicationTypes"
              :key="item.key"
              :value="item.value"
              :selected="item.key == coverletter.applicationType"
            >{{item.value}}</option>
          </select>
        </div>
      </div>
      <div class="coverletter_info_row row_type2">
        <div class="row2">
          <label class="info-title" for="deadline">서류 마감일시</label>
          <input
            maxlength="16"
            class="info-field"
            type="text"
            id="deadline"
            v-model="deadline"
            @keypress="onKeyDown"
            placeholder="ex) 2000-05-05 15:00"
          />
        </div>
      </div>
      <div class="coverletter_info_row row_type2">
        <div class="row2">
          <label class="info-title" for="isApplication">제출 여부</label>
          <select
            class="info-field"
            id="isApplication"
            name="isApplication"
            v-model="isApplication"
          >
            <option
              v-for="(item, index) in isApplications"
              :key="index"
              :value="item.value"
            >{{item.value}}</option>
          </select>
        </div>
        <div class="row2">
          <label class="info-title" for="isPass">합격 여부</label>
          <select class="info-field" id="isPass" name="isPass" v-model="isPass">
            <option v-for="(item,index) in isPasses" :key="index" :value="item.value">{{item.value}}</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  APPLICATION_HALFS,
  APPLICATION_TYPES,
  IS_APPLICATIONS,
  IS_PASSES
} from "../../utils/CoverletterContants";
import { mapState, mapGetters, mapActions } from "vuex";
import MyHeader from '@/components/common/MyHeader.vue';

export default {
  components: { MyHeader },
  data() {
    return {
      applicationHalfs: APPLICATION_HALFS,
      applicationTypes: APPLICATION_TYPES,
      isApplications: IS_APPLICATIONS,
      isPasses: IS_PASSES,
      rules: {
        companyName: {
          maxLength: 20
        },
        jobType: {
          maxLength: 20
        }
      },
      headerButtons: [
        {
          title: "deleteCoverletter",
          icon: "delete",
          action: this.onRemove
        },
        {
          title: "saveCoverletter",
          icon: "send",
          action: this.onSave
        }
      ]
    };
  },
  computed: {
    ...mapState(["coverletterNewIndex"]),
    ...mapGetters(["findCoverletterById"]),
    isActive() {
      if (
        this.companyName.length <= 0 ||
        this.companyName.length > this.rules.companyName.maxLength
      )
        return false;

      if (
        this.jobType.length <= 0 ||
        this.jobType.length > this.rules.jobType.maxLength
      )
        return false;

      return true;
    },
    coverletter() {
      debugger;

      if (this.$route.params.cid == "new") {
        return this.findCoverletterById(this.coverletterNewIndex);
      }

      return this.findCoverletterById(this.$route.params.cid);
    },
    years() {
      const currentYear = new Date().getFullYear();
      return [currentYear - 2, currentYear - 1, currentYear, currentYear + 1];
    },
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
        return this.applicationTypes.find(
          x => x.key == this.coverletter.applicationType
        ).value;
      },
      set(value) {
        const key = this.applicationTypes.find(x => x.value == value).key;

        this.$store.commit("SET_APPLICATION_TYPE", {
          cid: this.coverletter.id,
          value: key
        });
      }
    },
    applicationHalf: {
      get() {
        return this.applicationHalfs.find(
          x => x.key == this.coverletter.applicationHalf
        ).value;
      },
      set(value) {
        const key = this.applicationHalfs.find(x => x.value == value).key;

        this.$store.commit("SET_APPLICATION_HALF", {
          cid: this.coverletter.id,
          value: key
        });
      }
    },
    isApplication: {
      get() {
        return this.isApplications.find(
          x => x.key == this.coverletter.isApplication
        ).value;
      },
      set(value) {
        const key = this.isApplications.find(x => x.value == value).key;

        this.$store.commit("SET_IS_APPLICATION", {
          cid: this.coverletter.id,
          value: key
        });
      }
    },
    isPass: {
      get() {
        return this.isPasses.find(x => x.key == this.coverletter.isPass).value;
      },
      set(value) {
        const key = this.isPasses.find(x => x.value == value).key;
        this.$store.commit("SET_IS_PASS", {
          cid: this.coverletter.id,
          value: key
        });
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
        if (!this.coverletter.deadline) return "";
        return this.coverletter.deadline.replace("T", " ");
      },
      set(value) {
        this.$store.commit("SET_DEADLINE", { cid: this.coverletter.id, value });
      }
    }
  },
  methods: {
    ...mapActions([
      "CREATE_COVERLETTER",
      "UPDATE_COVERLETTER",
      "DELETE_COVERLETTER"
    ]),
    onSave() {
      if (this.$route.params.cid == "new") {
        this.CREATE_COVERLETTER(this.coverletter)
          .then(() => alert("자기소개서가 저장되었습니다"))
          .catch(() => alert("오류"));
      } else {
        this.UPDATE_COVERLETTER(this.coverletter)
          .then(() => {
            alert("자기소개서가 수정되었습니다.");
          })
          .catch(() => alert("오류"));
      }
    },
    onRemove() {
      if (!confirm("삭제하시겠습니까?")) return;
      this.DELETE_COVERLETTER(this.coverletter.id)
        .then(() => alert("자기소개서가 삭제되었습니다."))
        .catch(() => alert("오류"))
        .finally(() => {
          window.close();
        });
    },
    onKeyDown() {
      const deadline = this.deadline;

      if (deadline.length == 4 || deadline.length == 7) {
        this.$store.commit("SET_DEADLINE", {
          cid: this.coverletter.id,
          value: deadline + "-"
        });
      } else if (deadline.length == 10) {
        this.$store.commit("SET_DEADLINE", {
          cid: this.coverletter.id,
          value: deadline + " "
        });
      } else if (deadline.length == 13) {
        this.$store.commit("SET_DEADLINE", {
          cid: this.coverletter.id,
          value: deadline + ":"
        });
      }
    }
  }
};
</script>

<style>
.coverletter_info {
  display: flex;
  flex-direction: column;
}

.info-title {
  font-weight: bold;
}

.info-field {
  margin-top: 5px;
  border: 1px solid #e5e5e5;
  padding: 5px;
  width: 100%;
  border-radius: 5px 5px 5px 5px;
}

.coverletter_info_row {
  margin: 10px 10px 10px 0px;
}

.row_type1 {
  flex-grow: 1;
}

.row_type2 {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.row2 {
  margin-right: 5px;
  flex-grow: 1;
}

.rule {
  font-weight: normal;
}
</style>