module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://8080',
                ws: true,
                changeOrigin: true,
            },
        }
    },
}