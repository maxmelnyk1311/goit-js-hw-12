import{S as v,i as c,a as w}from"./assets/vendor-c145bea9.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const y of s.addedNodes)y.tagName==="LINK"&&y.rel==="modulepreload"&&o(y)}).observe(document,{childList:!0,subtree:!0});function l(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerpolicy&&(s.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?s.credentials="include":e.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(e){if(e.ep)return;e.ep=!0;const s=l(e);fetch(e.href,s)}})();const L=document.querySelector(".form"),d=document.querySelector(".form-input"),m=document.querySelector(".gallery"),a=document.querySelector(".load-more-btn"),n=document.querySelector(".loading-text");let f;a.style.display="none";n.style.display="none";let p=new v(".gallery a",{captionDelay:250,captionsData:"alt"}),i=1;const g=40;let u=!1;async function h(){const r=new URLSearchParams({key:"41748300-cb29be2b9e713bfb06ce55aab",q:"",image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:g,page:i});r.set("q",d.value.trim()),f=d.value.trim();const t=await w.get(`https://pixabay.com/api/?${r}`);let l=t.data.totalHits;return l===0?[]:(i*g>l&&(u=!0,c.error({position:"topRight",color:"red",message:"We're sorry, but you've reached the end of search results."})),t.data.hits)}function b(r){const t=r.reduce((l,o)=>l+`<li class="gallery-item">
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
            </li>`,"");m.insertAdjacentHTML("beforeend",t),p.refresh(),p.on("show.simplelightbox",function(){})}L.addEventListener("submit",async r=>{if(r.preventDefault(),u=!1,d.value.trim().length!==0&&f!==d.value.trim()){m.innerHTML="",i=1,n.style.display="block";try{const t=await h();b(t)}catch(t){c.error({position:"topRight",color:"red",message:"Something is wrong!!!"}),console.log(t)}n.style.display="none",m.childNodes.length>0?(i+=1,a.style.display="block"):(a.style.display="none",c.error({position:"topRight",color:"red",message:"Images not found!"}))}});a.addEventListener("click",async r=>{r.preventDefault(),a.style.display="none",n.style.display="block";try{const l=await h();b(l),i+=1}catch(l){c.error({position:"topRight",color:"red",message:"Something is wrong!!!"}),console.log(l)}n.style.display="none",u?a.style.display="none":a.style.display="block";const t=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({top:t*2,behavior:"smooth"})});
//# sourceMappingURL=commonHelpers.js.map
