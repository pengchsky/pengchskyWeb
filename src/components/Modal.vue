
<template>
    <div class="modal-layout" @touchmove.prevent>
         <div class="modal-mask"></div>
         <slot @click="handleClick" />
    </div>
</template>

<script>
export default {
    props: {
        content: ""
    },
    setup() {
        const methods = {
            handleClick() {
                console.log(1231);
                context.emit('click');
            }
        }
        return {
            ...methods,
        }
    },
}
</script>

<style scoped lang="less">
    .modal-layout {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 9;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;

        .modal-mask {
            position: absolute;
            left: 0;
            top: 98px;
            right: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.35);
            border-radius: 30px 30px 0 0;
            // background: rgba(0, 0, 0, 0.4);
        }
        .modal-content {
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