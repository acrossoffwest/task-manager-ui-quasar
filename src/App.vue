<template>
  <div id="q-app" :class="$color('textMain')">
    <q-bar class="q-electron-draggable" v-if="this.$q.platform.is.electron">
      <q-icon name="map"/>

      <div>TMGR</div>

      <q-space class="q-electron-drag--exception"/>

      <q-btn class="q-electron-drag--exception" dense flat icon="minimize" @click="minimize" />
      <q-btn class="q-electron-drag--exception" dense flat icon="crop_square" @click="maximize" />
      <q-btn class="q-electron-drag--exception" dense flat icon="close" @click="closeApp" />
    </q-bar>
    <transition name="fade" mode="out-in">
      <Navbar v-if="$route.meta.navbarHidden" />
    </transition>
    <transition
      :name="transitionName"
      mode="out-in"
      @beforeLeave="beforeLeave"
      @enter="enter"
      @afterEnter="afterEnter"
    >
      <q-scroll-area :style="{
        height: bodyHeight + 'px'
      }">
        <div>
          <router-view :key="$route.path"></router-view>
        </div>
      </q-scroll-area>
    </transition>
  </div>
</template>

<script>
  const DEFAULT_TRANSITION = "fade";

  export default {
    name: "App",
    data() {
      return {
        prevHeight: 0,
        bodyHeight: 1500,
        transitionName: DEFAULT_TRANSITION,
      };
    },
    computed: {
      navbarHidden() {
        return this.$route.name !== "Index";
      }
    },
    methods: {
      getBodyHeight () {
        return this.getOffsetHeightOfElement('.absolute.full-width') - this.getOffsetHeightOfElement('[role=toolbar]') - this.getOffsetHeightOfElement('nav')
      },
      getOffsetHeightOfElement (selector) {
        const el = document.querySelector(selector)
        if (!el) {
          return 0
        }
        return el.offsetHeight
      },
      minimize () {
        if (process.env.MODE === 'electron') {
          this.$q.electron.remote.BrowserWindow.getFocusedWindow().minimize()
        }
      },
      maximize () {
        if (process.env.MODE === 'electron') {
          const win = this.$q.electron.remote.BrowserWindow.getFocusedWindow()

          if (win.isMaximized()) {
            win.unmaximize()
          }
          else {
            win.maximize()
          }
        }
      },

      closeApp () {
        if (process.env.MODE === 'electron') {
          this.$q.electron.remote.BrowserWindow.getFocusedWindow().close()
        }
      },
      beforeLeave(element) {
        this.prevHeight = getComputedStyle(element).height;
      },
      enter(element) {
        const { height } = getComputedStyle(element);

        element.style.height = this.prevHeight;

        setTimeout(() => {
          element.style.height = height;
        });
      },
      afterEnter(element) {
        element.style.height = "auto";
      },
      async loadUser() {
        if (!this.$store.getters.token) {
          return;
        }
        this.$axios.defaults.headers = {
          Authorization: `Bearer ${this.$store.getters.token.token}`,
          "X-Requested-With": "XMLHttpRequest",
        };
        await this.$axios.get("/api/user").then(({ data }) => {
          this.$store.commit("user", data);
        });
      },
      initBodyHeight () {
        setTimeout(() => {
          try {
            this.bodyHeight = this.getBodyHeight()
          } catch (e) {
            setTimeout(() => this.bodyHeight = this.getBodyHeight(), 1000)
          }
        }, 500)
      }
    },
    async created() {
      document.querySelector("body").className = this.$color("bgBody");
      this.$router.beforeEach((to, from, next) => {
        let transitionName = to.meta.transitionName || from.meta.transitionName;

        if (transitionName === 'slide') {
          const toDepth = to.path.split('/').length;
          const fromDepth = from.path.split('/').length;
          transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
        }

        this.transitionName = transitionName || DEFAULT_TRANSITION;

        next();
      });
      this.$router.afterEach(() => {
        this.initBodyHeight()
      })
      await this.loadUser();
    },
    mounted() {
      this.initBodyHeight()
    }
  };
</script>

<style lang="scss">
  #app {
    font-family: "Roboto", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  }

  .text-main {
    color: #2c3e50;
  }

  .dark-text-main {
    color: #e2e2e2;
  }

  .dark-bg-body {
    background-color: #121212 !important;
  }

  .bg-body {
    background-color: #edf2f7;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition-duration: 0.5s;
    transition-property: height, opacity;
    transition-timing-function: ease;
    overflow: hidden;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }

  .slide-left-enter-active,
  .slide-left-leave-active,
  .slide-right-enter-active,
  .slide-right-leave-active {
    transition-duration: 0.5s;
    transition-property: height, opacity, transform;
    transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
    overflow: hidden;
  }

  .slide-left-enter,
  .slide-right-leave-active {
    opacity: 0;
    transform: translate(2em, 0);
  }

  .slide-left-leave-active,
  .slide-right-enter {
    opacity: 0;
    transform: translate(-2em, 0);
  }
  .absolute-position-off .absolute.full-width {
    position: relative;
  }
</style>
