var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var getHtmlConfig = function (name,title) {
	return {
		template : './src/view/' + name + '.html',
		filename : 'view/' + name + '.html',
		title    : title,
		inject   : true,
		hash     : true,
		chunks   : ['jquery','common',name]
	}
}
module.exports = {
	entry:{
		'index'  : './src/page/index/index.js',
		'common' : './src/page/common/index.js',
		'user-login': './src/page/user-login/index.js',
		'user-register': './src/page/user-register/index.js',
		'list': './src/page/list/index.js',
		'user-center': './src/page/user-center/index.js',
		'user-center-update': './src/page/user-center-update/index.js',
		'user-pw-update': './src/page/user-pw-update/index.js',
		'user-pw-reset': './src/page/user-pw-reset/index.js',
		'user-address': './src/page/user-address/index.js',
		'user-address-update': './src/page/user-address-update/index.js',
		'about': './src/page/about/index.js',
		'order-list': './src/page/order-list/index.js',
		'order-details': './src/page/order-details/index.js',
		'list-details': './src/page/list-details/index.js'
	},
	output:{
		path:path.resolve(__dirname,'dist'),
		publicPath : '/dist/',
		filename : 'js/[name].js'
	},
	module:{
		rules : [
		  {
		  	test : /\.css$/,
		  	use : ExtractTextPlugin.extract({
		  		  fallback : 'style-loader',
		  		  use : [
		  			  {
						loader : 'css-loader'
					  }
		  		]
		  	})
		  },
		  {
		  	test : /\.string$/,
		  	use:[
		  		{
					loader : 'html-withimg-loader'
				},
				{
					loader : 'html-loader'
				}
			]
		  },
		  {
		  	test : /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/i,
		  	use : [
		  		{
		  			loader : 'url-loader',
		  			options : {
		  				limit : 100,
		  				name : 'resource/[name].[ext]'
		  			}
		  		}
		  	]
		  }
		]
	},
	resolve:{
		alias : {
            node_modules    : __dirname + '/node_modules',
            util            : __dirname + '/src/util',
            page            : __dirname + '/src/page',
            service         : __dirname + '/src/service',
            image           : __dirname + '/src/image'
        }
	},
	plugins:[
		new ExtractTextPlugin('css/[name].css'),
		new webpack.optimize.CommonsChunkPlugin({
			name : ['jquery'],
			filename : 'js/[name].js'
		}),
		new htmlWebpackPlugin(getHtmlConfig('index','首页')),
		new htmlWebpackPlugin(getHtmlConfig('user-login','用户登录')),
		new htmlWebpackPlugin(getHtmlConfig('user-register','用户注册')),
		new htmlWebpackPlugin(getHtmlConfig('list','商品列表')),
		new htmlWebpackPlugin(getHtmlConfig('user-center','个人中心')),
		new htmlWebpackPlugin(getHtmlConfig('user-center-update','修改个人信息')),
		new htmlWebpackPlugin(getHtmlConfig('user-pw-update','修改密码')),
		new htmlWebpackPlugin(getHtmlConfig('user-pw-reset','重置密码')),
		new htmlWebpackPlugin(getHtmlConfig('user-address','收货地址')),
		new htmlWebpackPlugin(getHtmlConfig('user-address-update','修改收货地址')),
		new htmlWebpackPlugin(getHtmlConfig('about','关于我们')),
		new htmlWebpackPlugin(getHtmlConfig('order-list','我的订单')),
		new htmlWebpackPlugin(getHtmlConfig('order-details','订单详情')),
		new htmlWebpackPlugin(getHtmlConfig('list-details','商品详情')),
		new webpack.ProvidePlugin({
            $: 'jquery'
        })
	],
	watchOptions:{
		poll:1000,
		aggregateTimeout:500,
		ignored:/node_modules/
	},
	devServer:{
		contentBase:path.resolve(__dirname,'dist'),
		port:8080,
		host:'localhost',
		compress:true,
	}
}