class Bind {
    constructor(model, view, ...props) {
        /*...props -> rest operator(...)*/
        let proxy = ProxyFactory.create(model, props, model => view.update(model));
        view.update(model);
        return proxy;
    }
}