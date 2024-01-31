
<template>
    <div class="gift-item-layout" :class="selected ? 'zoom':''" @click="handleClick">
        <div class="img">
            <img :src="imgUrl" alt="">
        </div>
        <div class="name">{{name}}</div>
    </div>
</template>

<script>
export default {
    setup(props, context) {
        const methods = {
            handleClick() {
                context.emit('sClick');
            }
        }
        return {
            ...methods,
        }
    },
    props: {
        name: {
            type: String,
            default: '',
        },
        imgUrl: {
            type: String,
            default: ''
        },
        selected: {
            type: Boolean,
            default: false,
        }
    }
}
</script>

<style scoped lang="less">
    .gift-item-layout {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 138px;
        height: 138px;
        opacity: 0.8;
        background: #6410bc;
        border-radius: 14px;
        &.zoom {
            width: 167px;
            height: 167px;
            transition: all 0.3s;
            opacity: 1;
            background: rgba(141,39,255,0.85);
            .img {
                width: 87px;
                height: 87px;
                img {
                    width: 87px;
                    height: 87px;  
                }
            }
            .name {
                width: 100px;
                font-size: 25px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
        .img {
            width: 72px;
            height: 72px;
            border-radius: 5px;
            overflow: hidden;
            img {
                width: 72px;
                height: 72px;
            }
        }
        .name {
            width: 100px;
            font-size: 18px;
            text-align: center;
            color: #fff;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
    
</style>