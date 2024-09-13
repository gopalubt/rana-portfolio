const { createApp } = Vue
        
createApp({
  data() {
    return {
        block_3:null,
      message: 'Footer'
    }
  },
  methods: {
    loadBlock3: function(){
        this.block_3 = {
            block:"block_3",
            heading:"My Resume",
            subHeading: '2+ Years of experience',
            conent:'',
            media:''
        }
    }
  },
  created(){
    this.loadBlock3()
  }
}).mount('#app')