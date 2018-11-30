<template>
    <div class="slotscope">
        <h4>作用域插槽</h4>
        <ul>
            <li
                v-for="todo in todos"
                v-bind:key="todo.id"
            >
                <!-- 我们为每个 todo 准备了一个插槽，-->
                <!-- 将 `todo` 对象作为一个插槽的 prop 传入。-->
                <slot v-bind:todo="todo">
                <!-- 回退的内容 -->
                <!-- {{ todo.text }} -->
                </slot>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    props: {
        todos: Array
    }
};
</script>
<style lang="scss" scoped>
.slotscope {
    margin-top: 10px;
    height: 120px;
    width: 100%;
    box-shadow: 0 0 10px #63562c;
}
</style>
