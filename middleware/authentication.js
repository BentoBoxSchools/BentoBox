export default function (context) {
	console.log(context.req.isAuthenticated());
	if (context.req.isAuthenticated()) {
		context.store.commit('SET_USER', context.req.user);
	}
}
