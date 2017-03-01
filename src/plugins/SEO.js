/**
 * @file vue plugin
 * @author windwithfo(windwithfo@yeah.net)
 */

let SeoPlugin = {};

SeoPlugin.install = function (Vue) {
    // 初始化SEO
    const initSEO = {
        title: 'emiya title',
        keywords: 'emiya keywords',
        description: 'emiya description'
    };

    /**
     * 初始化页面seo信息
     * @param {Object} info              seo
     * @param {String=} info.title       title
     * @param {String=} info.keywords    keywords
     * @param {String=} info.description description
     * @example  this.$SEO({title:'xxx'})
     * @return {null} null
     */
    Vue.prototype.$setSEO = (info = initSEO) => {
        info.title = info.title || initSEO.title;
        info.keywords = info.keywords || initSEO.keywords;
        info.description = info.description || initSEO.description;
        document.querySelector('title').textContent = info.title;
        document.querySelector('meta[name=\'keywords\']').setAttribute('content', info.keywords);
        document.querySelector('meta[name=\'description\']').setAttribute('content', info.description);
        let ua = window.navigator.userAgent.toLowerCase();
        let str = ua.match(/MicroMessenger/i);
        if (str && str.indexOf('micromessenger') > -1) {
            let hnode = document.createElement('iframe');
            hnode.src = '/favicon.ico';
            hnode.id = 'iframe';
            hnode.style.display = 'none';
            hnode.onload = () => {
                setTimeout(() => {
                    hnode.remove();
                }, 0);
            };
            document.body.appendChild(hnode);
        }
    };
};

export default {
    ...SeoPlugin
};
