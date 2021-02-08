const reducer = (state, action) => {
    switch (action.type) {
        case "SET_ROOM":
            return {
                ...state, hasRoom: action.payload
            }
            case "SET_MODAL":
                return {
                    ...state, toggleModal: action.payload
                }
                case "SET_EVENT":
                    return {
                        ...state, eventID: action.payload
                    }
                case "HAS_ROOM":
                    return {
                        ...state, eventHasRoom: action.payload
                    }
                case "EDIT_REQUEST": 
                    return {
                       ...state, editRequest: action.payload
                }        
                    default:
                        return state
    }
}

export default reducer;