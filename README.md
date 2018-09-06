* 离线Bundle包
# react-native bundle --platform ios --dev false --entry-file index.js --bundle-output main.jsbundle --assets-dest ./

* 内置功能

# 网络图片加载效果（自定义组件LoadImage）
# 仿Apple App Store首页UI、动画效果(Animated)
# 导航组件（react-navigation）
# ScrollTopBar（借助Animated、onTouch生命周期、React.Children、React.cloneElement实现）
# 界面加载组件（LoadView）
# 导航标题栏，支持文字、Icon渲染（HeaderLeft、HeaderRight）
# WebView加载通用界面（包含对WebView加载生命周期的处理）
# 大标题与小标题相互切换，借助navigation和Animated实现透明度渐变
# 封装FlatList，实现上拉刷新RefershControl、下拉刷新UI组件的自定义