module.exports = function override(config) {
    config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false, // Since you no longer use `dotenv`
        os: require.resolve('os-browserify/browser'),
        path: require.resolve('path-browserify')
    };
    return config;
};
