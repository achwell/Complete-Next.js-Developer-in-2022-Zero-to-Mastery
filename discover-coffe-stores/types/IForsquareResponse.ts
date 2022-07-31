import ICoffeeStore from "./ICoffeeStore";
import IGeocode from "./IGeocode";

export default interface IForsquareResponse {
    results: ICoffeeStore[]
    context: {
        geo_bounds: {
            circle: {
                center: IGeocode,
                radius: number
            }
        }
    }
}