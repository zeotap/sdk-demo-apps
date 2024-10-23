export const UPDATE_CONFIGS="UPDATE_CONFIGS"
export const GET_CONFIGS="GET_CONFIGS"
export const GET_PREFERENCE = "GET_PREFERENCE"
export const UPDATE_PREFERENCE = "UPDATE_PREFERENCE"

export const getConfigs = ()=>({
    type: GET_CONFIGS
});

export const updateConfigs = (configs)=>({
    type: UPDATE_CONFIGS,
    payload: configs
});

export const getPreference = ()=>({
    type: GET_PREFERENCE
});

export const updatePreference = (preference)=>({
    type: UPDATE_PREFERENCE,
    payload: preference
});