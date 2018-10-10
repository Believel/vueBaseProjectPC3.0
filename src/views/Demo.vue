<template>
    <div class="demo">
        <el-row>
            <el-col :span="6">
                <h1>动态组件的使用(:is)</h1>
                <el-button type="primary" v-for="tab in tabs" :key="tab" @click="currentTab=tab">{{tab}}</el-button>
                <component :is="currentTabComponent"></component>
            </el-col>
            <el-col :span="12">
                <el-input v-model="input" placeholder="请输入内容"></el-input>
                <mySlot>
                    <template slot="header">
                        1.我是通过在父组件中通过'template'插入进去的(slot:header)
                    </template>
                    我是根据匿名插槽插入子组件的(slot: '')
                    <div slot="footer">
                        我是底部内容，根据具名插槽在一个普通的元素上插入进去的(slot: footer)
                    </div>
                </mySlot>
                <slotScope :todos="todos">
                    <!-- 将slotProps定义为具名插槽的名字 -->
                    <template slot-scope="slotProps">
                        <!-- 为待办项自定义一个模板，-->
                        <!-- 通过 `slotProps` 定制每个待办项。-->
                        <span v-if="slotProps.todo.isComplete">✓</span>
                        {{ slotProps.todo.text }}
                    </template>
                </slotScope>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import tabHome from '@/components/Demo/tab-home.vue';
    import tabArchive from '@/components/Demo/tab-archive.vue';
    import tabPosts from '@/components/Demo/tab-posts.vue';
    import mySlot from '@/components/Demo/slot.vue';
    import slotScope from '@/components/Demo/slotScope.vue';
    export default {
        data() {
            return {
                input: '',
                currentTab: 'Home',
                tabs: ['Home', 'Posts', 'Archive'],
                todos: [
                    {text: '吃饭', isComplete: false},
                    {text: '睡觉', isComplete: true},
                    {text: '打豆豆', isComplete: true}
                ]
            }
        },
        computed: {
            currentTabComponent() {
                return 'tab' + this.currentTab
            }
        },
        components: {
            tabHome,
            tabArchive,
            tabPosts,
            mySlot,
            slotScope
        }
    }
</script>
<style lang="scss" scoped>
    .demo {
        margin: 30px;
    }
</style>

