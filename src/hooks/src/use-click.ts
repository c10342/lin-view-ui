import { onMounted, onUnmounted, Ref } from "vue";

type CallbackFn = (event:Event)=>void

export default function useClick(targetRef:Ref<HTMLElement|null>,callback:CallbackFn){
    function onDocumentClick(event:Event){
        const clickTarget = event.target as HTMLElement
        if(!targetRef.value?.contains(clickTarget)){
            callback(event)
        }
    }
    onMounted(()=>{
        document.addEventListener('click',onDocumentClick)
    })
    onUnmounted(()=>{
        document.removeEventListener('click',onDocumentClick)
    })
}