import { Animation, NavOptions, createAnimation } from '@ionic/core';

export const myTransitionAnimation = (
  _: HTMLElement,
  opts: TransitionOptions
): Animation => {
  const TRANSLATE_DIRECTION = 'translateX';
  const OFF_BOTTOM = '100%';
  const CENTER = '0px';
  const enteringEl = opts.enteringEl;
  const leavingEl = opts.leavingEl;
  // tslint:disable-next-line: no-use-before-declare
  const ionPageElement = getIonPageElement(enteringEl);
  const rootTransition = createAnimation();

  rootTransition
    .addElement(ionPageElement)
    .fill('both')
    .beforeRemoveClass('ion-page-invisible');

  const backDirection = opts.direction === 'back';

  // animate the component itself
  if (backDirection) {
    rootTransition
      .duration(opts.duration || 100)
      .easing('cubic-bezier(0.3,0,0.66,1)');
  } else {
    rootTransition
      .duration(opts.duration || 100)
      .easing('cubic-bezier(0.3,0,0.66,1)')
      .fromTo('transform', `translateX(${OFF_BOTTOM})`, `translateX(${CENTER})`)
      .fromTo('opacity', 1, 1);
  }

  // Animate toolbar if it's there
  const enteringToolbarEle = ionPageElement.querySelector('ion-toolbar');
  if (enteringToolbarEle) {
    const enteringToolBar = createAnimation();
    enteringToolBar.addElement(enteringToolbarEle);
    rootTransition.addAnimation(enteringToolBar);
  }

  // setup leaving view
  if (leavingEl && backDirection) {
    // leaving content
    rootTransition
      .duration(opts.duration || 100)
      .easing('cubic-bezier(0.3,0,0.66,1)');

    const leavingPage = createAnimation();
    leavingPage
      // tslint:disable-next-line: no-use-before-declare
      .addElement(getIonPageElement(leavingEl))
      .afterStyles({ display: 'none' })
      .fromTo('transform', `translateX(${CENTER})`, `translateX(${OFF_BOTTOM})`)
      .fromTo('opacity', 1, 1);

    rootTransition.addAnimation(leavingPage);
  }

  return rootTransition;
};

export interface TransitionOptions extends NavOptions {
  progressCallback?: (ani: Animation | undefined) => void;
  baseEl: any;
  enteringEl: HTMLElement;
  leavingEl: HTMLElement | undefined;
}

export const getIonPageElement = (element: HTMLElement) => {
  if (element.classList.contains('ion-page')) {
    return element;
  }

  const ionPage = element.querySelector(
    ':scope > .ion-page, :scope > ion-nav, :scope > ion-tabs'
  );
  if (ionPage) {
    return ionPage;
  }
  // idk, return the original element so at least something animates and we don't have a null pointer
  return element;
};
