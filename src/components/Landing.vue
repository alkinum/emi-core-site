<template>
  <div class="landing">
    <div class="landing-avatar"></div>
    <div class="landing-title">
      <span>Emi</span>
    </div>
    <div class="landing-subtitle">
      <span>让元气少女来做你的私人助理~</span>
    </div>
    <div class="landing-action">
      <div class="landing-action__buttons">
        <a href="https://www.ciciai.com/share?botId=7336476855417126920" target="_blank"><a-button><span>Chat on Cici</span><i-material-symbols:arrow-upward-rounded /></a-button></a>
        <a href="https://t.me/emi_coze_bot" target="_blank"><a-button><span>Chat on Telegram </span><i-material-symbols:arrow-upward-rounded /></a-button></a>
        <a href="https://chat.openai.com/g/g-GUFnRj0XR-emi" target="_blank"><a-button><span>Chat on GPTs </span><i-material-symbols:arrow-upward-rounded /></a-button></a>
      </div>
      <div class="landing-action__input">
        <a-input v-model="userInput" placeholder="Message Emi..." borderless round>
          <template #post-button>
            <a-button round @click="handleSendClicked">
              <i-material-symbols:arrow-upward-rounded />
            </a-button>
          </template>
        </a-input>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const userInput = ref('');

const handleSendClicked = () => {
  // open telegram by default because it's free and easy to access
  window.open('https://t.me/emi_coze_bot', '_blank');
  userInput.value = '';
};
</script>

<style lang="scss">
@keyframes banner-in {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes action-input-in {
  0% {
    opacity: 0;
    transform: translateY(12px) scale(0.8);
  }

  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes action-button-in {
  0% {
    opacity: 0;
    transform: translateY(6px) scale(0.6);
  }

  100% {
    opacity: 1;
    transform: translateY(0px) scale(1);
  }
}


.landing {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  user-select: none;
  box-sizing: border-box;

  &-avatar {
    width: 8rem;
    height: 8rem;
    position: relative;
    border-radius: 50%;
    background-image: url('../assets/emi.webp');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, .04), 0px 8px 16px -4px rgba(0, 0, 0, .04), 0 0 0 1px hsla(0, 0%, 100%, .3);
    margin-bottom: 3rem;
    animation: banner-in 420ms ease-out 0.14s 1 forwards;
    opacity: 0;
  }

  &-title {
    font-size: 1.875rem;
    line-height: 2.25rem;
    font-weight: 600;
    margin-bottom: 1rem;
    box-sizing: border-box;
    animation: banner-in 420ms ease-out 0.14s 1 forwards;
    opacity: 0;

    span {
      color: #fff;
      text-shadow: 1px 1px 2px var(--shadow-5);
    }
  }

  &-subtitle {
    font-size: 1.25rem;
    line-height: 1.75rem;
    font-weight: 500;
    box-sizing: border-box;
    color: #fff;
    margin-bottom: 7.5rem;
    animation: banner-in 420ms ease-out 0.14s 1 forwards;
    opacity: 0;

    span {
      color: #fff;
      letter-spacing: 0.025rem;
      text-shadow: 1px 1px 2px var(--shadow-5);
    }
  }

  &-action {
    width: 42%;
    min-width: 320px;
    position: relative;
    margin-bottom: 4rem;

    &__buttons {
      display: flex;
      width: 100%;
      margin-bottom: 16px;

      a {
        text-decoration: none;
        margin-right: 6px;
      }

      a:last-child {
        margin-right: 0;
      }

      .a-button {
        min-width: 200px;
        border-radius: 4px;
        position: relative;
        background-color: rgba(255, 255, 255, 0.1);
        border: none;
        padding: 0;
        height: 36px;
        border-radius: 18px;
        width: 42%;
        animation: action-button-in 220ms ease-out 820ms 1 forwards;
        opacity: 0;

        &__inner {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: rgba(255, 255, 255, 0.6);
          font-size: 13px;
          line-height: 1;
          padding: 12px 10px 12px 18px;
          box-sizing: border-box;

          span {
            color: rgba(255, 255, 255, 0.8);
            transition: color 100ms ease;
          }

          svg {
            background-color: rgba(0, 0, 0, 0.08);
            color: #fff;
            padding: 4px;
            border-radius: 50%;
            position: relative;
            box-sizing: border-box;
            font-size: 20px;
            display: none;
          }
        }
      }

      .a-button:hover {
        background-color: rgba(255, 255, 255, 0.15);

        .a-button__inner {
          padding: 6px 10px 6px 18px;

          span {
            color: rgba(255, 255, 255, 0.8);
          }

          svg {
            display: block;
          }
        }
      }

      .a-button:active {
        background-color: rgba(255, 255, 255, 0.18);
      }
    }

    &__input {
      width: 100%;
      position: relative;
      animation: action-input-in 240ms ease-out 420ms 1 forwards;
      opacity: 0;

      .a-input {
        &__inner {
          background: rgba(255, 255, 255, 0.1);
          transition: background-color 100ms ease, box-shadow 100ms ease;
          padding-right: 8px;
          letter-spacing: 0;
          color: #fff;
        }

        &__inner:active {
          background: rgba(255, 255, 255, 0.2);
        }

        &__inner:focus {
          background: rgba(255, 255, 255, 0.2);
        }

        &__inner::placeholder {
          color: rgba(255, 255, 255, 0.8);
        }
      }

      .a-button {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(255, 255, 255, 0.1);
        border: none;
        padding: 0;
        color: rgba(255, 255, 255, 0.6);
        font-size: 14px;
      }

      .a-button:hover {
        background-color: rgba(255, 255, 255, 0.15);
      }

      .a-button:active {
        background-color: rgba(255, 255, 255, 0.18);
      }
    }
  }
}

@media screen and (max-width: 1600px) {
  .landing {
    &-action {
      width: 60%;
    }
  }
}

@media screen and (max-width: 1024px) {
  .landing {
    &-action {
      width: 72%;
    }
  }
}

@media screen and (max-width: 875px) {
  .landing {
    &-action {
      width: 80%;

      &__buttons {
        flex-direction: column;
        position: relative;

        a {
          margin-right: 0;
          margin-bottom: 12px;
        }

        a:last-child {
          margin-bottom: 0;
        }

        .a-button {
          width: 100%;
        }
      }
    }

    &-subtitle {
      margin-bottom: 5.5rem;
    }
  }
}

@media screen and (max-width: 640px) {
  .landing {
    &-action {
      width: 88%;
    }
  }
}
</style>