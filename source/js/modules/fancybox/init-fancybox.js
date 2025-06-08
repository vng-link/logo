import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

function initFancybox() {
  Fancybox.bind("[data-fancybox]", {});
}

export {initFancybox};
