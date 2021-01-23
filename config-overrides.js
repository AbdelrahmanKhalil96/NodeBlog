module.exports = function override(config, env) {
    //do stuff with the webpack config...
    // config.output.path = path.resolve(__dirname, './server/static/react');

    return config;
}
/*
const resolveModule = (resolveFn, filePath) => {
 module.exports = {
   dotenv: resolveApp('.env'),
   appPath: resolveApp('.'),
  appBuild: resolveApp('build'),
  appBuild: resolveApp('dist'),
   appPublic: resolveApp('public'),
   appHtml: resolveApp('public/index.html'),
   appIndexJs: resolveModule(resolveApp, 'src/index'),
const resolveOwn = relativePath => path.resolve(__dirname, '..', relativePath);
 module.exports = {
   dotenv: resolveApp('.env'),
   appPath: resolveApp('.'),
  appBuild: resolveApp('build'),
  appBuild: resolveApp('dist'),
   appPublic: resolveApp('public'),
   appHtml: resolveApp('public/index.html'),
   appIndexJs: resolveModule(resolveApp, 'src/index'),
   module.exports = {
     dotenv: resolveOwn('template/.env'),
     appPath: resolveApp('.'),
-    appBuild: resolveOwn('../../build'),
+    appBuild: resolveOwn('../../dist'),
     appPublic: resolveOwn('template/public'),
     appHtml: resolveOwn('template/public/index.html'),
     appIndexJs: resolveModule(resolveOwn, 'template/src/index'),*/