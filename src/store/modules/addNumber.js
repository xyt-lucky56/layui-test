
const addNumber = {
    state: {
        name: '盼盼'
    },
    getters: {},
    mutations: {
        changeName(state, data) {
            state.name = data
            console.log('vuex接受数据', state, data)
        }
    },
    actions: {}
}

export default addNumber