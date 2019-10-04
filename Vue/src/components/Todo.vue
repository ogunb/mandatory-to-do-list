<template>
  <transition name="listWrapper">
    <div class="listWrapper">
      <div
        class="theList"
        :class="{ isDone }"
        @click="handleIsDone(index)">
        <div>
          <label class="theList__label" for="status">{{ content }}</label>
        </div>
        <input type="checkbox" class="status">

        <span class="check">
          <svg width="18px" height="18px" viewBox="0 0 18 18">
            <path
              d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"
            ></path>
            <polyline points="1 9 7 14 15 4"></polyline>
          </svg>
        </span>
      </div>

      <delete-todo
        :removeTodo="removeTodo"
        :index="index" />
    </div>
  </transition>
</template>

<script>
import DeleteTodo from "./DeleteTodo.vue";

export default {
  name: "TodoList",
  components: { DeleteTodo },
  props: ["content", "isDone", "handleIsDone", "removeTodo", "index"],
};
</script>

<style>
.listWrapper {
  position: relative;
  animation: slideIn 500ms ease-out forwards 1;
  transform: translateX(-30px);
  opacity: 0;
  transition: opacity 150ms ease-in, transform 300ms ease-out;
  padding: 0 10%;
}
.listWrapper-leave-active {
  animation: slideOut 500ms ease-out forwards 1;
}
.theList {
  display: grid;
  grid-template-columns: 1fr auto auto;
  margin: 30px 0;
  position: relative;
}
.theList,
.theList__label,
.check {
  cursor: pointer;
}
.status {
  visibility: hidden;
  transform: translate(-9999px);
}
.theList__label {
  position: relative;
  transition: color 500ms ease-in, transform 300ms ease-in;
}
.theList.isDone .theList__label {
  color: #808080;
  transform: scale(0.95);
}
.theList__label::after {
  position: absolute;
  content: "";
  display: block;
  background: #333;
  max-width: 0px;
  width: 100%;
  height: 1px;
  top: 55%;
  left: 0;
  transition: max-width 500ms ease-in;
}
.theList.isDone .theList__label::after {
  background: #808080;
  max-width: 500px;
}
.theList.isDone + .check svg {
  stroke: #4285f4;
}
.check {
  cursor: pointer;
  position: relative;
  margin: auto;
  width: 18px;
  height: 18px;
  transform: translate3d(0, 0, 0);
}
.check:before {
  content: "";
  position: absolute;
  top: -15px;
  left: -15px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(34, 50, 84, 0.3);
  opacity: 0;
  transition: opacity 0.2s ease;
}
.check svg {
  position: relative;
  z-index: 1;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke: #c8ccd4;
  stroke-width: 1.5;
  transform: translate3d(0, 0, 0);
  transition: all 0.2s ease;
}
.check svg path {
  stroke-dasharray: 60;
  stroke-dashoffset: 0;
}
.check svg polyline {
  stroke-dasharray: 22;
  stroke-dashoffset: 66;
}
.theList:hover .check:before {
  opacity: 1;
}
.theList:hover .check svg {
  stroke: #42b883;
}
.listWrapper:hover .deleteTodo {
  animation: wobble 500ms ease-in-out forwards;
}
.theList.isDone > .check svg {
  stroke: #42b883;
}
.theList.isDone > .check svg path {
  stroke-dashoffset: 60;
  transition: all 0.3s linear;
}
.theList.isDone > .check svg polyline {
  stroke-dashoffset: 42;
  transition: all 0.2s linear;
  transition-delay: 0.15s;
}
@keyframes slideIn {
  0% {
    opacity: 0;
    transform: translateX(-30px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes slideOut {
  0% {
    opacity: 1;
    transform: translateX(0);
  }
  100% {
    opacity: 0;
    transform: translateX(-30px);
  }
}
@keyframes wobble {
  0% {
    opacity: 0;
    visibility: hidden;
  }
  1% {
    visibility: visible;
  }
  100% {
    opacity: 1;
    visibility: visible;
  }
  0%,
  100% {
    transform: translateX(0%);
    transform-origin: bottom bottom;
  }
  15% {
    transform: translateX(-5px) rotate(-3.6deg);
  }
  30% {
    transform: translateX(5px) rotate(2.4deg);
  }
  60% {
    transform: translateX(-2px) rotate(2.4deg);
  }
  90% {
    transform: translateX(2px) rotate(2.4deg);
  }
}
</style>