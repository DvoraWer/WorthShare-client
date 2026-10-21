import type { SponsorshipType } from '../types/recommendation';

export const SPONSORSHIP_TYPE_LABELS: Record<SponsorshipType, string> = {
    PaidPromotion: 'קיבלתי תשלום על ההמלצה',
    FreeProduct: 'קיבלתי את המוצר במתנה',
    AffiliateLink: 'קישור שותפים - אני מקבל/ת עמלה',
    OwnBusiness: 'זה העסק שלי',
    Other: 'אחר',
}
