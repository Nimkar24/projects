var addRating = (container, rating) => {
    var ratingContainer = document.createElement("div");
    ratingContainer.setAttribute("class", "ratingContainer");
    var fullStarCount = parseInt(rating);
    
    //Adding fullstars
    for (var i = 1; i <= fullStarCount; i++) {
        var divTag = document.createElement("div");
        divTag.setAttribute("class", 'fullStar');
        ratingContainer.append(divTag);
    }

    // adding half stars
    var halfStarCount = 0;
    if (rating % 1 != 0) {
        halfStarCount = 1;
        var divTag = document.createElement("div");
        divTag.setAttribute("class", 'halfStar');
        ratingContainer.append(divTag);
    }
    
    //disabled stars
    var disabledStarsCount = 5 - (fullStarCount + halfStarCount);
    for (var i = 1; i <= disabledStarsCount; i++) {
        var divTag = document.createElement("div");
        divTag.setAttribute("class", 'disabledStar');
        ratingContainer.append(divTag);
    }
    document.querySelector(container).append(ratingContainer);
}