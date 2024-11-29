var productData = {};
var readProductDetails = () => {

    productData.rating = {};
    productData.id = $("#id").val();
    productData.title = $("#title").val();
    productData.price = parseInt($("#price").val());
    productData.description = $("#description").val();
    // productData.image = $("#image").val();
    productData.category = $("#category").val();
    productData.rating.rate = $("#rating").val();

    console.table(productData);

    axios.post('/add/newProduct', productData).then((result) => {
        console.log("success");
        console.log(result);
    }).catch((err) => {

    });
}


var uploadImageToServer = () => {
    var uploadedFile = $("input[name=prodImage]")[0].files[0];
    if (uploadedFile.type == 'image/jpeg' || uploadedFile.type == 'image/png') {
        let formData = new FormData();
        formData.append("prodImage", uploadedFile);
        axios.post('/upload/file', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }).then((response) => {
            console.log(response.data);
            productData.image = '/images/product_images/' + response.data.file_path;
        });
    } else {
        alert("This format is not suggested " + uploadedFile.type)
    }

    console.log(uploadedFile);
}