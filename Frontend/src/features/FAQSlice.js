import { createSlice } from "@reduxjs/toolkit";

const initialState={
    showFAQ:false,
    isFaqSubmitted:false,
}

export const FAQSlice=createSlice({
    name:'FAQSlice',
    initialState,
    reducers:{
        setShowFAQ:(state,action)=>{
            state.showFAQ=action.payload;
        },
        showFAQAddedPrompt:(state)=>{
            state.showFAQ=false;
            state.isFaqSubmitted=true;
        },
        cancelFAQSubmittedPrompt:(state)=>{
            state.isFaqSubmitted=false;
        }
    }
})

export const {setShowFAQ, setIsFaqSubmitted, showFAQAddedPrompt, cancelFAQSubmittedPrompt}=FAQSlice.actions;
export default FAQSlice.reducer;