module.exports = function(app) {
    app.cache(true);

    const presets = [
        [
            '@babel/preset-env',
            {
                targets: {
                    browsers: ['last 2 versions']
                },
                modules: false
            }
        ]
    ];

    return {
        presets
    };
};
