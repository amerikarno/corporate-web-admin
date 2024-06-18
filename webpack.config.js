import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import tailwindcss from "tailwindcss"
import autoprefixer from "autoprefixer"


export default {
    mode: 'development',
  entry: './src/assets/scss/style.scss',
  output: {
    path: path.resolve('./src/assets/css'),
    filename: 'style.js',
  },
  module: {
    rules: [
      {
        
        test: /\.scss$/,
        use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  ident: 'postcss',
                  plugins: [tailwindcss, autoprefixer],
                },
              },
            },
          'sass-loader', // Compile SCSS to CSS
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      linkType: "text/css",
      filename: 'style.css', // Specify the name for the extracted CSS file
    }),
  ],
  watch: true,
  devtool: 'source-map',
};