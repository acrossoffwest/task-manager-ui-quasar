export default {
  name: "TasksForm",
  components: {},
  props: [],
  data() {
    return {
      errors: {},
      showEditDescription: false,
      showSaveAlert: false,
      panel: false,
      isOpen: false,
      checkpointUpdateKey: 0,
      counter: {
        common_time: 0,
        start_time: 0,
      },
      parentCategories: [],
      statuses: [
        { value: "created", name: `Created` },
        { value: "active", name: `Active` },
        { value: "done", name: `Done` },
      ],
      h1: {
        main: `${this.getId() ? "Edit" : "Create"} task`,
        CurrentTasksList: "Current tasks",
        HiddenTasksList: "Hidden tasks",
        ArchiveTasksList: "Archive tasks",
      },
      selected: false,
      projectCategory: null,
      form: this.getDefaultForm(),
      showCountdown: true,
    };
  },
  computed: {
    isCreate() {
      return !this.getId();
    },
    projectCategoryId() {
      return this.getProjectCategoryId();
    },
  },
  async created() {
    this.loadCategories();
    if (this.getId()) {
      await this.loadModel();

      window.onkeydown = this.getListener();
    }
    if (this.projectCategoryId && this.isCreate) {
      this.form.project_category_id = this.projectCategoryId;
    }
    await this.loadCategory();
  },
  methods: {
    getListener() {
      return (e) => {
        if (
          e.ctrlKey &&
          (e.key.toLowerCase() === "s" || e.key.toLowerCase() === "ы")
        ) {
          e.preventDefault();
          this.save();
        }
      };
    },
    getActions() {
      const actions = [
        {
          click: () => {
            this[this.form.id ? "save" : "create"]();
          },
          label: this.form.id ? "Save" : "Create",
        },
      ];
      actions.push({
        click: () => {
          this[this.isCreate ? "cancel" : "goToCurrentTasks"]();
        },
        label: this.isCreate ? "Cancel" : "Tasks",
      });
      return actions;
    },
    async loadCategories() {
      const {
        data: { data },
      } = await this.$axios.get("api/project_categories?all");
      this.parentCategories = data;
    },
    async loadCategory() {
      const {
        data: { data },
      } = await this.$axios.get(
        `api/project_categories/${
          this.projectCategoryId || this.form.project_category_id
        }`
      );
      this.projectCategory = data;
    },
    async loadModel() {
      const {
        data: { data },
      } = await this.$axios.get(`api/tasks/${this.getId()}`);
      data.common_time =
        data.common_time && !data.start_time ? data.common_time : 1;
      console.log(data.common_time);
      this.form = data;
    },
    getCategoryStatus() {
      if (this.form.status === "created" || this.form.status === "active") {
        return "current";
      }
      return this.form.status;
    },
    async toggleCountdown() {
      const {
        data: { data },
      } = await this.$axios[this.form.start_time ? "delete" : "post"](
        `api/tasks/${this.getId()}/countdown`
      );
      this.form = data;
      this.$refs.countdown.$emit("update-task", this.form);
    },
    getId() {
      return this.$route.params.id;
    },
    getProjectCategoryId() {
      return this.$route.params.project_category_id;
    },
    prepareForm() {
      if (this.form.project_category_id == "") {
        delete this.form.project_category_id;
      }
    },
    async create() {
      try {
        this.prepareForm();
        const {
          data: { data },
        } = await this.$axios.post("api/tasks", this.form);
        this.$router.push({
          name: "TasksEdit",
          params: {
            id: data.id,
          },
        });
        this.showSavedAlert();
      } catch (e) {
        console.log(e);
        if (e.response && e.response && e.response.data.errors) {
          this.errors = e.response.data.errors;
        }
      }
    },
    showSavedAlert() {
      this.showSaveAlert = true;
      setTimeout(() => (this.showSaveAlert = false), 3000);
    },
    async save() {
      try {
        this.prepareForm();
        const {
          data: { data },
        } = await this.$axios.put(`api/tasks/${this.getId()}`, this.form);
        this.form = data;
        this.showSavedAlert();
      } catch (e) {
        if (e.response && e.response && e.response.data.errors) {
          this.errors = e.response.data.errors;
        }
      }
    },
    cancel() {
      window.history.back();
    },
    goToCurrentTasks() {
      this.$router.push("/tasks");
    },
    getDefaultForm() {
      console.log("PRO ID: ", this.projectCategoryId);
      return {
        title: "",
        status: "created",
        project_category_id: this.projectCategoryId || "",
        description: "",
        common_time: 0,
        checkpoints: [],
      };
    },
    secondsToStringTime(seconds) {
      const second = seconds % 60;
      let minute = ((seconds - second) / 60) | 0;
      const hour = (minute / 60) | 0;
      minute = minute - hour * 60;

      return `${this.prepareClockNumber(hour)}:${this.prepareClockNumber(
        minute
      )}:${this.prepareClockNumber(second)}`;
    },
    stringTimeToSeconds(stringTime) {
      let times = stringTime.split(":");
      times = times.map(parseInt);
      return times[0] * 60 * 60 + times[1] * 60 + times[2];
    },
    prepareClockNumber(num) {
      return num < 10 ? "0" + num : num;
    },
    addCheckpoint() {
      if (!this.form.checkpoints) {
        this.form.checkpoints = [];
      }
      const currentTime = this.form.common_time;
      if (
        this.form.checkpoints.length !== 0 &&
        this.form.checkpoints.length !== 1
      ) {
        this.form.checkpoints[
          this.form.checkpoints.length - 1
        ].end = currentTime;
      }
      this.form.checkpoints.push({
        description: "New one",
        start: currentTime,
        end: currentTime,
      });
      ++this.checkpointUpdateKey;
      console.log(this.form.checkpoints);
    },
    deleteCheckpoint(checkpointIndex) {
      this.form.checkpoints.splice(checkpointIndex, 1);
      ++this.checkpointUpdateKey;
    },
    updateSeconds(seconds) {
      if (!this.form.checkpoints || this.form.checkpoints.length === 0) {
        return;
      }
      this.form.checkpoints[this.form.checkpoints.length - 1].end = seconds;
    },
  },
  destroy() {
    this.form = this.getDefaultForm();
  },
};
