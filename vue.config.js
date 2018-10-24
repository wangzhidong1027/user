module.exports = {
	configureWebpack: config => {
		require("vux-loader").merge(config, {
			options: {},
			plugins: ["vux-ui"]
		});
	},
	// 打包时不生成.map文件
	productionSourceMap: false,
	devServer: {
		proxy: {
			// "/per": {
			//   type: 'proxy',
			//   target: 'http://10.10.18.12:8082/',
			// },
			"/per": {
			  type: 'proxy',
			  target: 'http://api.zhenxiangfuwu.com/',
			},
			"/toolcate": {
			  type: 'proxy',
			  target: 'http://api.zhenxiangfuwu.com/',
			}
		}
	}
};
