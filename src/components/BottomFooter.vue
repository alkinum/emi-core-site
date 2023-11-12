<template>
  <div class="bottom-footer">
    <div class="bottom-footer__group">alkinum.io</div>
    <i-mdi-github />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
@keyframes footer-in {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 0.6;
  }
}

.bottom-footer {
  position: absolute;
  bottom: 32px;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  position: relative;
  height: 16px;
  padding-right: 16px;
  animation: footer-in 300ms ease-out 240ms 1 forwards;
  opacity: 0;
  user-select: none;

  &__group {
    color: rgba(255, 255, 255, 0.6);
    margin-right: 8px;
  }

  svg {
    color: rgba(255, 255, 255, 0.6);
    transition: color 200ms ease;
  }

  svg:hover {
    color: #fff;
    cursor: pointer;
  }
}
</style>