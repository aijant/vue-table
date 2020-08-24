<template>
  <div name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <i class="modal-default-x" @click="$emit('close')">
            &times;
          </i>
          <div class="mt-4">
            <slot><label>Fullname:</label> {{ userData.fullname }} </slot><br />
            <slot><label>Uname:</label> {{ userData.uname }} </slot><br />
            <slot><label>Email:</label> {{ userData.email }} </slot><br />
            <slot
              ><label>Company:</label>
              {{ userData.company }}
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VueModel",
  props: {
    userData: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      showModal: false,
    };
  },
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(10 10 10 / 6%);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.modal-default-x {
  float: right;
}
</style>
