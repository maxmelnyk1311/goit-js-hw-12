import{S,i as l,a as I}from"./assets/vendor-c145bea9.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const d of r.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&o(d)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();const R=document.querySelector(".form"),i=document.querySelector(".form-input"),u=document.querySelector(".gallery"),m=document.querySelector(".load-more-btn"),p=document.querySelector(".loading-text");let y,f=new S(".gallery a",{captionDelay:250,captionsData:"alt"}),a=1;const g=40;let c=!1;async function h(){const n=new URLSearchParams({key:"41748300-cb29be2b9e713bfb06ce55aab",q:"",image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:g,page:a});n.set("q",i.value.trim()),y=i.value.trim();const t=await I.get(`https://pixabay.com/api/?${n}`);let s=t.data.totalHits;return s===0?[]:(a*g>=s&&(c=!0,l.error({position:"topRight",color:"red",message:"We're sorry, but you've reached the end of search results."})),t.data.hits)}function b(n){const t=n.reduce((s,o)=>s+`<li class="gallery-item">
                <a class="gallery-link" href="${o.largeImageURL}">
                    <img 
                        class="gallery-image" 
                        data-source=${o.largeImageURL} 
                        src=${o.webformatURL} 
                        alt=${o.tags} 
                    />
                </a>
                <div class="gallery-item-info">
                    <p class="gallery-item-info-name">Likes
                        <span class="gallery-item-info-value">${o.likes}
                    </p>
                    <p class="gallery-item-info-name">Views
                        <span class="gallery-item-info-value">${o.views}</span>
                    </p>
                    <p class="gallery-item-info-name">Comments
                        <span class="gallery-item-info-value">${o.comments}</span>
                    </p>
                    <p class="gallery-item-info-name">Downloads
                        <span class="gallery-item-info-value">${o.downloads}</span>
                    </p>
                </div>
            </li>`,"");u.insertAdjacentHTML("beforeend",t),f.refresh(),f.on("show.simplelightbox",function(){})}function v(){m.style.display="block"}function q(){m.style.display="none"}function L(){p.style.display="block"}function w(){p.style.display="none"}R.addEventListener("submit",async n=>{if(n.preventDefault(),c=!1,i.value.trim().length!==0&&y!==i.value.trim()){u.innerHTML="",a=1,L();try{const t=await h();b(t)}catch(t){l.error({position:"topRight",color:"red",message:"Something is wrong!!!"}),console.log(t)}if(w(),u.childNodes.length===0)l.error({position:"topRight",color:"red",message:"Images not found!"});else{if(c)return;a+=1,v()}}});m.addEventListener("click",async n=>{n.preventDefault(),q(),L();try{const s=await h();b(s),a+=1}catch(s){l.error({position:"topRight",color:"red",message:"Something is wrong!!!"}),console.log(s)}w(),c||v();const t=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({top:t*2,behavior:"smooth"})});
//# sourceMappingURL=commonHelpers.js.map
