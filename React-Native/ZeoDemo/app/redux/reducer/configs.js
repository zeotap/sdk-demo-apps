import { UPDATE_CONFIGS, UPDATE_PREFERENCE } from "../configsAction"; //action

const intiialState = {
    configs: {}, // multiple
    preference: {}
}


export default function (state = intiialState, action) {
    const { type, payload } = action
    switch (type) {
        case UPDATE_CONFIGS:
            return {
                ...state,
                configs: { ...state.configs, ...payload }
            }
        case UPDATE_PREFERENCE:
            return {
                ...state,
                preference: { ...state.preference, ...payload }
            }

        default:
            return state
    }

}