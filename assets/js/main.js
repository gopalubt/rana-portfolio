// app.js
import { createApp } from 'vue';
import footerComponent from './components/footer-component.js';

createApp({
  components: {
    footerComponent: footerComponent // Registering the imported footer component
  },
  data() {
    return {
      block_3: null,
      message: 'Footer'
    };
  },
  methods: {
    loadBlock3() {
      this.block_3 = {
        block: "block_3",
        heading: "My Resume",
        subHeading: '2+ Years of experience',
        content: '',
        media: ''
      };
    }
  },
  created() {
    this.loadBlock3();
  }
}).mount('#app');
