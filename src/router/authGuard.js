import store from '../store'

const authGuard = (to, form, next) => {
    if (store.store.getters.getLogedUser) {
        next()
    } else {
        next('/login')
    }
}

export default authGuard;