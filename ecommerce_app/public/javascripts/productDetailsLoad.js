var single_product_template;
document.addEventListener(("DOMContentLoaded"), () => {
    single_product_template = Handlebars.compile($("#single_product_template").html());
})

var getProductDetailsWithFilter = () => {
    var userFilter = {category: []};
    var categoryListElements = $("#categoryList input[type=checkbox]:checked");
    for(var i = 0 ; i < categoryListElements.length; i++) {
        userFilter.category.push($(categoryListElements[i]).val());
    }
    
    userFilter.price = $("#priceFilter").val();
    loadProductDetails(userFilter);
}

var loadProductDetails = (userFilter = {}) => {
    console.log("From load product detials");

    // var dataUrl = 'http://localhost:3000/get/productsDetails';
    // OR
    var dataUrl = '/get/productsDetails';

    // axios.post(dataUrl, userFilter, { headers: {"authorization" : `Bearer ${validToken}`}}).then((response) => {    
        axios.post(dataUrl, userFilter).then((response) => {    
        $(".pDetailsBlock").html('');
        var productData = response.data.details;
        productData.forEach((details, index) => {
            details.discountPrice = Math.round(details.price - (details.price * 15) / 100); 
            details.discountPercent = 15;
            details.description = details.description.slice(0, 150) + '...';
            details.index = index;
            $(".pDetailsBlock").append(single_product_template(details));
        });
    }).catch((err) => {

    });
}

var addItemToCart = (index) => {
    alert("index is " + index)
}