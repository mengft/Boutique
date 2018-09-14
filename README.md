## 项目介绍

- 到目前为止研究React-Native已经一年半载了，0.43版本的时候前后端独立开发了一款社交软件，算是入门级的一款产品，再之后0.44.0、0.46.1版本期间做了三款医疗软件。正好最近迎来了0.56版本的大更新，所以产生了创建一个项目来总结、记录一下之前积累的经验，也便于互相学习，我的愿景是将这个项目打造成一个组件库，最常用、最优化、最易上手的组件，目前主要是做UI、UE的一些技巧，关于Android和IOS原生与React-Native的集成，我再考虑要不要新起一个项目维护......

## 使用流程

- yarn
- react-native-link
- react-native run-ios || run-android 习惯在Android Studio、XCode中单独操作，这样便于发现问题和调试

## 组件库

- LoadImage 网络图片加载效果
- 仿Apple App Store首页UI、动画效果(Animated)
- ScrollTopBar（借助Animated、onTouch生命周期、React.Children、React.cloneElement实现）
- LoadView 界面加载组件
- HeaderLeft、HeaderRight 导航标题栏，支持文字、Icon渲染
- WebView加载通用界面（包含对WebView加载生命周期的处理）
- ScrollContainer 大标题与小标题相互切换，借助navigation和Animated实现透明度渐变
- FlatList 对原有的FlatList进行封装，实现上拉刷新RefershControl、下拉刷新UI组件的自定义
- ListView、Item 信息列表组件
- KeyboardAvoidingView 解决Form表单键盘遮盖情况（官网的组件问题较多，暂时不具备使用条件）

## 内置功能

- 导航组件与（react-navigation）
- 导航组件与Redux进行关联
- 界面切换转场（方式）动画自定义