import Vue from "_vue@2.6.14@vue";

class NueRouteInfo {
    constructor(){
        this.currentPath = null;
    }
}

class NueRouter {
    constructor(options){
        this.mode = options.mode || 'hash';
        this.routes = options.routes || [];
        // 提取路由信息
        /*
        {
            '/home': Home,
            '/about': About
        }
        * */
        this.routesMap = this.createRoutesMap();
        this.routeInfo = new NueRouteInfo();
        console.log(this.routesMap);
        this.initDefault();
    }
    createRoutesMap(){
        return  this.routes.reduce((map, route)=>{
            map[route.path] = route.component;
            return map;
        }, {})
    }
    initDefault(){
        if(this.mode === "hash") {
            if(!location.hash) {
                location.hash = '/';
            }

            window.addEventListener("load", () => {
                this.routeInfo.currentPath = location.hash.slice(1);
            })

            window.addEventListener("hashchange", () => {
                console.log(location.hash.slice(1))
                this.routeInfo.currentPath = location.hash.slice(1);
                console.log(this.routeInfo);
            })
        } else {
            if(!location.pathname) {
                location.pathname = '/';
            }
            window.addEventListener("load", () => {
                this.routeInfo.currentPath = location.pathname;
            })

            window.addEventListener("popstate", () => {
                this.routeInfo.currentPath = location.pathname;
                console.log(this.routeInfo);
            })
        }
    }
}
NueRouter.install = (Vue, options)=>{
    Vue.mixin({
        beforeCreate(){
            if(this.$options && this.$options.router) {
                this.$router = this.$options.router;
                this.$route = this.$router.routeInfo;
                Vue.util.defineReactive(this, 'xxx', this.$router);
            } else {
                this.$router = this.$parent.$router;
                this.$route = this.$router.routeInfo;
            }
        }
    });

    Vue.component('router-link', {
        props: {
            to: String
        },
        render() {
            let path = this.to;
            if(this._self.$router.mode === "hash") {
                path = '#' + path;
            }
            return <a href={path}>{ this.$slots.default }</a>
        }
    });

    Vue.component('router-view', {
        render(h){
            let routesMap = this._self.$router.routesMap;
            let currentPath = this._self.$route.currentPath;
            let currentComponent = routesMap[currentPath];
            return h(currentComponent);
        }
    })

}
export default NueRouter;