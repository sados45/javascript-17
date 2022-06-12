// js behind the scenes
//single thread -> one job at a time 

// const name = "kemal"

// const first =() => {
//     let a =1

//     const b = second()

//     a = a + b
//     return a
// }

// const second = () => {

//     const c=2
//     return c

// }

// const x = first ()



//setTimeout___________________________________________:
/*
 console.log ("start")
 setTimeout(()=> console.log ("0 sec"), 0)//setTimeout function i ile biz kac saniye gecikmesini istiyorsak 100 ise 1 saniye 2000 ise 2 saniye gecikme yaptiriyoruz. biz bu kodu calistirdigimiz andaqn itibaren 3 saniye 5 saniye gibi. calistirdigimiz function 5 saniye sonra geriden geliyor. 
 Promise.resolve("Promise 1").then(res => console.log(res))
 Promise.resolve("Promise 2").then(res =>{ 
 for (let i = 0; i < 10000000 ; i++){}
 console.log("res")
})
console.log("end") // burada kendi onceliklerine göre hareket ediyorlar. islem önceligi ve ona göre yazdiriyor console.

*/

// ASYNC-AWAIT _____________________________________________

/*
    async function getData(){

    }
 const getCountry = async function(){
    const res =await fetch( 'https://restcountries.com/v2/name/germany')//burada fetch in sonucu geldiginde beklet yani await diyor. bunun dönmesini bekletiyor. biz bir önceki codumuzda bunu then ile yapiyorduk. 
    console.log(res)
    const data = await res.json() // burada res.json özelligini önceden kullanmistik ayni isi yapiyor, fakar yine await özelligini kullanabiliriz. 
    console.log(data)

 }
 getCountry()
 console.log("first")//yukaridakini awaitle bekletmesini soyledik. console da promise pending yazdi. ama bunu direkt olarak bekletmeden yazdi. 
*/
 //bir diger yazim seklini yine sunalim;
/*
 function getCountryData(country){
    fetch( 'https://restcountries.com/v2/name/${country}')
    .then(res => res.json())
    .then(response => renderCountry(response[0]))
 }*/ //burada then ve  fetch kullanimi olmasi nedeniyle bira daha karmasik görünüyor. then tek basina da kullanilir. 



 //burada hata yakalama özelligi olan cod sadece javascripte özeldir. async await ile birlikte kullanilir.

//  const a=3

//  a=8

//  try{
//     const x =3
//     x = 5


//  }catch(err){
//     console.log(err.message)
//  }

 //TRY CATCH________________________________:


    const renderError = function(msg){
        countriesContainer.insertAdjacentText("beforeend", msg)
        countriesContainer.style.opacity =""
    }

 const getCountry = async function(){

    try{
    const res = await fetch( 'https://restcountries.com/v2/nme/germany') //name ismi eksik yazdigimiz icin 404 found yazdirdik. 
    if(!res.ok) throw new Error("Something went wrong. Not found");
    const data = await res.json();
    renderCountry(data[0])
    return 'You get germany'
    }catch (err){
        renderError(err.message)
    console.log(err.message)
    throw err//bunu yazarsak asagidaki console, 2 devreye giriyor. yazmadigimizda console 1 devrede.
    }

}

const btn = document.querySelector(".btn")
//btn.addEventListener("click", () => getCountry())

    //  getCountry()
    //  .then(res => console.log("1", res))
    //  .catch(err => console.log("2", err))

     //hoca diyorki async await tercih edilen diyor. 




     //CONSUME____________:


function getCountryData (country){

    fetch(`https://restcountries.com/v2/name/${country}`)
    .then(res=> {
        if(!res.ok) throw new Error(`Country not found ${res.status}`) 
        return res.json()
        })
      
        .then(response => {
        renderCountry(response[0])
        const neighbour =response [0].borders[0]
        console.log(neighbour)
        for(let i =0; i < neighbour.length; i++){ //buraya bunu eklememizdeki amac türkiyenin komsularini buraya cagirmakti. hoca tamamlamadi ders bitti. for döngüsü ile cagirip tüm komsu devletler getirilebilecegini then ile baglantinin devaminin getirilebilecegini söyledi. 
       return fetch(`https://restcountries.com/v2/alpha/${neighbour}`)
        })

        .then(data =>{
            console.log("aaaa", data)
            return data.json()
        })

        .then(neighbour => {
            console.log("2222", neighbour)
            renderCountry(neighbour)}
            ).catch(err => console.log(err.message))
        }
         
  
        getCountryData("turkey")
    