import ICategory from "./ICategory"
import ILocation from "./ILocation"
import IGeocode from "./IGeocode"
import IChain from "./IChain"

export default interface ICoffeeStore {
    fsq_id: string
    name: string
    imgUrl: string
    categories: ICategory[]
    chains: IChain[]
    distance?: number
    geocodes: {
        main: IGeocode
    }
    link: string
    location: ILocation
    related_places: {}
    timezone: string
}