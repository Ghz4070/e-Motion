
export function reduc (pointFidelity ,priceOffers) {
    if(pointFidelity >= 100 && pointFidelity <= 199){
        return priceOffers -(priceOffers*0.05) 
    }else if(pointFidelity >=200 && pointFidelity <= 299){
        return priceOffers - (priceOffers*0.10) 
    }else if(pointFidelity >= 300 && pointFidelity <= 399){
        return priceOffers -(priceOffers*0.15) 
    }else if(pointFidelity >= 400 && pointFidelity <= 499){
        return priceOffers -(priceOffers*0.20) 
    }else if(pointFidelity >= 500 && pointFidelity <= 599){
        return priceOffers -(priceOffers*0.25) 
    }else if(pointFidelity >= 599 && pointFidelity <= 600){
        return priceOffers -(priceOffers*0.30) 
    }else if(pointFidelity > 600){
        return priceOffers -(priceOffers*0.30) 
    }else if(pointFidelity<100) {
        return priceOffers
    }else{
        return false
    }
}