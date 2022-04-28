/**
 * 自定义代码高亮插件
 */
import hljs from "highlight.js";
import "highlight.js/styles/vs.css";

const install = function (Vue) {
  Vue.directive("highlight", {
    deep: true,
    bind(el, binding) {
      // on first bind, highlight all targets
      let targets = el.querySelectorAll("code");

      targets.forEach((target) => {
        if (typeof binding.value === "string") {
          // if a value is directly assigned to the directive, use this
          // instead of the element content.
          target.textContent = binding.value;
        }
        hljs.highlightBlock(target);
      });
    },
    componentUpdated(el, binding) {
      // after an update, re-fill the content and then highlight
      let targets = el.querySelectorAll("code");

      targets.forEach((target) => {
        if (typeof binding.value === "string") {
          // if a value is directly assigned to the directive, use this
          // instead of the element content.
          target.textContent = binding.value;
          hljs.highlightBlock(target);
        }
      });
    },
  });
};

export default install;
