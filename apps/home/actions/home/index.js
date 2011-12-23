module.exports = {
    name:'home',
    get_route:function () {
        return '/'
    },

    do_render:function (env, on_render) {
        var action = this;
        this.context.render(this._view_path, function (err, content) {
            env._render_params = {
                header: 'welcome to Arena Colles',
                content: 'This is the Arena Colles home page',
                footer: '&copy;2011,2012 all rights reserved Wonderland Labs'
            }
            action.post_render(err, content, env, on_render);
        }, env, action);
    }
}