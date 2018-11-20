module.exports = {
	configureWebpack: config => {
		require("vux-loader").merge(config, {
			options: {},
			plugins: ["vux-ui"]
		});
	},
  outputDir: process.env.outputDir,
	// 打包时不生成.map文件
	productionSourceMap: false,
	// devServer: {
	// 	proxy: {
	// 		// "/per": {
	// 		//   type: 'proxy',
	// 		//   target: 'http://api.ciecinfo.com/',
	// 		// },
	// 		// "/per": {
	// 		//   type: 'proxy',
	// 		//   target: 'http://api.ciecinfo.com/',
	// 		// }
	// 	}
	// }
}
