<template>
  <nav :class="`${$color('blocks')} shadow `" role="navigation">

    <div
      class="container mx-auto p-4 flex flex-wrap items-center md:flex-no-wrap"
    >
      <div class="relative mr-4 md:mr-8" style="width: 75px">
        <img
          src="../../assets/img/logo-light.svg"
          class="top-0 mt-1"
          style="width: 75px; height: 60px; z-index: 99"
          alt="Task manager"
        />
      </div>
      <div class="ml-auto md:hidden">
        <button
          class="flex items-center px-3 py-2 border rounded"
          type="button"
          @click="isHidden = !isHidden"
        >
          Menu
        </button>
      </div>
      <div
        class="w-full md:w-auto md:flex-grow md:flex md:items-center md:block"
        :class="{ hidden: isHidden }"
      >
        <ul
          class="flex flex-col mt-4 -mx-4 pt-4 border-t md:flex-row md:items-center md:mx-0 md:mt-0 md:pt-0 md:mr-4 lg:mr-8 md:border-0"
        >
          <li>
            <router-link
              to="/tasks"
              :class="`block px-4 py-1 md:p-2 lg:px-4 ${
                $route.path === '/tasks'
                  ? $color('navLinkFocused') + '-600'
                  : ''
              }`"
              href="#"
              title="Link"
              >Current tasks</router-link
            >
          </li>
          <li>
            <router-link
              to="/tasks/hidden"
              :class="`block px-4 py-1 md:p-2 lg:px-4 ${
                $route.path === '/tasks/hidden'
                  ? $color('navLinkFocused') + '-600'
                  : ''
              }`"
              href="#"
              title="Link"
              >Hidden</router-link
            >
          </li>
          <li>
            <router-link
              to="/tasks/archive"
              :class="`block px-4 py-1 md:p-2 lg:px-4 ${
                $route.path === '/tasks/archive'
                  ? $color('navLinkFocused') + '-600'
                  : ''
              }`"
              href="#"
              title="Link"
              >Archive</router-link
            >
          </li>
          <li>
            <router-link
              to="/projects-categories"
              :class="`block px-4 py-1 md:p-2 lg:px-4 ${
                $route.path === '/projects-categories'
                  ? $color('navLinkFocused') + '-600'
                  : ''
              }`"
              href="#"
              title="Link"
              >Categories</router-link
            >
          </li>
        </ul>
        <span
          :class="`${$color('navTextUser')}-500`"
          class="flex justify-between items-center ml-auto mr-4"
        >
          <DayNightSwitch
            :value="switchOn"
            @change="
              (isOn) =>
                isOn
                  ? $store.commit('colorScheme', 'dark')
                  : $store.commit('colorScheme', 'default')
            "
          />
        </span>
        <AccountDropdown />
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      isHidden: true,
      switchOn: this.$store.getters.colorScheme === "dark",
    };
  }
};
</script>

<style>
  .q-electron-draggable {
    -webkit-user-select: none;
    -webkit-app-region: drag;
  }
  .q-electron-draggable > :not([class=q-electron-drag--exception]) {
    -webkit-app-region: no-drag;
  }
</style>
