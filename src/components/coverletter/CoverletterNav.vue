<template>
  <nav class="view-container">
    <ul>
      <!-- 자기소개서 지원 정보 버튼 -->
      <router-link :to="{ name: 'coverletterInfo' }">
        <li class="view-menu-item">
          <v-icon medium dark :disabled="info_icon.disabled">{{info_icon.name}}</v-icon>
        </li>
      </router-link>

      <!-- 문항별 버튼 -->
      <div v-for="(q, index) in questions" :key="index">
        <router-link :to="{ name: 'question', params: { qid: q.id } }">
          <li class="view-menu-item" :id="q.id" ref="questions">{{index+1}}</li>
        </router-link>
      </div>

      <!-- 문항 추가 버튼 -->
      <li>
        <v-icon medium dark @click="onClickAddQuestion">add_circle</v-icon>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  props: {
    questions: {
      type: Array,
      default: () => [],
      required: false
    },
    coverletterId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      info_icon: {
        name: "info",
        disabled: true
      }
    };
  },
  mounted() {
    const self = this;
    this.$nextTick(function() {
      self.setActiveMenu(self.$route.path);
    });
  },
  watch: {
    $route(to) {
      this.setActiveMenu(to.path);
    }
  },
  computed: {
    ...mapState(["coverletterNewIndex"])
  },
  methods: {
    ...mapMutations(["ADD_QUESTION_FORM"]),
    setActiveMenu(changedMenuName) {
      const url = changedMenuName.replace("/", "");

      if (url.endsWith("info")) {
        this.info_icon.disabled = false;
      } else {
        this.info_icon.disabled = true;
      }

      if (!this.$refs.questions) return;
      else {
        for (let i = 0; i < this.$refs.questions.length; i++) {
          if (url.endsWith(this.$refs.questions[i].id)) {
            this.$refs.questions[i].className = "view-menu-item-active";
          } else {
            this.$refs.questions[i].className = "view-menu-item";
          }
        }
      }
    },
    onClickAddQuestion() {
      this.ADD_QUESTION_FORM({
        cid: this.coverletterId
      });
    }
  }
};
</script>

<style>
.view-menu-container {
  background: white;
  width: 65px;
}

.view-menu-container {
  background-color: #423630;
}

.view-menu-item {
  color: #7b736e;
  font-size: 20px;

  text-align: center;
  padding: 5px;
  margin: 10px 5px 5px 5px;
}

.view-menu-item:hover {
  color: white;
  cursor: pointer;
}

.view-menu-item-active {
  color: white;

  font-size: 20px;

  text-align: center;
  padding: 5px;
  margin: 10px 5px 5px 5px;
}
</style>