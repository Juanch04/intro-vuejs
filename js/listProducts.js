const { createApp } = Vue;

const app = createApp({
  data() {
    return {
      products: [],
      validLogin: false,
      nameUser: "",
    };
  },
  mounted() {
    this.loadProducts();
  },
  methods: {
    async loadProducts() {
      const response = await fetch("https://fakestoreapi.com/products");
      const result = await response.json();
      this.products = result;
    },
    removeFromParent(id) {
      const newProducts = this.products.filter((p) => p.id !== id);
      this.products = newProducts;
    },
    submitForm() {
      if (this.nameUser) this.validLogin = true;
    },
  },
  template: `
    <div
      class="flex flex-col h-screen items-center justify-center"
      v-if="!validLogin"
    >
      <form
        @submit.prevent="submitForm"
        class="bg-white flex flex-col gap-y-8 p-8 rounded-lg shadow-xl"
      >
        <h1 class="font-medium text-3xl text-center">Inicia Sesión</h1>
        <div class="flex flex-col gap-y-4 mx-auto">
          <label for="name">Nombre*</label>
          <input
            required
            id="name"
            name="nameUser"
            type="text"
            v-model="nameUser"
            class="rounded border outline-0 py-1 px-4"
          />
        </div>
        <button
          class="bg-red-500 mx-auto py-1 rounded shadow text-white w-full"
          type="submit"
        >
          Entrar!
        </button>
      </form>
    </div>

    <template v-else>
      <myHeader>My Store: {{ nameUser }}</myHeader>

      <main class="container gap-6 grid grid-cols-12 mx-auto px-4">
        <product
          v-for="product in products"
          :key="'product_' + product.id"
          :image="product.image"
          :title="product.title"
          :price="product.price"
          :id="product.id"
          v-on:remove="removeFromParent"
        />
      </main>

      <myFooter />
    </template>
  `,
});

app.component("myHeader", {
  template: `
    <header class="py-4">
      <h1 class="text-5xl text-center font-bold">
        <slot></slot>
      </h1>
    </header>
  `,
});

app.component("myFooter", {
  template: `    
    <footer>
      <ul>
        <li>WhatsApp</li>
        <li>Instagram</li>
      </ul>
    </footer>
  `,
});

app.component("product", {
  props: {
    image: String,
    title: String,
    price: Number,
    id: Number,
  },
  methods: {
    remove(id) {
      this.$emit("remove", id);
    },
  },
  computed: {
    convertCurrency({ price }) {
      return new Intl.NumberFormat("es-ES", {
        style: "currency",
        currency: "EUR",
      }).format(price);
    },
  },
  template: `
    <div
      class="bg-white col-span-12 flex gap-x-8 md:col-span-6 px-6 py-4 rounded-xl shadow-lg xl:col-span-4"
    >
      <div class="flex h-32 place-self-center w-32">
        <img :src="image" class="h-full my-auto object-contain w-full" />
      </div>
      <div class="flex flex-col justify-between w-full">
        <p class="font-medium text-lg">{{ title }}</p>
        <div class="flex items-center justify-between">
          <p>{{ convertCurrency }}</p>
          <button
            @:click="remove(id)"
            class="bg-red-600 font-medium px-4 py-1 rounded shadow-xl text-white"
            type="button"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  `,
});

const vm = app.mount("#app");
