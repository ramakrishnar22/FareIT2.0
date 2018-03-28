let award_detail=(function(){
    let modal=document.getElementById("myModal");
    let award_modal_detail={};
    let award_name=[];
     function dataget(){
         return fetch('assets/awards/awards.json').then(response => response.json()); 
     }
     function ProcessData(awardData){
        return new Promise((resolve,reject)=>{
            let awardmodalData=[];
                for(sampleData in awardData){
                    award_name.push(awardData[sampleData].Name);
                    awardmodalData.push({
                        name:awardData[sampleData].Name,
                        url:awardData[sampleData].vdurl,
                        rname:awardData[sampleData].Realname,
                        imgurl:awardData[sampleData].imgurl,
                        soundurl:awardData[sampleData].soundurl,
                        modalurl:awardData[sampleData].modalurl
                    })
                }
                award_modal_detail.data=awardmodalData;
                resolve(awardmodalData);
        })  
     }

      function clearElement(ele){
          while(ele.firstChild)
                ele.removeChild(ele.firstChild);
      } 
     function formatModalDetails(awardobject){
           let modalDataContent=document.getElementsByClassName("modal-detail")[0];
           let modalDataHead=document.getElementsByClassName("modal-head")[0];
           clearElement(modalDataContent);
           clearElement(modalDataHead);
             let vid=document.createElement("video");
             vid.setAttribute("width","auto");
             vid.setAttribute("height","500px");
             vid.setAttribute("id","myvideo");
             vid.setAttribute("controls","");
            vid.addEventListener("click",()=>{
               vid.paused?vid.play():vid.pause();   
            });
            vid.addEventListener("dblclick",()=>{
                if(!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement){
                if(vid.requestFullscreen){
                vid.requestFullscreen();   
                }else if (vid.webkitRequestFullscreen) {
                    vid.webkitRequestFullscreen();
                  }
                  else if(vid.mozRequestFullscreen){
                      vid.mozRequestFullscreen();
                  }
                }
                else{
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                      } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                      } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                      } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                      }
                }
             });
             vid.setAttribute("poster","./assets/img/modal.png");
             vid.setAttribute("type","video/webm")
             let souc=document.createElement("source");
             souc.setAttribute("src",awardobject.url);
             vid.appendChild(souc);
             modalDataContent.appendChild(vid);
             let header=document.createElement("h2");
             header.setAttribute("color","white");
             header.innerText=awardobject.rname;
             modalDataHead.appendChild(header);

     }
       
     function setUpDOMforlist(awardlistdata){
                awardlistdata.forEach(setlisthandler);

     }
     function setlisthandler(singleawarddata){
        let createmodalcontent=document.getElementsByClassName("flex-bo")[0];
        let listcreation=document.createElement("li");
         listcreation.setAttribute("class","award-list");
         let para=document.createElement("p");
         para.innerText=singleawarddata.name;
         let imagedata=document.createElement("img");
         imagedata.setAttribute("src",singleawarddata.imgurl);
         listcreation.appendChild(imagedata);
         listcreation.appendChild(para);
         let sound=new Audio(singleawarddata.soundurl);
         listcreation.addEventListener("mouseover",sound.play.bind(sound));
         listcreation.addEventListener("mouseout",()=>{
             sound.pause();
             sound.currentTime=0;
         })
         awardlinkhandler=createlinkhandlerforawards(singleawarddata);
         listcreation.addEventListener('click',awardlinkhandler);
         createmodalcontent.appendChild(listcreation);
     }
     function createlinkhandlerforawards(singleawarddata){
           return function(event){
               formatModalDetails(singleawarddata);
            let modalWholeData=document.getElementById("myModal");
            modalWholeData.style.backgroundImage='url('+ singleawarddata.modalurl +')';
            modalWholeData.style.backgroundSize='100%';
            modalWholeData.style.backgroundPosition="fixed";
            modalWholeData.style.display="block";
           }
     }
    function init(){
          dataget().then(ProcessData).then(setUpDOMforlist);
    }
    init();
          return{
              init
          }
})();
