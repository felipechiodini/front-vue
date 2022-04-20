import Loading from "@/components/Loading";
import Logo from "@/components/Logo";
import Error from "@/components/Error";

export default {
    install(Vue) {
        Vue.component(Loading.name, Loading);
        Vue.component(Logo.name, Logo);
        Vue.component(Error.name, Error);
    }
};