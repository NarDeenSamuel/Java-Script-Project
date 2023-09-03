let rowData = document.getElementById("rowData");
let showData = document.getElementById("showData");
let categoryData = document.getElementById("categoryData")
let submitBtn = document.getElementById("submitBtn");

let menuItems = $("#menuItems").width();
$('#menu').css('left', -menuItems);

$("#links li").animate({
    top: 300
}, 500)

$('#close').click(closeMenu)
function closeMenu() {

    $('#menu').css('left', -menuItems);
    $("#open").css('display', 'block');
    $("#close").css('display', 'none');
    $("#links li").animate({
        top: 300
    }, 500)
}



$("#open").click(openMenu)
function openMenu() {
  
    $('#menu').css('left', 0);
    $("#open").css('display', 'none');
    $("#close").css('display', 'block');
    for (let i = 0; i < 5; i++) {
        $("#links li").eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }
}




// L O A D I N G  //
$(document).ready(function () {
    $("#loading").fadeOut(700, function () {
        $(".inner-loading-screen").fadeOut(500);
        $("body").css("overflow", "auto");

    });

})

//  E N D    L O A D I N G  

//   li  A C T I O NS  



$("#search").click(function () {
    $("#index").css("display", "none")
    $("#searchContainer").css("display", "block")
    $("#contactContent").css("display", "none")
    $("#categorySection").css("display", "none")
    $("#areaSection").css("display", "none")
    $("#ingradiantSection").css("display",'none')
    closeMenu()
})

$("#area").click(function () {
    $("#categorySection").css("display", "none")
    $("#areaSection").css("display", "block")
    $("#searchContainer").css("display", "none")
    $("#index").css("display", "none")
    $("#contactContent").css("display", "none")
    $("#ingradiantSection").css("display",'none')
    getArea()
})

$("#categories").click(function () {
    $("#areaSection").css("display", "none")
    $("#categorySection").css("display", "block")
    $("#searchContainer").css("display", "none")
    $("#index").css("display", "none")
    $("#contactContent").css("display", "none")
    $("#ingradiantSection").css("display",'none')
    getCategories()
})
$("#ingredients").click(function () {
    $("#areaSection").css("display", "none")
    $("#categorySection").css("display", "none")
    $("#searchContainer").css("display", "none")
    $("#index").css("display", "none")
    $("#contactContent").css("display", "none")
    $("#ingradiantSection").css("display",'block')
    getIngradiants()
})

$("#contact").click(function () {
    $("#index").css("display", "none")
    $("#contactContent").css("display", "block")
    $("#searchContainer").css("display", "none")
    $("#categorySection").css("display", "none")
    $("#areaSection").css("display", "none")
    $("#ingradiantSection").css("display",'none')
    closeMenu()
})
//    E N D       li  A C T I O N S

//    D I S P L A Y   S E C T I O N 



desplayIndexMeals()
async function desplayIndexMeals() {
 
    let IndexMeals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s`)
    IndexMeals = await IndexMeals.json()
    $(".inner-loading-screen").fadeOut(500);
    // console.log(searchMeal.meals);
    displayMeals(IndexMeals.meals)

}








function displayMeals(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }
    $("#index").css('display', 'block')
    rowData.innerHTML = cartoona
}
//   E N D     D I S P L A Y   S E C T I O N 

// S E A R C H     S E C T I O N  


async function searchByName(term) {
    showData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(500);
    let searchMeal = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    searchMeal = await searchMeal.json()
    searchMeal.meals ? searchMeals(searchMeal.meals) : searchMeals([])
    $(".inner-loading-screen").fadeOut(500);
    // console.log(searchMeal.meals);

}

async function searchByFLetter(term) {
    close()
    showData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(500);
    term == "" ? term = "a" : "";
    let searchKey = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    searchKey = await searchKey.json()

    searchKey.meals ? searchMeals(searchKey.meals) : searchMeals([])
    $(".inner-loading-screen").fadeOut(500)
    // console.log(searchKey.meals);
}



function searchMeals(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }
    $("#showData").css("display",'flex')
    showData.innerHTML = cartoona
}

// E N D   S E A R C H     S E C T I O N  



//    A R E A   S E C T O N 


async function getArea() {
    closeMenu()
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(500);
    let areaRes = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    areaRes = await areaRes.json()
    $(".inner-loading-screen").fadeOut(500);
    displayArea(areaRes.meals)

}



function displayArea(arr) {
    let cartoona = "";
    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getAreaMeals('${arr[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${arr[i].strArea}</h3>
                </div>
        </div>
        `
    }
    areaData.innerHTML = cartoona
}


async function getAreaMeals(area) {
    areaData.innerHTML = ""
    let areas = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    areas = await areas.json()


    displayMeals(areas.meals.slice(0, 20))


}

//   E N D   A R E A   S E C T O N

//    I N G R A G I A N T S    S E C T I O N 



async function getIngradiants() {
    closeMenu()
    ingradiantData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    let IngradiantRes = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    IngradiantRes = await IngradiantRes.json()
    console.log(IngradiantRes.meals);
   
    displayIngredients(IngradiantRes.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut(300)



}


function displayIngredients(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${arr[i].strIngredient}</h3>
                        <p>${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
        </div>
        `
    }

    ingradiantData.innerHTML = cartoona
}
async function getIngredientsMeals(ingredients) {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    response = await response.json()

    $("#ingradiantSection").css("display",'none')
    displayMeals(response.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut(300)

}



// E N D    I N G R A D I A N T S  S E C T I O N 
// C A T E G O R Y 







async function getCategories() {
    closeMenu()
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(500);
    let myRes = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    myRes = await myRes.json()
    $(".inner-loading-screen").fadeOut(500);
    displayCategories(myRes.categories)


}

function displayCategories(arrayy) {
    let cartoona = "";
    for (let i = 0; i < arrayy.length; i++) {
        cartoona += `
        <div class="col-md-3">
                  <div onclick="getCategoryMeals('${arrayy[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                      <img class="w-100" src="${arrayy[i].strCategoryThumb}" alt="" srcset="">
                      <div class="meal-layer position-absolute text-center text-black p-2">
                          <h3>${arrayy[i].strCategory}</h3>
                          <p>${arrayy[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
                      </div>
                  </div>
          </div>
        `
    }
    categoryData.innerHTML = cartoona
}


async function getCategoryMeals(category) {
    categoryData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(500);

    let categoryMeals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    categoryMeals = await categoryMeals.json()

    $(".inner-loading-screen").fadeOut(500);
    displayMeals(categoryMeals.meals.slice(0, 20))


}












//   E N D      C A T E G O R Y 

// C O N T A C T    U S
document.getElementById("nameInput").addEventListener("focus", () => {
    nameInputTouched = true
})

document.getElementById("emailInput").addEventListener("focus", () => {
    emailInputTouched = true
})

document.getElementById("phoneInput").addEventListener("focus", () => {
    phoneInputTouched = true
})

document.getElementById("ageInput").addEventListener("focus", () => {
    ageInputTouched = true
})

document.getElementById("passwordInput").addEventListener("focus", () => {
    passwordInputTouched = true
})

document.getElementById("repasswordInput").addEventListener("focus", () => {
    repasswordInputTouched = true
})


let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;




function inputsValidation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInputTouched) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }


    function nameValidation() {
        return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
    }

    function emailValidation() {
        return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
    }

    function phoneValidation() {
        return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
    }

    function ageValidation() {
        return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
    }

    function passwordValidation() {
        return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
    }

    function repasswordValidation() {
        return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
    }

    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}


//  E N D    C O N T A C T    U S



    // D I S P L A Y    M E A L   D E T A i L s


    async function getMealDetails(mealID) {
        close()
        rowData.innerHTML = ""
        $(".inner-loading-screen").fadeIn(400)
        $("#searchContainer").css("display", "none")
       
        let Details = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
        Details = await Details.json();
    
        displayMealDetails(Details.meals[0])
        $(".inner-loading-screen").fadeOut(400)
    
    }
    
    
    function displayMealDetails(meal) {
        $(".inner-loading-screen").fadeIn(400)
        
        $("#showData").css("display",'none')
    
        let ingredients = ``
    
        for (let i = 1; i <= 20; i++) {
            if (meal[`strIngredient${i}`]) {
                ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
            }
        }
    
        let tags = meal.strTags?.split(",")
        if (!tags) tags = []
    
        let tagsStr = ''
        for (let i = 0; i < tags.length; i++) {
            tagsStr += `
            <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
        }
        let cartoona = `
        <div class="col-md-4">
                    <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                        alt="">
                        <h2>${meal.strMeal}</h2>
                </div>
                <div class="col-md-8">
                    <h2>Instructions</h2>
                    <p>${meal.strInstructions}</p>
                    <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                    <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                    <h3>Recipes :</h3>
                    <ul class="list-unstyled d-flex g-3 flex-wrap">
                        ${ingredients}
                    </ul>
    
                    <h3>Tags :</h3>
                    <ul class="list-unstyled d-flex g-3 flex-wrap">
                        ${tagsStr}
                    </ul>
    
                    <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                    <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
                </div>`
                $(".inner-loading-screen").fadeOut(400)
                $("#index").css('display', 'block')
        rowData.innerHTML = cartoona
    }
    







  //   E N D     D I S P L A Y    M E A L   D E T A i L s