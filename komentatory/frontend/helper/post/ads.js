export const ads = () => {
    const description = document.querySelector('.single-description');
    if(description){
       let paragraph = description.querySelectorAll('p');
       const paragraphLength = paragraph.length;

     //   if(paragraphLength > 2){
     //    let div = document.createElement("div");
     //    div.innerHTML = `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
     //    <ins class="adsbygoogle"
     //         style="display:block"
     //         data-ad-client="ca-pub-5159051873786027"
     //         data-ad-slot="8897542891"
     //         data-ad-format="auto"
     //         data-full-width-responsive="true"></ins>
     //    <script>
     //         (adsbygoogle = window.adsbygoogle || []).push({});
     //    </script>`;
     //    paragraph[1].appendChild(div);
     //   }
     //   if(paragraphLength >= 6){
     //    let div = document.createElement("div");
     //    div.innerHTML = `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
     //    <ins class="adsbygoogle"
     //         style="display:block"
     //         data-ad-client="ca-pub-5159051873786027"
     //         data-ad-slot="8897542891"
     //         data-ad-format="auto"
     //         data-full-width-responsive="true"></ins>
     //    <script>
     //         (adsbygoogle = window.adsbygoogle || []).push({});
     //    </script>`;
     //    paragraph[5].appendChild(div);
     //   }
    }
};
