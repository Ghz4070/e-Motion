
export function reduc (pointFidelity ,priceOffers) {
    if(pointFidelity >= 100 && pointFidelity <= 199){
        return priceOffers -(priceOffers*0.05) 
    }else if(pointFidelity >=200 && pointFidelity <= 499){
        return priceOffers - (priceOffers*0.10) 
    }else if(pointFidelity >= 500 && pointFidelity <= 999){
        return priceOffers -(priceOffers*0.15) 
    }else if(pointFidelity >= 1000){
        return priceOffers -(priceOffers*0.20) 
    }else if(pointFidelity<100) {
        return priceOffers
    }else{
        return false
    }
}
