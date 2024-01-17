import{i,S as u}from"./assets/vendor-9310f15c.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const l of e.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function s(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerpolicy&&(e.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?e.credentials="include":t.crossorigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function o(t){if(t.ep)return;t.ep=!0;const e=s(t);fetch(t.href,e)}})();const f=document.querySelector(".form"),c=document.querySelector(".form-input"),p=document.querySelector(".gallery"),a=document.querySelector(".css-loader");a.style.display="none";const m=new URLSearchParams({key:"41748300-cb29be2b9e713bfb06ce55aab",q:"",image_type:"photo",orientation:"horizontal",safesearch:"true"});f.addEventListener("submit",n=>{n.preventDefault(),a.style.display="block",c.value.trim().length!==0&&(m.set("q",c.value.trim()),fetch(`https://pixabay.com/api/?${m}`).then(r=>{if(!r.ok)throw new Error("error");return r.json()}).then(({hits:r})=>{r.length===0&&i.error({position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"});const s=r.reduce((t,e)=>t+`<li class="gallery-item">
                            <a class="gallery-link" href="${e.largeImageURL}">
                                <img 
                                    class="gallery-image" 
                                    data-source=${e.largeImageURL} 
                                    src=${e.webformatURL} 
                                    alt=${e.tags} 
                                />
                            </a>
                            <div class="gallery-item-info">
                                <p class="gallery-item-info-name">Likes
                                    <span class="gallery-item-info-value">${e.likes}
                                </p>
                                <p class="gallery-item-info-name">Views
                                    <span class="gallery-item-info-value">${e.views}</span>
                                </p>
                                <p class="gallery-item-info-name">Comments
                                    <span class="gallery-item-info-value">${e.comments}</span>
                                </p>
                                <p class="gallery-item-info-name">Downloads
                                    <span class="gallery-item-info-value">${e.downloads}</span>
                                </p>
                            </div>
                        </li>`,"");p.innerHTML=s,a.style.display="none";let o=new u(".gallery a",{captionDelay:250,captionsData:"alt"});o.refresh(),o.on("show.simplelightbox",function(){})}).catch(()=>{i.error({position:"topRight",message:"Something is wrong!"})}))});
//# sourceMappingURL=commonHelpers.js.map
