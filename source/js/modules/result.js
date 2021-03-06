import SeaCalfScene from './sea-calf-scene.js';
import CrocodileScene from './crocodile-scene.js';

export default () => {
  let showResultEls = document.querySelectorAll(`.js-show-result`);
  let results = document.querySelectorAll(`.screen--result`);
  let resultImages = document.querySelectorAll(`.result__image picture`);
  if (results.length) {
    for (let i = 0; i < showResultEls.length; i++) {
      showResultEls[i].addEventListener(`click`, function () {
        let target = showResultEls[i].getAttribute(`data-target`);
        [].slice.call(results).forEach(function (el) {
          el.classList.remove(`screen--show`);
          el.classList.add(`screen--hidden`);
        });
        let targetEl = [].slice.call(results).filter(function (el) {
          return el.getAttribute(`id`) === target;
        });
        targetEl[0].classList.add(`screen--show`);
        targetEl[0].classList.remove(`screen--hidden`);

        switch (i) {
          case 0:
            /* eslint-disable */
            const calf = new SeaCalfScene();
            /* eslint-enable */

            resultImages[i].classList.add(`visually-hidden`);
            break;

          case 2:
            /* eslint-disable */
            const resultScene = new CrocodileScene(); 
            /* eslint-enable */

            resultImages[i].classList.add(`visually-hidden`);
            break;
        }

        const resultPaths = document.querySelectorAll(`.screen--show .result path`);
        resultPaths.forEach((path) => {
          path.dispatchEvent(new Event(`strokeAnimationStart`));
        });
      });
    }

    let playBtn = document.querySelector(`.js-play`);
    if (playBtn) {
      playBtn.addEventListener(`click`, function () {
        [].slice.call(results).forEach(function (el) {
          el.classList.remove(`screen--show`);
          el.classList.add(`screen--hidden`);
        });
        document.getElementById(`messages`).innerHTML = ``;
        document.getElementById(`message-field`).focus();
      });
    }
  }

  const pathArr = document.querySelectorAll(`.result__title path`);
  let delay = 0;

  pathArr.forEach((path) => {

    const pathLength = path.getTotalLength();
    const animation = document.createElementNS(`http://www.w3.org/2000/svg`, `animate`);

    if (path.parentElement.parentElement.classList.contains(`fail`)) {

      path.setAttribute(`stroke-dasharray`, `0 ` + pathLength / 2);
      animation.setAttribute(`dur`, `0.5s`);
      animation.setAttribute(`attributeName`, `stroke-dasharray`);
      animation.setAttribute(`from`, `0 ` + pathLength / 2);
      animation.setAttribute(`to`, pathLength / 2 + ` 0`);
      // animation.setAttribute(`keySplines`, `0.2, 0, 0.8, 1`);
      animation.setAttribute(`fill`, `freeze`);
      animation.setAttribute(`begin`, `strokeAnimationStart  + ${ delay}s`);
      delay += 0.08;
    } else {
      path.setAttribute(`stroke-dasharray`, `0 ` + pathLength / 2);
      animation.setAttribute(`dur`, `0.5s`);
      animation.setAttribute(`attributeName`, `stroke-dasharray`);
      animation.setAttribute(`from`, `0 ` + pathLength / 2);
      animation.setAttribute(`to`, pathLength / 2 + ` 0`);
      animation.setAttribute(`keySplines`, `0.2, 0, 0.8, 1`);
      animation.setAttribute(`fill`, `freeze`);
      animation.setAttribute(`begin`, `strokeAnimationStart`);
    }





    path.appendChild(animation);
  });
};
