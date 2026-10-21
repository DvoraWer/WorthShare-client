import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import type { SponsorshipInput } from '../types/recommendation';
import { SPONSORSHIP_TYPE_LABELS } from '../constants/sponsorship';

const SPONSORSHIP_TYPES = ['PaidPromotion', 'FreeProduct', 'AffiliateLink', 'OwnBusiness', 'Other'] as const;
const schema=yup.object(
    {
        sponsorName:yup.string().trim().required("חובה להזין שם").max(120,"מקסימום 120 תווים"),
        productName:yup.string().trim().required("שדה חובה").max(120,"מקסימום 120 תווים"),
        sponsorshipType:yup.string().oneOf(SPONSORSHIP_TYPES,"יש לבחור סוג מימון").required("חובה לבחור סוג מימון"),
        disclosureDetails:yup.string().trim().default('').max(1000,"מקסימום 1000 תווים").when('sponsorshipType',{
            is:'Other',
            then:(schema)=>schema.required("יש לפרט את סוג הקשר להמלצה"),
        })	
    }
)
interface SponsoredshipProps {
    onSubmit: (data: SponsorshipInput) => void
    defaultValues?: SponsorshipInput
    isSubmitting: boolean
    submitLabel: string
}

const SponsorshipForm=({ onSubmit, defaultValues, isSubmitting, submitLabel }:SponsoredshipProps)=>
{
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues,
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div>
                <label htmlFor="sponsorName">שם היצרן או המותג</label>
                <input id="sponsorName" type="text" {...register('sponsorName')} />
                {errors.sponsorName && <p role="alert">{errors.sponsorName.message}</p>}
            </div>

            <div>
                <label htmlFor="productName">שם המוצר</label>
                <input id='productName' type='text'{...register('productName')} />
                {errors.productName && <p role="alert">{errors.productName.message}</p>}
            </div>

            <div>
                <label htmlFor="sponsorshipType">מה הקשר שלך למוצר?</label>
              <select id="sponsorshipType" {...register('sponsorshipType')}>
    <option value="">בחרו סוג קשר</option>
    {Object.entries(SPONSORSHIP_TYPE_LABELS).map(([value, label]) => (
        <option key={value} value={value}>{label}</option>
    ))}
</select>
                {errors.sponsorshipType && <p role="alert">{errors.sponsorshipType.message}</p>}
            </div>

            <div>
                <label htmlFor="disclosureDetails">פרטים נוספים (חובה אם בחרת "אחר")</label>
                <textarea rows={4} id="disclosureDetails"  {...register('disclosureDetails')} />
                {errors.disclosureDetails && <p role="alert">{errors.disclosureDetails.message}</p>}
            </div>

            <button type="submit" disabled={isSubmitting}>{submitLabel}</button>
        </form>
    );
}
export default SponsorshipForm