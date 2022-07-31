export default interface ILocation {
    address?: string
    address_extended?: string
    locality?: string
    dma?: string
    region?: string
    postcode?: string
    country?: string
    admin_region?: string
    post_town?: string
    neighborhood?: string[]
    po_box?: string
    cross_street?: string
    formatted_address?: string
    census_block?: string
}