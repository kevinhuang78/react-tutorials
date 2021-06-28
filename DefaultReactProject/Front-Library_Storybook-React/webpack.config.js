const path = require("path");

module.exports = ({config}) => {

	config.module.rules.push({
		test: /\.scss$/,
		loaders: [
			'style-loader',
			'css-loader',
			'sass-loader'
		],
		include: path.resolve(__dirname, '../')
	});

    config.module.rules.push({
        test: /\.css/,
        loaders: ['style-loader', 'css-loader'],
        include: path.resolve(__dirname, '../')
    });

	return config;
};