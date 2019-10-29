<template>
  <div>
    <my-header title="자기소개서 지원 정보" :buttons="headerButtons"></my-header>
    <div v-if="coverletter" class="my-form">
      <div class="my-form-row">
        <my-input label="기업명" :maxLength="20" :required="true" :value.sync="companyName" />
      </div>
      <div class="my-form-row">
        <my-input label="직무" :maxLength="20" :value.sync="jobType" />
      </div>
      <div class="my-form-row">
        <my-input
          label="서류마감 일시"
          :hint="deadlineExample"
          :value.sync="deadline"
          :rules="[deadlineRule]"
        />
      </div>
      <div class="my-form-row">
        <my-select label="지원연도" :datas="years" :item.sync="applicationYear" />
        <my-select label="지원분기" :datas="applicationHalfs" :item.sync="applicationHalf" />
        <my-select label="지원종류" :datas="applicationTypes" :item.sync="applicationType" />
      </div>
      <div class="my-form-row">
        <my-select label="제출 여부" :datas="isApplications" :item.sync="isApplication" />
        <my-select label="합격 여부" :datas="isPasses" :item.sync="isPass" />
      </div>
    </div>
    <div v-else>로딩중입니다.</div>
  </div>
</template>

<script>
import {
  APPLICATION_HALFS,
  APPLICATION_TYPES,
  IS_APPLICATIONS,
  IS_PASSES
} from "@/utils/CoverletterContants";
import { mapState, mapGetters, mapActions } from "vuex";
import MyHeader from "@/components/common/MyHeader.vue";
import MyInput from "@/components/common/MyInput.vue";
import MySelect from "@/components/common/MySelect.vue";

export default {
  components: { MyHeader, MyInput, MySelect },
  data() {
    return {
      applicationHalfs: APPLICATION_HALFS,
      applicationTypes: APPLICATION_TYPES,
      isApplications: IS_APPLICATIONS,
      isPasses: IS_PASSES,
      headerButtons: [
        {
          title: "deleteCoverletter",
          icon: "delete",
          action: this.onRemove,
          tooltip: "자기소개서를 삭제합니다."
        },
        {
          title: "saveCoverletter",
          icon: "save",
          action: this.onSave,
          tooltip: "자기소개서를 저장합니다.",
          disabled: false
        }
      ]
    };
  },
  created() {
    // 수정 모드에서만, 삭제버튼을 제공한다.
    if (this.isNew) {
      this.headerButtons = this.headerButtons.slice(1, 2);
    }
  },
  computed: {
    ...mapState(["coverletterNewIndex"]),
    ...mapGetters(["findCoverletterById"]),
    deadlineExample() {
      return `ex) ${this.$moment().format("YYYY-MM-DD hh:mm")}`;
    },
    isNew() {
      return this.$route.params.cid == "new";
    },
    coverletter() {
      return this.findCoverletterById(
        this.isNew ? this.coverletterNewIndex : this.$route.params.cid
      );
    },
    years() {
      const currentYear = new Date().getFullYear();
      let years = [];
      let idx = 0;

      for (let year = currentYear - 1; year <= currentYear + 1; year++) {
        years.push({ key: idx, value: year });
        idx = idx + 1;
      }
      return years;
    },
    deadlineRule() {
      const self = this;
      return deadline => {
        if (self.$moment(deadline, "YYYY-MM-DD HH:mm", true).isValid())
          return true;

        if (deadline == "") return true; // 공백 허용 (필수값 X)

        return "날짜 시간 형식이 올바르지 않습니다.";
      };
    },
    companyName: {
      get() {
        if (!this.coverletter) return "";
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
        return this.years.find(
          y => y.value == this.coverletter.applicationYear
        );
      },
      set(data) {
        const applicationYear = this.years.find(x => x.key == data.key);

        this.$store.commit("SET_APPLICATION_YEAR", {
          cid: this.coverletter.id,
          value: applicationYear.value
        });
      }
    },
    applicationType: {
      get() {
        return this.applicationTypes.find(
          x => x.key == this.coverletter.applicationType
        );
      },
      set(data) {
        const applicationType = this.applicationTypes.find(
          x => x.key == data.key
        );

        this.$store.commit("SET_APPLICATION_TYPE", {
          cid: this.coverletter.id,
          value: applicationType.key
        });
      }
    },
    applicationHalf: {
      get() {
        return this.applicationHalfs.find(
          x => x.key == this.coverletter.applicationHalf
        );
      },
      set(data) {
        const applicationHalf = this.applicationHalfs.find(
          x => x.key == data.key
        );

        this.$store.commit("SET_APPLICATION_HALF", {
          cid: this.coverletter.id,
          value: applicationHalf.key
        });
      }
    },
    isApplication: {
      get() {
        return this.isApplications.find(
          x => x.key == this.coverletter.isApplication
        );
      },
      set(data) {
        const isApplication = this.isApplications.find(x => x.key == data.key);

        this.$store.commit("SET_IS_APPLICATION", {
          cid: this.coverletter.id,
          value: isApplication.key
        });
      }
    },
    isPass: {
      get() {
        return this.isPasses.find(x => x.key == this.coverletter.isPass);
      },
      set(data) {
        const isPass = this.isPasses.find(x => x.key == data.key);
        this.$store.commit("SET_IS_PASS", {
          cid: this.coverletter.id,
          value: isPass.key
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
        if (!this.coverletter) return "";
        if (!this.coverletter.deadline) return "";
        return this.coverletter.deadline.replace("T", " ");
      },
      set(value) {
        this.$store.commit("SET_DEADLINE", { cid: this.coverletter.id, value });
      }
    }
  },
  watch: {
    companyName() {
      this.validate();
    },
    deadline() {
      this.validate();
    }
  },
  methods: {
    ...mapActions([
      "CREATE_COVERLETTER",
      "UPDATE_COVERLETTER",
      "DELETE_COVERLETTER"
    ]),
    onSave() {
      if (this.isNew) {
        this.CREATE_COVERLETTER(this.coverletter)
          .then(() => alert("자기소개서가 저장되었습니다"))
          .catch(() => {
            alert("오류");
          });
      } else {
        this.UPDATE_COVERLETTER(this.coverletter)
          .then(() => {
            alert("자기소개서가 수정되었습니다.");
          })
          .catch(() => {
            alert("오류");
          });
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
    validate() {
      if (this.companyName) {
        if (
          this.deadline.length == 0 ||
          (this.deadline && this.deadlineRule(this.deadline) == true)
        ) {
          this.headerButtons[1].disabled = false;
        } else {
          this.headerButtons[1].disabled = true;
        }
      } else {
        this.headerButtons[1].disabled = true;
      }
    }
  }
};
</script>

<style>
.my-form {
  display: flex;
  flex-direction: column;
}

.my-form-row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 10px 10px 10px 0px;
}
</style>