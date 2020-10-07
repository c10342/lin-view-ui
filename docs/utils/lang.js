
export const  langType = {
    en:'en-US',
    zh:'zh-CN'
}
export function getLang(){
    const lang = window.sessionStorage.getItem('lang') || langType.zh
    return lang
}

export function setLang(lang){
    window.sessionStorage.setItem('lang',lang)
}

