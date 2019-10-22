const init = (config) => {
    if (!config.appId) {
        console.warn("no app id");
    }
    const vm = new Vue({
        data() {
            return {
                ready: false,
                visible: false,
                unreadCount: 0
            };
        }
    });

    const intercom = { _vm: vm };

    Object.defineProperties(
        intercom,
        mapInstanceToProps(vm, ["ready", "visible", "unreadCount"])
    );
    window._support["account"] = config.appId;
    window._support["ui"] = {};
    window._support["ui"]["contactMode"] = "traditional";
    window._support["ui"]["enableKb"] = "true";
    window._support["ui"]["styles"] = {
        widgetColor: config.color
    };
    window._support["ui"]["widget"] = {
        img: config.img,
        size: config.size,
        label: false,
        position: config.position
    };
    window._support["apps"] = {
        faq: { enabled: true },
        recentConversations: {},
        orders: {}
    };
};
let installed = false;
let Vue;
init.install = function install(_Vue, config) {
    assert(!Vue, "already installed.");
    Vue = _Vue;
    Vue.mixin({
        mounted() {
            callIf(!installed, () => {
                const loaded = () => init.loadScript(() => {
                    setTimeout(() => {
                        init(config);
                        window.Reamaze.reload();
                        Object.defineProperty(Vue.prototype, "$reamaze", {
                            get: () => window.Reamaze
                        });
                    }, 100);
                });
                if (document.readyState === "complete") {
                    loaded();
                } else if (window.attachEvent) {
                    window.attachEvent("onload", loaded);
                } else {
                    window.addEventListener("load", loaded, false);
                }
                installed = true;
            });
        }
    });
};
init.loadScript = function loadScript(done) {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://cdn.reamaze.com/assets/reamaze.js";
    const firstScript = document.getElementsByTagName("script")[0];
    firstScript.parentNode.insertBefore(script, firstScript);
    script.onload = done;
};
const callIf = (a, f) => a && f();
const assert = (condition, msg) =>
    callIf(!condition, () => {
        throw new Error(`[vue-reamaze] ${msg}`);
    });
const mapInstanceToProps = (vm, props) => {
    const o = {};
    props.forEach(p => (o[p] = { get: () => vm[p] }));
    return o;
};
export default init;
