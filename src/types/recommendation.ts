export interface CategoryRef
{
    id:number,
    name:string
}

export interface Author
{
    id:number,
    fullName:string
}

export interface Recommendation
{
    id:number,
    title:string,
    description:string,
    url:string|null,
    imageUrl:string|null,
    isSponsored:boolean,
    category:CategoryRef,
    author:Author,
    createdAt:string,
    updatedAt:string
}

export interface Pagination
{
    page:number,
    pageSize:number,
    totalItems:number,
    totalPages:number
}

export interface Paginated<T>
{
    items:T[],
    pagination:Pagination
}

export interface RecommendationFilters{
    search?:string,
    categoryId?:number,
    sortBy?:'createdAt'|'title',
    sortOrder?:'asc'|'desc',
    page?:number,
    pageSize?:number
}

export interface RecommendationsInput{
    title:string,
    description:string,
    categoryId:number,
    url:string
}

export interface OwnerRecommendation extends Recommendation{
    status:'Published'|'PendingSponsoredApproval'|'Rejected'|'Removed',
declaresSponsored:boolean,
reviewedAt:string|null,
rejectionReason:string|null,
disclosure: Disclosure | null
}

export type SponsorshipType = 'PaidPromotion' | 'FreeProduct' | 'AffiliateLink' | 'OwnBusiness' | 'Other';

export interface SponsorshipInput {
    sponsorName: string,
    productName: string,
    sponsorshipType: SponsorshipType,   
    disclosureDetails: string
}

export interface Disclosure {
    sponsorName: string,
    productName: string,
    sponsorshipType: SponsorshipType,
    disclosureDetails: string | null
}

export interface AdminRecommendation extends OwnerRecommendation {
    reviewedBy: Author | null
}





