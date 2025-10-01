import { configure } from "mobx"

configure({
  useProxies: "always",
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
  observableRequiresReaction: true,
})
