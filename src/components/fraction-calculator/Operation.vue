<template>
    <div class="operation-wrapper" :class="{ opened: isOpenMenu }">
        <ul class="operation-list">
            <li class="menu-item" @click="$emit('change', '*'); toggleMenu()">
                <span>+</span>
            </li>
            <li class="menu-item" @click="$emit('change', '-'); toggleMenu()">
                <span>-</span>
            </li>
            <li class="menu-item" @click="$emit('change', '/'); toggleMenu()">
                <span>/</span>
            </li>
            <li class="menu-item" @click="$emit('change', '+'); toggleMenu()">
                <span>+</span>
            </li>
        </ul>
        <div class="current-operation" @click="toggleMenu()">
            {{operation === '*' ? 'x' : operation}}
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Operation',

        props: {
            operation: String,
        },

        data() {
            return { isOpenMenu: false }
        },

        methods: {
            toggleMenu() {
                this.isOpenMenu = !this.isOpenMenu;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .operation-wrapper {
        position: relative;
        width: 50px;
        height: 50px;
        margin: 0 15px;
    }

    .current-operation {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        font-size: 2em;
        text-align: center;
        background: #4baf50;
        border-radius: 50%;
        color: white;
        transition: 0.2s;
        margin: auto;
        z-index: 1;
        cursor: pointer;

        &:hover {
            background: #328636;
        }
    }

    .opened {
        .current-operation {
            transform: scale(1.2);
        }
        ul {
            .menu-item {
                opacity: 1;

                &:nth-child(1) {
                    transform: rotate(-47deg) translate(-50px);
                }

                &:nth-child(2) {
                    transform: rotate(45deg) translateX(-50px);
                }

                &:nth-child(3) {
                    transform: rotate(134deg) translateX(-50px);
                }

                &:nth-child(4) {
                    transform: rotate(227deg) translateX(-50px);
                }
            }
        }
    }

    .menu-item {
        position: absolute;
        display: block;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        width: 50px;
        height: 50px;
        opacity: 0;
        transition: 0.5s;
        cursor: pointer;

        span {
            display: flex;
            align-items: center;
            justify-content: center;
            width: inherit;
            height: inherit;
            color: rgb(255, 255, 255);
            background: #9cbd9e;
            border-radius: 50%;
            text-align: center;
            text-decoration: none;
            font-size: 2em;
            box-shadow: 0px 0px 14px 0px #734d4d;
            transition: 0.2s;

            &:hover {
                background: #649267;
            }
        }

        &:nth-child(1) span {
            transform: rotate(0deg);
        }

        &:nth-child(2) span {
            transform: rotate(-47deg);
        }

        &:nth-child(3) span {
            transform: rotate(-120deg);
        }

        &:nth-child(4) span {
            transform: rotate(43deg);
        }
    }
</style>