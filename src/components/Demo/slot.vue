<template>
    <div class="slot">
        <h4>插槽</h4>
        <div class="header">
            <slot name="header"></slot>
        </div>
        我是子组件里面的内容
        <!-- 插槽 -->
        <div>
            <slot></slot>
        </div>
        <slot name="footer">

        </slot>
        
    </div>
</template>
<style lang="scss" scoped>
    .slot {
        margin-top: 10px;
        height: 120px;
        box-shadow: 0 0 10px #63562c;
    }
</style>

