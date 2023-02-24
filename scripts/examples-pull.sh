## subtree文档请看这里
## @see https://segmentfault.com/a/1190000012002151
## cd $(pwd)/example/
cd $(pwd);

git subtree add --prefix=example/master-spa-project https://github.com/gaea0571/master-spa-project-template.git master
git subtree pull --prefix=example/master-spa-project https://github.com/gaea0571/master-spa-project-template.git master

git subtree add --prefix=example/slave-spa-project https://github.com/gaea0571/slave-spa-project-template.git master
git subtree pull --prefix=example/slave-spa-project https://github.com/gaea0571/slave-spa-project-template.git master