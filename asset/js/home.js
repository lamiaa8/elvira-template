"use strict";
var pro
async function getApi() {
    let apiRespons = await fetch("/asset/js/api.json");
    let finalApi = await apiRespons.json();
    pro =``;
    // for(let x=0 ; x<3 ; x++){
    //     pro +=`
    //     <div class="carousel-item">
    //                             <div class="row product active">
    //     `;
        for (let i = 0; i < 7; i++) {
            if(i==2){
                pro+= `
                
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 sale-product">
                                            <a href="#"><img src="imager/home/sale-product.jpg" alt="">
                                            </a>
                                        </div>
    
                `
            }
            else{
                pro+=`
                <div class=" col-xl-3 col-lg-3 col-md-3 col-sm-6 col-12">
                                            <div class="card">
                                                <div class="card-img-top">
                                                    <a href="#" class="wp-post-image">
                                                        <img class="image-cover" src="${finalApi.product[i].link}"
                                                            alt="product">
                                                    </a>
                                                    <p class="on${finalApi.product[i].how}">${finalApi.product[i].how}</p>
                                                    <div class="icon-product">
                                                        <button class="btn"  onclick="yourCard(${i})">
                                                        <i class="fa-solid fa-cart-shopping"></i>
                                                        </button>
                                                        <button type="button" class="btn click-quick-view"
                                                            data-toggle="modal" data-target="#exampleModalCenter"onclick="search(${i})">
                                                            <span class="lnr lnr-magnifier"onclick="search(${i})"></span>
                                                        </button>
                                                        <button class="btn" onclick="fav(this)">
                                                            <span class="lnr lnr-heart"></span>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div class="card-body">
                                                    <p class="card-title"><a href="product-list.html">${finalApi.product[i].type} </a></p>
                                                    <p class="woocommerce-loop-product__title"><a
                                                            href="product-single.html">
                                                            ${finalApi.product[i].name}</a></p>
                                                    <span class="price">
                                                        <ins>
                                                            <span class="woocommerce-Price-amount amount">
                                                                <span class="woocommerce-Price-currencySymbol">$</span>${finalApi.product[i].price}
                                                            </span>
                                                        </ins>
                                                    </span>
                                                </div>
                                            </div>
    
                                        </div>
                                        

                `
            }
        }

        
    //     pro += `</div>
    //     </div>`;


    // }

    document.getElementById("itemOne").innerHTML= pro
    document.getElementById("itemThree").innerHTML= pro
    document.getElementById("itemTwo").innerHTML= pro




}


function fav(x){
    x.style.background ='#f50404';
}


var card =[] ;
var totalPriceInCard ;
if (localStorage.getItem("card") == null) {
    card = []
}
else {
    card = JSON.parse(localStorage.getItem("card"));

}

if (localStorage.getItem("totalPriceInCard") == null) {
    totalPriceInCard = 0;
}
else {
    totalPriceInCard = Number(JSON.parse(localStorage.getItem("totalPriceInCard")));

}

async function yourCard(l){
    let apiRespons = await fetch("/asset/js/api.json");
    let finalApi = await apiRespons.json();
    card.push(finalApi.product[l]);
    localStorage.setItem("card", JSON.stringify(card));

    totalPriceInCard += Number(finalApi.product[l].price);

    if(finalApi.product[l].how == 'sale') {
        totalPriceInCard = totalPriceInCard - ((finalApi.product[l].price)* 30/100);
    }
    localStorage.setItem("totalPriceInCard", JSON.stringify(totalPriceInCard));
    displayCard()
}
function displayCard(){
    let shoppingCart = document.getElementById("shoppingCart");
    let shoppingCartResponsiv  = document.getElementById("shoppingCartResponsiv");
    totalPriceInCard = ~~Number(JSON.parse(localStorage.getItem("totalPriceInCard")));
    card = JSON.parse(localStorage.getItem("card"));
    console.log(card.length);
    let dis =`
    <div class="widget_shopping_cart_content">
        <ul class="woocommerce-mini-cart cart_list product_list_widget ">
    `
    if(card.length == 0){
        shoppingCart.innerHTML= ` 
        <div class="widget_shopping_cart_content">
            <p>No products in the cart.</p>
        </div>
        `
    }
    else{
        for(let index=0; index<card.length ;index++){
            dis += `
            <li class="woocommerce-mini-cart-item mini_cart_item clearfix">
                <a class="product-image" href="#">
                    <img src="${card[index].link}" alt="cart-1">
                </a>
                <a class="product-title" href="#">${card[index].name}</a>

                <span class="woocommerce-Price-amount amount">
                    <span class="woocommerce-Price-currencySymbol">$</span>
                    ${card[index].price}
                </span>
                <span class="quantity">
                    Qty: 1
                </span>
                <a href="#" class="remove"  onclick="Delete(${index})">
                    <span class="lnr lnr-cross"></span>
                </a>
            </li>
            `;
            
        }
        dis += `
        </ul>
            <p class="woocommerce-mini-cart__total total">
                <span>Order Total:</span>
                <span class="woocommerce-Price-amount amount">
                    <span class="woocommerce-Price-currencySymbol">$</span>
                    ${totalPriceInCard}
                </span>
            </p>
            <p class="woocommerce-mini-cart__buttons buttons">
                <a href="checkout.html" class="button wc-forward au-btn btn-small">
                    CHECKOUT</a>
                    <a href="cart.html" class="button wc-forward au-btn btn-small">VIEW CART 
                        </a>
            </p>
            </div>
        `;
        shoppingCart.innerHTML = dis;
        shoppingCartResponsiv.innerHTML = dis ;

    }


}
var subtotal = totalPriceInCard;
var num =1;
function tableCard(){
    totalPriceInCard = ~~Number(JSON.parse(localStorage.getItem("totalPriceInCard")));
    card = JSON.parse(localStorage.getItem("card"));
    let all = ``;
    for(let n = 0; n< card.length ; n++){
        all += `
        <tr class="woocommerce-cart-form__cart-item cart_item">

        <td class="product-remove">
            <a href="#"
                class="remove" aria-label="Remove this item"
                data-product_id="5018" data-product_sku="MKSNVITG" onclick="Delete(${n}); tableCard()">×</a>
        </td>

        <td class="product-thumbnail">
            <a href="#"><img
                    width="120" height="120"
                    src="${card[n].link}"
                    class="attachment-woocommerce_thumbnail size-woocommerce_thumbnail"
                    alt="" loading="lazy"
                    sizes="(max-width: 120px) 100vw, 120px"></a>
        </td>

        <td class="product-name" data-title="Product">
            <a href="#/"> ${card[n].name}</a>
        </td>

        <td class="product-price" data-title="Price">
            <span class="woocommerce-Price-amount amount"><span
                    class="woocommerce-Price-currencySymbol">$</span>${card[n].price}</span>
        </td>

        <td class="product-quantity" data-title="Quantity">
            <div class="btn-group">
                <button type="button" class="prev btn" onclick="subtotal -= ${card[n].price} ; num -= 1; tableCard(); ">-</button>
                <button type="button" class="show-number btn ">${num}</button>
                <button type="button" class="next btn "onclick="subtotal += ${card[n].price} ; num += 1 ;tableCard()" >+</button>
            </div>
        </td>

        <td class="product-subtotal" data-title="Subtotal">
            <span class="woocommerce-Price-amount amount"><span
                    class="woocommerce-Price-currencySymbol">$</span>${card[n].price}</span>
        </td>
    </tr>
        `;
    }
    all+=`
    <tr>
        <td colspan="6" class="actions ">
            <div class="card-button">
                <label for="coupon_code">Coupon:</label> <input type="text"
                    name="coupon_code" class="input-text" id="coupon_code"
                    value="" placeholder="Coupon code"> <button type="submit"
                    class="go-shopping" name="apply_coupon"
                    value="Apply coupon">Apply coupon</button>
            </div>
            <div class="card-button float-right ">
                <button type="submit" class="shop-now" name="update_cart"
                    value="Update cart">Update cart</button>

            </div>
            <input type="hidden" id="woocommerce-cart-nonce"
                name="woocommerce-cart-nonce" value="4e5f47ae92"><input
                type="hidden" name="_wp_http_referer"
                value="/cart/?removed_item=1">
        </td>
    </tr>

    `
    document.getElementById("tbody").innerHTML = all;

    document.getElementById("tbodyTwo").innerHTML = `
        <tr class="cart-subtotal">
        <th>Subtotal</th>
        <td data-title="Subtotal"><span
                class="woocommerce-Price-amount amount"><span
                    class="woocommerce-Price-currencySymbol">$</span>${totalPriceInCard}</span>
        </td>
        </tr>
        <tr class="order-total">
        <th>Total</th>
        <td data-title="Total"><strong><span
                    class="woocommerce-Price-amount amount"><span
                        class="woocommerce-Price-currencySymbol">$</span>${subtotal}</span></strong>
        </td>
        </tr>

    `
}


function Delete(mo){
    totalPriceInCard = Number(JSON.parse(localStorage.getItem("totalPriceInCard")));
    card = JSON.parse(localStorage.getItem("card"));
    totalPriceInCard = totalPriceInCard - card[mo].price;
    card.splice(mo, 1);
    localStorage.setItem("totalPriceInCard", JSON.stringify(totalPriceInCard));
    localStorage.setItem("card", JSON.stringify(card));
    displayCard();
}

async function ourProductsDisply(i) {
    let apiRespons = await fetch("/asset/js/api.json");
    let finalApi = await apiRespons.json();
    pro =``;
        if(i == 1)
        {
            for (let i = 4; i < 16; i++) {
                pro+=`
                <div class="col-md-4 col-sm-6 col-12">
                
                    <div class="card">
                        <div class="card-img-top">
                            <a href="#" class="wp-post-image">
                                <img class="image-cover" src="${finalApi.product[i].link}"
                                    alt="product">
                            </a>
                            <p class="on${finalApi.product[i].how}">${finalApi.product[i].how}</p>
                            <div class="icon-product">
                                <button class="btn"  onclick="yourCard(${i})">
                                <i class="fa-solid fa-cart-shopping"></i>
                                </button>
                                <button type="button" class="btn click-quick-view"
                                    data-toggle="modal" data-target="#exampleModalCenter" onclick="search(${i})">
                                    <span class="lnr lnr-magnifier" onclick="search(${i})"></span>
                                </button>
                                <button class="btn" onclick="fav(this)">
                                    <span class="lnr lnr-heart"></span>
                                </button>
                            </div>
                        </div>
                        <div class="card-body">
                            <p class="card-title"><a href="product-list.html">${finalApi.product[i].type} </a></p>
                            <p class="woocommerce-loop-product__title"><a
                                    href="product-single.html">
                                    ${finalApi.product[i].name}</a></p>
                            <span class="price">
                                <ins>
                                    <span class="woocommerce-Price-amount amount">
                                        <span class="woocommerce-Price-currencySymbol">$</span>${finalApi.product[i].price}
                                    </span>
                                </ins>
                            </span>
                        </div>
                    </div>

                </div>
                

                `
            
        }

        }if (i==2) {
            
            for (let i = 6; i < 18; i++) {
                pro+=`
                <div class="col-md-4 col-sm-6 col-12">
                
                    <div class="card">
                        <div class="card-img-top">
                            <a href="#" class="wp-post-image">
                                <img class="image-cover" src="${finalApi.product[i].link}"
                                    alt="product">
                            </a>
                            <p class="on${finalApi.product[i].how}">${finalApi.product[i].how}</p>
                            <div class="icon-product">
                                <button class="btn"  onclick="yourCard(${i})">
                                <i class="fa-solid fa-cart-shopping"></i>
                                </button>
                                <button type="button" class="btn click-quick-view"
                                    data-toggle="modal" data-target="#exampleModalCenter" onclick="search(${i})">
                                    <span class="lnr lnr-magnifier" onclick="search(${i})"></span>
                                </button>
                                <button class="btn" onclick="fav(this)">
                                    <span class="lnr lnr-heart"></span>
                                </button>
                            </div>
                        </div>
                        <div class="card-body">
                            <p class="card-title"><a href="product-list.html">${finalApi.product[i].type} </a></p>
                            <p class="woocommerce-loop-product__title"><a
                                    href="product-single.html">
                                    ${finalApi.product[i].name}</a></p>
                            <span class="price">
                                <ins>
                                    <span class="woocommerce-Price-amount amount">
                                        <span class="woocommerce-Price-currencySymbol">$</span>${finalApi.product[i].price}
                                    </span>
                                </ins>
                            </span>
                        </div>
                    </div>

                </div>
                

                `
            
        }
        } else {
            for (let i = 0; i < 12; i++) {
                pro+=`
                <div class="col-md-4 col-sm-6 col-12">
                
                    <div class="card">
                        <div class="card-img-top">
                            <a href="#" class="wp-post-image">
                                <img class="image-cover" src="${finalApi.product[i].link}"
                                    alt="product">
                            </a>
                            <p class="on${finalApi.product[i].how}">${finalApi.product[i].how}</p>
                            <div class="icon-product">
                                <button class="btn"  onclick="yourCard(${i})">
                                <i class="fa-solid fa-cart-shopping"></i>
                                </button>
                                <button type="button" class="btn click-quick-view"
                                    data-toggle="modal" data-target="#exampleModalCenter" onclick="search(${i})" >
                                    <span class="lnr lnr-magnifier" onclick="search(${i})"></span>
                                </button>
                                <button class="btn" onclick="fav(this)">
                                    <span class="lnr lnr-heart"></span>
                                </button>
                            </div>
                        </div>
                        <div class="card-body">
                            <p class="card-title"><a href="product-list.html">${finalApi.product[i].type} </a></p>
                            <p class="woocommerce-loop-product__title"><a
                                    href="product-single.html">
                                    ${finalApi.product[i].name}</a></p>
                            <span class="price">
                                <ins>
                                    <span class="woocommerce-Price-amount amount">
                                        <span class="woocommerce-Price-currencySymbol">$</span>${finalApi.product[i].price}
                                    </span>
                                </ins>
                            </span>
                        </div>
                    </div>

                </div>
                

                `
            
        }
            
        }
        pro += `
        <ul class="pagination justify-content-center">
            <li class="page-item"><a class="page-link" onclick="ourProductsDisply(1) " href="#shopNow">1</a></li>
            <li class="page-item"><a class="page-link" onclick="ourProductsDisply(2) " href="#shopNow">2</a></li>
            <li class="page-item"><a class="page-link"  onclick="ourProductsDisply(0) "href="#shopNow"> > </a></li>
        </ul>
        `;

    document.getElementById("shopNow").innerHTML= pro




}



async function search(h){
    let apiRespons = await fetch("/asset/js/api.json");
    let finalApi = await apiRespons.json();
    let proudactsearch = ``;
    if( h  < finalApi.product.length-4){
        proudactsearch = `
        <div class="col-md-6 col-sm-12 col-12">
                <div class="mySlides">
                    <img src="${finalApi.product[h].link}" alt=" ">
                </div>
                <div class="row row-img-slider">
                    <div class="col-3">
                        <img class="demo cursor" src="${finalApi.product[h+1].link}"  onclick="search(${h+1})" alt="The Woods">
                    </div>
                    <div class="col-3">
                        <img class="demo cursor" src="${finalApi.product[h+2].link}"  onclick="search(${h+2})" alt="Cinque Terre">
                    </div>
                    <div class="col-3">
                        <img class="demo cursor" src="${finalApi.product[h+3].link}"  onclick="search(${h+3})" alt="Mountains and fjords">
                    </div>
                    <div class="col-3">
                        <img class="demo cursor" src="${finalApi.product[h+4].link}" onclick="search(${h+4})" alt="Northern Lights">
                    </div>
                </div>
            </div>
            </div>
            <div class="col-md-6 col-sm-12 col-12 content-product">
                <h2>${finalApi.product[h].name} | $${finalApi.product[h].price}</h2>
                <p><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i
                        class="fas fa-star"></i><i class="fas fa-star"></i> &nbsp; (2 customer
                    review)</p>
                <p>${finalApi.product[h].discription} </p>
                <div class="infor-product">
                    <p><span>Sku: </span>22</p>
                    <p><span>Category: </span>Cosmetic</p>
                    <p><span>Tag: </span>Trendy</p>
                    <p><span>Share: </span>
                        <a href=""><i class="fab fa-facebook"></i></a>
                        <a href=""><i class="fab fa-linkedin-in"></i></a>
                        <a href=""><i class="fab fa-instagram"></i></a></p>
                </div>
                <div>
                    <div class="btn-group">
                        <button type="button" class="prev btn ">-</button>
                        <button type="button" class="show-number btn ">1</button>
                        <button type="button" class="next btn ">+</button>
                    </div>
                    <div class="btn-group" onclick=" yourCard(${h})">
                        <a href="#" class="btn add-to-cart">ADD TO CART<p><i
                                class="fas fa-cart-plus"></i></p> </a>
                    </div>
                </div>
            </div>
        `
    }
    else{
        proudactsearch = `
        <div class="col-md-6 col-sm-12 col-12">
                <div class="mySlides">
                    <img src="${finalApi.product[h].link}" alt=" ">
                </div>
                <div class="row row-img-slider">
                    <div class="col-3">
                        <img class="demo cursor" src="${finalApi.product[10].link}"  onclick="search(${10})" alt="The Woods">
                    </div>
                    <div class="col-3">
                        <img class="demo cursor" src="${finalApi.product[11].link}"  onclick="search(${11})" alt="Cinque Terre">
                    </div>
                    <div class="col-3">
                        <img class="demo cursor" src="${finalApi.product[12].link}"  onclick="search(${12})" alt="Mountains and fjords">
                    </div>
                    <div class="col-3">
                        <img class="demo cursor" src="${finalApi.product[13].link}" onclick="search(${13})" alt="Northern Lights">
                    </div>
                </div>
            </div>
            </div>
            <div class="col-md-6 col-sm-12 col-12 content-product">
                <h2>${finalApi.product[h].name} | $${finalApi.product[h].price}</h2>
                <p><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i
                        class="fas fa-star"></i><i class="fas fa-star"></i> &nbsp; (2 customer
                    review)</p>
                <p>${finalApi.product[h].discription} </p>
                <div class="infor-product">
                    <p><span>Sku: </span>22</p>
                    <p><span>Category: </span>Cosmetic</p>
                    <p><span>Tag: </span>Trendy</p>
                    <p><span>Share: </span>
                        <a href=""><i class="fab fa-facebook"></i></a>
                        <a href=""><i class="fab fa-linkedin-in"></i></a>
                        <a href=""><i class="fab fa-instagram"></i></a></p>
                </div>
                <div>
                    <div class="btn-group">
                        <button type="button" class="prev btn ">-</button>
                        <button type="button" class="show-number btn ">1</button>
                        <button type="button" class="next btn ">+</button>
                    </div>
                    <div class="btn-group" onclick=" yourCard(${h})">
                        <a href="#" class="btn add-to-cart">ADD TO CART<p><i
                                class="fas fa-cart-plus"></i></p> </a>
                    </div>
                </div>
            </div>
        `
    }

    document.getElementById("product_detail").innerHTML= proudactsearch;

}













displayCard()
