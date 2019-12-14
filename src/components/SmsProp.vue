<style scoped lang="less">
.smsform{
    width: 400px !important;
    padding: 40px !important;
}
.ivu-form .ivu-form-item-label{
    text-align: left;
    font-size: 16px;
    line-height: 16px;
}
</style>
<template>
    <Form :model="formItem" :label-width="120" class="smsform">
        <FormItem label="短信提醒号码">
            <Input v-model="formItem.smsReminderNumber" placeholder="请输入短信提醒号码" disabled="disabled" />
        </FormItem>
        <FormItem label="是否开启短信提醒(0.1元/条)">
            <RadioGroup v-model="formItem.radio">
                <Radio label="1">不开启</Radio>
                <Radio label="2">开启</Radio>
            </RadioGroup>
        </FormItem>
        
        <FormItem>
            <Button type="primary">保存</Button>
        </FormItem>
    </Form>
</template>
<script>
    export default {
        data () {
            return {
                formItem: {
                    input: '',
                    select: '',
                    radio: 'male',
                    checkbox: [],
                    switch: true,
                    date: '',
                    time: '',
                    slider: [20, 50],
                    textarea: ''
                }
            }
        },
        created(){
            this.formItem.smsReminderNumber = this.$store.state.phoneNum;
        }
    }
</script>
