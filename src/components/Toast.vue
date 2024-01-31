
<template>
    <div class="toast-layout">
         <div class="toast-mask"></div>
         <div class="toast-content">{{content}}</div>
    </div>
</template>

<script>
export default {
    props: {
        content: ""
    },
    setup() {
        
    },
}
</script>

<style scoped lang="less">
    .toast-layout {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 99;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;

        .toast-mask {
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
            // background: rgba(0, 0, 0, 0.4);
        }
        .toast-content {
            position: relative;
            padding: 15px;
            width: 300px;
            color: #fff;
            border-radius: 10px;
            text-align: center;
            background: rgba(0, 0, 0, 0.8);
        }
    }
</style>