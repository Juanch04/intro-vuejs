const { createApp } = Vue;

const app = createApp({
  data() {
    return {
      products: [],
    };
  },
  methods: {
    loadProducts() {
      fetch("https://fakestoreapi.com/products")
        .then((response) => response.json())
        .then((result) => (this.products = result));
    },
    removeFromParent(id) {
      const newProducts = this.products.filter((p) => p.id !== id);
      this.products = newProducts;
    },
  },
  template: `
    <myHeader>My Store: Juancho</myHeader>

    <div class="flex my-4">
      <button @:click="loadProducts" class="bg-sky-500 rounded px-4 py-1 mx-auto">
        Cargar
      </button>
    </div>
  
    <main class="container mx-auto grid grid-cols-12 gap-8">
      <product
        v-for="product in products"
        :image="product.image"
        :title="product.title"
        :price="product.price"
        :id="product.id"
        v-on:remove="removeFromParent"
      />
    </main>
    
    <myFooter />  
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
  template: `
    <div class="col-span-4 flex gap-x-8 bg-white rounded-xl px-6 py-4 shadow-lg">
      <div class="w-32 h-32 flex place-self-center">
        <img :src="image" class="w-full h-full my-auto object-contain" />
      </div>
      <div class="w-full flex flex-col justify-between">
        <p class="font-medium text-lg">{{ title }}</p>
        <div class="flex items-center justify-between">
          <p>{{ price }}</p>
          <button
            @:click="remove(id)"
            class="bg-red-600 font-medium px-4 py-1 rounded text-white"
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
