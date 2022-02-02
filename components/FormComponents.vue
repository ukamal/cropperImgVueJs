<template>
  <div class="">
      <div class="col-span-12">
        <div class="mt-1 flex items-center">
          <div class="upload-example">
            <div class="flex">
              <Cropper
                ref="cropper"
                class="upload-example-cropper cropper mb-4"
                :src="previewImage"
                :stencil-props="{
                  aspectRatio: 1 / 1,
                }"
                @change="change"
                v-if="previewImage && !showImage"
              />
              <img
                :src="userInfo.photo"
                alt=""
                class="h-40 w-40"
                v-if="showImage"
              />
            </div>
            <div class="button-wrapper mt-4">
              <button
                class="button bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-500"
              >
                <input
                  type="file"
                  accept="image/*"
                  @change="uploadImage"
                />
              </button>
              <button
                type="button"
                class="bg-[#219F94] py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-white"
                @click="showImage = true"
              >
                Save Image
              </button>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";

export default {
  data() {
    return {
      showImage: false,
      previewImage: null,
      userInfo: {
        fname: "",
        lname: "",
        email: "",
        country: "",
        photo: "",
        bio: "",
      },
    };
  },
  components: {
    Cropper,
  },
  methods: {
    change({ canvas }) {
      this.userInfo.photo = canvas.toDataURL();
    },
    uploadImage(e) {
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (e) => {
        this.previewImage = e.target.result;
      };
    },
    async handleSubmit() {
      var validation = await this.$validate();
      if (validation) {
        console.log(this.userInfo);
      }
    },
  },
};
</script>

<style scoped>
.cropper {
  height: 300px;
  width: 300px;
  background-color: #fff;
}

.input-error {
  color: red;
}
</style>
