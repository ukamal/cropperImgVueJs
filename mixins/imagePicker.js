import { Cropper } from "vue-advanced-cropper";

function getMimeType(file, fallback = null) {
  const byteArray = new Uint8Array(file).subarray(0, 4);
  let header = "";
  for (let i = 0; i < byteArray.length; i++) {
    header += byteArray[i].toString(16);
  }
  switch (header) {
    case "89504e47":
      return "image/png";
    case "47494638":
      return "image/gif";
    case "ffd8ffe0":
    case "ffd8ffe1":
    case "ffd8ffe2":
    case "ffd8ffe3":
    case "ffd8ffe8":
      return "image/jpeg";
    default:
      return fallback;
  }
}

export default {
  components: {
    Cropper,
  },
  data() {
    return {
      image: {
        src: null,
        type: null,
      },
    };
  },
  methods: {
    crop() {
      const { canvas } = this.$refs.cropper.getResult();
      canvas.toBlob((blob) => {
        console.log(blob);
      }, this.image.type);
    },
    reset() {
      this.image = {
        src: null,
        type: null,
      };
    },
    loadImage(event) {
      const { files } = event.target;
      if (files && files[0]) {
        if (this.image.src) {
          URL.revokeObjectURL(this.image.src);
        }
        const blob = URL.createObjectURL(files[0]);

        const reader = new FileReader();
        reader.onload = (e) => {
          this.image = {
            src: blob,
            type: getMimeType(e.target.result, files[0].type),
          };
        };
        reader.readAsArrayBuffer(files[0]);
      }
    },
  },
  destroyed() {
    if (this.image.src) {
      URL.revokeObjectURL(this.image.src);
    }
  },
};
