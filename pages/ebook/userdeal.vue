<template>
    <view class="content">
        <x-nav-bar title="用户协议"></x-nav-bar>
        <!-- 新禧保险用户协议 -->
       <view class="main">
			<view>欢迎注册成为新禧保险经纪用户，请您仔细阅读本协议，如您对本协议的任何条款表示异议，您可以选择不注册。当您勾选“已阅读并同意《用户协议》”，即表示您确认本协议内容并自愿遵守本协议。 如果您在新禧保险经纪网站或其他新禧保险经纪提供的移动应用或软件上，访问、预订或使用我们的产品或服务，便视为您完全接受本协议项下的全部条款。</view>
			<view>新禧保险经纪<text @click="openUrl('http://www.xinxiichina.com')">（http://www.xinxiichina.com/）</text>所提供的各项服务和内容的所有权和运作权归新禧保险经纪有限公司及其关联公司所有。</view>
			<view class="tit">一、使用规则</view>
			<view>1.在您完成注册申请手续后，意味着您获得新禧保险经纪账户的使用权，该用户账号和密码由您负责保管，您应当对以用户帐号进行的所有活动和事件负法律责任。</view>
			<view>2.在您完成注册程序或使用新禧保险经纪服务时，您应当是具备完全民事行为能力的自然人、法人或其他组织。若您不具备前述主体资格，将需承担因此而导致的一切法律责任。在完成注册、激活或验证流程时，您应当按照相应页面的提示提供您的身份信息及资料，以使之真实、及时、完整和准确；当您的身份信息及资料发生变化时，您应当及时更新并准确提供您的身份信息及资料。</view>
			<view>3.您承诺遵守法律法规、社会主义制度、国家利益、公民合法权益、公共秩序、社会道德风尚和信息真实性等七条底线，并遵守相关法律法规，账号名称等注册信息中不得含有违法和不良信息。因您以虚假信息骗取账号名称注册，或您账号等注册信息存在违法和不良信息的，或利用新禧保险经纪账号实施重复侵权行为的，新禧保险经纪有权采取通知您限期改正、暂停使用、注销登记等措施。</view>
			<view>4.您应妥善保管您的账户（用户名）和密码，通过您的账户（用户名）和密码操作或实施的行为，将视为您本人的行为，由您本人承担相应的责任和后果。如果您发现他人不当使用您的账户或有任何其他可能危及您的账户安全的情形时，您应当立即以书面、有效方式通知新禧保险经纪，要求新禧保险经纪暂停相关服务。在此，您理解新禧保险经纪对您的请求采取行动需要合理时间，新禧保险经纪对在采取行动前已经产生的后果（包括但不限于您的任何损失）不承担任何责任。</view>
			<view>5.在遵守本服务协议的前提下，您将享有本网站提供的用户服务，并将收到新禧保险经纪最新的优惠产品和服务的相关信息。 如您不愿意接受新禧保险经纪的信息，您有权要求新禧保险经纪停止向您发送产品和服务信息。</view>
			<view>6.您完全理解并同意，对于您在新禧保险经纪上发布的涉嫌违法或涉嫌侵犯他人合法权利或违反本协议的信息，新禧保险经纪有权不经通知您即予以删除；</view>
			<view>7.您完全理解并同意，对于您涉嫌违反承诺的行为对任意第三方造成损害的，您均应当以自己的名义独立承担所有的法律责任。</view>
			<view class="tit">二、隐私声明</view>
			<view>新禧保险经纪非常重视对您隐私的保护，新禧保险经纪会在您自愿选择服务或提供信息的情况下收集您的个人信息，例如公司工商信息、人员身份信息、索赔信息等，您了解并同意，您向新禧保险经纪提供的个人信息将用于为您提供更好的服务、新禧保险经纪业务相关的营销研究，以及以邮寄、短信或电子邮件的方式向您提供有关新禧保险经纪保险产品、服务和活动信息。在必要情形下第三方可能接触并使用您的个人信息，包括得到授权的新禧保险经纪员工、以及不时执行与我们的业务、营销活动和数据整理有关工作的其他公司或人员。所有此类人员及公司均需遵守相关保密协议，同时也需遵守国家关于个人信息保护有关法律法规，以确保您的个人信息随时得到保护。</view>
       </view>
    </view>
</template>

<script>
    export default{
        
    }
</script>

<style lang="scss" scoped>
.content{padding: 24rpx; font-size: 28rpx;
    .main{
        view{text-indent: 2em;}
        .tit{text-indent: 0; font-weight: bold;}
    }
}
</style>
