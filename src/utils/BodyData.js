export const BannerBody={
   url:'create-banner',
    body:{
        'name':'',
        'imageUrl':''
    }
}
export const CategoryBody={
    url:'create-category',
    body:{
        'name':'',
        'imageUrl':''
    }
}

export const PromoBody ={
    url:'create-promo',
    body:{
        "title": "",
        "description": "",
    "imageUrl": "",
    "terms_condition":"",
    "promo_code":"",
    "promo_discount_price":null,
    "minimum_claim_price": null
        }
}
export const DestinationBody = {
    url:'create-activity',
    body:{
        "categoryId": "",
        "title": "",
        "description": "",
    "imageUrls": [],
    "price": 0,
    "price_discount": 0,
    "rating": 0,
    "total_reviews": 0,
    "facilities": "",
    "address": "",
    "province": "",
    "city": "",
    "location_maps": ""
}
}