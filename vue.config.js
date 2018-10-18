module.exports = {
	configureWebpack: config => {
		require("vux-loader").merge(config, {
			options: {},
			plugins: ["vux-ui"]
		});
	},
	devServer: {
		open: true,
		https: false,
		hotOnly: false,
		proxy: { // 配置跨域
			'*': {
				//要访问的跨域的api的域名
				target: 'http://10.10.18.12:8082',
				// ws: true,
				changOrigin: true,
			}
		},
	}
};
