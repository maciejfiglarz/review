import "~/common/common";
import "~/components/guard";
import "~/components/modal";
import "~/components/social";

import "../modules/header";


import bodyService from "~/lib/body";
import body from "../lib/body";

const initGuard = () => {
   const init = document.querySelectorAll('.guardTrigger');
   init.forEach(item => {
      item.addEventListener('click', (e) => {
         e.preventDefault();
         bodyService.initGuard();
      });
   });
}

window.addEventListener('DOMContentLoaded', () => {
   document.querySelector('body').classList.add('_loaded');
   initGuard();
});