<template>
  <div class="home">
    <img
      alt="Vue logo"
      src="../assets/logo.png"
    >
    <HelloWorld
      :msg="count"
      ref="hello"
    />
    <p class="txt">hahahah</p>
    <ul class="tablelist">
      <li
        v-for="(item, index) in list"
        :key="index"
        class="tableitem"
      >
        <p>{{item.userName}} —— {{item.Address}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "components/HelloWorld.vue";
import { mapActions, mapState } from "vuex";
import { get_tablelist } from "@/api.js";

export default {
    name: "home",
    data() {
        return {
            list: [],
            num: 23.00111
        };
    },
    computed: {
        // 在这里映射store.state.count,使用方法和computed里的其他属性一样
        ...mapState(["count"])
    },
    created() {
        this.incrementStep();
        this.getTablelist();
    },
    mounted() {
        console.log(this.$refs.hello);
    },
    methods: {
        onhandleClick() {
            alert(11);
        },
        async getTablelist() {
            try {
                let res = await get_tablelist();
                if (res.data.code === 0) {
                    this.list = res.data.result.list;
                }
            } catch (error) {
                console.log(error);
            }
        },
        ...mapActions(["incrementStep"])
    },
    components: {
        HelloWorld
    }
};
</script>

<style lang="scss">
/*scss变量和mixin使用*/
.txt {
    color: $pink;
    @include font(32px, 32px);
}
</style>
