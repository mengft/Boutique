/*
 * @Author: fantao.meng 
 * @Date: 2018-09-10 15:20:35 
 * @Last Modified by: fantao.meng
 * @Last Modified time: 2018-09-20 10:34:51
 */

import * as Config from '../Config';

const TransitionConfigs = {
	Default: 'defaultTransitionConfig',
	SlideFromRight: 'SlideFromRightIOS',
	ModalSlideFromBottom: 'ModalSlideFromBottomIOS',
	FadeInFromBottom: 'FadeInFromBottomAndroid',
	FadeOutToBottom: 'FadeOutToBottomAndroid',
}

 // Home 动画列表
const FlatListSource = [
	{
		title: '时下热门', text: '沧海一声笑，滔滔两岸潮', sourceType: 'image', source: { uri: `${Config.Host}/Assets/Images/Home/WechatIMG600.jpg` },
	},
	{
		title: '对话开发者', text: '这里便是诗和远方', sourceType: 'video', source: { uri: `${Config.Host}/Assets/Images/Home/WechatIMG602.jpg` },
	},
	{
		title: '夜景俯瞰', text: '中国香港的百万夜景', sourceType: 'image', source: { uri: `${Config.Host}/Assets/Images/Home/WechatIMG605.jpg` },
	},
	{
		title: '美国漫威', text: 'I\'m Your Bat Man', sourceType: 'appsale', source: { uri: `${Config.Host}/Assets/Images/Home/WechatIMG606.jpg` },
	},
	{
		title: '日本动画', text: '蜡笔小新，不是佩琦', sourceType: 'image', source: { uri: `${Config.Host}/Assets/Images/Home/WechatIMG607.jpg` },
	},
	{
		title: '动漫推荐', text: '在梦里，我只记得你的名字', sourceType: 'image', source: { uri: `${Config.Host}/Assets/Images/Home/WechatIMG609.jpg` },
	},
];

// Home AppList
const FlatListFooterSource = [
	{
		name: '抖音短视频-好玩的人', type: '摄影与录像', iconUri: 'https://www.apple.com/autopush/cn/itunes/charts/free-apps/images/2018/2/21d871d12d8e55991510b8b7c3b069fec3fbc9027735a66af7be787290429ac4.jpg', price: '¥12.00',
	},
	{
		name: '闲鱼-挂闲鱼，闲置能换dskflskflskflsdk', type: '购物', iconUri: 'https://www.apple.com/autopush/cn/itunes/charts/free-apps/images/2018/2/e5c8bebcb18d3b059e641b43344960494053125d3a631ce71d50ada6592671e6.jpg', price: false,
	},
	{
		name: '喜马拉雅FM', type: '图书', iconUri: 'https://www.apple.com/autopush/cn/itunes/charts/free-apps/images/2018/2/38095967cb4a65e1c0492d741912cdc5ba6c6a07fd02bf5f2224f20fd16791fd.jpg', price: '$14.00',
	},
	{
		name: '网易有道词典-7亿人都在用的外语学习翻译词典', type: '参考', iconUri: 'https://www.apple.com/autopush/cn/itunes/charts/free-apps/images/2018/2/df1e64c9679f76f66267cb0887d0aadbe16ff0a49b14ce861d684100585b69c1.jpg', price: false,
	},
];

// Form TopBar List
const HEALTH_COURSE = [
	{ key: 0, title: '推荐课程', url: 'http://mp.weixin.qq.com/s?__biz=MzAxMzMzODcyNQ==&mid=2652481377&idx=1&sn=519f52b845c6981684ad885abf3e0966' },
	{ key: 1, title: '人口队列研究', url: 'http://mp.weixin.qq.com/s?__biz=MzA5NTQ0NjY4MQ==&mid=2650946827&idx=1&sn=4d8aefef6987f88b611a5c8faec66cde' },
	{ key: 2, title: '糖尿病膳食', url: 'https://mp.weixin.qq.com/s?__biz=MzA3MjIzMzg0Mw==&mid=2649973550&idx=1&sn=86bb07916bfa7d9d918e8fd4a5242c10' },
	{ key: 3, title: '预防高血压', url: 'https://mp.weixin.qq.com/s?__biz=MzI0MjY0OTkxNw==&mid=2247494129&idx=1&sn=2449db42be63d465e16be329b3a449b7' },
	{ key: 4, title: '产后恢复', url: 'http://mp.weixin.qq.com/s?__biz=MzAxMzMzODcyNQ==&mid=2652481377&idx=1&sn=519f52b845c6981684ad885abf3e0966' },
	{ key: 5, title: '腰间盘突出', url: 'https://mp.weixin.qq.com/s?__biz=MzI0MjY0OTkxNw==&mid=2247494129&idx=1&sn=2449db42be63d465e16be329b3a449b7' },
	{ key: 6, title: '肩周炎', url: 'https://mp.weixin.qq.com/s?__biz=MzA3MjIzMzg0Mw==&mid=2649973550&idx=1&sn=86bb07916bfa7d9d918e8fd4a5242c10' },
];

// Form Content List
const FLAST_SOURCE = [
	{ title: '为何中国喜欢学霸，而美国大学更爱体育特长生？', author: '美国留学快报', pageViews: 1211, source: [
		{ uri: `${Config.Host}/Assets/Images/Home/WechatIMG600.jpg` },
		{ uri: `${Config.Host}/Assets/Images/Home/WechatIMG601.jpg` },
		{ uri: `${Config.Host}/Assets/Images/Home/WechatIMG602.jpg` },
	] },
	{ title: '又被评为全球最佳机场了，这个机场，简直是机场界的一股清流啊...', author: '带你游遍英国', pageViews: 3846, source: [
		{ uri: `${Config.Host}/Assets/Images/Home/WechatIMG601.jpg` },
		{ uri: `${Config.Host}/Assets/Images/Home/WechatIMG602.jpg` },
		{ uri: `${Config.Host}/Assets/Images/Home/WechatIMG603.jpg` },
	] },
	{ title: '告诉你一个鬼故事，后天要开学了！作业的deadline 到了......', author: '口语每天练', pageViews: 7860, source: [
		{ uri: `${Config.Host}/Assets/Images/Home/WechatIMG602.jpg` },
		{ uri: `${Config.Host}/Assets/Images/Home/WechatIMG603.jpg` },
		{ uri: `${Config.Host}/Assets/Images/Home/WechatIMG604.jpg` },
	] },
	{ title: '整天说自己是吃货，Sweet and Sour pork 是什么菜？', author: '口语每天练', pageViews: 1099, source: [
		{ uri: `${Config.Host}/Assets/Images/Home/WechatIMG603.jpg` },
		{ uri: `${Config.Host}/Assets/Images/Home/WechatIMG604.jpg` },
		{ uri: `${Config.Host}/Assets/Images/Home/WechatIMG605.jpg` },
	] },
	{ title: '"Wear two hats"是带两顶帽子？真拿你的中式英语1没办法...', author: '英语功夫天天练', pageViews: 9089, source: [
		{ uri: `${Config.Host}/Assets/Images/Home/WechatIMG604.jpg` },
		{ uri: `${Config.Host}/Assets/Images/Home/WechatIMG605.jpg` },
		{ uri: `${Config.Host}/Assets/Images/Home/WechatIMG606.jpg` },
	] },
	{ title: '"Wear two hats"是带两顶帽子？真拿你的中式英语1没办法...', author: '英语功夫天天练', pageViews: 9089, source: [
		{ uri: `${Config.Host}/Assets/Images/Home/WechatIMG604.jpg` },
		{ uri: `${Config.Host}/Assets/Images/Home/WechatIMG605.jpg` },
		{ uri: `${Config.Host}/Assets/Images/Home/WechatIMG606.jpg` },
	] },
	{ title: '"Wear two hats"是带两顶帽子？真拿你的中式英语1没办法...', author: '英语功夫天天练', pageViews: 9089, source: [
		{ uri: `${Config.Host}/Assets/Images/Home/WechatIMG604.jpg` },
		{ uri: `${Config.Host}/Assets/Images/Home/WechatIMG605.jpg` },
		{ uri: `${Config.Host}/Assets/Images/Home/WechatIMG606.jpg` },
	] },
	{ title: '"Wear two hats"是带两顶帽子？真拿你的中式英语1没办法...', author: '英语功夫天天练', pageViews: 9089, source: [
		{ uri: `${Config.Host}/Assets/Images/Home/WechatIMG604.jpg` },
		{ uri: `${Config.Host}/Assets/Images/Home/WechatIMG605.jpg` },
		{ uri: `${Config.Host}/Assets/Images/Home/WechatIMG606.jpg` },
	] },
	{ title: '"Wear two hats"是带两顶帽子？真拿你的中式英语1没办法...', author: '英语功夫天天练', pageViews: 9089, source: [
		{ uri: `${Config.Host}/Assets/Images/Home/WechatIMG604.jpg` },
		{ uri: `${Config.Host}/Assets/Images/Home/WechatIMG605.jpg` },
		{ uri: `${Config.Host}/Assets/Images/Home/WechatIMG606.jpg` },
	] },
];

export {
	TransitionConfigs,
    FlatListSource, FlatListFooterSource,
	HEALTH_COURSE, FLAST_SOURCE,
};