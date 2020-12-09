<template>
    <view>
        <button @tap="handleTap('picker1')">2级联动选择器</button>
        <view>{{ value1.join('-') }}</view>
        <x-level-picker ref="picker1"
            v-model="value1"
            mode="multiSelector"
            cancel-text="取消"
            confirm-text="确定"
            cancel-color="#0094ee"
            confirm-color="#4cd964"
            :list="list"
            :level="2"
            @change="handleChange"
            @confirm="handleConfirm"
            @cancel="handleCancel">
        </x-level-picker>
        
        <button @tap="handleTap('picker2')">3级联动选择器</button>
        <view>{{ value2.join('-') }}</view>
        <x-level-picker ref="picker2"
            v-model="value2"
            mode="multiSelector"
            cancel-text="取消"
            confirm-text="确定"
            cancel-color="#0094ee"
            confirm-color="#4cd964"
            :list="list"
            :level="3"
            @change="handleChange"
            @confirm="handleConfirm"
            @cancel="handleCancel">
        </x-level-picker>
        
        <button @tap="handleTap('picker3')">省市区三级选择</button>
        <view>{{ val3.join('-') }}</view>
        <x-level-picker ref="picker3"
            v-model="value3"
            mode="multiSelector"
            cancel-color="#f0ad4e"
            confirm-color="#4cd964"
            :list="areaList"
            :level="3"
            @change="handleChange"
            @confirm="handleConfirm"
            @cancel="handleCancel">
        </x-level-picker>
        <x-load-more iconType="auto" status="loading" :iconSize="28" color="#0094dd"></x-load-more>
    </view>
</template>

<script>
import { uniLoadMore } from '@dcloudio/uni-ui'
import areaData from '@/components/x-level-picker/area-data-min.js'
export default {
    components:{ uniLoadMore },
    data(){
        return {
            value1: [],
            val1: [],
            label1: [],
            value2: ['2', '22', '223'],
            val2: [],
            list: [
                {
                    label: '选项1',
                    value: '1',
                    children: [
                        {
                            label: '选项11',
                            value: '11',
                            children: [
                                {
                                    label: '选项111',
                                    value: '111'
                                },
                                {
                                    label: '选项112',
                                    value: '112'
                                },
                                {
                                    label: '选项113',
                                    value: '113'
                                }
                            ]
                        },
                        {
                            label: '选项12',
                            value: '12',
                            children: [
                                {
                                    label: '选项121',
                                    value: '121'
                                },
                                {
                                    label: '选项122',
                                    value: '122'
                                },
                                {
                                    label: '选项123',
                                    value: '123'
                                }
                            ]
                        },
                        {
                            label: '选项13',
                            value: '13',
                            children: [
                                {
                                    label: '选项131',
                                    value: '131'
                                },
                                {
                                    label: '选项132',
                                    value: '132'
                                },
                                {
                                    label: '选项133',
                                    value: '133'
                                }
                            ]
                        }
                    ]
                },
                {
                    label: '选项2',
                    value: '2',
                    children: [
                        {
                            label: '选项21',
                            value: '21',
                            children: [
                                {
                                    label: '选项211',
                                    value: '211'
                                },
                                {
                                    label: '选项212',
                                    value: '212'
                                },
                                {
                                    label: '选项213',
                                    value: '213'
                                }
                            ]
                        },
                        {
                            label: '选项22',
                            value: '22',
                            children: [
                                {
                                    label: '选项221',
                                    value: '221'
                                },
                                {
                                    label: '选项222',
                                    value: '222'
                                },
                                {
                                    label: '选项223',
                                    value: '223'
                                }
                            ]
                        },
                        {
                            label: '选项23',
                            value: '23',
                            children: [
                                {
                                    label: '选项231',
                                    value: '231'
                                },
                                {
                                    label: '选项232',
                                    value: '232'
                                },
                                {
                                    label: '选项233',
                                    value: '233'
                                }
                            ]
                        }
                    ]
                },
                {
                    label: '选项3',
                    value: '3',
                    children: [
                        {
                            label: '选项31',
                            value: '31',
                            children: [
                                {
                                    label: '选项311',
                                    value: '311'
                                },
                                {
                                    label: '选项312',
                                    value: '312'
                                },
                                {
                                    label: '选项313',
                                    value: '313'
                                }
                            ]
                        },
                        {
                            label: '选项32',
                            value: '32',
                            children: [
                                {
                                    label: '选项321',
                                    value: '321'
                                },
                                {
                                    label: '选项322',
                                    value: '322'
                                },
                                {
                                    label: '选项323',
                                    value: '323'
                                }
                            ]
                        },
                        {
                            label: '选项33',
                            value: '33',
                            children: [
                                {
                                    label: '选项331',
                                    value: '331'
                                },
                                {
                                    label: '选项332',
                                    value: '332'
                                },
                                {
                                    label: '选项333',
                                    value: '333'
                                }
                            ]
                        }
                    ]
                }
            ],
            value3: [],
            val3: [],
            areaList: areaData
        }
    },
    onReady () {
        this.$nextTick(() => {
            const info = this.$refs.picker2.getColumnsInfo(['2', '22', '223'])
            console.log('根据value获取的信息：', info)
        })
    },
    methods: {
        handleTap (picker) {
            this.$refs[picker].show()
        },
        handleChange (item) {
            console.log('change::', item)
        },
        handleConfirm (item) {
            console.log('confirm::', item)
            this.val3 = []
            for (let val of item.item) {
                this.val3.push(val.label)
            }
        },
        handleCancel (item) {
            console.log('cancel::', item)
        }
    }
	}
</script>
<style>
    /deep/ .lb-picker .lb-picker-column-label{color: #333;}
    /deep/ .lb-picker .lb-picker-column-active .lb-picker-column-label{color: red; font-weight: bold;}
</style>
