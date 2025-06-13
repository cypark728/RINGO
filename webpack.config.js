var path = require('path');
const webpack = require('webpack');


module.exports = {
    mode: 'development',
    performance: {
        maxAssetSize: 1000000, // 1MB로 설정 (기본값은 244KB)
        maxEntrypointSize: 1000000, // 엔트리포인트 크기 제한 설정
    },
    context: path.resolve(__dirname, 'src/main/react'),
    entry: { //이름에 대문자 쓰지 말기
        main: './pages/main/Main.js', //여러페이지 설정이 가능함
        user: './User.js',
        signup: './pages/SignUp/SignUp.js',
        noticelist: './pages/Notice/NoticeList.js',
        qnawrite: './pages/Qna/QnaWrite.js',

        qnalist: './pages/Qna/Qnalist.js',
        mypageuser: './pages/MyPage/User/MyPageUser.js',
        mypagegosu: './pages/MyPage/Gosu/MyPageGosu.js',

        meeting: './pages/webrtc/Meeting.js',
        chat: './pages/webrtc/Chat.js'
    },
    devtool: 'sourcemaps',
    cache: true,
    output: { //파일이 생성되는 경로
        path: __dirname,
        filename: './src/main/resources/static/bundle/[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.m?js$/, // .mjs 또는 .js 파일을 처리
                resolve: {
                    fullySpecified: false // 확장자를 명시하지 않아도 되도록 설정(특히 axios나 다른 모듈에서 발생하는 확장자 문제를 피할 수 있다.)
                }
            },
            {
                test: /\.js?$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [ '@babel/preset-env', '@babel/preset-react' ]
                    }
                }
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/, // 이미지 파일에 대한 규칙
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]', // 파일 이름 설정
                            context: 'src/main/react', // 소스 경로 설정
                        },
                    },
                ],
            },
            {
                test: /\.(woff(2)?|ttf|eot)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'webfonts/[name][ext]'  // 웹폰트 폴더로 출력되게
                }
            }
        ]
    },

    plugins: [
        // fix "process is not defined" error:
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
    ],
};