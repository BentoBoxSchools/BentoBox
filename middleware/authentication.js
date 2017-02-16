export default function (context) {
  if (context.req.isAuthenticated()) {
    context.store.commit('SET_USER', context.req.user);
  }
}
