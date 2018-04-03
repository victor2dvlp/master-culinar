import {animate, state, style, transition, trigger} from "@angular/animations";

export const fadeAnimation = trigger('shadow', [
  state('normal', style({
    opacity: 1
  })),
  transition('void=>*', [
    style({
      opacity: 0
    }),
    animate(1000)
  ]),
  transition('*=>void', [
    style({
      opacity: 1
    }),
    animate(500)

  ])
])
