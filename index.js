var searchtext = document.getElementById('search').value.trim();
var s = document.getElementById("search")
var meall = document.querySelector('#meal');
const searchbutton = document.getElementById('search-button')
var meal_details = document.querySelector('.meal_details')


searchbutton.addEventListener('click', fetchresult)
s.addEventListener('keydown',SearchResult)
window.addEventListener('load',fetchresult)

function fetchresult(){
    meall.innerHTML=" ";
    searchtext = document.getElementById('search').value.trim();
    
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchtext}`)
    .then(response=>response.json())
    .then((data)=>{

        console.log(data)

        if(data.meals)
        {
            data.meals.forEach(meal=>{
                let area =`
                <div class="meal_id" id=${meal.idMeal}>
                    
                    <img class="meal_image" src="${meal.strMealThumb}" >
                    
                    <div class="mealname">
                        <h2>${meal.strMeal}</h2>
                    </div>
                    <div class="mealDetails">
                   
                         <button class="fav" id=${meal.idMeal}></button>
                        
                        <a href="meal.html"target="_blank"><button class="recipe-btn">cook</button></a>
                    </div>
                </div>
                `
                meall.innerHTML += area;
                
            })
        }
        else{
            meall.innerHTML=  `<div id="sorry"><p>Sorry, we didn't cook ${searchtext}</p></div> `
            console.log(`Sorry, we didn't cook ${searchtext}`)
        }   
    })
}
 
//opening a new page on clicking the button

document.getElementsByClassName("recipe-btn").onclick = ()=>{
    
    meal_details.innerHTML = 
    `<h2>${data.strMeal}</h2>
                <p class="meal_category"> ${data.strCategory}</p>
                <div class="instruct">
                    <h3>Instructions</h3>
                    <p>${data.strInstructions}</p>    
                </div>
                <div class="meal_image">
                    <img src="${data.strMealThumb}"
                </div>
                <div class="meal_link">
                    <a href="${data.strYoutube}" target="_blank">Watch here</a>
                </div>
            `
    
}



// favourite list
let favourite = []
const favouriteList = new Set();
document.addEventListener("click",(e)=>
{
    if(e.target.classList == "fav")
    {  
        console.log(e.target.parentElement.parentElement.id)
        favouriteList.add(e.target.parentElement.parentElement.id);
        favourite= Array.from(favouriteList)
        localStorage.setItem('favourite',  JSON.stringify(favourite));       
    }
        console.log(JSON.stringify(favourite))


})






// search bar suggestions


function SearchResult()
{
    let a = []
    meall.innerHTML="";
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${s.value}`)
    .then(res=>res.json())
    .then(data=>{
    for(let i=0;i<data.meals.length;i++)
    {
      a[i] = data.meals[i]
      console.log(a[i])
      let area =`
                <div class="meal_id" id=${a[i].idMeal}>
                    
                    <img class="meal_image" src="${a[i].strMealThumb}" >
                    
                    <div class="mealname">
                        <h2>${a[i].strMeal}</h2>
                    </div>
                    <div class="mealDetails">
                   
                    <button class="fav" id=${a[i].idMeal}></button>
                        
                        <a href="meal.html" target="_blank"><button class="recipe-btn" >cook</button></a>
                    </div>
                </div>
                `
                meall.innerHTML += area;
        }           
    })
}

const buttons= document.querySelectorAll(".recipe-btn")

    window.addEventListener('click', (e)=>{
      if(e.target.classList == "recipe-btn")
      {
            console.log("hhi")
            }
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${e.target.parentElement.parentElement.id}`)
        .then(res=>res.json())
        .then(data=>{
          
          meall.innerHTML = 
                    `<h2>${data.meals[0].strMeal}</h2>
                    <p class="meal_category"> ${data.meals[0].strCategory}</p>
                    <div class="instruct">
                        <h3>Instructions</h3>
                        <p>${data.meals[0].strInstructions}</p>    
                    </div>
                    <div class="meal_image">
                        <img src="${data.meals[0].strMealThumb}"
                    </div>
                    <div class="meal_link">
                        <a href="${data.meals[0].strYoutube}" target="_blank">Watch here</a>
                    </div>
                `
        })
    })

