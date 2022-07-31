import axios from "axios"
import {createApi} from "unsplash-js"
import IForsquareResponse from "../types/IForsquareResponse"

const unsplashApi = createApi({
    accessKey: process.env.UNSPLASH_ACCESS_KEY!,
})

const getUrlForCoffeeStores = (latLong: string, query: string, limit: number) => {
    return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`
}

const getListOfCoffeeStorePhotos = async () => {
    const photos = await unsplashApi.search.getPhotos({
        query: "coffee shop",
        perPage: 30,
    })
    const unsplashResults = photos.response?.results
    return unsplashResults ? unsplashResults.map((result) => result.urls["small"]) : []
}

export const fetchCoffeeStores = async () => {
    const photos = await getListOfCoffeeStorePhotos()
    let urlForCoffeeStores = getUrlForCoffeeStores("59.71656%2C10.26245", "coffee", 6);
    const response = await axios.get<IForsquareResponse>(urlForCoffeeStores, {
        headers: {
            'Accept': 'application/json',
            'Authorization': process.env.FOURSQUARE_API_KEY!
        }
    })
    const data = await response.data
    const {results} = data
    return results.map((result, index) => {
        const neighborhood = result.location.neighborhood
        return ({
            id: result.fsq_id,
            address: result.location.address || "",
            name: result.name,
            neighbourhood: neighborhood && neighborhood?.length > 0 ? neighborhood[0] : "",
            imgUrl: photos[index],
        });
    })
}