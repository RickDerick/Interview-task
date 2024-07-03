import routes from "./homeRoutes";
export default {
    install: (app, options) => {
        if(options.router){
            options.router.addRoute(routes);
        }
    }
};