<template>
  <div class="api-key-list">
    <div class="api-key-list__header">
      <span>API Key</span>
      <a-button type="gradient" size="small" round @click="requestNewKey" :loading="isRequestingNewKey">申请</a-button>
    </div>
    <div class="api-key-list__content">
      <p class="api-key-list__tip">请妥善保管您的 API Key，不要将其透露给任何第三方</p>
      <a-list-view type="deep" v-if="apiKeyList.length">
        <a-list-view-item class="api-key-list__item" v-for="keyItem in apiKeyList" :key="keyItem.id">
          <div class="key">
            <i-material-symbols:vpn-key-rounded class="key__icon" />
            <span class="key__text">{{ getDisplayKey(keyItem.key) }}</span>
            <i-pepicons-pop:eye class="key__action" v-if="isFullKeyShowed(keyItem.key)" @click="hideKey(keyItem.key)" />
            <i-pepicons-pop:eye-closed v-else class="key__action" @click="showFullKey(keyItem.key)" />
          </div>
          <div class="action">
            <span class="action__created-at">创建于 {{ getFormattedDate(keyItem.createdAt) }}</span>
            <a-clickable-text class="action__revoke" type="danger" @click="revokeKey(keyItem.key)">销毁</a-clickable-text>
          </div>
        </a-list-view-item>
      </a-list-view>
      <a-empty v-else text="暂无可用的 API Key"></a-empty>
    </div>
  </div>
</template>

<script setup lang="ts">
import { message } from '@any-design/anyui';
import { computed, onBeforeMount, ref } from 'vue';

import { useUserStore } from '@/store/user';
import { requestApi } from '@/utils/api';
import { formatDate } from '@/utils/date';

const userStore = useUserStore();

const apiKeyList = computed(() => userStore.apiKeyList);

const keyShowedMap = ref(new Map<string, boolean>());

const isFullKeyShowed = (key: string) => !!keyShowedMap.value.get(key);
const getDisplayKey = (key: string) => {
  if (!isFullKeyShowed(key)) {
    return key.replace(/(?<=ek-).+/g, '*'.repeat(key.length - 3));
  }
  return key;
};

const showFullKey = (key: string) => {
  keyShowedMap.value.set(key, true);
};
const hideKey = (key: string) => {
  keyShowedMap.value.delete(key);
};

const getFormattedDate = (isoString: string) => {
  const d = new Date(isoString);
  return formatDate(d, '-');
};

const fetchKeyList = async () => {
  try {
    await userStore.getApiKeyList();
  } catch (error) {
    console.error('Failed to fetch key list:', error);
    message.error((error as any).message || '获取 API Key 列表失败');
  }
};

const isRequestingNewKey = ref(false);
const requestNewKey = async () => {
  isRequestingNewKey.value = true;
  try {
    await requestApi('POST', '/api-key/create');
    message.success('申请成功');
    await fetchKeyList();
  } catch (error) {
    message.error((error as any).message || '申请 API Key 失败');
  } finally {
    isRequestingNewKey.value = false;
  }
};

const isRequestingRevoke = new Map<string, boolean>();
const revokeKey = async (key: string) => {
  if (isRequestingRevoke.get(key)) {
    return;
  }
  isRequestingRevoke.set(key, true);
  try {
    await requestApi('POST', '/api-key/revoke', { apiKey: key });
    await fetchKeyList();
  } catch (error) {
    message.error((error as any).message || '销毁失败');
  } finally {
    isRequestingRevoke.delete(key);
  }
};

onBeforeMount(() => {
  fetchKeyList();
});
</script>

<style lang="scss" scoped>
.api-key-list {
  box-sizing: border-box;
  height: 100%;
  padding: 2px 0;

  &__header {
    font-size: 14px;
    margin-bottom: 8px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  &__content {
    height: calc(100% - 30px);
    position: relative;
  }

  &__tip {
    color: var(--text-80);
    font-size: 12px;
    margin-bottom: 12px;
  }

  &__item {
    padding: 8px 12px;
    box-sizing: border-box;
    justify-content: space-between;

    .key {
      display: flex;
      align-items: center;
      font-size: 13px;

      &__icon {
        margin-right: 6px;
      }

      &__text {
        font-family: Consolas;
      }

      &__action {
        margin-left: 8px;
        cursor: pointer;
        transition: color 100ms ease;
      }

      &__action:hover {
        color: var(--text-80);
      }
    }

    .action {
      display: flex;
      font-size: 12px;

      &__created-at {
        color: var(--text-80);
        font-size: 10px;
      }

      &__revoke {
        margin-left: 6px;
      }
    }
  }

  :deep(.a-empty) {
    border-radius: 16px;
    height: calc(100% - 36px);
    user-select: none;

    .a-empty__icon {
      font-size: 36px;
    }

    .a-empty__text {
      margin-bottom: 12px;
      font-size: 14px;
    }
  }
}
</style>