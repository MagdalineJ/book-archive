const displayCtrl=(id, style)=>{
  document.getElementById(id).style.display=style;
}
displayCtrl('error','none')
displayCtrl('footer','none')
displayCtrl('spinner','none')

// document.getElementById('error').style.display="none";
// document.getElementById('footer').style.display="none";
// document.getElementById('spinner').style.display="none";
// fetching the data from open library
const searchBooks =()=>{
     document.getElementById('spinner').style.display="block";
     const searchText= document.getElementById('inputField').value;
     document.getElementById('inputField').value='';
   
     if(searchText !== ''){
      document.getElementById('inputField').value='';
     const url = `https://openlibrary.org/search.json?q=${searchText}`;
     
     fetch(url)
     .then(res=>res.json())
     .then(data=>allData(data))
     .catch(data=>errorMsg(data))


}else{

  // document.getElementById('dashboard').style.display='none';
  // document.getElementById('footer').style.display='none';

  errorMsg();
  displayCtrl('dashboard','none')
  displayCtrl('footer','none')

}}
// calling the dashboard functions to display
const allData=(data)=>{
  displayBooks(data.docs)
  numfound(data)
  
}
// sorting out the display data
const displayBooks =(data)=>{
   
    // document.getElementById('dashboard').style.display='flex';
    // document.getElementById('error').style.display="none";
    //   document.getElementById('spinner').style.display="none";
      displayCtrl('dashboard','flex')
      displayCtrl('error','none')
      displayCtrl('spinner','none')


    const searchResult = document.getElementById('dashboard');
    searchResult.textContent='';
    const books=data.filter(data=>data.cover_i !== undefined);
         if(data.filter(data=>data.cover_i !== undefined)){

    books.forEach(data => {

  const div = document.createElement('div');
  div.classList.add('col');

    div.innerHTML =`
            <img src="https://covers.openlibrary.org/b/id/${data.cover_i}-M.jpg" class="card-img-top " alt="...">
             <div class="card-body bg-light bg-gradient rounded-bottom text-center fs-2 p-3 ">
               <h5 class="card-title text-black text-opacity-75"> ${data.title}</h5>
               <h5 class="card-title text-black text-opacity-50">Written By:${data.author_name}</h5>
               <h5 class="card-title text-black text-opacity-25">First Published: ${data.first_publish_year}</h5>
             </div>
          `;
              
          searchResult.appendChild(div);

 

  })
// display data of footer
document.getElementById('displaycount').innerText=`${books.length}`;
  }

}
// footer section 
const numfound=(data)=>{
  // document.getElementById('footer').style.display="block";
  displayCtrl('footer','block')
  document.getElementById('numfound').innerText=`${data.numFound}`;
  
   }
// error handling
const errorMsg=()=>{
displayCtrl('error','block')
displayCtrl('spinner','none')
// document.getElementById('error').style.display="block";
// document.getElementById('spinner').style.display="none";
}


