const path=require('path')
module.exports = {
  mode: 'development',
  entry: {
    helloWorld: './src/helloWorld.ts',
    box:'./src/box.ts'
  },
  devtool: 'inline-source-map',
  devServer: {
    static:'./dist'
  },
  output: {
    filename: '[name].js',
    path:path.resolve(__dirname,'dist')
  },
  resolve: {
    extensions:['.ts','.tsx','.js']
  },
  module: {
    rules: [
      {test:/\.tsx?$/,loader:'ts-loader'}
    ]
  }
  
}