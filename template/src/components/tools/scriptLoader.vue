<!--
 * @组件名称 可视化组件超类
 * 
 * @作者   Jeking Yang
 * @日期   2019-05-17
 * @版本   1.0.0
 ---------------------------------------->
<script>
export default {
  name: 'ScriptLoader',
  components: {
   
  },
  // 1>:属性定义..............................
  props: {
    src:{
       type:String,
       required:true
    }
  },
  // 2>:初始化.................................
	mounted(){
   
  },
  // 3>:实现方法...............................
  methods: {
    onLoaded(event){
      this.$emit('onLoaded',event);
    }
  },
  render(createElement) {
    return createElement('script', { 
      attrs: { type: 'text/javascript', src: this.src },
      on:{load:this.onLoaded}
    });
  }
}
</script>
