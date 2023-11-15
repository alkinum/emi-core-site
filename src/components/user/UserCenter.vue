<template>
  <a-float class="user-center" v-model:visible="floatVisible" round centered>
    <div class="user-center__panel">
      <a-layout>
        <a-side width="200">
          <a-list-menu v-model="menuSelected" :menu="listMenu"></a-list-menu>
        </a-side>
        <a-content>
          <keep-alive>
            <component :is="currentPanel"></component>
          </keep-alive>
        </a-content>
      </a-layout>
    </div>
  </a-float>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';

import ApiKeyListPanel from './panels/ApiKeyListPanel.vue';
import UserInfoPanel from './panels/UserInfoPanel.vue';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:visible']);

const floatVisible = ref(props.visible);

watch(() => props.visible, (newVal) => {
  floatVisible.value = newVal;
});

watch(() => floatVisible.value, (newVal) => {
  emit('update:visible', newVal);
});

const panelMap = {
  userInfo: UserInfoPanel,
  apiKeyList: ApiKeyListPanel,
};

const listMenu = ref({
  用户: [{
    label: '基本信息',
    value: 'userInfo',
  }],
  API: [{
    label: 'API Key',
    value: 'apiKeyList',
  }],
});

const currentPanel = computed(() => {
  return panelMap[menuSelected.value as keyof typeof panelMap];
});

const menuSelected = ref('userInfo');
</script>

<style lang="scss">
.user-center {
  .a-float__content {
    width: 640px;
    height: 420px;
  }

  &__panel {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .a-side {
    flex-shrink: 0;
  }

  .a-list-menu {
    div:first-child {
      padding-top: 0;
    }

    &__split {
      margin-left: 0;
      margin-right: 0;
    }

    &__item {
      margin: 0;
      font-size: 14px;
      padding: 6px 8px;
    }
  }
}

@media screen and (max-width: 820px) {
  .user-center {
    .a-float__content {
      width: calc(100vw - 64px) !important;
    }
  }
}
</style>