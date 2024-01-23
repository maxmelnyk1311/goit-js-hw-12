import{S as L,i as l,a as w}from"./assets/vendor-c145bea9.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();const S=document.querySelector(".form"),i=document.querySelector(".form-input"),d=document.querySelector(".gallery"),u=document.querySelector(".load-more-btn"),f=document.querySelector(".loading-text");let p,m=new L(".gallery a",{captionDelay:250,captionsData:"alt"}),a=1;const g=40;function R(){u.style.display="block"}function q(){u.style.display="none"}function y(){f.style.display="block"}function h(){f.style.display="none"}async function b(){const n=new URLSearchParams({key:"41748300-cb29be2b9e713bfb06ce55aab",q:"",image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:g,page:a});n.set("q",i.value.trim()),p=i.value.trim();const t=await w.get(`https://pixabay.com/api/?${n}`);let s=t.data.totalHits;return s===0?[]:(a*g>=s?l.error({position:"topRight",color:"red",message:"We're sorry, but you've reached the end of search results."}):R(),t.data.hits)}function v(n){const t=n.reduce((s,o)=>s+`<li class="gallery-item">
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
            </li>`,"");d.insertAdjacentHTML("beforeend",t),m.refresh(),m.on("show.simplelightbox",function(){})}S.addEventListener("submit",async n=>{if(n.preventDefault(),i.value.trim().length!==0&&p!==i.value.trim()){d.innerHTML="",a=1,y();try{const t=await b();v(t)}catch(t){l.error({position:"topRight",color:"red",message:"Something is wrong!!!"}),console.log(t)}h(),d.childNodes.length===0?l.error({position:"topRight",color:"red",message:"Images not found!"}):a+=1}});u.addEventListener("click",async n=>{n.preventDefault(),q(),y();try{const s=await b();v(s),a+=1}catch(s){l.error({position:"topRight",color:"red",message:"Something is wrong!!!"}),console.log(s)}h();const t=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({top:t*2,behavior:"smooth"})});
//# sourceMappingURL=commonHelpers.js.map
