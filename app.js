(function(){
    var htmltemplate = ``;

    
     $('p').css({'color':'red'});
    
     var dbPromise = idb.open('favorite',2,function(upgradeDb){
             var keyValStore = upgradeDb.createObjectStore('keyVal');
             keyValStore.put('me','Hiello');
         })
     
     
     dbPromise.then(function(db){
         var tx = db.transaction('keyVal');
         var keyValStore = tx.objectStore('keyVal');
         return keyValStore.get('foo');
     }).then(function(val){
         console.log('The value of "foo" is:',val);
     })
//     })
     
     dbPromise.then(function(db){
         var tx = db.transaction('keyVal','readwrite');
         var keyValStore = tx.objectStore('keyVal');
         keyValStore.put('cain','Abel');
         return tx.complete;
     }).then(function(){
         console.log('Added foo:bar to keyVal')
     })
     
    var respCon = document.getElementById('response-container');
    if(navigator.serviceWorker){
    navigator.serviceWorker.register('sw.js').then(function(event){
        console.log('Service Workers',event);
    });
}
var News = {};
var searchkey='nigeria';
    fetch(`https://newsapi.org/v2/everything?q=${searchkey}`,{
            headers:{
                   Authorization: 'Client-ID 906c2a1b168d46679284b8d297046275' 
            }
        }).then(function(response){
        return response.json();
        }).then(function(news){
            News = news.articles;
            console.log('News',News);
            htmltemplate =  '<ul>'+ News.map(article => `<li class='article'>
                <h2><a href='${article.url}'>${article.description}</a></h2>
                <p>${article.author}</p>
                </li>`).join('') + '</ul>';
            respCon.insertAdjacentHTML('afterbegin',htmltemplate);
           $(function(){
         $('p').each(function(){
             $(this).after('<input type="checkbox" class="favorite" /><i class="fa fa-heart"></i>');
         })
     })
        });


var supportedCountries = [
    {name:'USA',abbr:'US'},
    {name:'Argentina',abbr:'AR'},
    {name:'Austria',abbr:'AT'},
    {name:'Australia',abbr:'AU'},
    {name:'Belgium',abbr:'BE'},
    {name:'Bulgaria',abbr:'BG'},
    {name:'Brazil',abbr:'BR'},
    {name:'Canada',abbr:'CA'},
    {name:'China',abbr:'CN'},
    {name:'	Serbia',abbr:'RS'},
    {name:'Czech R',abbr:'CZ'}
];

var supportedCategories = [
    {name:'General',abbr:'general'},
    {name:'Health',abbr:'health'},
    {name:'Science',abbr:'science'},
    {name:'Sports',abbr:'sports'},
    {name:'technology',abbr:'technology'}
];
var specificSources = [];
var searchBtn = $('#submit-btn');
        $(function(){
            var source = $('#search-keyword');
            var specifiSourcesInput = $('#search-keyword1');
            console.log(source.val());
            source.on('change',function(){
                console.log(source.val());
                if(source.val() === 'country'){
                    supportedCountries.forEach(value=>{
                    specificSources.push('<option value="'+ value.abbr + '">'+value.name +'</option>');
                    });
                    specifiSourcesInput.html(specificSources.join(''));
                    console.log(specificSources);
                }else{
                    specificSources = [];
                    supportedCategories.forEach(value=>{
                        specificSources.push('<option value="'+ value.abbr + '">'+value.name +'</option>');
                    });

                      specifiSourcesInput.html(specificSources.join(''));   
                     }
            });

            searchBtn.on('click',function(e){
                e.preventDefault();
                searchkey = specifiSourcesInput.val();

                fetch(`https://newsapi.org/v2/everything?q=${searchkey}`,{
            headers:{
                   Authorization: 'Client-ID 906c2a1b168d46679284b8d297046275' 
            }
        }).then(function(response){
        return response.json();
        }).then(function(news){
            console.log('News',news);
            htmltemplate =  '<ul>'+ news.articles.map(article => `<li class='article'>
                <h2><a href='${article.url}'>${article.description}</a></h2>
                <p>${article.author}</p>
                </li>`).join('') + '</ul>';
            respCon.insertAdjacentHTML('afterbegin',htmltemplate);
        });
            });
            
            
        });  

})();