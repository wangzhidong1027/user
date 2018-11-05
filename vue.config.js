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
			"/per": {
			  type: 'proxy',
			  target: 'http://172.20.129.46:8082/',
			},
			// "/per": {
			//   type: 'proxy',
			//   target: 'http://api.zhenxiangfuwu.com/',
			// }
		}
	}
};
