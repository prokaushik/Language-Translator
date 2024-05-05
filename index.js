const fromText = document.querySelector(".from-text")
const toText = document.querySelector(".to-text")
const exchangeIcon = document.querySelector(".exchange")
const SelectTags = document.querySelectorAll("select")
const icons = document.querySelectorAll(".row i");
const translatebtn = document.querySelector(".button1 button");

SelectTags.forEach((tag, id) => {
    for(let country_code in countries){
        let selected = id === 0 ? (country_code === "en-GB" ? "selected" : "") : (country_code === "hi-IN" ? "selected" : "");
        let option = `<option ${selected}
        value = "${country_code}"> ${countries[country_code]}</option>`
        tag.insertAdjacentHTML("beforeend", option)
    }
})
exchangeIcon.addEventListener("click", ()=>{
    let tempTxt = fromText.value;
    fromText.value= toText.value;
    toText.value=tempTxt;
    let tempLang = SelectTags[0].value;
    SelectTags[0].value = SelectTags[1].value;
    SelectTags[1].value = tempLang ;
})
fromText.addEventListener("keyup",()=>{
    if(!fromText.value){
        toText.value="";
    }
})
translatebtn.addEventListener("click", ()=>{
    
    let text = fromText.value.trim(),
    translateFrom = SelectTags[0].value,
    translateTo = SelectTags[1].value;
    if(!text) return;
    toText.setAttribute("Placeholder", "Translating...");
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            toText.value = data.responseData.translatedText;
            data.matches.forEach(data=>{
                if(data.id ===0 ){
                    toText.value=data.translation;
                }
            })
            toText.setAttribute("placeholder", "Translation");
        })
})
icons.forEach(icon=>{
    icon.addEventListener("click", ({target})=>{
        if(!fromText.value||!toText.value)return
        if(target.classList.contains("fa-copy")){
            if(target.id=="from"){
                navigator.clipboard.writeText(fromText.value)
            }
            else{
                navigator.clipboard.writeText(toText.value)
            }
        }
    })
})