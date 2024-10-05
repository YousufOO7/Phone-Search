let brandName = '';
const loadPhones = async (showPhone, brandName) => {
    document.getElementById('spinner').style.display='none';
    try{
        const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${brandName ? brandName : 'iphone'}`);
        const data = await res.json();

        if (data.data == 0) {
    document.getElementById('phones-container').innerHTML="";
          const hiddenContainer = document.getElementById('hidden-container');
          const hideDiv = document.createElement('div');
          hideDiv.innerHTML = `
            <div class="text-2xl"><h1>No Mother fuuker there no phone like this</h1></div>
          `;
          hiddenContainer.appendChild(hideDiv);
      } else if (showPhone) {
          displayAllPhone(data.data);
      } else {
          displayAllPhone(data.data.slice(0, 6));
      }
      
    }
    catch(err){
        console.err(err);
    }
}


const handleSearch = () => {
    document.getElementById('spinner').style.display='block';
    const searchText = document.getElementById('search-box').value;
    if(!searchText){
      alert('Please enter a phone brand or model to search.');
      document.getElementById('spinner').style.display = 'none';
      return;
    }
    
    brandName = searchText;
    setTimeout(function () {
        loadPhones(false, searchText) ;
    }, 3000)
    document.getElementById('search-box').value ="";
}



const handleShowAll = () => {
  loadPhones(true, brandName);
}


// {
//     "brand": "Apple ",
//     "phone_name": "iPhone 13 mini",
//     "slug": "apple_iphone_13_mini-11104",
//     "image": "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13-mini.jpg"
// }

const displayAllPhone = (phones) => {
    const phoneContainer = document.getElementById('phones-container');
    document.getElementById('phones-container').innerHTML="";
    document.getElementById('hidden-container').innerHTML="";
    phones.forEach((phone) => {
      const {brand, slug, image} = phone;
      const div = document.createElement('div');
      div.innerHTML = `
         <div class="card bg-base-100 w-96 shadow-xl">
    <figure class="px-10 pt-10">
      <img
        src=${image}
        alt="Shoes"
        class="rounded-xl" />
    </figure>
    <div class="card-body items-center text-center">
      <h2 class="card-title">${brand}</h2>
      <p>There are many variations of passages of available, but the majority have suffered</p>
      <div class="card-actions">
        <button onclick="showDetails('${slug}')" class="btn btn-primary">Show Details</button>
      </div>
    </div>
  </div>
      `
      phoneContainer.appendChild(div);
      })
      
    }


// {
//     "mainFeatures": {
//         "storage": "128GB/256GB/512GB storage, no card slot",
//         "displaySize": "5.4 inches, 71.9 cm2 (~85.1% screen-to-body ratio)",
//         "chipSet": "Apple A15 Bionic (5 nm)",
//         "memory": "128GB 4GB RAM, 256GB 4GB RAM, 512GB 4GB RAM",
//         "sensors": [
//             "Face ID",
//             "accelerometer",
//             "gyro",
//             "proximity",
//             "compass",
//             "barometer"
//         ]
//     },
//     "slug": "apple_iphone_13_mini-11104",
//     "name": "iPhone 13 mini",
//     "releaseDate": "Released 2021, September 24",
//     "brand": "Apple",
//     "image": "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13-mini.jpg"
// }

const showDetails = async (details) => {
    try{
        const res = await fetch(`https://openapi.programming-hero.com/api/phone/${details}`);
        const data = await res.json();
        const {name, slug, releaseDate, image} = data.data;
        const modelContainer = document.getElementById('modal-container');
        modelContainer.innerHTML='';
        const modelDiv = document.createElement('div');
        modelDiv.innerHTML = `
<dialog id="my_modal_1" class="modal">
  <div class="modal-box">
    <img class="w-full" src="${image}"/>
    <h3 class="text-2xl font-bold">${name}</h3>
    <p class="py-4">${slug}</p>
    <p>${releaseDate}</p>
    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
        `;
        
        modelContainer.appendChild(modelDiv);
        my_modal_1.showModal();
    }
    catch(err){
        console.err(err);
    }
}


loadPhones(false, 'iphone');